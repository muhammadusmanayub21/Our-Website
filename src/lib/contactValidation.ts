export interface ContactFormData {
  name: string
  email: string
  company?: string
  service?: string
  message: string
}

export type ContactFormErrors = Partial<Record<'name' | 'email' | 'message', string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (!data.name.trim()) {
    errors.name = 'Name is required.'
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_PATTERN.test(data.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  if (!data.message.trim()) {
    errors.message = 'Message is required.'
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.'
  }

  return errors
}
