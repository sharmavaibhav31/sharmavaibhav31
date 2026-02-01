/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blueprint-dark': '#0B1121', // Deeper, slightly bluer dark
        'line-blueprint': '#1e3a8a', // Blue-900 for lines to pop more like the image
        'accent-cyan': '#06b6d4',
        'text-dim': '#94a3b8',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'], // Ensure you import this font or use a web safe one
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}
