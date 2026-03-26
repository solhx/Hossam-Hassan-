'use client';

import type { CursorType } from '@/hooks/useCursorState';
import { useCursorState } from '@/hooks/useCursorState';

export function useCursorHandlers(type: CursorType, label?: string) {
  const { cursorHandlers } = useCursorState();
  return cursorHandlers(type, label);
}
