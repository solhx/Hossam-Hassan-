// src/components/core/cursor/cursor-follower.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import { useCursorState } from '@/hooks/useCursorState';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useViewportSize } from '@/hooks/useViewportSize';

const mainSpringConfig = { stiffness: 500, damping: 40, mass: 0.5 };
const trailSpringConfig = { stiffness: 200, damping: 30 };

const cursorSizes: Record<string, number> = {
  default: 16,
  hover: 60,
  text: 120,
  project: 90,
  link: 50,
  drag: 80,
  hidden: 0,
};

export function CursorFollower() {
  const { type, label, position } = useCursorState();
  const prefersReducedMotion = useReducedMotion();
  const { isMobile } = useViewportSize();

  // ──────────────────────────────────────────────
  // ALL HOOKS CALLED HERE — before any returns
  // ──────────────────────────────────────────────

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Main cursor springs (fast follow)
  const smoothX = useSpring(cursorX, mainSpringConfig);
  const smoothY = useSpring(cursorY, mainSpringConfig);

  // Trail cursor springs (slower, laggier follow)
  const trailX = useSpring(cursorX, trailSpringConfig);
  const trailY = useSpring(cursorY, trailSpringConfig);

  useEffect(() => {
    cursorX.set(position.x);
    cursorY.set(position.y);
  }, [position.x, position.y, cursorX, cursorY]);

  // ──────────────────────────────────────────────
  // CONDITIONAL RETURN — after all hooks
  // ──────────────────────────────────────────────

  if (isMobile || prefersReducedMotion) return null;

  const size = cursorSizes[type] || 16;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: size,
          height: size,
          backgroundColor:
            type === 'text' || type === 'project'
              ? 'transparent'
              : 'var(--color-accent)',
          borderWidth: type === 'text' || type === 'project' ? 1 : 0,
          borderColor: 'var(--color-accent)',
          opacity: type === 'hidden' ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute inset-0 flex items-center justify-center text-xs font-medium uppercase tracking-widest"
              style={{ color: 'var(--color-accent)' }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Trailing dot (smaller, laggier) */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9997] h-1 w-1 rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: 'var(--color-accent)',
        }}
        animate={{
          opacity: type === 'hidden' ? 0 : 0.5,
          scale: type === 'hover' || type === 'text' ? 0 : 1,
        }}
      />
    </>
  );
}