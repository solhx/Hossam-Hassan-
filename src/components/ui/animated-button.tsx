// src/components/ui/animated-button.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MagneticElement } from './magnetic-element';
import { useCursorState } from '@/hooks';
import { transitions } from '@/systems/animation/motion-variants';

interface AnimatedButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  className?: string;
}

export function AnimatedButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
}: AnimatedButtonProps) {
  const { cursorHandlers } = useCursorState();

  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-base',
    lg: 'px-10 py-5 text-lg',
  };

  const variants = {
    primary: 'bg-[var(--color-accent)] text-white',
    ghost:
      'bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-glass)]',
    outline:
      'bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)]',
  };

  const Tag = href ? 'a' : 'button';

  return (
    <MagneticElement strength={0.2} distance={120}>
      <motion.div
        whileHover="hover"
        whileTap="tap"
        initial="rest"
        {...cursorHandlers('hover')}
      >
        <Tag
          href={href}
          onClick={onClick}
          className={`
            group relative inline-flex items-center gap-3 overflow-hidden
            rounded-full font-medium tracking-wide
            ${sizes[size]} ${variants[variant]} ${className}
          `}
          style={{ transition: 'background-color 0.3s ease' }}
        >
          {/* Hover fill effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            initial={{ scale: 0, opacity: 0 }}
            variants={{
              rest: { scale: 0, opacity: 0 },
              hover: {
                scale: 1,
                opacity: 1,
                transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
              },
            }}
          />

          <span className="relative z-10 flex items-center gap-3">
            {children}
            {icon && (
              <motion.span
                variants={{
                  rest: { x: 0 },
                  hover: { x: 5, transition: transitions.spring },
                }}
              >
                {icon}
              </motion.span>
            )}
          </span>
        </Tag>
      </motion.div>
    </MagneticElement>
  );
}