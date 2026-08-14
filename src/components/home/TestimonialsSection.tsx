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
