import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        brand: {
          navy: '#1E3A5F',
          teal: '#0D9488',
          amber: '#F59E0B',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        gkk: {
          bg: '#0a0a0f',
          surface: '#12121e',
          elevated: '#1a1a2e',
          primary: '#f0efe9',
          muted: 'rgba(240, 239, 233, 0.6)',
          faint: 'rgba(240, 239, 233, 0.3)',
          border: 'rgba(255, 255, 255, 0.08)',
          accent: '#2c2cf3',
          glow: '#06e4f9',
          emerald: '#22c55e',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['Syne', '"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px 0 rgba(30, 58, 95, 0.08)',
        'card-hover': '0 8px 24px 0 rgba(30, 58, 95, 0.14)',
        'nav': '0 1px 3px 0 rgba(30, 58, 95, 0.1)',
        'cyber-cyan': '0 0 25px -5px rgba(6, 228, 249, 0.4)',
        'cyber-accent': '0 0 30px -5px rgba(44, 44, 243, 0.5)',
        'cyber-emerald': '0 0 20px -3px rgba(34, 197, 94, 0.4)',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.4s ease-out',
        'slide-in-from-top': 'slide-in-from-top 0.3s ease-out',
        'slide-in-from-bottom': 'slide-in-from-bottom 0.3s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-soft': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-from-top': {
          from: { opacity: '0', transform: 'translateY(-16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-from-bottom': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #1E3A5F 0%, #0D9488 100%)',
        'navy-gradient': 'linear-gradient(135deg, #1E3A5F 0%, #2d5a8e 100%)',
        'teal-gradient': 'linear-gradient(135deg, #0D9488 0%, #14b8a6 100%)',
      },
    },
  },
  plugins: [animate],
}

export default config
