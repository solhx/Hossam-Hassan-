'use client';
// src/components/sections/home/hero-section.tsx
// ─── Cinematic Hero Section ───


import { useRef, useEffect, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as presets from '@/systems/animation/presets';
import LazyHeroScene from '@/components/three/lazy-hero-scene';
import { AnimatedButton } from '@/components/ui/animated-btn';
import { MagneticElement } from '@/components/ui/magnetic-element';
import { ArrowDown, FileText, MessageSquare } from 'lucide-react';

const HeroSectionComponent = () => {
  const containerRef = useRef<HTMLElement>(null);

  // Parallax on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scaleProgress = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden"
      aria-label="Hero introduction"
    >
      {/* 3D Background */}
      <LazyHeroScene />

      {/* Gradient overlays for depth */}
      <div
        className="absolute inset-0 -z-[5] bg-gradient-to-b from-transparent via-transparent to-[var(--bg-primary)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-[5] bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg-primary)_70%)]"
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity, scale: scaleProgress }}
        className="relative z-10 mx-auto max-w-5xl px-[var(--container-px)] text-center"
      >
        {/* Status badge */}
        <motion.div
          variants={presets.fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--border-accent)] bg-[var(--bg-elevated)] px-4 py-2 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="text-body-sm font-medium text-[var(--fg-secondary)]">
            Available for work
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.div
          variants={presets.staggerContainer(0.08, 0.6)}
          initial="hidden"
          animate="visible"
          className="overflow-hidden"
        >
          <motion.h1 variants={presets.staggerItem} className="text-display-2xl font-extrabold tracking-tighter">
            <span className="block text-[var(--fg-primary)]">
              Hossam
            </span>
            <span className="block gradient-green-text">
              Hassan
            </span>
          </motion.h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={presets.blurIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.2 }}
          className="mx-auto mt-6 max-w-2xl text-body-lg leading-relaxed text-[var(--fg-secondary)]"
        >
          Full Stack{' '}
          <span className="font-semibold text-[var(--fg-accent)]">MERN</span>{' '}
          Developer crafting high-performance web experiences with{' '}
          <span className="font-mono text-body-sm font-medium text-[var(--fg-accent)]">
            React
          </span>
          ,{' '}
          <span className="font-mono text-body-sm font-medium text-[var(--fg-accent)]">
            Next.js
          </span>
          , and{' '}
          <span className="font-mono text-body-sm font-medium text-[var(--fg-accent)]">
            TypeScript
          </span>
          .
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={presets.slideUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticElement strength={0.3}>
            <AnimatedButton
              href="#showcase"
              variant="primary"
              size="lg"
              icon={<MessageSquare className="h-4 w-4" />}
            >
              View My Work
            </AnimatedButton>
          </MagneticElement>

          <MagneticElement strength={0.3}>
            <AnimatedButton
              href="/Hossam-Hassan-Resume.pdf"
              variant="ghost"
              size="lg"
              icon={<FileText className="h-4 w-4" />}
              external
            >
              Resume
            </AnimatedButton>
          </MagneticElement>
        </motion.div>

        {/* Tech stack pills */}
        <motion.div
          variants={presets.staggerContainer(0.05, 2)}
          initial="hidden"
          animate="visible"
          className="mt-16 flex flex-wrap items-center justify-center gap-2"
        >
          {['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS'].map(
            (tech) => (
              <motion.span
                key={tech}
                variants={presets.staggerItem}
                className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-1 font-mono text-caption text-[var(--fg-muted)] backdrop-blur-sm transition-colors duration-300 hover:border-[var(--border-accent)] hover:text-[var(--fg-accent)]"
              >
                {tech}
              </motion.span>
            )
          )}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-caption font-medium uppercase tracking-wider text-[var(--fg-muted)]">
            Scroll
          </span>
          <ArrowDown className="h-4 w-4 text-[var(--fg-accent)]" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export const HeroSection = memo(HeroSectionComponent);