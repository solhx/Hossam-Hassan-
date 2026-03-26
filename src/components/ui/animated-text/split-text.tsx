// src/components/ui/animated-text/split-text.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from '@/systems/animation';
import { gsapEase, duration, stagger } from '@/systems/animation';
import { useReducedMotion } from '@/hooks';

interface SplitTextProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  type?: 'chars' | 'words' | 'lines';
  animation?: 'reveal-up' | 'fade-in' | 'rotate-in' | 'blur-in';
  trigger?: 'scroll' | 'immediate' | 'manual';
  delay?: number;
  staggerAmount?: number;
  onComplete?: () => void;
}

export function SplitText({
  children,
  as: Tag = 'div',
  className = '',
  type = 'chars',
  animation = 'reveal-up',
  trigger = 'scroll',
  delay = 0,
  staggerAmount,
  onComplete,
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    const el = containerRef.current;
    const text = el.textContent || '';

    // Split text based on type
    let elements: HTMLSpanElement[] = [];
    el.innerHTML = '';

    if (type === 'chars') {
      const words = text.split(/\s+/);
      words.forEach((word, wordIdx) => {
        const wordWrap = document.createElement('span');
        wordWrap.style.display = 'inline-block';
        wordWrap.style.overflow = 'hidden';
        wordWrap.style.verticalAlign = 'top';

        word.split('').forEach((char) => {
          const charSpan = document.createElement('span');
          charSpan.style.display = 'inline-block';
          charSpan.style.willChange = 'transform, opacity';
          charSpan.textContent = char;
          wordWrap.appendChild(charSpan);
          elements.push(charSpan);
        });

        el.appendChild(wordWrap);
        if (wordIdx < words.length - 1) {
          el.appendChild(document.createTextNode('\u00A0'));
        }
      });
    } else if (type === 'words') {
      text.split(/\s+/).forEach((word, idx, arr) => {
        const wrap = document.createElement('span');
        wrap.style.display = 'inline-block';
        wrap.style.overflow = 'hidden';
        wrap.style.verticalAlign = 'top';

        const inner = document.createElement('span');
        inner.style.display = 'inline-block';
        inner.style.willChange = 'transform, opacity';
        inner.textContent = word;
        wrap.appendChild(inner);
        el.appendChild(wrap);
        elements.push(inner);

        if (idx < arr.length - 1) {
          el.appendChild(document.createTextNode('\u00A0'));
        }
      });
    } else if (type === 'lines') {
      // For lines, wrap the whole text and rely on CSS for line breaks
      const lineWrap = document.createElement('span');
      lineWrap.style.display = 'inline-block';
      lineWrap.style.willChange = 'transform, opacity';
      lineWrap.textContent = text;
      el.appendChild(lineWrap);
      elements = [lineWrap];
    }

    // Determine animation properties
    const animProps: Record<string, gsap.TweenVars> = {
      'reveal-up': {
        y: type === 'chars' ? 120 : 60,
        opacity: 0,
        rotateX: type === 'chars' ? -40 : 0,
        transformOrigin: '0% 50% -50',
      },
      'fade-in': {
        opacity: 0,
        y: 20,
      },
      'rotate-in': {
        rotateY: 90,
        opacity: 0,
        transformOrigin: '0% 50%',
      },
      'blur-in': {
        opacity: 0,
        filter: 'blur(10px)',
        y: 30,
      },
    };

    const defaultStagger = {
      chars: stagger.text.chars,
      words: stagger.text.words,
      lines: stagger.text.lines,
    };

    const ctx = gsap.context(() => {
      const fromVars = animProps[animation] || animProps['reveal-up'];

      gsap.from(elements, {
        ...fromVars,
        duration: type === 'chars' ? duration.medium : duration.slow,
        stagger: staggerAmount || defaultStagger[type],
        ease: gsapEase.cinematic,
        delay,
        onComplete,
        scrollTrigger:
          trigger === 'scroll'
            ? {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
              }
            : undefined,
      });
    }, el);

    return () => ctx.revert();
  }, [children, type, animation, trigger, delay, staggerAmount, onComplete, prefersReducedMotion]);

  return React.createElement(Tag, {
    ref: containerRef,
    className,
    children,
  });
}