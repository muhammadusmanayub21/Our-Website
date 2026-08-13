// src/components/about/ValuesGrid.tsx
import SectionHeading from '@/components/ui/SectionHeading'
import BentoCard from '@/components/ui/BentoCard'

const values = [
  { title: 'Build for the real workflow', description: 'We design around how your team actually works, not a generic template.' },
  { title: 'Ship, then iterate', description: 'Working software in front of you early beats a perfect plan on paper.' },
  { title: 'Say the hard thing early', description: 'If something will not work, you hear it in week one, not month three.' },
]

export default function ValuesGrid() {
  return (
    <section className="bg-thynkteck-soft-black py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading eyebrow="How we work" title="What we optimize for" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {values.map((value) => (
            <BentoCard key={value.title}>
              <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
              <p className="text-white/60 text-sm">{value.description}</p>
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  )
}
