import StatCounter from '@/components/ui/StatCounter'

interface Stat {
  value: number
  suffix: string
  label: string
}

// Placeholder figures — replace with real, verifiable numbers once available.
// Marked in the UI below as illustrative so they are not read as audited metrics.
const stats: Stat[] = [
  { value: 40, suffix: '+', label: 'Projects delivered' },
  { value: 12, suffix: '', label: 'Industries served' },
  { value: 7, suffix: '', label: 'Core service areas' },
  { value: 98, suffix: '%', label: 'Client satisfaction' },
]

export default function StatsBar() {
  return (
    <section className="bg-thynkteck-soft-black py-16 sm:py-20 border-y border-white/10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
        </div>
        <p className="mt-10 text-caption text-white/40">Illustrative placeholder figures.</p>
      </div>
    </section>
  )
}
