// src/components/ui/image-reveal.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { gsap, gsapEase, duration as dur } from '@/systems/animation';
import { useReducedMotion } from '@/hooks';

interface ImageRevealProps extends Omit<ImageProps, 'ref'> {
  direction?: 'up' | 'down' | 'left' | 'right';
  parallax?: boolean;
  parallaxSpeed?: number;
}

export function ImageReveal({
  direction = 'up',
  parallax = false,
  parallaxSpeed = 15,
  className = '',
  ...imageProps
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    const container = containerRef.current;
    const img = container.querySelector('img');

    const clipPaths: Record<string, { from: string; to: string }> = {
      up: { from: 'inset(100% 0% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
      down: { from: 'inset(0% 0% 100% 0%)', to: 'inset(0% 0% 0% 0%)' },
      left: { from: 'inset(0% 100% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
      right: { from: 'inset(0% 0% 0% 100%)', to: 'inset(0% 0% 0% 0%)' },
    };

    const ctx = gsap.context(() => {
      // Clip path reveal
      gsap.fromTo(
        container,
        { clipPath: clipPaths[direction].from },
        {
          clipPath: clipPaths[direction].to,
          duration: dur.slower,
          ease: gsapEase.cinematic,
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Image scale + counter-clip effect
      if (img) {
        gsap.from(img, {
          scale: 1.3,
          duration: dur.cinematic,
          ease: gsapEase.cinematic,
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        // Parallax
        if (parallax) {
          gsap.to(img, {
            yPercent: parallaxSpeed,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      }
    }, container);

    return () => ctx.revert();
  }, [direction, parallax, parallaxSpeed, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
    >
      <Image
        {...imageProps}
        className="h-full w-full object-cover"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
}