// src/components/core/footer.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { gsap, gsapEase, duration as dur } from '@/systems/animation';
import { MagneticElement } from '@/components/ui/magnetic-element';
import { useCursorState, useReducedMotion } from '@/hooks';

const currentYear = new Date().getFullYear();

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { cursorHandlers } = useCursorState();

  useEffect(() => {
    if (!footerRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Large text reveal
      gsap.from('.footer-cta-text', {
        y: 100,
        opacity: 0,
        duration: dur.slower,
        ease: gsapEase.cinematic,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Bottom bar slides up
      gsap.from('.footer-bottom', {
        y: 30,
        opacity: 0,
        duration: dur.medium,
        ease: gsapEase.smooth,
        scrollTrigger: {
          trigger: '.footer-bottom',
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <footer ref={footerRef} className="relative overflow-hidden pb-8 pt-24">
      <div className="container-main">
        {/* Big CTA */}
        <div className="mb-20 text-center">
          <div className="overflow-hidden">
            <h2 className="footer-cta-text text-display-lg">
              <MagneticElement strength={0.1}>
                <a
                  href="mailto:hossamhassan112003@gmail.com"
                  className="inline-block transition-colors duration-300 hover:text-[var(--color-accent)]"
                  {...cursorHandlers('text', 'Email Me')}
                >
                  Let's Talk
                </a>
              </MagneticElement>
            </h2>
          </div>
        </div>

        {/* Separator */}
        <div
          className="mb-8 h-px w-full"
          style={{ backgroundColor: 'var(--color-border)' }}
        />

        {/* Bottom bar */}
        <div className="footer-bottom flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p
            className="text-sm"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            © {currentYear} Hossam Hassan. Crafted with precision.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#hero"
              className="text-sm transition-colors duration-300 hover:text-[var(--color-accent)]"
              style={{ color: 'var(--color-text-tertiary)' }}
              {...cursorHandlers('link')}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}