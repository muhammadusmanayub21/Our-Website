import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { validateContactForm, ContactFormData } from '@/lib/contactValidation'

export async function POST(request: Request) {
  const data = (await request.json()) as ContactFormData

  const errors = validateContactForm(data)
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
    await resend.emails.send({
      from: 'Thynkteck Website <onboarding@resend.dev>',
      to: toEmail,
      reply_to: data.email,
      subject: `New inquiry from ${data.name}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.company ? `Company: ${data.company}` : null,
        data.service ? `Service: ${data.service}` : null,
        '',
        data.message,
      ]
        .filter(Boolean)
        .join('\n'),
    })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, errors: { message: 'Failed to send message. Please try again.' } },
      { status: 502 }
    )
  }
}
