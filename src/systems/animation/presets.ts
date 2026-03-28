// src/systems/animation/presets.ts
// ─── Unified Motion Preset System ───
// Single source of truth for ALL animations (Framer Motion + GSAP)

import type { Variants, Transition } from 'framer-motion';

// ─── Shared Timing ───
export const timing = {
  instant:   { duration: 0.1 },
  fast:      { duration: 0.2 },
  normal:    { duration: 0.4 },
  slow:      { duration: 0.6 },
  slower:    { duration: 0.8 },
  cinematic: { duration: 1.2 },
} as const;

// ─── Shared Easings ───
export const easings = {
  smooth:     [0.25, 0.1, 0.25, 1.0]   as const,
  snappy:     [0.16, 1, 0.3, 1]        as const,
  dramatic:   [0.77, 0, 0.175, 1]      as const,
  bounce:     [0.34, 1.56, 0.64, 1]    as const,
  decelerate: [0, 0, 0.2, 1]           as const,
  accelerate: [0.4, 0, 1, 1]           as const,
} as const;

// ─── Base Transition Presets ───
export const transitions = {
  smooth: {
    duration: 0.6,
    ease: easings.smooth,
  } satisfies Transition,

  snappy: {
    duration: 0.4,
    ease: easings.snappy,
  } satisfies Transition,

  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
    mass: 0.8,
  } satisfies Transition,

  springBouncy: {
    type: 'spring',
    stiffness: 400,
    damping: 25,
    mass: 0.5,
  } satisfies Transition,

  cinematic: {
    duration: 1.2,
    ease: easings.dramatic,
  } satisfies Transition,
} as const;

// ─── Framer Motion Variant Presets ───

/** Fade in from opacity 0 */
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.smooth,
  },
};

/** Slide up from below + fade */
export const slideUp: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.snappy,
  },
};

/** Slide down from above + fade */
export const slideDown: Variants = {
  hidden:  { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.snappy,
  },
};

/** Slide in from left + fade */
export const slideLeft: Variants = {
  hidden:  { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.snappy,
  },
};

/** Slide in from right + fade */
export const slideRight: Variants = {
  hidden:  { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.snappy,
  },
};

/** Scale up from 0.8 + fade */
export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.springBouncy,
  },
};

/** Blur in effect */
export const blurIn: Variants = {
  hidden:  { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: transitions.smooth,
  },
};

/** Cinematic reveal: clip from bottom */
export const revealUp: Variants = {
  hidden:  { clipPath: 'inset(100% 0% 0% 0%)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: transitions.cinematic,
  },
};

/** Stagger children container */
export const staggerContainer = (
  staggerAmount = 0.1,
  delayChildren = 0
): Variants => ({
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: staggerAmount,
      delayChildren,
    },
  },
});

/** Stagger item (combines with staggerContainer) */
export const staggerItem: Variants = {
  hidden:  { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.snappy,
  },
};

// ─── Hover/Interaction Presets ───

export const hoverScale = {
  scale: 1.05,
  transition: transitions.springBouncy,
};

export const hoverLift = {
  y: -4,
  transition: transitions.spring,
};

export const tapScale = {
  scale: 0.97,
};

// ─── Scroll-Triggered Configuration ───
export const viewportConfig = {
  once: true,
  margin: '-80px',
  amount: 0.2,
} as const;

export const viewportConfigRepeat = {
  once: false,
  margin: '-80px',
  amount: 0.2,
} as const;