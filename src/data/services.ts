// Placeholder service copy — refine wording once real case studies/results are available.
import { Service } from './types'

export const services: Service[] = [
  {
    slug: 'web-app-development',
    title: 'Web & App Development',
    shortDescription: 'Custom websites and web/mobile apps built for speed, scale, and maintainability.',
    longDescription:
      'We design and build custom web and mobile applications end to end — from technical architecture through launch and beyond. Our team works across the modern web stack to ship products that are fast, accessible, and easy for your own team to extend.',
    capabilities: [
      'Custom web application development',
      'Mobile app development (iOS & Android)',
      'API design and backend engineering',
      'Performance and accessibility optimization',
    ],
    process: [
      { title: 'Discover', description: 'We map requirements, users, and technical constraints before writing a line of code.' },
      { title: 'Build', description: 'Iterative development in short cycles, with staging environments you can review continuously.' },
      { title: 'Launch & support', description: 'Production rollout, monitoring, and an ongoing support plan tailored to your team.' },
    ],
    tags: ['web', 'app'],
  },
  {
    slug: 'ui-ux-branding',
    title: 'UI/UX & Branding',
    shortDescription: 'Product design and brand identity that make your business feel as good as it works.',
    longDescription:
      'From first sketches to a full design system, we craft interfaces and brand identities that are distinctive, usable, and consistent across every touchpoint — product, marketing site, and print.',
    capabilities: [
      'Brand identity & visual systems',
      'UI/UX design for web and mobile products',
      'Design systems and component libraries',
      'User research and usability testing',
    ],
    process: [
      { title: 'Research', description: 'Understand your users, competitors, and brand positioning.' },
      { title: 'Design', description: 'Wireframes through high-fidelity UI, validated with real users along the way.' },
      { title: 'Systemize', description: 'Package the result into a reusable design system your team can build on.' },
    ],
    tags: ['design', 'branding'],
  },
  {
    slug: 'ai-automation-data',
    title: 'AI, Automation & Data',
    shortDescription: 'Practical AI integrations and automation that remove manual work and unlock your data.',
    longDescription:
      'We integrate AI where it creates real leverage — support automation, internal tooling, data pipelines — and build the data infrastructure that makes it reliable, not a demo that breaks in production.',
    capabilities: [
      'LLM-powered product features and internal tools',
      'Workflow automation across your existing systems',
      'Data pipeline and analytics infrastructure',
      'Machine learning model integration',
    ],
    process: [
      { title: 'Assess', description: 'Identify where AI/automation actually saves time or unlocks value, and where it does not.' },
      { title: 'Prototype', description: 'Build a working prototype against your real data before committing to a full build.' },
      { title: 'Productionize', description: 'Harden the prototype with monitoring, guardrails, and fallback behavior.' },
    ],
    tags: ['ai', 'automation', 'data'],
  },
  {
    slug: 'it-consulting',
    title: 'IT Consulting & Managed Services',
    shortDescription: 'Technology strategy, cloud infrastructure, and ongoing support for growing teams.',
    longDescription:
      'We act as an extension of your team for infrastructure, DevOps, and technology strategy — helping you make sound architecture decisions and keeping systems running once they are live.',
    capabilities: [
      'Cloud infrastructure design and migration',
      'DevOps and CI/CD pipeline setup',
      'Technology strategy and vendor evaluation',
      'Ongoing managed support and monitoring',
    ],
    process: [
      { title: 'Audit', description: 'Review your current infrastructure, costs, and risk areas.' },
      { title: 'Plan', description: 'A prioritized roadmap balancing reliability, cost, and delivery speed.' },
      { title: 'Operate', description: 'Ongoing managed support with clear SLAs.' },
    ],
    tags: ['consulting', 'cloud'],
  },
  {
    slug: 'custom-software',
    title: 'Custom Software Development',
    shortDescription: 'Bespoke software for the specific workflows of your industry — built to fit, not to compromise.',
    longDescription:
      'When off-the-shelf software does not fit how your business actually works, we design and build custom systems tailored to your industry, whether that is internal tooling, a customer-facing platform, or industry-specific compliance software.',
    capabilities: [
      'Custom internal tools and admin platforms',
      'Industry-specific compliance and workflow software',
      'Legacy system modernization',
      'Systems integration across existing tools',
    ],
    process: [
      { title: 'Understand', description: 'Deep-dive into the workflow the software needs to support.' },
      { title: 'Build', description: 'Incremental delivery so you can validate fit early and often.' },
      { title: 'Evolve', description: 'Ongoing iteration as your processes change.' },
    ],
    tags: ['software', 'enterprise'],
  },
  {
    slug: 'shopify-development',
    title: 'Shopify Ecommerce Development',
    shortDescription: 'Custom Shopify storefronts and app integrations built to convert.',
    longDescription:
      'We build and customize Shopify stores — from theme development to custom app integrations — so your storefront reflects your brand and performs at checkout, not just at first glance.',
    capabilities: [
      'Custom Shopify theme development',
      'Shopify Plus migrations',
      'Third-party app and payment integrations',
      'Conversion-focused storefront optimization',
    ],
    process: [
      { title: 'Plan', description: 'Map your catalog, checkout flow, and integration needs.' },
      { title: 'Build', description: 'Custom theme and app work on a staging store you can review.' },
      { title: 'Launch', description: 'Go-live support and post-launch optimization.' },
    ],
    tags: ['shopify', 'ecommerce'],
  },
  {
    slug: 'wordpress-development',
    title: 'WordPress Development',
    shortDescription: 'Custom WordPress builds that stay easy for your team to manage after launch.',
    longDescription:
      'We build custom WordPress sites and themes that are fast, secure, and genuinely editable by your team afterward — no fighting the CMS to make a simple content change.',
    capabilities: [
      'Custom WordPress theme and plugin development',
      'Headless WordPress builds',
      'Site migration and performance hardening',
      'Editor-friendly content modeling',
    ],
    process: [
      { title: 'Structure', description: 'Define the content model so editing stays simple after handoff.' },
      { title: 'Build', description: 'Custom theme/plugin development against that structure.' },
      { title: 'Train', description: 'Handoff with documentation so your team owns the CMS confidently.' },
    ],
    tags: ['wordpress', 'cms'],
  },
]
