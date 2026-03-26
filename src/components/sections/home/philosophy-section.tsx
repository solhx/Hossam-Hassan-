// src/components/sections/home/philosophy-section.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger, gsapEase, duration as dur } from '@/systems/animation';
import { TextReveal } from '@/components/ui/animated-text/text-reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { ImageReveal } from '@/components/ui/image-reveal';
import { useReducedMotion } from '@/hooks';

const philosophyText = `I believe great software is invisible. It doesn't make users think about technology — it makes them think about what they're trying to accomplish. Every line of code I write serves the user experience first, performance second, and aesthetics always.`;

const values = [
  {
    number: '01',
    title: 'User-First',
    description:
      'Every decision starts with the user. Performance, accessibility, and delight are non-negotiable.',
  },
  {
    number: '02',
    title: 'Craft-Driven',
    description:
      'I obsess over details — pixel-perfect layouts, smooth 60fps animations, clean architecture.',
  },
  {
    number: '03',
    title: 'Always Learning',
    description:
      'The web evolves daily. I stay ahead by building, experimenting, and contributing to the community.',
  },
];

export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Horizontal scrolling marquee in background
      gsap.to('.philosophy-marquee', {
        xPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Value cards stagger reveal
      gsap.from('.value-card', {
        y: 80,
        opacity: 0,
        duration: dur.medium,
        stagger: 0.15,
        ease: gsapEase.smooth,
        scrollTrigger: {
          trigger: '.values-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Separator line grows
      gsap.from('.philosophy-separator', {
        scaleX: 0,
        duration: dur.slower,
        ease: gsapEase.cinematic,
        transformOrigin: 'left center',
        scrollTrigger: {
          trigger: '.philosophy-separator',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="section-padding relative overflow-hidden"
    >
      {/* Background marquee text */}
      <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap opacity-[0.03]">
        <span
          className="philosophy-marquee inline-block text-[20vw] font-bold uppercase tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Philosophy — Craft — Impact — Philosophy — Craft — Impact —
        </span>
      </div>

      <div className="container-main relative z-10">
        <SectionHeading
          overline="// 01 — Philosophy"
          title="What I Believe"
        />

        {/* Big manifesto text with scroll-driven word reveal */}
        <div className="mb-24 max-w-4xl">
          <TextReveal
            as="p"
            className="text-display-md font-light leading-[1.15]"
            scrub
          >
            {philosophyText}
          </TextReveal>
        </div>

        {/* Separator */}
        <div
          className="philosophy-separator mb-24 h-px w-full"
          style={{ backgroundColor: 'var(--color-border)' }}
        />

        {/* Values grid */}
        <div className="values-grid grid gap-8 md:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.number}
              className="value-card group relative"
            >
              {/* Number */}
              <span
                className="mb-4 block font-mono text-sm"
                style={{ color: 'var(--color-accent)' }}
              >
                {value.number}
              </span>

              {/* Title */}
              <h3
                className="mb-3 text-2xl font-semibold"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {value.title}
              </h3>

              {/* Separator */}
              <div
                className="mb-4 h-px w-12 transition-all duration-500 group-hover:w-full"
                style={{ backgroundColor: 'var(--color-accent)' }}
              />

              {/* Description */}
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}