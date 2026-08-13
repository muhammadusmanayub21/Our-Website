import SectionHeading from '@/components/ui/SectionHeading'
import ServiceGrid from '@/components/services/ServiceGrid'

export default function ServiceStrip() {
  return (
    <section className="bg-thynkteck-black py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="What we do"
          title="Every capability your product needs"
          description="From first sketch to production infrastructure, one team covers the full stack."
        />
        <ServiceGrid />
      </div>
    </section>
  )
}
