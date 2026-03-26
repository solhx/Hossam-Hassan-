// src/components/sections/home/showcase-section.tsx (continued)
'use client';

import React, { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger, gsapEase, duration as dur } from '@/systems/animation';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { ImageReveal } from '@/components/ui/image-reveal';
import { AnimatedButton } from '@/components/ui/animated-button';
import { useCursorState, useReducedMotion } from '@/hooks';
import { ArrowUpRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  url: string;
  github?: string;
  year: string;
}

const projects: Project[] = [
  {
    id: 'hossroute',
    title: 'HossRoute',
    description:
      'Full-stack routing application with real-time tracking, authentication, and map integration.',
    image: '/hossroute.webp',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'Maps API'],
    url: '#',
    year: '2024',
  },
  {
    id: 'shop-hub',
    title: 'Shop Hub',
    description:
      'E-commerce platform with product management, cart system, and payment processing.',
    image: '/shop-hub-ecommerce.webp',
    tags: ['React', 'Express', 'MongoDB', 'Stripe'],
    url: '#',
    year: '2024',
  },
  {
    id: 'e-learning',
    title: 'E-Learning Platform',
    description:
      'Interactive education platform with course management, video streaming, and progress tracking.',
    image: '/E-learning.webp',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    url: '#',
    year: '2023',
  },
  {
    id: 'runnet',
    title: 'Runnet',
    description:
      'Social fitness application with activity tracking, challenges, and community features.',
    image: '/runnet1.webp',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    url: '#',
    year: '2023',
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { cursorHandlers } = useCursorState();
  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className={`project-card grid items-center gap-8 md:gap-16 ${
        isEven ? 'md:grid-cols-[1.2fr_1fr]' : 'md:grid-cols-[1fr_1.2fr]'
      }`}
      {...cursorHandlers('project', 'View')}
    >
      {/* Image */}
      <div className={`${!isEven ? 'md:order-2' : ''}`}>
        <a href={project.url} target="_blank" rel="noopener noreferrer">
          <div className="group relative overflow-hidden rounded-2xl">
            <ImageReveal
              src={project.image}
              alt={project.title}
              width={800}
              height={500}
              direction={isEven ? 'left' : 'right'}
              parallax
              parallaxSpeed={10}
              className="aspect-[16/10] w-full"
            />

            {/* Overlay on hover */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center rounded-2xl"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              style={{
                backgroundColor: 'rgba(var(--color-accent-rgb), 0.1)',
                backdropFilter: 'blur(4px)',
              }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="flex h-20 w-20 items-center justify-center rounded-full"
                style={{ backgroundColor: 'var(--color-accent)' }}
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <ArrowUpRight size={24} color="#fff" />
              </motion.div>
            </motion.div>
          </div>
        </a>
      </div>

      {/* Content */}
      <div className={`${!isEven ? 'md:order-1' : ''}`}>
        {/* Year + Tags */}
        <div className="mb-4 flex items-center gap-4">
          <span className="text-overline" style={{ color: 'var(--color-accent)' }}>
            {project.year}
          </span>
          <div className="h-px flex-1" style={{ backgroundColor: 'var(--color-border)' }} />
        </div>

        {/* Title */}
        <h3
          className="mb-4 text-4xl font-bold md:text-5xl"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="mb-6 max-w-md text-lg leading-relaxed"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div className="mb-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="glass rounded-full px-4 py-1.5 text-xs font-medium"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <AnimatedButton
          href={project.url}
          variant="outline"
          size="md"
          icon={<ArrowUpRight size={16} />}
        >
          View Project
        </AnimatedButton>
      </div>
    </div>
  );
}

export function ShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Each project card animates in on scroll
      const cards = gsap.utils.toArray<HTMLElement>('.project-card');

      cards.forEach((card, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });

        // Content side
        const contentEls = card.querySelectorAll(
          'h3, p, .text-overline, .flex.flex-wrap, a'
        );

        tl.from(contentEls, {
          y: 50,
          opacity: 0,
          duration: dur.medium,
          stagger: 0.1,
          ease: gsapEase.smooth,
        });
      });

      // Separator lines between projects
      gsap.from('.project-separator', {
        scaleX: 0,
        duration: dur.slower,
        ease: gsapEase.cinematic,
        transformOrigin: 'left center',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.projects-list',
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} id="showcase" className="section-padding relative">
      <div className="container-main">
        <SectionHeading
          overline="// 03 — Showcase"
          title="Selected Work"
          description="A curated selection of projects that demonstrate my approach to full-stack development, design thinking, and technical execution."
        />

        {/* Projects list */}
        <div className="projects-list mt-20 space-y-0">
          {projects.map((project, i) => (
            <React.Fragment key={project.id}>
              {i > 0 && (
                <div
                  className="project-separator my-16 h-px w-full md:my-24"
                  style={{ backgroundColor: 'var(--color-border)' }}
                />
              )}
              <ProjectCard project={project} index={i} />
            </React.Fragment>
          ))}
        </div>

        {/* View all button */}
        <div className="mt-24 flex justify-center">
          <AnimatedButton
            href="https://github.com/hossamhassan"
            variant="ghost"
            size="lg"
            icon={<ArrowUpRight size={18} />}
          >
            View All Projects on GitHub
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}