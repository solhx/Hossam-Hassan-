'use client';

import { useContext, useCallback } from 'react';
import { CursorContext, type CursorType } from '@/components/core/cursor/cursor-context';

export type { CursorType };

export function useCursorState() {
  const context = useContext(CursorContext);

  if (!context) {
    throw new Error('useCursorState must be used within CursorProvider');
  }

  const setCursor = useCallback(
    (type: CursorType, label?: string) => {
      context.setType(type);
      if (label !== undefined) context.setLabel(label);
    },
    [context]
  );

  const resetCursor = useCallback(() => {
    context.setType('default');
    context.setLabel('');
  }, [context]);

  const cursorHandlers = useCallback(
    (type: CursorType, label?: string) => ({
      onMouseEnter: () => setCursor(type, label),
      onMouseLeave: resetCursor,
    }),
    [setCursor, resetCursor]
  );

  return {
    type: context.type,
    label: context.label,
    position: context.position,
    setCursor,
    resetCursor,
    cursorHandlers,
  };
}
