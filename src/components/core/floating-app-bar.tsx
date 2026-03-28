'use client';
// src/components/core/floating-app-bar.tsx
// ─── Floating Navigation Bar (A11y Enhanced) — COMPLETE ───



import { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '@/utils/cn';
import { MagneticElement } from '@/components/ui/magnetic-element';
import * as presets from '@/systems/animation/presets';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Projects', href: '#showcase' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
] as const;

const FloatingAppBarComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const { theme, setTheme } = useTheme();

  // Prevent hydration mismatch for theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show/hide on scroll
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsVisible(latest > 200);
  });

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navItems.forEach(({ href }) => {
      const sectionId = href.replace('#', '');
      const section = document.getElementById(sectionId);
      if (!section) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionId);
          }
        },
        { rootMargin: '-40% 0px -60% 0px' }
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  // Close mobile menu on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={presets.transitions.snappy}
            className="fixed left-1/2 top-6 z-[200] -translate-x-1/2"
            role="navigation"
            aria-label="Main navigation"
          >
            <div className="glass-strong flex items-center gap-1 rounded-full px-2 py-2 shadow-xl">
              {/* Desktop nav items */}
              <ul className="hidden items-center gap-1 md:flex" role="menubar">
                {navItems.map(({ label, href }) => {
                  const sectionId = href.replace('#', '');
                  const isActive = activeSection === sectionId;

                  return (
                    <li key={href} role="none">
                      <MagneticElement strength={0.15}>
                        <button
                          role="menuitem"
                          onClick={() => handleNavClick(href)}
                          className={cn(
                            'relative rounded-full px-4 py-1.5 text-body-sm font-medium transition-colors duration-300',
                            isActive
                              ? 'text-[var(--fg-accent)]'
                              : 'text-[var(--fg-muted)] hover:text-[var(--fg-primary)]'
                          )}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="nav-indicator"
                              className="absolute inset-0 rounded-full border border-green-500/20 bg-green-500/10"
                              transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 30,
                              }}
                            />
                          )}
                          <span className="relative z-10">{label}</span>
                        </button>
                      </MagneticElement>
                    </li>
                  );
                })}
              </ul>

              {/* Divider */}
              <div className="mx-1 hidden h-5 w-px bg-[var(--border-default)] md:block" aria-hidden="true" />

              {/* Theme toggle */}
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--fg-muted)] transition-colors hover:bg-[var(--bg-tertiary)] hover:text-[var(--fg-accent)]"
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  <AnimatePresence mode="wait">
                    {theme === 'dark' ? (
                      <motion.div
                        key="sun"
                        initial={{ rotate: -90, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        exit={{ rotate: 90, scale: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Sun className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ rotate: 90, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        exit={{ rotate: -90, scale: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Moon className="h-4 w-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--fg-muted)] transition-colors hover:bg-[var(--bg-tertiary)] hover:text-[var(--fg-primary)] md:hidden"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-nav"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ─── Mobile Full-Screen Nav ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[199] flex items-center justify-center bg-[var(--bg-primary)]/95 backdrop-blur-2xl md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <motion.ul
              variants={presets.staggerContainer(0.08, 0.1)}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex flex-col items-center gap-6"
              role="menu"
            >
              {navItems.map(({ label, href }) => {
                const sectionId = href.replace('#', '');
                const isActive = activeSection === sectionId;

                return (
                  <motion.li key={href} variants={presets.staggerItem} role="none">
                    <button
                      role="menuitem"
                      onClick={() => handleNavClick(href)}
                      className={cn(
                        'text-display-md font-bold tracking-tight transition-colors duration-300',
                        isActive
                          ? 'gradient-green-text'
                          : 'text-[var(--fg-muted)] hover:text-[var(--fg-primary)]'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {label}
                    </button>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(FloatingAppBarComponent);