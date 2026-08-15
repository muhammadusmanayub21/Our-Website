import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Thynkteck — Web, App, AI & Design Agency',
  description:
    'Thynkteck is a full-service digital agency: web & app development, UI/UX & branding, AI/automation, IT consulting, Shopify and WordPress development.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-thynkteck-black text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}