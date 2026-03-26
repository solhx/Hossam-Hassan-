// src/systems/animation/easing.ts

/**
 * Easing presets for consistent motion language across the portfolio.
 * 
 * MOTION LANGUAGE:
 * - "smooth"    → Default for most animations (content reveals, transitions)
 * - "snappy"    → Quick feedback (hovers, micro-interactions)
 * - "cinematic" → Dramatic reveals (hero, section entrances)
 * - "elastic"   → Playful feedback (buttons, toggles)
 */

// GSAP ease strings
export const gsapEase = {
  // Primary motion
  smooth: 'smooth',                    // CustomEase registered above
  snappy: 'snappy',
  cinematic: 'cinematic',
  
  // Built-in GSAP eases
  power2Out: 'power2.out',
  power3Out: 'power3.out',
  power3InOut: 'power3.inOut',
  power4Out: 'power4.out',
  expoOut: 'expo.out',
  expoInOut: 'expo.inOut',
  backOut: 'back.out(1.7)',
  elasticOut: 'elastic.out(1, 0.3)',
  
  // Specialized
  textReveal: 'power4.out',
  sectionEntry: 'cinematic',
  hover: 'power2.out',
  magnetic: 'power3.out',
} as const;

// Framer Motion ease arrays (cubic-bezier)
export const motionEase = {
  smooth: [0.23, 1, 0.32, 1] as const,
  snappy: [0.16, 1, 0.3, 1] as const,
  cinematic: [0.77, 0, 0.175, 1] as const,
  elastic: [0.34, 1.56, 0.64, 1] as const,
  
  // Standard
  easeOut: [0, 0, 0.2, 1] as const,
  easeInOut: [0.4, 0, 0.2, 1] as const,
  easeIn: [0.4, 0, 1, 1] as const,
} as const;

// Duration presets (seconds)
export const duration = {
  instant: 0.1,
  fast: 0.3,
  normal: 0.6,
  medium: 0.8,
  slow: 1.0,
  slower: 1.5,
  cinematic: 2.0,
  hero: 2.5,
} as const;

// Stagger presets (seconds)
export const stagger = {
  fast: 0.03,
  normal: 0.05,
  slow: 0.08,
  text: {
    chars: 0.02,
    words: 0.06,
    lines: 0.12,
  },
} as const;