// src/hooks/useViewportSize.ts
'use client';

import { useState, useEffect } from 'react';

export function useViewportSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function handleResize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = size.width < 768;
  const isTablet = size.width >= 768 && size.width < 1024;
  const isDesktop = size.width >= 1024;

  return { ...size, isMobile, isTablet, isDesktop };
}