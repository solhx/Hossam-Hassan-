'use client';
// src/components/core/preloader.tsx
// ─── Cinematic Preloader with Green Theme ───


import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as presets from '@/systems/animation/presets';

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Accelerating progress curve
        const increment = Math.max(1, (100 - prev) * 0.1);
        return Math.min(prev + increment, 100);
      });
    }, 50);

    // Actual load check
    const handleLoad = () => {
      setProgress(100);
      setTimeout(() => setIsLoading(false), 600);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Fallback: force close after 4 seconds
    const fallback = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setIsLoading(false), 300);
    }, 4000);

    return () => {
      clearInterval(timer);
      clearTimeout(fallback);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[hsl(var(--neutral-950))]"
          exit={{
            clipPath: 'inset(0% 0% 100% 0%)',
            transition: {
              duration: 0.8,
              ease: presets.easings.dramatic,
            },
          }}
        >
          {/* Logo / Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ...presets.transitions.snappy }}
            className="mb-12"
          >
            <h1 className="text-display-md font-bold tracking-tighter">
              <span className="text-white">H</span>
              <span className="gradient-green-text">H</span>
            </h1>
          </motion.div>

          {/* Progress bar */}
          <div className="w-48">
            <div className="mb-3 h-0.5 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-400"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center font-mono text-caption text-white/40"
            >
              {Math.round(progress)}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}