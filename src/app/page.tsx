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
