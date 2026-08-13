import StatCounter from '@/components/ui/StatCounter'

const stats = [
  { value: 40, suffix: '+', label: 'Projects delivered' },
  { value: 12, suffix: '', label: 'Industries served' },
  { value: 7, suffix: '', label: 'Core service areas' },
  { value: 98, suffix: '%', label: 'Client satisfaction' },
]

export default function StatsBar() {
  return (
    <section className="bg-thynkteck-black py-16 sm:py-20 border-y border-white/10">
      <div className="container mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <StatCounter key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  )
}
