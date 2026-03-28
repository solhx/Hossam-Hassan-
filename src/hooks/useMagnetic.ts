'use client';
// src/hooks/useMagnetic.ts
// ─── Low-level magnetic effect hook ───


import { useRef, useCallback, type RefObject } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

interface UseMagneticOptions {
  strength?: number;
  radius?: number;
  springConfig?: { stiffness: number; damping: number; mass?: number };
}

export function useMagnetic<T extends HTMLElement = HTMLDivElement>(
  options: UseMagneticOptions = {}
): {
  ref: RefObject<T | null>;
  x: ReturnType<typeof useSpring>;
  y: ReturnType<typeof useSpring>;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
} {
  const {
    strength = 0.35,
    radius = 200,
    springConfig = { stiffness: 350, damping: 25, mass: 0.5 },
  } = options;

  const ref = useRef<T>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < radius) {
        const factor = 1 - distance / radius;
        rawX.set(distX * strength * factor);
        rawY.set(distY * strength * factor);
      }
    },
    [strength, radius, rawX, rawY]
  );

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return { ref, x, y, onMouseMove, onMouseLeave };
}