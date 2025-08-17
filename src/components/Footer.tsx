'use client'

import React from 'react'

interface CompanyLogo {
  name: string
  logo: JSX.Element
}

const Footer = () => {
  const companyLogos: CompanyLogo[] = [
    {
      name: 'Netflix',
      logo: (
        <div className="text-black font-bold text-xl">
          NETFLIX
        </div>
      )
    },
    {
      name: 'Microsoft',
      logo: (
        <div className="flex items-center space-x-2">
          <div className="grid grid-cols-2 gap-1">
            <div className="w-3 h-3 bg-orange-500"></div>
            <div className="w-3 h-3 bg-green-500"></div>
            <div className="w-3 h-3 bg-blue-500"></div>
            <div className="w-3 h-3 bg-yellow-500"></div>
          </div>
          <span className="text-black font-medium text-lg">Microsoft</span>
        </div>
      )
    },
    {
      name: 'Adobe',
      logo: (
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-red-600 rounded-sm flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="text-black font-medium text-lg">Adobe</span>
        </div>
      )
    },
    {
      name: 'LinkedIn',
      logo: (
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-600 rounded-sm flex items-center justify-center">
            <span className="text-white font-bold text-sm">in</span>
          </div>
          <span className="text-black font-medium text-lg">LinkedIn</span>
        </div>
      )
    },
    {
      name: 'Instagram',
      logo: (
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 border border-white rounded-full"></div>
          </div>
          <span className="text-black font-medium text-lg">Instagram</span>
        </div>
      )
    },
    {
      name: 'PayPal',
      logo: (
        <div className="text-blue-600 font-bold text-xl">
          PayPal
        </div>
      )
    }
  ]

  const socialLinks = [
    {
      name: 'Dribbble',
      url: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm7.568 5.302c1.4 1.7 2.252 3.853 2.299 6.207-.119-.025-1.326-.268-2.551-.111-.225-5.207-1.177-9.456-1.266-10.248a10.014 10.014 0 0 1 1.518 4.152zm-2.818-3.26c.117.847 1.058 5.015 1.248 10.133-1.612.422-3.029.422-3.372.397-.847-3.935-2.178-7.22-2.359-7.678a10.05 10.05 0 0 1 4.483-2.852zM8.9 2.855c.204.486 1.538 3.743 2.359 7.678-3.017.806-5.663.791-5.944.785a10.016 10.016 0 0 1 3.585-8.463zm-4.44 9.986c.31.017 3.704.055 7.15-.934.119.235.232.476.333.722-4.204 1.184-6.403 4.456-6.628 4.847a10.04 10.04 0 0 1-.855-4.635zm2.616 6.481c.155-.285 1.98-3.249 5.732-4.648a38.772 38.772 0 0 1 1.563 6.066 10.067 10.067 0 0 1-7.295-1.418zm8.854.5c-.119-.851-.742-4.186-1.481-6.116 1.06-.169 2.002.107 2.11.137a10.066 10.066 0 0 1-.629 5.979z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    }
  ]

  return (
    <footer className="bg-devsphere-green py-12 sm:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Company Logos */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {companyLogos.map((company, index) => (
              <div
                key={company.name}
                className="flex items-center opacity-80 hover:opacity-100 transition-opacity duration-300"
              >
                {company.logo}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6">
            Trusted by <em className="italic">forward-thinking</em> teams
          </h2>
          <p className="text-base sm:text-lg text-black/80 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            We've partnered with startups and enterprises clients across finance, healthcare, and e-commerce. Let's see what we can accomplish together in life.
          </p>
          
          {/* CTA Button */}
          <button className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg">
            LET'S WORK TOGETHER
          </button>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-black/20">
          {/* Left - Copyright */}
          <div className="text-black/80 text-sm mb-4 md:mb-0">
            DevSphere
          </div>

          {/* Center - Social Links */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                className="text-black/80 hover:text-black transition-colors duration-200"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Right - Links */}
          <div className="text-black/80 text-sm">
            LinkedIn
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/5 to-black/10 pointer-events-none"></div>
    </footer>
  )
}

export default Footer