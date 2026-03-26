// src/components/core/cursor/cursor-provider.tsx
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CursorContext, CursorType } from './cursor-context';

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [type, setType] = useState<CursorType>('default');
  const [label, setLabel] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <CursorContext.Provider
      value={{ type, setType, label, setLabel, position }}
    >
      {children}
    </CursorContext.Provider>
  );
}