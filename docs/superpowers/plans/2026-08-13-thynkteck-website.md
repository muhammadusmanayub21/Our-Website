# Thynkteck Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand and rebuild the current single-page "DevSphere" site into a full multi-page Thynkteck agency website (home, about, 7 services + detail pages, portfolio + case studies, blog, contact with working email).

**Architecture:** Next.js 14 App Router + TypeScript + Tailwind (existing stack, no framework change). Content for services/projects/posts/team/testimonials lives in typed data files under `src/data/`; the three "detail" routes (`/services/[slug]`, `/work/[slug]`, `/blog/[slug]`) are generated from that data via `generateStaticParams` and a single shared template component each, so there are 3 template components, not 15 hand-built pages. Pure logic (related-work matching, contact form validation) is unit-tested with Vitest; presentational components are verified via typecheck/lint/build plus a manual dev-server check (there is no existing component-testing setup in this repo, and adding React Testing Library for a mostly-static marketing site is not justified — see spec's "explicitly out of scope").

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion (new), Resend (new, email sending), Vitest (new, unit tests for pure logic only).

**Reference spec:** `docs/superpowers/specs/2026-08-13-thynkteck-website-design.md`

## Global Constraints

- Brand colors, exact: `#0B35FA` (blue, primary accent), `#1A1B1B` (soft black, secondary dark surface), `#000000` (true black, base background). Add as Tailwind tokens `thynkteck-blue`, `thynkteck-black`, `thynkteck-soft-black`.
- Contact form destination address: `services@thynkteck.com`.
- Site stays dark-themed throughout; sections alternate `#000000` / `#1A1B1B` backgrounds for rhythm (no light/white sections).
- All service/project/blog/team/testimonial content is placeholder data, clearly marked as such in each data file, structured for easy later replacement.
- No fabricated trust claims (e.g. no "trusted by Netflix/Microsoft/..." logos as currently in `Footer.tsx` — those are real companies Thynkteck has no relationship with; replace with an honest tech-stack ticker instead).
- Reuse the existing Next.js 14 App Router + TypeScript + Tailwind stack; do not introduce a different framework or CSS system.
- Logo assets are already prepared at `public/logo/thynkteck-icon-blue.png` (417×417, blue mark on transparent, for light contexts), `public/logo/thynkteck-icon-white.png` (1016×1016, white mark on transparent, for dark nav/footer use), `public/logo/thynkteck-full-color.png` (1554×396, full wordmark lockup), and `src/app/icon.png` (256×256 favicon, already in place per Next.js App Router convention — no favicon task needed).

---

### Task 1: Dependencies, brand theme, and test harness

**Files:**
- Modify: `package.json`
- Modify: `tailwind.config.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Create: `vitest.config.ts`
- Create: `.env.example`

**Interfaces:**
- Produces: Tailwind color tokens `thynkteck-blue` (`#0B35FA`), `thynkteck-black` (`#000000`), `thynkteck-soft-black` (`#1A1B1B`) available to every later task's `className`s.
- Produces: `npm test` (via `vitest run`) as the command every later task's automated tests run under.
- Produces: `@` path alias resolves inside Vitest tests the same way it does in the Next.js app.

- [ ] **Step 1: Add new dependencies to `package.json`**

Add to `"dependencies"`: `"framer-motion": "^11.3.0"`, `"resend": "^3.5.0"`.
Add to `"devDependencies"`: `"vitest": "^2.0.5"`.

```json
{
  "name": "thynkteck-website",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run"
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "^18",
    "react-dom": "^18",
    "framer-motion": "^11.3.0",
    "resend": "^3.5.0"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "tailwindcss": "^3.4.1",
    "eslint": "^8",
    "eslint-config-next": "14.2.5",
    "autoprefixer": "^10.0.1",
    "postcss": "^8",
    "vitest": "^2.0.5"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `npm install`
Expected: installs succeed, `node_modules` updated, `package-lock.json` updated.

- [ ] **Step 3: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'node',
  },
})
```

- [ ] **Step 4: Verify the test command runs with zero tests**

Run: `npm test`
Expected: Vitest starts, reports "No test files found" (or similar), exits with a message — this just confirms the harness itself is wired up correctly before any tests exist. If it errors on config/resolution, fix `vitest.config.ts` before continuing.

- [ ] **Step 5: Update `tailwind.config.ts` with Thynkteck brand tokens**

Remove the `devsphere-green` / `devsphere-dark-green` tokens entirely and replace with the Thynkteck palette:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'thynkteck-blue': '#0B35FA',
        'thynkteck-black': '#000000',
        'thynkteck-soft-black': '#1A1B1B',
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 6: Update `src/app/layout.tsx` metadata and base page background**

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Thynkteck — Web, App, AI & Design Agency',
  description:
    'Thynkteck is a full-service digital agency: web & app development, UI/UX & branding, AI/automation, IT consulting, Shopify and WordPress development.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-thynkteck-black text-white`}>
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 7: Add shared marquee keyframes to `src/app/globals.css`**

Keep the existing `fade-in-up`, `fade-in-left`, `float`, and `bg-grid-pattern` utilities (still used by later tasks), and append a marquee keyframe used by the footer tech ticker (Task 6):

```css
@layer utilities {
  /* ...existing fade-in-up / fade-in-left / float / bg-grid-pattern rules stay as-is... */

  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  .animate-marquee {
    animation: marquee 25s linear infinite;
  }
}
```

- [ ] **Step 8: Create `.env.example`**

```
# Resend API key for the contact form (https://resend.com)
RESEND_API_KEY=

# Destination address for contact form submissions
CONTACT_TO_EMAIL=services@thynkteck.com
```

- [ ] **Step 9: Verify the app still builds**

Run: `npm run build`
Expected: build succeeds (the existing `page.tsx` still references `devsphere-green`-based components at this point, so if the build fails on missing Tailwind classes, that's fine — Tailwind doesn't fail builds for unknown utility class names, it just won't generate CSS for them. Confirm there are no TypeScript or webpack errors.)

- [ ] **Step 10: Commit**

```bash
git add package.json package-lock.json tailwind.config.ts vitest.config.ts .env.example src/app/layout.tsx src/app/globals.css src/app/icon.png public/logo
git commit -m "chore: rebrand theme tokens, add framer-motion/resend/vitest, prepare logo assets"
```

---

### Task 2: Data layer & types

**Files:**
- Create: `src/data/types.ts`
- Create: `src/data/services.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/posts.ts`
- Create: `src/data/team.ts`
- Create: `src/data/testimonials.ts`
- Test: `src/data/__tests__/data-integrity.test.ts`

**Interfaces:**
- Consumes: nothing (foundational data layer).
- Produces: `Service`, `Project`, `BlogPost`, `TeamMember`, `Testimonial`, `ProjectGalleryImage` types from `@/data/types`, and the arrays `services` (from `@/data/services`), `projects` (from `@/data/projects`), `posts` (from `@/data/posts`), `team` (from `@/data/team`), `testimonials` (from `@/data/testimonials`) — every later page/component task imports from these six modules.
- Produces: `Service.slug` values used by later routing: `web-app-development`, `ui-ux-branding`, `ai-automation-data`, `it-consulting`, `custom-software`, `shopify-development`, `wordpress-development`.
- Produces: `Service.tags` / `Project.tags` string vocabulary used by Task 3's related-work matching: `web`, `app`, `design`, `branding`, `ai`, `automation`, `data`, `consulting`, `cloud`, `software`, `enterprise`, `shopify`, `ecommerce`, `wordpress`, `cms`.

- [ ] **Step 1: Create `src/data/types.ts`**

```ts
export interface ProcessStep {
  title: string
  description: string
}

export interface Service {
  slug: string
  title: string
  shortDescription: string
  longDescription: string
  capabilities: string[]
  process: ProcessStep[]
  tags: string[]
}

export interface ProjectGalleryImage {
  src: string
  alt: string
}

export interface Project {
  slug: string
  title: string
  client: string
  industry: string
  category: string
  coverImage: string
  summary: string
  challenge: string
  approach: string
  result: string
  techStack: string[]
  tags: string[]
  gallery: ProjectGalleryImage[]
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  body: string
  date: string
  category: string
  author: string
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  photo: string
}

export interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
}
```

- [ ] **Step 2: Create `src/data/services.ts`**

```ts
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
```

- [ ] **Step 3: Create `src/data/projects.ts`**

```ts
// Placeholder case studies — replace with real client work once available.
import { Project } from './types'

export const projects: Project[] = [
  {
    slug: 'northwind-retail-platform',
    title: 'Northwind Retail Platform',
    client: 'Northwind Retail (placeholder)',
    industry: 'Retail',
    category: 'Web & App Development',
    coverImage: '/images/work/northwind-retail-platform.svg',
    summary: 'A custom web platform unifying inventory, orders, and storefront for a multi-location retailer.',
    challenge: 'Northwind ran three disconnected systems for inventory, POS, and online orders, causing constant stock mismatches.',
    approach: 'We built a single web platform with a shared data layer, custom admin tooling, and a public storefront on top of it.',
    result: 'Stock discrepancies dropped and the team now manages every location from one dashboard.',
    techStack: ['Next.js', 'PostgreSQL', 'Node.js'],
    tags: ['web', 'app'],
    gallery: [
      { src: '/images/work/northwind-retail-platform.svg', alt: 'Northwind Retail Platform dashboard' },
    ],
  },
  {
    slug: 'lumen-ai-support-assistant',
    title: 'Lumen AI Support Assistant',
    client: 'Lumen Health (placeholder)',
    industry: 'Healthcare',
    category: 'AI, Automation & Data',
    coverImage: '/images/work/lumen-ai-support-assistant.svg',
    summary: 'An AI-assisted support tool that triages incoming patient questions before they reach a human agent.',
    challenge: 'Support agents were spending most of their time on repetitive, low-complexity questions.',
    approach: 'We built an LLM-backed triage layer integrated with their existing helpdesk, with clear escalation rules for anything sensitive.',
    result: 'Agents now spend their time on the questions that actually need a human.',
    techStack: ['Python', 'LLM APIs', 'Postgres'],
    tags: ['ai', 'automation', 'data'],
    gallery: [
      { src: '/images/work/lumen-ai-support-assistant.svg', alt: 'Lumen AI Support Assistant interface' },
    ],
  },
  {
    slug: 'atlas-cloud-migration',
    title: 'Atlas Cloud Migration',
    client: 'Atlas Logistics (placeholder)',
    industry: 'Logistics',
    category: 'IT Consulting & Managed Services',
    coverImage: '/images/work/atlas-cloud-migration.svg',
    summary: 'A phased migration of on-premise infrastructure to the cloud with zero downtime.',
    challenge: 'Atlas needed to leave an aging data center before a lease deadline, without disrupting live operations.',
    approach: 'We planned a phased migration with a parallel-run period, moving one service at a time behind feature flags.',
    result: 'Full migration completed ahead of the lease deadline with no unplanned downtime.',
    techStack: ['AWS', 'Terraform', 'Docker'],
    tags: ['consulting', 'cloud'],
    gallery: [
      { src: '/images/work/atlas-cloud-migration.svg', alt: 'Atlas Cloud Migration architecture' },
    ],
  },
  {
    slug: 'verve-shopify-relaunch',
    title: 'Verve Shopify Relaunch',
    client: 'Verve Cosmetics (placeholder)',
    industry: 'Ecommerce',
    category: 'Shopify Ecommerce Development',
    coverImage: '/images/work/verve-shopify-relaunch.svg',
    summary: 'A full storefront redesign and Shopify Plus migration for a growing DTC beauty brand.',
    challenge: 'Verve had outgrown their theme and checkout flow, with cart abandonment climbing.',
    approach: 'We rebuilt their storefront on Shopify Plus with a custom theme and a streamlined checkout.',
    result: 'A faster, on-brand storefront with a meaningfully shorter checkout path.',
    techStack: ['Shopify Plus', 'Liquid', 'React'],
    tags: ['shopify', 'ecommerce', 'design'],
    gallery: [
      { src: '/images/work/verve-shopify-relaunch.svg', alt: 'Verve Shopify Relaunch storefront' },
    ],
  },
  {
    slug: 'ridgeline-wordpress-cms',
    title: 'Ridgeline WordPress CMS',
    client: 'Ridgeline Media (placeholder)',
    industry: 'Media & Publishing',
    category: 'WordPress Development',
    coverImage: '/images/work/ridgeline-wordpress-cms.svg',
    summary: 'A custom WordPress editorial platform built for a fast-moving newsroom.',
    challenge: 'Ridgeline’s old CMS could not keep up with their publishing cadence or editorial workflow.',
    approach: 'We built a custom WordPress theme and editorial workflow plugin tailored to how their editors actually work.',
    result: 'Editors publish independently without engineering involvement for routine content changes.',
    techStack: ['WordPress', 'PHP', 'Advanced Custom Fields'],
    tags: ['wordpress', 'cms'],
    gallery: [
      { src: '/images/work/ridgeline-wordpress-cms.svg', alt: 'Ridgeline WordPress CMS editorial dashboard' },
    ],
  },
  {
    slug: 'brightpath-brand-identity',
    title: 'Brightpath Brand Identity',
    client: 'Brightpath Financial (placeholder)',
    industry: 'Financial Services',
    category: 'UI/UX & Branding',
    coverImage: '/images/work/brightpath-brand-identity.svg',
    summary: 'A full brand identity and product design system for a fintech launching its first consumer app.',
    challenge: 'Brightpath needed a brand and product design system before their public launch, from nothing.',
    approach: 'We ran a brand identity sprint followed by a full UI/UX design system for their mobile app.',
    result: 'A cohesive brand and design system that shipped with their public launch.',
    techStack: ['Figma', 'Design Tokens'],
    tags: ['design', 'branding'],
    gallery: [
      { src: '/images/work/brightpath-brand-identity.svg', alt: 'Brightpath Brand Identity system' },
    ],
  },
]
```

- [ ] **Step 4: Create `src/data/posts.ts`**

```ts
// Placeholder blog posts — replace with real articles as they're written.
import { BlogPost } from './types'

export const posts: BlogPost[] = [
  {
    slug: 'designing-for-trust-in-ai-products',
    title: 'Designing for Trust in AI Products',
    excerpt: 'AI features fail adoption when users cannot tell what the system is doing. Here is how we design around that.',
    body: 'AI features fail adoption when users cannot tell what the system is doing or why. The fix is rarely more accuracy — it is more legibility: showing your work, giving users an easy way to correct the system, and being honest about confidence. We cover the patterns we reach for first.',
    date: '2026-06-02',
    category: 'AI & Automation',
    author: 'Thynkteck Team',
  },
  {
    slug: 'shopify-vs-custom-ecommerce',
    title: 'Shopify vs. Custom Ecommerce: How We Actually Decide',
    excerpt: 'Not every store needs a custom platform. Here is the framework we use with clients before recommending either.',
    body: 'Shopify is the right call for most catalogs. Custom ecommerce earns its cost when the business logic around checkout, inventory, or fulfillment genuinely does not fit a standard platform. We walk through the questions we ask before recommending either path.',
    date: '2026-05-14',
    category: 'Ecommerce',
    author: 'Thynkteck Team',
  },
  {
    slug: 'a-practical-guide-to-cloud-cost-control',
    title: 'A Practical Guide to Cloud Cost Control',
    excerpt: 'Most cloud cost overruns come from a handful of predictable patterns. Here is how we find and fix them.',
    body: 'Most cloud cost overruns trace back to a handful of predictable patterns: idle resources, oversized instances, and untagged spend nobody owns. We share the audit checklist we run on every infrastructure engagement.',
    date: '2026-04-22',
    category: 'IT Consulting',
    author: 'Thynkteck Team',
  },
  {
    slug: 'what-makes-a-good-discovery-phase',
    title: 'What Makes a Good Discovery Phase',
    excerpt: 'A rushed discovery phase is the single biggest predictor of a project going over budget. Here is what we insist on.',
    body: 'A rushed discovery phase is the single biggest predictor of a project going over budget later. We insist on a short, structured discovery before any build work, and explain exactly what it covers and why we do not skip it, even for smaller projects.',
    date: '2026-03-10',
    category: 'Process',
    author: 'Thynkteck Team',
  },
]
```

- [ ] **Step 5: Create `src/data/team.ts`**

```ts
// Placeholder team roster — replace with real team bios and photos.
import { TeamMember } from './types'

export const team: TeamMember[] = [
  {
    name: 'Founder & CEO',
    role: 'Founder & CEO',
    bio: 'Placeholder bio — add founder background and focus areas here.',
    photo: '/images/team/placeholder-1.svg',
  },
  {
    name: 'Head of Engineering',
    role: 'Head of Engineering',
    bio: 'Placeholder bio — add engineering leadership background here.',
    photo: '/images/team/placeholder-2.svg',
  },
  {
    name: 'Head of Design',
    role: 'Head of Design',
    bio: 'Placeholder bio — add design leadership background here.',
    photo: '/images/team/placeholder-3.svg',
  },
  {
    name: 'Head of AI & Data',
    role: 'Head of AI & Data',
    bio: 'Placeholder bio — add AI/data leadership background here.',
    photo: '/images/team/placeholder-4.svg',
  },
]
```

- [ ] **Step 6: Create `src/data/testimonials.ts`**

```ts
// Placeholder testimonials — replace with real client quotes once available.
import { Testimonial } from './types'

export const testimonials: Testimonial[] = [
  {
    quote: 'Thynkteck rebuilt our platform end to end and it just worked from day one. No surprises at launch.',
    author: 'Placeholder Name',
    role: 'VP Engineering',
    company: 'Northwind Retail',
  },
  {
    quote: 'They understood our workflow better than we could explain it ourselves, and it showed in the final product.',
    author: 'Placeholder Name',
    role: 'COO',
    company: 'Atlas Logistics',
  },
  {
    quote: 'Fast, direct communication, and the storefront redesign paid for itself within the first quarter.',
    author: 'Placeholder Name',
    role: 'Founder',
    company: 'Verve Cosmetics',
  },
]
```

- [ ] **Step 7: Write the data-integrity test**

```ts
// src/data/__tests__/data-integrity.test.ts
import { describe, it, expect } from 'vitest'
import { services } from '../services'
import { projects } from '../projects'
import { posts } from '../posts'

function assertUniqueSlugs(items: { slug: string }[], label: string) {
  const slugs = items.map((item) => item.slug)
  const unique = new Set(slugs)
  expect(unique.size, `${label} has duplicate slugs: ${slugs.join(', ')}`).toBe(slugs.length)
}

describe('data integrity', () => {
  it('has exactly 7 services with unique slugs', () => {
    expect(services).toHaveLength(7)
    assertUniqueSlugs(services, 'services')
  })

  it('every service has at least one tag', () => {
    for (const service of services) {
      expect(service.tags.length, `${service.slug} has no tags`).toBeGreaterThan(0)
    }
  })

  it('has unique project slugs, each with at least one tag matching a service', () => {
    assertUniqueSlugs(projects, 'projects')
    const serviceTags = new Set(services.flatMap((s) => s.tags))
    for (const project of projects) {
      const hasMatch = project.tags.some((tag) => serviceTags.has(tag))
      expect(hasMatch, `${project.slug} has no tags matching any service`).toBe(true)
    }
  })

  it('has unique blog post slugs', () => {
    assertUniqueSlugs(posts, 'posts')
  })
})
```

- [ ] **Step 8: Run the tests**

Run: `npm test`
Expected: 4 tests pass (data integrity suite). If a slug collision or missing tag is reported, fix the corresponding data file, not the test.

- [ ] **Step 9: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 10: Commit**

```bash
git add src/data
git commit -m "feat: add typed placeholder content data layer"
```

---

### Task 3: Pure logic helpers — related work & contact validation (TDD)

**Files:**
- Create: `src/lib/relatedWork.ts`
- Create: `src/lib/contactValidation.ts`
- Test: `src/lib/__tests__/relatedWork.test.ts`
- Test: `src/lib/__tests__/contactValidation.test.ts`

**Interfaces:**
- Consumes: `Project` type from `@/data/types` (Task 2).
- Produces: `getRelatedProjects(tags: string[], projects: Project[], limit?: number, excludeSlug?: string): Project[]` from `@/lib/relatedWork` — used by Task 9 (service detail template).
- Produces: `ContactFormData` type, `ContactFormErrors` type, and `validateContactForm(data: ContactFormData): ContactFormErrors` from `@/lib/contactValidation` — used by Task 12 (contact form UI) and Task 13 (contact API route).

- [ ] **Step 1: Write the failing test for `getRelatedProjects`**

```ts
// src/lib/__tests__/relatedWork.test.ts
import { describe, it, expect } from 'vitest'
import { getRelatedProjects } from '../relatedWork'
import { Project } from '@/data/types'

const makeProject = (overrides: Partial<Project>): Project => ({
  slug: 'test-project',
  title: 'Test Project',
  client: 'Test Client',
  industry: 'Retail',
  category: 'Web & App Development',
  coverImage: '/images/work/placeholder.svg',
  summary: 'summary',
  challenge: 'challenge',
  approach: 'approach',
  result: 'result',
  techStack: ['Next.js'],
  tags: [],
  gallery: [],
  ...overrides,
})

describe('getRelatedProjects', () => {
  it('returns projects that share at least one tag, ranked by overlap count', () => {
    const projects = [
      makeProject({ slug: 'a', tags: ['web', 'shopify'] }),
      makeProject({ slug: 'b', tags: ['web'] }),
      makeProject({ slug: 'c', tags: ['ai'] }),
    ]
    const result = getRelatedProjects(['web', 'shopify'], projects)
    expect(result.map((p) => p.slug)).toEqual(['a', 'b'])
  })

  it('returns an empty array when no tags are provided', () => {
    const projects = [makeProject({ slug: 'a', tags: ['web'] })]
    expect(getRelatedProjects([], projects)).toEqual([])
  })

  it('excludes projects with a project slug matching excludeSlug', () => {
    const projects = [
      makeProject({ slug: 'a', tags: ['web'] }),
      makeProject({ slug: 'b', tags: ['web'] }),
    ]
    const result = getRelatedProjects(['web'], projects, 5, 'a')
    expect(result.map((p) => p.slug)).toEqual(['b'])
  })

  it('respects the limit parameter', () => {
    const projects = [
      makeProject({ slug: 'a', tags: ['web'] }),
      makeProject({ slug: 'b', tags: ['web'] }),
      makeProject({ slug: 'c', tags: ['web'] }),
    ]
    const result = getRelatedProjects(['web'], projects, 2)
    expect(result).toHaveLength(2)
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/lib/__tests__/relatedWork.test.ts`
Expected: FAIL — `Cannot find module '../relatedWork'`.

- [ ] **Step 3: Implement `getRelatedProjects`**

```ts
// src/lib/relatedWork.ts
import { Project } from '@/data/types'

export function getRelatedProjects(
  tags: string[],
  projects: Project[],
  limit = 3,
  excludeSlug?: string
): Project[] {
  if (tags.length === 0) return []

  return projects
    .filter((project) => project.slug !== excludeSlug)
    .map((project) => ({
      project,
      score: project.tags.filter((tag) => tags.includes(tag)).length,
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.project)
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/lib/__tests__/relatedWork.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Write the failing test for `validateContactForm`**

```ts
// src/lib/__tests__/contactValidation.test.ts
import { describe, it, expect } from 'vitest'
import { validateContactForm, ContactFormData } from '../contactValidation'

const baseData: ContactFormData = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  company: 'Acme Co',
  service: 'web-app-development',
  message: 'We would like to discuss a new project with your team.',
}

describe('validateContactForm', () => {
  it('returns no errors for valid data', () => {
    expect(validateContactForm(baseData)).toEqual({})
  })

  it('requires a name', () => {
    const errors = validateContactForm({ ...baseData, name: '  ' })
    expect(errors.name).toBeDefined()
  })

  it('requires a valid email address', () => {
    const errors = validateContactForm({ ...baseData, email: 'not-an-email' })
    expect(errors.email).toBeDefined()
  })

  it('requires an email at all', () => {
    const errors = validateContactForm({ ...baseData, email: '' })
    expect(errors.email).toBeDefined()
  })

  it('requires a message of at least 10 characters', () => {
    const errors = validateContactForm({ ...baseData, message: 'too short' })
    expect(errors.message).toBeDefined()
  })

  it('does not require company or service', () => {
    const errors = validateContactForm({ ...baseData, company: undefined, service: undefined })
    expect(errors).toEqual({})
  })
})
```

- [ ] **Step 6: Run the test to verify it fails**

Run: `npx vitest run src/lib/__tests__/contactValidation.test.ts`
Expected: FAIL — `Cannot find module '../contactValidation'`.

- [ ] **Step 7: Implement `validateContactForm`**

```ts
// src/lib/contactValidation.ts
export interface ContactFormData {
  name: string
  email: string
  company?: string
  service?: string
  message: string
}

export type ContactFormErrors = Partial<Record<'name' | 'email' | 'message', string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (!data.name.trim()) {
    errors.name = 'Name is required.'
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_PATTERN.test(data.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  if (!data.message.trim()) {
    errors.message = 'Message is required.'
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.'
  }

  return errors
}
```

- [ ] **Step 8: Run the test to verify it passes**

Run: `npx vitest run src/lib/__tests__/contactValidation.test.ts`
Expected: PASS (6 tests).

- [ ] **Step 9: Run the full test suite and typecheck**

Run: `npm test && npx tsc --noEmit`
Expected: all tests pass, no type errors.

- [ ] **Step 10: Commit**

```bash
git add src/lib
git commit -m "feat: add related-work matching and contact form validation helpers"
```

---

### Task 4: UI primitives

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/SectionHeading.tsx`
- Create: `src/components/ui/BentoCard.tsx`
- Create: `src/components/ui/StatCounter.tsx`
- Create: `src/components/ui/CircuitMotif.tsx`

**Interfaces:**
- Consumes: `framer-motion` (Task 1), Tailwind `thynkteck-*` tokens (Task 1).
- Produces: `<Button>` (props: `href?: string`, `variant?: 'primary' | 'outline'`, `children`, `onClick?`), `<SectionHeading>` (props: `eyebrow?: string`, `title: string`, `description?: string`, `align?: 'left' | 'center'`), `<BentoCard>` (props: `className?: string`, `children`, `span?: 'default' | 'wide' | 'tall'`), `<StatCounter>` (props: `value: number`, `suffix?: string`, `label: string`), `<CircuitMotif>` (props: `className?: string`) — `Button`/`SectionHeading`/`BentoCard` are imported throughout Tasks 6–12, `StatCounter` by Task 7's `StatsBar`, `CircuitMotif` by Task 8's About hero.

- [ ] **Step 1: Create `Button`**

```tsx
// src/components/ui/Button.tsx
import Link from 'next/link'
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface BaseProps {
  children: ReactNode
  variant?: 'primary' | 'outline'
  className?: string
}

interface LinkButtonProps extends BaseProps {
  href: string
  onClick?: never
}

interface ClickButtonProps extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  href?: never
}

type ButtonProps = LinkButtonProps | ClickButtonProps

const baseClasses =
  'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200'

const variantClasses: Record<NonNullable<BaseProps['variant']>, string> = {
  primary: 'bg-thynkteck-blue text-white hover:bg-blue-600',
  outline: 'border border-white/30 text-white hover:border-thynkteck-blue hover:text-thynkteck-blue',
}

export default function Button({ children, variant = 'primary', className = '', href, ...rest }: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
```

- [ ] **Step 2: Create `SectionHeading`**

```tsx
// src/components/ui/SectionHeading.tsx
interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export default function SectionHeading({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`max-w-2xl mb-10 sm:mb-14 ${alignment}`}>
      {eyebrow && (
        <span className="block text-thynkteck-blue text-sm font-semibold tracking-widest uppercase mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">{title}</h2>
      {description && <p className="mt-4 text-base sm:text-lg text-white/70">{description}</p>}
    </div>
  )
}
```

- [ ] **Step 3: Create `BentoCard`**

```tsx
// src/components/ui/BentoCard.tsx
import { ReactNode } from 'react'

interface BentoCardProps {
  children: ReactNode
  className?: string
  span?: 'default' | 'wide' | 'tall'
}

const spanClasses: Record<NonNullable<BentoCardProps['span']>, string> = {
  default: '',
  wide: 'md:col-span-2',
  tall: 'md:row-span-2',
}

export default function BentoCard({ children, className = '', span = 'default' }: BentoCardProps) {
  return (
    <div
      className={`rounded-2xl bg-thynkteck-soft-black border border-white/10 p-6 sm:p-8 transition-all duration-300 hover:border-thynkteck-blue hover:shadow-[0_0_30px_-10px_#0B35FA] ${spanClasses[span]} ${className}`}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 4: Create `StatCounter`**

```tsx
// src/components/ui/StatCounter.tsx
'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'

interface StatCounterProps {
  value: number
  suffix?: string
  label: string
}

export default function StatCounter({ value, suffix = '', label }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 1200 })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(latest)}${suffix}`
      }
    })
    return unsubscribe
  }, [springValue, suffix])

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <span ref={ref} className="block text-4xl sm:text-5xl font-bold text-white">
        0{suffix}
      </span>
      <span className="mt-2 block text-sm text-white/60">{label}</span>
    </motion.div>
  )
}
```

- [ ] **Step 5: Create `CircuitMotif`**

```tsx
// src/components/ui/CircuitMotif.tsx
interface CircuitMotifProps {
  className?: string
}

export default function CircuitMotif({ className = '' }: CircuitMotifProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 380 L20 300 L100 300 L100 220 L180 220 L180 140 L260 140 L260 60 L340 60"
        stroke="#0B35FA"
        strokeWidth="2"
        strokeOpacity="0.35"
      />
      <circle cx="100" cy="300" r="5" fill="#0B35FA" fillOpacity="0.5" />
      <circle cx="180" cy="220" r="5" fill="#0B35FA" fillOpacity="0.5" />
      <circle cx="260" cy="140" r="5" fill="#0B35FA" fillOpacity="0.5" />
      <path
        d="M40 40 L120 40 L120 100 L200 100"
        stroke="#0B35FA"
        strokeWidth="2"
        strokeOpacity="0.2"
      />
      <circle cx="120" cy="100" r="4" fill="#0B35FA" fillOpacity="0.4" />
    </svg>
  )
}
```

- [ ] **Step 6: Verify build and typecheck**

Run: `npx tsc --noEmit && npm run build`
Expected: no errors. These are unused-but-valid components at this point (not yet imported anywhere) — that's expected; Tasks 5+ wire them in.

- [ ] **Step 7: Commit**

```bash
git add src/components/ui
git commit -m "feat: add shared UI primitives (Button, SectionHeading, BentoCard, StatCounter, CircuitMotif)"
```

---

### Task 5: Navigation

**Files:**
- Modify: `src/components/Navigation.tsx`

**Interfaces:**
- Consumes: `public/logo/thynkteck-icon-white.png` (Task 1 asset).
- Produces: `<Navigation>` default export — used by every page's layout composition in Tasks 7–12.

- [ ] **Step 1: Rewrite `Navigation.tsx` with real routes, dropdowns, and mobile menu**

```tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { services } from '@/data/services'

const navItems = [
  { name: 'About', href: '/about' },
  {
    name: 'Services',
    href: '/services',
    children: services.map((s) => ({ name: s.title, href: `/services/${s.slug}` })),
  },
  { name: 'Work', href: '/work' },
  { name: 'Blog', href: '/blog' },
]

const Navigation = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4">
      <div className="bg-thynkteck-soft-black/90 backdrop-blur border border-white/10 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-lg flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo/thynkteck-icon-white.png" alt="Thynkteck" width={28} height={28} />
          <span className="hidden sm:inline text-white font-bold">
            Thynk<span className="font-normal text-white/70">teck</span>
          </span>
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
```

- [ ] **Step 2: Verify build and typecheck**

Run: `npx tsc --noEmit && npm run build`
Expected: no errors.

- [ ] **Step 3: Manual check**

Run: `npm run dev`, open `http://localhost:3000`. Confirm: logo + wordmark show top-left, dropdown appears on hovering "Services" with all 7 service names, mobile menu (resize browser < 768px) opens/closes via the button and shows the same items as an accordion.

- [ ] **Step 4: Commit**

```bash
git add src/components/Navigation.tsx
git commit -m "feat: rebuild navigation with Thynkteck branding and services dropdown"
```

---

### Task 6: Footer

**Files:**
- Modify: `src/components/Footer.tsx`

**Interfaces:**
- Consumes: `Button` (Task 4), `services` (Task 2, for the tech ticker context is independent — footer ticker uses a static tool list, not service data).
- Produces: `<Footer>` default export — used by every page in Tasks 7–12.

- [ ] **Step 1: Rewrite `Footer.tsx` — remove fake client logo wall, add tech-stack marquee**

```tsx
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
```

- [ ] **Step 2: Verify build and typecheck**

Run: `npx tsc --noEmit && npm run build`
Expected: no errors.

- [ ] **Step 3: Manual check**

In `npm run dev`, scroll to the footer on the homepage. Confirm: no fake client logos, tech names scroll continuously left, links and email work.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: rebuild footer with tech-stack marquee, drop fabricated client logos"
```

---

### Task 7: Homepage

**Files:**
- Create: `src/components/services/ServiceGrid.tsx`
- Create: `src/components/home/Hero.tsx`
- Create: `src/components/home/ServiceStrip.tsx`
- Create: `src/components/home/FeaturedWork.tsx`
- Create: `src/components/home/StatsBar.tsx`
- Create: `src/components/home/TestimonialsSection.tsx`
- Modify: `src/app/page.tsx`
- Delete: `src/components/HeroSection.tsx`, `src/components/AboutSection.tsx`, `src/components/ExpertiseSection.tsx`, `src/components/ServicesSection.tsx`, `src/components/WorkSection.tsx`, `src/components/TechStackSection.tsx`, `src/components/FAQSection.tsx` (superseded by the new page-specific components in this and later tasks — see Task 14 for the final sweep confirming nothing still imports them)

**Interfaces:**
- Consumes: `services`, `projects`, `testimonials` (Task 2), `Button`, `SectionHeading`, `BentoCard`, `StatCounter`, `CircuitMotif` (Task 4), `Navigation` (Task 5), `Footer` (Task 6).
- Produces: `<ServiceGrid>` (no props — renders the bento grid of all 7 services, each linking to its `/services/[slug]` page) from `@/components/services/ServiceGrid` — reused by Task 9's `/services` overview page so the grid markup exists in exactly one place. `src/app/page.tsx` renders the full homepage — no other task depends on this task's other internals.

- [ ] **Step 1: Create `Hero.tsx` with the circuit/particle animation**

```tsx
// src/components/home/Hero.tsx
'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

const nodes = [
  { top: '20%', left: '15%', delay: 0 },
  { top: '65%', left: '10%', delay: 0.4 },
  { top: '30%', left: '80%', delay: 0.2 },
  { top: '75%', left: '70%', delay: 0.6 },
  { top: '50%', left: '45%', delay: 0.3 },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-thynkteck-black">
      <svg className="absolute inset-0 w-full h-full opacity-40" aria-hidden="true">
        <line x1="15%" y1="20%" x2="45%" y2="50%" stroke="#0B35FA" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="45%" y1="50%" x2="80%" y2="30%" stroke="#0B35FA" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="45%" y1="50%" x2="70%" y2="75%" stroke="#0B35FA" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="10%" y1="65%" x2="45%" y2="50%" stroke="#0B35FA" strokeWidth="1" strokeOpacity="0.3" />
        {nodes.map((node, i) => (
          <motion.circle
            key={i}
            cx={node.left}
            cy={node.top}
            r="4"
            fill="#0B35FA"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: node.delay }}
          />
        ))}
      </svg>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="inline-block text-thynkteck-blue text-sm font-semibold tracking-widest uppercase mb-4">
            Web · App · AI · Design
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.05] mb-6">
            We build the software your industry actually needs
          </h1>
          <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-xl">
            Thynkteck is a full-service digital agency: web and app development, UI/UX and branding,
            AI and automation, IT consulting, Shopify and WordPress — under one roof.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/contact">Start a project</Button>
            <Button href="/work" variant="outline">
              See our work
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `ServiceGrid.tsx` (shared bento grid of all 7 services) and `ServiceStrip.tsx`**

`ServiceGrid` is the reusable card grid — Task 9's `/services` overview page renders this same component instead of duplicating the markup:

```tsx
// src/components/services/ServiceGrid.tsx
import Link from 'next/link'
import { services } from '@/data/services'
import BentoCard from '@/components/ui/BentoCard'

export default function ServiceGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {services.map((service, index) => (
        <Link key={service.slug} href={`/services/${service.slug}`}>
          <BentoCard span={index === 0 ? 'wide' : 'default'} className="h-full cursor-pointer">
            <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
            <p className="text-white/60 text-sm">{service.shortDescription}</p>
          </BentoCard>
        </Link>
      ))}
    </div>
  )
}
```

```tsx
// src/components/home/ServiceStrip.tsx
import SectionHeading from '@/components/ui/SectionHeading'
import ServiceGrid from '@/components/services/ServiceGrid'

export default function ServiceStrip() {
  return (
    <section className="bg-thynkteck-soft-black py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="What we do"
          title="Every capability your product needs"
          description="From first sketch to production infrastructure, one team covers the full stack."
        />
        <ServiceGrid />
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create `FeaturedWork.tsx`**

```tsx
// src/components/home/FeaturedWork.tsx
import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/data/projects'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'

export default function FeaturedWork() {
  const featured = projects.slice(0, 3)

  return (
    <section className="bg-thynkteck-black py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading eyebrow="Selected work" title="Recent projects" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {featured.map((project) => (
            <Link key={project.slug} href={`/work/${project.slug}`} className="group block">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-thynkteck-black mb-4">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="text-xs text-thynkteck-blue font-semibold uppercase tracking-wide">
                {project.category}
              </span>
              <h3 className="text-lg font-semibold text-white mt-1">{project.title}</h3>
            </Link>
          ))}
        </div>
        <Button href="/work" variant="outline">
          View all work
        </Button>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create `StatsBar.tsx`**

```tsx
// src/components/home/StatsBar.tsx
import StatCounter from '@/components/ui/StatCounter'

const stats = [
  { value: 40, suffix: '+', label: 'Projects delivered' },
  { value: 12, suffix: '', label: 'Industries served' },
  { value: 7, suffix: '', label: 'Core service areas' },
  { value: 98, suffix: '%', label: 'Client satisfaction' },
]

export default function StatsBar() {
  return (
    <section className="bg-thynkteck-soft-black py-16 sm:py-20 border-y border-white/10">
      <div className="container mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <StatCounter key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  )
}
```

*(Note: these are placeholder figures matching the spec's "honest, generic placeholder numbers" requirement — flagged for the user to replace with real numbers once available.)*

- [ ] **Step 5: Create `TestimonialsSection.tsx`**

```tsx
// src/components/home/TestimonialsSection.tsx
import { testimonials } from '@/data/testimonials'
import SectionHeading from '@/components/ui/SectionHeading'
import BentoCard from '@/components/ui/BentoCard'

export default function TestimonialsSection() {
  return (
    <section className="bg-thynkteck-black py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading eyebrow="Client feedback" title="What clients say" align="center" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <BentoCard key={testimonial.author}>
              <p className="text-white/80 mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
              <div>
                <span className="block text-white font-semibold text-sm">{testimonial.author}</span>
                <span className="block text-white/50 text-sm">
                  {testimonial.role}, {testimonial.company}
                </span>
              </div>
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Rewrite `src/app/page.tsx`**

```tsx
import Navigation from '@/components/Navigation'
import Hero from '@/components/home/Hero'
import ServiceStrip from '@/components/home/ServiceStrip'
import FeaturedWork from '@/components/home/FeaturedWork'
import StatsBar from '@/components/home/StatsBar'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <ServiceStrip />
      <FeaturedWork />
      <StatsBar />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 7: Delete the superseded single-page section components**

```bash
git rm src/components/HeroSection.tsx src/components/AboutSection.tsx src/components/ExpertiseSection.tsx src/components/ServicesSection.tsx src/components/WorkSection.tsx src/components/TechStackSection.tsx src/components/FAQSection.tsx
```

If any of these still show up in a search for imports after this step, that search command finds nothing referencing them except this task's own history:

Run: `grep -rl "from '@/components/HeroSection'\|from '@/components/AboutSection'\|from '@/components/ExpertiseSection'\|from '@/components/ServicesSection'\|from '@/components/WorkSection'\|from '@/components/TechStackSection'\|from '@/components/FAQSection'" src`
Expected: no output (empty).

- [ ] **Step 8: Verify build and typecheck**

Run: `npx tsc --noEmit && npm run build`
Expected: no errors.

- [ ] **Step 9: Manual check**

Run: `npm run dev`, open `http://localhost:3000`. Confirm: hero shows the animated circuit lines/nodes and headline, service bento grid shows all 7 services and links to `/services/[slug]`, featured work shows 3 project cards linking to `/work/[slug]`, stats count up on scroll into view, testimonials render, footer marquee scrolls.

- [ ] **Step 10: Commit**

```bash
git add src/app/page.tsx src/components/home
git commit -m "feat: build new Thynkteck homepage, remove legacy DevSphere section components"
```

---

### Task 8: About page

**Files:**
- Create: `src/app/about/page.tsx`
- Create: `src/components/about/TeamGrid.tsx`
- Create: `src/components/about/ValuesGrid.tsx`

**Interfaces:**
- Consumes: `team` (Task 2), `SectionHeading`, `BentoCard`, `CircuitMotif` (Task 4, used as a decorative background accent behind the page hero), `Navigation` (Task 5), `Footer` (Task 6).
- Produces: `/about` route — linked from `Navigation` (Task 5) and `Footer` (Task 6).

- [ ] **Step 1: Create `TeamGrid.tsx`**

```tsx
// src/components/about/TeamGrid.tsx
import Image from 'next/image'
import { team } from '@/data/team'
import SectionHeading from '@/components/ui/SectionHeading'
import BentoCard from '@/components/ui/BentoCard'

export default function TeamGrid() {
  return (
    <section className="bg-thynkteck-soft-black py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading eyebrow="Our team" title="The people behind the work" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {team.map((member) => (
            <BentoCard key={member.name}>
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-thynkteck-black mb-4">
                <Image src={member.photo} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="text-white font-semibold">{member.name}</h3>
              <p className="text-thynkteck-blue text-sm mb-2">{member.role}</p>
              <p className="text-white/60 text-sm">{member.bio}</p>
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `ValuesGrid.tsx`**

```tsx
// src/components/about/ValuesGrid.tsx
import SectionHeading from '@/components/ui/SectionHeading'
import BentoCard from '@/components/ui/BentoCard'

const values = [
  { title: 'Build for the real workflow', description: 'We design around how your team actually works, not a generic template.' },
  { title: 'Ship, then iterate', description: 'Working software in front of you early beats a perfect plan on paper.' },
  { title: 'Say the hard thing early', description: 'If something will not work, you hear it in week one, not month three.' },
]

export default function ValuesGrid() {
  return (
    <section className="bg-thynkteck-black py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading eyebrow="How we work" title="What we optimize for" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {values.map((value) => (
            <BentoCard key={value.title}>
              <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
              <p className="text-white/60 text-sm">{value.description}</p>
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create `src/app/about/page.tsx`**

```tsx
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import TeamGrid from '@/components/about/TeamGrid'
import ValuesGrid from '@/components/about/ValuesGrid'
import CircuitMotif from '@/components/ui/CircuitMotif'

export const metadata: Metadata = {
  title: 'About — Thynkteck',
  description: 'Thynkteck is a full-service digital agency covering web, app, AI, design, and IT consulting.',
}

export default function AboutPage() {
  return (
    <main>
      <Navigation />
      <section className="relative bg-thynkteck-black pt-40 pb-20 sm:pt-48 sm:pb-28 overflow-hidden">
        <CircuitMotif className="absolute -right-16 -top-10 w-72 h-72 sm:w-96 sm:h-96 pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl relative z-10">
          <span className="inline-block text-thynkteck-blue text-sm font-semibold tracking-widest uppercase mb-4">
            About Thynkteck
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            One team, every discipline your product needs
          </h1>
          <p className="text-lg text-white/70">
            Placeholder company story — replace with Thynkteck&rsquo;s real founding story, mission, and
            what makes the team&rsquo;s approach different once available.
          </p>
        </div>
      </section>
      <ValuesGrid />
      <TeamGrid />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 4: Verify build and typecheck**

Run: `npx tsc --noEmit && npm run build`
Expected: no errors.

- [ ] **Step 5: Manual check**

Run: `npm run dev`, visit `http://localhost:3000/about`. Confirm: hero copy, 3 values cards, 4 team member cards all render.

- [ ] **Step 6: Commit**

```bash
git add src/app/about src/components/about
git commit -m "feat: add About page with values and team grid"
```

---

### Task 9: Services overview + service detail template

**Files:**
- Create: `src/app/services/page.tsx`
- Create: `src/app/services/[slug]/page.tsx`
- Create: `src/components/services/ServiceDetailTemplate.tsx`

**Interfaces:**
- Consumes: `services` (Task 2), `getRelatedProjects` (Task 3), `projects` (Task 2), `SectionHeading`, `BentoCard`, `Button` (Task 4), `ServiceGrid` (Task 7), `Navigation` (Task 5), `Footer` (Task 6).
- Produces: `/services` and `/services/[slug]` routes for all 7 service slugs — linked from `Navigation` (Task 5) and `ServiceStrip` (Task 7).

- [ ] **Step 1: Create `src/app/services/page.tsx`**

```tsx
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/ui/SectionHeading'
import ServiceGrid from '@/components/services/ServiceGrid'

export const metadata: Metadata = {
  title: 'Services — Thynkteck',
  description: 'Web & app development, UI/UX & branding, AI & automation, IT consulting, custom software, Shopify, and WordPress.',
}

export default function ServicesPage() {
  return (
    <main>
      <Navigation />
      <section className="bg-thynkteck-black pt-40 pb-20 sm:pt-48 sm:pb-28">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="Services"
            title="Everything your product needs, under one roof"
            description="Seven core capabilities that cover a project from first concept through ongoing support."
          />
          <ServiceGrid />
        </div>
      </section>
      <Footer />
    </main>
  )
}
```

- [ ] **Step 2: Create `ServiceDetailTemplate.tsx`**

```tsx
// src/components/services/ServiceDetailTemplate.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Service, Project } from '@/data/types'
import SectionHeading from '@/components/ui/SectionHeading'
import BentoCard from '@/components/ui/BentoCard'
import Button from '@/components/ui/Button'

interface ServiceDetailTemplateProps {
  service: Service
  relatedProjects: Project[]
}

export default function ServiceDetailTemplate({ service, relatedProjects }: ServiceDetailTemplateProps) {
  return (
    <>
      <section className="bg-thynkteck-black pt-40 pb-20 sm:pt-48 sm:pb-28">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <span className="inline-block text-thynkteck-blue text-sm font-semibold tracking-widest uppercase mb-4">
            {service.title}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {service.shortDescription}
          </h1>
          <p className="text-lg text-white/70 mb-8">{service.longDescription}</p>
          <Button href="/contact">Talk to us about this</Button>
        </div>
      </section>

      <section className="bg-thynkteck-soft-black py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading eyebrow="What's included" title="Capabilities" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {service.capabilities.map((capability) => (
              <BentoCard key={capability}>
                <p className="text-white/80">{capability}</p>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-thynkteck-black py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading eyebrow="How it works" title="Our process" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {service.process.map((step, index) => (
              <BentoCard key={step.title}>
                <span className="text-thynkteck-blue text-sm font-semibold">0{index + 1}</span>
                <h3 className="text-lg font-semibold text-white mt-2 mb-2">{step.title}</h3>
                <p className="text-white/60 text-sm">{step.description}</p>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="bg-thynkteck-soft-black py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <SectionHeading eyebrow="Related work" title="Recent projects in this area" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((project) => (
                <Link key={project.slug} href={`/work/${project.slug}`} className="group block">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-thynkteck-black mb-4">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
```

- [ ] **Step 3: Create `src/app/services/[slug]/page.tsx`**

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ServiceDetailTemplate from '@/components/services/ServiceDetailTemplate'
import { services } from '@/data/services'
import { projects } from '@/data/projects'
import { getRelatedProjects } from '@/lib/relatedWork'

interface ServicePageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) return {}
  return {
    title: `${service.title} — Thynkteck`,
    description: service.shortDescription,
  }
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) notFound()

  const relatedProjects = getRelatedProjects(service.tags, projects, 3)

  return (
    <main>
      <Navigation />
      <ServiceDetailTemplate service={service} relatedProjects={relatedProjects} />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 4: Verify build and typecheck**

Run: `npx tsc --noEmit && npm run build`
Expected: no errors, build output lists all 7 static `/services/[slug]` pages.

- [ ] **Step 5: Manual check**

Run: `npm run dev`, visit `/services` and then `/services/web-app-development`. Confirm: overview grid links work, detail page shows capabilities/process/related work, and visiting `/services/not-a-real-slug` renders the Next.js 404 page.

- [ ] **Step 6: Commit**

```bash
git add src/app/services src/components/services
git commit -m "feat: add services overview page and data-driven service detail template"
```

---

### Task 10: Work overview + case study detail template

**Files:**
- Create: `src/app/work/page.tsx`
- Create: `src/app/work/[slug]/page.tsx`
- Create: `src/components/work/ProjectDetailTemplate.tsx`
- Create: `public/images/work/*.svg` (6 placeholder cover images, one per project)

**Interfaces:**
- Consumes: `projects` (Task 2), `getRelatedProjects` (Task 3), `SectionHeading`, `BentoCard`, `Button` (Task 4), `Navigation` (Task 5), `Footer` (Task 6).
- Produces: `/work` and `/work/[slug]` routes for all 6 project slugs — linked from `Navigation` (Task 5), `FeaturedWork` (Task 7), and service detail pages (Task 9).

- [ ] **Step 1: Create 6 placeholder cover-image SVGs**

Create one file per project referenced in `src/data/projects.ts`'s `coverImage` field. Each is a simple solid-color placeholder with the project name, in `#1A1B1B` with a `#0B35FA` label — real photography replaces these later.

```bash
mkdir -p public/images/work
```

```svg
<!-- public/images/work/northwind-retail-platform.svg -->
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#1A1B1B"/>
  <text x="400" y="300" text-anchor="middle" font-family="sans-serif" font-size="28" fill="#0B35FA">Northwind Retail Platform</text>
</svg>
```

Repeat the same pattern (rect + centered text with the project title) for the other five, saved at:
- `public/images/work/lumen-ai-support-assistant.svg` (text: "Lumen AI Support Assistant")
- `public/images/work/atlas-cloud-migration.svg` (text: "Atlas Cloud Migration")
- `public/images/work/verve-shopify-relaunch.svg` (text: "Verve Shopify Relaunch")
- `public/images/work/ridgeline-wordpress-cms.svg` (text: "Ridgeline WordPress CMS")
- `public/images/work/brightpath-brand-identity.svg` (text: "Brightpath Brand Identity")

- [ ] **Step 2: Create 4 placeholder team-photo SVGs and 3 placeholder blog-cover SVGs referenced elsewhere**

```bash
mkdir -p public/images/team
```

For each of `placeholder-1.svg` through `placeholder-4.svg` referenced in `src/data/team.ts`:

```svg
<!-- public/images/team/placeholder-1.svg -->
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <rect width="200" height="200" fill="#1A1B1B"/>
  <circle cx="100" cy="80" r="35" fill="#0B35FA" fill-opacity="0.4"/>
  <rect x="50" y="125" width="100" height="60" rx="30" fill="#0B35FA" fill-opacity="0.4"/>
</svg>
```

(Same content for `placeholder-2.svg`, `placeholder-3.svg`, `placeholder-4.svg` — identical generic avatar silhouette is fine for placeholders.)

- [ ] **Step 3: Allow Next.js `<Image>` to render local SVGs**

`next/image` requires an explicit opt-in to render `.svg` sources. Modify `next.config.js`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
  },
}

module.exports = nextConfig
```

- [ ] **Step 4: Create `src/app/work/page.tsx`**

```tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/ui/SectionHeading'
import { projects } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Work — Thynkteck',
  description: 'Case studies across web development, AI, cloud infrastructure, ecommerce, CMS, and brand identity.',
}

export default function WorkPage() {
  return (
    <main>
      <Navigation />
      <section className="bg-thynkteck-black pt-40 pb-20 sm:pt-48 sm:pb-28">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading eyebrow="Work" title="Case studies across every service area" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link key={project.slug} href={`/work/${project.slug}`} className="group block">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-thynkteck-soft-black mb-4">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="text-xs text-thynkteck-blue font-semibold uppercase tracking-wide">
                  {project.category}
                </span>
                <h3 className="text-lg font-semibold text-white mt-1">{project.title}</h3>
                <p className="text-white/50 text-sm">{project.industry}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
```

- [ ] **Step 5: Create `ProjectDetailTemplate.tsx`**

```tsx
// src/components/work/ProjectDetailTemplate.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/data/types'
import SectionHeading from '@/components/ui/SectionHeading'
import BentoCard from '@/components/ui/BentoCard'
import Button from '@/components/ui/Button'

interface ProjectDetailTemplateProps {
  project: Project
  nextProject: Project
}

export default function ProjectDetailTemplate({ project, nextProject }: ProjectDetailTemplateProps) {
  return (
    <>
      <section className="bg-thynkteck-black pt-40 pb-16 sm:pt-48">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <span className="inline-block text-thynkteck-blue text-sm font-semibold tracking-widest uppercase mb-4">
            {project.category}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            {project.title}
          </h1>
          <p className="text-lg text-white/70">{project.summary}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 mb-16">
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-thynkteck-soft-black">
          <Image src={project.coverImage} alt={project.title} fill className="object-cover" />
        </div>
      </div>

      <section className="bg-thynkteck-soft-black py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          <BentoCard>
            <h3 className="text-thynkteck-blue text-sm font-semibold uppercase mb-2">Challenge</h3>
            <p className="text-white/80 text-sm">{project.challenge}</p>
          </BentoCard>
          <BentoCard>
            <h3 className="text-thynkteck-blue text-sm font-semibold uppercase mb-2">Approach</h3>
            <p className="text-white/80 text-sm">{project.approach}</p>
          </BentoCard>
          <BentoCard>
            <h3 className="text-thynkteck-blue text-sm font-semibold uppercase mb-2">Result</h3>
            <p className="text-white/80 text-sm">{project.result}</p>
          </BentoCard>
        </div>
      </section>

      <section className="bg-thynkteck-black py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading eyebrow="Tech stack" title="Built with" />
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech) => (
              <span key={tech} className="px-4 py-2 rounded-full border border-white/10 text-white/70 text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {project.gallery.length > 0 && (
        <section className="bg-thynkteck-soft-black py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <SectionHeading eyebrow="Gallery" title="A closer look" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {project.gallery.map((image) => (
                <div key={image.src} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-thynkteck-black">
                  <Image src={image.src} alt={image.alt} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-thynkteck-black py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-white/50 text-sm">Next project</span>
            <h3 className="text-2xl font-semibold text-white">{nextProject.title}</h3>
          </div>
          <Button href={`/work/${nextProject.slug}`}>View project</Button>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 6: Create `src/app/work/[slug]/page.tsx`**

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ProjectDetailTemplate from '@/components/work/ProjectDetailTemplate'
import { projects } from '@/data/projects'

interface WorkPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export function generateMetadata({ params }: WorkPageProps): Metadata {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) return {}
  return {
    title: `${project.title} — Thynkteck`,
    description: project.summary,
  }
}

export default function WorkDetailPage({ params }: WorkPageProps) {
  const index = projects.findIndex((p) => p.slug === params.slug)
  if (index === -1) notFound()

  const project = projects[index]
  const nextProject = projects[(index + 1) % projects.length]

  return (
    <main>
      <Navigation />
      <ProjectDetailTemplate project={project} nextProject={nextProject} />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 7: Verify build and typecheck**

Run: `npx tsc --noEmit && npm run build`
Expected: no errors, build output lists all 6 static `/work/[slug]` pages.

- [ ] **Step 8: Manual check**

Run: `npm run dev`, visit `/work` then a project detail page. Confirm: cover image (placeholder SVG) renders, challenge/approach/result cards show, tech stack tags render, "next project" link cycles to another project.

- [ ] **Step 9: Commit**

```bash
git add src/app/work src/components/work public/images/work public/images/team next.config.js
git commit -m "feat: add work overview page and case study detail template"
```

---

### Task 11: Blog overview + post detail template

**Files:**
- Create: `src/app/blog/page.tsx`
- Create: `src/app/blog/[slug]/page.tsx`
- Create: `src/components/blog/PostDetailTemplate.tsx`

**Interfaces:**
- Consumes: `posts` (Task 2), `SectionHeading`, `BentoCard` (Task 4), `Navigation` (Task 5), `Footer` (Task 6).
- Produces: `/blog` and `/blog/[slug]` routes for all 4 post slugs — linked from `Navigation` (Task 5).

- [ ] **Step 1: Create `src/app/blog/page.tsx`**

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/ui/SectionHeading'
import BentoCard from '@/components/ui/BentoCard'
import { posts } from '@/data/posts'

export const metadata: Metadata = {
  title: 'Blog — Thynkteck',
  description: 'Notes on web development, AI, ecommerce, and IT consulting from the Thynkteck team.',
}

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <main>
      <Navigation />
      <section className="bg-thynkteck-black pt-40 pb-20 sm:pt-48 sm:pb-28">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading eyebrow="Blog" title="Notes from the team" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {sorted.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <BentoCard className="h-full cursor-pointer">
                  <span className="text-xs text-thynkteck-blue font-semibold uppercase tracking-wide">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-semibold text-white mt-2 mb-2">{post.title}</h3>
                  <p className="text-white/60 text-sm mb-3">{post.excerpt}</p>
                  <span className="text-white/40 text-xs">
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </BentoCard>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
```

- [ ] **Step 2: Create `PostDetailTemplate.tsx`**

```tsx
// src/components/blog/PostDetailTemplate.tsx
import { BlogPost } from '@/data/types'

interface PostDetailTemplateProps {
  post: BlogPost
}

export default function PostDetailTemplate({ post }: PostDetailTemplateProps) {
  return (
    <article className="bg-thynkteck-black pt-40 pb-24 sm:pt-48">
      <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
        <span className="inline-block text-thynkteck-blue text-sm font-semibold tracking-widest uppercase mb-4">
          {post.category}
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">{post.title}</h1>
        <div className="text-white/50 text-sm mb-10">
          {post.author} ·{' '}
          {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
        <p className="text-white/80 text-lg leading-relaxed whitespace-pre-line">{post.body}</p>
      </div>
    </article>
  )
}
```

- [ ] **Step 3: Create `src/app/blog/[slug]/page.tsx`**

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PostDetailTemplate from '@/components/blog/PostDetailTemplate'
import { posts } from '@/data/posts'

interface BlogPostPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) return {}
  return {
    title: `${post.title} — Thynkteck`,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) notFound()

  return (
    <main>
      <Navigation />
      <PostDetailTemplate post={post} />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 4: Verify build and typecheck**

Run: `npx tsc --noEmit && npm run build`
Expected: no errors, build output lists all 4 static `/blog/[slug]` pages.

- [ ] **Step 5: Manual check**

Run: `npm run dev`, visit `/blog` then a post. Confirm: post list sorted newest-first, detail page renders title/author/date/body.

- [ ] **Step 6: Commit**

```bash
git add src/app/blog src/components/blog
git commit -m "feat: add blog overview page and post detail template"
```

---

### Task 12: Contact page UI

**Files:**
- Create: `src/components/contact/ContactForm.tsx`
- Create: `src/app/contact/page.tsx`

**Interfaces:**
- Consumes: `validateContactForm`, `ContactFormData`, `ContactFormErrors` (Task 3), `services` (Task 2, for the service dropdown), `Navigation` (Task 5), `Footer` (Task 6). Posts to `/api/contact` (Task 13 — this task can be built and manually verified against a 404 from that route until Task 13 exists; Step 5 below covers exactly that expected intermediate state).
- Produces: `/contact` route — linked from `Navigation` (Task 5), `Footer` (Task 6), and every service/CTA `Button` in the site.

- [ ] **Step 1: Create `ContactForm.tsx`**

```tsx
// src/components/contact/ContactForm.tsx
'use client'

import { FormEvent, useState } from 'react'
import { services } from '@/data/services'
import { validateContactForm, ContactFormData, ContactFormErrors } from '@/lib/contactValidation'

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

const initialData: ContactFormData = {
  name: '',
  email: '',
  company: '',
  service: '',
  message: '',
}

export default function ContactForm() {
  const [data, setData] = useState<ContactFormData>(initialData)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const handleChange = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const validationErrors = validateContactForm(data)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setStatus('submitting')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Request failed')
      setStatus('success')
      setData(initialData)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-thynkteck-soft-black border border-white/10 p-8 text-center">
        <h3 className="text-2xl font-semibold text-white mb-2">Message sent</h3>
        <p className="text-white/60">Thanks — we&rsquo;ll get back to you within one business day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm text-white/70 mb-2">Name</label>
        <input
          id="name"
          value={data.name}
          onChange={handleChange('name')}
          className="w-full rounded-lg bg-thynkteck-soft-black border border-white/10 px-4 py-3 text-white focus:border-thynkteck-blue outline-none"
        />
        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-white/70 mb-2">Email</label>
        <input
          id="email"
          type="email"
          value={data.email}
          onChange={handleChange('email')}
          className="w-full rounded-lg bg-thynkteck-soft-black border border-white/10 px-4 py-3 text-white focus:border-thynkteck-blue outline-none"
        />
        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="company" className="block text-sm text-white/70 mb-2">Company (optional)</label>
        <input
          id="company"
          value={data.company}
          onChange={handleChange('company')}
          className="w-full rounded-lg bg-thynkteck-soft-black border border-white/10 px-4 py-3 text-white focus:border-thynkteck-blue outline-none"
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm text-white/70 mb-2">What do you need? (optional)</label>
        <select
          id="service"
          value={data.service}
          onChange={handleChange('service')}
          className="w-full rounded-lg bg-thynkteck-soft-black border border-white/10 px-4 py-3 text-white focus:border-thynkteck-blue outline-none"
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-white/70 mb-2">Message</label>
        <textarea
          id="message"
          rows={5}
          value={data.message}
          onChange={handleChange('message')}
          className="w-full rounded-lg bg-thynkteck-soft-black border border-white/10 px-4 py-3 text-white focus:border-thynkteck-blue outline-none"
        />
        {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-400">Something went wrong sending your message. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-thynkteck-blue text-white px-8 py-3 text-sm font-semibold hover:bg-blue-600 transition-colors disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
```

- [ ] **Step 2: Create `src/app/contact/page.tsx`**

```tsx
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/ui/SectionHeading'
import ContactForm from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact — Thynkteck',
  description: 'Get in touch with the Thynkteck team at services@thynkteck.com.',
}

export default function ContactPage() {
  return (
    <main>
      <Navigation />
      <section className="bg-thynkteck-black pt-40 pb-20 sm:pt-48 sm:pb-28">
        <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Tell us about your project"
              description="We usually reply within one business day."
            />
            <a href="mailto:services@thynkteck.com" className="text-thynkteck-blue font-medium">
              services@thynkteck.com
            </a>
          </div>
          <ContactForm />
        </div>
      </section>
      <Footer />
    </main>
  )
}
```

- [ ] **Step 3: Verify build and typecheck**

Run: `npx tsc --noEmit && npm run build`
Expected: no errors.

- [ ] **Step 4: Manual check**

Run: `npm run dev`, visit `/contact`. Confirm: form fields render, submitting with an empty name/email/short message shows inline validation errors, service dropdown lists all 7 services.

- [ ] **Step 5: Manual check of the not-yet-built API route**

Fill in valid data and submit. Expected at this point in the plan (before Task 13 exists): the fetch to `/api/contact` returns a 404 and the form shows the red "Something went wrong" error state — this confirms the client-side error path works correctly. Task 13 makes the happy path work end to end.

- [ ] **Step 6: Commit**

```bash
git add src/app/contact src/components/contact
git commit -m "feat: add contact page with validated form UI"
```

---

### Task 13: Contact API route (Resend integration, TDD)

**Files:**
- Create: `src/app/api/contact/route.ts`
- Test: `src/app/api/contact/__tests__/route.test.ts`

**Interfaces:**
- Consumes: `validateContactForm`, `ContactFormData` (Task 3). Reads `RESEND_API_KEY` and `CONTACT_TO_EMAIL` env vars (Task 1's `.env.example`).
- Produces: `POST /api/contact` — consumed by `ContactForm` (Task 12).

- [ ] **Step 1: Write the failing tests**

```ts
// src/app/api/contact/__tests__/route.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'

const sendMock = vi.fn()

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: sendMock },
  })),
}))

import { POST } from '../route'

function makeRequest(body: unknown) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

const validBody = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  company: 'Acme Co',
  service: 'web-app-development',
  message: 'We would like to discuss a new project with your team.',
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    sendMock.mockReset()
    sendMock.mockResolvedValue({ data: { id: 'test-id' }, error: null })
    process.env.RESEND_API_KEY = 'test-key'
    process.env.CONTACT_TO_EMAIL = 'services@thynkteck.com'
  })

  it('returns 400 with field errors for invalid input', async () => {
    const response = await POST(makeRequest({ ...validBody, email: 'not-an-email' }))
    const json = await response.json()
    expect(response.status).toBe(400)
    expect(json.success).toBe(false)
    expect(json.errors.email).toBeDefined()
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('sends an email and returns success for valid input', async () => {
    const response = await POST(makeRequest(validBody))
    const json = await response.json()
    expect(response.status).toBe(200)
    expect(json.success).toBe(true)
    expect(sendMock).toHaveBeenCalledTimes(1)
    expect(sendMock.mock.calls[0][0]).toMatchObject({
      to: 'services@thynkteck.com',
      replyTo: 'jane@example.com',
    })
  })

  it('returns 500 when RESEND_API_KEY is not configured', async () => {
    delete process.env.RESEND_API_KEY
    const response = await POST(makeRequest(validBody))
    expect(response.status).toBe(500)
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('returns 502 when the email provider throws', async () => {
    sendMock.mockRejectedValue(new Error('provider down'))
    const response = await POST(makeRequest(validBody))
    const json = await response.json()
    expect(response.status).toBe(502)
    expect(json.success).toBe(false)
  })
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run src/app/api/contact/__tests__/route.test.ts`
Expected: FAIL — `Cannot find module '../route'`.

- [ ] **Step 3: Implement `src/app/api/contact/route.ts`**

```ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { validateContactForm, ContactFormData } from '@/lib/contactValidation'

export async function POST(request: Request) {
  const data = (await request.json()) as ContactFormData

  const errors = validateContactForm(data)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ success: false, errors }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { success: false, errors: { message: 'Email service is not configured.' } },
      { status: 500 }
    )
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || 'services@thynkteck.com'
  const resend = new Resend(apiKey)

  try {
    await resend.emails.send({
      from: 'Thynkteck Website <onboarding@resend.dev>',
      to: toEmail,
      replyTo: data.email,
      subject: `New inquiry from ${data.name}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.company ? `Company: ${data.company}` : null,
        data.service ? `Service: ${data.service}` : null,
        '',
        data.message,
      ]
        .filter(Boolean)
        .join('\n'),
    })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, errors: { message: 'Failed to send message. Please try again.' } },
      { status: 502 }
    )
  }
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run src/app/api/contact/__tests__/route.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Run the full test suite and typecheck**

Run: `npm test && npx tsc --noEmit`
Expected: all tests pass (data integrity + relatedWork + contactValidation + contact route = 18 tests total), no type errors.

- [ ] **Step 6: Verify build**

Run: `npm run build`
Expected: build succeeds, `/api/contact` listed as a dynamic route.

- [ ] **Step 7: Manual end-to-end check (requires a real Resend API key)**

Add a real `RESEND_API_KEY` to `.env.local` (never commit this file — confirm it's covered by `.gitignore`), run `npm run dev`, submit the `/contact` form with valid data, and confirm an email arrives at the configured `CONTACT_TO_EMAIL`. If no key is available yet, skip this step and note it as a follow-up for the user before launch — Steps 1–6 already prove the route's logic is correct via mocked tests.

- [ ] **Step 8: Commit**

```bash
git add src/app/api
git commit -m "feat: wire contact form to Resend via /api/contact route"
```

---

### Task 14: Final integration pass

**Files:**
- Modify: none expected (verification-only task; fix anything Step 1–4 surface)

**Interfaces:**
- Consumes: everything from Tasks 1–13.
- Produces: a verified, fully-wired site — this is the plan's final task.

- [ ] **Step 1: Confirm no references to deleted legacy components remain**

Run: `grep -rl "devsphere-green\|devsphere-dark-green\|DevSphere" src`
Expected: no output. If anything is found, update or remove it (this catches any leftover copy from the original DevSphere branding this plan didn't already touch).

- [ ] **Step 2: Run the full verification suite**

Run: `npm test && npx tsc --noEmit && npm run lint && npm run build`
Expected: all four commands succeed with no errors or warnings that weren't already present before this plan started.

- [ ] **Step 3: Full manual site walk-through**

Run: `npm run dev` and visit every route: `/`, `/about`, `/services`, `/services/web-app-development` (and spot-check 2 more service slugs), `/work`, `/work/northwind-retail-platform` (and spot-check 2 more project slugs), `/blog`, `/blog/designing-for-trust-in-ai-products`, `/contact`. Confirm on each: Navigation and Footer render correctly, no console errors, no broken images, dark theme background is consistent (`#000000`/`#1A1B1B` alternation, no leftover white/light sections), brand blue `#0B35FA` is used consistently for accents.

- [ ] **Step 4: Mobile check**

In the browser dev tools, switch to a mobile viewport (e.g. 375px wide) and re-check `/`, `/services`, `/work`, `/contact`. Confirm: mobile nav menu opens/closes, bento grids collapse to a single column, contact form is usable, no horizontal scroll/overflow.

- [ ] **Step 5: Commit any fixes found in Steps 1–4**

If Steps 1–4 required any code changes, stage and commit them:

```bash
git add -A
git commit -m "fix: final integration pass — cleanup and cross-page verification"
```

If no changes were needed, skip this step (nothing to commit).

---

## Post-launch follow-ups (not part of this plan)

- Provide a real `RESEND_API_KEY` and verify the `thynkteck.com` sending domain in Resend so contact emails don't come from the shared `resend.dev` dev domain.
- Replace all placeholder content (`src/data/*.ts`) with real projects, team bios, testimonials, and blog posts as they become available.
- Replace placeholder SVG images in `public/images/work/` and `public/images/team/` with real photography.
