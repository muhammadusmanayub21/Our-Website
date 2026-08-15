import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { validateContactForm, ContactFormData } from '@/lib/contactValidation'

export async function POST(request: Request) {
  let data: unknown
  try {
    data = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, errors: { message: 'Invalid JSON in request body.' } },
      { status: 400 }
    )
  }

  // Runtime shape check: ensure required fields are present and have correct types
  if (
    typeof data !== 'object' ||
    data === null ||
    typeof (data as Record<string, unknown>).name !== 'string' ||
    typeof (data as Record<string, unknown>).email !== 'string' ||
    typeof (data as Record<string, unknown>).phone !== 'string' ||
    typeof (data as Record<string, unknown>).company !== 'string' ||
    typeof (data as Record<string, unknown>).region !== 'string' ||
    typeof (data as Record<string, unknown>).service !== 'string' ||
    typeof (data as Record<string, unknown>).message !== 'string'
  ) {
    return NextResponse.json(
      {
        success: false,
        errors: {
          message:
            'Missing or invalid required fields: name, email, phone, company, region, service, message must be strings.',
        },
      },
      { status: 400 }
    )
  }

  const typedData = data as ContactFormData

  const errors = validateContactForm(typedData)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ success: false, errors }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { success: false, errors: { message: 'Email service is not configured.' } },
      { status: 500 }
    )
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || 'services@thynkteck.com'
  const resend = new Resend(apiKey)

  try {
    // resend@3.x never throws on a failed send: Emails.send() resolves to
    // { data: null, error } for API errors AND network failures alike (the
    // SDK's own fetchRequest catch converts thrown errors into that shape).
    // So the returned `error` must be checked explicitly — the try/catch
    // below only covers genuine exceptions the SDK does not swallow.
    const { error } = await resend.emails.send({
      from: 'Thynkteck Website <onboarding@resend.dev>',
      to: toEmail,
      reply_to: typedData.email,
      subject: `New inquiry from ${typedData.name}`,
      text: [
        `Name: ${typedData.name}`,
        `Email: ${typedData.email}`,
        `Phone: ${typedData.phone}`,
        `Company: ${typedData.company}`,
        typedData.companyUrl?.trim() ? `Company URL: ${typedData.companyUrl.trim()}` : null,
        `Region: ${typedData.region}`,
        `Service: ${typedData.service}`,
        `Marketing email: ${typedData.marketingEmail ? 'Yes' : 'No'}`,
        `Marketing SMS: ${typedData.marketingSms ? 'Yes' : 'No'}`,
        '',
        typedData.message,
      ]
        .filter(Boolean)
        .join('\n'),
    })

    if (error) {
      console.error('Resend send failed:', error)
      return NextResponse.json(
        { success: false, errors: { message: 'Failed to send message. Please try again.' } },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, errors: { message: 'Failed to send message. Please try again.' } },
      { status: 502 }
    )
  }
}
