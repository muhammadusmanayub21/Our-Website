import { Project } from '@/data/types'

export function getRelatedProjects(
  tags: string[],
  projects: Project[],
  limit = 3,
  excludeSlug?: string
): Project[] {
  if (tags.length === 0) return []

  return projects
    .filter((project) => project.slug !== excludeSlug)
    .map((project) => ({
      project,
      score: project.tags.filter((tag) => tags.includes(tag)).length,
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.project)
}
