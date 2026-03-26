// src/components/sections/home/journey-section.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger, gsapEase, duration as dur } from '@/systems/animation';
import { SectionHeading } from '@/components/ui/section-heading';
import { useReducedMotion } from '@/hooks';

interface TimelineEntry {
  year: string;
  title: string;
  company: string;
  description: string;
  highlights: string[];
}

const timeline: TimelineEntry[] = [
  {
    year: '2024',
    title: 'Full-Stack Developer',
    company: 'Freelance & Projects',
    description:
      'Building production applications for clients and personal projects with the full MEARN stack.',
    highlights: [
      'Led development of HossRoute — a real-time routing platform',
      'Built Shop Hub e-commerce from scratch to deployment',
      'Contributed to open-source projects',
    ],
  },
  {
    year: '2023',
    title: 'Frontend Developer',
    company: 'Freelance',
    description:
      'Specialized in React/Next.js frontend development with focus on performance and animation.',
    highlights: [
      'Developed E-Learning platform with complex state management',
      'Created Runnet — a social fitness tracking application',
      'Mastered GSAP and Framer Motion animation systems',
    ],
  },
  {
    year: '2022',
    title: 'Junior Developer',
    company: 'Self-Taught & Bootcamps',
    description:
      'Deep-diving into web fundamentals and building foundational projects.',
    highlights: [
      'Completed full MEARN stack curriculum',
      'Built first portfolio and client projects',
      'Learned TypeScript, testing, and DevOps basics',
    ],
  },
];

export function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Timeline center line grows from top to bottom
      gsap.fromTo(
        '.timeline-line-progress',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          },
        }
      );

      // Each timeline entry animates in
      const entries = gsap.utils.toArray<HTMLElement>('.timeline-entry');

      entries.forEach((entry, i) => {
        const isLeft = i % 2 === 0;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: entry,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });

        // Dot pulse
        tl.from(entry.querySelector('.timeline-dot'), {
          scale: 0,
          duration: 0.5,
          ease: 'back.out(2)',
        });

        // Card slides in from side
        tl.from(
          entry.querySelector('.timeline-card'),
          {
            x: isLeft ? -60 : 60,
            opacity: 0,
            duration: dur.medium,
            ease: gsapEase.smooth,
          },
          '-=0.3'
        );

        // Year label
        tl.from(
          entry.querySelector('.timeline-year'),
          {
            opacity: 0,
            y: 20,
            duration: dur.normal,
            ease: gsapEase.smooth,
          },
          '-=0.4'
        );

        // Highlights stagger
        tl.from(
          entry.querySelectorAll('.timeline-highlight'),
          {
            x: 20,
            opacity: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: gsapEase.smooth,
          },
          '-=0.2'
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} id="journey" className="section-padding relative">
      <div className="container-main">
        <SectionHeading
          overline="// 04 — Journey"
          title="Where I've Been"
          description="A timeline of growth, learning, and building."
          align="center"
        />

        {/* Timeline */}
        <div className="timeline-container relative mx-auto mt-20 max-w-5xl">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block">
            {/* Background line */}
            <div
              className="h-full w-full"
              style={{ backgroundColor: 'var(--color-border)' }}
            />
            {/* Animated progress line */}
            <div
              className="timeline-line-progress absolute left-0 top-0 h-full w-full origin-top"
              style={{
                backgroundColor: 'var(--color-accent)',
                transform: 'scaleY(0)',
              }}
            />
          </div>

          {/* Mobile line (left side) */}
          <div className="absolute left-6 top-0 h-full w-px md:hidden">
            <div className="h-full w-full" style={{ backgroundColor: 'var(--color-border)' }} />
            <div
              className="timeline-line-progress absolute left-0 top-0 h-full w-full origin-top"
              style={{ backgroundColor: 'var(--color-accent)', transform: 'scaleY(0)' }}
            />
          </div>

          {/* Entries */}
          <div className="space-y-16 md:space-y-24">
            {timeline.map((entry, i) => {
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={entry.year}
                  className="timeline-entry relative"
                >
                  {/* Dot */}
                  <div
                    className={`timeline-dot absolute top-8 z-10 hidden h-4 w-4 rounded-full md:block ${
                      isLeft ? 'left-1/2 -translate-x-1/2' : 'left-1/2 -translate-x-1/2'
                    }`}
                    style={{
                      backgroundColor: 'var(--color-accent)',
                      boxShadow: '0 0 20px rgba(var(--color-accent-rgb), 0.4)',
                    }}
                  />

                  {/* Mobile dot */}
                  <div
                    className="timeline-dot absolute left-6 top-8 z-10 h-3 w-3 -translate-x-1/2 rounded-full md:hidden"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  />

                  {/* Card */}
                  <div
                    className={`timeline-card ml-12 md:ml-0 ${
                      isLeft
                        ? 'md:mr-[calc(50%+2rem)] md:text-right'
                        : 'md:ml-[calc(50%+2rem)]'
                    }`}
                  >
                    {/* Year */}
                    <span
                      className="timeline-year mb-3 inline-block font-mono text-sm font-bold"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      {entry.year}
                    </span>

                    <div className="glass rounded-2xl p-6 md:p-8">
                      <h3
                        className="mb-1 text-xl font-bold md:text-2xl"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {entry.title}
                      </h3>

                      <p
                        className="mb-4 text-sm font-medium"
                        style={{ color: 'var(--color-text-tertiary)' }}
                      >
                        {entry.company}
                      </p>

                      <p
                        className="mb-4 text-base leading-relaxed"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {entry.description}
                      </p>

                      {/* Highlights */}
                      <ul className={`space-y-2 ${isLeft ? 'md:text-right' : ''}`}>
                        {entry.highlights.map((highlight, j) => (
                          <li
                            key={j}
                            className={`timeline-highlight flex items-start gap-2 text-sm ${
                              isLeft ? 'md:flex-row-reverse' : ''
                            }`}
                            style={{ color: 'var(--color-text-secondary)' }}
                          >
                            <span
                              className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                              style={{ backgroundColor: 'var(--color-accent)' }}
                            />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}