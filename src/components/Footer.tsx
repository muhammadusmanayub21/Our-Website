import Link from 'next/link'
import Button from '@/components/ui/Button'

const techStack = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Shopify', 'WordPress',
  'AWS', 'PostgreSQL', 'Python', 'Figma', 'Tailwind CSS', 'GraphQL',
]

const footerLinks = [
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Work', href: '/work' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

const Footer = () => {
  return (
    <footer className="bg-thynkteck-soft-black pt-16 sm:pt-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 text-center mb-14 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
          Have a project in mind?
        </h2>
        <p className="text-base sm:text-lg text-white/70 mb-8 max-w-2xl mx-auto">
          Tell us what you're building — we'll get back to you within one business day.
        </p>
        <Button href="/contact">Let's talk</Button>
      </div>

      <div className="relative border-y border-white/10 py-6 mb-12">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...techStack, ...techStack].map((tech, index) => (
            <span key={`${tech}-${index}`} className="mx-8 text-white/40 text-lg font-medium">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 pb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-white/60 text-sm">© {new Date().getFullYear()} Thynkteck. All rights reserved.</span>
        <div className="flex gap-6">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-white/60 hover:text-white text-sm transition-colors">
              {link.name}
            </Link>
          ))}
        </div>
        <a href="mailto:services@thynkteck.com" className="text-white/60 hover:text-white text-sm transition-colors">
          services@thynkteck.com
        </a>
      </div>
    </footer>
  )
}

export default Footer
