// src/components/ui/section-divider.tsx
// ─── Cinematic section dividers ───

import { cn } from '@/utils/cn';

type DividerVariant = 'gradient' | 'line' | 'dots';

interface SectionDividerProps {
  variant?: DividerVariant;
  className?: string;
}

export function SectionDivider({
  variant = 'gradient',
  className,
}: SectionDividerProps) {
  return (
    <div
      className={cn(
        'relative mx-auto max-w-[var(--container-max)] px-[var(--container-px)]',
        className
      )}
      aria-hidden="true"
      role="separator"
    >
      {variant === 'gradient' && (
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--fg-accent)]/20 to-transparent" />
      )}

      {variant === 'line' && (
        <div className="h-px w-full bg-[var(--border-default)]" />
      )}

      {variant === 'dots' && (
        <div className="flex items-center justify-center gap-2 py-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-1 w-1 rounded-full bg-[var(--fg-accent)]/40"
            />
          ))}
        </div>
      )}
    </div>
  );
}