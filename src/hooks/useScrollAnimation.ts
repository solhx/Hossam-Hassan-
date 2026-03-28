'use client';
// src/hooks/useScrollAnimation.ts
// ─── Unified hook for scroll-triggered GSAP animations ───


import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, cleanupScrollTriggers } from '@/systems/animation/gsap-config';

type AnimationType = 'fadeUp' | 'fadeDown' | 'slideLeft' | 'slideRight' | 'scale' | 'parallax';

interface UseScrollAnimationOptions {
  type?: AnimationType;
  duration?: number;
  delay?: number;
  stagger?: number;
  distance?: number;
  scrub?: boolean | number;
  start?: string;
  end?: string;
  once?: boolean;
  children?: boolean; // Animate children instead of element itself
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null);

  const {
    type = 'fadeUp',
    duration = 0.8,
    delay = 0,
    stagger = 0.1,
    distance = 60,
    scrub = false,
    start = 'top 85%',
    end = 'bottom 20%',
    once = true,
    children = false,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // ─── Handle parallax separately (uses gsap.to, not gsap.from) ───
    if (type === 'parallax') {
      gsap.to(el, {
        yPercent: distance,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: typeof scrub === 'number' ? scrub : 1,
        },
      });

      return () => {
        cleanupScrollTriggers(el);
      };
    }

    // ─── All other animation types (use gsap.from) ───
    const target = children ? el.children : el;
    const toggleActions = once ? 'play none none none' : 'play none none reverse';

    const fromVars: gsap.TweenVars = {
      duration,
      delay,
      stagger,
      opacity: 0,
      ease: 'power3.out',
    };

    switch (type) {
      case 'fadeUp':
        fromVars.y = distance;
        break;

      case 'fadeDown':
        fromVars.y = -distance;
        break;

      case 'slideLeft':
        fromVars.x = -distance;
        fromVars.ease = 'power4.inOut';
        break;

      case 'slideRight':
        fromVars.x = distance;
        fromVars.ease = 'power4.inOut';
        break;

      case 'scale':
        fromVars.scale = 0.85;
        fromVars.ease = 'back.out(1.7)';
        break;
    }

    fromVars.scrollTrigger = {
      trigger: el,
      start,
      end,
      toggleActions,
      ...(scrub && { scrub: typeof scrub === 'number' ? scrub : 1 }),
    };

    gsap.from(target, fromVars);

    return () => {
      cleanupScrollTriggers(el);
    };
  }, [type, duration, delay, stagger, distance, scrub, start, end, once, children]);

  return ref;
}