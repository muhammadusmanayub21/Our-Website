import { describe, it, expect } from 'vitest'
import {
  validateContactForm,
  ContactFormData,
  MAX_NAME_LENGTH,
  MAX_EMAIL_LENGTH,
  MAX_PHONE_LENGTH,
  MAX_COMPANY_LENGTH,
  MAX_COMPANY_URL_LENGTH,
  MAX_SERVICE_LENGTH,
  MAX_MESSAGE_LENGTH,
} from '../contactValidation'

const baseData: ContactFormData = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '+1 555 123 4567',
  company: 'Acme Co',
  companyUrl: 'https://acme.example',
  region: 'USA',
  service: 'Web Development',
  message: 'We would like to discuss a new project with your team.',
  marketingEmail: false,
  marketingSms: false,
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

  it('requires a phone number', () => {
    const errors = validateContactForm({ ...baseData, phone: '' })
    expect(errors.phone).toBeDefined()
  })

  it('rejects an invalid phone number', () => {
    const errors = validateContactForm({ ...baseData, phone: 'abc' })
    expect(errors.phone).toBeDefined()
  })

  it('requires a company name', () => {
    const errors = validateContactForm({ ...baseData, company: '' })
    expect(errors.company).toBeDefined()
  })

  it('allows an empty company URL', () => {
    const errors = validateContactForm({ ...baseData, companyUrl: '' })
    expect(errors).toEqual({})
  })

  it('rejects an invalid company URL', () => {
    const errors = validateContactForm({ ...baseData, companyUrl: 'not a url' })
    expect(errors.companyUrl).toBeDefined()
  })

  it('requires a region from the allowed list', () => {
    const errors = validateContactForm({ ...baseData, region: 'Mars' })
    expect(errors.region).toBeDefined()
  })

  it('requires a service from the allowed list', () => {
    const errors = validateContactForm({ ...baseData, service: 'Astrology' })
    expect(errors.service).toBeDefined()
  })

  it('requires project details of at least 10 characters', () => {
    const errors = validateContactForm({ ...baseData, message: 'too short' })
    expect(errors.message).toBeDefined()
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

  it('rejects a phone over the maximum length', () => {
    const errors = validateContactForm({ ...baseData, phone: '1'.repeat(MAX_PHONE_LENGTH + 1) })
    expect(errors.phone).toBeDefined()
  })

  it('rejects a company over the maximum length', () => {
    const errors = validateContactForm({ ...baseData, company: 'a'.repeat(MAX_COMPANY_LENGTH + 1) })
    expect(errors.company).toBeDefined()
  })

  it('rejects a company URL over the maximum length', () => {
    const errors = validateContactForm({
      ...baseData,
      companyUrl: `https://example.com/${'a'.repeat(MAX_COMPANY_URL_LENGTH)}`,
    })
    expect(errors.companyUrl).toBeDefined()
  })

  it('rejects a service over the maximum length', () => {
    const errors = validateContactForm({ ...baseData, service: 'a'.repeat(MAX_SERVICE_LENGTH + 1) })
    expect(errors.service).toBeDefined()
  })

  it('rejects a message over the maximum length', () => {
    const errors = validateContactForm({ ...baseData, message: 'a'.repeat(MAX_MESSAGE_LENGTH + 1) })
    expect(errors.message).toBeDefined()
  })

  it('accepts fields exactly at the maximum length', () => {
    const errors = validateContactForm({
      ...baseData,
      name: 'a'.repeat(MAX_NAME_LENGTH),
      phone: '+1234567',
      company: 'a'.repeat(MAX_COMPANY_LENGTH),
      message: 'a'.repeat(MAX_MESSAGE_LENGTH),
    })
    expect(errors).toEqual({})
  })
})
