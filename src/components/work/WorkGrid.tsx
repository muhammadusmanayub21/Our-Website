'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Project } from '@/data/types'

const ALL = 'All'

interface WorkGridProps {
  projects: Project[]
}

export default function WorkGrid({ projects }: WorkGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>(ALL)

  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(projects.map((project) => project.category)))],
    [projects]
  )

  const visibleProjects =
    activeCategory === ALL
      ? projects
      : projects.filter((project) => project.category === activeCategory)

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-10" role="group" aria-label="Filter projects by category">
        {categories.map((category) => {
          const isActive = category === activeCategory
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'border-thynkteck-blue bg-thynkteck-blue text-white'
                  : 'border-white/20 text-white/70 hover:border-thynkteck-blue hover:text-white'
              }`}
            >
              {category}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleProjects.map((project) => (
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
  )
}
