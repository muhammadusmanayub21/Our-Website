import { describe, it, expect } from 'vitest'
import { getRelatedProjects } from '../relatedWork'
import { Project } from '@/data/types'

const makeProject = (overrides: Partial<Project>): Project => ({
  slug: 'test-project',
  title: 'Test Project',
  client: 'Test Client',
  industry: 'Retail',
  category: 'Web & App Development',
  coverImage: '/images/work/placeholder.svg',
  summary: 'summary',
  challenge: 'challenge',
  approach: 'approach',
  result: 'result',
  techStack: ['Next.js'],
  tags: [],
  gallery: [],
  ...overrides,
})

describe('getRelatedProjects', () => {
  it('returns projects that share at least one tag, ranked by overlap count', () => {
    const projects = [
      makeProject({ slug: 'a', tags: ['web', 'shopify'] }),
      makeProject({ slug: 'b', tags: ['web'] }),
      makeProject({ slug: 'c', tags: ['ai'] }),
    ]
    const result = getRelatedProjects(['web', 'shopify'], projects)
    expect(result.map((p) => p.slug)).toEqual(['a', 'b'])
  })

  it('returns an empty array when no tags are provided', () => {
    const projects = [makeProject({ slug: 'a', tags: ['web'] })]
    expect(getRelatedProjects([], projects)).toEqual([])
  })

  it('excludes projects with a project slug matching excludeSlug', () => {
    const projects = [
      makeProject({ slug: 'a', tags: ['web'] }),
      makeProject({ slug: 'b', tags: ['web'] }),
    ]
    const result = getRelatedProjects(['web'], projects, 5, 'a')
    expect(result.map((p) => p.slug)).toEqual(['b'])
  })

  it('respects the limit parameter', () => {
    const projects = [
      makeProject({ slug: 'a', tags: ['web'] }),
      makeProject({ slug: 'b', tags: ['web'] }),
      makeProject({ slug: 'c', tags: ['web'] }),
    ]
    const result = getRelatedProjects(['web'], projects, 2)
    expect(result).toHaveLength(2)
  })
})
