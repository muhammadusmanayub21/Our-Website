# Thynkteck Website Redesign — Design Spec

**Date:** 2026-08-13
**Status:** Approved for planning

## Summary

Rebrand and rebuild the current single-page "DevSphere" Next.js site into a full multi-page website for **Thynkteck**, a full-service digital agency (web/app development, UI/UX & branding, AI/automation/data, IT consulting & managed services, custom software for any industry, Shopify development, WordPress development).

The current codebase (Next.js 14 App Router, TypeScript, Tailwind) is reused and restructured; this is a rebrand + expansion, not a rewrite from scratch.

## Brand

- **Logo:** "Thynkteck" wordmark — circuit-board "T" mark in brand blue, bold black "hynk", lighter-weight black "teck", small blue underline accent beneath "teck". Source files: `thynktech transparent/1.png` (full lockup), `2.png`/`3.png` (icon mark only).
- **Colors (exact, sampled from logo):**
  - `#0B35FA` — brand blue (primary accent: CTAs, links, glows, icon highlights)
  - `#1A1B1B` — soft black (secondary dark surface, layered above true black)
  - `#000000` — true black (base dark background)
  - White — primary text on dark, and any inverted-surface text
  - 1–2 supporting neutral grays for secondary text/borders (derived, not from logo)
- **Visual tone:** Dark, bold, tech-forward — inspired by modern dev/design agency sites (Vercel/Linear-style boldness) blended with structural patterns borrowed from tkxel.com (alternating section rhythm, service mega-nav, stats bar, case-study depth) adapted to Thynkteck's smaller, dark-only palette.
- **Signature motif:** The logo's stepped/circuit-line pattern reused as a subtle background/divider graphic across sections (replacing the current green stepped-pattern motif in the existing Hero component), rendered in brand blue.

## Site structure (routes)

| Route | Purpose |
|---|---|
| `/` | Home — hero (circuit/particle animation), service overview strip, featured work, stats, why-us, testimonials, CTA |
| `/about` | Story, mission, team grid, values |
| `/services` | Overview grid (bento-style) of all 7 services, each links to its detail page |
| `/services/web-app-development` | Service detail |
| `/services/ui-ux-branding` | Service detail |
| `/services/ai-automation-data` | Service detail |
| `/services/it-consulting` | Service detail |
| `/services/custom-software` | Service detail |
| `/services/shopify-development` | Service detail |
| `/services/wordpress-development` | Service detail |
| `/work` | Portfolio grid (~6 placeholder projects), filterable by category/service |
| `/work/[project-slug]` | Case study — challenge/approach/result, tech stack, gallery, next-project link |
| `/blog` | Article list (~4 placeholder posts) |
| `/blog/[post-slug]` | Individual article |
| `/contact` | Contact form (wired to email), contact details |

Navigation: **Home · About · Services · Work · Blog · Contact**, with Services and Work as dropdowns (desktop hover/click) / accordions (mobile). Logo links home.

Each service detail page shares one template: hero blurb → capabilities list → our process → related work (auto-pulled by matching tags from `/work` data) → CTA.

Each work detail page shares one template: hero image → challenge/approach/result → tech stack tags → gallery → next-project link.

## Visual design system

- **Section rhythm:** All sections stay dark-themed; alternate `#000000` and `#1A1B1B` backgrounds between sections for separation (adapting tkxel's light/dark alternation into two dark tones so the bold identity never breaks).
- **Typography:** Inter (already in use). Large, tight-tracked bold headlines for hero/section titles (echoing the wordmark's bold "hynk"); lighter weight for supporting copy (echoing the wordmark's lighter "teck") and body text.
- **Cards/grids:** `#1A1B1B` surfaces, rounded corners, subtle blue border/glow on hover. Services and About use a **bento-grid** (mixed card sizes) rather than a uniform grid.
- **Stats:** Animated count-up stat bar (e.g. projects delivered, industries served, technologies used) using honest placeholder numbers, clearly structured for easy real-number swap-in.
- **Footer:** Includes a **marquee ticker** of technologies/tools worked with (React, Shopify, WordPress, AI/ML stack, etc.), infinite horizontal scroll.
- **Hero signature effect:** Animated circuit/particle-network background on the homepage hero — glowing nodes and connecting lines drifting subtly, directly echoing the logo's circuit-board "T" mark. This is the site's one standout visual centerpiece; other pages use calmer scroll-reveal animations only, to keep it from feeling gimmicky.
- **Motion library:** Framer Motion for scroll-reveals, hover states, and the hero animation.
- **Explicitly out of scope for this pass:** custom cursor, magnetic-button hover physics, grain/noise texture overlays — considered and deferred as unnecessary polish for v1.

## Content & data structure

All content lives in typed TypeScript data files under `src/data/`, so pages are generated from data rather than hand-built per item, and swapping in real content later is a data-file edit, not a rebuild:

- `services.ts` — 7 services: slug, title, short/long description, icon, capabilities list, related-work tags
- `projects.ts` — ~6 placeholder case studies: slug, title, client/industry, cover image, challenge/approach/result copy, tech tags, gallery images
- `posts.ts` — ~4 placeholder blog posts: slug, title, excerpt, body, date, category
- `team.ts` — placeholder team members: name, role, photo placeholder, bio
- `testimonials.ts` — placeholder client quotes

All placeholder entries are clearly marked as such (comment header in each file) so they're easy to find and replace.

Detail routes (`/services/[slug]`, `/work/[slug]`, `/blog/[slug]`) use `generateStaticParams` sourced from these data files.

## Contact form

- Fields: name, email, company (optional), budget/service dropdown, message. Client-side validation.
- Submits to a Next.js Route Handler at `/api/contact`.
- Route handler sends via **Resend**, destination `services@thynkteck.com`. Returns success/error JSON; form shows inline success/error state.
- Requires `RESEND_API_KEY` env var (user-provided, not committed). If the `thynkteck.com` sending domain isn't verified in Resend yet, fall back to Resend's shared dev sending domain until it is.

## Architecture / implementation notes

- Reuse existing Next.js 14 App Router + TypeScript + Tailwind setup; no framework change.
- Restructure `src/app/` into real nested routes per the site map above, replacing the current single `page.tsx` composed of anchor-linked sections.
- Existing components (`HeroSection`, `AboutSection`, `ExpertiseSection`, `ServicesSection`, `WorkSection`, `TechStackSection`, `FAQSection`, `Footer`, `Navigation`) are rebranded/restyled and redistributed across the new pages rather than discarded outright — evaluate case by case during implementation which are reusable vs. need replacing.
- Tailwind config (`tailwind.config.ts`) updated: remove `devsphere-green`/`devsphere-dark-green` tokens, add Thynkteck brand tokens (`thynkteck-blue: #0B35FA`, `thynkteck-black: #000000`, `thynkteck-soft-black: #1A1B1B`).
- `layout.tsx` metadata (title/description) updated from "DevSphere" to "Thynkteck".
- Logo asset(s) copied into `public/` from the provided `thynktech transparent/` source files.
- New dependency: **Framer Motion** (animation), **Resend** (email sending SDK).

## Explicitly deferred / out of scope

- Real project case studies, team bios, testimonials, and client logos — placeholders only, user will supply real content later.
- Multi-language / i18n support.
- CMS integration — content is static/data-file-driven for this pass.
- Blog commenting, search, or pagination beyond a simple list (only ~4 posts).
