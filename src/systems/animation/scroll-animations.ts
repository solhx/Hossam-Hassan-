// src/systems/animation/scroll-animations.ts
'use client';

import { gsap, ScrollTrigger } from './gsap-config';
import { gsapEase, duration, stagger } from './easing';

/**
 * Pre-built scroll animation patterns that can be applied to any section.
 * These use ScrollTrigger and return cleanup functions.
 */

export type ScrollAnimationOptions = {
  trigger: Element | string;
  start?: string;
  end?: string;
  markers?: boolean;
};

/**
 * Reveal children of a container as they scroll into view
 * Usage: applyStaggerReveal('.my-section', '.my-section .card')
 */
export function applyStaggerReveal(
  trigger: string | Element,
  children: string | Element | Element[],
  options?: {
    y?: number;
    stagger?: number;
    start?: string;
    duration?: number;
  }
) {
  const {
    y = 60,
    stagger: stag = stagger.normal,
    start = 'top 80%',
    duration: dur = duration.medium,
  } = options || {};

  const ctx = gsap.context(() => {
    gsap.from(children, {
      y,
      opacity: 0,
      duration: dur,
      stagger: stag,
      ease: gsapEase.smooth,
      scrollTrigger: {
        trigger,
        start,
        toggleActions: 'play none none none',
      },
    });
  });

  return () => ctx.revert();
}

/**
 * Section heading reveal with text split
 * Animates overline → title → description in sequence
 */
export function applySectionHeadingReveal(
  containerSelector: string,
  options?: {
    overlineSelector?: string;
    titleSelector?: string;
    descriptionSelector?: string;
  }
) {
  const {
    overlineSelector = '.section-overline',
    titleSelector = '.section-title',
    descriptionSelector = '.section-description',
  } = options || {};

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerSelector,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    // Overline slides in
    tl.from(`${containerSelector} ${overlineSelector}`, {
      x: -30,
      opacity: 0,
      duration: duration.normal,
      ease: gsapEase.smooth,
    });

    // Title reveals
    tl.from(
      `${containerSelector} ${titleSelector}`,
      {
        y: 80,
        opacity: 0,
        duration: duration.slow,
        ease: gsapEase.cinematic,
      },
      '-=0.3'
    );

    // Description fades in
    tl.from(
      `${containerSelector} ${descriptionSelector}`,
      {
        y: 30,
        opacity: 0,
        duration: duration.normal,
        ease: gsapEase.smooth,
      },
      '-=0.4'
    );
  });

  return () => ctx.revert();
}

/**
 * Pinned section that reveals content as you scroll through it
 * Creates a "sticky section" effect
 */
export function applyPinnedReveal(
  sectionSelector: string,
  contentSteps: string[], // Array of selectors to reveal in sequence
  options?: {
    pinSpacing?: boolean;
    scrub?: boolean | number;
  }
) {
  const { pinSpacing = true, scrub = true } = options || {};

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionSelector,
        start: 'top top',
        end: `+=${contentSteps.length * 100}%`,
        pin: true,
        pinSpacing,
        scrub: scrub === true ? 1 : scrub,
        anticipatePin: 1,
      },
    });

    contentSteps.forEach((step, i) => {
      tl.from(step, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: gsapEase.smooth,
      });
      
      if (i < contentSteps.length - 1) {
        tl.to(step, {
          opacity: 0,
          y: -50,
          duration: 0.5,
          ease: gsapEase.smooth,
        }, '+=0.5');
      }
    });
  });

  return () => ctx.revert();
}

/**
 * Image parallax on scroll
 */
export function applyImageParallax(
  imageSelector: string,
  containerSelector?: string,
  speed: number = 20
) {
  const ctx = gsap.context(() => {
    gsap.to(imageSelector, {
      yPercent: speed,
      ease: 'none',
      scrollTrigger: {
        trigger: containerSelector || imageSelector,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  return () => ctx.revert();
}