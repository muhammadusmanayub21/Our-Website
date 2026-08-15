import Button from '@/components/ui/Button'

export default function ContactCTA() {
  return (
    <section className="relative bg-thynkteck-black py-20 sm:py-28 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 65% at 50% 40%, rgba(11,53,250,0.28) 0%, rgba(11,53,250,0.06) 45%, rgba(0,0,0,0) 75%)',
        }}
        aria-hidden="true"
      />
      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <span className="inline-block text-thynkteck-blue text-eyebrow mb-4">
          Let&apos;s build something together
        </span>
        <h2 className="text-section font-bold text-white mb-6 max-w-2xl mx-auto">
          Have a project in mind?
        </h2>
        <p className="text-body-lg text-white/70 mb-8 max-w-2xl mx-auto">
          Tell us what you&apos;re building — we&apos;ll get back to you within one business day.
        </p>
        <Button href="/contact">Let&apos;s talk</Button>
      </div>
    </section>
  )
}
