"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * The five-step timeline for chapter 11. The engine-blue line draws as the
 * section passes through the viewport (vertical on phones, horizontal from
 * 1024px), and each node lights as the line reaches it.
 *
 * Progressive enhancement: the server renders the line fully drawn and every
 * node lit, so it reads correctly without JavaScript. Once mounted, one
 * passive scroll listener (only while the timeline is near the viewport)
 * schedules a single rAF that writes a transform to the line and a data
 * attribute to each node. Reduced motion keeps the fully drawn state.
 */

export type ProcessStep = { n: string; word: string; timing: string; sentence: string };

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fills = Array.from(root.querySelectorAll<HTMLElement>("[data-fill]"));
    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-node]"));
    const wide = window.matchMedia("(min-width: 1024px)");

    // Where each node sits along the track, as a fraction of its length.
    let stops: number[] = [];
    const measure = () => {
      const track = root.querySelector<HTMLElement>(wide.matches ? "[data-track='h']" : "[data-track='v']");
      if (!track) return;
      const t = track.getBoundingClientRect();
      stops = nodes.map((n) => {
        const r = n.getBoundingClientRect();
        return wide.matches
          ? clamp((r.left + r.width / 2 - t.left) / (t.width || 1))
          : clamp((r.top + r.height / 2 - t.top) / (t.height || 1));
      });
    };

    let frame = 0;
    const draw = () => {
      frame = 0;
      const vh = window.innerHeight;
      const r = root.getBoundingClientRect();
      // Starts when the timeline's top reaches 85% of the viewport, completes
      // when its bottom reaches 45%.
      const p = clamp((vh * 0.85 - r.top) / (vh * 0.4 + r.height));
      const axis = wide.matches ? "scaleX" : "scaleY";
      for (const f of fills) f.style.transform = `${axis}(${p})`;
      nodes.forEach((n, i) => {
        if (p >= (stops[i] ?? 1) - 0.001) n.setAttribute("data-lit", "");
        else n.removeAttribute("data-lit");
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
          // Snap to the final state for wherever it was left (fully drawn
          // above the viewport, empty below it).
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
      for (const f of fills) f.style.transform = "";
      nodes.forEach((n) => n.setAttribute("data-lit", ""));
    };
  }, []);

  return (
    <div ref={rootRef} className="pt-tl">
      {/* Phone track (vertical) */}
      <span className="pt-track pt-track-v" data-track="v" aria-hidden>
        <span className="pt-fill pt-fill-v" data-fill />
      </span>
      {/* Desktop track (horizontal) */}
      <span className="pt-track pt-track-h" data-track="h" aria-hidden>
        <span className="pt-fill pt-fill-h" data-fill />
      </span>
      <ol className="pt-list">
        {steps.map((s) => (
          <li key={s.n} className="pt-step">
            <span className="pt-node" data-node data-lit="" aria-hidden />
            <p className="pt-meta">
              <span className="pt-num">{s.n}</span>
              <span className="pt-timing">{s.timing}</span>
            </p>
            <h3 className="pt-word">{s.word}</h3>
            <p className="pt-sentence">{s.sentence}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
