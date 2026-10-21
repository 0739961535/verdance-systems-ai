import { SlowChatDemo, type Demo } from "@/components/demos/SlowChatDemo";

/**
 * The one visual on /how-it-works: the Build step's slow chat demo.
 * Made-up sample content; SlowChatDemo labels itself as a sample and shows
 * every message at once under reduced motion. (The Map step's old chart now
 * lives on /audit as the Operations Map bloom.)
 */

export const HOW_VISUALS_CSS = `
.hv-build { display: grid; gap: 12px; }
.hv-build .sd-card { max-width: 100%; }
@media (min-width: 768px) { .hv-build { max-width: 30rem; } }
`;

const BUILD_DEMO: Demo = {
  business: "Coastal Tile Studio",
  channel: "WhatsApp · Saturday 21:40",
  messages: [
    { from: "them", text: "Hi, do you have the oak look tiles in stock?", time: "21:40" },
    { from: "us", text: "We do, 42 boxes in stock. Shall I hold some for you?", time: "21:40" },
    { from: "them", text: "Yes please, 12 boxes", time: "21:41" },
    { from: "card", title: "Held until Monday", lines: ["12 boxes, oak look", "Your team is told"], tone: "info" },
  ],
};

export type HowVisualKey = "call" | "map" | "plan" | "build" | "review";

/** Only Build carries a visual. */
export function HowVisual({ k }: { k: HowVisualKey }) {
  if (k !== "build") return null;
  return (
    <div className="hv-build">
      <SlowChatDemo demo={BUILD_DEMO} />
    </div>
  );
}
