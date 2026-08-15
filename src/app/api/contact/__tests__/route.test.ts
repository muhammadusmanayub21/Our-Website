import { describe, it, expect, vi, beforeEach } from 'vitest'

const sendMock = vi.fn()

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: sendMock },
  })),
}))

import { POST } from '../route'

function makeRequest(body: unknown) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

const validBody = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '+1 555 123 4567',
  company: 'Acme Co',
  companyUrl: 'https://acme.example',
  region: 'USA',
  service: 'Web Development',
  message: 'We would like to discuss a new project with your team.',
  marketingEmail: true,
  marketingSms: false,
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    sendMock.mockReset()
    sendMock.mockResolvedValue({ data: { id: 'test-id' }, error: null })
    process.env.RESEND_API_KEY = 'test-key'
    process.env.CONTACT_TO_EMAIL = 'services@thynkteck.com'
  })

  it('returns 400 with field errors for invalid input', async () => {
    const response = await POST(makeRequest({ ...validBody, email: 'not-an-email' }))
    const json = await response.json()
    expect(response.status).toBe(400)
    expect(json.success).toBe(false)
    expect(json.errors.email).toBeDefined()
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('sends an email and returns success for valid input', async () => {
    const response = await POST(makeRequest(validBody))
    const json = await response.json()
    expect(response.status).toBe(200)
    expect(json.success).toBe(true)
    expect(sendMock).toHaveBeenCalledTimes(1)
    expect(sendMock.mock.calls[0][0]).toMatchObject({
      to: 'services@thynkteck.com',
      reply_to: 'jane@example.com',
    })
  })

  it('returns 500 when RESEND_API_KEY is not configured', async () => {
    delete process.env.RESEND_API_KEY
    const response = await POST(makeRequest(validBody))
    expect(response.status).toBe(500)
    expect(sendMock).not.toHaveBeenCalled()
  })

  // The real resend@3.x SDK never rejects — it resolves to { data: null, error }
  // for API errors and network failures alike. This is the path that actually
  // happens in production.
  it('returns 502 when the email provider returns an error result', async () => {
    sendMock.mockResolvedValue({
      data: null,
      error: { name: 'application_error', message: 'x' },
    })
    const response = await POST(makeRequest(validBody))
    const json = await response.json()
    expect(response.status).toBe(502)
    expect(json.success).toBe(false)
    expect(sendMock).toHaveBeenCalledTimes(1)
  })

  // Defense in depth: the outer try/catch still covers a genuine throw.
  it('returns 502 when the email provider throws', async () => {
    sendMock.mockRejectedValue(new Error('provider down'))
    const response = await POST(makeRequest(validBody))
    const json = await response.json()
    expect(response.status).toBe(502)
    expect(json.success).toBe(false)
  })

  it('returns 400 for malformed JSON', async () => {
    const response = await POST(
      new Request('http://localhost/api/contact', {
        method: 'POST',
        body: 'not valid json {',
      })
    )
    const json = await response.json()
    expect(response.status).toBe(400)
    expect(json.success).toBe(false)
    expect(json.errors.message).toBeDefined()
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('returns 400 when required fields are missing', async () => {
    const response = await POST(makeRequest({ ...validBody, name: undefined }))
    const json = await response.json()
    expect(response.status).toBe(400)
    expect(json.success).toBe(false)
    expect(json.errors.message).toBeDefined()
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('returns 400 when required field has wrong type', async () => {
    const response = await POST(makeRequest({ ...validBody, email: 123 }))
    const json = await response.json()
    expect(response.status).toBe(400)
    expect(json.success).toBe(false)
    expect(json.errors.message).toBeDefined()
    expect(sendMock).not.toHaveBeenCalled()
  })
})
