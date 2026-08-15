import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/ui/SectionHeading'

export const metadata: Metadata = {
  title: 'Terms of Service — Thynkteck',
  description: 'The terms that govern use of Thynkteck’s website and services.',
}

export default function TermsPage() {
  return (
    <main>
      <Navigation />
      <section className="bg-thynkteck-black pt-40 pb-20 sm:pt-48 sm:pb-28">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
          <SectionHeading eyebrow="Legal" title="Terms of Service" />
          <p className="text-white/70 text-caption leading-relaxed">
            Placeholder terms of service — replace with Thynkteck&rsquo;s actual terms before launch.
            Contact{' '}
            <a href="mailto:services@thynkteck.com" className="text-thynkteck-blue">
              services@thynkteck.com
            </a>{' '}
            with any questions.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  )
}
