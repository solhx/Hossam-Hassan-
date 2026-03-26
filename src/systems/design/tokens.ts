// src/systems/design/tokens.ts

export const tokens = {
  colors: {
    // Base palette — works for both themes
    primary: {
      50: '#f0f4ff',
      100: '#dbe4ff',
      200: '#bac8ff',
      300: '#91a7ff',
      400: '#748ffc',
      500: '#5c7cfa',  // Primary accent
      600: '#4c6ef5',
      700: '#4263eb',
      800: '#3b5bdb',
      900: '#364fc7',
    },
    neutral: {
      0: '#ffffff',
      50: '#f8f9fa',
      100: '#f1f3f5',
      200: '#e9ecef',
      300: '#dee2e6',
      400: '#ced4da',
      500: '#adb5bd',
      600: '#868e96',
      700: '#495057',
      800: '#343a40',
      900: '#212529',
      950: '#0a0a0b',
      1000: '#000000',
    },
    // Semantic
    surface: {
      light: 'rgba(255, 255, 255, 0.7)',
      dark: 'rgba(10, 10, 11, 0.8)',
    },
    glass: {
      light: 'rgba(255, 255, 255, 0.1)',
      dark: 'rgba(255, 255, 255, 0.05)',
      border: {
        light: 'rgba(255, 255, 255, 0.2)',
        dark: 'rgba(255, 255, 255, 0.08)',
      },
    },
    gradient: {
      hero: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      accent: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      subtle: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
    },
  },

  typography: {
    // Font families
    fontFamily: {
      display: '"Satoshi", "Inter", system-ui, sans-serif',
      body: '"Inter", system-ui, sans-serif',
      mono: '"JetBrains Mono", "Fira Code", monospace',
    },
    // Fluid type scale (clamp-based)
    fontSize: {
      'display-xl': 'clamp(3.5rem, 8vw + 1rem, 10rem)',    // Hero name
      'display-lg': 'clamp(2.5rem, 5vw + 1rem, 7rem)',      // Section titles
      'display-md': 'clamp(2rem, 3vw + 0.5rem, 4.5rem)',    // Sub-headlines
      'display-sm': 'clamp(1.5rem, 2vw + 0.5rem, 2.5rem)',  // Card titles
      'heading': 'clamp(1.25rem, 1.5vw + 0.5rem, 1.75rem)', // H3
      'body-lg': '1.25rem',                                    // Large body
      'body': '1rem',                                           // Default body
      'body-sm': '0.875rem',                                    // Small text
      'caption': '0.75rem',                                     // Captions
      'overline': '0.6875rem',                                  // Overlines
    },
    // Line heights
    lineHeight: {
      display: '0.95',   // Tight for display type
      heading: '1.1',
      body: '1.6',
    },
    // Letter spacing
    letterSpacing: {
      tight: '-0.03em',
      normal: '0',
      wide: '0.05em',
      wider: '0.1em',
      widest: '0.2em',
    },
  },

  spacing: {
    section: {
      vertical: 'clamp(6rem, 15vh, 12rem)',    // Between sections
      horizontal: 'clamp(1.5rem, 5vw, 6rem)',  // Page padding
    },
    container: {
      max: '1440px',
      content: '1200px',
      narrow: '800px',
    },
  },

  animation: {
    duration: {
      instant: 0.1,
      fast: 0.3,
      normal: 0.6,
      slow: 1.0,
      slower: 1.5,
      cinematic: 2.0,
    },
    stagger: {
      fast: 0.03,
      normal: 0.05,
      slow: 0.08,
      text: 0.02,
    },
  },

  effects: {
    blur: {
      glass: '20px',
      heavy: '40px',
      subtle: '8px',
    },
    borderRadius: {
      sm: '8px',
      md: '12px',
      lg: '20px',
      xl: '32px',
      full: '9999px',
    },
    shadow: {
      glass: '0 8px 32px rgba(0, 0, 0, 0.08)',
      elevated: '0 16px 64px rgba(0, 0, 0, 0.12)',
      glow: '0 0 60px rgba(92, 124, 250, 0.15)',
    },
  },
} as const;

export type DesignTokens = typeof tokens;