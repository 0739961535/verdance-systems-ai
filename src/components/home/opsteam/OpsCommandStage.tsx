"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AgentWorkspaces } from "./AgentWorkspaces";
import { CommandMock, SCREEN_PANELS } from "./CommandMock";
import { LaptopFrame } from "./LaptopFrame";
import { SAMPLE_AGENTS } from "./opsData";

/**
 * The stage: your command centre on a laptop, and under it the three agents,
 * each on its own small screen. Everything live runs only while the stage is
 * on screen (and the tab is visible). When an agent finishes a job in its
 * workspace, its count ticks on the laptop. Reports and Research tick on
 * their own, more slowly. Reduced motion: one still frame, nothing loops.
 *
 * Phones: the laptop stays a picture of the whole screen and lights one
 * panel; under it the same panel is shown zoomed at readable size (body 15px,
 * nothing under 13px), with the switcher (auto-advancing while in view until
 * someone taps). Then the workspaces as a swipeable row.
 */
export function OpsCommandStage() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [counts, setCounts] = useState(() => SAMPLE_AGENTS.map((a) => a.start));
  const [task, setTask] = useState(() => SAMPLE_AGENTS.map(() => 0));
  const [last, setLast] = useState(-1);
  const [tab, setTab] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setNarrow(e.contentRect.width < 900));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReduce = () => setReduce(mq.matches);
    syncReduce();
    mq.addEventListener("change", syncReduce);
    // Hold the entrance back only when the stage starts below the fold and motion is welcome.
    if (!mq.matches && el.getBoundingClientRect().top > window.innerHeight * 0.9) el.dataset.armed = "";
    else el.dataset.seen = "";
    let inView = false;
    const sync = () => setActive(inView && document.visibilityState === "visible");
    const io = new IntersectionObserver(
      ([e]) => {
        inView = e.isIntersecting;
        if (inView) el.dataset.seen = "";
        sync();
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      mq.removeEventListener("change", syncReduce);
    };
  }, []);

  const bump = useCallback((k: number) => {
    setCounts((c) => c.map((v, j) => (j === k ? v + 1 : v)));
    setTask((t) => t.map((v, j) => (j === k ? (v + 1) % SAMPLE_AGENTS[j].tasks.length : v)));
    setLast(k);
  }, []);

  const live = active && !reduce;

  // Reports and Research have no workspace on show: they tick on their own.
  useEffect(() => {
    if (!live) return;
    let i = 0;
    const id = window.setInterval(() => {
      bump(i % 3 === 2 ? 4 : 3);
      i += 1;
    }, 5200);
    return () => window.clearInterval(id);
  }, [live, bump]);

  // Phones: walk through the four panels until someone picks one.
  useEffect(() => {
    if (!live || pinned) return;
    const id = window.setInterval(() => {
      if (narrow) setTab((t) => (t + 1) % SCREEN_PANELS.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [live, pinned, narrow]);

  return (
    <div ref={root} className="ocs" style={{ ["--play" as string]: live ? "running" : "paused" }}>
      <style>{CSS}</style>
      <div className="ocs-laptop" inert={narrow}>
        <LaptopFrame label="The Operations Team command centre on a laptop, sample data">
          <CommandMock counts={counts} task={task} last={last} tab={narrow ? tab : -1} />
        </LaptopFrame>
      </div>

      {narrow && (
        <div className="ocs-zoom">
          <span className="ocs-beam" aria-hidden />
          <div className="ocs-zoom-card">
            <CommandMock variant="zoom" counts={counts} task={task} last={last} tab={tab} />
          </div>
        </div>
      )}

      <div className="ocs-tabs" role="group" aria-label="Show a panel of the command centre">
        {SCREEN_PANELS.map((p, i) => (
          <button
            key={p}
            type="button"
            className="ocs-tab"
            aria-pressed={tab === i}
            onClick={() => {
              setTab(i);
              setPinned(true);
            }}
          >
            {p}
          </button>
        ))}
      </div>

      <p className="museum ocs-note">Sample data. Your command centre shows your own business. We run Verdance on the same system.</p>

      <div className="ocs-ws-head" data-reveal="">
        <p className="ocs-ws-k">Their workspaces</p>
        <p className="ocs-ws-b">Each agent works on its own computer for you. It does the job there and reports back to your command centre.</p>
      </div>
      <svg className="ocs-wires" viewBox="0 0 1000 64" preserveAspectRatio="none" aria-hidden>
        {[166, 500, 834].map((x) => (
          <path key={x} d={`M500 0 C500 34 ${x} 30 ${x} 64`} pathLength={100} />
        ))}
      </svg>
      <AgentWorkspaces active={active} reduce={reduce} onDone={bump} />
    </div>
  );
}

const CSS = `
.ocs { container-type: inline-size; container-name: ocs; position: relative; }
.ocs-laptop { width: 100%; max-width: 1120px; margin: 0 auto; transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1); }
.ocs[data-armed]:not([data-seen]) .ocs-laptop { opacity: 0; transform: translate3d(0, 28px, 0) scale(0.98); }
.ocs-tabs, .ocs-zoom { display: none; }
.ocs-note { margin: 36px auto 0; text-align: center; max-width: 60ch; }
.ocs-ws-head { margin: 64px auto 0; max-width: 46ch; text-align: center; display: grid; gap: 6px; }
.ocs-ws-k { margin: 0; font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-accent); }
.ocs-ws-b { margin: 0; font-size: 1rem; line-height: 1.55; color: var(--color-ink-soft); }
.ocs-wires { display: block; width: 100%; height: 64px; margin: 14px 0 6px; overflow: visible; }
.ocs-wires path { fill: none; stroke: rgba(143,176,255,0.45); stroke-width: 1.5; vector-effect: non-scaling-stroke; stroke-dasharray: 2 3;
  animation: ocs-flow 1.6s linear infinite; animation-play-state: var(--play, paused); }
@keyframes ocs-flow { to { stroke-dashoffset: -10; } }

@container ocs (max-width: 899px) {
  .ocs-zoom { display: block; position: relative; margin: -2px auto 0; max-width: 460px; }
  .ocs-beam { display: block; height: 22px; margin: 0 8%; background: linear-gradient(180deg, rgba(143,176,255,0.22), rgba(143,176,255,0));
    clip-path: polygon(30% 0, 70% 0, 100% 100%, 0 100%); }
  .ocs-zoom-card { position: relative; height: 424px; border-radius: 20px; padding: 6px; background: #0A1226;
    border: 1px solid rgba(143,176,255,0.3); box-shadow: 0 24px 60px -30px rgba(77,124,255,0.6); }
  .ocs-tabs { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 4px; margin: 28px auto 0; max-width: 460px; padding: 4px;
    border-radius: 999px; background: rgba(255,255,255,0.05); border: 1px solid var(--hairline-2); }
  .ocs-tab { min-height: 44px; padding: 0 6px; border: 0; border-radius: 999px; background: transparent; color: var(--color-ink-soft);
    font: inherit; font-size: 0.8125rem; font-weight: 500; cursor: pointer; transition: background-color .25s ease, color .25s ease, transform .15s ease; }
  .ocs-tab[aria-pressed="true"] { background: #2554D4; color: #fff; box-shadow: 0 6px 18px -8px rgba(77,124,255,0.7); }
  .ocs-tab:active { transform: scale(0.96); }
  .ocs-note { margin-top: 18px; text-align: left; }
  .ocs-ws-head { margin-top: 48px; text-align: left; margin-left: 0; margin-bottom: 18px; }
  .ocs-wires { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .ocs-laptop, .ocs-tab { transition: none; }
  .ocs[data-armed]:not([data-seen]) .ocs-laptop { opacity: 1; transform: none; }
  .ocs-wires path { animation: none; }
}
`;
