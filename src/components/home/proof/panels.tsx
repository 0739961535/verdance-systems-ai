"use client";

import { useEffect, useRef, useState } from "react";
import { Check, UserRound, type LucideIcon } from "lucide-react";
import { usePlay } from "./ProofTabs";

/**
 * Drawn, anonymised UI for the proof chapter. No screenshots, logos or brand names.
 * Every customer name and order number here is made up, and each card says so in its footer.
 *
 * Motion is CSS only (see styles.ts): transitions and keyframes on transform and opacity,
 * plus stroke-dashoffset on two tiny SVG paths. The pipeline loop is a few timeouts.
 * Everything starts when the card gets data-play and is static under reduced motion.
 */

/** Dark app card with a header, a body that plays in, and the illustration label. */
export function Frame({
  icon: Icon,
  title,
  sub,
  stagger = 0.07,
  foot = "Illustration, details changed",
  children,
}: {
  icon: LucideIcon;
  title: string;
  sub: string;
  stagger?: number;
  foot?: string;
  children: React.ReactNode;
}) {
  const { play, reduce } = usePlay();
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  // number the animated pieces in reading order (typing dots share their message's number),
  // then start one frame later so the hidden state paints first and the transitions run.
  // When the panel is left, reset after the cross-fade so it plays again next time.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.querySelectorAll<HTMLElement>(".pv-i, .pv-l, .pv-b").forEach((n, i) => n.style.setProperty("--i", String(i)));
    el.querySelectorAll<HTMLElement>(".pv-typing").forEach((t) => {
      const next = t.nextElementSibling as HTMLElement | null;
      if (next) t.style.setProperty("--i", next.style.getPropertyValue("--i"));
    });
    if (reduce) return;
    if (play) {
      let r2 = 0;
      const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => setOn(true)); });
      return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
    }
    const t = window.setTimeout(() => setOn(false), 520);
    return () => window.clearTimeout(t);
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
        <span className="pv-live-dot ml-auto" aria-hidden />
      </div>
      <div className="pv-body">{children}</div>
      <div className="pv-foot">{foot}</div>
    </div>
  );
}

/* ---------- Chat ---------- */

/** Typing dots that sit where the next reply will land, then give way to it. */
function Typing() {
  return (
    <span className="pv-typing pv-out" aria-hidden>
      <span className="pv-dot" />
      <span className="pv-dot" />
      <span className="pv-dot" />
    </span>
  );
}

export function Msg({ side, children }: { side: "in" | "out"; children: React.ReactNode }) {
  const out = side === "out";
  return (
    <div className={`relative flex ${out ? "justify-end" : "justify-start"}`}>
      {out ? <Typing /> : null}
      <span
        className={`pv-i max-w-[86%] rounded-[14px] px-3 py-2 text-[0.84rem] leading-[1.4] ${
          out ? "pv-out rounded-tr-[4px]" : "pv-in rounded-tl-[4px]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

export function Item({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`pv-i ${className}`}>{children}</div>;
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
              <span className="block h-[3px] overflow-hidden rounded-full bg-white/10">
                <span
                  className={`pv-fill block h-full w-full origin-left rounded-full ${i < current ? "bg-[#4D7CFF]" : i === current ? "bg-[#8FB0FF]" : "opacity-0"}`}
                  style={{ ["--f" as string]: i }}
                />
              </span>
              <span className={`mt-1.5 block truncate text-[0.6875rem] ${i <= current ? "text-[#C9D6FF]" : "pv-muted"}`}>{s}</span>
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

/* ---------- Pipeline: a small kanban with one card gliding through it ---------- */

export type KanbanCard = { name: string; note: string; tag?: string };
export type Column = { stage: string; count: number; cards: KanbanCard[] };
/** The live card: its name, channel tag, and one note per column it lands in. */
export type Mover = { name: string; tag: string; notes: string[] };

const HOLD_MS = [1100, 1700, 2300];
const GLIDE_MS = 700;

export function Pipeline({ columns, mover }: { columns: Column[]; mover: Mover }) {
  const { play, reduce } = usePlay();
  const [pos, setPos] = useState(0);
  const [gone, setGone] = useState(false);
  const [snap, setSnap] = useState(false);
  const last = columns.length - 1;

  // loop: hold, glide to the next column, ... then fade out at the end and reappear in the first
  useEffect(() => {
    if (reduce) return;
    const ts: number[] = [];
    const at = (ms: number, fn: () => void) => ts.push(window.setTimeout(fn, ms));
    if (!play) {
      at(520, () => { setSnap(true); setPos(0); setGone(false); });
      return () => ts.forEach(clearTimeout);
    }
    const run = () => {
      let t = 0;
      at(t, () => { setSnap(false); setGone(false); });
      for (let p = 1; p <= last; p++) {
        t += HOLD_MS[Math.min(p - 1, HOLD_MS.length - 1)];
        at(t, () => setPos(p));
        t += GLIDE_MS;
      }
      t += HOLD_MS[HOLD_MS.length - 1];
      at(t, () => setGone(true));
      t += 380;
      at(t, () => { setSnap(true); setPos(0); });
      t += 120;
      at(t, run);
    };
    at(500, run);
    return () => ts.forEach(clearTimeout);
  }, [play, reduce, last]);

  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="pv-board relative grid flex-1 gap-1.5" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
        {columns.map((c, i) => {
          const n = c.count + (pos === i && !gone ? 1 : 0);
          return (
            <section key={c.stage} className="pv-i pv-col min-w-0" aria-label={`${c.stage}, ${n} in stage`}>
              <header className="flex h-[26px] items-center justify-between gap-1 px-1">
                <span className="truncate text-[0.7rem] font-semibold text-[#C9D2E3]">{c.stage}</span>
                <span className={`pv-count pv-num ${i === last ? "is-won" : ""}`} aria-hidden>
                  <span key={n} className="pv-tick block">{n}</span>
                </span>
              </header>
              <span className="pv-slot" aria-hidden />
              {c.cards.map((k) => (
                <KCard key={k.name} {...k} />
              ))}
            </section>
          );
        })}
        <div
          className="pv-mover"
          data-gone={gone ? "" : undefined}
          data-snap={snap ? "" : undefined}
          style={{ ["--pos" as string]: pos, ["--cols" as string]: columns.length }}
          aria-hidden
        >
          <div className="pv-mover-in">
            <KCard name={mover.name} note={mover.notes[pos] ?? ""} tag={mover.tag} live />
          </div>
        </div>
      </div>
      <p className="pv-i pv-log mt-auto" aria-live="off">
        <span className="pv-live-dot" aria-hidden />
        <span className="min-w-0 truncate">
          <span className="font-semibold text-[#E9EDEF]">{mover.name}</span>
          <span className="pv-muted">{pos === 0 ? " arrived in " : " moved to "}</span>
          <span key={pos} className="pv-swap inline-block font-semibold text-[#B9CCFF]">{columns[pos]?.stage}</span>
        </span>
      </p>
    </div>
  );
}

function KCard({ name, note, tag, live }: KanbanCard & { live?: boolean }) {
  return (
    <span className={`pv-kcard ${live ? "is-live" : ""}`}>
      <span className="flex items-center justify-between gap-1">
        <span className="truncate text-[0.74rem] font-semibold">{name}</span>
        {tag ? <span className="shrink-0 text-[0.5625rem] font-semibold uppercase tracking-[0.06em] text-[#8FB0FF]">{tag}</span> : null}
      </span>
      <span key={note} className={`pv-muted mt-0.5 block text-[0.66rem] leading-[1.3] ${live ? "pv-swap" : ""}`}>{note}</span>
    </span>
  );
}

/* ---------- Automations: trigger to actions, a pulse running down the connectors ---------- */

export type Step = { icon: LucideIcon; title: string; note: string; trigger?: boolean };

/**
 * Built for five steps: the pulse keyframes in styles.ts split one loop into five equal slots.
 * Each connector carries the pulse in its slot (stroke-dashoffset), each node glows as it arrives.
 */
export function Flow({ steps }: { steps: Step[] }) {
  return (
    <ol className="pv-flow my-auto grid" aria-label="Automation steps">
      {steps.map((s, i) => {
        const Icon = s.icon;
        return (
          <li key={s.title} className="grid" style={{ ["--n" as string]: i }}>
            {i > 0 ? (
              <span className="pv-l pv-wire" aria-hidden>
                <svg width="2" height="18" viewBox="0 0 2 18" fill="none">
                  <path d="M1 0V18" stroke="rgba(143,176,255,0.22)" strokeWidth="2" />
                  <path className="pv-pulse" d="M1 0V18" pathLength={100} stroke="#B9CCFF" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            ) : null}
            <span className="pv-i pv-node flex items-center gap-3">
              <span
                className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-[10px] ${
                  s.trigger ? "bg-[#4D7CFF] text-white" : "pv-inner text-[#B9CCFF]"
                }`}
                aria-hidden
              >
                <span className="pv-glow" />
                <Icon size={16} strokeWidth={2} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.84rem] font-semibold leading-tight">
                  {s.trigger ? <span className="mr-1.5 text-[0.6875rem] uppercase tracking-[0.08em] text-[#8FB0FF]">When</span> : null}
                  {s.title}
                </span>
                <span className="pv-muted block truncate text-[0.72rem] leading-snug">{s.note}</span>
              </span>
              <span className="pv-done grid h-5 w-5 shrink-0 place-items-center rounded-full" aria-hidden>
                <Check size={11} strokeWidth={3} />
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
const LINE = [0.26, 0.36, 0.32, 0.46, 0.5, 0.62];
const HI = 5;

export function Report() {
  // TODO(Daniel): real monthly numbers (enquiries answered, reply time, handed to the team)
  // go here only after the client gives written OK. Until then the tiles, bars and line stay as shapes.
  const tiles = ["Enquiries answered", "Typical reply time", "Handed to the team"];
  // the line is drawn in pixels (measured), so its stroke stays even and pathLength dashes work in WebKit
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 300, h: 140 });
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const pts = LINE.map((v, i) => [((i + 0.5) / LINE.length) * size.w, (1 - v) * size.h] as const);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const hx = (pts[HI][0] / size.w) * 100;
  const hy = (pts[HI][1] / size.h) * 100;
  return (
    <>
      <Item className="grid grid-cols-3 gap-2">
        {tiles.map((t) => (
          <div key={t} className="pv-inner rounded-[10px] px-2.5 py-2.5">
            <span className="pv-muted block text-[0.6875rem] leading-tight">{t}</span>
            <span className="pv-skel pv-shimmer mt-2 w-3/4" aria-hidden />
          </div>
        ))}
      </Item>
      <Item className="pv-inner mt-1 flex flex-1 flex-col rounded-[12px] p-3">
        <span className="flex items-center justify-between gap-2">
          <span className="text-[0.78rem] font-semibold">Enquiries by month</span>
          <span className="pv-chip pv-chip-ghost !min-h-[22px] !px-2 !text-[0.66rem]">Sample</span>
        </span>
        <span className="mt-2 flex items-center gap-3 text-[0.66rem]" aria-hidden>
          <span className="pv-muted flex items-center gap-1.5"><span className="pv-hatch inline-block h-2 w-2 rounded-[2px]" />Enquiries</span>
          <span className="pv-muted flex items-center gap-1.5"><span className="inline-block h-[2px] w-3 rounded-full bg-[#8FB0FF]" />Answered in a minute</span>
        </span>
        <div ref={box} className="relative mt-3 min-h-[132px] flex-1" aria-hidden>
          <div className="absolute inset-0 grid grid-cols-6 items-end">
            {SHAPES.map((h, i) => (
              <span key={i} className="flex h-full items-end px-[5px]">
                <span className={`pv-b pv-hatch block w-full origin-bottom rounded-t-[5px] ${i === HI ? "is-hi" : ""}`} style={{ height: `${h * 100}%` }} />
              </span>
            ))}
          </div>
          <svg className="pv-line absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${size.w} ${size.h}`}>
            <path d={d} pathLength={1} fill="none" stroke="#8FB0FF" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
          <span className="pv-pt" style={{ left: `${hx}%`, top: `${hy}%` }} />
          <span className="pv-tip" style={{ left: `${hx}%`, top: `${hy}%` }}>
            <span className="block font-semibold text-[#E9EDEF]">{MONTHS[HI]}</span>
            <span className="pv-skel mt-1 w-10" />
            <span className="pv-muted mt-1 block">Sample point</span>
          </span>
        </div>
        <div className="mt-1.5 grid grid-cols-6">
          {MONTHS.map((m, i) => (
            <span key={m} className={`text-center text-[0.6875rem] ${i === HI ? "font-semibold text-[#B9CCFF]" : "pv-muted"}`}>{m}</span>
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
      <span className="pv-muted block text-[0.6875rem]">{label}</span>
      <span className="pv-inner mt-1 flex min-h-[34px] items-center rounded-[9px] px-2.5 text-[0.82rem]">{children}</span>
    </Item>
  );
}

export function BriefForm() {
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <Field label="Name">Naledi</Field>
        <Field label="Plot location">Western Cape</Field>
      </div>
      <Item>
        <span className="pv-muted block text-[0.6875rem]">Project</span>
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
        <span className="pv-send flex min-h-[38px] items-center justify-center rounded-[10px] bg-[#4D7CFF] text-[0.84rem] font-semibold text-white">
          Send brief
        </span>
        <span className="pv-muted mt-2 block text-center text-[0.72rem]">Lands in the pipeline as a new brief, ready to quote</span>
      </Item>
    </>
  );
}
