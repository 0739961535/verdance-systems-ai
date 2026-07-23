"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, ContactShadows, MeshTransmissionMaterial } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/* ============================================================
   PALETTE — verdant + champagne, no orange
   ============================================================ */
const C = {
  cream:        "#F5F1E8",
  ivory:        "#FAF7F0",
  white:        "#FFFFFF",
  forest:       "#1B4D3E",
  forestDeep:   "#0F3A2D",
  emerald:      "#00C896",
  emeraldDark:  "#007A5C",
  champagne:    "#D4B27E",
  champagneDeep:"#B89464",
  ink:          "#0B1812",
};

/* ============================================================
   GROUND — chunky tiled platform (the diorama floor)
   ============================================================ */
function Tile({ position, size, height = 0.4, color = C.ivory, ring = false }: {
  position: [number, number, number];
  size: [number, number];
  height?: number;
  color?: string;
  ring?: boolean;
}) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow position={[0, height / 2, 0]}>
        <boxGeometry args={[size[0], height, size[1]]} />
        <meshStandardMaterial color={color} roughness={0.85} metalness={0.05} />
      </mesh>
      {ring && (
        <mesh position={[0, height + 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size[0] * 0.32, size[0] * 0.36, 64]} />
          <meshStandardMaterial color={C.champagne} metalness={0.85} roughness={0.25} />
        </mesh>
      )}
    </group>
  );
}

function GroundPlatform() {
  const tiles: { pos: [number, number, number]; size: [number, number]; h?: number; c?: string; ring?: boolean }[] = useMemo(() => [
    // Center cluster
    { pos: [-3.0, 0,  0.0], size: [1.6, 1.6], h: 0.4, ring: true },
    { pos: [-1.0, 0, -0.4], size: [1.4, 2.0], h: 0.55 },
    { pos: [ 1.4, 0,  0.0], size: [2.4, 1.4], h: 0.45 },
    { pos: [ 4.0, 0, -0.6], size: [1.6, 1.4], h: 0.65 },
    { pos: [ 6.0, 0,  0.4], size: [1.4, 1.8], h: 0.40, ring: true },
    // Back row
    { pos: [-2.0, 0,  2.4], size: [1.2, 1.0], h: 0.55, c: C.cream },
    { pos: [ 0.4, 0,  2.6], size: [1.6, 1.2], h: 0.40, c: C.cream },
    { pos: [ 3.0, 0,  2.4], size: [1.4, 1.0], h: 0.50, c: C.cream },
    { pos: [ 5.4, 0,  2.6], size: [1.0, 1.0], h: 0.65, c: C.cream },
    // Front row
    { pos: [-3.4, 0, -2.4], size: [1.2, 1.2], h: 0.50, c: C.cream },
    { pos: [-0.6, 0, -2.6], size: [1.6, 1.0], h: 0.40, c: C.cream },
    { pos: [ 2.4, 0, -2.4], size: [1.4, 1.2], h: 0.55, c: C.cream, ring: true },
    { pos: [ 5.0, 0, -2.6], size: [1.2, 1.0], h: 0.45, c: C.cream },
  ], []);

  return (
    <group>
      {tiles.map((t, i) => (
        <Tile key={i} position={t.pos} size={t.size} height={t.h} color={t.c} ring={t.ring} />
      ))}
    </group>
  );
}

/* ============================================================
   ACCENT OBJECTS — verdant spheres, champagne pyramids,
   wireframe cubes, half-spheres, cylinders
   ============================================================ */

function ForestSphere({ position, radius = 0.7, color = C.forest, glass = false }: {
  position: [number, number, number]; radius?: number; color?: string; glass?: boolean;
}) {
  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh position={position} castShadow>
        <sphereGeometry args={[radius, 48, 48]} />
        {glass ? (
          <MeshTransmissionMaterial
            samples={4}
            resolution={256}
            transmission={0.96}
            roughness={0.06}
            thickness={0.8}
            ior={1.45}
            chromaticAberration={0.06}
            color={color}
            attenuationDistance={1.2}
            attenuationColor={C.forestDeep}
          />
        ) : (
          <meshStandardMaterial color={color} roughness={0.32} metalness={0.20} />
        )}
      </mesh>
    </Float>
  );
}

function ChampagnePyramid({ position, scale = 1, rotate = 0 }: {
  position: [number, number, number]; scale?: number; rotate?: number;
}) {
  return (
    <Float speed={0.9} rotationIntensity={0.15} floatIntensity={0.35}>
      <mesh position={position} rotation={[0, rotate, 0]} castShadow>
        <coneGeometry args={[0.55 * scale, 1.0 * scale, 4]} />
        <meshStandardMaterial color={C.champagne} metalness={0.85} roughness={0.22} />
      </mesh>
    </Float>
  );
}

function WireCube({ position, size = 0.9, color = C.forest }: {
  position: [number, number, number]; size?: number; color?: string;
}) {
  return (
    <Float speed={0.7} rotationIntensity={0.4} floatIntensity={0.5}>
      <group position={position}>
        <mesh>
          <boxGeometry args={[size, size, size]} />
          <meshBasicMaterial color={color} wireframe />
        </mesh>
      </group>
    </Float>
  );
}

function HalfSphere({ position, radius = 0.55, color = C.champagne }: {
  position: [number, number, number]; radius?: number; color?: string;
}) {
  return (
    <Float speed={1.0} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh position={position} castShadow rotation={[0, 0, 0]}>
        <sphereGeometry args={[radius, 48, 48, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.30} side={THREE.DoubleSide} />
      </mesh>
    </Float>
  );
}

function Cylinder({ position, radius = 0.35, height = 0.9, color = C.cream }: {
  position: [number, number, number]; radius?: number; height?: number; color?: string;
}) {
  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.25}>
      <mesh position={position} castShadow>
        <cylinderGeometry args={[radius, radius, height, 36]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.05} />
      </mesh>
    </Float>
  );
}

/* ─── Floating "leaf" — botanical Verdance touch ──────────── */
function Leaf({ position, rotation = [0, 0, 0], color = C.emerald }: {
  position: [number, number, number]; rotation?: [number, number, number]; color?: string;
}) {
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh position={position} rotation={rotation} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.55} metalness={0.10} />
      </mesh>
    </Float>
  );
}

/* ============================================================
   THE DIORAMA — full composition
   ============================================================ */
function Diorama() {
  return (
    <group>
      <GroundPlatform />

      {/* Big verdant glass sphere — anchor on the right */}
      <ForestSphere position={[4.0, 1.4, -0.6]} radius={1.0} color={C.forest} glass />

      {/* Solid forest sphere — left anchor */}
      <ForestSphere position={[-3.0, 1.1, 0.0]} radius={0.65} color={C.forest} />

      {/* Smaller emerald spheres scattered */}
      <ForestSphere position={[0.4, 0.9, 0.4]} radius={0.32} color={C.emerald} />
      <ForestSphere position={[5.6, 1.2, 1.2]} radius={0.22} color={C.emerald} />
      <ForestSphere position={[-1.4, 1.4, -1.0]} radius={0.20} color={C.emeraldDark} />

      {/* Champagne pyramids */}
      <ChampagnePyramid position={[-1.0, 1.2, -0.2]} scale={1.0} rotate={Math.PI / 4} />
      <ChampagnePyramid position={[2.0, 1.0, -0.6]} scale={0.7} rotate={Math.PI / 6} />
      <ChampagnePyramid position={[6.0, 0.95, 0.6]} scale={0.6} rotate={-Math.PI / 5} />

      {/* Wireframe cubes — quiet structure */}
      <WireCube position={[-2.4, 1.4, 1.2]} size={0.65} color={C.forest} />
      <WireCube position={[3.4, 1.6, -1.6]} size={0.45} color={C.champagneDeep} />

      {/* Champagne half-spheres */}
      <HalfSphere position={[1.4, 0.85, 0.4]} radius={0.55} color={C.champagne} />
      <HalfSphere position={[-3.4, 0.85, -2.0]} radius={0.40} color={C.champagne} />

      {/* Cream cylinders */}
      <Cylinder position={[-0.6, 0.95, 2.4]} radius={0.28} height={0.7} color={C.ivory} />
      <Cylinder position={[5.0, 0.95, 2.4]} radius={0.25} height={0.65} color={C.ivory} />

      {/* Botanical leaves — small floating accents */}
      <Leaf position={[-2.6, 2.0, -1.4]} color={C.emerald} />
      <Leaf position={[3.0, 2.4, 1.4]} color={C.emeraldDark} />
      <Leaf position={[5.0, 2.6, -2.0]} color={C.emerald} />
    </group>
  );
}

/* ============================================================
   CAMERA — slow scroll-coupled drift + parallax
   ============================================================ */
function CameraRig() {
  const { camera, pointer } = useThree();
  const scrollY = useRef(0);

  useFrame(() => {
    if (typeof window !== "undefined") {
      scrollY.current = window.scrollY;
    }
    const sNorm = Math.min(1, scrollY.current / 1200);

    // Initial: high, distant, looking down — scene mostly below the text
    // As you scroll: camera dives in, gets lower & closer to the diorama
    const targetX = -1.0 + sNorm * 4.5 + pointer.x * 0.45;
    const targetY = 7.5 - sNorm * 3.5 + pointer.y * 0.20;
    const targetZ = 11.0 - sNorm * 3.5;

    camera.position.x += (targetX - camera.position.x) * 0.06;
    camera.position.y += (targetY - camera.position.y) * 0.06;
    camera.position.z += (targetZ - camera.position.z) * 0.06;

    // Look at a point that's well below center — keeps scene anchored to the bottom
    camera.lookAt(1.5 + sNorm * 2.5, -1.0 + sNorm * 1.2, 0);
  });

  return null;
}

/* ============================================================
   SCENE
   ============================================================ */
function Scene() {
  return (
    <>
      {/* Warm key */}
      <directionalLight position={[5, 8, 4]} intensity={1.6} color={"#FFEED0"} castShadow shadow-mapSize={[2048, 2048]}>
        <orthographicCamera attach="shadow-camera" args={[-12, 12, 12, -12, 0.1, 40]} />
      </directionalLight>
      {/* Cool rim — verdant */}
      <directionalLight position={[-4, 3, -3]} intensity={0.55} color={"#4F8DFF"} />
      {/* Soft fill */}
      <ambientLight intensity={0.62} color={"#FFFFFF"} />

      <Environment preset="studio" environmentIntensity={0.4} />

      <Diorama />

      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.45}
        scale={28}
        blur={2.2}
        far={5}
        color={C.ink}
      />

      <CameraRig />
    </>
  );
}

/* ============================================================
   EXPORTED CANVAS
   ============================================================ */
export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [-1.0, 7.5, 11.0], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      shadows
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
