import { ReactNode } from 'react'

interface BentoCardProps {
  children: ReactNode
  className?: string
  span?: 'default' | 'wide' | 'tall'
}

const spanClasses: Record<NonNullable<BentoCardProps['span']>, string> = {
  default: '',
  wide: 'md:col-span-2',
  tall: 'md:row-span-2',
}

export default function BentoCard({ children, className = '', span = 'default' }: BentoCardProps) {
  return (
    <div
      className={`rounded-2xl bg-thynkteck-soft-black border border-white/10 p-6 sm:p-8 transition-all duration-300 hover:border-thynkteck-blue hover:shadow-[0_0_30px_-10px_#0B35FA] ${spanClasses[span]} ${className}`}
    >
      {children}
    </div>
  )
}
