import Link from 'next/link'
import { services } from '@/data/services'
import BentoCard from '@/components/ui/BentoCard'

const icons: Record<string, JSX.Element> = {
  'web-app-development': (
    <>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 9h18" />
    </>
  ),
  'ui-ux-branding': (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 010 18 4.5 4.5 0 01-4.5-4.5c0-1 .5-1.5 1.5-1.5h1a2 2 0 002-2v-.5A2 2 0 0114 10.5h1.5A2.5 2.5 0 0018 8" />
    </>
  ),
  'ai-automation-data': (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    </>
  ),
  'it-consulting': (
    <>
      <path d="M12 2l9 4.5v9L12 20l-9-4.5v-9L12 2z" />
      <path d="M12 2v18M3 6.5l9 4.5 9-4.5" />
    </>
  ),
  'custom-software': (
    <>
      <path d="M8 6l-5 6 5 6M16 6l5 6-5 6" />
    </>
  ),
  'shopify-development': (
    <>
      <path d="M6 8h12l-1 12H7L6 8z" />
      <path d="M9 8a3 3 0 016 0" />
    </>
  ),
  'wordpress-development': (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M6 8l3.5 9L12 11l2.5 6L18 8" />
    </>
  ),
}

export default function ServiceGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {services.map((service) => (
        <Link key={service.slug} href={`/services/${service.slug}`}>
          <BentoCard className="h-full cursor-pointer">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-thynkteck-black border border-thynkteck-blue/40 mb-5">
              <svg
                className="w-5 h-5 text-thynkteck-blue"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {icons[service.slug]}
              </svg>
            </div>
            <h3 className="text-subhead font-semibold text-white mb-2">{service.title}</h3>
            <p className="text-white/60 text-caption mb-5">{service.shortDescription}</p>
            <ul className="space-y-2">
              {service.capabilities.slice(0, 3).map((capability) => (
                <li key={capability} className="flex items-start gap-2 text-caption text-white/70">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-thynkteck-blue shrink-0" />
                  {capability}
                </li>
              ))}
            </ul>
          </BentoCard>
        </Link>
      ))}
    </div>
  )
}
