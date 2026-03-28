// src/systems/design/tokens.ts
// ─── Premium Green-Centric Design Token System ───

export const colors = {
  // ─── Primary: Signature Green Palette ───
  green: {
    50:  'hsl(145, 80%, 96%)',
    100: 'hsl(145, 75%, 90%)',
    200: 'hsl(148, 70%, 78%)',
    300: 'hsl(150, 65%, 65%)',
    400: 'hsl(152, 60%, 50%)',  // Primary accent
    500: 'hsl(155, 65%, 40%)',  // Core brand
    600: 'hsl(158, 70%, 32%)',
    700: 'hsl(160, 75%, 24%)',
    800: 'hsl(162, 80%, 16%)',
    900: 'hsl(164, 85%, 10%)',
    950: 'hsl(166, 90%, 5%)',
  },

  // ─── Neutral: Warm-tinted for cinematic feel ───
  neutral: {
    0:   'hsl(0, 0%, 100%)',
    50:  'hsl(150, 5%, 97%)',
    100: 'hsl(150, 4%, 93%)',
    200: 'hsl(150, 3%, 85%)',
    300: 'hsl(150, 3%, 70%)',
    400: 'hsl(150, 2%, 50%)',
    500: 'hsl(150, 2%, 35%)',
    600: 'hsl(150, 3%, 22%)',
    700: 'hsl(150, 5%, 15%)',
    800: 'hsl(150, 8%, 10%)',
    900: 'hsl(150, 12%, 7%)',
    950: 'hsl(150, 15%, 4%)',
  },

  // ─── Semantic ───
  success: 'hsl(152, 60%, 50%)',
  warning: 'hsl(42, 90%, 55%)',
  error:   'hsl(0, 75%, 55%)',
  info:    'hsl(200, 70%, 55%)',
} as const;

export const theme = {
  dark: {
    bg: {
      primary:   colors.neutral[950],    // Near-black with green tint
      secondary: colors.neutral[900],
      tertiary:  colors.neutral[800],
      elevated:  'hsla(150, 12%, 7%, 0.8)',  // Glass effect base
    },
    fg: {
      primary:   colors.neutral[0],
      secondary: colors.neutral[300],
      muted:     colors.neutral[400],
      accent:    colors.green[400],
    },
    border: {
      subtle:  'hsla(150, 10%, 50%, 0.08)',
      default: 'hsla(150, 10%, 50%, 0.12)',
      strong:  'hsla(150, 10%, 50%, 0.20)',
      accent:  'hsla(152, 60%, 50%, 0.30)',
    },
    glow: {
      green:   'hsla(152, 60%, 50%, 0.15)',
      greenMd: 'hsla(152, 60%, 50%, 0.08)',
      greenSm: 'hsla(152, 60%, 50%, 0.04)',
    },
  },
  light: {
    bg: {
      primary:   colors.neutral[0],
      secondary: colors.neutral[50],
      tertiary:  colors.neutral[100],
      elevated:  'hsla(0, 0%, 100%, 0.8)',
    },
    fg: {
      primary:   colors.neutral[950],
      secondary: colors.neutral[600],
      muted:     colors.neutral[400],
      accent:    colors.green[600],
    },
    border: {
      subtle:  'hsla(150, 10%, 20%, 0.05)',
      default: 'hsla(150, 10%, 20%, 0.10)',
      strong:  'hsla(150, 10%, 20%, 0.18)',
      accent:  'hsla(155, 65%, 40%, 0.25)',
    },
    glow: {
      green:   'hsla(155, 65%, 40%, 0.12)',
      greenMd: 'hsla(155, 65%, 40%, 0.06)',
      greenSm: 'hsla(155, 65%, 40%, 0.03)',
    },
  },
} as const;

// ─── Fluid Typography Scale (clamp-based) ───
export const typography = {
  fontFamily: {
    display: '"Inter", "SF Pro Display", -apple-system, sans-serif',
    body:    '"Inter", "SF Pro Text", -apple-system, sans-serif',
    mono:    '"JetBrains Mono", "SF Mono", "Fira Code", monospace',
  },
  fontSize: {
    // clamp(min, preferred, max)
    'display-2xl': 'clamp(3.5rem, 8vw + 1rem, 8rem)',     // Hero headline
    'display-xl':  'clamp(2.75rem, 6vw + 0.5rem, 6rem)',   // Section titles
    'display-lg':  'clamp(2rem, 4vw + 0.5rem, 4rem)',
    'display-md':  'clamp(1.5rem, 3vw + 0.25rem, 2.5rem)',
    'heading-lg':  'clamp(1.25rem, 2vw + 0.25rem, 2rem)',
    'heading-md':  'clamp(1.125rem, 1.5vw + 0.25rem, 1.5rem)',
    'body-lg':     'clamp(1.0625rem, 1vw + 0.25rem, 1.25rem)',
    'body-md':     '1rem',
    'body-sm':     '0.875rem',
    'caption':     '0.75rem',
  },
  lineHeight: {
    tight:   1.1,
    snug:    1.25,
    normal:  1.5,
    relaxed: 1.7,
  },
  letterSpacing: {
    tighter: '-0.04em',
    tight:   '-0.02em',
    normal:  '0em',
    wide:    '0.05em',
    wider:   '0.1em',
  },
} as const;

// ─── Spacing Scale ───
export const spacing = {
  section: {
    paddingY: 'clamp(5rem, 12vh, 10rem)',
    gap:      'clamp(3rem, 8vh, 6rem)',
  },
  container: {
    maxWidth: '80rem',     // 1280px
    paddingX: 'clamp(1.5rem, 5vw, 4rem)',
  },
  card: {
    padding:  'clamp(1.5rem, 3vw, 2.5rem)',
    radius:   '1.25rem',
    radiusSm: '0.75rem',
  },
} as const;

// ─── Depth/Elevation System ───
export const elevation = {
  sm:  '0 1px 2px hsla(0,0%,0%,0.05), 0 1px 3px hsla(0,0%,0%,0.1)',
  md:  '0 4px 6px hsla(0,0%,0%,0.05), 0 10px 15px hsla(0,0%,0%,0.1)',
  lg:  '0 10px 25px hsla(0,0%,0%,0.07), 0 20px 48px hsla(0,0%,0%,0.1)',
  xl:  '0 20px 50px hsla(0,0%,0%,0.1), 0 40px 80px hsla(0,0%,0%,0.15)',
  glow: '0 0 30px hsla(152, 60%, 50%, 0.2), 0 0 60px hsla(152, 60%, 50%, 0.1)',
} as const;

// ─── Timing/Easing ───
export const motion = {
  duration: {
    instant: 0.1,
    fast:    0.2,
    normal:  0.4,
    slow:    0.6,
    slower:  0.8,
    cinematic: 1.2,
  },
  easing: {
    // Custom cubic-bezier for premium feel
    smooth:    [0.25, 0.1, 0.25, 1.0],
    snappy:    [0.16, 1, 0.3, 1],
    dramatic:  [0.77, 0, 0.175, 1],
    bounce:    [0.34, 1.56, 0.64, 1],
    decelerate:[0, 0, 0.2, 1],
    accelerate:[0.4, 0, 1, 1],
  },
} as const;

// ─── Z-Index Scale ───
export const zIndex = {
  base:      0,
  above:     10,
  sticky:    100,
  overlay:   200,
  modal:     300,
  toast:     400,
  cursor:    500,
  preloader: 9999,
} as const;

export type ThemeMode = 'dark' | 'light';
export type ThemeTokens = typeof theme.dark;