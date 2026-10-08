"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";

/**
 * ServiceConsole - a live-feeling run of one service: its parts on the
 * left, the steps of the selected part lighting up one by one on the right,
 * then on to the next part. Data comes from the service's own copy, so
 * every service page gets its own console. Pauses off screen; static (all
 * done) under reduced motion; readable without JS.
 */
export function ServiceConsole({ title, parts }: { title: string; parts: { name: string; steps: string[] }[] }) {
  const reduce = useReducedMotionPref();
  const [p, setP] = useState(0);
  const [s, setS] = useState(-1);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const list = parts.slice(0, 5);
  const cur = list[p];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || !visible) return;
    const id = setTimeout(() => {
      if (document.hidden) return;
      if (s + 1 > cur.steps.length) {
        setP((x) => (x + 1) % list.length);
        setS(-1);
      } else setS(s + 1);
    }, s + 1 > cur.steps.length ? 1800 : 1100);
    return () => clearTimeout(id);
  }, [reduce, visible, s, cur.steps.length, list.length]);

  const doneUpTo = reduce ? cur.steps.length : s;

  return (
    <div ref={ref} className="browser-frame g-border light-sweep" aria-hidden>
      <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: "1px solid var(--hairline)" }}>
        <span className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <i key={i} className="h-2.5 w-2.5 rounded-full" style={{ background: "rgba(var(--hairline-rgb),0.18)" }} />
          ))}
        </span>
        <span className="mx-auto hidden truncate font-mono text-[0.7rem] text-[color:var(--color-ink-muted)] sm:block">{title}</span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[color:var(--color-ink-muted)] sm:ml-0">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--signal)" }} />
          Running
        </span>
      </div>
      <div className="grid sm:grid-cols-[0.9fr_1.1fr]">
        <ul className="hidden flex-col gap-1 p-3 sm:flex" style={{ borderRight: "1px solid var(--hairline)" }}>
          {list.map((x, i) => (
            <li
              key={x.name}
              className="rounded-xl px-3 py-2.5 text-[0.84rem] leading-snug transition-colors"
              style={{
                color: i === p ? "var(--ink)" : "var(--ink-muted)",
                background: i === p ? "rgba(var(--accent-rgb),0.12)" : undefined,
                boxShadow: i === p ? "inset 0 0 0 1px rgba(var(--accent-rgb),0.3)" : undefined,
              }}
            >
              {x.name}
            </li>
          ))}
        </ul>
        <div className="p-4 sm:p-5">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[color:var(--color-accent)]">Now running</p>
          <p key={cur.name} className="example-swap mt-1.5 font-display text-[1.2rem] leading-tight text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.02em" }}>
            <span>{cur.name}</span>
          </p>
          <ol className="mt-4 flex flex-col gap-2.5">
            {cur.steps.map((step, i) => {
              const state = i < doneUpTo ? "done" : i === doneUpTo ? "active" : "todo";
              return (
                <li key={step} className="console-step" data-state={state}>
                  <span className="console-dot">{state === "done" && <Check size={11} strokeWidth={3} />}</span>
                  <span>{step}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
