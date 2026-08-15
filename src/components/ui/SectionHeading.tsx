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
        <span className="block text-thynkteck-blue text-eyebrow mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-section font-bold text-white">{title}</h2>
      {description && <p className="mt-4 text-body-lg text-white/70">{description}</p>}
    </div>
  )
}
