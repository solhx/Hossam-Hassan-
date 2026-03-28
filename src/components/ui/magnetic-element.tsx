// src/components/ui/magnetic-element.tsx
// ─── Magnetic hover effect wrapper ───

'use client';

import { type ReactNode, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticElementProps {
  children: ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
  disabled?: boolean;
}

export function MagneticElement({
  children,
  strength = 0.35,
  radius = 200,
  className,
  disabled = false,
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 350, damping: 25, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 350, damping: 25, mass: 0.5 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (disabled || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < radius) {
        const factor = 1 - distance / radius;
        x.set(distX * strength * factor);
        y.set(distY * strength * factor);
      }
    },
    [disabled, strength, radius, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}