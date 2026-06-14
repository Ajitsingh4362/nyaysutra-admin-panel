import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        title:   ['Cinzel', 'serif'],
        sans:    ['DM Sans', 'sans-serif'],
      },
      colors: {
        gold:  '#C9A84C',
        gold2: '#E8C96A',
        gold3: '#8B6B2A',
        ivory: '#F5F0E8',
      },
      maxWidth: { site: 'min(80rem, 100vw - 2rem)' },
    },
  },
  plugins: [],
}
export default config
