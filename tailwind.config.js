/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#2D9CDB',
        'deep-blue': '#1A5F7A',
        'bright-cyan': '#56CCF2',
        'warm-yellow': '#F2C94C',
        'soft-pink': '#FF6B9D',
        'dark-bg': '#0A1628',
        'light-cream': '#FEF9F3',
        'text-dark': '#1A1A2E',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease forwards',
        'fade-in-up-delayed': 'fadeInUp 0.8s ease forwards 0.2s',
        'fade-in-up-more-delayed': 'fadeInUp 0.8s ease forwards 0.4s',
        'fade-in-up-most-delayed': 'fadeInUp 0.8s ease forwards 0.6s',
        'float': 'float 20s infinite ease-in-out',
        'float-delayed': 'float 20s infinite ease-in-out 5s',
        'float-slow': 'float 25s infinite ease-in-out 10s',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translate(0, 0) rotate(0deg)',
          },
          '33%': {
            transform: 'translate(30px, -50px) rotate(120deg)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) rotate(240deg)',
          },
        },
      },
    },
  },
  plugins: [],
}
