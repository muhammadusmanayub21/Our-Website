// src/components/about/TeamGrid.tsx
import Image from 'next/image'
import { team } from '@/data/team'
import SectionHeading from '@/components/ui/SectionHeading'
import BentoCard from '@/components/ui/BentoCard'

export default function TeamGrid() {
  return (
    <section className="bg-thynkteck-black py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading eyebrow="Our team" title="The people behind the work" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {team.map((member) => (
            <BentoCard key={member.name}>
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-thynkteck-black mb-4">
                <Image src={member.photo} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="text-white font-semibold text-subhead">{member.name}</h3>
              <p className="text-thynkteck-blue text-caption mb-2">{member.role}</p>
              <p className="text-white/60 text-caption">{member.bio}</p>
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  )
}
