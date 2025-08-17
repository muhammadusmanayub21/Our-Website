'use client'

import React, { useState } from 'react'

interface WorkProject {
  id: string
  title: string
  category: string
  image: string
  size: 'small' | 'medium' | 'large'
  color: string
}

const workProjects: WorkProject[] = [
  {
    id: '1',
    title: 'Persiscoin',
    category: 'Crypto Platform',
    image: '/api/placeholder/300/200',
    size: 'medium',
    color: 'bg-green-400'
  },
  {
    id: '2',
    title: 'VoulaBunk',
    category: 'Travel App',
    image: '/api/placeholder/300/300',
    size: 'large',
    color: 'bg-black'
  },
  {
    id: '3',
    title: 'Recipe App',
    category: 'Mobile Design',
    image: '/api/placeholder/250/350',
    size: 'medium',
    color: 'bg-white'
  },
  {
    id: '4',
    title: 'Acme Pizza',
    category: 'Food Delivery',
    image: '/api/placeholder/300/180',
    size: 'small',
    color: 'bg-blue-400'
  },
  {
    id: '5',
    title: 'Out for Delivery',
    category: 'Logistics',
    image: '/api/placeholder/280/200',
    size: 'medium',
    color: 'bg-gray-800'
  },
  {
    id: '6',
    title: 'Hello I\'m Ref',
    category: 'Personal Brand',
    image: '/api/placeholder/300/250',
    size: 'large',
    color: 'bg-green-500'
  },
  {
    id: '7',
    title: 'MavenDeals',
    category: 'E-commerce',
    image: '/api/placeholder/250/300',
    size: 'medium',
    color: 'bg-purple-400'
  },
  {
    id: '8',
    title: 'Interactive Design',
    category: 'Portfolio',
    image: '/api/placeholder/280/220',
    size: 'small',
    color: 'bg-pink-400'
  },
  {
    id: '9',
    title: 'Gemini',
    category: 'AI Assistant',
    image: '/api/placeholder/300/280',
    size: 'large',
    color: 'bg-blue-600'
  },
  {
    id: '10',
    title: 'Mobile App Design',
    category: 'iOS/Android',
    image: '/api/placeholder/260/300',
    size: 'medium',
    color: 'bg-gray-100'
  },
  {
    id: '11',
    title: 'Dashboard UI',
    category: 'Web App',
    image: '/api/placeholder/300/200',
    size: 'small',
    color: 'bg-indigo-500'
  },
  {
    id: '12',
    title: 'Brand Identity',
    category: 'Branding',
    image: '/api/placeholder/280/250',
    size: 'medium',
    color: 'bg-orange-400'
  }
]

const WorkSection = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  const getCardClasses = (size: string) => {
    switch (size) {
      case 'small':
        return 'col-span-1 row-span-1'
      case 'medium':
        return 'col-span-1 md:col-span-2 row-span-2'
      case 'large':
        return 'col-span-2 row-span-3'
      default:
        return 'col-span-1 row-span-1'
    }
  }

  return (
    <section className="min-h-screen bg-gray-100 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
            Our <em className="italic">Work</em>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Some of our best
          </p>
        </div>

        {/* Projects Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 auto-rows-[80px] sm:auto-rows-[100px]">
            {workProjects.map((project, index) => (
              <div
                key={project.id}
                className={`
                  ${getCardClasses(project.size)}
                  relative overflow-hidden rounded-2xl cursor-pointer
                  transform transition-all duration-300 ease-out
                  hover:scale-105 hover:shadow-2xl hover:z-10
                  group
                `}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Background Color/Pattern */}
                <div className={`absolute inset-0 ${project.color}`}>
                  {/* Placeholder for actual project image */}
                  <div className="w-full h-full flex items-center justify-center">
                    {/* Mock project content based on project type */}
                    {project.title.includes('Mobile') || project.title.includes('App') ? (
                      <div className="w-16 h-28 bg-white/20 rounded-lg border border-white/30 backdrop-blur-sm"></div>
                    ) : project.title.includes('Dashboard') || project.title.includes('Web') ? (
                      <div className="w-24 h-16 bg-white/20 rounded border border-white/30 backdrop-blur-sm"></div>
                    ) : (
                      <div className="w-20 h-20 bg-white/20 rounded-full border border-white/30 backdrop-blur-sm"></div>
                    )}
                  </div>
                </div>

                {/* Overlay Content */}
                <div className={`
                  absolute inset-0 bg-black/60 backdrop-blur-sm
                  flex flex-col justify-end p-4
                  transition-all duration-300
                  ${hoveredProject === project.id ? 'opacity-100' : 'opacity-0'}
                `}>
                  <h3 className="text-white font-bold text-sm md:text-base mb-1">
                    {project.title}
                  </h3>
                  <p className="text-white/80 text-xs md:text-sm">
                    {project.category}
                  </p>
                </div>

                {/* Corner indicator for interactive projects */}
                {(project.title.includes('App') || project.title.includes('Platform')) && (
                  <div className="absolute top-3 right-3 w-2 h-2 bg-white rounded-full opacity-60"></div>
                )}

                {/* Subtle border animation */}
                <div className={`
                  absolute inset-0 border-2 border-transparent rounded-2xl
                  transition-all duration-300
                  ${hoveredProject === project.id ? 'border-white/30' : ''}
                `}></div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Work Button */}
        <div className="text-center mt-16">
          <button className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-200 shadow-lg">
            View All Work
          </button>
        </div>
      </div>
    </section>
  )
}

export default WorkSection