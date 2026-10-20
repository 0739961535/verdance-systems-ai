import { SlowChatDemo, type Demo } from "@/components/demos/SlowChatDemo";

/**
 * Two visuals on /how-it-works: the Map chart and the Build demo. Decorative (aria-hidden)
 * and made-up sample content, labelled "Sample" wherever a number appears.
 * They reuse the .gv-* card language from the home page (WorkVisualsStyle
 * must be rendered once on the page) and add a few pieces of their own.
 * Motion hangs off the parent row's [data-reveal] attributes, plays once,
 * and only moves transform and opacity. Reduced motion shows the end state.
 */

const d = (s: number) => ({ ["--d" as string]: `${s}s` });

export const HOW_VISUALS_CSS = `
.hv-card { margin-top: 0; max-width: 100%; }
@media (min-width: 768px) { .hv-card { max-width: 30rem; } }

/* Map: where time leaks, in rand and hours */
.hv-leaks { display: grid; gap: 12px; margin: 0; padding: 0; list-style: none; }
.hv-leak-top { display: flex; justify-content: space-between; gap: 12px; font-size: 13px; color: #C9D1E3; }
.hv-leak-top b { font-weight: 600; color: #F2F5FC; white-space: nowrap; }
.hv-bar { display: block; position: relative; height: 8px; margin-top: 6px; border-radius: 99px; background: rgba(255, 255, 255, 0.06); overflow: hidden; }
.hv-bar i {
  position: absolute; inset: 0; border-radius: inherit; transform-origin: 0 50%;
  transform: scaleX(var(--w));
  background: linear-gradient(90deg, rgba(77, 124, 255, 0.6), #8FB0FF);
  box-shadow: 0 0 12px rgba(77, 124, 255, 0.55);
}
.hv-hours { display: block; margin-top: 4px; font-size: 12px; color: #8B93A3; }
.hv-total { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
.hv-total b { font-family: var(--font-display); font-size: 1.5rem; font-weight: 600; letter-spacing: -0.02em; color: #F2F5FC; }
.hv-total span { font-size: 12.5px; color: #8B93A3; }

/* Build: the one slow demo */
.hv-build { display: grid; gap: 12px; }
.hv-build .sd-card { max-width: 100%; }
@media (min-width: 768px) { .hv-build { max-width: 30rem; } }

@media (prefers-reduced-motion: no-preference) {
  [data-reveal][data-armed] .hv-bar i { transition: transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) var(--d, 0.15s); }
  [data-reveal][data-armed]:not([data-revealed]) .hv-bar i { transform: scaleX(0); }
  [data-reveal][data-armed]   [data-reveal][data-armed]:not([data-revealed]) }
`;

/* Sample leaks (made up, labelled "Sample" on the card). */
const LEAKS = [
  { what: "Enquiries after 17:00", rand: "R21,000", hours: 7, w: 1 },
  { what: "Quotes nobody chased", rand: "R16,500", hours: 5, w: 0.79 },
  { what: "Bookings typed twice", rand: "R6,000", hours: 4, w: 0.29 },
];

function MapVisual() {
  const total = LEAKS.reduce((s, l) => s + l.hours, 0);
  return (
    <div aria-hidden className="gv-card hv-card">
      <div className="gv-top">
        <span>
          <span className="gv-app block">Operations Map</span>
          <span className="gv-sub">Rand a month, hours a week</span>
        </span>
        <span className="gv-chip" data-tone="muted">Sample</span>
      </div>
      <ul className="hv-leaks">
        {LEAKS.map((l, i) => (
          <li key={l.what}>
            <span className="hv-leak-top">
              <span>{l.what}</span>
              <b>{l.rand}</b>
            </span>
            <span className="hv-bar">
              <i style={{ ["--w" as string]: l.w, ...d(0.4 + i * 0.15) }} />
            </span>
            <span className="hv-hours">{l.hours} hours a week</span>
          </li>
        ))}
      </ul>
      <div className="gv-hr" />
      <p className="hv-total gv-in" style={d(0.95)}>
        <span>Hours back each week</span>
        <b>{total}</b>
      </p>
    </div>
  );
}

const BUILD_DEMO: Demo = {
  business: "Coastal Tile Studio",
  channel: "WhatsApp · Saturday 21:40",
  messages: [
    { from: "them", text: "Hi, do you have the oak look tiles in stock?", time: "21:40" },
    { from: "us", text: "We do, 42 boxes in Cape Town. Shall I hold some for you?", time: "21:40" },
    { from: "them", text: "Yes please, 12 boxes", time: "21:41" },
    { from: "card", title: "Held until Monday", lines: ["12 boxes, oak look", "Your team is told"], tone: "info" },
  ],
};

function BuildVisual() {
  return (
    <div className="hv-build">
      <SlowChatDemo demo={BUILD_DEMO} />
    </div>
  );
}

export type HowVisualKey = "call" | "map" | "plan" | "build" | "review";

/** Only Map (a mini chart) and Build (the one slow demo) carry a visual. */
export function HowVisual({ k }: { k: HowVisualKey }) {
  if (k === "map") return <MapVisual />;
  if (k === "build") return <BuildVisual />;
  return null;
}
