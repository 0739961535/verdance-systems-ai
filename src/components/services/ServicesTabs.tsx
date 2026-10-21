"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ServiceGlyph } from "@/components/services/ServiceGlyph";

/**
 * /services: the twelve services as three tabs of four, one line each.
 * Replaces the old wall of rows. A real tablist (arrow keys, Home, End),
 * 48px tabs, each row a 44px+ link with its petal glyph. All panels are in
 * the HTML; only the chosen one shows.
 */

const GROUPS = [
  {
    id: "found",
    tab: "Get found",
    items: [
      { slug: "websites-build", line: "A fast site that turns visits into enquiries." },
      { slug: "lead-generation", line: "Old enquiries brought back, new ones found." },
      { slug: "reputation-reviews", line: "Happy customers asked for a review at the right time." },
      { slug: "marketing-social", line: "Posts and adverts that keep going in busy weeks." },
    ],
  },
  {
    id: "answer",
    tab: "Answer and book",
    items: [
      { slug: "conversation-ai", line: "WhatsApp, chat and social answered within 60 seconds." },
      { slug: "voice-ai", line: "Calls picked up and booked, even after hours." },
      { slug: "booking-calendar", line: "Customers book a time and get reminders." },
      { slug: "follow-up-nurture", line: "Missed calls texted back. Quiet quotes chased." },
    ],
  },
  {
    id: "run",
    tab: "Run the business",
    items: [
      { slug: "crm-pipeline", line: "Every customer and job in one place." },
      { slug: "payments-invoicing", line: "Invoices and payment links out the day the job is done." },
      { slug: "analytics-compliance", line: "A plain monthly report. Customer data kept safe." },
      { slug: "custom-builds", line: "The jobs only your business has, done for you." },
    ],
  },
] as const;

const CSS = `
.st-tabs { margin-top: 40px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 4px; padding: 4px; border-radius: 16px; background: #0A1226; border: 1px solid rgba(255, 255, 255, 0.08); }
@media (min-width: 768px) { .st-tabs { display: inline-grid; grid-template-columns: repeat(3, auto); } }
.st-tab { min-height: 48px; padding: 8px 14px; border-radius: 12px; border: 0; background: transparent; color: #C9D1E3; font-size: 0.95rem; font-weight: 500; line-height: 1.2; cursor: pointer; transition: background-color .2s ease, color .2s ease; }
@media (min-width: 768px) { .st-tab { padding: 8px 22px; font-size: 1rem; } }
.st-tab:hover { color: #F2F5FC; }
.st-tab[aria-selected="true"] { background: #13203F; color: #F2F5FC; box-shadow: inset 0 0 0 1px rgba(143, 176, 255, 0.35); }
.st-tab:focus-visible { outline: 2px solid #8FB0FF; outline-offset: 2px; }
.st-panel { margin-top: 24px; }
.st-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
@media (min-width: 768px) { .st-list { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; } }
.st-row { display: grid; grid-template-columns: 48px minmax(0, 1fr) 20px; gap: 16px; align-items: center; min-height: 88px; padding: 18px 20px; border-radius: 18px; background: #0A1226; border: 1px solid rgba(255, 255, 255, 0.08); }
.st-row:focus-visible { outline: 2px solid #8FB0FF; outline-offset: 3px; }
.st-row:active { transform: scale(0.99); }
.st-name { display: block; font-family: var(--font-display); font-size: 1.2rem; font-weight: 600; letter-spacing: -0.02em; line-height: 1.2; color: #F2F5FC; }
.st-line { display: block; margin-top: 4px; font-size: 0.98rem; line-height: 1.45; color: #C9D1E3; }
.st-arrow { color: #8FB0FF; transition: transform .25s cubic-bezier(0.34, 1.56, 0.64, 1); }
.st-row:hover .st-arrow { transform: translate3d(3px, -3px, 0); }
.st-panel[data-fade] { animation: st-in .3s ease both; }
@keyframes st-in { from { opacity: 0; } to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .st-panel[data-fade] { animation: none; } }
`;

/** `names` (slug to service name) comes from the server page, so the full service data never ships to the browser. */
export function ServicesTabs({ names }: { names: Record<string, string> }) {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const go = (i: number) => {
    const n = (i + GROUPS.length) % GROUPS.length;
    setActive(n);
    setTouched(true);
    tabs.current[n]?.focus();
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(active + 1);
    else if (e.key === "ArrowLeft") go(active - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(GROUPS.length - 1);
    else return;
    e.preventDefault();
  };

  return (
    <div>
      <style>{CSS}</style>
      <div role="tablist" aria-label="Service groups" className="st-tabs" onKeyDown={onKey}>
        {GROUPS.map((g, i) => (
          <button
            key={g.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`st-tab-${g.id}`}
            aria-selected={active === i}
            aria-controls={`st-panel-${g.id}`}
            tabIndex={active === i ? 0 : -1}
            className="st-tab"
            onClick={() => {
              setActive(i);
              setTouched(true);
            }}
          >
            {g.tab}
          </button>
        ))}
      </div>
      {GROUPS.map((g, i) => (
        <div
          key={g.id}
          role="tabpanel"
          id={`st-panel-${g.id}`}
          aria-labelledby={`st-tab-${g.id}`}
          hidden={active !== i}
          className="st-panel"
          data-fade={touched ? "" : undefined}
        >
          <ul className="st-list">
            {g.items.map((it) => {
              const name = names[it.slug];
              if (!name) return null;
              return (
                <li key={it.slug}>
                  <Link href={`/services/${it.slug}`} className="st-row ix-card">
                    <ServiceGlyph slug={it.slug} size={48} />
                    <span className="min-w-0">
                      <span className="st-name">{name}</span>
                      <span className="st-line">{it.line}</span>
                    </span>
                    <ArrowUpRight size={20} aria-hidden className="st-arrow" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
