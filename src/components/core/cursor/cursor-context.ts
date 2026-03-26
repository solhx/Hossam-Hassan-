// src/components/core/cursor/cursor-context.ts
'use client';

import { createContext } from 'react';

export type CursorType = 'default' | 'hover' | 'text' | 'project' | 'link' | 'hidden' | 'drag';

export interface CursorContextType {
  type: CursorType;
  setType: (type: CursorType) => void;
  label: string;
  setLabel: (label: string) => void;
  position: { x: number; y: number };
}

export const CursorContext = createContext<CursorContextType | null>(null);