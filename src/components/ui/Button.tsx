import Link from 'next/link'
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface BaseProps {
  children: ReactNode
  variant?: 'primary' | 'outline'
  className?: string
}

interface LinkButtonProps extends BaseProps {
  href: string
  onClick?: never
}

interface ClickButtonProps extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  href?: never
}

type ButtonProps = LinkButtonProps | ClickButtonProps

const baseClasses =
  'inline-flex items-center justify-center rounded-full px-6 py-3 text-nav font-semibold transition-colors duration-200'

const variantClasses: Record<NonNullable<BaseProps['variant']>, string> = {
  primary: 'bg-thynkteck-blue text-white hover:bg-blue-600',
  outline: 'border border-white/30 text-white hover:border-thynkteck-blue hover:text-thynkteck-blue',
}

export default function Button({ children, variant = 'primary', className = '', href, ...rest }: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
