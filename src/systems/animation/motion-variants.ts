// src/systems/animation/motion-variants.ts

import { Variants, Transition } from 'framer-motion';
import { motionEase, duration } from './easing';

/**
 * Framer Motion variants for micro-interactions and layout animations.
 * GSAP handles complex scroll-linked animations.
 * Framer Motion handles: hover states, layout transitions, presence animations.
 */

// ─── TRANSITION PRESETS ───────────────────────────

export const transitions = {
  smooth: {
    duration: duration.normal,
    ease: motionEase.smooth,
  } satisfies Transition,
  
  snappy: {
    duration: duration.fast,
    ease: motionEase.snappy,
  } satisfies Transition,
  
  spring: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
  } satisfies Transition,
  
  springBouncy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 25,
  } satisfies Transition,
  
  springGentle: {
    type: 'spring' as const,
    stiffness: 150,
    damping: 20,
  } satisfies Transition,
} as const;

// ─── FADE VARIANTS ────────────────────────────────

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.smooth,
  },
  exit: {
    opacity: 0,
    transition: { duration: duration.fast },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
};

// ─── STAGGER CONTAINERS ───────────────────────────

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};

// ─── SCALE VARIANTS ───────────────────────────────

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.spring,
  },
};

export const scaleInBouncy: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.springBouncy,
  },
};

// ─── INTERACTIVE STATES ───────────────────────────

export const buttonHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: transitions.spring,
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
};

export const cardHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  },
  hover: {
    scale: 1.02,
    y: -8,
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.12)',
    transition: transitions.spring,
  },
};

export const linkHover: Variants = {
  rest: { width: '0%' },
  hover: {
    width: '100%',
    transition: {
      duration: duration.fast,
      ease: motionEase.snappy,
    },
  },
};

// ─── PAGE TRANSITIONS ─────────────────────────────

export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: duration.medium,
      ease: motionEase.smooth,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(10px)',
    transition: {
      duration: duration.fast,
    },
  },
};

// ─── NAVIGATION ───────────────────────────────────

export const navSlideDown: Variants = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 30,
      delay: 2.5, // After hero animation
    },
  },
};

export const navItemStagger: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 2.7 + i * 0.1,
      duration: 0.5,
      ease: motionEase.smooth,
    },
  }),
};

// ─── CURSOR VARIANTS ──────────────────────────────

export const cursorVariants = {
  default: {
    width: 16,
    height: 16,
    backgroundColor: 'var(--color-accent)',
    mixBlendMode: 'difference' as const,
  },
  hover: {
    width: 60,
    height: 60,
    backgroundColor: 'var(--color-accent)',
    mixBlendMode: 'difference' as const,
  },
  text: {
    width: 120,
    height: 120,
    backgroundColor: 'transparent',
    border: '1px solid var(--color-accent)',
    mixBlendMode: 'normal' as const,
  },
  hidden: {
    width: 0,
    height: 0,
    opacity: 0,
  },
};