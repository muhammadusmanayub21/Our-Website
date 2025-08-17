'use client'

import React, { useState, useEffect } from 'react'

interface TechStack {
  id: string
  title: string
  subtitle: string
  description: string
  color: string
  technologies: Technology[]
}

interface Technology {
  name: string
  icon: string
  color: string
}

const techStacks: TechStack[] = [
  {
    id: 'mobile',
    title: 'We use',
    subtitle: 'SwiftUI',
    description: 'Our technical, tools and technologies we used to build these world-class products.',
    color: 'text-orange-400',
    technologies: [
      { name: 'Swift', icon: '🦉', color: 'text-orange-500' },
      { name: 'Xcode', icon: '🔧', color: 'text-blue-500' },
      { name: 'iOS', icon: '📱', color: 'text-gray-400' },
      { name: 'Flutter', icon: '💙', color: 'text-blue-400' },
      { name: 'Dart', icon: '🎯', color: 'text-cyan-400' },
      { name: 'Firebase', icon: '🔥', color: 'text-orange-600' }
    ]
  },
  {
    id: 'web',
    title: 'We use',
    subtitle: 'Flutter',
    description: 'Our technical, tools and technologies we used to build these world-class products.',
    color: 'text-blue-400',
    technologies: [
      { name: 'Kotlin', icon: '💜', color: 'text-purple-500' },
      { name: 'Node.js', icon: '🟢', color: 'text-green-500' },
      { name: 'Swift', icon: '🦉', color: 'text-orange-500' },
      { name: 'Flutter', icon: '💙', color: 'text-blue-400' },
      { name: 'Figma', icon: '🎨', color: 'text-pink-500' },
      { name: 'JavaScript', icon: '⚡', color: 'text-yellow-500' }
    ]
  },
  {
    id: 'react',
    title: 'We use',
    subtitle: 'React Native',
    description: 'Our technical, tools and technologies we used to build these world-class products.',
    color: 'text-cyan-400',
    technologies: [
      { name: 'React', icon: '⚛️', color: 'text-cyan-400' },
      { name: 'TypeScript', icon: '🔷', color: 'text-blue-600' },
      { name: 'Next.js', icon: '▲', color: 'text-white' },
      { name: 'Redux', icon: '🔄', color: 'text-purple-500' },
      { name: 'Tailwind', icon: '🎨', color: 'text-cyan-500' },
      { name: 'Node.js', icon: '🟢', color: 'text-green-500' }
    ]
  },
  {
    id: 'backend',
    title: 'We use',
    subtitle: 'Node.js',
    description: 'Our technical, tools and technologies we used to build these world-class products.',
    color: 'text-green-400',
    technologies: [
      { name: 'Express', icon: '🚀', color: 'text-gray-400' },
      { name: 'MongoDB', icon: '🍃', color: 'text-green-600' },
      { name: 'PostgreSQL', icon: '🐘', color: 'text-blue-700' },
      { name: 'Docker', icon: '🐳', color: 'text-blue-500' },
      { name: 'AWS', icon: '☁️', color: 'text-orange-500' },
      { name: 'GraphQL', icon: '📊', color: 'text-pink-500' }
    ]
  }
]

const TechStackSection = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % techStacks.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % techStacks.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + techStacks.length) % techStacks.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const currentStack = techStacks[currentSlide]

  return (
    <section className="min-h-screen bg-gray-900 py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Slider Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Slide Content */}
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden">
            <div className="relative bg-gray-800/50 rounded-3xl p-8 md:p-12 backdrop-blur-sm border border-gray-700/50 h-full flex flex-col justify-center">
              {/* Technology Icons Grid */}
              <div className="grid grid-cols-3 gap-6 mb-12">
                {currentStack.technologies.map((tech, techIndex) => (
                  <div
                    key={tech.name}
                    className="flex flex-col items-center group cursor-pointer"
                    onMouseEnter={() => setHoveredTech(tech.name)}
                    onMouseLeave={() => setHoveredTech(null)}
                  >
                    {/* Icon Container */}
                    <div className={`
                      w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-gray-600/50
                      flex items-center justify-center text-2xl md:text-3xl
                      transition-all duration-300 group-hover:scale-110 group-hover:border-gray-500
                      ${tech.color} bg-gray-800/80 backdrop-blur-sm
                      ${hoveredTech === tech.name ? 'shadow-lg shadow-gray-700/50' : ''}
                    `}>
                      {/* Custom icons */}
                      {tech.name === 'Swift' && (
                        <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      )}
                      {tech.name === 'Node.js' && (
                        <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l7.44 4.3c.46.26 1.04.26 1.5 0l7.44-4.3c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.51-.2-.78-.2z"/>
                        </svg>
                      )}
                      {tech.name === 'Flutter' && (
                        <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46z"/>
                        </svg>
                      )}
                      {tech.name === 'React' && (
                        <svg className="w-8 h-8 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.014-1.36.034.45-.572.905-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.866.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005 1.826-2.857 2.94-4.898 3.72-.379.145-.774.279-1.225.408.24-.64.45-1.31.629-1.993.273-.69.5-1.387.666-2.077.16-.69.27-1.37.3-2.032zm-14.835 1.958c.79.001 1.543.25 2.055.625.596.44 1.421.27 1.77-.231.19-.273.32-.593.408-.956.415.934.79 1.477 1.316 1.495 1.05.035 1.899-.648 2.922-.22-.606.642-1.475 1.15-2.63.95-.965-.158-1.801-.682-2.39-1.327-.758.045-1.61.24-2.417-.19-.653-.346-1.147-1.083-1.034-1.836v-.31z"/>
                        </svg>
                      )}
                      {!['Swift', 'Node.js', 'Flutter', 'React'].includes(tech.name) && (
                        <span className="text-2xl">{tech.icon}</span>
                      )}
                    </div>
                    
                    {/* Technology Name */}
                    <span className={`
                      mt-3 text-sm text-gray-400 transition-all duration-300
                      ${hoveredTech === tech.name ? 'text-white' : ''}
                    `}>
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Text Content */}
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl text-white mb-4">
                  {currentStack.title} <span className={`font-bold ${currentStack.color}`}>{currentStack.subtitle}</span>
                </h3>
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                  {currentStack.description}
                </p>
              </div>

              {/* Subtle background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-800/10 to-gray-700/20 rounded-3xl pointer-events-none"></div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-800/80 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm border border-gray-600/50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-800/80 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm border border-gray-600/50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-3 mt-8">
            {techStacks.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white shadow-lg' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          {/* Auto-play Progress Bar */}
          <div className="mt-6 w-full bg-gray-700/50 h-1 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all ease-linear"
              style={{
                width: isAutoPlaying ? '100%' : '0%',
                transitionDuration: isAutoPlaying ? '4000ms' : '0ms'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TechStackSection