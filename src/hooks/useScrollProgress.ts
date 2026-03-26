// src/hooks/useScrollProgress.ts
'use client';

import { useRef, useState, useEffect } from 'react';
import { ScrollTrigger } from '@/systems/animation';

/**
 * Hook that returns 0-1 progress of how far through a section the user has scrolled.
 * Useful for scroll-linked effects like opacity, scale, color transitions.
 */
export function useScrollProgress(options?: {
  start?: string;
  end?: string;
}) {
  const { start = 'top bottom', end = 'bottom top' } = options || {};
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start,
      end,
      scrub: true,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [start, end]);

  return { ref, progress };
}