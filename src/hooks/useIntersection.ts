// src/hooks/useMagnetic.ts
'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from './useReducedMotion';

interface MagneticOptions {
  strength?: number;
  ease?: number;
  distance?: number;
}

interface MagneticReturn<T extends HTMLElement = HTMLElement> {
  ref: React.RefObject<T | null>;
  x: number;
  y: number;
  isHovered: boolean;
  handleMouseMove: (e: React.MouseEvent<T>) => void;
  handleMouseLeave: () => void;
}

/**
 * Premium magnetic effect hook.
 * Returns ref + state + handlers for full control.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(
  options?: MagneticOptions
): MagneticReturn<T> {
  const {
    strength = 0.3,
    ease = 0.15,
    distance = 100,
  } = options || {};

  const ref = useRef<T | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      if (!ref.current || prefersReducedMotion) return;

      const el = ref.current;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const dist = Math.sqrt(distX * distX + distY * distY);

      if (dist < distance + rect.width / 2) {
        const moveX = distX * strength;
        const moveY = distY * strength;

        setPosition({ x: moveX, y: moveY });
        setIsHovered(true);

        gsap.to(el, {
          x: moveX,
          y: moveY,
          duration: ease,
          ease: 'power3.out',
        });
      }
    },
    [strength, ease, distance, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;

    setIsHovered(false);
    setPosition({ x: 0, y: 0 });

    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)',
    });
  }, []);

  // Also listen to global mouse move for proximity detection
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const dist = Math.sqrt(distX * distX + distY * distY);

      // If cursor moves outside range, reset
      if (dist > distance + rect.width / 2 + 50) {
        if (isHovered) {
          handleMouseLeave();
        }
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [distance, isHovered, handleMouseLeave, prefersReducedMotion]);

  return {
    ref,
    x: position.x,
    y: position.y,
    isHovered,
    handleMouseMove,
    handleMouseLeave,
  };
}
