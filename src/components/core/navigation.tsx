// src/components/core/navigation.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconUser,
  IconBulb,
  IconCertificate,
  IconCode,
  IconMessage,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconDownload,
} from '@tabler/icons-react';
import { navSlideDown, transitions } from '@/systems/animation/motion-variants';
import { useCursorState } from '@/hooks/useCursorState';
import { MagneticElement } from '@/components/ui/magnetic-element';
import { ToggleTheme } from '@/components/ui/toggle-theme';

interface NavLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  external?: boolean;
  download?: boolean;
}

const sectionLinks: NavLink[] = [
  {
    label: 'Philosophy',
    href: '#philosophy',
    icon: <IconUser size={16} />,
  },
  {
    label: 'Expertise',
    href: '#expertise',
    icon: <IconBulb size={16} />,
  },
  {
    label: 'Journey',
    href: '#journey',
    icon: <IconCertificate size={16} />,
  },
  {
    label: 'Showcase',
    href: '#showcase',
    icon: <IconCode size={16} />,
  },
  {
    label: 'Connect',
    href: '#connect',
    icon: <IconMessage size={16} />,
  },
];

const externalLinks: NavLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/solhx',
    icon: <IconBrandGithub size={16} />,
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/hossam-hassan-132055244/',
    icon: <IconBrandLinkedin size={16} />,
    external: true,
  },
  {
    label: 'WhatsApp',
    href: 'https://api.whatsapp.com/send/?phone=%2B201022828316&text&type=phone_number&app_absent=0',
    icon: <IconBrandWhatsapp size={16} />,
    external: true,
  },
];

export function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cursorHandlers } = useCursorState();

  useEffect(() => {
    // Show after preloader completes
    const timer = setTimeout(() => setIsVisible(true), 3200);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Track active section
  useEffect(() => {
    const sectionIds = sectionLinks.map((link) => link.href.replace('#', ''));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-40% 0px -60% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(href, '_blank');
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          variants={navSlideDown}
          initial="hidden"
          animate="visible"
          className="fixed left-1/2 top-6 z-[100] -translate-x-1/2"
        >
          {/* ── Desktop Navigation ── */}
          <motion.nav
            className="hidden items-center gap-1 rounded-full border px-2 py-2 md:flex"
            style={{
              backgroundColor: isScrolled
                ? 'var(--color-surface-elevated)'
                : 'var(--color-glass)',
              backdropFilter: `blur(${isScrolled ? '20px' : '12px'})`,
              WebkitBackdropFilter: `blur(${isScrolled ? '20px' : '12px'})`,
              borderColor: 'var(--color-glass-border)',
              boxShadow: isScrolled
                ? '0 8px 32px rgba(0,0,0,0.1)'
                : '0 4px 16px rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
            }}
          >
            {/* Logo */}
            <MagneticElement strength={0.2}>
              <button
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
                className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white transition-transform duration-200 hover:scale-105"
                style={{ backgroundColor: 'var(--color-accent)' }}
                {...cursorHandlers('hover')}
              >
                H
              </button>
            </MagneticElement>

            {/* Section links */}
            <div className="flex items-center gap-0.5 px-1">
              {sectionLinks.map((link) => (
                <MagneticElement key={link.href} strength={0.15}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="relative flex items-center gap-1.5 rounded-full px-3 py-2 text-sm transition-colors duration-200"
                    style={{
                      color:
                        activeSection === link.href
                          ? 'var(--color-text-primary)'
                          : 'var(--color-text-tertiary)',
                    }}
                    {...cursorHandlers('link')}
                  >
                    {activeSection === link.href && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-full"
                        style={{
                          backgroundColor:
                            'rgba(var(--color-accent-rgb), 0.1)',
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                </MagneticElement>
              ))}
            </div>

            {/* Separator */}
            <div
              className="mx-1 h-6 w-px"
              style={{ backgroundColor: 'var(--color-border)' }}
            />

            {/* External links */}
            <div className="flex items-center gap-0.5">
              {externalLinks.map((link) => (
                <MagneticElement key={link.href} strength={0.2}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200"
                    style={{ color: 'var(--color-text-tertiary)' }}
                    {...cursorHandlers('hover')}
>
                    {link.icon}
                  </a>
                </MagneticElement>
              ))}
            </div>

            {/* CV Download */}
            <MagneticElement strength={0.2}>
              <a
                href="/Hossam-Hassan-Resume.pdf"
                download
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200"
                style={{ color: 'var(--color-text-tertiary)' }}
                aria-label="Download CV"
                {...cursorHandlers('hover')}
              >
                <IconDownload size={16} />
              </a>
            </MagneticElement>

            {/* Theme toggle */}
            <div className="ml-1">
              <ToggleTheme />
            </div>
          </motion.nav>

          {/* ── Mobile Navigation ── */}
          <div className="md:hidden">
            {/* Mobile toggle button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-12 w-12 items-center justify-center rounded-full border"
              style={{
                backgroundColor: 'var(--color-surface-elevated)',
                backdropFilter: 'blur(20px)',
                borderColor: 'var(--color-glass-border)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex flex-col gap-1">
                <motion.div
                  className="h-0.5 w-5 rounded-full"
                  style={{ backgroundColor: 'var(--color-text-primary)' }}
                  animate={
                    isMobileMenuOpen
                      ? { rotate: 45, y: 3 }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.2 }}
                />
                <motion.div
                  className="h-0.5 w-5 rounded-full"
                  style={{ backgroundColor: 'var(--color-text-primary)' }}
                  animate={
                    isMobileMenuOpen
                      ? { rotate: -45, y: -3 }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.2 }}
                />
              </div>
            </motion.button>

            {/* Mobile menu dropdown */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute right-0 top-16 w-56 overflow-hidden rounded-2xl border p-2"
                  style={{
                    backgroundColor: 'var(--color-surface-elevated)',
                    backdropFilter: 'blur(20px)',
                    borderColor: 'var(--color-glass-border)',
                    boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
                  }}
                >
                  {/* Section links */}
                  {sectionLinks.map((link, i) => (
                    <motion.button
                      key={link.href}
                      onClick={() => scrollTo(link.href)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors duration-150"
                      style={{
                        color:
                          activeSection === link.href
                            ? 'var(--color-accent)'
                            : 'var(--color-text-secondary)',
                      }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          'rgba(var(--color-accent-rgb), 0.06)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      {link.icon}
                      {link.label}
                    </motion.button>
                  ))}

                  {/* Divider */}
                  <div
                    className="mx-2 my-2 h-px"
                    style={{ backgroundColor: 'var(--color-border)' }}
                  />

                  {/* External + download */}
                  <div className="flex items-center justify-between px-3 py-2">
                    <div className="flex gap-2">
                      {externalLinks.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-150"
                          style={{ color: 'var(--color-text-tertiary)' }}
                          aria-label={link.label}
                        >
                          {link.icon}
                        </a>
                      ))}
                      <a
                        href="/Hossam-Hassan-Resume.pdf"
                        download
                        className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-150"
                        style={{ color: 'var(--color-text-tertiary)' }}
                        aria-label="Download CV"
                      >
                        <IconDownload size={16} />
                      </a>
                    </div>
                    <ToggleTheme />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}