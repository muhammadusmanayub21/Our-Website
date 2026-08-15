'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

const nodes = [
  { top: '20%', left: '15%', delay: 0 },
  { top: '65%', left: '10%', delay: 0.4 },
  { top: '30%', left: '80%', delay: 0.2 },
  { top: '75%', left: '70%', delay: 0.6 },
  { top: '50%', left: '45%', delay: 0.3 },
]

const mantra = ['Think', 'Build', 'Ship', 'Scale']

export default function Hero() {
  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden bg-thynkteck-black">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 55% at 75% 30%, rgba(11,53,250,0.35) 0%, rgba(11,53,250,0.08) 45%, rgba(0,0,0,0) 75%), radial-gradient(45% 40% at 15% 80%, rgba(11,53,250,0.18) 0%, rgba(0,0,0,0) 70%)',
          }}
          aria-hidden="true"
        />
        <svg className="absolute inset-0 w-full h-full opacity-40" aria-hidden="true">
          <line x1="15%" y1="20%" x2="45%" y2="50%" stroke="#0B35FA" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="45%" y1="50%" x2="80%" y2="30%" stroke="#0B35FA" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="45%" y1="50%" x2="70%" y2="75%" stroke="#0B35FA" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="10%" y1="65%" x2="45%" y2="50%" stroke="#0B35FA" strokeWidth="1" strokeOpacity="0.3" />
          {nodes.map((node, i) => (
            <motion.circle
              key={i}
              cx={node.left}
              cy={node.top}
              r="4"
              fill="#0B35FA"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: node.delay }}
            />
          ))}
        </svg>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-thynkteck-blue text-eyebrow mb-4">
              Web · App · AI · Design
            </span>
            <h1 className="text-hero font-bold text-white mb-6">
              We build the software your industry actually needs
            </h1>
            <p className="text-body-lg text-white/70 mb-8 max-w-xl">
              Thynkteck is a full-service digital agency: web and app development, UI/UX and branding,
              AI and automation, IT consulting, Shopify and WordPress — under one roof.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/contact">Start a project</Button>
              <Button href="/work" variant="outline">
                See our work
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="bg-thynkteck-soft-black border-y border-white/10 py-4">
        <div className="container mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          {mantra.map((word, i) => (
            <span key={word} className="flex items-center gap-3">
              <span className="text-caption font-semibold tracking-[0.3em] uppercase text-white/50">
                {word}
              </span>
              {i < mantra.length - 1 && <span className="text-thynkteck-blue text-caption">•</span>}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
