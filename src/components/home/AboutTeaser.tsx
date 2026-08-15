import Link from 'next/link'
import SectionHeading from '@/components/ui/SectionHeading'
import CircuitMotif from '@/components/ui/CircuitMotif'
import Button from '@/components/ui/Button'

export default function AboutTeaser() {
  return (
    <section className="relative bg-thynkteck-black py-20 sm:py-28 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title="A full-service team, not a patchwork of freelancers"
            />
            <p className="text-base sm:text-lg text-white/70 mb-8 max-w-lg">
              Thynkteck brings web and app development, design, AI, and IT consulting under one roof —
              so your project moves through one accountable team instead of getting stitched together
              across vendors.
            </p>
            <Button href="/about" variant="outline">
              More about us
            </Button>
          </div>
          <div className="relative flex items-center justify-center min-h-[280px]">
            <CircuitMotif className="w-64 h-64 sm:w-80 sm:h-80" />
          </div>
        </div>
      </div>
    </section>
  )
}
