import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/data/projects'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'

export default function FeaturedWork() {
  const featured = projects.slice(0, 3)

  return (
    <section className="bg-thynkteck-black py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading eyebrow="Selected work" title="Recent projects" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {featured.map((project) => (
            <Link key={project.slug} href={`/work/${project.slug}`} className="group block">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-thynkteck-black mb-4">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="text-caption text-thynkteck-blue font-semibold uppercase tracking-wide">
                {project.category}
              </span>
              <h3 className="text-subhead font-semibold text-white mt-1">{project.title}</h3>
            </Link>
          ))}
        </div>
        <Button href="/work" variant="outline">
          View all work
        </Button>
      </div>
    </section>
  )
}
