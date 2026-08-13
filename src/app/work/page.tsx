import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/ui/SectionHeading'
import WorkGrid from '@/components/work/WorkGrid'
import { projects } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Work — Thynkteck',
  description: 'Case studies across web development, AI, cloud infrastructure, ecommerce, CMS, and brand identity.',
}

export default function WorkPage() {
  return (
    <main>
      <Navigation />
      <section className="bg-thynkteck-black pt-40 pb-20 sm:pt-48 sm:pb-28">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading eyebrow="Work" title="Case studies across every service area" />
          <WorkGrid projects={projects} />
        </div>
      </section>
      <Footer />
    </main>
  )
}
