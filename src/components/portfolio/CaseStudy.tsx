import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { conversationsProof, type CaseImage, type PortfolioCase } from "@/data/portfolio";

/**
 * One real build on /portfolio: the label and outcome, the work in a laptop
 * and a phone frame, then what we built, how it works and what it does.
 * Server component. Images are anonymised stills (see src/data/portfolio.ts).
 */

export const CASE_CSS = `
.pc-case { scroll-margin-top: 88px; }
.pc-head { display: grid; gap: 16px; }
@media (min-width: 1024px) { .pc-head { grid-template-columns: minmax(0, 1fr) auto; align-items: end; gap: 40px; } }
.pc-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.pc-status { display: inline-flex; align-items: center; gap: 6px; min-height: 26px; padding: 0 11px; border-radius: 999px; font-size: 12px; font-weight: 600;
  color: #1F6B47; background: rgba(31,107,71,0.08); box-shadow: inset 0 0 0 1px rgba(31,107,71,0.22); }
.pc-status i { width: 7px; height: 7px; border-radius: 999px; background: currentColor; }
.pc-status.is-build { color: #8A5A12; background: rgba(176,120,30,0.09); box-shadow: inset 0 0 0 1px rgba(176,120,30,0.28); }
.pc-tag { display: inline-flex; align-items: center; min-height: 26px; padding: 0 11px; border-radius: 999px; font-size: 12px; font-weight: 600;
  color: #2554D4; background: rgba(37,84,212,0.08); box-shadow: inset 0 0 0 1px rgba(37,84,212,0.18); }
.pc-private { font-family: var(--font-mono); font-size: 12px; color: var(--color-ink-muted); }
.pc-title { margin-top: 14px; font-family: var(--font-display); font-weight: 600; font-size: clamp(1.9rem, 1.8vw + 1.3rem, 3rem); line-height: 1.06; letter-spacing: -0.03em; color: var(--color-ink); }
.pc-out { margin-top: 12px; max-width: 40ch; font-size: 1.125rem; line-height: 1.5; color: var(--color-ink-soft); }
@media (min-width: 1024px) { .pc-out { font-size: 1.25rem; } }
.pc-proof { display: inline-flex; align-items: center; gap: 8px; margin-top: 14px; font-family: var(--font-mono); font-size: 13px; letter-spacing: 0.02em; color: #2554D4; font-variant-numeric: tabular-nums; }
.pc-proof i { width: 7px; height: 7px; border-radius: 999px; background: currentColor; }

.pc-stage { position: relative; margin-top: 32px; overflow: hidden; border-radius: 22px; padding: 28px 16px 24px;
  background: radial-gradient(90% 80% at 85% 0%, rgba(77,124,255,0.3), rgba(77,124,255,0) 60%), #0A1226; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06); }
@media (min-width: 1024px) { .pc-stage { margin-top: 48px; padding: 56px 56px 48px; } }
.pc-devices { position: relative; display: grid; grid-template-columns: minmax(0, 1fr) 31%; gap: 12px; align-items: end; max-width: 1080px; margin: 0 auto; }
@media (min-width: 1024px) { .pc-devices { grid-template-columns: minmax(0, 1fr) 23%; gap: 0; } .pc-devices .pc-phone { margin-left: -9%; margin-bottom: -18px; } }
.pc-lid { padding: 2% 2% 0; border-radius: 12px 12px 0 0; background: #1B2235; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1); }
.pc-screen { overflow: hidden; border-radius: 5px 5px 0 0; background: #05070d; aspect-ratio: 16 / 10; }
.pc-screen img, .pc-pscreen img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top center; }
.pc-base { position: relative; height: 10px; margin: 0 -5%; border-radius: 0 0 12px 12px; background: linear-gradient(180deg, #2A3247, #151B2B); box-shadow: 0 30px 50px -20px rgba(0,0,0,0.8); }
.pc-phone { position: relative; z-index: 1; padding: 5px; border-radius: 22px; background: #1B2235; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12), 0 30px 60px -20px rgba(0,0,0,0.85); }
@media (min-width: 1024px) { .pc-phone { padding: 7px; border-radius: 30px; } }
.pc-pscreen { overflow: hidden; border-radius: 17px; aspect-ratio: 1 / 2; background: #05070d; }
@media (min-width: 1024px) { .pc-pscreen { border-radius: 24px; } }
.pc-cap { margin-top: 20px; text-align: center; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.04em; color: #8b93a3; }

.pc-body { display: grid; gap: 36px; margin-top: 40px; }
@media (min-width: 1024px) { .pc-body { grid-template-columns: 1fr 1.35fr 1fr; gap: 48px; margin-top: 56px; } }
.pc-k { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.02em; color: var(--color-ink-muted); padding-bottom: 12px; border-bottom: 1px solid var(--hairline-2); }
.pc-p { margin-top: 14px; font-size: 1.0625rem; line-height: 1.6; color: var(--color-ink-soft); }
.pc-steps { list-style: none; margin: 0; padding: 0; counter-reset: s; }
.pc-steps li { counter-increment: s; position: relative; padding: 14px 0 14px 40px; border-bottom: 1px solid var(--hairline); }
.pc-steps li::before { content: counter(s, decimal-leading-zero); position: absolute; left: 0; top: 15px; font-family: var(--font-mono); font-size: 12px; color: #2554D4; font-variant-numeric: tabular-nums; }
.pc-steps b { display: block; font-weight: 600; color: var(--color-ink); font-size: 1rem; }
.pc-steps span { display: block; margin-top: 2px; font-size: 0.9375rem; line-height: 1.5; color: var(--color-ink-soft); }
.pc-does { list-style: none; margin: 14px 0 0; padding: 0; display: grid; gap: 10px; }
.pc-does li { position: relative; padding-left: 20px; font-size: 1.0625rem; line-height: 1.5; color: var(--color-ink-soft); }
.pc-does li::before { content: ""; position: absolute; left: 2px; top: 0.6em; width: 8px; height: 8px; border-radius: 2px; background: #2554D4; }
.pc-tools { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
.pc-tools span { display: inline-flex; align-items: center; min-height: 28px; padding: 0 10px; border-radius: 8px; font-size: 13px; color: var(--color-ink-soft); box-shadow: inset 0 0 0 1px var(--hairline-2); background: rgba(255,255,255,0.5); }
.pc-go { display: inline-flex; align-items: center; gap: 6px; min-height: 44px; margin-top: 18px; font-weight: 600; color: #2554D4; }
.pc-go svg { transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
.pc-go:hover svg { transform: translate3d(3px, 0, 0); }
.pc-go:focus-visible { outline: 2px solid #2554D4; outline-offset: 3px; border-radius: 6px; }
@media (prefers-reduced-motion: reduce) { .pc-go svg { transition: none; } .pc-go:hover svg { transform: none; } }
`;

function Shot({ img, sizes }: { img: CaseImage; sizes: string }) {
  return (
    <picture>
      <source type="image/avif" srcSet={`${img.src}.avif`} />
      <img src={`${img.src}.webp`} width={img.width} height={img.height} loading="lazy" decoding="async" alt={img.alt} sizes={sizes} />
    </picture>
  );
}

export function CaseStudy({ c, index }: { c: PortfolioCase; index: number }) {
  const title = c.name ?? c.label;
  const headId = `case-${c.id}-title`;
  const proof = conversationsProof(c.conversationsHandled);
  return (
    <article id={c.id} className="pc-case" aria-labelledby={headId}>
      <div className="pc-head" data-reveal="">
        <div>
          <p className="pc-meta">
            <span className="pc-tag" style={{ color: "var(--color-ink-muted)", background: "transparent", boxShadow: "inset 0 0 0 1px var(--hairline-2)" }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={`pc-status ${c.status === "In build" ? "is-build" : ""}`}>
              <i aria-hidden />
              {c.status}
            </span>
            {c.tags.map((t) => (
              <span key={t} className="pc-tag">
                {t}
              </span>
            ))}
            {c.name ? null : <span className="pc-private">Client, name private</span>}
          </p>
          <h2 id={headId} className="pc-title">
            {title}
          </h2>
          <p className="pc-out">{c.outcome}</p>
          {proof ? (
            <p className="pc-proof">
              <i aria-hidden />
              {proof}
            </p>
          ) : null}
        </div>
      </div>

      <figure className="pc-stage m-0" data-reveal="">
        <div className="pc-devices">
          <div>
            <div className="pc-lid">
              <div className="pc-screen">
                <Shot img={c.wide} sizes="(min-width: 1024px) 820px, 64vw" />
              </div>
            </div>
            <div className="pc-base" aria-hidden />
          </div>
          <div className="pc-phone">
            <div className="pc-pscreen">
              <Shot img={c.tall} sizes="(min-width: 1024px) 250px, 30vw" />
            </div>
          </div>
        </div>
        <figcaption className="pc-cap">{c.caption}</figcaption>
      </figure>

      <div className="pc-body">
        <div>
          <h3 className="pc-k">What we built</h3>
          <p className="pc-p">{c.built}</p>
          <h3 className="pc-k" style={{ marginTop: 32 }}>Works with</h3>
          <p className="pc-tools">
            {c.tools.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </p>
        </div>
        <div>
          <h3 className="pc-k">How it works</h3>
          <ol className="pc-steps">
            {c.steps.map((s) => (
              <li key={s.title}>
                <b>{s.title}</b>
                <span>{s.body}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h3 className="pc-k">What it does for them</h3>
          <ul className="pc-does">
            {c.does.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <Link href={c.depth.href} className="pc-go">
            How it works
            <ArrowRight size={16} aria-hidden />
            <span className="sr-only">: {c.depth.label}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
