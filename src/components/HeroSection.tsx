'use client'

import React, { useState, useEffect } from 'react'

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    // Trigger entrance animations
    setIsLoaded(true)

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="min-h-screen bg-gradient-to-br from-devsphere-green to-devsphere-dark-green relative overflow-hidden flex flex-col">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Geometric Shapes - Responsive sizing */}
        <div className="absolute top-16 sm:top-20 left-4 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-black/10 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-32 sm:top-40 right-8 sm:right-20 w-10 h-10 sm:w-16 sm:h-16 bg-black/15 transform rotate-45 animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 sm:bottom-40 left-1/4 w-8 h-8 sm:w-12 sm:h-12 bg-black/10 rounded-full animate-ping delay-500"></div>
        
        {/* Animated Lines - Responsive sizing */}
        <div className="absolute top-1/3 right-4 sm:right-10 w-20 sm:w-32 h-1 bg-black/20 transform -rotate-12 animate-pulse delay-300"></div>
        <div className="absolute bottom-1/3 left-8 sm:left-20 w-16 sm:w-24 h-1 bg-black/15 transform rotate-45 animate-pulse delay-800"></div>
        
        {/* Gradient Orbs - Responsive sizing */}
        <div className="absolute top-12 sm:top-16 right-1/4 sm:right-1/3 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl animate-pulse delay-200"></div>
        <div className="absolute bottom-16 sm:bottom-20 right-8 sm:right-16 w-24 h-24 sm:w-40 sm:h-40 bg-gradient-to-br from-black/5 to-transparent rounded-full blur-2xl animate-pulse delay-600"></div>
      </div>

      {/* Main Content - Left Side */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex-1 flex items-center">
        <div className="max-w-2xl">
          <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-black mb-2 sm:mb-4 leading-tight transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            DevSphere
          </h1>
          <p className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black font-normal transition-all duration-1000 delay-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Design & Development Studio
          </p>
        </div>
      </div>

      {/* Stepped Pattern - Right Side */}
      <div className="absolute right-8 sm:right-12 lg:right-16 top-1/2 transform -translate-y-1/2 z-10">
        <div className="flex flex-col items-end space-y-1">
          <div className="bg-green-800 opacity-80" style={{width: '20px', height: '20px'}}></div>
          <div className="bg-green-800 opacity-80" style={{width: '40px', height: '20px'}}></div>
          <div className="bg-green-800 opacity-80" style={{width: '60px', height: '20px'}}></div>
          <div className="bg-green-800 opacity-80" style={{width: '80px', height: '20px'}}></div>
          <div className="bg-green-800 opacity-80" style={{width: '100px', height: '20px'}}></div>
          <div className="bg-green-800 opacity-80" style={{width: '120px', height: '20px'}}></div>
        </div>
      </div>

      {/* Interactive Parallax Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Mouse-responsive floating elements */}
        <div 
          className="absolute w-6 h-6 bg-black/20 rounded-full transition-transform duration-300 ease-out"
          style={{
            left: '20%',
            top: '30%',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        ></div>
        <div 
          className="absolute w-4 h-4 bg-black/15 rounded-full transition-transform duration-500 ease-out"
          style={{
            right: '25%',
            top: '60%',
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        ></div>
        <div 
          className="absolute w-8 h-2 bg-black/10 rounded-full transition-transform duration-400 ease-out"
          style={{
            left: '70%',
            bottom: '40%',
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * -0.01}px) rotate(45deg)`
          }}
        ></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-pattern animate-pulse"></div>
      </div>
      
      {/* Cursor Following Vector Pattern */}
      {/* <div 
        className="fixed pointer-events-none z-20 transition-all duration-100 ease-out"
        style={{
          left: `${mousePosition.x + 20}px`,
          top: `${mousePosition.y - 60}px`,
          transform: 'translate(0, 0)'
        }}
      >
        <svg 
          width="120" 
          height="120" 
          viewBox="0 0 120 120" 
          fill="none" 
          className="opacity-80"
        >
          <path 
            d="M10 110 L10 90 L25 90 L25 75 L40 75 L40 60 L55 60 L55 45 L70 45 L70 30 L85 30 L85 15 L100 15 L100 0 L120 0 L120 20 L105 20 L105 35 L90 35 L90 50 L75 50 L75 65 L60 65 L60 80 L45 80 L45 95 L30 95 L30 110 L10 110 Z" 
            fill="#65a30d"
          />
        </svg>
      </div> */}
    </section>
  )
}

export default HeroSection