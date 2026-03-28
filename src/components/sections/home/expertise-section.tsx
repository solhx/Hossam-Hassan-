'use client';

// src/components/sections/home/expertise-section.tsx


// ─── Skills & Expertise with animated cards ───

import { memo } from 'react';
import { motion } from 'framer-motion';
import * as presets from '@/systems/animation/presets';
import { MotionWrapper } from '@/components/ui/motion-wrapper';
import { GlassCard } from '@/components/ui/glass-card';
import { portfolioData } from '@/lib/portfolio-data';
import { cn } from '@/utils/cn';

interface Skill {
  name: string;
  icon: string;
  category: string;
  proficiency: number; // 0-100
}

const skillCategories = [
  {
    title: 'Frontend',
    description: 'Building beautiful, responsive user interfaces',
    accent: 'from-green-400 to-emerald-500',
    skills: [
      { name: 'React', proficiency: 95 },
      { name: 'Next.js', proficiency: 92 },
      { name: 'TypeScript', proficiency: 90 },
      { name: 'Tailwind CSS', proficiency: 95 },
      { name: 'Framer Motion', proficiency: 85 },
      { name: 'Three.js', proficiency: 75 },
    ],
  },
  {
    title: 'Backend',
    description: 'Scalable server-side architecture & APIs',
    accent: 'from-green-500 to-teal-500',
    skills: [
      { name: 'Node.js', proficiency: 90 },
      { name: 'Express.js', proficiency: 88 },
      { name: 'MongoDB', proficiency: 85 },
      { name: 'REST APIs', proficiency: 92 },
      { name: 'GraphQL', proficiency: 70 },
      { name: 'PostgreSQL', proficiency: 72 },
    ],
  },
  {
    title: 'Tools & DevOps',
    description: 'Modern development workflow & deployment',
    accent: 'from-emerald-400 to-green-600',
    skills: [
      { name: 'Git', proficiency: 92 },
      { name: 'Docker', proficiency: 75 },
      { name: 'Vercel', proficiency: 90 },
      { name: 'CI/CD', proficiency: 78 },
      { name: 'Figma', proficiency: 80 },
      { name: 'Linux', proficiency: 72 },
    ],
  },
];

function SkillBar({ name, proficiency }: { name: string; proficiency: number }) {
  return (
    <div className="group">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-body-sm font-medium text-[var(--fg-primary)] transition-colors group-hover:text-[var(--fg-accent)]">
          {name}
        </span>
        <span className="font-mono text-caption text-[var(--fg-muted)]">
          {proficiency}%
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--border-subtle)]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-400"
          initial={{ width: 0 }}
          whileInView={{ width: `${proficiency}%` }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 1,
            ease: presets.easings.snappy,
            delay: 0.2,
          }}
        />
      </div>
    </div>
  );
}

const ExpertiseSectionComponent = () => {
  return (
    <section
      id="expertise"
      className="section-container"
      aria-labelledby="expertise-heading"
    >
      {/* Section header */}
      <MotionWrapper preset="slideUp" className="mb-16 text-center">
        <span className="mb-4 inline-block font-mono text-body-sm font-medium uppercase tracking-wider text-[var(--fg-accent)]">
          {'// Expertise'}
        </span>
        <h2 id="expertise-heading" className="text-display-xl font-bold tracking-tight">
          Skills &{' '}
          <span className="gradient-green-text">Technologies</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-body-lg text-[var(--fg-secondary)]">
          3+ years of crafting production-ready applications with modern technologies.
        </p>
      </MotionWrapper>

      {/* Skill category cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, categoryIndex) => (
          <MotionWrapper
            key={category.title}
            preset="slideUp"
            delay={categoryIndex * 0.15}
          >
            <GlassCard
              className="group h-full"
              hover="lift"
              glow
            >
              {/* Card header */}
              <div className="mb-6">
                <div
                  className={cn(
                    'mb-3 inline-flex h-10 w-10 items-center justify-center rounded-card-sm bg-gradient-to-br',
                    category.accent
                  )}
                >
                  <span className="text-lg font-bold text-white">
                    {category.title.charAt(0)}
                  </span>
                </div>
                <h3 className="text-heading-md font-semibold text-[var(--fg-primary)]">
                  {category.title}
                </h3>
                <p className="mt-1 text-body-sm text-[var(--fg-muted)]">
                  {category.description}
                </p>
              </div>

              {/* Skill bars */}
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    proficiency={skill.proficiency}
                  />
                ))}
              </div>
            </GlassCard>
          </MotionWrapper>
        ))}
      </div>

      {/* Years of experience highlight */}
      <MotionWrapper preset="scaleIn" delay={0.6} className="mt-16">
        <div className="flex flex-wrap items-center justify-center gap-8 rounded-card border border-[var(--border-accent)] bg-[var(--bg-elevated)] px-8 py-6 backdrop-blur-md md:gap-16">
          {[
            { value: '3+', label: 'Years Experience' },
            { value: '30+', label: 'Projects Delivered' },
            { value: '15+', label: 'Happy Clients' },
            { value: '99%', label: 'Code Quality' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-display-md font-bold gradient-green-text">
                {stat.value}
              </div>
              <div className="text-body-sm text-[var(--fg-muted)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </MotionWrapper>
    </section>
  );
};

export const ExpertiseSection = memo(ExpertiseSectionComponent);