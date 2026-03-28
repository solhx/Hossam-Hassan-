// src/utils/cn.ts
// ─── Class name merge utility (clsx + tailwind-merge) ───

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes without conflicts.
 * Combines clsx conditional logic with tailwind-merge deduplication.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}