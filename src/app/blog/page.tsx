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
