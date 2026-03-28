'use client';
// src/components/sections/home/philosophy-section.tsx

// ─── Development Philosophy Section ───



import { memo } from 'react';
import { motion } from 'framer-motion';
import * as presets from '@/systems/animation/presets';
import { MotionWrapper } from '@/components/ui/motion-wrapper';
import { GlassCard } from '@/components/ui/glass-card';
import { Code2, Zap, Shield, Palette } from 'lucide-react';

const principles = [
  {
    icon: Code2,
    title: 'Clean Architecture',
    description:
      'Writing maintainable, scalable code with clear separation of concerns. Every function has a purpose, every module has a boundary.',
    accent: 'from-green-400 to-emerald-500',
  },
  {
    icon: Zap,
    title: 'Performance First',
    description:
      'Obsessing over Core Web Vitals, bundle sizes, and runtime performance. Every millisecond matters for user experience.',
    accent: 'from-green-500 to-teal-400',
  },
  {
    icon: Shield,
    title: 'Type Safety',
    description:
      'Leveraging TypeScript and Zod for end-to-end type safety. Catching bugs at compile time, not in production.',
    accent: 'from-emerald-400 to-green-600',
  },
  {
    icon: Palette,
    title: 'Pixel Perfect',
    description:
      'Translating designs into living interfaces with meticulous attention to spacing, typography, and motion design.',
    accent: 'from-teal-400 to-green-500',
  },
] as const;

const PhilosophySectionComponent = () => {
  return (
    <section
      id="philosophy"
      className="section-container"
      aria-labelledby="philosophy-heading"
    >
      <div className="grid items-center gap-16 lg:grid-cols-2">
        {/* Left: Text content */}
        <div>
          <MotionWrapper preset="slideUp">
            <span className="mb-4 inline-block font-mono text-body-sm font-medium uppercase tracking-wider text-[var(--fg-accent)]">
              {'// Philosophy'}
            </span>
            <h2
              id="philosophy-heading"
              className="text-display-xl font-bold tracking-tight"
            >
              How I{' '}
              <span className="gradient-green-text">Build</span>{' '}
              Things
            </h2>
          </MotionWrapper>

          <MotionWrapper preset="slideUp" delay={0.15}>
            <p className="mt-6 text-body-lg leading-relaxed text-[var(--fg-secondary)]">
              I believe great software is a craft. It&apos;s not just about making things
              work — it&apos;s about making them work{' '}
              <span className="font-semibold text-[var(--fg-accent)]">beautifully</span>,{' '}
              <span className="font-semibold text-[var(--fg-accent)]">efficiently</span>,
              and{' '}
              <span className="font-semibold text-[var(--fg-accent)]">reliably</span>.
            </p>
          </MotionWrapper>

          <MotionWrapper preset="slideUp" delay={0.3}>
            <p className="mt-4 text-body-lg leading-relaxed text-[var(--fg-secondary)]">
              Every project I take on is an opportunity to push boundaries. I combine
              modern tooling with timeless engineering principles to deliver experiences
              that users love and developers can maintain.
            </p>
          </MotionWrapper>

          {/* Subtle code block */}
          <MotionWrapper preset="slideUp" delay={0.45}>
            <div className="mt-8 overflow-hidden rounded-card-sm border border-[var(--border-subtle)] bg-[var(--bg-tertiary)] p-4">
              <pre className="font-mono text-caption leading-relaxed text-[var(--fg-muted)]">
                <code>
                  <span className="text-green-400">const</span>{' '}
                  <span className="text-[var(--fg-primary)]">developer</span> ={' '}
                  {'{\n'}
                  {'  '}name: <span className="text-green-300">&quot;Hossam Hassan&quot;</span>,{'\n'}
                  {'  '}passion: <span className="text-green-300">&quot;building great UX&quot;</span>,{'\n'}
                  {'  '}motto: <span className="text-green-300">&quot;Ship it, but ship it right&quot;</span>{'\n'}
                  {'}'};
                </code>
              </pre>
            </div>
          </MotionWrapper>
        </div>

        {/* Right: Principle cards */}
        <MotionWrapper
          stagger={{ amount: 0.12, delayChildren: 0.2 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {principles.map(({ icon: Icon, title, description, accent }) => (
            <motion.div key={title} variants={presets.staggerItem}>
              <GlassCard hover="lift" padding="md" className="h-full">
                <div
                  className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-card-sm bg-gradient-to-br ${accent}`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-heading-md font-semibold text-[var(--fg-primary)]">
                  {title}
                </h3>
                <p className="mt-2 text-body-sm leading-relaxed text-[var(--fg-muted)]">
                  {description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </MotionWrapper>
      </div>
    </section>
  );
};

export const PhilosophySection = memo(PhilosophySectionComponent);