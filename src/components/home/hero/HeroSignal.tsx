"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { CHANNELS } from "@/components/home/inbox/channels";
import AITextLoading from "@/components/kokonut/ai-text-loading";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";
import { HERO_COUNT_START } from "./HeroCounterCard";

/**
 * HeroSignal: the hero's signature moment. Channel chips sit around the
 * laptop; enquiries travel from each one into the inbox and get answered,
 * and the example counter above the laptop ticks up as they land.
 *
 * Loaded after the page has finished loading (see LazyHeroSignal), drawn as
 * an absolutely positioned overlay on a stage whose size is already fixed,
 * so it adds no layout shift and nothing to the LCP. Pauses off screen and
 * in background tabs. Reduced motion: the chips, still, and no travel.
 */

type Pt = { x: number; y: number };
type Pick = { ch: number; desk: [number, number]; mob: [number, number] };

// Anchors as fractions of the laptop lid. Desktop / phone.
const PICKS: Pick[] = [
  { ch: 0, desk: [0.0, 0.2], mob: [0.03, 0.16] }, // WhatsApp
  { ch: 2, desk: [0.26, -0.035], mob: [0.42, 0.07] }, // Website
  { ch: 3, desk: [1.0, 0.36], mob: [0.97, 0.3] }, // Instagram
  { ch: 1, desk: [-0.015, 0.72], mob: [0.02, 0.74] }, // Calls
  { ch: 5, desk: [0.985, 0.86], mob: [0.97, 0.86] }, // Email
];
const TARGET: [number, number] = [0.6, 0.52];

type Geo = { w: number; h: number; chips: Pt[]; target: Pt; paths: string[]; desktop: boolean };

function curve(a: Pt, b: Pt, bend: number) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const k = 0.28 * bend;
  return `M${a.x.toFixed(1)},${a.y.toFixed(1)} Q${(mx - dy * k).toFixed(1)},${(my + dx * k).toFixed(1)} ${b.x.toFixed(1)},${b.y.toFixed(1)}`;
}

export default function HeroSignal() {
  const reduce = useReducedMotionPref();
  const rootRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<HTMLSpanElement[]>([]);
  const ringRefs = useRef<HTMLSpanElement[]>([]);
  const dotRefs = useRef<SVGGElement[]>([]);
  const trailRefs = useRef<SVGPathElement[]>([]);
  const rippleRef = useRef<SVGCircleElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const [geo, setGeo] = useState<Geo | null>(null);
  const [statusEl, setStatusEl] = useState<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  // Measure the laptop lid and lay the chips and curves around it.
  useEffect(() => {
    const stage = rootRef.current?.parentElement;
    const lid = stage?.querySelector<HTMLElement>(".laptop-lid");
    if (!stage || !lid) return;
    let raf = 0;
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const sr = stage.getBoundingClientRect();
        const lr = lid.getBoundingClientRect();
        const desktop = window.innerWidth >= 1024;
        const ox = lr.left - sr.left;
        const oy = lr.top - sr.top;
        const at = ([fx, fy]: [number, number]): Pt => ({ x: ox + fx * lr.width, y: oy + fy * lr.height });
        const chips = PICKS.map((p) => at(desktop ? p.desk : p.mob));
        const target = at(TARGET);
        const paths = chips.map((c, i) => curve(c, target, i % 2 ? 1 : -1));
        setGeo({ w: sr.width, h: sr.height, chips, target, paths, desktop });
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  // Fade the chips in once placed.
  useEffect(() => {
    if (!geo || shown) return;
    const t = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(t);
  }, [geo, shown]);

  // Mount the live status line into the server-rendered counter card.
  useEffect(() => {
    if (reduce) return;
    const el = document.querySelector<HTMLElement>("[data-hero-status]");
    if (!el) return;
    el.setAttribute("data-live", "");
    setStatusEl(el);
    return () => el.removeAttribute("data-live");
  }, [reduce]);

  // The Anime.js loop. Rebuilt when the geometry changes.
  useEffect(() => {
    if (!geo || reduce) return;
    const root = rootRef.current;
    const ripple = rippleRef.current;
    const tag = tagRef.current;
    if (!root || !ripple || !tag) return;
    const countEl = document.querySelector<HTMLElement>("[data-hero-count]");
    let count = Number(countEl?.textContent) || HERO_COUNT_START;

    let cancelled = false;
    let tl: { play: () => unknown; pause: () => unknown; revert: () => unknown } | null = null;
    let onScreen = true;
    let started = false;
    const sync = () => {
      if (!tl || !started) return;
      if (onScreen && !document.hidden) tl.play();
      else tl.pause();
    };
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      // let the chips settle in before the first enquiry flies
      window.setTimeout(() => {
        started = true;
        sync();
      }, 900);
    });
    io.observe(root);
    document.addEventListener("visibilitychange", sync);

    import("./heroTimeline").then(({ buildHeroTimeline }) => {
      if (cancelled) return;
      tl = buildHeroTimeline({
        chips: chipRefs.current,
        rings: ringRefs.current,
        dots: dotRefs.current,
        trails: trailRefs.current,
        ripple,
        tag,
        target: geo.target,
        secs: PICKS.map((p) => CHANNELS[p.ch].secs),
        onAnswered: () => {
          count += 1;
          if (!countEl) return;
          countEl.textContent = String(count);
          countEl.animate(
            [
              { transform: "translate3d(0, 40%, 0)", opacity: 0.2 },
              { transform: "none", opacity: 1 },
            ],
            { duration: 420, easing: "cubic-bezier(0.34, 1.3, 0.64, 1)" },
          );
        },
      });
      // let the chips settle in before the first enquiry flies
      window.setTimeout(() => {
        started = true;
        sync();
      }, 900);
    });

    return () => {
      cancelled = true;
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      tl?.revert();
    };
  }, [geo, reduce]);

  return (
    <div ref={rootRef} className="hs-overlay" aria-hidden>
      {geo && (
        <>
          <svg className="hs-svg" viewBox={`0 0 ${geo.w} ${geo.h}`} preserveAspectRatio="none">
            <defs>
              {PICKS.map((p, i) => (
                <linearGradient
                  key={p.ch}
                  id={`hs-g-${i}`}
                  gradientUnits="userSpaceOnUse"
                  x1={geo.chips[i].x}
                  y1={geo.chips[i].y}
                  x2={geo.target.x}
                  y2={geo.target.y}
                >
                  <stop offset="0" stopColor={`rgb(${CHANNELS[p.ch].tint})`} stopOpacity="0.9" />
                  <stop offset="1" stopColor="var(--accent)" stopOpacity="0.9" />
                </linearGradient>
              ))}
              <filter id="hs-glow" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur stdDeviation="3" />
              </filter>
            </defs>
            {geo.paths.map((d, i) => (
              <path key={`r${i}`} d={d} className="hs-rail" />
            ))}
            {geo.paths.map((d, i) => (
              <path
                key={`t${i}`}
                ref={(el) => {
                  if (el) trailRefs.current[i] = el;
                }}
                d={d}
                className="hs-trail"
                stroke={`url(#hs-g-${i})`}
                strokeDasharray={reduce ? undefined : "0 1"}
                pathLength={reduce ? undefined : 1}
                opacity={reduce ? 0 : 1}
              />
            ))}
            {PICKS.map((p, i) => (
              <g
                key={`d${i}`}
                ref={(el) => {
                  if (el) dotRefs.current[i] = el;
                }}
                opacity={0}
              >
                {/* a soft halo drawn as geometry, not a CSS filter, so moving it stays cheap */}
                <circle r={10} cx={0} cy={0} fill={`rgba(${CHANNELS[p.ch].tint}, 0.18)`} />
                <circle r={4} cx={0} cy={0} fill={`rgb(${CHANNELS[p.ch].tint})`} />
              </g>
            ))}
            <circle
              ref={rippleRef}
              cx={geo.target.x}
              cy={geo.target.y}
              r={4}
              fill="none"
              stroke="var(--accent)"
              strokeWidth={1.5}
              opacity={0}
            />
          </svg>

          {PICKS.map((p, i) => {
            const c = CHANNELS[p.ch];
            const pos = geo.chips[i];
            return (
              <span
                key={c.key}
                ref={(el) => {
                  if (el) chipRefs.current[i] = el;
                }}
                className="hs-chip"
                data-in={shown ? "" : undefined}
                style={{ left: pos.x, top: pos.y, transitionDelay: `${i * 90}ms`, ["--tint" as string]: c.tint } as CSSProperties}
              >
                <span
                  ref={(el) => {
                    if (el) ringRefs.current[i] = el;
                  }}
                  className="hs-chip-ring"
                />
                <span className="hs-chip-mark">{c.icon}</span>
                <span className="hs-chip-label">{c.short}</span>
              </span>
            );
          })}
          <span ref={tagRef} className="hs-tag" />
        </>
      )}
      {statusEl &&
        createPortal(
          <AITextLoading
            texts={["Reading the enquiry", "Checking the diary", "Replying", "Booked in"]}
            interval={1600}
            label="Example status"
          />,
          statusEl,
        )}
    </div>
  );
}
