import { describe, it, expect } from 'vitest'
import {
  validateContactForm,
  ContactFormData,
  MAX_NAME_LENGTH,
  MAX_EMAIL_LENGTH,
  MAX_COMPANY_LENGTH,
  MAX_SERVICE_LENGTH,
  MAX_MESSAGE_LENGTH,
} from '../contactValidation'

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

  it('rejects a name over the maximum length', () => {
    const errors = validateContactForm({ ...baseData, name: 'a'.repeat(MAX_NAME_LENGTH + 1) })
    expect(errors.name).toBeDefined()
  })

  it('rejects an email over the maximum length', () => {
    const local = 'a'.repeat(MAX_EMAIL_LENGTH)
    const errors = validateContactForm({ ...baseData, email: `${local}@example.com` })
    expect(errors.email).toBeDefined()
  })

  it('rejects a company over the maximum length', () => {
    const errors = validateContactForm({ ...baseData, company: 'a'.repeat(MAX_COMPANY_LENGTH + 1) })
    expect(errors.name).toBeDefined()
  })

  it('rejects a service over the maximum length', () => {
    const errors = validateContactForm({ ...baseData, service: 'a'.repeat(MAX_SERVICE_LENGTH + 1) })
    expect(errors.message).toBeDefined()
  })

  it('rejects a message over the maximum length', () => {
    const errors = validateContactForm({ ...baseData, message: 'a'.repeat(MAX_MESSAGE_LENGTH + 1) })
    expect(errors.message).toBeDefined()
  })

  it('accepts fields exactly at the maximum length', () => {
    const errors = validateContactForm({
      ...baseData,
      name: 'a'.repeat(MAX_NAME_LENGTH),
      company: 'a'.repeat(MAX_COMPANY_LENGTH),
      service: 'a'.repeat(MAX_SERVICE_LENGTH),
      message: 'a'.repeat(MAX_MESSAGE_LENGTH),
    })
    expect(errors).toEqual({})
  })
})
