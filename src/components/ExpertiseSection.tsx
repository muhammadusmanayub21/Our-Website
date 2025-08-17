'use client'

import React, { useEffect, useRef, useState } from 'react'

interface ExpertiseBar {
  years: number
  label: string
  description: string
}

const expertiseData: ExpertiseBar[] = [
  { years: 24, label: 'UI/UX', description: 'Experience in interface design and user experience' },
  { years: 15, label: 'Backend', description: 'Product Development' },
  { years: 8, label: 'DevOps', description: 'Scalable & reliable infrastructure' },
  { years: 10, label: 'QA', description: 'App development' },
  { years: 6, label: 'AI/ML', description: 'Artificial intelligence and machine learning' }
]

const ExpertiseSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedBars, setAnimatedBars] = useState<boolean[]>(new Array(expertiseData.length).fill(false))
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Animate bars with staggered timing
          expertiseData.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedBars(prev => {
                const newState = [...prev]
                newState[index] = true
                return newState
              })
            }, index * 200)
          })
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const getBarHeight = (years: number) => {
    const maxHeight = 200
    const minHeight = 60
    const maxYears = 24
    return minHeight + ((years / maxYears) * (maxHeight - minHeight))
  }

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-devsphere-green py-12 sm:py-16 lg:py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
            Our <em className="italic">Expertise</em>
          </h2>
          <p className="text-base sm:text-lg text-black/70 max-w-2xl mx-auto px-4">
            We bring together years of experience across multiple domains
            to create comprehensive digital solutions.
          </p>
        </div>

        {/* Expertise Bars */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
          {expertiseData.map((item, index) => (
            <div key={index} className="flex flex-col items-center group">
              {/* Years Label */}
              <div className="mb-3 sm:mb-4 text-center">
                <div className="bg-black text-devsphere-green px-2 sm:px-3 py-1 sm:py-2 rounded-lg font-bold text-sm sm:text-lg md:text-xl mb-2 min-w-[50px] sm:min-w-[60px]">
                  {item.years}<span className="text-xs sm:text-sm ml-1">yrs</span>
                </div>
              </div>
              
              {/* Bar Container */}
              <div className="relative flex flex-col items-center">
                {/* Bar */}
                <div 
                  className="bg-black rounded-t-lg transition-all duration-1000 ease-out relative overflow-hidden w-12 sm:w-16 md:w-20"
                  style={{
                    height: animatedBars[index] ? `${Math.max(getBarHeight(item.years) * 0.7, 40)}px` : '0px'
                  }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </div>
                
                {/* Base */}
                <div className="w-12 sm:w-16 md:w-20 h-2 sm:h-3 bg-black rounded-b-lg"></div>
              </div>

              {/* Label and Description */}
              <div className="mt-3 sm:mt-4 text-center">
                <h3 className="font-bold text-black text-xs sm:text-sm md:text-base mb-1">
                  {item.label}
                </h3>
                <p className="text-black/70 text-xs sm:text-sm max-w-[100px] sm:max-w-[120px] leading-tight px-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
      </div>
    </section>
  )
}

export default ExpertiseSection