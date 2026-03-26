// src/components/sections/home/impact-section.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { gsap, gsapEase, duration as dur, createCounterTimeline } from '@/systems/animation';
import { SectionHeading } from '@/components/ui/section-heading';
import { useReducedMotion } from '@/hooks';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: Stat[] = [
  {
    value: 3,
    suffix: '+',
    label: 'Years Experience',
    description: 'Building production web applications',
  },
  {
    value: 20,
    suffix: '+',
    label: 'Projects Delivered',
    description: 'From concept to deployment',
  },
  {
    value: 15,
    suffix: '+',
    label: 'Technologies',
    description: 'Across the full stack',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Dedication',
    description: 'To writing clean, maintainable code',
  },
];

export function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Background number that moves on scroll
      gsap.to('.impact-bg-number', {
        xPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Stat cards stagger in
      const statCards = gsap.utils.toArray<HTMLElement>('.stat-card');

      gsap.from(statCards, {
        y: 60,
        opacity: 0,
        duration: dur.medium,
        stagger: 0.12,
        ease: gsapEase.smooth,
        scrollTrigger: {
          trigger: '.stats-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
          onEnter: () => {
            if (hasAnimated.current) return;
            hasAnimated.current = true;

            // Trigger counter animations
            statCards.forEach((card, i) => {
              const numberEl = card.querySelector('.stat-number');
              if (!numberEl) return;

              const stat = stats[i];
              const obj = { val: 0 };

              gsap.to(obj, {
                val: stat.value,
                duration: dur.cinematic,
                delay: i * 0.15,
                ease: 'power2.out',
                onUpdate() {
                  numberEl.textContent = `${Math.round(obj.val)}${stat.suffix}`;
                },
              });
            });
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} id="impact" className="section-padding relative overflow-hidden">
      {/* Massive background number */}
      <div
        className="impact-bg-number pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap font-bold leading-none opacity-[0.02]"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(20rem, 40vw, 50rem)',
        }}
      >
        20+
      </div>

      <div className="container-main relative z-10">
        <SectionHeading
          overline="// 05 — Impact"
          title="By the Numbers"
          align="center"
        />

        {/* Stats grid */}
        <div className="stats-grid mx-auto mt-16 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-card group text-center"
            >
              <div className="glass rounded-2xl p-8 transition-all duration-500 hover:shadow-lg">
                {/* Number */}
                <span
                  className="stat-number mb-3 block text-5xl font-bold tabular-nums md:text-6xl"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--color-accent)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  0{stat.suffix}
                </span>

                {/* Label */}
                <h3
                  className="mb-2 text-lg font-semibold"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {stat.label}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}