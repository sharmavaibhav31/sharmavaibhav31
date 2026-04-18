/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'bg-surface': 'var(--bg-surface)',
        'bg-raised': 'var(--bg-raised)',
        'border-default': 'var(--border-default)',
        'border-subtle': 'var(--border-subtle)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'accent-red': 'var(--accent-red)',
        'accent-red-bg': 'var(--accent-red-bg)',
        'accent-red-border': 'var(--accent-red-border)',
        'accent-green': 'var(--accent-green)',
        'accent-green-bg': 'var(--accent-green-bg)',
        'accent-green-border': 'var(--accent-green-border)',
        'accent-orange': 'var(--accent-orange)',
        'accent-orange-bg': 'var(--accent-orange-bg)',
        'accent-orange-border': 'var(--accent-orange-border)',
        'accent-amber': 'var(--accent-amber)',
        'accent-amber-bg': 'var(--accent-amber-bg)',
        'accent-amber-border': 'var(--accent-amber-border)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        }
      },
      animation: {
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
