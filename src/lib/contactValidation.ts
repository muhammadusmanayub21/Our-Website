export const CONTACT_REGIONS = [
  'Middle East & North Africa',
  'USA',
  'Canada',
  'Kingdom of Saudi Arabia',
  'Australia & New Zealand',
  'Asia',
  'Europe',
  'Rest of World',
] as const

export const CONTACT_SERVICES = [
  'Remote IT Resources',
  'Custom Software Development',
  'Web Development',
  'Mobile App Development',
  'AR/VR',
  'Gaming',
  'Cyber Security',
  'Other IT Services',
] as const

export type ContactRegion = (typeof CONTACT_REGIONS)[number]
export type ContactServiceOption = (typeof CONTACT_SERVICES)[number]

export interface ContactFormData {
  name: string
  email: string
  phone: string
  company: string
  companyUrl?: string
  region: string
  service: string
  message: string
  marketingEmail?: boolean
  marketingSms?: boolean
}

export type ContactFormErrors = Partial<
  Record<'name' | 'email' | 'phone' | 'company' | 'companyUrl' | 'region' | 'service' | 'message', string>
>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[+]?[\d\s().-]{7,20}$/
const URL_PATTERN = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i

// Upper bounds on a public, cost-incurring endpoint: every valid submission
// triggers a billable send, so cap field sizes. Shared by the client form and
// the API route, so one definition covers both.
export const MAX_NAME_LENGTH = 100
export const MAX_EMAIL_LENGTH = 254 // RFC 5321 maximum
export const MAX_PHONE_LENGTH = 30
export const MAX_COMPANY_LENGTH = 100
export const MAX_COMPANY_URL_LENGTH = 200
export const MAX_REGION_LENGTH = 80
export const MAX_SERVICE_LENGTH = 100
export const MAX_MESSAGE_LENGTH = 5000

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (!data.name.trim()) {
    errors.name = 'Full name is required.'
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

  if (!data.phone.trim()) {
    errors.phone = 'Phone number is required.'
  } else if (data.phone.trim().length > MAX_PHONE_LENGTH) {
    errors.phone = `Phone must be under ${MAX_PHONE_LENGTH} characters.`
  } else if (!PHONE_PATTERN.test(data.phone.trim())) {
    errors.phone = 'Enter a valid phone number.'
  }

  if (!data.company.trim()) {
    errors.company = 'Company name is required.'
  } else if (data.company.trim().length > MAX_COMPANY_LENGTH) {
    errors.company = `Company must be under ${MAX_COMPANY_LENGTH} characters.`
  }

  if (data.companyUrl?.trim()) {
    if (data.companyUrl.trim().length > MAX_COMPANY_URL_LENGTH) {
      errors.companyUrl = `Company URL must be under ${MAX_COMPANY_URL_LENGTH} characters.`
    } else if (!URL_PATTERN.test(data.companyUrl.trim())) {
      errors.companyUrl = 'Enter a valid company URL.'
    }
  }

  if (!data.region.trim()) {
    errors.region = 'Region is required.'
  } else if (data.region.trim().length > MAX_REGION_LENGTH) {
    errors.region = `Region must be under ${MAX_REGION_LENGTH} characters.`
  } else if (!(CONTACT_REGIONS as readonly string[]).includes(data.region.trim())) {
    errors.region = 'Select a valid region.'
  }

  if (!data.service.trim()) {
    errors.service = 'Please select a service.'
  } else if (data.service.trim().length > MAX_SERVICE_LENGTH) {
    errors.service = `Service must be under ${MAX_SERVICE_LENGTH} characters.`
  } else if (!(CONTACT_SERVICES as readonly string[]).includes(data.service.trim())) {
    errors.service = 'Select a valid service.'
  }

  if (!data.message.trim()) {
    errors.message = 'Project details are required.'
  } else if (data.message.trim().length < 10) {
    errors.message = 'Project details must be at least 10 characters.'
  } else if (data.message.trim().length > MAX_MESSAGE_LENGTH) {
    errors.message = `Project details must be under ${MAX_MESSAGE_LENGTH} characters.`
  }

  return errors
}
