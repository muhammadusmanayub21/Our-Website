import { describe, it, expect } from 'vitest'
import { validateContactForm, ContactFormData } from '../contactValidation'

const baseData: ContactFormData = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  company: 'Acme Co',
  service: 'web-app-development',
  message: 'We would like to discuss a new project with your team.',
}

describe('validateContactForm', () => {
  it('returns no errors for valid data', () => {
    expect(validateContactForm(baseData)).toEqual({})
  })

  it('requires a name', () => {
    const errors = validateContactForm({ ...baseData, name: '  ' })
    expect(errors.name).toBeDefined()
  })

  it('requires a valid email address', () => {
    const errors = validateContactForm({ ...baseData, email: 'not-an-email' })
    expect(errors.email).toBeDefined()
  })

  it('requires an email at all', () => {
    const errors = validateContactForm({ ...baseData, email: '' })
    expect(errors.email).toBeDefined()
  })

  it('requires a message of at least 10 characters', () => {
    const errors = validateContactForm({ ...baseData, message: 'too short' })
    expect(errors.message).toBeDefined()
  })

  it('does not require company or service', () => {
    const errors = validateContactForm({ ...baseData, company: undefined, service: undefined })
    expect(errors).toEqual({})
  })
})
