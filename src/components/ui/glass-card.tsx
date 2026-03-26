// src/components/ui/glass-card.tsx
'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { cardHover } from '@/systems/animation/motion-variants';
import { useCursorState } from '@/hooks/useCursorState';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  cursorLabel?: string;
  enableTilt?: boolean;
}

export function GlassCard({
  children,
  className = '',
  cursorLabel,
  enableTilt = true,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursorState();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!enableTilt || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    cardRef.current.style.transform = `
      perspective(1000px) 
      rotateY(${x * 8}deg) 
      rotateX(${-y * 8}deg) 
      scale3d(1.02, 1.02, 1.02)
    `;
  };

  // ✅ Fix: Single onMouseLeave that handles both tilt reset AND cursor reset
  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
    }
    resetCursor();
  };

  const handleMouseEnter = () => {
    setCursor(cursorLabel ? 'project' : 'hover', cursorLabel);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`glass transition-transform duration-500 ease-out ${className}`}
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 hover:opacity-100"
        style={{
          background:
            'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(var(--color-accent-rgb), 0.06), transparent 40%)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}