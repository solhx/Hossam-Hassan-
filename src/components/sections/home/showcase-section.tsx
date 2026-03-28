'use client';

// src/components/sections/home/showcase-section.tsx
// ─── Featured Projects Showcase ───



import { memo, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import * as presets from '@/systems/animation/presets';
import { MotionWrapper } from '@/components/ui/motion-wrapper';
import { GlassCard } from '@/components/ui/glass-card';
import { AnimatedButton } from '@/components/ui/animated-btn';
import { MagneticElement } from '@/components/ui/magnetic-element';
import { cn } from '@/utils/cn';

import { ArrowUpRight } from 'lucide-react';
import { 
  FaGithub as Github,

} from 'react-icons/fa';


interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 'any',
    title: 'Adasa Platform',
    description: 'A comprehensive e-commerce platform with real-time features.',
    longDescription:
      'Built a full-stack e-commerce platform with real-time inventory tracking, dynamic pricing, advanced search, and a seamless checkout experience. Implemented server-side rendering for SEO and instant load times.',
    image: '/adasa.webp',
    tags: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind CSS', 'Stripe'],
    liveUrl: 'https://adasa.example.com',
    githubUrl: 'https://github.com/hossamhassan/adasa',
    featured: true,
  },
  {
    id: 'e-learning',
    title: 'E-Learning Platform',
    description: 'Interactive learning platform with video streaming and progress tracking.',
    longDescription:
      'Designed and developed a modern e-learning platform with video streaming, course management, quiz engine, and student progress analytics. Features include real-time chat, certificate generation, and payment integration.',
    image: '/E-learning.webp',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
    liveUrl: 'https://elearning.example.com',
    githubUrl: 'https://github.com/hossamhassan/e-learning',
    featured: true,
  },
  {
    id: 'project3',
    title: 'Portfolio Dashboard',
    description: 'Admin dashboard with analytics, charts, and data management.',
    longDescription:
      'A feature-rich admin dashboard built with React and TypeScript. Includes interactive charts, data tables with server-side pagination, role-based access control, and real-time notifications.',
    image: '/project3.webp',
    tags: ['React', 'TypeScript', 'Chart.js', 'Tailwind', 'Firebase'],
    githubUrl: 'https://github.com/hossamhassan/dashboard',
    featured: false,
  },
];

// ─── Project Card Component ───
function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const isEven = index % 2 === 0;

  return (
    <MotionWrapper
      preset={isEven ? 'slideLeft' : 'slideRight'}
      delay={index * 0.1}
    >
      <GlassCard
        ref={cardRef}
        className={cn(
          'group relative overflow-hidden transition-all duration-500',
          project.featured && 'md:col-span-2'
        )}
        hover="lift"
        glow
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={cn(
            'flex flex-col gap-6',
            project.featured ? 'md:flex-row md:items-center' : ''
          )}
        >
          {/* Project Image */}
          <div
            className={cn(
              'relative overflow-hidden rounded-card-sm',
              project.featured ? 'md:w-1/2' : 'w-full'
            )}
          >
            <div className="aspect-video w-full">
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                sizes={project.featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                quality={85}
              />
            </div>

            {/* Overlay on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center bg-green-950/60 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={presets.transitions.springBouncy}
                  >
                    <ArrowUpRight className="h-10 w-10 text-green-400" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Project Info */}
          <div className={cn(project.featured ? 'md:w-1/2' : 'w-full')}>
            {/* Tags */}
            <div className="mb-3 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--border-subtle)] px-2.5 py-0.5 font-mono text-caption text-[var(--fg-muted)] transition-colors group-hover:border-[var(--border-accent)] group-hover:text-[var(--fg-accent)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-heading-lg font-bold text-[var(--fg-primary)] transition-colors group-hover:text-[var(--fg-accent)]">
              {project.title}
            </h3>

            {/* Description */}
            <p className="mt-2 text-body-md leading-relaxed text-[var(--fg-secondary)]">
              {project.featured ? project.longDescription : project.description}
            </p>

            {/* Links */}
            <div className="mt-5 flex items-center gap-3">
              {project.liveUrl && (
                <MagneticElement strength={0.2}>
                  <AnimatedButton
                    href={project.liveUrl}
                    variant="primary"
                    size="sm"
                    icon={<ArrowUpRight className="h-3.5 w-3.5" />}
                    external
                  >
                    Live Demo
                  </AnimatedButton>
                </MagneticElement>
              )}

              {project.githubUrl && (
                <MagneticElement strength={0.2}>
                  <AnimatedButton
                    href={project.githubUrl}
                    variant="ghost"
                    size="sm"
                    icon={<Github className="h-3.5 w-3.5" />}
                    external
                  >
                    Source
                  </AnimatedButton>
                </MagneticElement>
              )}
            </div>
          </div>
        </div>
      </GlassCard>
    </MotionWrapper>
  );
}

// ─── Main Section ───
const ShowcaseSectionComponent = () => {
  return (
    <section
      id="showcase"
      className="section-container"
      aria-labelledby="showcase-heading"
    >
      {/* Section header */}
      <MotionWrapper preset="slideUp" className="mb-16 text-center">
        <span className="mb-4 inline-block font-mono text-body-sm font-medium uppercase tracking-wider text-[var(--fg-accent)]">
          {'// Showcase'}
        </span>
        <h2
          id="showcase-heading"
          className="text-display-xl font-bold tracking-tight"
        >
          Featured{' '}
          <span className="gradient-green-text">Projects</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-body-lg text-[var(--fg-secondary)]">
          A selection of projects that showcase my expertise in full-stack development.
        </p>
      </MotionWrapper>

      {/* Project grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export const ShowcaseSection = memo(ShowcaseSectionComponent);
