'use client';
// src/components/ui/motion-wrapper.tsx
// ─── Framer Motion wrapper for declarative scroll animations ───


import { type ReactNode, forwardRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import * as presets from '@/systems/animation/presets';
import { cn } from '@/utils/cn';

type PresetName =
  | 'fadeIn'
  | 'slideUp'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'
  | 'scaleIn'
  | 'blurIn'
  | 'revealUp'
  | 'staggerItem';

interface MotionWrapperProps {
  children: ReactNode;
  preset?: PresetName;
  variants?: Variants;
  className?: string;
  as?: keyof typeof motion;
  delay?: number;
  viewport?: {
    once?: boolean;
    margin?: string;
    amount?: number;
  };
  stagger?: {
    amount?: number;
    delayChildren?: number;
  };
}

export const MotionWrapper = forwardRef<HTMLDivElement, MotionWrapperProps>(
  function MotionWrapper(
    {
      children,
      preset = 'slideUp',
      variants: customVariants,
      className,
      as = 'div',
      delay = 0,
      viewport = presets.viewportConfig,
      stagger,
    },
    ref
  ) {
    const Component = motion[as] as typeof motion.div;

    const resolvedVariants = customVariants ?? presets[preset] as Variants;

    // If stagger is provided, wrap in a stagger container
    if (stagger) {
      return (
        <motion.div
          ref={ref}
          className={className}
          variants={presets.staggerContainer(stagger.amount, stagger.delayChildren)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <Component
        ref={ref}
        className={cn(className)}
        variants={resolvedVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        transition={delay ? { delay } : undefined}
      >
        {children}
      </Component>
    );
  }
);