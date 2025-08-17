import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ExpertiseSection from '@/components/ExpertiseSection'
import ServicesSection from '@/components/ServicesSection'
import WorkSection from '@/components/WorkSection'
import TechStackSection from '@/components/TechStackSection'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ExpertiseSection />
      <ServicesSection />
      <WorkSection />
      <TechStackSection />
      <FAQSection />
      <Footer />
    </main>
  )
}