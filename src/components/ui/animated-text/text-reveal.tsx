// src/components/ui/animated-text/text-reveal.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger, gsapEase, duration as dur } from '@/systems/animation';
import { useReducedMotion } from '@/hooks';

interface TextRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  /** Scroll scrub — text reveals word by word as you scroll */
  scrub?: boolean;
}

/**
 * Paragraph-level text reveal that highlights words as you scroll through.
 * Each word starts muted and lights up when the scroll reaches it.
 */
export function TextReveal({
  children,
  as: Tag = 'p',
  className = '',
  scrub = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    const el = containerRef.current;
    const words = children.split(/\s+/);
    el.innerHTML = '';

    const spans: HTMLSpanElement[] = [];

    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.textContent = word;
      span.style.display = 'inline-block';
      span.style.marginRight = '0.3em';
      span.style.opacity = '0.15';
      span.style.transition = 'none';
      el.appendChild(span);
      spans.push(span);
    });

    const ctx = gsap.context(() => {
      if (scrub) {
        gsap.to(spans, {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: 1,
          },
        });
      } else {
        gsap.to(spans, {
          opacity: 1,
          stagger: 0.03,
          duration: dur.normal,
          ease: gsapEase.smooth,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [children, scrub, prefersReducedMotion]);

  return React.createElement(Tag, {
    ref: containerRef,
    className,
    children,
  });
}