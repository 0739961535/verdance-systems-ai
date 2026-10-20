"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Mail, MessageCircle, MessagesSquare, Plus, Pointer, Receipt, ShoppingBag, Sparkles, type LucideIcon } from "lucide-react";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";
import { ASK_BUSINESS, ASK_ITEMS, type AskVisual } from "./askData";

/**
 * The "Ask your business" app panel. A team member's question, then the
 * answer typed in fast with a small visual and where it came from. Tap a
 * question to ask another. No autoplay; under reduced motion the answer
 * simply appears. Sample business, sample numbers (labelled on the panel).
 */

const INK = "#E9EDEF";

const SOURCE_ICON: Record<string, LucideIcon> = {
  Shopify: ShoppingBag,
  Xero: Receipt,
  WhatsApp: MessageCircle,
  "website chat": MessagesSquare,
  email: Mail,
};

const CSS = `
.ask-caret { display: inline-block; width: 0.5em; height: 1em; margin-left: 2px; vertical-align: -0.12em; background: #8FB0FF; opacity: 0.8; }
.ask-more { opacity: 0; transform: translate3d(0, 6px, 0); transition: opacity 0.35s ease-out, transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1); }
.ask-more.is-on { opacity: 1; transform: none; }
.ask-hbar { transform-origin: 0 50%; }
.ask-col { transform-origin: 50% 100%; }
.ask-more.is-on .ask-hbar { animation: ask-growx 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
.ask-more.is-on .ask-col { animation: ask-growy 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
@keyframes ask-growx { from { transform: scaleX(0); } }
@keyframes ask-growy { from { transform: scaleY(0); } }
.ask-num { font-variant-numeric: tabular-nums; }

/* question chips: real buttons */
.ask-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.ask-q { position: relative; display: inline-flex; align-items: center; gap: 8px; min-height: 44px; padding: 0 12px 0 14px; border-radius: 12px;
  font-size: 0.875rem; font-weight: 500; line-height: 1.25; text-align: left; color: #E9EDEF; cursor: pointer;
  background: rgba(255,255,255,0.035); border: 1px solid rgba(143,176,255,0.28);
  box-shadow: 0 1px 0 rgba(255,255,255,0.05) inset, 0 1px 2px rgba(0,0,0,0.3);
  transition: background-color 160ms ease-out, border-color 160ms ease-out, color 160ms ease-out, transform 120ms ease-out; -webkit-tap-highlight-color: transparent; }
.ask-q:hover { background: rgba(77,124,255,0.12); border-color: rgba(143,176,255,0.55); }
.ask-q:active { transform: scale(0.97); }
.ask-q:focus-visible { outline: 2px solid #8FB0FF; outline-offset: 2px; }
.ask-q .ask-ico { display: grid; place-items: center; width: 20px; height: 20px; border-radius: 999px; flex: none; background: rgba(143,176,255,0.14); color: #B9CCFF; }
.ask-q[aria-pressed="true"] { background: #4D7CFF; border-color: #4D7CFF; color: #fff; box-shadow: 0 6px 18px -6px rgba(77,124,255,0.7); }
.ask-q[aria-pressed="true"] .ask-ico { background: rgba(255,255,255,0.22); color: #fff; }
.ask-q.is-hint::after { content: ""; position: absolute; inset: -1px; border-radius: 12px; border: 1.5px solid #8FB0FF; opacity: 0; pointer-events: none; animation: ask-pulse 2.2s ease-out infinite; }
@keyframes ask-pulse { 0% { opacity: 0.85; transform: scale(1); } 70%, 100% { opacity: 0; transform: scale(1.08, 1.22); } }

@media (prefers-reduced-motion: reduce) {
  .ask-more { transition: none; }
  .ask-more.is-on .ask-hbar, .ask-more.is-on .ask-col { animation: none; }
  .ask-caret { display: none; }
  .ask-q.is-hint::after { animation: none; opacity: 0.6; }
}
`;

function Inset({ children }: { children: React.ReactNode }) {
  return <div className="rounded-[14px] border border-white/[0.07] bg-[#0A1226]/70 p-3.5">{children}</div>;
}

function Bars({ items }: { items: Extract<AskVisual, { kind: "bars" }>["items"] }) {
  const top = 500; // axis top, in thousands
  const ticks = [500, 250, 0];
  return (
    <Inset>
      <div className="flex items-center justify-between text-[0.75rem] text-white/55">
        <span>Sales by month</span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="h-2 w-2 rounded-[3px] bg-[#4D7CFF]" />
          This month
        </span>
      </div>
      <div className="mt-3 grid grid-cols-[2.5rem_1fr] gap-x-2 gap-y-1.5" aria-hidden>
        <div className="ask-num relative h-[120px] text-right text-[0.6875rem] text-white/45">
          {ticks.map((t) => (
            <span key={t} className="absolute right-0 -translate-y-1/2" style={{ top: `${(1 - t / top) * 100}%` }}>
              {t === 0 ? "R0" : `R${t}k`}
            </span>
          ))}
        </div>
        <div className="relative h-[120px]">
          {ticks.map((t) => (
            <span
              key={t}
              className={`absolute inset-x-0 h-px ${t === 0 ? "bg-white/25" : "bg-white/[0.07]"}`}
              style={{ top: `${(1 - t / top) * 100}%` }}
            />
          ))}
          <div className="absolute inset-0 grid items-end gap-3" style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}>
            {items.map((i, k) => (
              <div key={i.label} className="flex h-full flex-col items-center justify-end">
                <span className={`ask-num mb-1 whitespace-nowrap text-[0.6875rem] ${i.now ? "font-semibold text-white" : "text-white/55"}`}>
                  R{i.value}k
                </span>
                <span
                  className="ask-col block w-full max-w-[44px] rounded-t-[6px]"
                  style={{
                    height: `${(i.value / top) * 100 - 12}%`,
                    background: i.now ? "linear-gradient(180deg, #8FB0FF, #4D7CFF)" : "rgba(255,255,255,0.14)",
                    boxShadow: i.now ? "0 0 0 1px rgba(143,176,255,0.4), 0 8px 24px -8px rgba(77,124,255,0.8)" : undefined,
                    animationDelay: `${k * 70}ms`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <span />
        <div className="grid gap-3 text-center text-[0.75rem]" style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}>
          {items.map((i) => (
            <span key={i.label} className={i.now ? "font-semibold text-[#B9CCFF]" : "text-white/55"}>
              {i.label}
            </span>
          ))}
        </div>
      </div>
      <span className="sr-only">{items.map((i) => `${i.label}: ${i.display}`).join(", ")}</span>
    </Inset>
  );
}

function Visual({ v }: { v: AskVisual }) {
  if (v.kind === "bars") return <Bars items={v.items} />;
  if (v.kind === "stats")
    return (
      <div className="grid grid-cols-2 gap-2.5">
        {v.items.map((i) => (
          <div key={i.label} className="rounded-[14px] border border-white/[0.07] bg-[#0A1226]/70 px-3.5 py-3">
            <p className="text-[0.75rem] text-white/55">{i.label}</p>
            <p className="ask-num mt-1 text-[1.5rem] font-semibold tracking-[-0.02em]">{i.value}</p>
          </div>
        ))}
      </div>
    );
  if (v.kind === "list") {
    const vals = v.items.map((i) => Number(i.value.replace(/\D/g, "")));
    const max = Math.max(...vals);
    return (
      <Inset>
        <ol className="grid gap-3">
          {v.items.map((i, k) => (
            <li key={i.label} className="text-[0.9375rem]">
              <span className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2.5">
                  <span className="ask-num grid h-5 w-5 place-items-center rounded-[6px] bg-white/[0.06] text-[0.6875rem] text-[#B9CCFF]">{k + 1}</span>
                  {i.label}
                </span>
                <span className="ask-num text-white/80">{i.value}</span>
              </span>
              <span aria-hidden className="mt-1.5 block h-1 rounded-full bg-white/[0.06]">
                <span
                  className="ask-hbar block h-full rounded-full"
                  style={{ width: `${(vals[k] / max) * 100}%`, background: k === 0 ? "#4D7CFF" : "rgba(143,176,255,0.45)", animationDelay: `${k * 70}ms` }}
                />
              </span>
            </li>
          ))}
        </ol>
      </Inset>
    );
  }
  if (v.kind === "invoices")
    return (
      <div className="grid gap-2">
        {v.items.map((i) => (
          <div key={i.who} className="flex items-center justify-between gap-3 rounded-[14px] border border-white/[0.07] bg-[#0A1226]/70 px-3.5 py-2.5 text-[0.9375rem]">
            <span>{i.who}</span>
            <span className="text-right">
              <span className="ask-num block font-semibold">{i.amount}</span>
              <span className="block text-[0.75rem] text-[#F2C46D]">{i.days}</span>
            </span>
          </div>
        ))}
        <p className="mt-1 rounded-[12px] border border-dashed border-[#8FB0FF]/30 px-3.5 py-2.5 text-[0.875rem] text-white/80">{v.action}</p>
      </div>
    );
  if (v.kind === "split")
    return (
      <Inset>
        <p className="ask-num text-[1.5rem] font-semibold tracking-[-0.02em]">{v.total}</p>
        <div className="mt-2 grid gap-1.5 text-[0.9375rem]">
          {v.items.map((i) => (
            <p key={i.label} className="flex justify-between gap-3 border-t border-white/[0.06] pt-1.5">
              <span className="text-white/75">{i.label}</span>
              <span className="ask-num font-medium">{i.value}</span>
            </p>
          ))}
        </div>
      </Inset>
    );
  return (
    <Inset>
      <ul className="grid gap-2 text-[0.9375rem]">
        {v.items.map((t, k) => (
          <li key={t} className="flex gap-2.5">
            <span aria-hidden className="ask-num mt-[0.1em] grid h-5 w-5 shrink-0 place-items-center rounded-[6px] bg-[#4D7CFF]/20 text-[0.6875rem] text-[#B9CCFF]">
              {k + 1}
            </span>
            {t}
          </li>
        ))}
      </ul>
    </Inset>
  );
}

export function AskPanel({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotionPref();
  const [idx, setIdx] = useState(0);
  const [tapped, setTapped] = useState(false);
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
    setTapped(true);
    if (i === idx) return;
    cancelAnimationFrame(raf.current);
    setIdx(i);
    setTyped(reduce ? Number.MAX_SAFE_INTEGER : 0);
  };

  return (
    <figure className="m-0">
      <style>{CSS}</style>
      <div
        className="overflow-hidden rounded-[22px] border border-white/[0.09] bg-[#0A1226] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_30px_60px_-30px_rgba(0,0,0,0.7)]"
        style={{ color: INK }}
      >
        {/* app header */}
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3 md:px-5">
          <span className="flex min-w-0 items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-[linear-gradient(140deg,#4D7CFF,#1D3F8F)] text-[0.875rem] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]">
              {ASK_BUSINESS[0]}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[0.95rem] font-semibold leading-tight">{ASK_BUSINESS}</span>
              <span className="mt-0.5 flex items-center gap-1.5 text-[0.75rem] text-white/60">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#5FD39A]" />
                Connected to your tools
              </span>
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/[0.12] px-2.5 py-1 text-[0.6875rem] font-medium text-white/70">
            <Sparkles aria-hidden size={12} className="text-[#8FB0FF]" />
            Ask
          </span>
        </div>
        <p className="border-b border-white/[0.06] px-4 py-1.5 text-[0.6875rem] uppercase tracking-[0.08em] text-white/50 md:px-5">
          Sample business, sample numbers
        </p>

        <div className={`grid content-start gap-3 px-4 py-4 md:px-5 ${compact ? "min-h-[24rem]" : "min-h-[25rem]"}`} aria-live="polite">
          <p className="ml-auto w-fit max-w-[85%] rounded-[16px] rounded-tr-[5px] bg-[#1D3F8F] px-3.5 py-2.5 text-[0.95rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
            {item.q}
          </p>
          <div className="w-full max-w-[34rem] rounded-[16px] rounded-tl-[5px] border border-white/[0.06] bg-[#13203F] px-3.5 py-3">
            <p className="flex items-center gap-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-[#8FB0FF]">
              <Sparkles aria-hidden size={12} />
              Answer
            </p>
            <p className="mt-1.5 text-[1rem] font-medium leading-[1.45] text-white">
              {item.a.slice(0, typed)}
              {!done && <span aria-hidden className="ask-caret" />}
            </p>
            <div className={`ask-more mt-3 ${done ? "is-on" : ""}`}>
              <Visual v={item.visual} />
              <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[0.75rem] text-white/60">
                <span>From</span>
                {item.sources.map((s) => {
                  const Icon = SOURCE_ICON[s] ?? Sparkles;
                  return (
                    <span key={s} className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.03] py-0.5 pl-1.5 pr-2.5 text-white/75">
                      <Icon aria-hidden size={12} className="text-[#8FB0FF]" />
                      {s}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-5">
        <p className="mb-2.5 flex items-center gap-2 text-[0.8125rem] font-medium text-white/75">
          <Pointer aria-hidden size={14} className="text-[#8FB0FF]" />
          Tap a question
        </p>
        <div className="ask-chips" role="group" aria-label="Questions to ask">
          {ASK_ITEMS.map((it, i) => {
            const on = i === idx;
            return (
              <button
                key={it.chip}
                type="button"
                className={`ask-q ${!tapped && i === 1 ? "is-hint" : ""}`}
                aria-pressed={on}
                onClick={() => ask(i)}
              >
                {compact ? (
                  it.chip
                ) : (
                  <>
                    <span className="sm:hidden">{it.chip}</span>
                    <span className="hidden sm:inline">{it.q}</span>
                  </>
                )}
                <span className="ask-ico" aria-hidden>
                  {on ? <Check size={12} strokeWidth={2.5} /> : <Plus size={12} strokeWidth={2.5} />}
                </span>
              </button>
            );
          })}
        </div>
      </figcaption>
    </figure>
  );
}
