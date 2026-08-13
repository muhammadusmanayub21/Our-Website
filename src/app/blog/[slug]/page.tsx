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
