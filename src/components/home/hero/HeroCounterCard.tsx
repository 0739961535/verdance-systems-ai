/** Starting value of the example counter. Example only, never a real figure. */
export const HERO_COUNT_START = 346;

/**
 * The hero's live counter, server-rendered so it is in the first HTML and
 * holds its space. HeroSignal (loaded later) finds it by data attribute,
 * counts it up as each example enquiry lands and mounts the live status
 * line into the slot. Clearly labelled as an example.
 */
export function HeroCounterCard() {
  return (
    <div className="hs-card" data-hero-card aria-label="Example: enquiries answered today. Every reply under 60 seconds." role="img">
      <span className="hs-count" aria-hidden>
        <span className="hs-bump" data-hero-count>
          {HERO_COUNT_START}
        </span>
      </span>
      <span className="hs-count-label" aria-hidden>
        Enquiries answered today
        <span className="hs-example">Example</span>
      </span>
      <span className="hs-status hs-status-slot" data-hero-status aria-hidden>
        <span className="hs-live-dot" />
        <span className="hs-status-static">Every reply under 60 s</span>
      </span>
    </div>
  );
}
