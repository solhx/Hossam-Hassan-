// src/components/three/scene-provider.tsx
'use client';

import React, { Suspense, lazy } from 'react';
import { useViewportSize, useReducedMotion } from '@/hooks';

// Lazy load Three.js components to prevent bundle bloat
const ParticleField = lazy(() =>
  import('./particle-field').then((mod) => ({ default: mod.ParticleField }))
);
const GradientSphere = lazy(() =>
  import('./gradient-sphere').then((mod) => ({ default: mod.GradientSphere }))
);

interface SceneProviderProps {
  scene: 'particles' | 'gradient-sphere';
  fallback?: React.ReactNode;
}

export function SceneProvider({ scene, fallback }: SceneProviderProps) {
  const prefersReducedMotion = useReducedMotion();
  const { isMobile } = useViewportSize();

  // Don't render 3D on mobile or reduced motion
  if (prefersReducedMotion || isMobile) {
    return <>{fallback || null}</>;
  }

  const scenes = {
    particles: ParticleField,
    'gradient-sphere': GradientSphere,
  };

  const SceneComponent = scenes[scene];

  return (
    <Suspense fallback={fallback || null}>
      <SceneComponent />
    </Suspense>
  );
}