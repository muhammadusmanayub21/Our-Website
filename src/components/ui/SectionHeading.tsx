interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export default function SectionHeading({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`max-w-2xl mb-10 sm:mb-14 ${alignment}`}>
      {eyebrow && (
        <span className="block text-thynkteck-blue text-sm font-semibold tracking-widest uppercase mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">{title}</h2>
      {description && <p className="mt-4 text-base sm:text-lg text-white/70">{description}</p>}
    </div>
  )
}
