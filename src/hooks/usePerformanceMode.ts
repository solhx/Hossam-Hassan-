// src/hooks/usePerformanceMode.ts
'use client';

import { useState, useEffect } from 'react';

type PerformanceMode = 'high' | 'medium' | 'low';

/**
 * Detects device performance capability and suggests
 * appropriate animation complexity levels.
 */
export function usePerformanceMode(): PerformanceMode {
  const [mode, setMode] = useState<PerformanceMode>('high');

  useEffect(() => {
    // Check hardware concurrency (CPU cores)
    const cores = navigator.hardwareConcurrency || 4;

    // Check device memory (Chrome only)
    const memory = (navigator as any).deviceMemory || 8;

    // Check if mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    // Check connection speed
    const connection = (navigator as any).connection;
    const isSlowConnection =
      connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g';

    // Determine performance tier
    if (isMobile || cores <= 2 || memory <= 2 || isSlowConnection) {
      setMode('low');
    } else if (cores <= 4 || memory <= 4) {
      setMode('medium');
    } else {
      setMode('high');
    }
  }, []);

  return mode;
}

/**
 * Get animation config based on performance mode
 */
export function getAnimationConfig(mode: PerformanceMode) {
  const configs = {
    high: {
      enableThreeJS: true,
      enableParallax: true,
      enableCursorFollower: true,
      particleCount: 500,
      enableBlur: true,
      enableGlass: true,
      scrubSmoothness: 1,
    },
    medium: {
      enableThreeJS: false, // Disable 3D
      enableParallax: true,
      enableCursorFollower: true,
      particleCount: 0,
      enableBlur: true,
      enableGlass: true,
      scrubSmoothness: 0.5,
    },
    low: {
      enableThreeJS: false,
      enableParallax: false,
      enableCursorFollower: false,
      particleCount: 0,
      enableBlur: false, // backdrop-filter is expensive
      enableGlass: false,
      scrubSmoothness: 0,
    },
  };

  return configs[mode];
}