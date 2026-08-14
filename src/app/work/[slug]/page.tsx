import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ProjectDetailTemplate from '@/components/work/ProjectDetailTemplate'
import { projects } from '@/data/projects'

interface WorkPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export function generateMetadata({ params }: WorkPageProps): Metadata {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) return {}
  return {
    title: `${project.title} — Thynkteck`,
    description: project.summary,
  }
}

export default function WorkDetailPage({ params }: WorkPageProps) {
  const index = projects.findIndex((p) => p.slug === params.slug)
  if (index === -1) notFound()

  const project = projects[index]
  const nextProject = projects[(index + 1) % projects.length]

  return (
    <main>
      <Navigation />
      <ProjectDetailTemplate project={project} nextProject={nextProject} />
      <Footer />
    </main>
  )
}
