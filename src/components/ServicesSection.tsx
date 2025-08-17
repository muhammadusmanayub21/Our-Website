'use client'

import React, { useState } from 'react'

interface ServiceCard {
  id: string
  title: string
  description: string
  approach: string
  technologies: string[]
  services: string[]
}

const servicesData: ServiceCard[] = [
  {
    id: 'design',
    title: 'Design',
    description: 'We build transformative digital experiences for the world\'s leading brands by blending AI, design, and technology.',
    approach: 'An engineering approach to design, capable of solving business problems in unexpected ways.',
    technologies: ['Product Design', 'UI Design', 'Branding'],
    services: []
  },
  {
    id: 'development',
    title: 'Development',
    description: 'We build transformative digital experiences for the world\'s leading brands by blending AI, design, and technology.',
    approach: 'Complete integrated app & web development technologies that leverage modern frameworks & libraries.',
    technologies: ['Frontend', 'Backend', 'DevOps'],
    services: []
  },
  {
    id: 'ai-ml',
    title: 'AI/ML',
    description: 'We build transformative digital experiences for the world\'s leading brands by blending AI, design, and technology.',
    approach: 'Cutting-edge artificial intelligence and machine learning solutions that transform business operations.',
    technologies: ['Machine Learning', 'Deep Learning', 'NLP'],
    services: []
  }
]

const ServicesSection = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const handleCardClick = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId)
  }

  return (
    <section className="min-h-screen bg-gray-900 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Our <em className="italic text-blue-400">Services</em>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            We build transformative digital experiences for the world's 
            leading brands by blending AI, design, and technology.
          </p>
        </div>

        {/* Services Cards */}
        <div className="flex flex-col md:flex-row gap-4 max-w-7xl mx-auto">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ease-in-out min-h-[300px] sm:min-h-[400px] md:min-h-[500px] ${
                expandedCard === service.id
                  ? 'flex-[2] md:flex-[2]'
                  : expandedCard && expandedCard !== service.id
                  ? 'flex-[0.3] md:flex-[0.5]'
                  : 'flex-1'
              }`}
              onClick={() => handleCardClick(service.id)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-700 ${
                index === 0 ? 'from-blue-600 via-blue-700 to-purple-800' :
                index === 1 ? 'from-blue-500 via-purple-600 to-blue-800' :
                'from-purple-600 via-blue-600 to-indigo-800'
              }`}>
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20"></div>
              </div>

              {/* Content */}
              <div className="relative h-full p-4 sm:p-6 lg:p-8 flex flex-col">
                {/* Collapsed State */}
                <div className={`transition-all duration-500 ${
                  expandedCard === service.id ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}>
                  <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-3 sm:mb-4">
                    {service.title}
                  </h3>
                  <p className="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-auto pt-6">
                    <div className="flex items-center text-white/80 text-sm">
                      <span>Explore</span>
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Expanded State */}
                <div className={`absolute inset-6 lg:inset-8 transition-all duration-500 ${
                  expandedCard === service.id ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}>
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white">
                      {service.title}
                    </h3>
                    <button className="text-white/60 hover:text-white transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-6 text-white">
                    <div>
                      <h4 className="text-lg font-semibold mb-3">Our Approach</h4>
                      <p className="text-white/90 leading-relaxed">
                        {service.approach}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4">
                      <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection