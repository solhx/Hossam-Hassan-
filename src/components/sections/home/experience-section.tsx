'use client';
// src/components/sections/home/experience-section.tsx
// ─── Experience Timeline ───


import { memo } from 'react';
import { motion } from 'framer-motion';
import * as presets from '@/systems/animation/presets';
import { MotionWrapper } from '@/components/ui/motion-wrapper';
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/utils/cn';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
  current?: boolean;
}

const experiences: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Senior Frontend Developer',
    company: 'Tech Company',
    location: 'Remote',
    period: 'Jan 2023 — Present',
    description:
      'Leading frontend architecture and development for a SaaS platform serving 50K+ users.',
    highlights: [
      'Architected a micro-frontend system reducing deploy times by 60%',
      'Improved Core Web Vitals scores from 65 to 95+',
      'Mentored 3 junior developers',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind', 'GraphQL'],
    current: true,
  },
  {
    id: 'exp-2',
    role: 'Full Stack Developer',
    company: 'Startup Inc.',
    location: 'Cairo, Egypt',
    period: 'Jun 2021 — Dec 2022',
    description:
      'Built and maintained multiple client-facing applications from concept to deployment.',
    highlights: [
      'Delivered 12+ production applications',
      'Implemented CI/CD pipelines reducing bugs by 40%',
      'Designed RESTful APIs serving 100K+ requests/day',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
  },
  {
    id: 'exp-3',
    role: 'Frontend Developer',
    company: 'Freelance',
    location: 'Remote',
    period: 'Jan 2020 — May 2021',
    description:
      'Worked with diverse clients to create responsive, high-quality web applications.',
    highlights: [
      'Completed 20+ freelance projects with 5-star ratings',
      'Specialized in React SPAs and landing pages',
      'Developed reusable component libraries for clients',
    ],
    technologies: ['React', 'JavaScript', 'CSS', 'Firebase'],
  },
];

function TimelineItem({
  experience,
  index,
}: {
  experience: ExperienceItem;
  index: number;
}) {
  return (
    <MotionWrapper preset="slideUp" delay={index * 0.15}>
      <div className="relative flex gap-6 md:gap-8">
        {/* Timeline line & dot */}
        <div className="relative flex flex-col items-center" aria-hidden="true">
          {/* Dot */}
          <div
            className={cn(
              'relative z-10 flex h-4 w-4 items-center justify-center rounded-full border-2',
              experience.current
                ? 'border-green-500 bg-green-500'
                : 'border-[var(--border-accent)] bg-[var(--bg-primary)]'
            )}
          >
            {experience.current && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-50" />
            )}
          </div>

          {/* Line */}
          <div className="w-px flex-1 bg-gradient-to-b from-[var(--border-accent)] to-transparent" />
        </div>

        {/* Content */}
        <div className="flex-1 pb-12">
          <GlassCard hover="lift" padding="md">
            {/* Header */}
            <div className="mb-4">
              {experience.current && (
                <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/10 px-2.5 py-0.5 text-caption font-medium text-green-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Current Role
                </span>
              )}

              <h3 className="text-heading-lg font-bold text-[var(--fg-primary)]">
                {experience.role}
              </h3>

              <div className="mt-2 flex flex-wrap items-center gap-4 text-body-sm text-[var(--fg-muted)]">
                <span className="flex items-center gap-1.5 font-medium text-[var(--fg-accent)]">
                  <Briefcase className="h-3.5 w-3.5" />
                  {experience.company}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {experience.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {experience.period}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-body-sm leading-relaxed text-[var(--fg-secondary)]">
              {experience.description}
            </p>

            {/* Highlights */}
            <ul className="mt-4 space-y-2" role="list">
              {experience.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2 text-body-sm text-[var(--fg-secondary)]"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500" aria-hidden="true" />
                  {highlight}
                </li>
              ))}
            </ul>

            {/* Technologies */}
            <div className="mt-5 flex flex-wrap gap-1.5">
              {experience.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[var(--border-subtle)] px-2.5 py-0.5 font-mono text-caption text-[var(--fg-muted)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </MotionWrapper>
  );
}

const ExperienceSectionComponent = () => {
  return (
    <section
      id="experience"
      className="section-container"
      aria-labelledby="experience-heading"
    >
      {/* Section header */}
      <MotionWrapper preset="slideUp" className="mb-16 text-center">
        <span className="mb-4 inline-block font-mono text-body-sm font-medium uppercase tracking-wider text-[var(--fg-accent)]">
          {'// Experience'}
        </span>
        <h2
          id="experience-heading"
          className="text-display-xl font-bold tracking-tight"
        >
          Professional{' '}
          <span className="gradient-green-text">Journey</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-body-lg text-[var(--fg-secondary)]">
          A timeline of my growth as a developer, from freelancing to leading teams.
        </p>
      </MotionWrapper>

      {/* Timeline */}
      <div className="mx-auto max-w-3xl">
        {experiences.map((exp, index) => (
          <TimelineItem key={exp.id} experience={exp} index={index} />
        ))}
      </div>
    </section>
  );
};

export const ExperienceSection = memo(ExperienceSectionComponent);