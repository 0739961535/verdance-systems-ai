"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";

/**
 * Promise proof row: three facts, each with a small live element.
 * (a) a reply timer that counts to 0:38 then shows "Replied", calmly looping
 * (b) a day and night dial: the sun sets into the moon, Mon to Sun marks
 * (c) a 10 day track that fills to "Live" once on reveal
 * Everything runs only while on screen (IntersectionObserver) and only moves
 * transform or opacity, or swaps a few characters of text. Static under
 * prefers-reduced-motion.
 */

const FACTS = [
  { title: "Answered within 60 seconds.", body: "On WhatsApp, email, website chat and calls." },
  { title: "Day, night and weekends.", body: "No more enquiries lost after hours." },
  { title: "Live in 10 working days.", body: "Set up in your accounts, in your voice." },
] as const;

const CSS = `
.pr-vis { height: 76px; display: flex; align-items: flex-end; }
@media (min-width: 1024px) { .pr-vis { height: 92px; } }
.pr-num { font-variant-numeric: tabular-nums; font-feature-settings: "tnum"; }
.pr-chip { display: inline-flex; align-items: center; gap: 6px; height: 26px; padding: 0 10px; border-radius: 999px; font-size: 12.5px; font-weight: 600; letter-spacing: 0.01em; }
.pr-replied { background: rgba(77,124,255,0.16); color: #B9CCFF; box-shadow: inset 0 0 0 1px rgba(143,176,255,0.35); transition: opacity 320ms ease-out, transform 320ms ease-out; }
.pr-replied[data-on="false"] { opacity: 0; transform: translateY(4px) scale(0.96); }
.pr-bar { height: 2px; border-radius: 2px; background: rgba(255,255,255,0.08); overflow: hidden; }
.pr-bar > i { display: block; height: 100%; width: 100%; background: linear-gradient(90deg, #4D7CFF, #8FB0FF); transform-origin: left; transition: transform 120ms linear; }

/* day and night dial: a wheel turning behind a half window */
.pr-dial { position: relative; width: 112px; height: 56px; overflow: hidden; }
.pr-wheel { position: absolute; left: 0; top: 0; width: 112px; height: 112px; transform: rotate(-60deg); }
.pr-on .pr-wheel { animation: pr-turn 14s cubic-bezier(.45,0,.55,1) infinite; }
.pr-off .pr-wheel { animation: pr-turn 14s cubic-bezier(.45,0,.55,1) infinite; animation-play-state: paused; }
@keyframes pr-turn { from { transform: rotate(-60deg); } to { transform: rotate(300deg); } }
.pr-sky { position: absolute; inset: 0; border-radius: 56px 56px 0 0; background: linear-gradient(180deg, rgba(77,124,255,0.10), rgba(77,124,255,0)); box-shadow: inset 0 1px 0 rgba(143,176,255,0.22); }
.pr-days { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; width: 132px; }
.pr-days span { height: 3px; border-radius: 2px; background: rgba(143,176,255,0.55); }
.pr-days span:nth-child(n+6) { background: rgba(143,176,255,0.85); }

/* 10 day track */
.pr-track { display: grid; grid-template-columns: repeat(10, 1fr); gap: 5px; }
.pr-seg { height: 8px; border-radius: 3px; background: rgba(255,255,255,0.08); position: relative; overflow: hidden; }
.pr-seg > i { position: absolute; inset: 0; background: #4D7CFF; transform: scaleX(0); transform-origin: left; transition: transform 260ms ease-out; }
.pr-seg:last-child > i { background: #8FB0FF; }
.pr-fill .pr-seg > i { transform: scaleX(1); }
.pr-live { background: rgba(143,176,255,0.16); color: #DCE6FF; box-shadow: inset 0 0 0 1px rgba(143,176,255,0.4); transition: opacity 360ms ease-out 0.7s, transform 360ms ease-out 0.7s; opacity: 0; transform: translateY(4px); }
.pr-fill .pr-live { opacity: 1; transform: none; }
.pr-dot { width: 6px; height: 6px; border-radius: 50%; background: #8FB0FF; }

@media (prefers-reduced-motion: reduce) {
  .pr-on .pr-wheel, .pr-off .pr-wheel { animation: none; transform: rotate(0deg); }
  .pr-seg > i, .pr-live, .pr-replied, .pr-bar > i { transition: none; }
}
`;

function useOnScreen<T extends Element>() {
  const ref = useRef<T>(null);
  const [on, setOn] = useState(false);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setOn(e.isIntersecting);
        if (e.isIntersecting) setSeen(true);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, on, seen };
}

const TARGET = 38;

function ReplyTimer({ on, reduced }: { on: boolean; reduced: boolean }) {
  const [s, setS] = useState(TARGET);
  const [replied, setReplied] = useState(true);
  useEffect(() => {
    if (reduced || !on) return;
    let t: ReturnType<typeof setTimeout>;
    let n = 0;
    const tick = () => {
      if (n < TARGET) {
        n += 1;
        setS(n);
        t = setTimeout(tick, 72);
      } else {
        setReplied(true);
        // hold calmly, then start again
        t = setTimeout(() => {
          n = 0;
          setS(0);
          setReplied(false);
          t = setTimeout(tick, 600);
        }, 3200);
      }
    };
    t = setTimeout(() => {
      setS(0);
      setReplied(false);
      t = setTimeout(tick, 500);
    }, 0);
    return () => clearTimeout(t);
  }, [on, reduced]);
  const shown = reduced ? TARGET : s;
  return (
    <div className="w-full">
      <div className="flex items-end gap-3">
        <span
          className="pr-num font-display text-[3rem] font-semibold leading-none tracking-[-0.04em] text-[#F2F5FC] lg:text-[3.75rem]"
          aria-hidden
        >
          0:{String(shown).padStart(2, "0")}
        </span>
        <span className="pr-chip pr-replied mb-1.5" data-on={reduced || replied ? "true" : "false"} aria-hidden>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M2.5 6.2 5 8.5l4.5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Replied
        </span>
      </div>
      <div className="pr-bar mt-3 w-[132px]" aria-hidden>
        <i style={{ transform: `scaleX(${(shown / 60).toFixed(3)})` }} />
      </div>
    </div>
  );
}

function DayNight({ on }: { on: boolean }) {
  return (
    <div className={on ? "pr-on" : "pr-off"} aria-hidden>
      <div className="flex items-end gap-4">
        <div className="pr-dial">
          <div className="pr-sky" />
          <div className="pr-wheel">
            {/* sun at the top of the wheel, moon at the bottom: as it turns the sun sets and the moon rises */}
            <svg width="112" height="112" viewBox="0 0 112 112" fill="none">
              <circle cx="56" cy="56" r="44" stroke="rgba(143,176,255,0.18)" strokeDasharray="2 4" />
              <g transform="translate(56 12)">
                <circle r="7" fill="#FFD27A" />
                <circle r="11" fill="#FFD27A" opacity="0.18" />
              </g>
              <g transform="translate(56 100)">
                <circle r="7" fill="#DCE6FF" />
                <circle cx="3" cy="-2" r="6" fill="#0A1226" />
              </g>
            </svg>
          </div>
        </div>
        <span className="pr-num mb-0.5 text-[0.8125rem] font-medium text-[rgba(234,240,255,0.7)]">24 hours</span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <div className="pr-days">
          {Array.from({ length: 7 }, (_, i) => (
            <span key={i} />
          ))}
        </div>
        <span className="text-[0.8125rem] font-medium text-[rgba(234,240,255,0.7)]">Mon to Sun</span>
      </div>
    </div>
  );
}

function TenDays({ fill }: { fill: boolean }) {
  return (
    <div className={`w-full max-w-[300px] ${fill ? "pr-fill" : ""}`} aria-hidden>
      <div className="flex items-end justify-between">
        <span className="pr-num font-display text-[3rem] font-semibold leading-none tracking-[-0.04em] lg:text-[3.75rem]">10</span>
        <span className="pr-chip pr-live mb-1.5">
          <span className="pr-dot" />
          Live
        </span>
      </div>
      <div className="pr-track mt-3">
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className="pr-seg">
            <i style={{ transitionDelay: `${i * 110}ms` }} />
          </span>
        ))}
      </div>
      <div className="pr-num mt-2 flex justify-between text-[0.75rem] font-medium text-[rgba(234,240,255,0.6)]">
        <span>Day 1</span>
        <span>Day 10</span>
      </div>
    </div>
  );
}

export function ProofRow() {
  const { ref, on, seen } = useOnScreen<HTMLUListElement>();
  const reduced = useReducedMotionPref();
  const visuals = [
    <ReplyTimer key="a" on={on} reduced={reduced} />,
    <DayNight key="b" on={on && !reduced} />,
    <TenDays key="c" fill={seen || reduced} />,
  ];
  return (
    <>
    <style>{CSS}</style>
    <ul ref={ref} className="mt-12 grid gap-0 lg:mt-24 lg:grid-cols-3 lg:gap-6">
      {FACTS.map((f, i) => (
        <li key={f.title} className="border-t border-white/[0.1] py-6 lg:pt-8">
          <div className="pr-vis">{visuals[i]}</div>
          <p className="mt-5 text-[1.375rem] font-semibold tracking-[-0.02em] lg:mt-6 lg:text-[1.75rem]">{f.title}</p>
          <p className="mt-1.5 text-[1.0625rem] leading-[1.55] text-[rgba(234,240,255,0.76)] lg:text-[1.125rem]">{f.body}</p>
        </li>
      ))}
    </ul>
    </>
  );
}
