'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'

interface StatCounterProps {
  value: number
  suffix?: string
  label: string
}

export default function StatCounter({ value, suffix = '', label }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 1200 })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(latest)}${suffix}`
      }
    })
    return unsubscribe
  }, [springValue, suffix])

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <span ref={ref} className="block text-stat font-bold text-white">
        0{suffix}
      </span>
      <span className="mt-2 block text-caption text-white/60">{label}</span>
    </motion.div>
  )
}
