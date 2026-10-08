"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";
import { BEST_MONTH, bestMonthTiles } from "@/data/bestMonth";

/**
 * CommandCentre - a stylised mockup of the owner's command centre and the
 * live office. SAMPLE DATA, labelled on the frame. The agent "screens" tick
 * over while on screen (static under reduced motion).
 */

type Agent = { name: string; dept: string; screen: "inbox" | "research" | "draft" | "chart" | "calendar" | "docs"; status: string };

export const AGENTS: Agent[] = [
  { name: "Inbox triage", dept: "Operations", screen: "inbox", status: "Sorting new messages" },
  { name: "Prospect research", dept: "Sales", screen: "research", status: "Reading a prospect's website" },
  { name: "Proposal drafts", dept: "Sales", screen: "draft", status: "Writing a proposal" },
  { name: "Money tracking", dept: "Finance and tax", screen: "chart", status: "Matching payments" },
  { name: "Day planning", dept: "Operations", screen: "calendar", status: "Moving a call to 15:00" },
  { name: "Document register", dept: "Legal and compliance", screen: "docs", status: "Checking renewals" },
];

const NEEDS_YOU = [
  { title: "Approve proposal", sub: "Kitchen refit, ready to send" },
  { title: "Reply to a supplier", sub: "Draft ready, 3 lines" },
  { title: "An invoice is overdue", sub: "Send the polite reminder?" },
];

function useTick(active: boolean, ms = 1400) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      if (!document.hidden) setT((x) => x + 1);
    }, ms);
    return () => clearInterval(id);
  }, [active, ms]);
  return t;
}

function MiniScreen({ kind, t }: { kind: Agent["screen"]; t: number }) {
  const line = (w: string, on = false, k?: string | number) => (
    <span key={k} className="block h-[5px] rounded-full" style={{ width: w, background: on ? "rgba(var(--accent-rgb),0.75)" : "rgba(var(--hairline-rgb),0.16)" }} />
  );
  if (kind === "inbox")
    return (
      <div className="flex flex-col gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="flex items-center gap-1.5">
            <span className="h-[7px] w-[7px] rounded-full" style={{ background: i === t % 4 ? "var(--accent)" : "rgba(var(--hairline-rgb),0.2)" }} />
            {line(`${60 + ((i * 13) % 30)}%`, i === t % 4)}
          </span>
        ))}
      </div>
    );
  if (kind === "chart")
    return (
      <div className="flex h-full items-end gap-1">
        {[5, 8, 6, 9, 7, 10, 8].map((h, i) => (
          <span key={i} className="flex-1 rounded-t-[2px]" style={{ height: `${((h + ((t + i) % 3)) / 13) * 100}%`, background: i === 6 ? "var(--accent)" : "rgba(var(--accent-rgb),0.3)", transition: "height 0.6s var(--ease-out-expo)" }} />
        ))}
      </div>
    );
  if (kind === "calendar")
    return (
      <div className="grid grid-cols-4 gap-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="h-[11px] rounded-[3px]" style={{ background: i === (t % 8) ? "var(--accent)" : i % 3 === 0 ? "rgba(var(--accent-rgb),0.25)" : "rgba(var(--hairline-rgb),0.1)", transition: "background 0.4s" }} />
        ))}
      </div>
    );
  // research / draft / docs: typing lines
  const n = kind === "docs" ? 3 : 4;
  const typed = t % (n + 1);
  return (
    <div className="flex flex-col gap-1.5">
      {Array.from({ length: n }).map((_, i) => line(i < typed ? `${92 - i * 14}%` : "18%", i === typed - 1, i))}
    </div>
  );
}

export function AgentCard({ agent, t }: { agent: Agent; t: number }) {
  return (
    <div className="sheen min-w-0 rounded-2xl p-3" data-tilt="6" style={{ background: "var(--bg-3)", border: "1px solid var(--hairline-2)" }}>
      <div className="h-[64px] overflow-hidden rounded-lg p-2.5" style={{ background: "var(--bg)", border: "1px solid var(--hairline)" }} aria-hidden>
        <MiniScreen kind={agent.screen} t={t} />
      </div>
      <div className="mt-2.5 flex items-center gap-1.5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: "var(--signal)" }} />
          <span className="relative h-1.5 w-1.5 rounded-full" style={{ background: "var(--signal)" }} />
        </span>
        <span className="truncate text-[0.82rem] font-medium text-[color:var(--color-ink)]">{agent.name}</span>
      </div>
      <p className="mt-0.5 truncate font-mono text-[0.62rem] uppercase tracking-[0.1em] text-[color:var(--color-ink-muted)]">{agent.dept}</p>
      <p className="mt-1.5 truncate text-[0.75rem] text-[color:var(--color-ink-soft)]">{agent.status}</p>
    </div>
  );
}

export function CommandCentre() {
  const reduce = useReducedMotionPref();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const t = useTick(visible && !reduce);
  const snapshot = bestMonthTiles();

  return (
    <div ref={ref} className="browser-frame light-sweep">
      <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: "1px solid var(--hairline)" }}>
        <span className="flex gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <i key={i} className="h-2.5 w-2.5 rounded-full" style={{ background: "rgba(var(--hairline-rgb),0.18)" }} />
          ))}
        </span>
        <span className="mx-auto hidden rounded-full px-4 py-1 font-mono text-[0.7rem] text-[color:var(--color-ink-muted)] sm:block" style={{ background: "var(--surface-tint-2)" }}>
          Command centre · your business
        </span>
        <span className="ml-auto shrink-0 rounded-full px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] sm:ml-0" style={{ color: "var(--accent)", border: "1px solid rgba(var(--accent-rgb),0.35)" }}>
          Sample layout
        </span>
      </div>

      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[0.8fr_1.5fr]">
        {/* needs you */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl p-4" style={{ background: "var(--bg-3)", border: "1px solid rgba(var(--accent-rgb),0.3)" }}>
            <p className="flex items-center justify-between text-[0.8rem] text-[color:var(--color-ink-muted)]">
              Needs you
              <span className="rounded-full px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.12em]" style={{ background: "rgba(var(--accent-rgb),0.15)", color: "var(--accent)" }}>Approve</span>
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {NEEDS_YOU.map((n) => (
                <li key={n.title} className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5" style={{ background: "var(--bg-2)", border: "1px solid var(--hairline)" }}>
                  <span className="min-w-0">
                    <span className="block truncate text-[0.85rem] text-[color:var(--color-ink)]">{n.title}</span>
                    <span className="block truncate text-[0.72rem] text-[color:var(--color-ink-muted)]">{n.sub}</span>
                  </span>
                  <span className="flex h-7 shrink-0 items-center gap-1 rounded-full px-2.5 text-[0.7rem] font-medium" style={{ background: "var(--accent-3)", color: "var(--on-accent-3)" }}>
                    <Check size={12} aria-hidden /> Approve
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {snapshot && (
            <div className="rounded-2xl p-4" style={{ background: "var(--bg-3)", border: "1px solid var(--hairline)" }}>
              <p className="text-[0.8rem] text-[color:var(--color-ink-muted)]">Best month yet · {BEST_MONTH.client}</p>
              <dl className="mt-3 grid grid-cols-2 gap-3">
                {snapshot.map((t) => (
                  <div key={t.label}>
                    <dt className="text-[0.68rem] leading-tight text-[color:var(--color-ink-muted)]">{t.label}</dt>
                    <dd className="mt-1 font-display text-[1.1rem] text-[color:var(--color-ink)] tabular">{t.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>

        {/* the office */}
        <div className="rounded-2xl p-4" style={{ background: "var(--bg-2)", border: "1px solid var(--hairline)" }}>
          <p className="flex items-center justify-between text-[0.8rem] text-[color:var(--color-ink-muted)]">
            The office
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em]">Agents at work</span>
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {AGENTS.map((a, i) => (
              <AgentCard key={a.name} agent={a} t={t + i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
