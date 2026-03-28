// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        green: {
          50:  'hsl(145, 80%, 96%)',
          100: 'hsl(145, 75%, 90%)',
          200: 'hsl(148, 70%, 78%)',
          300: 'hsl(150, 65%, 65%)',
          400: 'hsl(152, 60%, 50%)',
          500: 'hsl(155, 65%, 40%)',
          600: 'hsl(158, 70%, 32%)',
          700: 'hsl(160, 75%, 24%)',
          800: 'hsl(162, 80%, 16%)',
          900: 'hsl(164, 85%, 10%)',
          950: 'hsl(166, 90%, 5%)',
        },
        surface: {
          primary:   'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary:  'var(--bg-tertiary)',
          elevated:  'var(--bg-elevated)',
        },
        content: {
          primary:   'var(--fg-primary)',
          secondary: 'var(--fg-secondary)',
          muted:     'var(--fg-muted)',
          accent:    'var(--fg-accent)',
        },
      },
      fontFamily: {
        display: ['"Inter"', 'system-ui', 'sans-serif'],
        body:    ['"Inter"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      borderRadius: {
        'card':    '1.25rem',
        'card-sm': '0.75rem',
      },
      transitionTimingFunction: {
        smooth:    'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
        snappy:    'cubic-bezier(0.16, 1, 0.3, 1)',
        dramatic:  'cubic-bezier(0.77, 0, 0.175, 1)',
        bounce:    'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'fade-in':       'fade-in 0.6s var(--ease-smooth) forwards',
        'slide-up':      'slide-up 0.6s var(--ease-snappy) forwards',
        'scale-in':      'scale-in 0.4s var(--ease-bounce) forwards',
        'glow-pulse':    'glow-pulse 3s ease-in-out infinite',
        'float':         'float 6s ease-in-out infinite',
        'grain':         'grain 0.5s steps(1) infinite',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px hsla(152, 60%, 50%, 0.15)' },
          '50%':      { boxShadow: '0 0 40px hsla(152, 60%, 50%, 0.3)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config