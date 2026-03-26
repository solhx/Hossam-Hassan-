// src/systems/animation/timeline-builders.ts
'use client';

import { gsap } from './gsap-config';
import { gsapEase, duration, stagger } from './easing';

/**
 * Reusable GSAP timeline factories for consistent animation patterns.
 * Every builder returns a GSAP Timeline that can be composed into larger sequences.
 */

// ─── TEXT ANIMATIONS ───────────────────────────────

/**
 * Split text reveal — characters animate up from below with stagger
 * Best for: Headlines, hero text, section titles
 */
export function createTextRevealTimeline(
  elements: Element | Element[] | NodeListOf<Element>,
  options?: {
    duration?: number;
    stagger?: number;
    y?: number;
    delay?: number;
    ease?: string;
  }
) {
  const {
    duration: dur = duration.medium,
    stagger: stag = stagger.text.chars,
    y = 120,
    delay = 0,
    ease = gsapEase.textReveal,
  } = options || {};

  const tl = gsap.timeline({ delay });

  tl.from(elements, {
    y,
    opacity: 0,
    rotateX: -40,
    duration: dur,
    stagger: stag,
    ease,
    transformOrigin: '0% 50% -50',
  });

  return tl;
}

/**
 * Word-by-word stagger reveal
 * Best for: Paragraphs, descriptions, manifesto text
 */
export function createWordStaggerTimeline(
  words: Element[],
  options?: {
    duration?: number;
    stagger?: number;
    y?: number;
  }
) {
  const { duration: dur = 0.6, stagger: stag = 0.06, y = 40 } = options || {};

  const tl = gsap.timeline();

  tl.from(words, {
    y,
    opacity: 0,
    duration: dur,
    stagger: stag,
    ease: gsapEase.smooth,
  });

  return tl;
}

/**
 * Line-by-line reveal with mask clip
 * Best for: Body text, elegant section descriptions
 */
export function createLineRevealTimeline(
  lines: Element[],
  options?: { stagger?: number }
) {
  const { stagger: stag = stagger.text.lines } = options || {};

  const tl = gsap.timeline();

  tl.from(lines, {
    yPercent: 100,
    opacity: 0,
    duration: duration.slow,
    stagger: stag,
    ease: gsapEase.cinematic,
  });

  return tl;
}

// ─── ELEMENT ANIMATIONS ───────────────────────────

/**
 * Fade + slide up reveal
 * Best for: Cards, images, generic content blocks
 */
export function createRevealTimeline(
  elements: Element | Element[] | NodeListOf<Element>,
  options?: {
    y?: number;
    duration?: number;
    stagger?: number;
    delay?: number;
    scale?: number;
  }
) {
  const {
    y = 60,
    duration: dur = duration.medium,
    stagger: stag = stagger.normal,
    delay = 0,
    scale = 1,
  } = options || {};

  const tl = gsap.timeline({ delay });

  tl.from(elements, {
    y,
    opacity: 0,
    scale,
    duration: dur,
    stagger: stag,
    ease: gsapEase.smooth,
  });

  return tl;
}

/**
 * Scale + blur entrance
 * Best for: Images, featured elements, hero backgrounds
 */
export function createScaleBlurTimeline(
  element: Element | string,
  options?: {
    scale?: number;
    blur?: number;
    duration?: number;
  }
) {
  const {
    scale = 0.9,
    blur = 20,
    duration: dur = duration.slower,
  } = options || {};

  const tl = gsap.timeline();

  tl.from(element, {
    scale,
    filter: `blur(${blur}px)`,
    opacity: 0,
    duration: dur,
    ease: gsapEase.cinematic,
  });

  return tl;
}

/**
 * Clip-path reveal (wipe effect)
 * Best for: Images, sections, dramatic reveals
 */
export function createClipRevealTimeline(
  element: Element | string,
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  options?: { duration?: number }
) {
  const { duration: dur = duration.slower } = options || {};

  const clipPaths = {
    up: {
      from: 'inset(100% 0% 0% 0%)',
      to: 'inset(0% 0% 0% 0%)',
    },
    down: {
      from: 'inset(0% 0% 100% 0%)',
      to: 'inset(0% 0% 0% 0%)',
    },
    left: {
      from: 'inset(0% 100% 0% 0%)',
      to: 'inset(0% 0% 0% 0%)',
    },
    right: {
      from: 'inset(0% 0% 0% 100%)',
      to: 'inset(0% 0% 0% 0%)',
    },
  };

  const tl = gsap.timeline();

  tl.fromTo(
    element,
    { clipPath: clipPaths[direction].from },
    {
      clipPath: clipPaths[direction].to,
      duration: dur,
      ease: gsapEase.cinematic,
    }
  );

  return tl;
}

/**
 * Counter / number ticker animation
 * Best for: Stats, impact numbers
 */
export function createCounterTimeline(
  element: Element,
  endValue: number,
  options?: {
    duration?: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
  }
) {
  const {
    duration: dur = duration.cinematic,
    prefix = '',
    suffix = '',
    decimals = 0,
  } = options || {};

  const obj = { val: 0 };
  const tl = gsap.timeline();

  tl.to(obj, {
    val: endValue,
    duration: dur,
    ease: gsapEase.power3Out,
    onUpdate() {
      element.textContent = `${prefix}${obj.val.toFixed(decimals)}${suffix}`;
    },
  });

  return tl;
}

// ─── SCROLL-LINKED ANIMATIONS ─────────────────────

/**
 * Parallax effect — element moves at different rate than scroll
 * Best for: Background elements, images, decorative layers
 */
export function createParallaxEffect(
  element: Element | string,
  speed: number = 0.5,
  options?: {
    trigger?: Element | string;
    start?: string;
    end?: string;
  }
) {
  const {
    trigger,
    start = 'top bottom',
    end = 'bottom top',
  } = options || {};

  gsap.to(element, {
    yPercent: speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: trigger || element,
      start,
      end,
      scrub: true,
    },
  });
}

/**
 * Horizontal scroll section — scroll vertically, content moves horizontally
 * Best for: Project showcases, image galleries
 */
export function createHorizontalScrollTimeline(
  container: Element | string,
  content: Element | string,
  options?: {
    ease?: string;
    pin?: boolean;
  }
) {
  const { ease = 'none', pin = true } = options || {};

  const contentEl = typeof content === 'string' 
    ? document.querySelector(content) 
    : content;
  
  if (!contentEl) return gsap.timeline();

  const scrollWidth = (contentEl as HTMLElement).scrollWidth - window.innerWidth;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: () => `+=${scrollWidth}`,
      scrub: 1,
      pin,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  tl.to(content, {
    x: -scrollWidth,
    ease,
  });

  return tl;
}

/**
 * Progress-based opacity reveal
 * Best for: Background elements that fade based on scroll position
 */
export function createScrollFadeTimeline(
  element: Element | string,
  options?: {
    trigger?: Element | string;
    start?: string;
    end?: string;
    fromOpacity?: number;
    toOpacity?: number;
  }
) {
  const {
    trigger,
    start = 'top center',
    end = 'center center',
    fromOpacity = 0,
    toOpacity = 1,
  } = options || {};

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: trigger || element,
      start,
      end,
      scrub: true,
    },
  });

  tl.fromTo(element, { opacity: fromOpacity }, { opacity: toOpacity });

  return tl;
}