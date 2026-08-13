'use client'

import { FormEvent, useState } from 'react'
import { services } from '@/data/services'
import { validateContactForm, ContactFormData, ContactFormErrors } from '@/lib/contactValidation'

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

const initialData: ContactFormData = {
  name: '',
  email: '',
  company: '',
  service: '',
  message: '',
}

export default function ContactForm() {
  const [data, setData] = useState<ContactFormData>(initialData)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const handleChange = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
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
      <div className="rounded-2xl bg-thynkteck-soft-black border border-white/10 p-8 text-center">
        <h3 className="text-2xl font-semibold text-white mb-2">Message sent</h3>
        <p className="text-white/60">Thanks — we&rsquo;ll get back to you within one business day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm text-white/70 mb-2">Name</label>
        <input
          id="name"
          value={data.name}
          onChange={handleChange('name')}
          className="w-full rounded-lg bg-thynkteck-soft-black border border-white/10 px-4 py-3 text-white focus:border-thynkteck-blue outline-none"
        />
        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-white/70 mb-2">Email</label>
        <input
          id="email"
          type="email"
          value={data.email}
          onChange={handleChange('email')}
          className="w-full rounded-lg bg-thynkteck-soft-black border border-white/10 px-4 py-3 text-white focus:border-thynkteck-blue outline-none"
        />
        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="company" className="block text-sm text-white/70 mb-2">Company (optional)</label>
        <input
          id="company"
          value={data.company}
          onChange={handleChange('company')}
          className="w-full rounded-lg bg-thynkteck-soft-black border border-white/10 px-4 py-3 text-white focus:border-thynkteck-blue outline-none"
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm text-white/70 mb-2">What do you need? (optional)</label>
        <select
          id="service"
          value={data.service}
          onChange={handleChange('service')}
          className="w-full rounded-lg bg-thynkteck-soft-black border border-white/10 px-4 py-3 text-white focus:border-thynkteck-blue outline-none"
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-white/70 mb-2">Message</label>
        <textarea
          id="message"
          rows={5}
          value={data.message}
          onChange={handleChange('message')}
          className="w-full rounded-lg bg-thynkteck-soft-black border border-white/10 px-4 py-3 text-white focus:border-thynkteck-blue outline-none"
        />
        {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-400">Something went wrong sending your message. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-thynkteck-blue text-white px-8 py-3 text-sm font-semibold hover:bg-blue-600 transition-colors disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
