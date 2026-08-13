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
