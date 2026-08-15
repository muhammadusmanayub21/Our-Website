import Link from 'next/link'
import Image from 'next/image'
import { Service, Project } from '@/data/types'
import SectionHeading from '@/components/ui/SectionHeading'
import BentoCard from '@/components/ui/BentoCard'
import Button from '@/components/ui/Button'

interface ServiceDetailTemplateProps {
  service: Service
  relatedProjects: Project[]
}

export default function ServiceDetailTemplate({ service, relatedProjects }: ServiceDetailTemplateProps) {
  return (
    <>
      <section className="bg-thynkteck-black pt-40 pb-20 sm:pt-48 sm:pb-28">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <span className="inline-block text-thynkteck-blue text-eyebrow mb-4">
            {service.title}
          </span>
          <h1 className="text-page font-bold text-white mb-6">
            {service.shortDescription}
          </h1>
          <p className="text-body-lg text-white/70 mb-8">{service.longDescription}</p>
          <Button href="/contact">Talk to us about this</Button>
        </div>
      </section>

      <section className="bg-thynkteck-soft-black py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading eyebrow="What's included" title="Capabilities" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {service.capabilities.map((capability) => (
              <BentoCard key={capability}>
                <p className="text-white/80">{capability}</p>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-thynkteck-black py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading eyebrow="How it works" title="Our process" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {service.process.map((step, index) => (
              <BentoCard key={step.title}>
                <span className="text-thynkteck-blue text-caption font-semibold">0{index + 1}</span>
                <h3 className="text-subhead font-semibold text-white mt-2 mb-2">{step.title}</h3>
                <p className="text-white/60 text-caption">{step.description}</p>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="bg-thynkteck-soft-black py-20 sm:py-28 border-b border-white/10">
          <div className="container mx-auto px-4 sm:px-6">
            <SectionHeading eyebrow="Related work" title="Recent projects in this area" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((project) => (
                <Link key={project.slug} href={`/work/${project.slug}`} className="group block">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-thynkteck-black mb-4">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-subhead font-semibold text-white">{project.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
