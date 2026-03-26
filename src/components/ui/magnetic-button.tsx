// src/components/ui/magnetic-button.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useMagnetic } from '@/hooks/useMagnetic';
import { cn } from '@/utils/cn';
import { useCursorHandlers } from './cursor-handlers';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  'aria-label'?: string;
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  disabled,
  type = 'button',
  onClick,
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagnetic<HTMLButtonElement>({
    strength,
  });

  const cursorProps = useCursorHandlers('hover');

  return (
    <motion.button
      ref={ref}
      className={cn(
        'relative inline-flex items-center justify-center',
        className
      )}
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={(e) => {
        handleMouseMove(e);
      }}
      onMouseEnter={cursorProps.onMouseEnter}
      onMouseLeave={() => {
        handleMouseLeave();
        cursorProps.onMouseLeave?.();
      }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.button>
  );
}