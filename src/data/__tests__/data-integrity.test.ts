// src/data/__tests__/data-integrity.test.ts
import { describe, it, expect } from 'vitest'
import { services } from '../services'
import { projects } from '../projects'
import { posts } from '../posts'

function assertUniqueSlugs(items: { slug: string }[], label: string) {
  const slugs = items.map((item) => item.slug)
  const unique = new Set(slugs)
  expect(unique.size, `${label} has duplicate slugs: ${slugs.join(', ')}`).toBe(slugs.length)
}

describe('data integrity', () => {
  it('has exactly 7 services with unique slugs', () => {
    expect(services).toHaveLength(7)
    assertUniqueSlugs(services, 'services')
  })

  it('every service has at least one tag', () => {
    for (const service of services) {
      expect(service.tags.length, `${service.slug} has no tags`).toBeGreaterThan(0)
    }
  })

  it('has unique project slugs, each with at least one tag matching a service', () => {
    assertUniqueSlugs(projects, 'projects')
    const serviceTags = new Set(services.flatMap((s) => s.tags))
    for (const project of projects) {
      const hasMatch = project.tags.some((tag) => serviceTags.has(tag))
      expect(hasMatch, `${project.slug} has no tags matching any service`).toBe(true)
    }
  })

  it('has unique blog post slugs', () => {
    assertUniqueSlugs(posts, 'posts')
  })
})
