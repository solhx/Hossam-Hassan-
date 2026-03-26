// src/hooks/useGSAPTimeline.ts
'use client';

import { useRef, useEffect, useCallback } from 'react';
import { gsap } from '@/systems/animation';

/**
 * Hook to create and manage a GSAP timeline with automatic cleanup.
 * Scopes animations to a container ref (prevents memory leaks and conflicts).
 */
export function useGSAPTimeline(
  factory: (tl: gsap.core.Timeline, ctx: gsap.Context) => void,
  deps: React.DependencyList = []
) {
  const containerRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      timelineRef.current = tl;
      factory(tl, ctx);
    }, containerRef);

    return () => {
      ctx.revert();
      timelineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const play = useCallback(() => timelineRef.current?.play(), []);
  const pause = useCallback(() => timelineRef.current?.pause(), []);
  const restart = useCallback(() => timelineRef.current?.restart(), []);
  const reverse = useCallback(() => timelineRef.current?.reverse(), []);

  return {
    ref: containerRef,
    timeline: timelineRef,
    play,
    pause,
    restart,
    reverse,
  };
}