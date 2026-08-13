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
