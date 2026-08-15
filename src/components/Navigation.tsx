'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { services } from '@/data/services'
import { projects } from '@/data/projects'

const navItems = [
  { name: 'About', href: '/about' },
  {
    name: 'Services',
    href: '/services',
    children: services.map((s) => ({ name: s.title, href: `/services/${s.slug}` })),
  },
  {
    name: 'Work',
    href: '/work',
    children: projects.map((p) => ({ name: p.title, href: `/work/${p.slug}` })),
  },
  { name: 'Blog', href: '/blog' },
]

const Navigation = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4">
      <div className="bg-thynkteck-soft-black/90 backdrop-blur border border-white/10 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-lg flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo/thynkteck-mark-white.png" alt="Thynkteck" width={32} height={32} />
        </Link>

        <ul className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <li
              key={item.name}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.name)}
              onMouseLeave={() => item.children && setOpenDropdown(null)}
            >
              <Link href={item.href} className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                {item.name}
              </Link>
              {item.children && openDropdown === item.name && (
                <ul className="absolute top-full left-0 mt-3 w-64 rounded-2xl bg-thynkteck-soft-black border border-white/10 p-2 shadow-xl">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="block rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white"
                      >
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="hidden md:inline-flex bg-thynkteck-blue text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors"
        >
          Contact
        </Link>

        <button
          className="md:hidden text-white"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden mt-2 rounded-2xl bg-thynkteck-soft-black border border-white/10 p-4">
          {navItems.map((item) => (
            <div key={item.name} className="py-2 border-b border-white/10 last:border-none">
              <Link
                href={item.href}
                className="block text-white font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
              {item.children && (
                <div className="mt-2 ml-3 flex flex-col gap-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="text-sm text-white/70"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/contact"
            className="mt-3 block text-center bg-thynkteck-blue text-white px-4 py-2 rounded-full text-sm font-semibold"
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navigation
