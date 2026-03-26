// src/components/core/preloader.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from '@/systems/animation';
import { gsapEase, duration } from '@/systems/animation';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const master = gsap.timeline({
        onComplete: () => {
          // Exit animation
          gsap
            .timeline()
            .to('.preloader-content', {
              y: -40,
              opacity: 0,
              duration: 0.5,
              ease: gsapEase.smooth,
            })
            .to(
              containerRef.current,
              {
                yPercent: -100,
                duration: 1,
                ease: gsapEase.cinematic,
                onComplete,
              },
              '-=0.2'
            );
        },
      });

      // Counter animation
      const counter = { val: 0 };
      master.to(counter, {
        val: 100,
        duration: 2,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = `${Math.round(counter.val)}`;
          }
        },
      });

      // Line grows
      master.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 2,
          ease: 'power2.inOut',
          transformOrigin: 'left center',
        },
        0
      );

      // Name reveals at 40%
      master.from(
        nameRef.current,
        {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: gsapEase.cinematic,
        },
        0.8
      );

      // Role reveals at 60%
      master.from(
        roleRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: gsapEase.smooth,
        },
        1.2
      );
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="preloader-content flex flex-col items-center gap-6">
        {/* Name */}
        <div className="overflow-hidden">
          <span
            ref={nameRef}
            className="text-display-md block"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Hossam Hassan
          </span>
        </div>

        {/* Role */}
        <div className="overflow-hidden">
          <span
            ref={roleRef}
            className="text-overline block"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            MEARN Stack Developer
          </span>
        </div>

        {/* Progress line */}
        <div className="relative mt-8 w-48">
          <div
            className="h-px w-full"
            style={{ backgroundColor: 'var(--color-border)' }}
          />
          <div
            ref={lineRef}
            className="absolute left-0 top-0 h-px w-full origin-left"
            style={{
              backgroundColor: 'var(--color-accent)',
              transform: 'scaleX(0)',
            }}
          />
        </div>

        {/* Counter */}
        <span
          ref={counterRef}
          className="font-mono text-sm tabular-nums"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          0
        </span>
      </div>
    </div>
  );
}