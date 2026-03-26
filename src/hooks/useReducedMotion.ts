// src/hooks/useReducedMotion.ts
'use client';

import { useState, useEffect } from 'react';

/**
 * Detects user's motion preference and provides a boolean flag.
 * Used throughout the app to disable animations when needed.
 * 
 * This is the SINGLE SOURCE OF TRUTH for reduced motion.
 * Every animation component should check this.
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}