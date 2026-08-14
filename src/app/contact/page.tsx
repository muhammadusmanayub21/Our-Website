import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/ui/SectionHeading'
import ContactForm from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact — Thynkteck',
  description: 'Get in touch with the Thynkteck team at services@thynkteck.com.',
}

export default function ContactPage() {
  return (
    <main>
      <Navigation />
      <section className="bg-thynkteck-black pt-40 pb-20 sm:pt-48 sm:pb-28">
        <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Tell us about your project"
              description="We usually reply within one business day."
            />
            <a href="mailto:services@thynkteck.com" className="text-thynkteck-blue font-medium">
              services@thynkteck.com
            </a>
          </div>
          <ContactForm />
        </div>
      </section>
      <Footer />
    </main>
  )
}
