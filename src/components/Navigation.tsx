'use client'

import React from 'react'

const Navigation = () => {
  const navItems = [
    { name: 'DEVSPHERE', href: '/', isLogo: true },
    { name: 'ABOUT', href: '/about' },
    { name: 'SERVICES', href: '/services' },
    { name: 'WORK', href: '/work' },
    { name: 'CONTACT', href: '/contact', isHighlighted: true },
  ]

  return (
    <nav className="fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <div className="bg-white rounded-full px-3 sm:px-4 md:px-6 py-2 sm:py-3 shadow-lg mx-auto w-fit">
        <ul className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={`text-xs sm:text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                  item.isLogo
                    ? 'text-black font-bold hidden sm:block'
                    : item.isHighlighted
                    ? 'bg-black text-white px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm'
                    : 'text-gray-700 hover:text-black'
                }`}
              >
                {item.isLogo ? (
                  <span className="sm:hidden">DS</span>
                ) : null}
                <span className={item.isLogo ? 'hidden sm:inline' : ''}>
                  {item.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation