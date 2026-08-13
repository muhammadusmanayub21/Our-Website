import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/ui/SectionHeading'
import { projects } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Work — Thynkteck',
  description: 'Case studies across web development, AI, cloud infrastructure, ecommerce, CMS, and brand identity.',
}

export default function WorkPage() {
  return (
    <main>
      <Navigation />
      <section className="bg-thynkteck-black pt-40 pb-20 sm:pt-48 sm:pb-28">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading eyebrow="Work" title="Case studies across every service area" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link key={project.slug} href={`/work/${project.slug}`} className="group block">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-thynkteck-soft-black mb-4">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="text-xs text-thynkteck-blue font-semibold uppercase tracking-wide">
                  {project.category}
                </span>
                <h3 className="text-lg font-semibold text-white mt-1">{project.title}</h3>
                <p className="text-white/50 text-sm">{project.industry}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
