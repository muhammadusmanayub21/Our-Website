'use client'

import { FormEvent, useId, useState } from 'react'
import {
  validateContactForm,
  ContactFormData,
  ContactFormErrors,
  CONTACT_REGIONS,
  CONTACT_SERVICES,
  MAX_NAME_LENGTH,
  MAX_EMAIL_LENGTH,
  MAX_PHONE_LENGTH,
  MAX_COMPANY_LENGTH,
  MAX_COMPANY_URL_LENGTH,
  MAX_MESSAGE_LENGTH,
} from '@/lib/contactValidation'

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'
type ContactFormVariant = 'default' | 'footer'

const initialData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  companyUrl: '',
  region: '',
  service: '',
  message: '',
  marketingEmail: false,
  marketingSms: false,
}

const fieldClass: Record<ContactFormVariant, string> = {
  default:
    'w-full min-w-0 rounded-lg bg-thynkteck-soft-black border border-white/10 px-4 py-3 text-white focus:border-thynkteck-blue outline-none',
  footer:
    'w-full min-w-0 rounded-md bg-white/95 border border-transparent px-4 py-3 text-thynkteck-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-white/60',
}

const labelClass: Record<ContactFormVariant, string> = {
  default: 'block text-caption text-white/70 mb-2',
  footer: 'block text-nav text-white/90 mb-2',
}

type ContactFormProps = {
  variant?: ContactFormVariant
}

export default function ContactForm({ variant = 'default' }: ContactFormProps) {
  const uid = useId()
  const [data, setData] = useState<ContactFormData>(initialData)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')
  // Honeypot: hidden from sighted users and assistive tech, so only a naive
  // bot that fills every input will populate it.
  const [honeypot, setHoneypot] = useState('')

  const handleChange = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleCheckbox = (field: 'marketingEmail' | 'marketingSms') => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setData((prev) => ({ ...prev, [field]: e.target.checked }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Honeypot tripped — show the normal success state without calling the
    // API, so the bot gets no signal that it was rejected and no send is billed.
    if (honeypot) {
      setStatus('success')
      setData(initialData)
      return
    }

    const validationErrors = validateContactForm(data)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setStatus('submitting')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Request failed')
      setStatus('success')
      setData(initialData)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        className={
          variant === 'footer'
            ? 'rounded-xl bg-white/10 border border-white/20 p-8 text-center'
            : 'rounded-2xl bg-thynkteck-soft-black border border-white/10 p-8 text-center'
        }
      >
        <h3 className="text-subhead font-semibold text-white mb-2">Message sent</h3>
        <p className="text-body text-white/70">Thanks — we&rsquo;ll get back to you within one business day.</p>
      </div>
    )
  }

  const isFooter = variant === 'footer'
  const input = fieldClass[variant]
  const label = labelClass[variant]
  const errorClass = 'mt-1 text-caption text-red-300'

  return (
    <form onSubmit={handleSubmit} className={`relative w-full min-w-0 ${isFooter ? 'space-y-4' : 'space-y-5'}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="min-w-0">
          <label htmlFor={`${uid}-name`} className={label}>
            Full name*
          </label>
          <input
            id={`${uid}-name`}
            value={data.name}
            onChange={handleChange('name')}
            maxLength={MAX_NAME_LENGTH}
            autoComplete="name"
            className={input}
          />
          {errors.name && <p className={errorClass}>{errors.name}</p>}
        </div>

        <div className="min-w-0">
          <label htmlFor={`${uid}-email`} className={label}>
            Email*
          </label>
          <input
            id={`${uid}-email`}
            type="email"
            value={data.email}
            onChange={handleChange('email')}
            maxLength={MAX_EMAIL_LENGTH}
            autoComplete="email"
            className={input}
          />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </div>

        <div className="min-w-0">
          <label htmlFor={`${uid}-phone`} className={label}>
            Phone number*
          </label>
          <input
            id={`${uid}-phone`}
            type="tel"
            value={data.phone}
            onChange={handleChange('phone')}
            maxLength={MAX_PHONE_LENGTH}
            autoComplete="tel"
            className={input}
          />
          {errors.phone && <p className={errorClass}>{errors.phone}</p>}
        </div>

        <div className="min-w-0">
          <label htmlFor={`${uid}-company`} className={label}>
            Company name*
          </label>
          <input
            id={`${uid}-company`}
            value={data.company}
            onChange={handleChange('company')}
            maxLength={MAX_COMPANY_LENGTH}
            autoComplete="organization"
            className={input}
          />
          {errors.company && <p className={errorClass}>{errors.company}</p>}
        </div>

        <div className="min-w-0">
          <label htmlFor={`${uid}-companyUrl`} className={label}>
            Company URL
          </label>
          <input
            id={`${uid}-companyUrl`}
            type="text"
            inputMode="url"
            value={data.companyUrl}
            onChange={handleChange('companyUrl')}
            maxLength={MAX_COMPANY_URL_LENGTH}
            autoComplete="url"
            placeholder="https://"
            className={input}
          />
          {errors.companyUrl && <p className={errorClass}>{errors.companyUrl}</p>}
        </div>

        <div className="min-w-0">
          <label htmlFor={`${uid}-region`} className={label}>
            Region*
          </label>
          <select
            id={`${uid}-region`}
            value={data.region}
            onChange={handleChange('region')}
            className={`${input}${isFooter ? ' bg-white' : ''}`}
          >
            <option value="">Select Region</option>
            {CONTACT_REGIONS.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          {errors.region && <p className={errorClass}>{errors.region}</p>}
        </div>

        <div className="min-w-0 sm:col-span-2">
          <label htmlFor={`${uid}-service`} className={label}>
            Services you are looking for*
          </label>
          <select
            id={`${uid}-service`}
            value={data.service}
            onChange={handleChange('service')}
            className={`${input} ${isFooter ? 'bg-white' : ''}`}
          >
            <option value="">Select a service</option>
            {CONTACT_SERVICES.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          {errors.service && <p className={errorClass}>{errors.service}</p>}
        </div>
      </div>

      <div className="min-w-0">
        <label htmlFor={`${uid}-message`} className={label}>
          Project details*
        </label>
        <textarea
          id={`${uid}-message`}
          rows={isFooter ? 4 : 5}
          value={data.message}
          onChange={handleChange('message')}
          maxLength={MAX_MESSAGE_LENGTH}
          className={input}
        />
        {errors.message && <p className={errorClass}>{errors.message}</p>}
      </div>

      <div className="space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(data.marketingEmail)}
            onChange={handleCheckbox('marketingEmail')}
            className="mt-1 h-4 w-4 shrink-0 rounded border-white/30 accent-thynkteck-blue"
          />
          <span className={`text-caption leading-snug ${isFooter ? 'text-white/80' : 'text-white/70'}`}>
            I agree to receive marketing information and updates via email.
          </span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(data.marketingSms)}
            onChange={handleCheckbox('marketingSms')}
            className="mt-1 h-4 w-4 shrink-0 rounded border-white/30 accent-thynkteck-blue"
          />
          <span className={`text-caption leading-snug ${isFooter ? 'text-white/80' : 'text-white/70'}`}>
            I agree to receive SMS messages from Thynkteck. Reply &lsquo;STOP&rsquo; to opt out anytime.
          </span>
        </label>
      </div>

      {status === 'error' && (
        <p className="text-caption text-red-300">Something went wrong sending your message. Please try again.</p>
      )}

      <div className={isFooter ? 'flex justify-stretch sm:justify-end' : undefined}>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className={
            isFooter
              ? 'w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-white text-thynkteck-blue px-8 py-3 text-nav font-semibold hover:bg-white/90 transition-colors disabled:opacity-60'
              : 'w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-thynkteck-blue text-white px-8 py-3 text-nav font-semibold hover:bg-blue-600 transition-colors disabled:opacity-60'
          }
        >
          {status === 'submitting' ? 'Sending…' : 'Submit'}
        </button>
      </div>

      {/*
        Honeypot. Positioned off-screen rather than display:none, because some
        bots skip fields that are not rendered at all. Hidden from assistive
        tech and taken out of the tab order so real users never reach it. Last
        child so the form's space-y rhythm is unchanged.
      */}
      <div className="absolute w-px h-px overflow-hidden -left-[9999px]" aria-hidden="true">
        <label htmlFor={`${uid}-website`}>Do not fill this in</label>
        <input
          id={`${uid}-website`}
          name="website"
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
    </form>
  )
}
