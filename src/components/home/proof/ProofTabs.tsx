"use client";

import { createContext, useCallback, useContext, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";
import type { LucideIcon } from "lucide-react";

/**
 * A set of drawn illustrations for one proof case.
 * Phones and tablets: a segmented tab bar (44px targets) over one panel, swipe left or right to move.
 * Desktop (1024px up): the tab bar goes away and every panel shows in a 2x2 grid.
 * A panel plays its short entrance when it is revealed: on scroll into view, or when its tab is chosen.
 */

export type ProofTab = { id: string; label: string; icon: LucideIcon; panel: React.ReactNode };

type Play = { play: boolean; reduce: boolean };
const PlayContext = createContext<Play>({ play: true, reduce: true });
export const usePlay = () => useContext(PlayContext);

const DESKTOP = "(min-width: 1024px)";
function subscribe(cb: () => void) {
  const mq = window.matchMedia(DESKTOP);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const useDesktop = () =>
  useSyncExternalStore(subscribe, () => window.matchMedia(DESKTOP).matches, () => false);


export function ProofTabs({ label, tabs }: { label: string; tabs: ProofTab[] }) {
  const uid = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  // plays once, when a fifth of it is on screen (no animation library: CSS transitions)
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = rootRef.current;
    if (!el || inView) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [inView]);
  const desktop = useDesktop();
  const reduce = useReducedMotionPref();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const go = useCallback(
    (i: number, focus = false) => {
      const n = (i + tabs.length) % tabs.length;
      setActive(n);
      if (focus) tabRefs.current[n]?.focus();
    },
    [tabs.length],
  );

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") { e.preventDefault(); go(active + 1, true); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(active - 1, true); }
    else if (e.key === "Home") { e.preventDefault(); go(0, true); }
    else if (e.key === "End") { e.preventDefault(); go(tabs.length - 1, true); }
  }

  return (
    <div ref={rootRef}>
      <div role="tablist" aria-label={label} className="pv-tabs" onKeyDown={onKey}>
        {tabs.map((t, i) => {
          const Icon = t.icon;
          const on = i === active;
          return (
            <button
              key={t.id}
              ref={(el) => { tabRefs.current[i] = el; }}
              type="button"
              role="tab"
              id={`${uid}-tab-${t.id}`}
              aria-selected={on}
              aria-controls={`${uid}-panel-${t.id}`}
              tabIndex={on ? 0 : -1}
              className="pv-tab"
              onClick={() => go(i)}
            >
              <Icon size={15} strokeWidth={2} aria-hidden />
              {t.label}
            </button>
          );
        })}
      </div>
      <div
        className="pv-grid"
        onTouchStart={(e) => { const p = e.touches[0]; touch.current = { x: p.clientX, y: p.clientY }; }}
        onTouchEnd={(e) => {
          const s = touch.current; touch.current = null;
          if (!s || desktop) return;
          const p = e.changedTouches[0];
          const dx = p.clientX - s.x, dy = p.clientY - s.y;
          if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) go(active + (dx < 0 ? 1 : -1));
        }}
      >
        {tabs.map((t, i) => (
          <div
            key={t.id}
            role="tabpanel"
            id={`${uid}-panel-${t.id}`}
            aria-labelledby={`${uid}-tab-${t.id}`}
            data-active={i === active}
            className="pv-panel"
          >
            <PlayContext.Provider value={{ play: inView && (desktop || i === active), reduce }}>{t.panel}</PlayContext.Provider>
          </div>
        ))}
      </div>
    </div>
  );
}
