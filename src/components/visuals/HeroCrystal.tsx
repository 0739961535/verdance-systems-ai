"use client";

/**
 * HeroCrystal - 3D refractive turquoise crystal centerpiece for the homepage hero.
 *
 * A chamfered octahedron rendered with MeshTransmissionMaterial, slow auto-rotation,
 * mouse-driven parallax, rim-lit with the turquoise jewel accent. Sits on the right
 * side of the hero, partially behind the headline.
 *
 * Dynamically imported with `ssr: false` from HomeHero so R3F never runs server-side.
 */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  MeshTransmissionMaterial,
  Float,
  ContactShadows,
} from "@react-three/drei";
import { useEffect, useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

type CrystalProps = {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
};

function Crystal({ mouse }: CrystalProps) {
  const group = useRef<THREE.Group>(null);
  const innerCore = useRef<THREE.Mesh>(null);

  // Chamfered octahedron - start with an octahedron, smooth via vertex normals.
  const geometry = useMemo(() => {
    const g = new THREE.OctahedronGeometry(1.55, 2);
    g.computeVertexNormals();
    return g;
  }, []);

  const coreGeo = useMemo(() => new THREE.IcosahedronGeometry(0.55, 1), []);

  useFrame((state, delta) => {
    if (!group.current) return;
    // Auto-rotation on multiple axes - slow + luxurious
    group.current.rotation.y += delta * 0.18;
    group.current.rotation.x += delta * 0.08;

    // Mouse parallax
    const targetX = mouse.current.y * 0.35;
    const targetY = mouse.current.x * 0.45;
    group.current.rotation.x += (targetX - group.current.rotation.x * 0.0) * 0.01;
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      mouse.current.x * 0.18,
      0.04
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      mouse.current.y * 0.12,
      0.04
    );

    if (innerCore.current) {
      innerCore.current.rotation.y -= delta * 0.45;
      innerCore.current.rotation.z += delta * 0.25;
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0.3} floatIntensity={0.45}>
      <group ref={group}>
        {/* Outer refractive crystal */}
        <mesh geometry={geometry} castShadow>
          <MeshTransmissionMaterial
            backside
            samples={8}
            resolution={512}
            transmission={1}
            roughness={0.08}
            thickness={1.4}
            ior={1.65}
            chromaticAberration={0.18}
            anisotropy={0.4}
            distortion={0.32}
            distortionScale={0.35}
            temporalDistortion={0.08}
            color={"#7DABFF"}
            attenuationDistance={1.6}
            attenuationColor={"#1E4FD6"}
          />
        </mesh>

        {/* Inner glowing core - the jewel inside the jewel */}
        <mesh ref={innerCore} geometry={coreGeo}>
          <meshStandardMaterial
            color={"#4F8DFF"}
            emissive={"#4F8DFF"}
            emissiveIntensity={2.2}
            roughness={0.2}
            metalness={0.0}
          />
        </mesh>

        {/* Thin wireframe halo - adds architectural detail */}
        <mesh geometry={geometry} scale={1.04}>
          <meshBasicMaterial
            color={"#4F8DFF"}
            wireframe
            transparent
            opacity={0.06}
          />
        </mesh>
      </group>
    </Float>
  );
}

function RimLights() {
  return (
    <>
      <ambientLight intensity={0.25} />
      {/* Key turquoise rim from upper right */}
      <directionalLight
        position={[5, 4, 3]}
        intensity={2.4}
        color={"#4F8DFF"}
      />
      {/* Cool fill from lower left */}
      <directionalLight
        position={[-4, -2, 2]}
        intensity={1.4}
        color={"#1E4FD6"}
      />
      {/* Warm rim from behind for separation */}
      <pointLight position={[0, 0, -4]} intensity={3} color={"#FFFFFF"} />
      {/* Underneath glow */}
      <pointLight position={[0, -3, 1]} intensity={1.6} color={"#4F8DFF"} />
    </>
  );
}

function MouseTracker({
  mouse,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const { gl } = useThree();
  useFrame(() => {
    // mouse is updated externally via DOM listener
    gl.setClearColor("#050709", 0);
  });
  return null;
}

export function HeroCrystal() {
  const mouse = useRef({ x: 0, y: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Window-level pointer tracking so the crystal stays interactive without
  // capturing pointer events from CTAs and links underneath.
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = wrapperRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 2 - 1;
      const y = -(((e.clientY - r.top) / r.height) * 2 - 1);
      // Clamp to keep parallax sane when the cursor is off-canvas
      mouse.current.x = Math.max(-1.4, Math.min(1.4, x));
      mouse.current.y = Math.max(-1.4, Math.min(1.4, y));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden
      className="absolute inset-0 pointer-events-none"
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.2, 5.2], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <MouseTracker mouse={mouse} />
          <RimLights />
          <Crystal mouse={mouse} />
          <ContactShadows
            position={[0, -2.2, 0]}
            opacity={0.35}
            scale={6}
            blur={2.6}
            far={3}
            color={"#4F8DFF"}
          />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default HeroCrystal;
