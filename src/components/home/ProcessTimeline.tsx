"use client";

import { useLayoutEffect, useRef } from "react";
import { CalendarCheck, ClipboardList, Hammer, Map as MapIcon, Phone, type LucideIcon } from "lucide-react";

/**
 * The five-step timeline for chapter 11. A glowing engine-blue line fills as
 * the section scrolls past (vertical on phones, horizontal from 1024px), a
 * bright head rides its tip, and each node lights (ring and glow)
 * as the fill reaches it. The step the fill last passed is "active": its
 * title is full ink, steps still ahead sit dimmer.
 *
 * Progressive enhancement: the server renders the line fully drawn and every
 * node lit, so it reads correctly without JavaScript and under reduced
 * motion. Once mounted, one passive scroll listener (only while the timeline
 * is near the viewport) schedules a single rAF that writes transforms to the
 * fill and head, and a data attribute to each step when its state changes.
 */

export type ProcessIcon = "call" | "map" | "plan" | "build" | "review";
export type ProcessStep = { n: string; word: string; timing: string; sentence: string; icon: ProcessIcon };

const ICONS: Record<ProcessIcon, LucideIcon> = {
  call: Phone,
  map: MapIcon,
  plan: ClipboardList,
  build: Hammer,
  review: CalendarCheck,
};

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

const CSS = `
.pt-tl { position: relative; margin-top: 48px; --node: 40px; --half: 20px; }
.pt-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 48px; position: relative; z-index: 1; }
.pt-step { position: relative; padding-left: 60px; min-height: var(--node); }

/* Track, fill and head. The track runs from node centre to node centre
   (JS pins it exactly; CSS gives a close fallback). */
.pt-track { position: absolute; display: block; z-index: 0; border-radius: 2px; background: rgba(242, 239, 233, 0.1); }
.pt-track-v { left: calc(var(--half) - 1px); top: var(--half); bottom: 24px; width: 2px; }
.pt-track-h { display: none; }
.pt-fill {
  position: absolute; inset: 0; display: block; border-radius: inherit;
  box-shadow: 0 0 6px rgba(77, 124, 255, 0.85), 0 0 18px rgba(77, 124, 255, 0.45);
  will-change: transform;
}
.pt-fill-v { transform-origin: 50% 0; background: linear-gradient(to bottom, rgba(77,124,255,0.55), #4D7CFF 30%, #8FB0FF); }
.pt-fill-h { transform-origin: 0 50%; background: linear-gradient(to right, rgba(77,124,255,0.55), #4D7CFF 30%, #8FB0FF); }
.pt-head {
  position: absolute; display: block; width: 10px; height: 10px; margin: -5px 0 0 -5px; border-radius: 999px;
  background: #EAF0FF; opacity: 0; pointer-events: none;
  box-shadow: 0 0 0 3px rgba(143, 176, 255, 0.35), 0 0 14px 4px rgba(77, 124, 255, 0.8);
  transition: opacity 200ms ease-out; will-change: transform;
}
.pt-head-v { left: 1px; top: 0; }
.pt-head-h { left: 0; top: 1px; }
.pt-tl[data-armed][data-moving] .pt-head { opacity: 1; }

/* Node: a dark disc with the step icon. Lit: blue ring and glow. */
.pt-node {
  position: absolute; left: 0; top: 0; width: var(--node); height: var(--node); border-radius: 999px;
  display: grid; place-items: center; color: #8F8B84;
  background: #0E1A3A; box-shadow: inset 0 0 0 1px rgba(242, 239, 233, 0.16);
  transition: color 300ms cubic-bezier(.16,1,.3,1), background-color 300ms cubic-bezier(.16,1,.3,1), box-shadow 300ms cubic-bezier(.16,1,.3,1);
}
.pt-node svg { width: 18px; height: 18px; }
.pt-check {
  position: absolute; right: -3px; bottom: -3px; width: 16px; height: 16px; border-radius: 999px;
  display: grid; place-items: center; background: #4D7CFF; color: #fff;
  box-shadow: 0 0 0 2px #0E1A3A;
  transform: scale(0); transition: transform 280ms cubic-bezier(.34,1.56,.64,1);
}
.pt-check svg { width: 10px; height: 10px; }
.pt-step[data-s="done"] .pt-node, .pt-step[data-s="active"] .pt-node {
  color: #DCE6FF; background: #13203F;
  box-shadow: inset 0 0 0 1px #4D7CFF, 0 0 0 4px rgba(77, 124, 255, 0.16), 0 0 22px rgba(77, 124, 255, 0.5);
}
.pt-step[data-s="done"] .pt-check, .pt-step[data-s="active"] .pt-check { transform: scale(1); }
.pt-step[data-s="active"] .pt-node {
  color: #fff;
  box-shadow: inset 0 0 0 1.5px #8FB0FF, 0 0 0 6px rgba(77, 124, 255, 0.2), 0 0 30px rgba(77, 124, 255, 0.7);
}

/* Copy */
.pt-meta { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 16px; margin: 0; padding-top: 2px; font-family: var(--font-mono); font-size: 0.75rem; font-weight: 500; letter-spacing: 0.04em; line-height: 1.5; font-variant-numeric: tabular-nums; }
.pt-num { color: #8F8B84; }
.pt-timing { color: #DCE6FF; transition: color 300ms ease-out; }
.pt-word { margin-top: 8px; font-family: var(--font-display); font-weight: 600; font-size: 2.5rem; line-height: 1; letter-spacing: -0.04em; color: #C9C5BD; transition: color 300ms cubic-bezier(.16,1,.3,1); }
.pt-sentence { margin-top: 16px; max-width: 64ch; font-size: 1.0625rem; line-height: 1.55; color: #C9C5BD; transition: color 300ms ease-out; }
.pt-step[data-s="active"] .pt-word { color: #F2EFE9; }
.pt-step[data-s="next"] .pt-word { color: rgba(242, 239, 233, 0.36); }
.pt-step[data-s="next"] .pt-timing { color: #8F8B84; }
.pt-step[data-s="next"] .pt-sentence { color: #8F8B84; }

/* Horizontal from 1024px: nodes on one line, copy below each */
@media (min-width: 1024px) {
  .pt-tl { margin-top: 72px; --node: 44px; --half: 22px; }
  .pt-list { grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 24px; }
  .pt-step { padding-left: 0; padding-top: 72px; }
  .pt-track-v { display: none; }
  .pt-track-h { display: block; left: var(--half); right: 18%; top: calc(var(--half) - 1px); height: 2px; }
  .pt-node svg { width: 20px; height: 20px; }
  .pt-meta { min-height: 40px; align-content: flex-start; flex-direction: column; gap: 4px; }
  /* Faint grid line from each node to the end of the band */
  .pt-step::before {
    content: ""; position: absolute; left: calc(var(--half) - 0.5px); top: calc(var(--node) + 8px); bottom: -160px; width: 1px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02)); pointer-events: none;
  }
  .pt-word { margin-top: 24px; font-size: 3rem; }
  .pt-sentence { font-size: 1.125rem; max-width: 26ch; }
}

@media (prefers-reduced-motion: reduce) {
  .pt-fill { transform: none !important; }
  .pt-head { display: none; }
  .pt-node, .pt-check, .pt-word, .pt-timing, .pt-sentence { transition: none; }
}
`;

export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const wide = window.matchMedia("(min-width: 1024px)");
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
    const nodes = items.map((li) => li.querySelector<HTMLElement>("[data-node]")!);
    const tracks = {
      v: root.querySelector<HTMLElement>("[data-track='v']")!,
      h: root.querySelector<HTMLElement>("[data-track='h']")!,
    };
    const fill = { v: tracks.v.querySelector<HTMLElement>("[data-fill]")!, h: tracks.h.querySelector<HTMLElement>("[data-fill]")! };
    const head = { v: tracks.v.querySelector<HTMLElement>("[data-head]")!, h: tracks.h.querySelector<HTMLElement>("[data-head]")! };
    const state: string[] = items.map(() => "");

    // Track geometry relative to the root, refreshed on resize only.
    let len = 1;
    let start = 0;
    let stops: number[] = [];
    const measure = () => {
      const horiz = wide.matches;
      const track = horiz ? tracks.h : tracks.v;
      const rr = root.getBoundingClientRect();
      const centres = nodes.map((n) => {
        const r = n.getBoundingClientRect();
        return horiz ? r.left + r.width / 2 - rr.left : r.top + r.height / 2 - rr.top;
      });
      start = centres[0];
      len = Math.max(1, centres[centres.length - 1] - start);
      if (horiz) {
        track.style.left = `${start}px`;
        track.style.right = "auto";
        track.style.width = `${len}px`;
      } else {
        track.style.top = `${start}px`;
        track.style.bottom = "auto";
        track.style.height = `${len}px`;
      }
      stops = centres.map((c) => (c - start) / len);
    };

    let frame = 0;
    const draw = () => {
      frame = 0;
      const horiz = wide.matches;
      const vh = window.innerHeight;
      const r = root.getBoundingClientRect();
      // Phones: the fill tip follows a reading line at 62% of the viewport,
      // so each node lights as it reaches that line. Desktop: the row fills
      // while the timeline's top travels from 85% to 35% of the viewport.
      const p = horiz ? clamp((vh * 0.85 - r.top) / (vh * 0.5)) : clamp((vh * 0.62 - (r.top + start)) / len);

      const k = horiz ? "h" : "v";
      fill[k].style.transform = horiz ? `scaleX(${p})` : `scaleY(${p})`;
      head[k].style.transform = horiz ? `translate3d(${p * len}px,0,0)` : `translate3d(0,${p * len}px,0)`;
      if (p > 0.001 && p < 0.999) root.setAttribute("data-moving", "");
      else root.removeAttribute("data-moving");

      let active = -1;
      stops.forEach((s, i) => {
        if (p >= s - 0.002) active = i;
      });
      items.forEach((li, i) => {
        const s = i < active ? "done" : i === active ? "active" : "next";
        if (state[i] !== s) {
          state[i] = s;
          li.setAttribute("data-s", s);
        }
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    root.setAttribute("data-armed", "");
    measure();
    draw();

    let listening = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !listening) {
          window.addEventListener("scroll", onScroll, { passive: true });
          listening = true;
          onScroll();
        } else if (!entry.isIntersecting && listening) {
          window.removeEventListener("scroll", onScroll);
          listening = false;
          // Settle on the final state for wherever it was left.
          onScroll();
        }
      },
      { rootMargin: "20% 0px 20% 0px" },
    );
    io.observe(root);
    window.addEventListener("resize", onResize, { passive: true });
    wide.addEventListener("change", onResize);

    return () => {
      io.disconnect();
      if (listening) window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      wide.removeEventListener("change", onResize);
      if (frame) cancelAnimationFrame(frame);
      root.removeAttribute("data-armed");
      root.removeAttribute("data-moving");
      for (const t of [tracks.v, tracks.h]) t.removeAttribute("style");
      for (const el of [fill.v, fill.h, head.v, head.h]) el.style.transform = "";
      items.forEach((li, i) => li.setAttribute("data-s", i === items.length - 1 ? "active" : "done"));
    };
  }, []);

  const last = steps.length - 1;

  return (
    <div ref={rootRef} className="pt-tl">
      <style>{CSS}</style>
      {/* Phone track (vertical) */}
      <span className="pt-track pt-track-v" data-track="v" aria-hidden>
        <span className="pt-fill pt-fill-v" data-fill />
        <span className="pt-head pt-head-v" data-head />
      </span>
      {/* Desktop track (horizontal) */}
      <span className="pt-track pt-track-h" data-track="h" aria-hidden>
        <span className="pt-fill pt-fill-h" data-fill />
        <span className="pt-head pt-head-h" data-head />
      </span>
      <ol className="pt-list">
        {steps.map((s, i) => {
          const Icon = ICONS[s.icon];
          return (
            <li key={s.n} className="pt-step" data-step data-s={i === last ? "active" : "done"}>
              <span className="pt-node" data-node aria-hidden>
                <Icon strokeWidth={1.75} />
              </span>
              <p className="pt-meta">
                <span className="pt-timing">{s.timing}</span>
              </p>
              <h3 className="pt-word">{s.word}</h3>
              <p className="pt-sentence">{s.sentence}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
