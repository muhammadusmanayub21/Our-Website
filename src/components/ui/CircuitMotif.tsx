interface CircuitMotifProps {
  className?: string
}

export default function CircuitMotif({ className = '' }: CircuitMotifProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 380 L20 300 L100 300 L100 220 L180 220 L180 140 L260 140 L260 60 L340 60"
        stroke="#0B35FA"
        strokeWidth="2"
        strokeOpacity="0.35"
      />
      <circle cx="100" cy="300" r="5" fill="#0B35FA" fillOpacity="0.5" />
      <circle cx="180" cy="220" r="5" fill="#0B35FA" fillOpacity="0.5" />
      <circle cx="260" cy="140" r="5" fill="#0B35FA" fillOpacity="0.5" />
      <path
        d="M40 40 L120 40 L120 100 L200 100"
        stroke="#0B35FA"
        strokeWidth="2"
        strokeOpacity="0.2"
      />
      <circle cx="120" cy="100" r="4" fill="#0B35FA" fillOpacity="0.4" />
    </svg>
  )
}
