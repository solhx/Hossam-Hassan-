// src/components/common/page-transition.tsx
'use client';

import { motion } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { pageTransition } from '../../lib';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <>{children}</>;
  }

  return (
    <motion.div
      variants={pageTransition}
      initial='initial'
      animate='animate'
      style={{ willChange: 'opacity, transform, filter' }}
    >
      {children}
    </motion.div>
  );
}