'use client';

// ─── Premium Animated Button ───
// NO next/link, NO next/navigation — pure React + Framer Motion

import { type ReactNode, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import * as presets from '@/systems/animation/presets';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface AnimatedButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string;
  external?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    'bg-gradient-to-r from-green-500 to-green-600',
    'text-white font-semibold',
    'shadow-lg shadow-green-500/20',
    'hover:shadow-xl hover:shadow-green-500/30',
    'hover:from-green-400 hover:to-green-500',
    'active:from-green-600 active:to-green-700'
  ),
  secondary: cn(
    'bg-[var(--bg-tertiary)]',
    'text-[var(--fg-primary)]',
    'border border-[var(--border-default)]',
    'hover:border-[var(--border-accent)]',
    'hover:bg-[var(--bg-elevated)]'
  ),
  ghost: cn(
    'bg-transparent',
    'text-[var(--fg-secondary)]',
    'hover:text-[var(--fg-accent)]',
    'hover:bg-[var(--bg-tertiary)]'
  ),
  outline: cn(
    'bg-transparent',
    'text-[var(--fg-accent)]',
    'border border-[var(--border-accent)]',
    'hover:bg-green-500/10'
  ),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-body-sm gap-1.5 rounded-card-sm',
  md: 'px-6 py-2.5 text-body-md gap-2 rounded-card-sm',
  lg: 'px-8 py-3 text-body-lg gap-2.5 rounded-card',
};

export const AnimatedButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  AnimatedButtonProps
>(function AnimatedButton(
  {
    children,
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'right',
    href,
    external = false,
    disabled = false,
    className,
    onClick,
    type = 'button',
  },
  ref
) {
  const classes = cn(
    'relative inline-flex items-center justify-center',
    'font-medium transition-all duration-300 cursor-pointer',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500',
    'disabled:pointer-events-none disabled:opacity-50',
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <motion.span
          className="flex-shrink-0"
          whileHover={{ x: 3 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          {icon}
        </motion.span>
      )}
    </>
  );

  const motionProps = {
    whileHover: presets.hoverScale,
    whileTap: presets.tapScale,
  };

  // ─── Link (anchor tag) ───
  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={classes}
        onClick={onClick}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  // ─── Button ───
  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      className={classes}
      onClick={onClick}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
});