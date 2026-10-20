"use client";

import { useEffect, useRef, useState } from "react";
import { Check, UserRound, type LucideIcon } from "lucide-react";
import { usePlay } from "./ProofTabs";

/**
 * Drawn, anonymised UI for the proof chapter. No screenshots, logos or brand names.
 * Every customer name and order number here is made up, and each card says so in its footer.
 */

/* Entrances are plain CSS transitions (see .pv-i / .pv-l / .pv-b in styles.ts):
   each animated piece gets its order (--i) and plays when the card has data-play. */
/** Dark app card with a header, a body that staggers in, and the illustration label. */
export function Frame({
  icon: Icon,
  title,
  sub,
  stagger = 0.07,
  children,
}: {
  icon: LucideIcon;
  title: string;
  sub: string;
  stagger?: number;
  children: React.ReactNode;
}) {
  const { play, reduce } = usePlay();
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  // number the animated pieces in reading order, then start one frame later
  // so the hidden state paints first and the transition runs
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.querySelectorAll<HTMLElement>(".pv-i, .pv-l, .pv-b").forEach((n, i) => n.style.setProperty("--i", String(i)));
    if (!(play || reduce)) return;
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setOn(true)));
    return () => cancelAnimationFrame(r);
  }, [play, reduce]);
  return (
    <div
      ref={ref}
      className="pv-card"
      data-play={on || reduce ? "" : undefined}
      style={{ ["--st" as string]: `${Math.round(stagger * 1000)}ms` }}
    >
      <div className="pv-head">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#1D3F8F] text-[#DCE6FF]" aria-hidden>
          <Icon size={15} strokeWidth={2} />
        </span>
        <span className="min-w-0">
          <span className="block text-[0.9rem] font-semibold leading-tight">{title}</span>
          <span className="pv-muted block text-[0.75rem] leading-tight">{sub}</span>
        </span>
      </div>
      <div className="pv-body">{children}</div>
      <div className="pv-foot">Illustration, details changed</div>
    </div>
  );
}

/* ---------- Chat ---------- */

export function Msg({ side, children }: { side: "in" | "out"; children: React.ReactNode }) {
  return (
    <div className={`pv-i ${side === "out" ? "flex justify-end" : "flex justify-start"}`}>
      <span
        className={`max-w-[86%] rounded-[14px] px-3 py-2 text-[0.84rem] leading-[1.4] ${
          side === "out" ? "pv-out rounded-tr-[4px]" : "pv-in rounded-tl-[4px]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

export function Item({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`pv-i ${className}`}>
      {children}
    </div>
  );
}

export function OrderCard() {
  const steps = ["Packed", "Shipped", "On the way", "Delivered"];
  const current = 2;
  return (
    <Item className="flex justify-end">
      <div className="pv-inner w-[86%] rounded-[14px] p-3">
        <div className="flex items-baseline justify-between gap-2">
          <span className="pv-num text-[0.82rem] font-semibold">Order #10482</span>
          <span className="pv-muted text-[0.72rem]">2 items</span>
        </div>
        <ol className="mt-3 grid grid-cols-4 gap-1.5" aria-label="Order status">
          {steps.map((s, i) => (
            <li key={s} className="min-w-0">
              <span
                className={`block h-[3px] rounded-full ${i < current ? "bg-[#4D7CFF]" : i === current ? "bg-[#8FB0FF]" : "bg-white/10"}`}
              />
              <span className={`mt-1.5 block truncate text-[0.66rem] ${i <= current ? "text-[#C9D6FF]" : "pv-muted"}`}>{s}</span>
            </li>
          ))}
        </ol>
        <div className="mt-2.5 flex items-center justify-between text-[0.75rem]">
          <span className="pv-muted">Courier: due Tuesday</span>
          <span className="text-[#8FB0FF]">Track</span>
        </div>
      </div>
    </Item>
  );
}

export function HandoverChip({ children }: { children: React.ReactNode }) {
  return (
    <Item className="mt-auto flex justify-center pt-1">
      <span className="pv-chip pv-chip-blue">
        <UserRound size={13} aria-hidden />
        {children}
      </span>
    </Item>
  );
}

/* ---------- Pipeline ---------- */

export type Lane = { stage: string; count: number; name: string; note: string; tag?: string };

export function Pipeline({ lanes }: { lanes: Lane[] }) {
  return (
    <ol className="grid gap-2" aria-label="Pipeline stages">
      {lanes.map((l, i) => (
        <li key={l.stage} className="pv-i grid grid-cols-[minmax(0,104px)_minmax(0,1fr)] items-center gap-2.5">
          <span className="flex min-w-0 items-center gap-2">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ background: i === lanes.length - 1 ? "#7FD1A8" : `rgba(143,176,255,${0.35 + i * 0.15})` }}
              aria-hidden
            />
            <span className="min-w-0">
              <span className="block truncate text-[0.74rem] font-semibold text-[#C9D2E3]">{l.stage}</span>
              <span className="pv-num pv-muted block text-[0.68rem]">{l.count} in stage</span>
            </span>
          </span>
          <span className="pv-inner block min-w-0 rounded-[10px] px-2.5 py-2">
            <span className="flex items-center justify-between gap-2">
              <span className="truncate text-[0.8rem] font-semibold">{l.name}</span>
              {l.tag ? <span className="shrink-0 text-[0.64rem] uppercase tracking-[0.06em] text-[#8FB0FF]">{l.tag}</span> : null}
            </span>
            <span className="pv-muted block truncate text-[0.72rem]">{l.note}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

/* ---------- Automations ---------- */

export type Step = { icon: LucideIcon; title: string; note: string; trigger?: boolean };

/** Trigger to action flow: nodes joined by connectors that draw downwards in sequence. */
export function Flow({ steps }: { steps: Step[] }) {
  return (
    <ol className="my-auto grid" aria-label="Automation steps">
      {steps.map((s, i) => {
        const Icon = s.icon;
        return (
          <li key={s.title} className="grid">
            {i > 0 ? (
              <span
                aria-hidden
                className="pv-l ml-[17px] block h-3.5 w-[2px] origin-top rounded-full bg-gradient-to-b from-[#4D7CFF] to-[#8FB0FF]"
              />
            ) : null}
            <span className="pv-i flex items-center gap-3">
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-[10px] ${
                  s.trigger ? "bg-[#4D7CFF] text-white" : "pv-inner text-[#B9CCFF]"
                }`}
                aria-hidden
              >
                <Icon size={16} strokeWidth={2} />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.84rem] font-semibold leading-tight">
                  {s.trigger ? <span className="mr-1.5 text-[0.62rem] uppercase tracking-[0.08em] text-[#8FB0FF]">When</span> : null}
                  {s.title}
                </span>
                <span className="pv-muted block truncate text-[0.72rem] leading-snug">{s.note}</span>
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/* ---------- Report ---------- */

const MONTHS = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];
/* Placeholder shapes only, deliberately without values or an axis. */
const SHAPES = [0.55, 0.7, 0.5, 0.74, 0.62, 0.68];

export function Report() {
  // TODO(Daniel): real monthly numbers (enquiries answered, reply time, handed to the team)
  // go here only after Peter gives written OK. Until then the tiles and bars stay as placeholders.
  const tiles = ["Enquiries answered", "Typical reply time", "Handed to the team"];
  return (
    <>
      <Item className="grid grid-cols-3 gap-2">
        {tiles.map((t) => (
          <div key={t} className="pv-inner rounded-[10px] px-2.5 py-2.5">
            <span className="pv-muted block text-[0.66rem] leading-tight">{t}</span>
            <span className="pv-skel mt-2 w-3/4" aria-hidden />
          </div>
        ))}
      </Item>
      <Item className="pv-inner mt-1 flex flex-1 flex-col rounded-[12px] p-3">
        <span className="flex items-center justify-between">
          <span className="text-[0.78rem] font-semibold">Enquiries by month</span>
          <span className="pv-muted text-[0.68rem]">Sample layout</span>
        </span>
        <div className="mt-3 grid min-h-[120px] flex-1 grid-cols-6 items-end gap-2" aria-hidden>
          {SHAPES.map((h, i) => (
            <span key={i} className="pv-b pv-hatch block origin-bottom rounded-t-[5px]" style={{ height: `${h * 100}%` }} />
          ))}
        </div>
        <div className="mt-1.5 grid grid-cols-6 gap-2">
          {MONTHS.map((m) => (
            <span key={m} className="pv-muted text-center text-[0.64rem]">{m}</span>
          ))}
        </div>
      </Item>
      <Item className="flex justify-center">
        <span className="pv-chip pv-chip-ghost">Real numbers shown with the client&apos;s OK</span>
      </Item>
    </>
  );
}

/* ---------- Brief form ---------- */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Item>
      <span className="pv-muted block text-[0.68rem]">{label}</span>
      <span className="pv-inner mt-1 flex min-h-[34px] items-center rounded-[9px] px-2.5 text-[0.82rem]">{children}</span>
    </Item>
  );
}

export function BriefForm() {
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <Field label="Name">Naledi</Field>
        <Field label="Plot location">Pretoria east</Field>
      </div>
      <Item>
        <span className="pv-muted block text-[0.68rem]">Project</span>
        <span className="mt-1 flex flex-wrap gap-1.5">
          {["New build", "Renovation", "Extension"].map((p, i) => (
            <span key={p} className={`pv-chip ${i === 0 ? "pv-chip-blue" : "pv-chip-ghost"}`}>
              {i === 0 ? <Check size={12} aria-hidden /> : null}
              {p}
            </span>
          ))}
        </span>
      </Item>
      <div className="grid grid-cols-2 gap-2">
        <Field label="Timeline">Within 12 months</Field>
        <Field label="Budget range">
          <span className="pv-skel w-16" aria-hidden />
          <span className="pv-muted ml-2 text-[0.72rem]">Selected</span>
        </Field>
      </div>
      <Item className="mt-auto">
        <span className="flex min-h-[38px] items-center justify-center rounded-[10px] bg-[#4D7CFF] text-[0.84rem] font-semibold text-white">
          Send brief
        </span>
        <span className="pv-muted mt-2 block text-center text-[0.72rem]">Lands in the pipeline as a new brief, ready to quote</span>
      </Item>
    </>
  );
}
