export interface ProcessStep {
  title: string
  description: string
}

export interface Service {
  slug: string
  title: string
  shortDescription: string
  longDescription: string
  capabilities: string[]
  process: ProcessStep[]
  tags: string[]
}

export interface ProjectGalleryImage {
  src: string
  alt: string
}

export interface Project {
  slug: string
  title: string
  client: string
  industry: string
  category: string
  coverImage: string
  summary: string
  challenge: string
  approach: string
  result: string
  techStack: string[]
  tags: string[]
  gallery: ProjectGalleryImage[]
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  body: string
  date: string
  category: string
  author: string
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  photo: string
}

export interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
}
