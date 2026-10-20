"use client";

import { createContext, useCallback, useContext, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";
import type { LucideIcon } from "lucide-react";

/**
 * A set of drawn illustrations for one proof case, at every width:
 * a segmented control (44px targets, arrow keys, a sliding indicator moved by transform only)
 * over one shell that cross-fades between panels.
 *
 * The shell is one grid cell holding every panel, so it always has the tallest panel's height:
 * switching tabs (by hand or on auto-advance) never moves anything below it (CLS 0).
 *
 * Auto-advance: every 6s while the set is on screen. Hover, keyboard focus or a touch pause it.
 * The timer is the progress line's own CSS animation, so it pauses and resumes in place.
 * Reduced motion: no auto-advance, no progress line, every panel static and fully drawn.
 */

export type ProofTab = { id: string; label: string; icon: LucideIcon; panel: React.ReactNode };

type Play = { play: boolean; reduce: boolean };
const PlayContext = createContext<Play>({ play: true, reduce: true });
export const usePlay = () => useContext(PlayContext);

const DWELL_MS = 6000;
const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function ProofTabs({ label, tabs }: { label: string; tabs: ProofTab[] }) {
  const uid = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const touchTimer = useRef<number | undefined>(undefined);
  const reduce = useReducedMotionPref();

  const [active, setActive] = useState(0);
  // seen: has been a fifth on screen once (starts the first panel). onScreen: right now.
  const [seen, setSeen] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [hover, setHover] = useState(false);
  const [focusPause, setFocusPause] = useState(false);
  const [touchPause, setTouchPause] = useState(false);
  const [ind, setInd] = useState<{ x: number; w: number } | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      setOnScreen(e.isIntersecting);
      if (e.isIntersecting) setSeen(true);
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // measure the active tab for the sliding indicator, again on resize
  const measure = useCallback(() => {
    const list = listRef.current;
    const tab = tabRefs.current[active];
    if (!list || !tab) return;
    const a = list.getBoundingClientRect();
    const b = tab.getBoundingClientRect();
    setInd({ x: b.left - a.left, w: b.width });
  }, [active]);
  useIso(measure, [measure]);
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, [measure]);
  useEffect(() => () => window.clearTimeout(touchTimer.current), []);

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

  const auto = !reduce && seen;
  const running = auto && onScreen && !hover && !focusPause && !touchPause;

  return (
    <div
      ref={rootRef}
      className="pv-set"
      onPointerEnter={(e) => { if (e.pointerType === "mouse") setHover(true); }}
      onPointerLeave={(e) => { if (e.pointerType === "mouse") setHover(false); }}
      onFocus={(e) => { if ((e.target as HTMLElement).matches(":focus-visible")) setFocusPause(true); }}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusPause(false); }}
      onTouchStart={() => {
        window.clearTimeout(touchTimer.current);
        setTouchPause(true);
      }}
      onTouchEnd={() => {
        window.clearTimeout(touchTimer.current);
        touchTimer.current = window.setTimeout(() => setTouchPause(false), 5000);
      }}
    >
      <div ref={listRef} role="tablist" aria-label={label} className="pv-tabs" onKeyDown={onKey}>
        <span
          aria-hidden
          className="pv-ind"
          data-ready={ind ? "" : undefined}
          style={ind ? { width: ind.w, transform: `translate3d(${ind.x}px,0,0)` } : undefined}
        >
          {auto ? (
            <span
              key={active}
              className="pv-prog"
              style={{ animationDuration: `${DWELL_MS}ms`, animationPlayState: running ? "running" : "paused" }}
              onAnimationEnd={() => go(active + 1)}
            />
          ) : null}
        </span>
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
        className="pv-stage"
        onTouchStart={(e) => { const p = e.touches[0]; touch.current = { x: p.clientX, y: p.clientY }; }}
        onTouchEnd={(e) => {
          const s = touch.current; touch.current = null;
          if (!s) return;
          const p = e.changedTouches[0];
          const dx = p.clientX - s.x, dy = p.clientY - s.y;
          if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) go(active + (dx < 0 ? 1 : -1));
        }}
      >
        {tabs.map((t, i) => {
          const on = i === active;
          return (
            <div
              key={t.id}
              role="tabpanel"
              id={`${uid}-panel-${t.id}`}
              aria-labelledby={`${uid}-tab-${t.id}`}
              aria-hidden={!on}
              inert={!on}
              data-active={on}
              className="pv-panel"
            >
              <PlayContext.Provider value={{ play: seen && on, reduce }}>{t.panel}</PlayContext.Provider>
            </div>
          );
        })}
      </div>
    </div>
  );
}
