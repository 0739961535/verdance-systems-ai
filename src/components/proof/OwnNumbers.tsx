import { FOUNDER_VIDEO, OWN_NUMBERS } from "@/data/proof";
import { FounderVideo } from "./FounderVideo";

/** "Our own numbers": Verdance's own Operations Team figures. Renders nothing until real. */
export function OwnNumbers({ className = "" }: { className?: string }) {
  const { enquiriesThisMonth: n, medianReplySeconds: s, asOf } = OWN_NUMBERS;
  if (n == null || s == null || !asOf) return null;
  return (
    <section className={`card-x p-6 md:p-8 ${className}`} aria-labelledby="own-numbers-title">
      <p className="eyebrow" id="own-numbers-title">
        Our own numbers
      </p>
      <dl className="mt-5 grid gap-6 sm:grid-cols-2">
        <div>
          <dt className="text-[0.95rem] text-[color:var(--color-ink-muted)]">Enquiries answered this month</dt>
          <dd className="mt-1 font-display text-[2.25rem] text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.03em" }}>
            {n.toLocaleString("en-GB")}
          </dd>
        </div>
        <div>
          <dt className="text-[0.95rem] text-[color:var(--color-ink-muted)]">Median first reply</dt>
          <dd className="mt-1 font-display text-[2.25rem] text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.03em" }}>
            {s} seconds
          </dd>
        </div>
      </dl>
      <p className="museum mt-5">From our own Operations Team, which answers Verdance&apos;s enquiries. Taken {asOf}.</p>
    </section>
  );
}

/** The about-page band: our own numbers and the founder clip. Nothing renders while both are empty. */
export function ProofBand() {
  const ready = OWN_NUMBERS.enquiriesThisMonth != null && OWN_NUMBERS.medianReplySeconds != null && !!OWN_NUMBERS.asOf;
  if (!ready && !FOUNDER_VIDEO) return null;
  return (
    <section className="section-pad bg-canvas" style={{ borderTop: "1px solid var(--hairline)" }} aria-label="Proof">
      <div className="container-wide grid gap-10 lg:grid-cols-2 lg:gap-16">
        <OwnNumbers />
        <FounderVideo />
      </div>
    </section>
  );
}
