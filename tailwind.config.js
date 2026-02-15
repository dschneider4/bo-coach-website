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
        'darker-bg': '#050A14',
        'light-cream': '#FEF9F3',
        'text-dark': '#1A1A2E',
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease forwards',
        'fade-in-up-d1': 'fadeInUp 0.8s ease forwards 0.15s',
        'fade-in-up-d2': 'fadeInUp 0.8s ease forwards 0.3s',
        'fade-in-up-d3': 'fadeInUp 0.8s ease forwards 0.45s',
        'float': 'float 20s infinite ease-in-out',
        'float-delayed': 'float 20s infinite ease-in-out 5s',
        'float-slow': 'float 25s infinite ease-in-out 10s',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(30px, -50px) rotate(120deg)' },
          '66%': { transform: 'translate(-20px, 20px) rotate(240deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(86, 204, 242, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(86, 204, 242, 0.6), 0 0 80px rgba(45, 156, 219, 0.3)' },
        },
      },
    },
  },
  plugins: [],
}
