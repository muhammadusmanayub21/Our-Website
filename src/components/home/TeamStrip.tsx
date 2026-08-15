import Image from 'next/image'
import { team } from '@/data/team'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'

export default function TeamStrip() {
  return (
    <section className="bg-thynkteck-soft-black py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-14">
          <SectionHeading eyebrow="Our team" title="The people behind the work" />
          <Button href="/about" variant="outline" className="shrink-0">
            Meet the team
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full overflow-hidden bg-thynkteck-black border border-white/10 mb-4">
                <Image src={member.photo} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="text-white font-semibold text-sm">{member.name}</h3>
              <p className="text-thynkteck-blue text-xs mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
