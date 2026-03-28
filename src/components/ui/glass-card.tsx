'use client';
// src/components/ui/glass-card.tsx
// ─── Premium Glass Morphism Card ───


import {
  type ReactNode,
  type HTMLAttributes,
  forwardRef,
  useState,
  useRef,
  useCallback,
} from 'react';
import { motion, type MotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

type HoverEffect = 'lift' | 'scale' | 'glow' | 'tilt' | 'none';

interface GlassCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart'> {
  children: ReactNode;
  hover?: HoverEffect;
  glow?: boolean;
  tilt?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingMap = {
  none: '',
  sm: 'p-4',
  md: 'p-6 md:p-8',
  lg: 'p-8 md:p-10',
} as const;

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  function GlassCard(
    {
      children,
      hover = 'none',
      glow = false,
      tilt = false,
      padding = 'md',
      className,
      onMouseEnter,
      onMouseLeave,
      onMouseMove,
      ...props
    },
    ref
  ) {
    const internalRef = useRef<HTMLDivElement>(null);
    const cardRef = (ref as React.RefObject<HTMLDivElement>) ?? internalRef;
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        onMouseMove?.(e);
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePos({ x, y });
      },
      [cardRef, onMouseMove]
    );

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        onMouseEnter?.(e);
        setIsHovered(true);
      },
      [onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        onMouseLeave?.(e);
        setIsHovered(false);
        setMousePos({ x: 0.5, y: 0.5 });
      },
      [onMouseLeave]
    );

    // Compute hover transforms
    const hoverProps: MotionProps = {};
    switch (hover) {
      case 'lift':
        hoverProps.whileHover = { y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } };
        break;
      case 'scale':
        hoverProps.whileHover = { scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 25 } };
        break;
      case 'glow':
        // Handled via CSS
        break;
      case 'tilt':
        // Could implement 3D tilt with transform
        break;
    }

    // Tilt transform
    const tiltX = tilt ? (mousePos.y - 0.5) * -8 : 0;
    const tiltY = tilt ? (mousePos.x - 0.5) * 8 : 0;

    return (
      <motion.div
        ref={cardRef}
        className={cn(
          'glass relative overflow-hidden rounded-card transition-[border-color,box-shadow] duration-500',
          paddingMap[padding],
          hover === 'glow' && isHovered && 'glow-green',
          className
        )}
        style={
          tilt
            ? {
                transform: `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                transition: 'transform 0.15s ease-out',
              }
            : undefined
        }
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...hoverProps}
        {...(props as any)}
      >
        {/* Gradient spotlight following cursor */}
        {glow && isHovered && (
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, var(--glow-primary), transparent 50%)`,
            }}
            aria-hidden="true"
          />
        )}

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }
);