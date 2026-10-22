import { SampleTag } from "@/components/kit/SampleTag";
import type { ReactNode } from "react";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { Reveal, SplitWords } from "@/components/primitives/Reveal";
import { QuestionsAccordion } from "@/components/home/QuestionsAccordion";
import { WorkVisualsStyle } from "@/components/home/inbox/WorkVisuals";
import { DepthVisual, DEPTH_VISUAL_CSS } from "@/components/services/DepthVisual";
import { BeforeAfter, BuildStem, ServiceStripsStyle } from "@/components/services/ServiceStrips";
import { DepthTabs } from "@/components/services/DepthTabs";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { CTA_PRIMARY, CTA_PRIMARY_MICRO } from "@/data/site";
import type { ServiceDepth as ServiceDepthData } from "@/data/services";

/**
 * The depth sections of a service page ("How it works"), in reading order:
 * what it does in one line, the step by step flow with a small screen per
 * step, who does what, the build, what you see once live, the
 * questions, then one Book button. No section numbers. Calm and phone first: one column on a
 * phone, the screens beside the words from lg up. Dark bands, so the
 * sample screens sit on the colours they were drawn for.
 *
 * compact (the twelve service pages, about 550 visible words): "How it
 * works" becomes a strip of tabs with one part shown at a time, "Who does
 * what" sits behind a "Show me who does what" reveal, and "Once it is live"
 * is one line under the build.
 */

const CSS = `
${DEPTH_VISUAL_CSS}
.band-night .sd-time { color: #B4BCCB; }
.dp-steps { list-style: none; padding: 0; }
.dp-step { position: relative; padding: 0 0 56px 52px; }
.dp-step:last-child { padding-bottom: 0; }
.dp-step::before {
  content: ""; position: absolute; left: 17px; top: 40px; bottom: 4px; width: 1px;
  background: linear-gradient(rgba(143, 176, 255, 0.4), rgba(143, 176, 255, 0.08));
}
.dp-step:last-child::before { display: none; }
.dp-n {
  position: absolute; left: 0; top: 0; width: 35px; height: 35px; border-radius: 9999px;
  display: grid; place-items: center; font-family: var(--font-mono); font-size: 13px; color: #DCE6FF;
  background: #13203F; border: 1px solid rgba(143, 176, 255, 0.35); font-variant-numeric: tabular-nums;
}
.dp-step h3 { font-size: 1.25rem; font-weight: 600; line-height: 1.25; letter-spacing: -0.015em; color: var(--color-ink); padding-top: 4px; }
.dp-step p.dp-body { margin-top: 8px; max-width: 40ch; font-size: 1.0625rem; line-height: 1.6; color: var(--color-ink-soft); }
.dp-step .gv-card { margin-top: 20px; }
@media (min-width: 1024px) {
  .dp-step { padding: 0 0 72px 64px; }
  .dp-step-in { display: grid; grid-template-columns: 5fr 7fr; column-gap: 4rem; align-items: start; }
  .dp-step .gv-card { margin-top: 0; max-width: 30rem; }
  .dp-step h3 { font-size: 1.5rem; }
}
.dp-split { display: grid; gap: 16px; }
@media (min-width: 768px) { .dp-split { grid-template-columns: 1fr 1fr; } }
.dp-panel { border-radius: 20px; padding: 24px; background: #0A1226; border: 1px solid rgba(255, 255, 255, 0.08); }
.dp-panel[data-us] { background: linear-gradient(180deg, #13203F, #0A1226); border-color: rgba(143, 176, 255, 0.24); }
@media (min-width: 1024px) { .dp-panel { padding: 32px; } }
.dp-panel ul { list-style: none; margin: 20px 0 0; padding: 0; display: grid; gap: 14px; }
.dp-panel li { display: flex; gap: 12px; align-items: flex-start; font-size: 1.0625rem; line-height: 1.5; color: var(--color-ink-soft); }
.dp-tick { flex: none; margin-top: 3px; width: 20px; height: 20px; border-radius: 9999px; display: grid; place-items: center; background: rgba(77, 124, 255, 0.16); color: #8FB0FF; }
.dp-when { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.04em; text-transform: uppercase; color: #8FB0FF; padding-top: 4px; font-variant-numeric: tabular-nums; }
@media (min-width: 1024px) {
        }
.dp-week { border-radius: 20px; background: #0A1226; border: 1px solid rgba(255, 255, 255, 0.08); overflow: hidden; }
.dp-week li { display: grid; gap: 4px; padding: 18px 20px; border-top: 1px solid rgba(255, 255, 255, 0.06); }
.dp-week li:first-child { border-top: 0; }
@media (min-width: 768px) { .dp-week li { grid-template-columns: 11rem 1fr; gap: 24px; padding: 20px 28px; align-items: baseline; } }
.dp-week .dp-when { padding-top: 0; }
.dp-week p { font-size: 1.0625rem; line-height: 1.55; color: var(--color-ink-soft); }
.dp-tp { display: grid; gap: 20px; }
.dp-tp p { max-width: 40ch; font-size: 1.125rem; line-height: 1.6; color: var(--color-ink-soft); }
@media (min-width: 1024px) {
  .dp-tp { grid-template-columns: 5fr 7fr; column-gap: 4rem; align-items: start; }
  .dp-tp p { font-size: 1.25rem; padding-top: 4px; }
  .dp-tp .gv-card { max-width: 30rem; }
}
.dp-reveal { margin-top: 32px; }
.dp-reveal > summary {
  display: inline-flex; min-height: 48px; align-items: center; gap: 10px; padding: 0 20px; border-radius: 999px; cursor: pointer; list-style: none;
  font-weight: 500; color: #DCE6FF; border: 1.5px solid rgba(143, 176, 255, 0.35); background: #0A1226;
  transition: border-color 200ms ease, transform 200ms cubic-bezier(.16,1,.3,1);
}
.dp-reveal > summary::-webkit-details-marker { display: none; }
.dp-reveal > summary:hover { border-color: rgba(143, 176, 255, 0.6); transform: translateY(-2px); }
.dp-reveal > summary:focus-visible { outline: 2px solid #4D7CFF; outline-offset: 2px; }
.dp-reveal > summary svg { transition: transform 250ms cubic-bezier(.16,1,.3,1); }
.dp-reveal[open] > summary svg { transform: rotate(180deg); }
.dp-reveal[open] .dp-split { margin-top: 24px; animation: dp-in 0.35s ease both; }
@keyframes dp-in { from { opacity: 0; } to { opacity: 1; } }
.dp-live { margin-top: 40px; display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 16px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.08); }
.dp-live p { font-size: 1.0625rem; line-height: 1.55; color: var(--color-ink-soft); }
@media (prefers-reduced-motion: reduce) {
  .dp-reveal > summary, .dp-reveal > summary svg { transition: none; }
  .dp-reveal > summary:hover { transform: none; }
  .dp-reveal[open] .dp-split { animation: none; }
}
.dp-qa .qc-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid rgba(242, 239, 233, 0.1); }
.dp-qa .qc-item { border-bottom: 1px solid rgba(242, 239, 233, 0.1); }
.dp-qa .qc-h { margin: 0; font: inherit; }
.dp-qa .qc-btn {
  display: flex; width: 100%; min-height: 64px; align-items: center; justify-content: space-between; gap: 24px;
  padding: 16px 0; background: none; border: 0; color: #F2F5FC; text-align: left; cursor: pointer; transition: color 200ms;
}
.dp-qa .qc-btn:hover { color: #DCE6FF; }
.dp-qa .qc-btn:focus-visible { outline: 2px solid #4D7CFF; outline-offset: 2px; border-radius: 4px; }
.dp-qa .qc-q { font-family: var(--font-display); font-weight: 600; font-size: 1.125rem; line-height: 1.3; letter-spacing: -0.015em; }
.dp-qa .qc-glyph { position: relative; flex: none; width: 16px; height: 16px; }
.dp-qa .qc-glyph::before, .dp-qa .qc-glyph::after {
  content: ""; position: absolute; left: 0; top: 50%; width: 16px; height: 1.5px; margin-top: -0.75px; background: currentColor; border-radius: 1px;
}
.dp-qa .qc-glyph::after { transform: rotate(90deg); transition: transform 300ms cubic-bezier(.16,1,.3,1); }
.dp-qa .qc-item[data-open] .qc-glyph::after { transform: rotate(0deg); }
.dp-qa .qc-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 300ms cubic-bezier(.16,1,.3,1); }
.dp-qa .qc-item[data-open] .qc-panel { grid-template-rows: 1fr; }
.dp-qa .qc-panel-in { min-height: 0; overflow: hidden; }
.dp-qa .qc-a { margin: 0; padding: 0 40px 24px 0; max-width: 64ch; font-size: 1.0625rem; line-height: 1.55; color: rgba(234, 240, 255, 0.78); }
@media (min-width: 1024px) {
  .dp-qa .qc-btn { min-height: 72px; padding: 20px 0; }
  .dp-qa .qc-q { font-size: 1.375rem; }
}
@media (prefers-reduced-motion: reduce) {
  .dp-qa .qc-panel, .dp-qa .qc-glyph::after, .dp-qa .qc-btn { transition: none; }
}
`;

function Head({ eyebrow, title, lead, id }: { eyebrow: string; title: string; lead?: string; id: string }) {
  return (
    <Reveal variant="wipe" className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="h2 mt-4">
        <SplitWords text={title} />
      </h2>
      {lead ? <p className="lead mt-6">{lead}</p> : null}
    </Reveal>
  );
}

function WhoSplit({ youDo, weDo }: { youDo: string[]; weDo: string[] }) {
  return (
    <div className="dp-split">
      <div className="dp-panel h-full">
        <h3 className="text-[1.25rem] font-semibold text-[color:var(--color-ink)]">You</h3>
        <ul>
          {youDo.map((t) => (
            <li key={t}>
              <span className="dp-tick" style={{ background: "rgba(255,255,255,0.06)", color: "#C9D1E3" }}>
                <Check size={13} strokeWidth={2.6} aria-hidden />
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="dp-panel h-full" data-us="">
        <h3 className="text-[1.25rem] font-semibold text-[color:var(--color-ink)]">Us</h3>
        <ul>
          {weDo.map((t) => (
            <li key={t}>
              <span className="dp-tick">
                <Check size={13} strokeWidth={2.6} aria-hidden />
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ServiceDepth({
  depth,
  includes,
  demo,
  story,
  showWhat = true,
  sampleTags = true,
  showFaq = true,
  showCta = true,
  compact = false,
}: {
  depth: Omit<ServiceDepthData, "faqs"> & { faqs?: ServiceDepthData["faqs"] };
  /** Optional "what you get" checklist under the one line. */
  includes?: string[];
  /** Optional live demo beside the one line (a SlowChatDemo). */
  demo?: ReactNode;
  /** Optional before-and-after strip, shown first. */
  story?: { today: [string, string, string]; withUs: [string, string, string] };
  /** Off where the page already says what it does (the Operations Team page). */
  showWhat?: boolean;
  /** Mark each depth screen as a sample (off where the page already says so). */
  sampleTags?: boolean;
  showFaq?: boolean;
  showCta?: boolean;
  /** The shorter service page layout: tabs, a reveal and one line (see above). */
  compact?: boolean;
}) {
  const faqs = showFaq ? depth.faqs ?? [] : [];

  return (
    <>
      <style>{CSS}</style>
      <WorkVisualsStyle />
      <ServiceStripsStyle />

      {story ? (
        <section className="band-orbit chapter-pad" aria-labelledby="dp-change">
          <div className="container-wide">
            <Head eyebrow="Before and after" title="What changes for your customer." id="dp-change" />
            <div className="mt-10 md:mt-14">
              <BeforeAfter today={story.today} withUs={story.withUs} />
            </div>
          </div>
        </section>
      ) : null}

      {/* What it does, in one line */}
      {showWhat ? (
      <section className="band-night chapter-pad" aria-labelledby="dp-what">
        <div className={`container-wide grid gap-12 ${demo ? "lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16" : ""}`}>
          <div>
            <Reveal variant="wipe">
              <p className="eyebrow">What it does</p>
              <h2
                id="dp-what"
                className="mt-4 max-w-[26ch] font-display text-[color:var(--color-ink)]"
                style={{ fontSize: "clamp(1.75rem, 1.6vw + 1.2rem, 2.75rem)", lineHeight: 1.15, letterSpacing: "-0.03em" }}
              >
                {depth.oneLine}
              </h2>
            </Reveal>
            {includes && includes.length > 0 ? (
              <ul className="mt-10 grid gap-3">
                {includes.map((g, i) => (
                  <li key={g}>
                    <Reveal delay={i * 0.05} className="flex items-start gap-3 text-[1.0625rem] leading-[1.5] text-[color:var(--color-ink-soft)]">
                      <span className="dp-tick">
                        <Check size={13} strokeWidth={2.6} aria-hidden />
                      </span>
                      <span>{g}</span>
                    </Reveal>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          {demo ? <div className="min-w-0">{demo}</div> : null}
        </div>
      </section>
      ) : null}

      {/* Step by step */}
      {compact ? (
        <section className="band-orbit chapter-pad" aria-labelledby="dp-flow">
          <div className="container-wide">
            <Head eyebrow="Step by step" title="How it works." id="dp-flow" />
            <div className="mt-10 md:mt-14">
              <DepthTabs
                label="How it works"
                tabs={depth.steps.slice(0, 4).map((st) => ({
                  label: st.title,
                  panel: (
                    <div className="dp-tp">
                      <p>{st.body}</p>
                      <DepthVisual visual={st.visual} />
                    </div>
                  ),
                }))}
              />
            </div>
          </div>
        </section>
      ) : (
      <section className="band-orbit chapter-pad" aria-labelledby="dp-flow">
        <div className="container-wide">
          <Head eyebrow="Step by step" title="How it works." lead="What happens, in the order it happens." id="dp-flow" />
          <ol className="dp-steps mt-12 md:mt-16">
            {depth.steps.map((s, i) => (
              <li key={s.title} className="dp-step">
                <span className="dp-n" aria-hidden>
                  {i + 1}
                </span>
                <Reveal className="dp-step-in">
                  <div>
                    <h3>{s.title}</h3>
                    <p className="dp-body">{s.body}</p>
                  </div>
                  <div style={{ position: "relative" }}>
                    <DepthVisual visual={s.visual} />
                    {sampleTags ? <SampleTag place="tr" style={{ top: -10, right: -6 }}>Sample</SampleTag> : null}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>
      )}

      {/* Who does what */}
      <section className={`band-night ${compact ? "py-16 md:py-24" : "chapter-pad"}`} aria-labelledby="dp-who">
        <div className="container-wide">
          {compact ? (
            <>
              <Head eyebrow="Who does what" title="Your part is small." id="dp-who" />
              <details className="dp-reveal">
                <summary>
                  Show me who does what
                  <ChevronDown size={16} aria-hidden />
                </summary>
                <WhoSplit youDo={depth.youDo} weDo={depth.weDo} />
              </details>
            </>
          ) : (
            <>
              <Head eyebrow="Who does what" title="Your part is small." lead="A few decisions from you. We do the rest." id="dp-who" />
              <Reveal className="mt-12 md:mt-16">
                <WhoSplit youDo={depth.youDo} weDo={depth.weDo} />
              </Reveal>
            </>
          )}
        </div>
      </section>

      {/* The build stem */}
      <section className="band-orbit chapter-pad" aria-labelledby="dp-days">
        <div className="container-wide">
          <Head eyebrow="The build" title="Progress you can see." lead="Each build is different. Every stage is tracked, and you can see where it is at any time." id="dp-days" />
          <div className="mt-12 md:mt-16">
            <BuildStem buildNote={depth.buildNote} />
          </div>
          {compact ? (
            <div className="dp-live">
              <span className="dp-when">Once it is live</span>
              <p>Each month: a short report in plain words, with one thing to improve.</p>
            </div>
          ) : null}
        </div>
      </section>

      {/* Once it is live */}
      {compact ? null : (
      <section className="band-night chapter-pad" aria-labelledby="dp-week">
        <div className="container-wide">
          <Head eyebrow="Once it is live" title="What you see each week." id="dp-week" />
          <Reveal className="mt-12 md:mt-16">
            <ul className="dp-week">
              {depth.weekly.map((w) => (
                <li key={w.label}>
                  <span className="dp-when">{w.label}</span>
                  <p>{w.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
      )}

      {faqs.length > 0 ? (
        <section className="band-orbit chapter-pad" aria-labelledby="dp-qa">
          <div className="container-wide grid gap-12 lg:grid-cols-[4fr_7fr] lg:gap-[8%]">
            <Head eyebrow="Questions" title="What people ask." id="dp-qa" />
            <div className="dp-qa">
              <QuestionsAccordion items={faqs} />
            </div>
          </div>
        </section>
      ) : null}

      {showCta ? (
        <section className="band-night chapter-pad" aria-labelledby="dp-book">
          <div className="container-wide">
            <Reveal variant="wipe" className="max-w-3xl">
              <h2 id="dp-book" className="h2">
                <SplitWords text="See what it would do for you." />
              </h2>
              <p className="lead mt-6">A free 30-minute call. We look at how enquiries reach you today and show you what we would build first.</p>
            </Reveal>
            <div className="mt-10 flex flex-col items-start gap-3">
              <a href={GENERIC_BOOK_URL} className="btn btn-accent min-h-[52px] w-full justify-center px-7 text-[1.02rem] sm:w-auto">
                {CTA_PRIMARY}
                <ArrowUpRight size={17} aria-hidden />
              </a>
              <p className="text-[0.9rem] text-[color:var(--color-ink-muted)]">{CTA_PRIMARY_MICRO}</p>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
