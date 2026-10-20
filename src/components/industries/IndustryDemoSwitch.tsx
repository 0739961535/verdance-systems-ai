"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SplitWords } from "@/components/primitives/Reveal";
import { SlowChatDemo } from "@/components/demos/SlowChatDemo";
import { OFFER_ENTRIES, MORE_ENTRIES, type IndustryEntry } from "./industryDemos";

/**
 * The one demo on /industries: pick a business, watch one slow sample
 * conversation. A dark film-blue band between the calm offer grid and the
 * industry cards. Tabs are a scrolling row on phones and a list beside the
 * demo on desktop. SlowChatDemo only plays while on screen, and remounts
 * (starts again) when a different business is picked.
 */

const PICK = ["wedding-venues", "ecommerce-product-businesses", "home-services-contractors", "private-clinics", "automotive", "lodges-and-venue-groups", "trades", "estate-agents"];
const ALL = [...OFFER_ENTRIES, ...MORE_ENTRIES];
const ENTRIES: IndustryEntry[] = PICK.map((s) => ALL.find((e) => e.slug === s)).filter((e): e is IndustryEntry => Boolean(e));

export function IndustryDemoSwitch() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const cur = ENTRIES[active];

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next: number | null = null;
    if (e.key in keys) next = (active + keys[e.key] + ENTRIES.length) % ENTRIES.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = ENTRIES.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className="band-night chapter-pad ds" aria-labelledby="ds-title">
      <style>{CSS}</style>
      <div className="container-wide">
        <div className="ds-head">
          <div data-reveal="">
            <p className="eyebrow">
              <span className="chap-n">01</span> Watch it work
            </p>
            <h2 id="ds-title" className="h2 mt-4 max-w-[14ch]">
              <SplitWords text="Pick your business." />{" "}
              <span>
                <SplitWords text="Watch it reply." start={3} />
              </span>
            </h2>
          </div>
          <p className="lead" data-reveal="" style={{ ["--reveal-delay" as string]: "0.12s" }}>
            One short sample conversation for each kind of business. Every enquiry answered within 60 seconds, day, night and weekends.
          </p>
        </div>

        <div className="ds-grid">
          <div className="ds-tabs" role="tablist" aria-label="Choose a business" aria-orientation="vertical" onKeyDown={onKey} data-reveal="">
            {ENTRIES.map((e, i) => (
              <button
                key={e.slug}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`ds-tab-${i}`}
                aria-selected={i === active}
                aria-controls="ds-panel"
                tabIndex={i === active ? 0 : -1}
                className="ds-tab"
                onClick={() => setActive(i)}
              >
                <span className="ds-tab-n tabular" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {e.name}
              </button>
            ))}
          </div>

          <div id="ds-panel" role="tabpanel" aria-labelledby={`ds-tab-${active}`} className="ds-panel" data-reveal="" style={{ ["--reveal-delay" as string]: "0.1s" }}>
            <p className="ds-pain" key={`p-${cur.slug}`}>
              &ldquo;{cur.pain}&rdquo;
            </p>
            <p className="ds-sys">
              <span className="ds-k">The fix</span>
              {cur.system}
            </p>
            <div className="ds-demo">
              <SlowChatDemo key={cur.slug} demo={cur.demo} />
            </div>
            <Link href={`/industries/${cur.slug}`} className="ds-link">
              How it works for {cur.short}
              <ArrowUpRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const CSS = `
.ds-head { display: grid; gap: 20px; margin-bottom: 36px; }
@media (min-width: 1024px) { .ds-head { grid-template-columns: 1fr auto; align-items: end; gap: 48px; margin-bottom: 64px; } }
.ds-grid { display: grid; gap: 20px; }
.ds-tabs {
  display: flex; gap: 8px; overflow-x: auto; margin: 0 -1.25rem; padding: 2px 1.25rem 6px; scrollbar-width: none;
  scroll-snap-type: x proximity;
  -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 1.25rem, #000 calc(100% - 2.5rem), transparent);
          mask-image: linear-gradient(90deg, transparent 0, #000 1.25rem, #000 calc(100% - 2.5rem), transparent);
}
.ds-tabs::-webkit-scrollbar { display: none; }
.ds-tab {
  flex: none; scroll-snap-align: start; display: inline-flex; align-items: center; gap: 10px; min-height: 44px; padding: 0 16px;
  border-radius: 999px; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.02);
  font-size: 0.9375rem; color: rgba(234,240,255,0.74); cursor: pointer; text-align: left;
  transition: border-color 0.2s ease-out, background-color 0.2s ease-out, color 0.2s ease-out;
}
.ds-tab:hover { color: #F2F5FC; border-color: rgba(143,176,255,0.35); }
.ds-tab:focus-visible { outline: 2px solid #8FB0FF; outline-offset: 2px; }
.ds-tab[aria-selected="true"] { color: #F2F5FC; background: rgba(77,124,255,0.16); border-color: rgba(143,176,255,0.5); }
.ds-tab-n { font-family: var(--font-mono); font-size: 0.6875rem; color: #8FB0FF; }
.ds-panel {
  padding: 20px 16px 8px; border-radius: 22px; border: 1px solid rgba(255,255,255,0.08);
  background: radial-gradient(120% 70% at 85% 0%, rgba(77,124,255,0.14), transparent 60%), #0A1226;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 40px 120px -40px rgba(77,124,255,0.35);
}
.ds-pain { margin: 0 4px; font-family: var(--font-serif); font-style: italic; font-size: 1.5rem; line-height: 1.22; letter-spacing: -0.01em; color: #F2F5FC; animation: ds-in 0.45s cubic-bezier(0.16,1,0.3,1); }
.ds-sys { margin: 12px 4px 18px; font-size: 0.9375rem; line-height: 1.5; color: rgba(234,240,255,0.74); }
.ds-k {
  display: inline-block; margin-right: 8px; padding: 1px 8px; border-radius: 999px; vertical-align: 1px;
  font-family: var(--font-mono); font-size: 0.6875rem; letter-spacing: 0.04em; text-transform: uppercase;
  color: #C9D8FF; background: rgba(77,124,255,0.14); border: 1px solid rgba(143,176,255,0.22);
}
.ds-demo { min-height: 312px; }
.ds-link { display: inline-flex; align-items: center; gap: 6px; min-height: 48px; margin: 6px 4px 0; font-size: 0.9375rem; color: #8FB0FF; }
.ds-link:hover, .ds-link:focus-visible { color: #C9D8FF; }
@keyframes ds-in { from { opacity: 0; transform: translate3d(0, 6px, 0); } to { opacity: 1; transform: none; } }
@media (min-width: 1024px) {
  .ds-grid { grid-template-columns: minmax(0, 4fr) minmax(0, 6fr); gap: 56px; align-items: start; }
  .ds-tabs { flex-direction: column; overflow: visible; margin: 0; padding: 0; gap: 0; -webkit-mask-image: none; mask-image: none; border-top: 1px solid rgba(255,255,255,0.08); }
  .ds-tab { min-height: 64px; padding: 0 4px; border: 0; border-bottom: 1px solid rgba(255,255,255,0.08); border-radius: 0; background: none; font-size: 1.1875rem; letter-spacing: -0.01em; gap: 18px; position: relative; }
  .ds-tab::after { content: ""; position: absolute; left: 0; bottom: -1px; height: 1px; width: 100%; background: #4D7CFF; transform: scaleX(0); transform-origin: left; transition: transform 0.4s cubic-bezier(0.16,1,0.3,1); }
  .ds-tab[aria-selected="true"] { background: none; }
  .ds-tab[aria-selected="true"]::after { transform: scaleX(1); }
  .ds-panel { padding: 32px 32px 16px; }
  .ds-pain { font-size: 2rem; }
  .ds-sys { font-size: 1.0625rem; margin-bottom: 24px; }
}
@media (prefers-reduced-motion: reduce) { .ds-pain { animation: none; } .ds-tab, .ds-tab::after { transition: none; } }
`;
