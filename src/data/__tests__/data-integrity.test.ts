// src/data/__tests__/data-integrity.test.ts
import { existsSync } from 'node:fs'
import path from 'node:path'
import { describe, it, expect } from 'vitest'
import { services } from '../services'
import { projects } from '../projects'
import { posts } from '../posts'
import { team } from '../team'

function assertUniqueSlugs(items: { slug: string }[], label: string) {
  const slugs = items.map((item) => item.slug)
  const unique = new Set(slugs)
  expect(unique.size, `${label} has duplicate slugs: ${slugs.join(', ')}`).toBe(slugs.length)
}

// Image paths in the data files are public-root-relative ("/images/..."), so
// they resolve against public/ on disk.
function assertAssetExists(publicPath: string, label: string) {
  expect(publicPath.startsWith('/'), `${label} is not a root-relative path: ${publicPath}`).toBe(true)
  const filePath = path.join(process.cwd(), 'public', publicPath)
  expect(existsSync(filePath), `${label} points at a missing file: ${publicPath}`).toBe(true)
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

  it('every project coverImage points at a file that exists in public/', () => {
    for (const project of projects) {
      assertAssetExists(project.coverImage, `${project.slug} coverImage`)
    }
  })

  it('every project gallery image points at a file that exists in public/', () => {
    for (const project of projects) {
      project.gallery.forEach((image, index) => {
        assertAssetExists(image.src, `${project.slug} gallery[${index}]`)
      })
    }
  })

  it('every team photo points at a file that exists in public/', () => {
    for (const member of team) {
      assertAssetExists(member.photo, `${member.name} photo`)
    }
  })
})
