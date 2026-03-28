'use client';
// src/components/three/lazy-hero-scene.tsx
// ─── Dynamic import wrapper for code splitting ───


import dynamic from 'next/dynamic';
import { useReducedMotion } from 'framer-motion';

const HeroScene = dynamic(
  () => import('@/components/three/hero-scene'),
  {
    ssr: false,
    loading: () => (
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-green-950/20 to-transparent"
        aria-hidden="true"
      />
    ),
  }
);

export default function LazyHeroScene() {
  const reducedMotion = useReducedMotion();

  // Don't render 3D scene if user prefers reduced motion
  if (reducedMotion) {
    return (
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-green-950/30 via-transparent to-green-900/10"
        aria-hidden="true"
      />
    );
  }

  return <HeroScene />;
}