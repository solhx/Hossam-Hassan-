// src/components/sections/home/expertise-section.tsx
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap, gsapEase, duration as dur } from '@/systems/animation';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { GlassCard } from '@/components/ui/glass-card';
import { useCursorState, useReducedMotion } from '@/hooks';
import { transitions } from '../../../systems/animation/motion-variants';
import {  motionEase } from '../../../systems/animation/easing';


interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  skills: { name: string; level: number }[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: '◆',
    description:
      'Building responsive, performant, and accessible user interfaces with modern frameworks.',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'GSAP / Framer Motion', level: 88 },
      { name: 'Three.js', level: 70 },
    ],
    color: '#748ffc',
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: '◇',
    description:
      'Designing scalable server architectures, APIs, and database solutions.',
    skills: [
      { name: 'Node.js / Express', level: 90 },
      { name: 'MongoDB / Mongoose', level: 88 },
      { name: 'REST API Design', level: 92 },
      { name: 'Authentication / JWT', level: 85 },
      { name: 'WebSockets', level: 78 },
    ],
    color: '#63e6be',
  },
  {
    id: 'tools',
    title: 'Tools & DevOps',
    icon: '○',
    description:
      'Streamlining development workflow with modern tooling and deployment strategies.',
    skills: [
      { name: 'Git / GitHub', level: 92 },
      { name: 'Vercel / Netlify', level: 88 },
      { name: 'Docker', level: 65 },
      { name: 'Figma / Design', level: 80 },
      { name: 'CI/CD', level: 72 },
    ],
    color: '#ffa94d',
  },
];

function SkillBar({
  name,
  level,
  color,
  index,
  isActive,
}: {
  name: string;
  level: number;
  color: string;
  index: number;
  isActive: boolean;
}) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current || !isActive) return;

    gsap.fromTo(
      barRef.current,
      { scaleX: 0 },
      {
        scaleX: level / 100,
        duration: dur.slow,
        delay: index * 0.1,
        ease: gsapEase.cinematic,
        transformOrigin: 'left center',
      }
    );
  }, [isActive, level, index]);

  return (
    <div className="group">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
          {name}
        </span>
        <span
          className="font-mono text-xs tabular-nums"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          {level}%
        </span>
      </div>
      <div
        className="h-1 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: 'var(--color-border)' }}
      >
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{
            backgroundColor: color,
            transform: 'scaleX(0)',
            transformOrigin: 'left center',
          }}
        />
      </div>
    </div>
  );
}

export function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>('frontend');
  const { cursorHandlers } = useCursorState();
  const prefersReducedMotion = useReducedMotion();

  const activeData = skillCategories.find((c) => c.id === activeCategory)!;

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Category tabs stagger in
      gsap.from('.category-tab', {
        y: 40,
        opacity: 0,
        duration: dur.medium,
        stagger: 0.1,
        ease: gsapEase.smooth,
        scrollTrigger: {
          trigger: '.category-tabs',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} id="expertise" className="section-padding relative">
      {/* Large background text */}
      <div
        className="pointer-events-none absolute right-0 top-1/4 -translate-y-1/2 text-[15vw] font-bold leading-none opacity-[0.02]"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        SKILLS
      </div>

      <div className="container-main relative z-10">
        <SectionHeading
          overline="// 02 — Expertise"
          title="What I Master"
          description="3+ years of building production applications across the full MEARN stack."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          {/* Category Tabs */}
          <div className="category-tabs space-y-4">
            {skillCategories.map((category) => (
              <motion.button
                key={category.id}
                className={`category-tab group flex w-full items-start gap-4 rounded-2xl p-6 text-left transition-all duration-300 ${
                  activeCategory === category.id ? 'glass' : ''
                }`}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ x: 8 }}
                transition={transitions.snappy}
                {...cursorHandlers('hover')}
                style={{
                  borderColor:
                    activeCategory === category.id
                      ? category.color
                      : 'transparent',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }}
              >
                {/* Icon */}
                <span
                  className="mt-1 text-2xl"
                  style={{
                    color:
                      activeCategory === category.id
                        ? category.color
                        : 'var(--color-text-tertiary)',
                  }}
                >
                  {category.icon}
                </span>

                <div>
                  <h3
                    className="mb-1 text-xl font-semibold"
                    style={{
                      fontFamily: 'var(--font-display)',
                      color:
                        activeCategory === category.id
                          ? 'var(--color-text-primary)'
                          : 'var(--color-text-secondary)',
                    }}
                  >
                    {category.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--color-text-tertiary)' }}
                  >
                    {category.description}
                  </p>
                </div>

                {/* Active indicator */}
                {activeCategory === category.id && (
                  <motion.div
                    layoutId="activeSkillCategory"
                    className="absolute right-4 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
                    style={{ backgroundColor: category.color }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Skill Detail Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{
                duration: 0.5,
                ease: motionEase.smooth,
              }}
            >
              <GlassCard className="p-8 md:p-10">
                {/* Header */}
                <div className="mb-8 flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl text-xl"
                    style={{
                      backgroundColor: `${activeData.color}15`,
                      color: activeData.color,
                    }}
                  >
                    {activeData.icon}
                  </div>
                  <div>
                    <h3
                      className="text-2xl font-bold"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {activeData.title}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
                      {activeData.skills.length} core technologies
                    </p>
                  </div>
                </div>

                {/* Skill Bars */}
                <div className="space-y-6">
                  {activeData.skills.map((skill, i) => (
                    <SkillBar
                      key={`${activeCategory}-${skill.name}`}
                      name={skill.name}
                      level={skill.level}
                      color={activeData.color}
                      index={i}
                      isActive={true}
                    />
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}