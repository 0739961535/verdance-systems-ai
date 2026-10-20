"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";
import { ASK_BUSINESS, ASK_ITEMS, type AskVisual } from "./askData";

/**
 * The "Ask your business" chat panel. A team member's question, then the
 * answer typed in fast with a small visual and where it came from. Tap a
 * suggestion to ask another. No autoplay; under reduced motion the answer
 * simply appears. Sample business, sample numbers (labelled on the panel).
 */

const INK = "#E9EDEF";

function Visual({ v }: { v: AskVisual }) {
  if (v.kind === "bars") {
    const max = Math.max(...v.items.map((i) => i.value));
    return (
      <div className="grid gap-2.5">
        {v.items.map((i) => (
          <div key={i.label} className="grid grid-cols-[5.5rem_1fr] items-center gap-3 text-[0.875rem]">
            <span className="text-white/70">{i.label}</span>
            <span className="flex items-center gap-2">
              <span
                className="ask-bar h-2.5 rounded-full"
                style={{ width: `${(i.value / max) * 70}%`, background: i.now ? "#4D7CFF" : "rgba(255,255,255,0.22)" }}
              />
              <span className="whitespace-nowrap text-white/85">{i.display}</span>
            </span>
          </div>
        ))}
      </div>
    );
  }
  if (v.kind === "stats")
    return (
      <div className="grid grid-cols-2 gap-2.5">
        {v.items.map((i) => (
          <div key={i.label} className="rounded-[12px] border border-white/[0.08] px-3.5 py-3">
            <p className="text-[0.8125rem] text-white/60">{i.label}</p>
            <p className="mt-1 text-[1.35rem] font-semibold tracking-[-0.02em]">{i.value}</p>
          </div>
        ))}
      </div>
    );
  if (v.kind === "list")
    return (
      <ol className="grid gap-1.5">
        {v.items.map((i, k) => (
          <li key={i.label} className="flex items-center justify-between gap-3 text-[0.9375rem]">
            <span>
              <span className="mr-2 font-mono text-[0.8125rem] text-[#8FB0FF]">{k + 1}</span>
              {i.label}
            </span>
            <span className="text-white/75">{i.value}</span>
          </li>
        ))}
      </ol>
    );
  if (v.kind === "invoices")
    return (
      <div className="grid gap-2">
        {v.items.map((i) => (
          <div key={i.who} className="flex items-center justify-between gap-3 rounded-[12px] border border-white/[0.08] px-3.5 py-2.5 text-[0.9375rem]">
            <span>{i.who}</span>
            <span className="text-right">
              <span className="block font-semibold">{i.amount}</span>
              <span className="block text-[0.8125rem] text-[#F2C46D]">{i.days}</span>
            </span>
          </div>
        ))}
        <p className="mt-1 text-[0.875rem] text-white/75">{v.action}</p>
      </div>
    );
  if (v.kind === "split")
    return (
      <div className="grid gap-1.5 text-[0.9375rem]">
        <p className="text-[1.35rem] font-semibold tracking-[-0.02em]">{v.total}</p>
        {v.items.map((i) => (
          <p key={i.label} className="flex justify-between gap-3">
            <span className="text-white/75">{i.label}</span>
            <span>{i.value}</span>
          </p>
        ))}
      </div>
    );
  return (
    <ul className="grid gap-1.5 text-[0.9375rem]">
      {v.items.map((t) => (
        <li key={t} className="flex gap-2.5">
          <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#4D7CFF]" />
          {t}
        </li>
      ))}
    </ul>
  );
}

export function AskPanel({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotionPref();
  const [idx, setIdx] = useState(0);
  // characters of the answer shown; the first answer starts complete
  const [typed, setTyped] = useState(Number.MAX_SAFE_INTEGER);
  const raf = useRef(0);
  const item = ASK_ITEMS[idx];
  const done = typed >= item.a.length;

  useEffect(() => {
    if (typed >= item.a.length) return;
    const step = () => {
      setTyped((n) => {
        const next = n + 3;
        if (next < item.a.length) raf.current = requestAnimationFrame(step);
        return next;
      });
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [idx, typed, item.a.length]);

  const ask = (i: number) => {
    if (i === idx) return;
    cancelAnimationFrame(raf.current);
    setIdx(i);
    setTyped(reduce ? Number.MAX_SAFE_INTEGER : 0);
  };

  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#0A1226] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" style={{ color: INK }}>
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3 md:px-5">
          <span className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#1D3F8F] text-[0.8125rem] font-semibold">{ASK_BUSINESS[0]}</span>
            <span>
              <span className="block text-[0.95rem] font-semibold">{ASK_BUSINESS}</span>
              <span className="block text-[0.8125rem] text-white/60">Ask the business</span>
            </span>
          </span>
          <span className="rounded-full border border-white/[0.14] px-2.5 py-1 text-[0.75rem] text-white/70">Sample business, sample numbers</span>
        </div>

        <div className={`grid content-start gap-3 px-4 py-4 md:px-5 ${compact ? "min-h-[17.5rem]" : "min-h-[19rem]"}`} aria-live="polite">
          <p className="ml-auto w-fit max-w-[85%] rounded-[14px] rounded-tr-[4px] bg-[#1D3F8F] px-3.5 py-2.5 text-[0.95rem]">{item.q}</p>
          <div className="w-full max-w-[34rem] rounded-[14px] rounded-tl-[4px] bg-[#13203F] px-3.5 py-3">
            <p className="text-[0.95rem] leading-[1.5]">
              {item.a.slice(0, typed)}
              {!done && <span aria-hidden className="ask-caret" />}
            </p>
            <div className={`ask-more mt-3 ${done ? "is-on" : ""}`}>
              <Visual v={item.visual} />
              <p className="mt-3 flex flex-wrap items-center gap-1.5 text-[0.75rem] text-white/60">
                <span>From:</span>
                {item.sources.map((s) => (
                  <span key={s} className="rounded-full border border-white/[0.12] px-2 py-0.5">
                    {s}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-4">
        <span className="sr-only">Choose a question to ask the sample business.</span>
        <div className="ask-chips" role="group" aria-label="Questions to ask">
          {ASK_ITEMS.map((it, i) => (
            <button key={it.chip} type="button" className="hero-chip" aria-pressed={i === idx} onClick={() => ask(i)}>
              {compact ? it.chip : it.q}
            </button>
          ))}
        </div>
      </figcaption>
    </figure>
  );
}
