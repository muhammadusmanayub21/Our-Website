import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ServiceDetailTemplate from '@/components/services/ServiceDetailTemplate'
import { services } from '@/data/services'
import { projects } from '@/data/projects'
import { getRelatedProjects } from '@/lib/relatedWork'

interface ServicePageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) return {}
  return {
    title: `${service.title} — Thynkteck`,
    description: service.shortDescription,
  }
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) notFound()

  const relatedProjects = getRelatedProjects(service.tags, projects, 3)

  return (
    <main>
      <Navigation />
      <ServiceDetailTemplate service={service} relatedProjects={relatedProjects} />
      <Footer />
    </main>
  )
}
