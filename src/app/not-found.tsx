import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Page not found — Thynkteck',
  description: 'The page you were looking for does not exist.',
}

export default function NotFound() {
  return (
    <main>
      <Navigation />
      <section className="bg-thynkteck-black pt-40 pb-20 sm:pt-48 sm:pb-28">
        <div className="container mx-auto px-4 sm:px-6">
          <span className="text-eyebrow text-thynkteck-blue">404</span>
          <h1 className="mt-3 text-page font-bold text-white">Page not found</h1>
          <p className="mt-4 max-w-xl text-body text-white/60">
            The page you were looking for doesn&rsquo;t exist or may have moved. Head back to the
            homepage to pick up where you left off.
          </p>
          <Button href="/" className="mt-8">
            Back to home
          </Button>
        </div>
      </section>
      <Footer />
    </main>
  )
}
