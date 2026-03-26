// src/systems/design/typography.ts

export const typeStyles = {
  displayXl: {
    className: 'text-display-xl',
    css: {
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(3.5rem, 8vw + 1rem, 10rem)',
      lineHeight: 0.95,
      letterSpacing: '-0.03em',
      fontWeight: 700,
    },
  },
  displayLg: {
    className: 'text-display-lg',
    css: {
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(2.5rem, 5vw + 1rem, 7rem)',
      lineHeight: 0.95,
      letterSpacing: '-0.03em',
      fontWeight: 700,
    },
  },
  displayMd: {
    className: 'text-display-md',
    css: {
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(2rem, 3vw + 0.5rem, 4.5rem)',
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      fontWeight: 600,
    },
  },
  overline: {
    className: 'text-overline',
    css: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.6875rem',
      letterSpacing: '0.2em',
      textTransform: 'uppercase' as const,
    },
  },
} as const;