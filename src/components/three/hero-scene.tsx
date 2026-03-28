'use client';
// src/components/three/hero-scene.tsx
// ─── Optimized Hero 3D Scene with Green Theme ───


import { Suspense, useMemo, useRef, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  PerformanceMonitor,
  AdaptiveDpr,
  AdaptiveEvents,
  Preload,
} from '@react-three/drei';
import * as THREE from 'three';

// ─── Instanced Particle System (Single draw call) ───
function ParticleField({ count = 2000 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Pre-compute positions and velocities
  const particles = useMemo(() => {
    const data = new Float32Array(count * 4); // x, y, z, speed
    for (let i = 0; i < count; i++) {
      const i4 = i * 4;
      data[i4]     = (Math.random() - 0.5) * 20;       // x
      data[i4 + 1] = (Math.random() - 0.5) * 20;       // y
      data[i4 + 2] = (Math.random() - 0.5) * 20;       // z
      data[i4 + 3] = 0.2 + Math.random() * 0.8;         // speed multiplier
    }
    return data;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i4 = i * 4;
      const x = particles[i4];
      const y = particles[i4 + 1];
      const z = particles[i4 + 2];
      const speed = particles[i4 + 3];

      dummy.position.set(
        x + Math.sin(time * speed * 0.3 + i) * 0.5,
        y + Math.cos(time * speed * 0.2 + i) * 0.5,
        z + Math.sin(time * speed * 0.1 + i * 0.5) * 0.3
      );

      const scale = 0.01 + Math.sin(time * speed + i) * 0.005;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial
        color="#34d399"      /* green-400 */
        transparent
        opacity={0.6}
      />
    </instancedMesh>
  );
}

// ─── Floating Green Orb (Hero focal point) ───
function FloatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    meshRef.current.position.y = Math.sin(time * 0.5) * 0.3;
    meshRef.current.rotation.x = time * 0.1;
    meshRef.current.rotation.z = time * 0.15;

    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 0.5 + Math.sin(time * 0.8) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 4]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#059669"         /* green-600 */
        emissive="#34d399"      /* green-400 */
        emissiveIntensity={0.5}
        roughness={0.15}
        metalness={0.8}
        wireframe
      />
    </mesh>
  );
}

// ─── Dynamic Lighting ───
function SceneLighting() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!lightRef.current) return;
    const time = state.clock.elapsedTime;
    lightRef.current.position.x = Math.sin(time * 0.3) * 5;
    lightRef.current.position.z = Math.cos(time * 0.3) * 5;
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight
        ref={lightRef}
        position={[5, 5, 5]}
        color="#34d399"
        intensity={2}
        distance={20}
      />
      <pointLight
        position={[-5, -3, -5]}
        color="#065f46"       /* green-800 */
        intensity={0.5}
        distance={15}
      />
    </>
  );
}

// ─── Camera Rig (Mouse follow) ───
function CameraRig() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    // Subtle camera movement following mouse
    const x = state.pointer.x * 0.5;
    const y = state.pointer.y * 0.3;

    // Lerp for smoothness
    mouseRef.current.x += (x - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (y - mouseRef.current.y) * 0.05;

    camera.position.x = mouseRef.current.x;
    camera.position.y = mouseRef.current.y;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Main Scene Export ───
function HeroSceneContent() {
  return (
    <>
      <CameraRig />
      <SceneLighting />
      <FloatingOrb />
      <ParticleField count={1500} />
      <fog attach="fog" args={['#0a0f0d', 8, 25]} />
    </>
  );
}

// ─── Exported Canvas (with perf monitoring) ───
export default function HeroScene() {
  const handleDecline = useCallback(() => {
    // Reduce quality when performance drops
    console.log('[HeroScene] Reducing quality');
  }, []);

  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}     // Cap DPR for performance
        gl={{
          antialias: false,  // Disable for perf on complex scenes
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        performance={{ min: 0.5 }}
        style={{ background: 'transparent' }}
      >
        <PerformanceMonitor
          onDecline={handleDecline}
          flipflops={3}
          onFallback={() => console.log('[HeroScene] Fallback mode')}
        >
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </PerformanceMonitor>

        <Suspense fallback={null}>
          <HeroSceneContent />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}