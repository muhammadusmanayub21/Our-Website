import Image from 'next/image'
import Link from 'next/link'
import ContactForm from '@/components/contact/ContactForm'

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

type FooterProps = {
  showContactForm?: boolean
}

const Footer = ({ showContactForm = true }: FooterProps) => {
  return (
    <footer
      className="relative overflow-x-clip text-white"
      style={{
        background:
          'linear-gradient(165deg, #0B35FA 0%, #0829C4 28%, #04155A 62%, #000000 100%)',
      }}
    >
      {showContactForm && (
        <div className="container mx-auto px-4 sm:px-6 pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-14 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-start">
            <div className="min-w-0">
              <span className="block text-white/60 text-caption font-semibold tracking-[0.2em] uppercase mb-3 sm:mb-4">
                Get in touch
              </span>
              <h2 className="text-footer-cta font-bold text-white lowercase mb-4 sm:mb-5">
                let&apos;s build
                <br />
                something
                <br />
                together
              </h2>
              <p className="text-white/75 text-body max-w-md mb-6 sm:mb-8">
                Tell us what you&apos;re building — we&apos;ll get back to you within one business day.
              </p>
              <a
                href="mailto:services@thynkteck.com"
                className="text-white/85 hover:text-white text-body transition-colors break-all"
              >
                services@thynkteck.com
              </a>
            </div>

            <div className="min-w-0 w-full">
              <ContactForm variant="footer" />
            </div>
          </div>
        </div>
      )}

      <div
        className={`container mx-auto px-4 sm:px-6 ${
          showContactForm ? 'border-t border-white/15 pt-10 sm:pt-12 lg:pt-14' : 'pt-12 sm:pt-14 lg:pt-16'
        } pb-10 sm:pb-12 lg:pb-16 grid grid-cols-2 md:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-10`}
      >
        <div className="min-w-0">
          <span className="block text-white/50 text-caption font-semibold tracking-[0.18em] uppercase mb-4 sm:mb-5">
            Discover
          </span>
          <ul className="space-y-2.5 sm:space-y-3">
            {discoverLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/75 hover:text-white text-body transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <span className="block text-white/50 text-caption font-semibold tracking-[0.18em] uppercase mb-4 sm:mb-5">
            Legal
          </span>
          <ul className="space-y-2.5 sm:space-y-3">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/75 hover:text-white text-body transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 col-span-2 md:col-span-1">
          <span className="block text-white/50 text-caption font-semibold tracking-[0.18em] uppercase mb-4 sm:mb-5">
            Contact
          </span>
          <a
            href="mailto:services@thynkteck.com"
            className="text-white/75 hover:text-white text-body transition-colors break-all"
          >
            services@thynkteck.com
          </a>
        </div>

        <div className="min-w-0 col-span-2 md:col-span-1 text-left md:text-right">
          {mantra.map((word) => (
            <span
              key={word}
              className="block text-white font-bold text-mantra"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 pb-6 sm:pb-10 lg:pb-12 flex justify-center">
        <div
          className="w-[min(100%,20rem)] sm:w-[min(100%,32rem)] md:w-[min(100%,40rem)] lg:w-[min(100%,48rem)]"
          style={{
            WebkitMaskImage:
              'linear-gradient(180deg, #000 0%, #000 45%, rgba(0,0,0,0.7) 68%, rgba(0,0,0,0.25) 85%, transparent 100%)',
            maskImage:
              'linear-gradient(180deg, #000 0%, #000 45%, rgba(0,0,0,0.7) 68%, rgba(0,0,0,0.25) 85%, transparent 100%)',
          }}
        >
          <Image
            src="/logo/thynkteck-wordmark-transparent.png"
            alt="Thynkteck"
            width={1024}
            height={266}
            sizes="(max-width: 640px) 20rem, (max-width: 768px) 32rem, (max-width: 1024px) 40rem, 48rem"
            className="w-full h-auto select-none pointer-events-none"
            priority={false}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5 border-t border-white/15 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
        <span className="text-white/45 text-caption tracking-wide order-2 sm:order-1">
          © {new Date().getFullYear()} Thynkteck. All rights reserved.
        </span>
        <div className="flex gap-1 sm:gap-2 order-1 sm:order-2">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              aria-label={social.name}
              className="flex items-center justify-center w-9 h-9 sm:w-8 sm:h-8 text-white/40 hover:text-white/85 transition-colors"
            >
              <svg
                className="w-3.5 h-3.5"
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
