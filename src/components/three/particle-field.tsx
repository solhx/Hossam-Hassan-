// src/components/three/particle-field.tsx
'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function Particles({ count = 400 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  // Track mouse for subtle reactivity
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.03 + mouseRef.current.x * 0.1;
    meshRef.current.rotation.x = time * 0.02 + mouseRef.current.y * 0.05;
    meshRef.current.scale.setScalar(1 + Math.sin(time * 0.5) * 0.02);
  });

  // ✅ FIX: Create BufferGeometry with attributes using useMemo
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.015}
        color="#748ffc"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingOrbs() {
  const groupRef = useRef<THREE.Group>(null);

  const orbs = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        position: [
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4 - 2,
        ] as [number, number, number],
        scale: Math.random() * 0.5 + 0.2,
        speed: Math.random() * 0.3 + 0.1,
        offset: Math.random() * Math.PI * 2,
        color: ['#748ffc', '#a855f7', '#63e6be', '#ffa94d', '#f472b6'][i],
      })),
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const orb = orbs[i];
      child.position.y =
        orb.position[1] + Math.sin(time * orb.speed + orb.offset) * 0.5;
      child.position.x =
        orb.position[0] + Math.cos(time * orb.speed * 0.7 + orb.offset) * 0.3;
    });
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.position} scale={orb.scale}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color={orb.color}
            transparent
            opacity={0.08}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export function ParticleField() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ pointerEvents: 'none' }}
      >
        <Particles count={400} />
        <FloatingOrbs />
      </Canvas>
    </div>
  );
}