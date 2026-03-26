// src/components/sections/home/hero-section.tsx
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap, gsapEase, duration as dur, stagger as stag } from '@/systems/animation';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedButton } from '@/components/ui/animated-button';
import { useReducedMotion, useViewportSize } from '@/hooks';
import { ArrowDown } from 'lucide-react';
import { SceneProvider } from '@/components/three/scene-provider';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isMobile } = useViewportSize();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) {
      setIsReady(true);
      return;
    }

    const ctx = gsap.context(() => {
      const master = gsap.timeline({
        delay: 3, // After preloader
        onComplete: () => setIsReady(true),
      });

      // ── Phase 1: Background ambient ──
      master.from('.hero-bg-gradient', {
        opacity: 0,
        scale: 1.2,
        duration: dur.cinematic,
        ease: gsapEase.cinematic,
      });

      // ── Phase 2: Overline slides in ──
      master.from(
        '.hero-overline',
        {
          x: -40,
          opacity: 0,
          duration: dur.medium,
          ease: gsapEase.smooth,
        },
        '-=1.5'
      );

      // ── Phase 3: Name reveals character by character ──
      master.from(
        '.hero-name .split-char',
        {
          y: 150,
          rotateX: -80,
          opacity: 0,
          duration: dur.slow,
          stagger: stag.text.chars,
          ease: gsapEase.cinematic,
          transformOrigin: '0% 50% -50',
        },
        '-=1'
      );

      // ── Phase 4: Role text fades in ──
      master.from(
        '.hero-role',
        {
          y: 40,
          opacity: 0,
          duration: dur.medium,
          ease: gsapEase.smooth,
        },
        '-=0.5'
      );

      // ── Phase 5: Description paragraph ──
      master.from(
        '.hero-description',
        {
          y: 30,
          opacity: 0,
          duration: dur.normal,
          ease: gsapEase.smooth,
        },
        '-=0.3'
      );

      // ── Phase 6: CTA buttons stagger in ──
      master.from(
        '.hero-cta > *',
        {
          y: 30,
          opacity: 0,
          duration: dur.normal,
          stagger: 0.15,
          ease: gsapEase.smooth,
        },
        '-=0.2'
      );

      // ── Phase 7: Scroll indicator ──
      master.from(
        '.hero-scroll-indicator',
        {
          opacity: 0,
          y: -20,
          duration: dur.normal,
          ease: gsapEase.smooth,
        },
        '-=0.1'
      );

      // ── Scroll parallax on the entire hero ──
      gsap.to('.hero-content', {
        yPercent: 30,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Background parallax (slower)
      gsap.to('.hero-bg-gradient', {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Helper to split name into chars
  const splitName = (name: string) => {
    return name.split('').map((char, i) => (
      <span
        key={i}
        className="split-char inline-block"
        style={{ willChange: 'transform, opacity' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <SceneProvider 
  scene="particles" 
  fallback={
    <div className="hero-bg-gradient absolute inset-0 -z-10">
      {/* Static gradient fallback for mobile/reduced motion */}
      <div
        className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, rgba(var(--color-accent-rgb), 0.4) 0%, transparent 70%)',
        }}
      />
    </div>
  } 
/>
      {/* ── Background ── */}
      <div className="hero-bg-gradient absolute inset-0 -z-10">
        {/* Gradient orbs */}
        <div
          className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
          style={{
            background:
              'radial-gradient(circle, rgba(var(--color-accent-rgb), 0.4) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full opacity-15 blur-[100px]"
          style={{
            background:
              'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)',
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="hero-content container-main relative z-10 w-full py-32">
        <div className="max-w-5xl">
          {/* Overline */}
          <div className="hero-overline mb-6 flex items-center gap-4">
            <div
              className="h-px w-12"
              style={{ backgroundColor: 'var(--color-accent)' }}
            />
            <span className="text-overline" style={{ color: 'var(--color-accent)' }}>
              MEARN Stack Developer
            </span>
          </div>

          {/* Name */}
          <h1 className="hero-name text-display-xl mb-6">
            <span className="block overflow-hidden">
              {splitName('Hossam')}
            </span>
            <span className="block overflow-hidden">
              {splitName('Hassan')}
            </span>
          </h1>

          {/* Role description */}
          <p
            className="hero-role text-display-sm mb-8 max-w-2xl font-light"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            I craft exceptional digital experiences with{' '}
            <span style={{ color: 'var(--color-accent)' }}>React</span>,{' '}
            <span style={{ color: 'var(--color-accent)' }}>Next.js</span>, and{' '}
            <span style={{ color: 'var(--color-accent)' }}>Node.js</span>
          </p>

          {/* Description */}
          <p
            className="hero-description mb-12 max-w-xl text-lg leading-relaxed"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            Building performant, accessible, and beautifully animated web
            applications with 3+ years of full-stack expertise.
          </p>

          {/* CTAs */}
          <div className="hero-cta flex flex-wrap items-center gap-4">
            <AnimatedButton
              href="#showcase"
              variant="primary"
              size="lg"
              icon={<ArrowDown size={18} />}
            >
              View My Work
            </AnimatedButton>
            <AnimatedButton href="#connect" variant="outline" size="lg">
              Get In Touch
            </AnimatedButton>
          </div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        className="hero-scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex flex-col items-center gap-3">
          <span
            className="text-overline"
            style={{ color: 'var(--color-text-tertiary)', fontSize: '0.6rem' }}
          >
            SCROLL
          </span>
          <div
            className="h-12 w-px"
            style={{ backgroundColor: 'var(--color-border)' }}
          >
            <motion.div
              className="w-full"
              style={{ backgroundColor: 'var(--color-accent)' }}
              animate={{ height: ['0%', '100%', '0%'] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}