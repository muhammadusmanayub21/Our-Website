import Image from 'next/image'
import Link from 'next/link'

const discoverLinks = [
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Work', href: '/work' },
  { name: 'Blog', href: '/blog' },
]

const legalLinks = [
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Privacy Policy', href: '/privacy' },
]

const mantra = ['Think', 'Build', 'Ship', 'Scale']

// Placeholder hrefs — replace with real profile URLs once available.
const socialLinks = [
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <>
        <rect x="3" y="9" width="4" height="12" />
        <circle cx="5" cy="4" r="2" />
        <path d="M11 9v12M11 14c0-3 2-5 5-5s5 2 5 5v7" />
      </>
    ),
  },
  {
    name: 'X',
    href: '#',
    icon: <path d="M4 4l16 16M20 4L4 20" />,
  },
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </>
    ),
  },
  {
    name: 'Facebook',
    href: '#',
    icon: <path d="M14 21v-8h3l1-4h-4V7c0-1 .5-2 2-2h2V1h-3c-3 0-5 2-5 5v3H7v4h3v8h4z" />,
  },
]

const Footer = () => {
  return (
    <footer className="bg-thynkteck-black pt-12 sm:pt-14 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 border-t border-white/10 pt-10 sm:pt-12 grid grid-cols-2 sm:grid-cols-4 gap-8 pb-12 sm:pb-16">
        <div>
          <span className="block text-white/40 text-xs font-semibold tracking-widest uppercase mb-4">
            Discover
          </span>
          <ul className="space-y-2.5">
            {discoverLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/70 hover:text-white text-sm transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className="block text-white/40 text-xs font-semibold tracking-widest uppercase mb-4">
            Legal
          </span>
          <ul className="space-y-2.5">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/70 hover:text-white text-sm transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className="block text-white/40 text-xs font-semibold tracking-widest uppercase mb-4">
            Contact
          </span>
          <a
            href="mailto:services@thynkteck.com"
            className="text-white/70 hover:text-white text-sm transition-colors break-all"
          >
            services@thynkteck.com
          </a>
        </div>

        <div className="text-right">
          {mantra.map((word) => (
            <span
              key={word}
              className="block text-white font-bold leading-[1.1] tracking-tight"
              style={{ fontSize: 'clamp(1.1rem, 2.4vw, 1.75rem)' }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 pb-6 sm:pb-8 overflow-hidden flex items-center">
        <Image
          src="/logo/thynkteck-mark-white.png"
          alt="Thynkteck"
          width={320}
          height={320}
          className="shrink-0"
          style={{ width: 'clamp(5rem, 20vw, 12rem)', height: 'auto' }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 border-t border-white/10 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4">
        <span className="text-white/50 text-xs">
          © {new Date().getFullYear()} Thynkteck. All rights reserved.
        </span>
        <div className="flex gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              aria-label={social.name}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/40 transition-colors"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {social.icon}
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
