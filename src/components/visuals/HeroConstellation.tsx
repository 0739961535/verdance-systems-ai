"use client";

/**
 * HeroConstellation — the hero 3D centerpiece.
 *
 * An interconnected node network (a "neural constellation") with light
 * pulses travelling along its edges. It represents what Verdance actually
 * is: an AI system where every lead (node) is connected and routed — calls,
 * messages and enquiries (pulses) flowing through to a booking. Slow auto-
 * rotation + mouse parallax, rendered in the azure brand palette.
 *
 * Theme-aware: in dark mode nodes/edges use additive glow for a luminous
 * network; in light mode they switch to normal blending in deep azure so the
 * network stays visible (and premium) on a white ground. Client-only
 * (ssr:false) so R3F never runs on the server.
 */

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useHtmlTheme } from "@/components/primitives/useHtmlTheme";

const NODE_COUNT = 34;
const RADIUS = 2.35;
const PULSE_COUNT = 18;

type Edge = [number, number];
type Mode = "dark" | "light";

interface Palette {
  node: string;
  nodeSize: number;
  nodeOpacity: number;
  edge: string;
  edgeOpacity: number;
  pulse: string;
  pulseSize: number;
  pulseOpacity: number;
  core: string;
  coreOpacity: number;
  blending: THREE.Blending;
}

const PALETTES: Record<Mode, Palette> = {
  dark: {
    node: "#8FBEFF",
    nodeSize: 0.3,
    nodeOpacity: 0.95,
    edge: "#4F8DFF",
    edgeOpacity: 0.17,
    pulse: "#DDEBFF",
    pulseSize: 0.5,
    pulseOpacity: 1,
    core: "#1E4FD6",
    coreOpacity: 0.18,
    blending: THREE.AdditiveBlending,
  },
  // Light: normal blending so azure reads on white; smaller, crisper nodes so
  // the network *structure* (edges) carries the look rather than fuzzy blobs.
  light: {
    node: "#1E4FD6",
    nodeSize: 0.17,
    nodeOpacity: 0.82,
    edge: "#1E4FD6",
    edgeOpacity: 0.5,
    pulse: "#1E4FD6",
    pulseSize: 0.26,
    pulseOpacity: 0.9,
    core: "#1E4FD6",
    coreOpacity: 0,
    blending: THREE.NormalBlending,
  },
};

function buildGraph(): { nodes: THREE.Vector3[]; edges: Edge[] } {
  // Even distribution via a fibonacci sphere, with organic radius jitter.
  const nodes: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < NODE_COUNT; i++) {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    const rr = RADIUS * (0.72 + Math.random() * 0.4);
    nodes.push(new THREE.Vector3(Math.cos(theta) * r * rr, y * rr, Math.sin(theta) * r * rr));
  }
  // Connect each node to its 2–3 nearest neighbours (dedup undirected edges).
  const edges: Edge[] = [];
  const seen = new Set<string>();
  for (let i = 0; i < nodes.length; i++) {
    const dists: [number, number][] = [];
    for (let j = 0; j < nodes.length; j++) {
      if (i !== j) dists.push([j, nodes[i].distanceTo(nodes[j])]);
    }
    dists.sort((a, b) => a[1] - b[1]);
    const k = 2 + Math.floor(Math.random() * 2);
    for (let n = 0; n < k; n++) {
      const j = dists[n][0];
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push([i, j]);
    }
  }
  return { nodes, edges };
}

function makeGlowTexture(): THREE.Texture {
  const size = 64;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.28, "rgba(190,215,255,0.85)");
  g.addColorStop(1, "rgba(79,141,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

function Constellation({
  mouse,
  palette,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  palette: Palette;
}) {
  const group = useRef<THREE.Group>(null);
  const pulseGeo = useRef<THREE.BufferGeometry>(null);

  const { nodes, edges } = useMemo(() => buildGraph(), []);
  const glowTex = useMemo(() => makeGlowTexture(), []);

  const nodePositions = useMemo(() => {
    const arr = new Float32Array(nodes.length * 3);
    nodes.forEach((v, i) => {
      arr[i * 3] = v.x;
      arr[i * 3 + 1] = v.y;
      arr[i * 3 + 2] = v.z;
    });
    return arr;
  }, [nodes]);

  const edgePositions = useMemo(() => {
    const arr = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => {
      arr[i * 6] = nodes[a].x;
      arr[i * 6 + 1] = nodes[a].y;
      arr[i * 6 + 2] = nodes[a].z;
      arr[i * 6 + 3] = nodes[b].x;
      arr[i * 6 + 4] = nodes[b].y;
      arr[i * 6 + 5] = nodes[b].z;
    });
    return arr;
  }, [edges, nodes]);

  const pulsePositions = useMemo(() => new Float32Array(PULSE_COUNT * 3), []);
  const pulses = useRef(
    Array.from({ length: PULSE_COUNT }, () => ({
      edge: Math.floor(Math.random() * edges.length),
      t: Math.random(),
      speed: 0.22 + Math.random() * 0.5,
    }))
  );

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    if (group.current) {
      group.current.rotation.y += d * 0.075;
      group.current.rotation.x += d * 0.03;
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, mouse.current.x * 0.28, 0.04);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, mouse.current.y * 0.18, 0.04);
    }

    const pr = pulses.current;
    for (let i = 0; i < PULSE_COUNT; i++) {
      const p = pr[i];
      p.t += p.speed * d;
      if (p.t > 1) {
        p.t = 0;
        p.edge = Math.floor(Math.random() * edges.length);
        p.speed = 0.22 + Math.random() * 0.5;
      }
      const [a, b] = edges[p.edge];
      const na = nodes[a];
      const nb = nodes[b];
      pulsePositions[i * 3] = THREE.MathUtils.lerp(na.x, nb.x, p.t);
      pulsePositions[i * 3 + 1] = THREE.MathUtils.lerp(na.y, nb.y, p.t);
      pulsePositions[i * 3 + 2] = THREE.MathUtils.lerp(na.z, nb.z, p.t);
    }
    if (pulseGeo.current) pulseGeo.current.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={group}>
      {/* soft central depth glow (dark mode only) */}
      {palette.coreOpacity > 0 && (
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[new Float32Array([0, 0, 0]), 3]} />
          </bufferGeometry>
          <pointsMaterial
            map={glowTex}
            color={palette.core}
            size={5.2}
            sizeAttenuation
            transparent
            opacity={palette.coreOpacity}
            blending={palette.blending}
            depthWrite={false}
          />
        </points>
      )}

      {/* edges */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={palette.edge}
          transparent
          opacity={palette.edgeOpacity}
          blending={palette.blending}
          depthWrite={false}
        />
      </lineSegments>

      {/* nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={glowTex}
          color={palette.node}
          size={palette.nodeSize}
          sizeAttenuation
          transparent
          opacity={palette.nodeOpacity}
          blending={palette.blending}
          depthWrite={false}
        />
      </points>

      {/* travelling pulses */}
      <points>
        <bufferGeometry ref={pulseGeo}>
          <bufferAttribute attach="attributes-position" args={[pulsePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={glowTex}
          color={palette.pulse}
          size={palette.pulseSize}
          sizeAttenuation
          transparent
          opacity={palette.pulseOpacity}
          blending={palette.blending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export function HeroConstellation() {
  const mouse = useRef({ x: 0, y: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mode = useHtmlTheme();
  const palette = PALETTES[mode];

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = wrapperRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 2 - 1;
      const y = -(((e.clientY - r.top) / r.height) * 2 - 1);
      mouse.current.x = Math.max(-1.4, Math.min(1.4, x));
      mouse.current.y = Math.max(-1.4, Math.min(1.4, y));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={wrapperRef} aria-hidden className="absolute inset-0 pointer-events-none">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.15, 6], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        {/* key on mode so materials rebuild cleanly when the blend mode flips */}
        <Constellation key={mode} mouse={mouse} palette={palette} />
      </Canvas>
    </div>
  );
}

export default HeroConstellation;
