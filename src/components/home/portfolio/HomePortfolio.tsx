import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bot, UserRound } from "lucide-react";
import { CTA_PRIMARY } from "@/data/site";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { SplitWords } from "@/components/primitives/Reveal";
import { PORTFOLIO_CASES, conversationsProof } from "@/data/portfolio";

/**
 * 04 Portfolio (home teaser): two real builds in device frames, side by side
 * on desktop and stacked on phones, with a link to each case on /portfolio.
 * Server component, no client JS, fixed sizes so nothing shifts.
 * Rules: no client names, logos, staff or real numbers. The studio still is
 * the anonymised live site; the chat is drawn and says so.
 * TODO(Daniel): a real number can join each case once the client gives written OK.
 * The e-commerce "conversations handled" line reads `conversationsHandled` in
 * src/data/portfolio.ts and renders only when it is a number.
 */

const ECOM_PROOF = conversationsProof(PORTFOLIO_CASES.find((c) => c.id === "ecom")?.conversationsHandled);

const CSS = `
.hp-grid { display: grid; gap: 20px; }
@media (min-width: 1024px) { .hp-grid { grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); gap: 24px; } }
.hp-card { position: relative; display: flex; flex-direction: column; min-width: 0; overflow: hidden; border-radius: 22px; background: #FBFAF7;
  box-shadow: inset 0 0 0 1px var(--hairline-2), 0 22px 44px -34px rgba(14,14,16,0.45); transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease; }
@media (hover: hover) {
  .hp-card:hover { transform: translate3d(0, -3px, 0); box-shadow: inset 0 0 0 1px var(--hairline-3), 0 30px 60px -34px rgba(14,14,16,0.5); }
  .hp-card:hover .hp-arrow { transform: translate3d(3px, 0, 0); }
}
.hp-card:has(.hp-go:focus-visible) { box-shadow: 0 0 0 2px #2554D4; }
.hp-stage { position: relative; overflow: hidden; margin: 8px 8px 0; border-radius: 16px; display: grid; place-items: center;
  background: radial-gradient(110% 90% at 80% 0%, rgba(77,124,255,0.3), rgba(77,124,255,0) 62%), #0A1226; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06); }
.hp-stage.is-laptop { aspect-ratio: 4 / 3; padding: 20px 14px; }
.hp-stage.is-phone { height: 468px; align-content: start; padding-top: 12px; }
@media (min-width: 640px) { .hp-stage.is-laptop, .hp-stage.is-phone { aspect-ratio: auto; height: 468px; } }
@media (min-width: 1024px) { .hp-stage.is-laptop, .hp-stage.is-phone { height: 520px; } }

/* laptop */
.hp-laptop { width: min(100%, 640px); }
.hp-lid { position: relative; padding: 2.2% 2.2% 0; border-radius: 14px 14px 0 0; background: #1B2235; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1); }
.hp-screen { position: relative; aspect-ratio: 16 / 10; overflow: hidden; border-radius: 6px 6px 0 0; background: #05070d; }
.hp-screen img { width: 100%; height: 100%; object-fit: cover; display: block; }
.hp-base { position: relative; height: 12px; margin: 0 -6%; border-radius: 0 0 14px 14px; background: linear-gradient(180deg, #2A3247, #151B2B); box-shadow: 0 30px 50px -20px rgba(0,0,0,0.8); }
.hp-base::before { content: ""; position: absolute; left: 50%; top: 0; width: 16%; height: 5px; transform: translateX(-50%); border-radius: 0 0 8px 8px; background: #0E1322; }

/* phone */
.hp-phone { position: relative; height: 430px; width: 224px; padding: 8px; border-radius: 34px; background: #1B2235;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12), 0 30px 60px -24px rgba(0,0,0,0.8); }
.hp-ps { position: relative; height: 100%; width: 100%; overflow: hidden; border-radius: 27px; background: #0B1328; color: #E9EDEF; display: flex; flex-direction: column;
  font-size: 11.5px; line-height: 1.4; }
@media (min-width: 1024px) { .hp-phone { height: 472px; width: 236px; } .hp-ps { font-size: 12px; } }
.hp-notch { position: absolute; top: 7px; left: 50%; width: 30%; height: 16px; transform: translateX(-50%); border-radius: 999px; background: #000; }
.hp-bar { display: flex; justify-content: space-between; padding: 8px 18px 0; font-size: 10px; font-weight: 600; color: #C9D2E3; font-variant-numeric: tabular-nums; }
.hp-head { display: flex; align-items: center; gap: 8px; margin-top: 10px; padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.07); }
.hp-av { display: grid; place-items: center; width: 26px; height: 26px; flex-shrink: 0; border-radius: 999px; background: #1D3F8F; color: #DCE6FF; }
.hp-chat { flex: 1; display: flex; flex-direction: column; gap: 6px; padding: 10px 9px 12px; }
.hp-b { max-width: 84%; padding: 7px 10px; border-radius: 13px; }
.hp-in { align-self: flex-start; background: #1A2440; border-top-left-radius: 4px; }
.hp-out { align-self: flex-end; background: #1D3F8F; border-top-right-radius: 4px; }
.hp-t { display: block; margin-top: 2px; font-size: 9.5px; color: #8b93a3; font-variant-numeric: tabular-nums; }
.hp-inner { background: #13203F; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06); border-radius: 11px; }
.hp-chip { display: inline-flex; align-items: center; gap: 5px; min-height: 22px; padding: 0 9px; border-radius: 999px; font-size: 10.5px; font-weight: 600;
  background: rgba(77,124,255,0.16); color: #B9CCFF; box-shadow: inset 0 0 0 1px rgba(143,176,255,0.3); }
.hp-note { position: absolute; left: 0; right: 0; text-align: center; bottom: 9px; font-family: var(--font-mono, ui-monospace, monospace); font-size: 10.5px; letter-spacing: 0.04em; color: #8b93a3; }

.hp-text { display: flex; flex: 1; flex-direction: column; padding: 18px 18px 8px; }
@media (min-width: 1024px) { .hp-text { padding: 24px 26px 12px; } }
.hp-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px; }
.hp-tag { display: inline-flex; align-items: center; min-height: 24px; padding: 0 10px; border-radius: 999px; font-size: 12px; font-weight: 600;
  color: #2554D4; background: rgba(37,84,212,0.08); box-shadow: inset 0 0 0 1px rgba(37,84,212,0.18); }
.hp-label { font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; letter-spacing: 0.02em; color: var(--color-ink-muted); }
.hp-name { margin-top: 14px; font-size: 0.875rem; color: var(--color-ink-muted); }
.hp-out-line { margin-top: 4px; font-family: var(--font-display); font-weight: 600; font-size: 1.25rem; line-height: 1.25; letter-spacing: -0.018em; color: var(--color-ink); }
@media (min-width: 1024px) { .hp-out-line { font-size: 1.5rem; } }
.hp-proof { display: inline-flex; align-items: center; gap: 8px; margin-top: 10px; font-family: var(--font-mono, ui-monospace, monospace); font-size: 12.5px; letter-spacing: 0.02em; color: #2554D4; font-variant-numeric: tabular-nums; }
.hp-proof i { width: 7px; height: 7px; border-radius: 999px; background: currentColor; }
.hp-go { margin-top: auto; padding-top: 10px; display: inline-flex; align-items: center; gap: 6px; min-height: 44px; align-self: flex-start;
  font-size: 0.9375rem; font-weight: 600; color: #2554D4; outline: none; }
.hp-go::after { content: ""; position: absolute; inset: 0; border-radius: 22px; }
.hp-arrow { transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
.hp-all { display: inline-flex; align-items: center; gap: 6px; min-height: 44px; font-size: 1rem; font-weight: 600; color: #2554D4; }
.hp-all:hover .hp-arrow { transform: translate3d(3px, 0, 0); }
.hp-all:focus-visible { outline: 2px solid #2554D4; outline-offset: 3px; border-radius: 6px; }
@media (prefers-reduced-motion: reduce) {
  .hp-card, .hp-arrow { transition: none; }
  .hp-card:hover, .hp-card:hover .hp-arrow, .hp-all:hover .hp-arrow { transform: none; }
}
`;

function Laptop() {
  return (
    <div className="hp-laptop">
      <div className="hp-lid">
        <div className="hp-screen">
          <picture>
            <source type="image/avif" srcSet="/work/portfolio/studio-768.avif 768w, /work/portfolio/studio-1280.avif 1280w" sizes="(min-width: 1024px) 640px, 92vw" />
            <img
              src="/work/portfolio/studio-768.webp"
              srcSet="/work/portfolio/studio-768.webp 768w, /work/portfolio/studio-1280.webp 1280w"
              sizes="(min-width: 1024px) 640px, 92vw"
              width={1280}
              height={800}
              loading="lazy"
              decoding="async"
              alt="A project page from a luxury home design and build studio's website, built by Verdance, with the name hidden"
            />
          </picture>
        </div>
      </div>
      <div className="hp-base" aria-hidden />
    </div>
  );
}

function Phone() {
  return (
    <div className="hp-phone">
      <div
        className="hp-ps"
        role="img"
        aria-label="Illustration: at 22:14 a customer asks on WhatsApp about delivery to Durban. The assistant replies straight away with delivery times, and passes a damaged item question to a person on the team."
      >
        <span className="hp-notch" aria-hidden />
        <div className="hp-bar" aria-hidden>
          <span>22:14</span>
          <span>5G</span>
        </div>
        <div className="hp-head">
          <span className="hp-av" aria-hidden>
            <Bot size={14} />
          </span>
          <span className="min-w-0">
            <span className="block font-semibold leading-tight">Customer help</span>
            <span className="block text-[10px] leading-tight text-[#7FD1A8]">Online, day and night</span>
          </span>
        </div>
        <div className="hp-chat">
          <span className="hp-b hp-in">
            Hi, do you deliver to Durban?
            <span className="hp-t">22:14</span>
          </span>
          <span className="hp-b hp-out">
            Yes, across South Africa. Durban is usually 2 to 3 working days.
            <span className="hp-t">22:14</span>
          </span>
          <span className="hp-b hp-in">
            Thanks. Also, my last order arrived damaged.
            <span className="hp-t">22:16</span>
          </span>
          <span className="hp-b hp-out">
            Sorry about that. A person on the team will sort it out.
            <span className="hp-t">22:16</span>
          </span>
          <span className="mt-auto self-center">
            <span className="hp-chip">
              <UserRound size={11} aria-hidden />
              Passed to the team
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

const CASES = [
  {
    id: "studio",
    name: "A luxury home design and build studio",
    tag: "Website",
    outcome: "A premium website that turns visitors into project briefs, ready to quote.",
    stage: "is-laptop",
    device: <Laptop />,
    note: null,
    proof: null,
  },
  {
    id: "ecom",
    name: "A South African e-commerce brand",
    tag: "Assistant",
    outcome: "Customer questions answered across all their channels: WhatsApp, Facebook, Instagram, email and web chat, 24/7.",
    stage: "is-phone",
    device: <Phone />,
    note: "Illustration, details changed",
    proof: ECOM_PROOF,
  },
] as const;

export function HomePortfolio() {
  return (
    <section className="band-paper chapter-pad" aria-labelledby="portfolio-title">
      <style>{CSS}</style>
      <div className="container-wide">
        <div className="flex flex-wrap items-end justify-between gap-6" data-reveal="">
          <div className="max-w-3xl">
            <p className="eyebrow">
              Portfolio
            </p>
            <h2 id="portfolio-title" className="h2 mt-4">
              <SplitWords text="Built and running" /> <span>for clients.</span>
            </h2>
            <p className="lead mt-6">Two recent builds. Client names stay private.</p>
          </div>
          <Link href="/portfolio" className="hp-all">
            See all work
            <ArrowRight size={17} className="hp-arrow" aria-hidden />
          </Link>
        </div>

        <div className="hp-grid mt-10 lg:mt-16" data-reveal="">
          {CASES.map((c) => (
            <article key={c.id} className="hp-card" aria-labelledby={`hp-${c.id}`}>
              <div className={`hp-stage ${c.stage}`}>
                {c.device}
                {c.note ? <span className="hp-note">{c.note}</span> : null}
              </div>
              <div className="hp-text">
                <p className="hp-meta">
                  <span className="hp-tag">{c.tag}</span>
                  <span className="hp-label">Client, name private</span>
                </p>
                <h3 id={`hp-${c.id}`} className="hp-name">
                  {c.name}
                </h3>
                <p className="hp-out-line">{c.outcome}</p>
                {c.proof ? (
                  <p className="hp-proof">
                    <i aria-hidden />
                    {c.proof}
                  </p>
                ) : null}
                <Link href={`/portfolio#${c.id}`} className="hp-go" aria-label={`View the build: ${c.name}`}>
                  View the build
                  <ArrowRight size={16} className="hp-arrow" aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8 lg:mt-14">
          <a href={GENERIC_BOOK_URL} className="btn btn-accent min-h-[52px] w-full justify-center px-7 text-[1.02rem] sm:w-auto">
            {CTA_PRIMARY}
            <ArrowUpRight size={17} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
