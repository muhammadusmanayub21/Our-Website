'use client'

import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'

interface ProcessStep {
  title: string
  description: string
  icon: JSX.Element
}

const steps: ProcessStep[] = [
  {
    title: 'Discover',
    description: 'We map requirements, users, and constraints before committing to an approach.',
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </>
    ),
  },
  {
    title: 'Plan',
    description: 'A scoped roadmap with clear milestones, so you know what ships and when.',
    icon: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 8h6M9 12h6M9 16h3" />
      </>
    ),
  },
  {
    title: 'Build',
    description: 'Iterative development in short cycles, with staging environments you can review continuously.',
    icon: (
      <>
        <path d="M8 6l-5 6 5 6M16 6l5 6-5 6" />
      </>
    ),
  },
  {
    title: 'Launch',
    description: 'Production rollout with monitoring in place from day one, not bolted on after.',
    icon: (
      <>
        <path d="M12 2c2 2.5 3 5.5 3 9 0 2-1 4-3 6-2-2-3-4-3-6 0-3.5 1-6.5 3-9z" />
        <path d="M9 15l-3 5 4-1M15 15l3 5-4-1" />
      </>
    ),
  },
  {
    title: 'Support',
    description: 'Ongoing maintenance and iteration as your product and priorities evolve.',
    icon: (
      <>
        <path d="M14.7 6.3a4 4 0 01-5.4 5.4l-5 5a2 2 0 002.8 2.8l5-5a4 4 0 015.4-5.4l-2.6 2.6-2.8-.6-.6-2.8 2.6-2.6z" />
      </>
    ),
  },
]

export default function ProcessSection() {
  return (
    <section className="bg-thynkteck-black py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="How we work"
          title="A process built to remove surprises"
          description="Five stages, one team, full visibility from kickoff to launch and beyond."
        />

        <div className="flex flex-col md:flex-row gap-10 md:gap-0 rounded-3xl overflow-hidden border border-white/10">
          <div
            className="relative shrink-0 w-full md:w-28 py-6 md:py-0 flex items-center justify-center"
            style={{ background: 'linear-gradient(160deg, #0B35FA 0%, #061c85 55%, #05061a 100%)' }}
          >
            <span className="text-white font-bold tracking-[0.4em] uppercase text-caption md:hidden">
              Approach
            </span>
            <span
              className="hidden md:block text-white font-bold tracking-[0.5em] uppercase text-subhead whitespace-nowrap"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              Approach
            </span>
          </div>

          <div className="flex-1 bg-thynkteck-soft-black px-4 py-8 sm:px-10 sm:py-10">
            <div className="relative">
              <div
                className="absolute left-6 top-2 bottom-2 w-px bg-white/10"
                aria-hidden="true"
              />
              <div className="space-y-10">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="relative flex gap-5 sm:gap-6 items-start"
                  >
                    <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-thynkteck-black border border-thynkteck-blue/40 shrink-0">
                      <svg
                        className="w-5 h-5 text-thynkteck-blue"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        {step.icon}
                      </svg>
                    </div>
                    <div className="pt-1">
                      <span className="block text-caption font-semibold tracking-widest text-white/30 mb-1">
                        0{index + 1}
                      </span>
                      <h3 className="text-subhead font-semibold text-white mb-1.5">{step.title}</h3>
                      <p className="text-caption text-white/60 leading-relaxed max-w-md">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
