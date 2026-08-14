export interface ContactFormData {
  name: string
  email: string
  company?: string
  service?: string
  message: string
}

export type ContactFormErrors = Partial<Record<'name' | 'email' | 'message', string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Upper bounds on a public, cost-incurring endpoint: every valid submission
// triggers a billable send, so cap field sizes. Shared by the client form and
// the API route, so one definition covers both.
export const MAX_NAME_LENGTH = 100
export const MAX_EMAIL_LENGTH = 254 // RFC 5321 maximum
export const MAX_COMPANY_LENGTH = 100
export const MAX_SERVICE_LENGTH = 100
export const MAX_MESSAGE_LENGTH = 5000

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (!data.name.trim()) {
    errors.name = 'Name is required.'
  } else if (data.name.trim().length > MAX_NAME_LENGTH) {
    errors.name = `Name must be under ${MAX_NAME_LENGTH} characters.`
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required.'
  } else if (data.email.trim().length > MAX_EMAIL_LENGTH) {
    errors.email = `Email must be under ${MAX_EMAIL_LENGTH} characters.`
  } else if (!EMAIL_PATTERN.test(data.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  // Company is optional, but still bounded. It has no dedicated error key, so
  // it reports through `name` alongside the other identity fields.
  if (data.company && data.company.trim().length > MAX_COMPANY_LENGTH) {
    errors.name = `Company must be under ${MAX_COMPANY_LENGTH} characters.`
  }

  // Service is a fixed-option select in the UI, but a raw POST can send any
  // string and it gets interpolated into the outgoing email, so bound it too.
  if (data.service && data.service.trim().length > MAX_SERVICE_LENGTH) {
    errors.message = `Service must be under ${MAX_SERVICE_LENGTH} characters.`
  }

  if (!data.message.trim()) {
    errors.message = 'Message is required.'
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.'
  } else if (data.message.trim().length > MAX_MESSAGE_LENGTH) {
    errors.message = `Message must be under ${MAX_MESSAGE_LENGTH} characters.`
  }

  return errors
}
