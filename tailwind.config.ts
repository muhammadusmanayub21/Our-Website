import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'thynkteck-blue': '#0B35FA',
        'thynkteck-black': '#000000',
        'thynkteck-soft-black': '#1A1B1B',
      },
    },
  },
  plugins: [],
}
export default config