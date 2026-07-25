"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/primitives/Reveal";
import { ConicBorder } from "@/components/primitives/ConicBorder";
import { SpectraNoise } from "@/components/primitives/SpectraNoise";
import { useHtmlTheme } from "@/components/primitives/useHtmlTheme";

/**
 * ApplyVSLSection
 *
 * Top of /apply - the VSL (video sales letter) frame. The <video> element is a
 * placeholder for Daniel to swap with a real Loom/Mux URL. Until then we render
 * a ConicBorder-wrapped 16:9 frame with a soft turquoise poster, a centered
 * play button, and the swap caption.
 */
export function ApplyVSLSection() {
  const reduce = useReducedMotion();
  const mode = useHtmlTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hover, setHover] = useState(false);

  // Theme-aware ambient wash - never a dark base on the light canvas.
  const noise =
    mode === "light"
      ? { primary: "#EDF3FC", secondary: "#BAD1F7", accent: "#1E4FD6", colorIntensity: 0.6 }
      : { primary: "#050709", secondary: "#1E4FD6", accent: "#4F8DFF", colorIntensity: 0.85 };

  const handlePlay = () => {
    // Placeholder behavior - Daniel will set a real URL on <video src>.
    // eslint-disable-next-line no-console
    console.info(
      "[VSL] Play clicked. Swap src in /components/sections/v3/ApplyVSLSection.tsx"
    );
    const v = videoRef.current;
    if (v && v.currentSrc) {
      v.play().catch(() => {});
    }
  };

  return (
    <section className="relative isolate overflow-hidden bg-canvas pt-36 md:pt-44 pb-20 md:pb-24">
      {/* Ambient turquoise wash - very low intensity */}
      <div className="pointer-events-none absolute inset-0 -z-30">
        <SpectraNoise
          primary={noise.primary}
          secondary={noise.secondary}
          accent={noise.accent}
          speed={0.18}
          warp={0.26}
          noiseIntensity={0.04}
          scanIntensity={0.06}
          scanFrequency={0.022}
          colorIntensity={noise.colorIntensity}
          opacity={0.35}
          resolutionScale={0.55}
        />
      </div>

      {/* Architectural grid mask */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(var(--hairline-rgb),0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--hairline-rgb),0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 60% at 50% 35%, rgba(0,0,0,0.85), transparent 75%)",
          maskImage:
            "radial-gradient(ellipse 60% 60% at 50% 35%, rgba(0,0,0,0.85), transparent 75%)",
        }}
      />

      {/* Halo behind video */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -z-10"
          style={{
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 50% 50%, rgba(var(--accent-rgb),0.18), rgba(var(--accent-rgb),0.04) 45%, transparent 70%)",
            filter: "blur(72px)",
          }}
          animate={{ opacity: [0.6, 0.85, 0.6] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Top fade - sits under the navbar */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-28 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(var(--bg-rgb),0.95), rgba(var(--bg-rgb),0.4) 60%, transparent)",
        }}
      />

      <div className="container-wide">
        <div className="max-w-4xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.3em] backdrop-blur"
              style={{
                borderColor: "rgba(var(--accent-rgb),0.3)",
                background: "rgba(var(--accent-rgb),0.04)",
                color: "var(--color-accent)",
              }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{
                  background: "var(--color-accent)",
                  boxShadow: "0 0 8px rgba(var(--accent-rgb),0.7)",
                }}
              />
              The offer · Watch first
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1
              className="mt-6 font-display text-[color:var(--color-ink)] leading-[1.04] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)", letterSpacing: "-0.04em" }}
            >
              See exactly what we&apos;ll build on your business -{" "}
              <span className="italic-accent">free.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-7 max-w-2xl text-lg md:text-xl text-[color:var(--color-ink-soft)] leading-relaxed">
              A 6-minute walkthrough of the system we install. After you watch, fill
              out the short application below to get a free build of it for your
              business - before you commit.
            </p>
          </Reveal>
        </div>

        {/* The VSL video frame */}
        <Reveal delay={0.18} className="mt-12 md:mt-14">
          <ConicBorder
            glow="#4F8DFF"
            duration={10}
            inset={1}
            radius={22}
            surface="var(--color-bg-glass)"
            border="rgba(var(--accent-rgb), 0.20)"
            halo
          >
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "16 / 9" }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              {/* Poster - gradient turquoise placeholder */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(var(--accent-rgb),0.22), rgba(var(--accent-rgb),0.05) 45%, transparent 75%), linear-gradient(135deg, var(--color-bg-2) 0%, var(--color-bg) 60%, var(--color-bg-2) 100%)",
                }}
              />

              {/* Subtle grid */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-50"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(var(--accent-rgb),0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--accent-rgb),0.06) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 50% 55% at 50% 50%, rgba(0,0,0,0.95), transparent 75%)",
                  maskImage:
                    "radial-gradient(ellipse 50% 55% at 50% 50%, rgba(0,0,0,0.95), transparent 75%)",
                }}
              />

              {/* Hidden video - Daniel sets src here later */}
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                playsInline
                controls={false}
                preload="none"
                // src="" - intentionally blank
              />

              {/* VSL label top-right */}
              <div className="absolute top-5 right-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-soft)]">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{
                    background: "var(--color-accent)",
                    boxShadow: "0 0 8px rgba(var(--accent-rgb),0.7)",
                  }}
                />
                VSL · 6 minutes
              </div>

              {/* Centered play button */}
              <button
                type="button"
                onClick={handlePlay}
                aria-label="Play the 6-minute walkthrough"
                className="absolute inset-0 flex items-center justify-center group outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]"
              >
                <motion.span
                  className="relative inline-flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full"
                  style={{
                    background: "rgba(var(--accent-rgb),0.16)",
                    border: "1px solid rgba(var(--accent-rgb),0.45)",
                    backdropFilter: "blur(8px)",
                  }}
                  animate={
                    reduce
                      ? undefined
                      : hover
                        ? { scale: 1.06 }
                        : { scale: [1, 1.04, 1] }
                  }
                  transition={
                    reduce
                      ? undefined
                      : hover
                        ? { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                        : { duration: 3.4, repeat: Infinity, ease: "easeInOut" }
                  }
                >
                  {/* Pulse halo */}
                  {!reduce && (
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-full"
                      style={{ border: "1px solid rgba(var(--accent-rgb),0.55)" }}
                      animate={{ scale: [1, 1.45, 1], opacity: [0.55, 0, 0.55] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                  {/* Play triangle */}
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="var(--color-accent)"
                    aria-hidden
                    style={{ marginLeft: 3 }}
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.span>
              </button>

              {/* Caption bottom-left */}
              <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
                <span>Placeholder · swap with Loom / Mux URL</span>
                <span className="text-[color:var(--color-ink-faint)]">
                  16 : 9 · 1080p
                </span>
              </div>
            </div>
          </ConicBorder>
        </Reveal>

        <Reveal delay={0.24}>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)] text-center">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full mr-3 align-middle"
              style={{
                background: "var(--color-accent)",
                boxShadow: "0 0 8px rgba(var(--accent-rgb),0.65)",
              }}
            />
            We personally review every application within 4 hours.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
