import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import TeamGrid from '@/components/about/TeamGrid'
import ValuesGrid from '@/components/about/ValuesGrid'
import CircuitMotif from '@/components/ui/CircuitMotif'

export const metadata: Metadata = {
  title: 'About — Thynkteck',
  description: 'Thynkteck is a full-service digital agency covering web, app, AI, design, and IT consulting.',
}

export default function AboutPage() {
  return (
    <main>
      <Navigation />
      <section className="relative bg-thynkteck-black pt-40 pb-20 sm:pt-48 sm:pb-28 overflow-hidden">
        <CircuitMotif className="absolute -right-16 -top-10 w-72 h-72 sm:w-96 sm:h-96 pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl relative z-10">
          <span className="inline-block text-thynkteck-blue text-eyebrow mb-4">
            About Thynkteck
          </span>
          <h1 className="text-page font-bold text-white mb-6">
            One team, every discipline your product needs
          </h1>
          <p className="text-body-lg text-white/70">
            Placeholder company story — replace with Thynkteck&rsquo;s real founding story, mission, and
            what makes the team&rsquo;s approach different once available.
          </p>
        </div>
      </section>
      <ValuesGrid />
      <TeamGrid />
      <Footer />
    </main>
  )
}
