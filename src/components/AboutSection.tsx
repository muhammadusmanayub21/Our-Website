'use client'

import React from 'react'

const AboutSection = () => {
  return (
    <section className="bg-gray-100 pt-12 sm:pt-16 lg:pt-20 pb-0">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Main Content */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 sm:mb-6 leading-tight">
            Crafting Scalable Solutions with<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>Precision <em className="italic">Product Engineering</em>
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
            At DevSphere, we turn ideas into powerful digital products—combining strategy, 
            design, and engineering for startups and enterprises alike.
          </p>
          
          <button className="bg-devsphere-green hover:bg-devsphere-dark-green text-black font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-colors duration-200 shadow-lg">
            LET'S WORK TOGETHER
          </button>
        </div>

        {/* Device Mockups */}
        <div className="relative flex flex-col lg:flex-row justify-center items-end mt-16 sm:mt-20 lg:mt-24">
          {/* iPhone Mockup - Left Side, Bottom Aligned */}
          <div className="relative mx-auto lg:mx-0 order-2 lg:order-1 self-end">
            <img 
              src="/assets/iphone-11-pro.png"
              alt="iPhone 11 Pro Mockup"
              className="w-32 sm:w-40 lg:w-48 h-auto drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))'
              }}
            />
          </div>

          {/* Browser/Laptop Mockup - Right Side, Elevated */}
          <div className="relative mx-auto lg:mx-0 order-1 lg:order-2 lg:ml-8 xl:ml-12">
            <img 
              src="/assets/1281.png"
              alt="Browser Window Mockup"
              className="w-72 sm:w-80 lg:w-96 xl:w-[420px] h-auto drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.25))'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection