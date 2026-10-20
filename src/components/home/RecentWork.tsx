import { ArrowUpRight } from "lucide-react";
import { CTA_PRIMARY } from "@/data/site";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { SplitWords } from "@/components/primitives/Reveal";
import { EcomVisuals, StudioVisuals } from "@/components/home/proof/cases";
import { PROOF_CSS } from "@/components/home/proof/styles";
import { RealRecording } from "./proof/RealRecording";
/**
 * 08 Proof: two anonymised builds as editorial spreads on the paper band.
 * Rules: no client names, logos, URLs, phone numbers, faces, invented numbers or testimonials.
 * Each case shows what we built as drawn UI (proof/), labelled as illustration:
 * tabs on phones (Chat, Pipeline, Automations, Report or Brief form), a 2x2 grid on desktop.
 * The chapter itself stays a server component; only the illustration sets hydrate.
 */

const BODY = "text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink-soft)]";

/**
 * The copy for each case lives in one place, keyed by case, so a spread can only
 * ever show its own "What we built" and "What it does" lines.
 */
const CASES = {
  ecom: {
    built: "Replies to every order question across website chat, WhatsApp and email, after hours included.",
    does: "Order questions and follow-ups handled, with a person taking over when it matters.",
  },
  studio: {
    built: "A premium website and a project brief form.",
    does: "Enquiries arrive with the details needed to quote.",
  },
} as const;

function rowsFor(c: { built: string; does: string }): [string, string][] {
  return [
    ["What we built", c.built],
    ["What it does", c.does],
  ];
}

/** One case as an editorial spread: a big picture, then what we built and what it does. */
function Spread({ id, title, visual, caption, rows, flip, extra }: { id: string; title: string; visual: React.ReactNode; caption: string; rows: [string, string][]; flip?: boolean; extra?: React.ReactNode }) {
  return (
    <article aria-labelledby={id} data-reveal="" className={`work-spread ${flip ? "is-flip" : ""}`}>
      <figure className="work-pic m-0">
        {visual}
        <figcaption className="museum mt-3">{caption}</figcaption>
      </figure>
      <div className="work-text">
        <h3 id={id} className="font-display text-[1.375rem] text-[color:var(--color-ink)] lg:text-[1.75rem]" style={{ lineHeight: 1.2, letterSpacing: "-0.02em" }}>
          {title}
        </h3>
        <dl className="mt-6 grid">
          {rows.map(([k, v]) => (
            <div key={`${id}-${k}`} className="border-t border-[color:var(--hairline-2)] py-4">
              <dt className="font-mono text-[0.75rem] text-[color:var(--color-ink-muted)]">{k}</dt>
              <dd className={`mt-1 ${BODY}`}>{v}</dd>
            </div>
          ))}
        </dl>
        {extra ? <div className="mt-8">{extra}</div> : null}
      </div>
    </article>
  );
}

const CSS = `
.work-spread { display: grid; gap: 24px; }
.work-spread + .work-spread { margin-top: 64px; }
@media (min-width: 1024px) {
  .work-spread { grid-template-columns: 7fr 4fr; column-gap: 8.5%; align-items: center; }
  .work-spread.is-flip { grid-template-columns: 4fr 7fr; }
  .work-spread.is-flip .work-pic { order: 2; }
  .work-spread + .work-spread { margin-top: 128px; }
}
`;

export function RecentWork() {
  return (
    <section className="band-paper chapter-pad" aria-labelledby="work-title">
      <style>{CSS + PROOF_CSS}</style>
      <div className="container-wide">
        <div className="max-w-3xl" data-reveal="">
          <p className="eyebrow"><span className="chap-n">08</span> Proof</p>
          <h2 id="work-title" className="h2 mt-4">
            <SplitWords text="Built and running for owner-led" /> <span>businesses.</span>
          </h2>
          <p className="lead mt-6">Two recent builds. Client names stay private.</p>
        </div>

        <div className="mt-12 lg:mt-16">
          {/* TODO(Daniel): add a "Since" row (month and year) to each case, and one real
              number for the e-commerce brand once Peter gives written OK. Nothing shows until then. */}
          <Spread
            id="work-ecom"
            title="A South African e-commerce brand"
            visual={<EcomVisuals />}
            caption="Drawn from the real system. Customers, orders and details are changed."
            rows={rowsFor(CASES.ecom)}
            extra={
              <RealRecording
                src={{ webm: "/work/proof/ecom-results.webm", mp4: "/work/proof/ecom-results.mp4" }}
                poster="/work/proof/ecom-results-poster.webp"
                label="Screen recording of the brand's live results page, names and numbers hidden"
                caption="Their live results page, recorded. Names and numbers hidden for privacy."
              />
            }
          />
          <Spread
            id="work-studio"
            flip
            title="A South African luxury home design and build studio"
            visual={<StudioVisuals />}
            caption="Drawn from the real system. Names and details are changed, the studio stays private."
            rows={rowsFor(CASES.studio)}
          />
        </div>

        <div className="mt-16 lg:mt-24">
          <a href={GENERIC_BOOK_URL} className="btn btn-accent min-h-[52px] w-full justify-center px-7 text-[1.02rem] sm:w-auto">
            {CTA_PRIMARY}
            <ArrowUpRight size={17} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
