import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/ui/SectionHeading'
import ServiceGrid from '@/components/services/ServiceGrid'

export const metadata: Metadata = {
  title: 'Services — Thynkteck',
  description: 'Web & app development, UI/UX & branding, AI & automation, IT consulting, custom software, Shopify, and WordPress.',
}

export default function ServicesPage() {
  return (
    <main>
      <Navigation />
      <section className="bg-thynkteck-black pt-40 pb-20 sm:pt-48 sm:pb-28">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="Services"
            title="Everything your product needs, under one roof"
            description="Seven core capabilities that cover a project from first concept through ongoing support."
          />
          <ServiceGrid />
        </div>
      </section>
      <Footer />
    </main>
  )
}
