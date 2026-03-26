// src/components/three/gradient-sphere.tsx
'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks';

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  
  void main() {
    vUv = uv;
    vPosition = position;
    
    // Subtle vertex displacement
    vec3 pos = position;
    float displacement = sin(pos.x * 3.0 + uTime * 0.5) * 
                         cos(pos.y * 3.0 + uTime * 0.3) * 0.05;
    pos += normal * displacement;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  
  void main() {
    // Animated gradient
    float mixFactor1 = sin(vUv.x * 3.14159 + uTime * 0.2) * 0.5 + 0.5;
    float mixFactor2 = cos(vUv.y * 3.14159 + uTime * 0.15) * 0.5 + 0.5;
    
    vec3 color = mix(
      mix(uColor1, uColor2, mixFactor1),
      uColor3,
      mixFactor2
    );
    
    // Fresnel-like edge glow
    float fresnel = pow(1.0 - abs(dot(normalize(vPosition), vec3(0.0, 0.0, 1.0))), 2.0);
    color += fresnel * 0.15;
    
    gl_FragColor = vec4(color, 0.12);
  }
`;

function GradientSphereGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#748ffc') },
      uColor2: { value: new THREE.Color('#a855f7') },
      uColor3: { value: new THREE.Color('#63e6be') },
    }),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    uniforms.uTime.value = time;
    meshRef.current.rotation.y = time * 0.05;
    meshRef.current.rotation.z = time * 0.03;
  });

  return (
    <mesh ref={meshRef} scale={2.5} position={[2, 0, -3]}>
      <icosahedronGeometry args={[1, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export function GradientSphere() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ pointerEvents: 'none' }}
      >
        <GradientSphereGeometry />
      </Canvas>
    </div>
  );
}