// src/systems/animation/gsap-config.ts
// ─── Centralized GSAP Configuration ───

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Default GSAP Settings ───
gsap.defaults({
  ease: 'power3.out',
  duration: 0.8,
});

// Custom ease registry
export const gsapEasings = {
  smooth:    'power2.inOut',
  snappy:    'power3.out',
  dramatic:  'power4.inOut',
  elastic:   'elastic.out(1, 0.5)',
  bounce:    'back.out(1.7)',
  cinematic: 'expo.inOut',
} as const;

// ─── Reusable GSAP Animation Factories ───

/** Create scroll-triggered fade-up animation */
export function createScrollFadeUp(
  element: string | Element,
  options?: {
    y?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
    trigger?: string | Element;
  }
) {
  const {
    y = 60,
    duration = 0.8,
    delay = 0,
    stagger = 0.1,
    trigger,
  } = options ?? {};

  return gsap.from(element, {
    y,
    opacity: 0,
    duration,
    delay,
    stagger,
    ease: gsapEasings.snappy,
    scrollTrigger: {
      trigger: trigger ?? element,
      start: 'top 85%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
    },
  });
}

/** Create horizontal scroll-triggered reveal */
export function createScrollRevealX(
  element: string | Element,
  direction: 'left' | 'right' = 'left',
  options?: {
    distance?: number;
    duration?: number;
    trigger?: string | Element;
  }
) {
  const {
    distance = 80,
    duration = 1,
    trigger,
  } = options ?? {};

  const x = direction === 'left' ? -distance : distance;

  return gsap.from(element, {
    x,
    opacity: 0,
    duration,
    ease: gsapEasings.dramatic,
    scrollTrigger: {
      trigger: trigger ?? element,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });
}

/** Create parallax scroll effect (GPU-friendly transform only) */
export function createParallax(
  element: string | Element,
  speed: number = 0.5,
  trigger?: string | Element,
) {
  return gsap.to(element, {
    yPercent: speed * 30,
    ease: 'none',
    scrollTrigger: {
      trigger: trigger ?? element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1, // Smooth scrub
    },
  });
}

/** Create text split/reveal animation */
export function createTextReveal(
  element: string | Element,
  options?: {
    duration?: number;
    stagger?: number;
    trigger?: string | Element;
  }
) {
  const { duration = 0.8, stagger = 0.03, trigger } = options ?? {};

  return gsap.from(element, {
    yPercent: 110,
    opacity: 0,
    duration,
    stagger,
    ease: gsapEasings.cinematic,
    scrollTrigger: {
      trigger: trigger ?? element,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });
}

/** Batch cleanup for all ScrollTriggers in a scope */
export function cleanupScrollTriggers(scope?: string | Element) {
  ScrollTrigger.getAll()
    .filter(st => !scope || st.vars.trigger === scope)
    .forEach(st => st.kill());
}

export { gsap, ScrollTrigger };