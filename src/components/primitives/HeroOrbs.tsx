"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef, Suspense } from "react";
import type { Mesh, Group } from "three";

function Orb({
  position,
  color,
  scale = 1,
  speed = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
}) {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = clock.getElapsedTime() * 0.18 * speed;
    ref.current.rotation.y = clock.getElapsedTime() * 0.22 * speed;
  });
  return (
    <Float speed={1.4 * speed} rotationIntensity={0.35} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshTransmissionMaterial
          color={color}
          thickness={1.2}
          roughness={0.05}
          transmission={0.92}
          ior={1.4}
          chromaticAberration={0.06}
          backside
          distortion={0.18}
          distortionScale={0.4}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  const g = useRef<Group>(null);
  useFrame(({ clock, pointer }) => {
    if (!g.current) return;
    g.current.rotation.y = pointer.x * 0.18;
    g.current.rotation.x = -pointer.y * 0.12;
    g.current.position.y = Math.sin(clock.getElapsedTime() * 0.4) * 0.15;
  });
  return (
    <group ref={g}>
      <Orb position={[-1.8, 0.4, 0]} color="#4F8DFF" scale={1.05} speed={1.1} />
      <Orb position={[1.6, -0.2, -0.4]} color="#4F8DFF" scale={0.85} speed={0.9} />
      <Orb position={[0.2, 1.1, -1.2]} color="#4F8DFF" scale={0.6} speed={1.4} />
      <Orb position={[-0.4, -1.0, 0.6]} color="#FF6B35" scale={0.45} speed={1.2} />
    </group>
  );
}

export function HeroOrbs({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} color="#FFFFFF" />
          <directionalLight position={[-4, -3, 2]} intensity={0.8} color="#4F8DFF" />
          <Environment preset="city" />
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
