import Navigation from '@/components/Navigation'
import Hero from '@/components/home/Hero'
import AboutTeaser from '@/components/home/AboutTeaser'
import ServiceStrip from '@/components/home/ServiceStrip'
import ProcessSection from '@/components/home/ProcessSection'
import FeaturedWork from '@/components/home/FeaturedWork'
import TeamStrip from '@/components/home/TeamStrip'
import StatsBar from '@/components/home/StatsBar'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <AboutTeaser />
      <ServiceStrip />
      <ProcessSection />
      <FeaturedWork />
      <TeamStrip />
      <StatsBar />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
