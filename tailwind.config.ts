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
        navy: {
          950: '#04061a',
          900: '#070b24',
          800: '#0d1240',
          700: '#111a55',
          600: '#162070',
        },
        neon: {
          purple: '#a855f7',
          blue: '#38bdf8',
          pink: '#e879f9',
          green: '#4ade80',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'card-shine': 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(56,189,248,0.05) 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(168,85,247,0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(168,85,247,0.7), 0 0 80px rgba(56,189,248,0.3)' },
        },
      },
      boxShadow: {
        'neon-purple': '0 0 20px rgba(168,85,247,0.5)',
        'neon-blue': '0 0 20px rgba(56,189,248,0.5)',
        'card': '0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(168,85,247,0.1) inset',
        'card-hover': '0 8px 40px rgba(0,0,0,0.6), 0 0 20px rgba(168,85,247,0.2)',
      },
    },
  },
  plugins: [],
}
