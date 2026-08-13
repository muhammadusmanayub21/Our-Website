import Link from 'next/link'
import { services } from '@/data/services'
import BentoCard from '@/components/ui/BentoCard'

export default function ServiceGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {services.map((service, index) => (
        // The grid item is the Link, not the BentoCard, so the column-span
        // class has to live here — on the card it would be inert.
        <Link
          key={service.slug}
          href={`/services/${service.slug}`}
          className={index === 0 ? 'md:col-span-2' : undefined}
        >
          <BentoCard className="h-full cursor-pointer">
            <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
            <p className="text-white/60 text-sm">{service.shortDescription}</p>
          </BentoCard>
        </Link>
      ))}
    </div>
  )
}
