import Image from 'next/image'
import { Project } from '@/data/types'
import SectionHeading from '@/components/ui/SectionHeading'
import BentoCard from '@/components/ui/BentoCard'
import Button from '@/components/ui/Button'

interface ProjectDetailTemplateProps {
  project: Project
  nextProject: Project
}

export default function ProjectDetailTemplate({ project, nextProject }: ProjectDetailTemplateProps) {
  return (
    <>
      <section className="bg-thynkteck-black pt-40 pb-16 sm:pt-48">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <span className="inline-block text-thynkteck-blue text-sm font-semibold tracking-widest uppercase mb-4">
            {project.category}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            {project.title}
          </h1>
          <p className="text-lg text-white/70">{project.summary}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 mb-16">
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-thynkteck-soft-black">
          <Image src={project.coverImage} alt={project.title} fill className="object-cover" />
        </div>
      </div>

      <section className="bg-thynkteck-soft-black py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          <BentoCard>
            <h3 className="text-thynkteck-blue text-sm font-semibold uppercase mb-2">Challenge</h3>
            <p className="text-white/80 text-sm">{project.challenge}</p>
          </BentoCard>
          <BentoCard>
            <h3 className="text-thynkteck-blue text-sm font-semibold uppercase mb-2">Approach</h3>
            <p className="text-white/80 text-sm">{project.approach}</p>
          </BentoCard>
          <BentoCard>
            <h3 className="text-thynkteck-blue text-sm font-semibold uppercase mb-2">Result</h3>
            <p className="text-white/80 text-sm">{project.result}</p>
          </BentoCard>
        </div>
      </section>

      <section className="bg-thynkteck-black py-16 sm:py-20 border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading eyebrow="Tech stack" title="Built with" />
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech) => (
              <span key={tech} className="px-4 py-2 rounded-full border border-white/10 text-white/70 text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {project.gallery.length > 0 && (
        <section className="bg-thynkteck-soft-black py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <SectionHeading eyebrow="Gallery" title="A closer look" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {project.gallery.map((image) => (
                <div key={image.src} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-thynkteck-black">
                  <Image src={image.src} alt={image.alt} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-thynkteck-black py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-white/50 text-sm">Next project</span>
            <h3 className="text-2xl font-semibold text-white">{nextProject.title}</h3>
          </div>
          <Button href={`/work/${nextProject.slug}`}>View project</Button>
        </div>
      </section>
    </>
  )
}
