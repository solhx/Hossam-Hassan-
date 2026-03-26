// src/components/ui/magnetic-element.tsx
'use client';

import React from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';
import { useCursorHandlers } from './cursor-handlers';

interface MagneticElementProps {
  children: React.ReactNode;
  strength?: number;
  distance?: number;
  className?: string;
}

export function MagneticElement({
  children,
  strength = 0.3,
  distance = 100,
  className = '',
}: MagneticElementProps) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagnetic<HTMLDivElement>({
    strength,
    distance,
  });

  const cursorProps = useCursorHandlers('hover');

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: 'inline-block', willChange: 'transform' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={cursorProps.onMouseEnter}
      onMouseLeave={() => {
        handleMouseLeave();
        cursorProps.onMouseLeave?.();
      }}
    >
      {children}
    </div>
  );
}