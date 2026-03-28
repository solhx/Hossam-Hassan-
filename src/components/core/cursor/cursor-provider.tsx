'use client';
// src/components/core/cursor/cursor-provider.tsx

// ─── Custom Cursor System ───



import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

// ─── Types ───
type CursorVariant = 'default' | 'text' | 'link' | 'project' | 'hidden';

interface CursorContextType {
  setCursorVariant: (variant: CursorVariant) => void;
  setCursorText: (text: string) => void;
}

const CursorContext = createContext<CursorContextType>({
  setCursorVariant: () => {},
  setCursorText: () => {},
});

export const useCursor = () => useContext(CursorContext);

// ─── Cursor Size Map ───
const cursorSizes: Record<CursorVariant, number> = {
  default: 16,
  text: 80,
  link: 60,
  project: 100,
  hidden: 0,
};

// ─── Provider ───
export function CursorProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [text, setText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 500, damping: 35, mass: 0.3 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  // Detect touch device
  useEffect(() => {
    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(isTouch);
  }, []);

  // Track mouse position
  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible, isTouchDevice]);

  // Auto-detect interactive elements
  useEffect(() => {
    if (isTouchDevice) return;

    const handleElementHover = () => {
      const interactiveSelectors =
        'a, button, [role="button"], input, textarea, select, [data-cursor]';

      const handleMouseOver = (e: Event) => {
        const target = (e.target as HTMLElement)?.closest(interactiveSelectors);
        if (target) {
          const cursorType =
            (target.getAttribute('data-cursor') as CursorVariant) ?? 'link';
          const cursorLabel = target.getAttribute('data-cursor-text') ?? '';
          setVariant(cursorType);
          setText(cursorLabel);
        }
      };

      const handleMouseOut = (e: Event) => {
        const target = (e.target as HTMLElement)?.closest(interactiveSelectors);
        if (target) {
          setVariant('default');
          setText('');
        }
      };

      document.addEventListener('mouseover', handleMouseOver, { passive: true });
      document.addEventListener('mouseout', handleMouseOut, { passive: true });

      return () => {
        document.removeEventListener('mouseover', handleMouseOver);
        document.removeEventListener('mouseout', handleMouseOut);
      };
    };

    const cleanup = handleElementHover();
    return cleanup;
  }, [isTouchDevice]);

  const setCursorVariant = useCallback((v: CursorVariant) => setVariant(v), []);
  const setCursorText = useCallback((t: string) => setText(t), []);

  const size = cursorSizes[variant];

  // Don't render cursor on touch devices
  if (isTouchDevice) {
    return (
      <CursorContext.Provider value={{ setCursorVariant, setCursorText }}>
        {children}
      </CursorContext.Provider>
    );
  }

  return (
    <CursorContext.Provider value={{ setCursorVariant, setCursorText }}>
      {/* Hide default cursor globally */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {children}

      {/* Custom cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[500] mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        aria-hidden="true"
      >
        {/* Outer ring */}
        <motion.div
          className="flex items-center justify-center rounded-full border border-white/50 bg-white/10"
          animate={{
            width: size,
            height: size,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{
            width: { type: 'spring', stiffness: 400, damping: 25 },
            height: { type: 'spring', stiffness: 400, damping: 25 },
            opacity: { duration: 0.15 },
          }}
        >
          {/* Cursor text */}
          <AnimatePresence>
            {text && variant !== 'default' && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-center text-[10px] font-semibold uppercase tracking-wider text-white"
              >
                {text}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Inner dot */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          animate={{
            width: variant === 'default' ? 4 : 0,
            height: variant === 'default' ? 4 : 0,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </motion.div>
    </CursorContext.Provider>
  );
}