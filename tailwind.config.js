/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F8FAFC',
        primary: '#0F172A',
        secondary: '#475569',
        accent: '#2563EB',
        'accent-hover': '#1D4ED8',
        border: '#E2E8F0',
        'border-hover': '#CBD5E1',
        surface: '#FFFFFF',
        muted: '#94A3B8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1', letterSpacing: '-0.04em', fontWeight: '800' }],
        'section': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
      },
      letterSpacing: {
        'widest-plus': '0.2em',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
        'card-hover': '0 4px 12px 0 rgb(0 0 0 / 0.08), 0 2px 4px -1px rgb(0 0 0 / 0.04)',
      },
      animation: {
        'grid-drift': 'gridDrift 20s ease-in-out infinite alternate',
        'reveal': 'reveal 0.2s ease-out forwards',
      },
      keyframes: {
        gridDrift: {
          '0%': { transform: 'translate(0px, 0px)' },
          '100%': { transform: 'translate(-12px, -8px)' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionDuration: {
        '200': '200ms',
        '250': '250ms',
      },
    },
  },
  plugins: [],
}
