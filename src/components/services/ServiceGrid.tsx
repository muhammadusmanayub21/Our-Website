import Link from 'next/link'
import { services } from '@/data/services'
import BentoCard from '@/components/ui/BentoCard'

export default function ServiceGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {services.map((service, index) => (
        <Link key={service.slug} href={`/services/${service.slug}`}>
          <BentoCard span={index === 0 ? 'wide' : 'default'} className="h-full cursor-pointer">
            <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
            <p className="text-white/60 text-sm">{service.shortDescription}</p>
          </BentoCard>
        </Link>
      ))}
    </div>
  )
}
