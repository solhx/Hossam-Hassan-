'use client';
// src/hooks/useCursorState.ts
// ─── Hook for components to control cursor ───


import { useCallback } from 'react';
import { useCursor } from '@/components/core/cursor/cursor-provider';

type CursorVariant = 'default' | 'text' | 'link' | 'project' | 'hidden';

interface UseCursorStateOptions {
  variant?: CursorVariant;
  text?: string;
}

export function useCursorState(options: UseCursorStateOptions = {}) {
  const { variant = 'link', text = '' } = options;
  const { setCursorVariant, setCursorText } = useCursor();

  const onMouseEnter = useCallback(() => {
    setCursorVariant(variant);
    setCursorText(text);
  }, [variant, text, setCursorVariant, setCursorText]);

  const onMouseLeave = useCallback(() => {
    setCursorVariant('default');
    setCursorText('');
  }, [setCursorVariant, setCursorText]);

  return {
    onMouseEnter,
    onMouseLeave,
    cursorProps: { onMouseEnter, onMouseLeave },
  };
}