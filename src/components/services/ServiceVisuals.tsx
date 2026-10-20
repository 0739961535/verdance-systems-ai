import { GetVisual } from "@/components/home/inbox/WorkVisuals";
import { SlowChatDemo, type Demo } from "@/components/demos/SlowChatDemo";

/**
 * A few touches for /services, sprinkled under some pillar intros rather
 * than on every row: one slow chat demo (plays only on screen), the home
 * page's report card and a small workflow card. Made-up sample content,
 * always labelled. Needs WorkVisualsStyle on the page for the .gv-* styles.
 */

const AFTER_HOURS: Demo = {
  business: "Coastal Lodge",
  channel: "WhatsApp · 22:47 · after hours",
  messages: [
    { from: "them", text: "Any rooms for two this Friday?", time: "22:47" },
    { from: "us", text: "Yes. Garden room or sea view?", time: "22:47" },
    { from: "them", text: "Sea view please", time: "22:48" },
    { from: "card", title: "Booked for Friday", lines: ["Sea view room, 2 guests", "Deposit link sent"] },
  ],
};

const d = (s: number) => ({ ["--d" as string]: `${s}s` });

function Flow() {
  const steps = ["New order", "Stock checked", "Driver booked", "Customer told"];
  return (
    <div aria-hidden className="gv-card">
      <div className="gv-top">
        <span>
          <span className="gv-app block">Your workflow</span>
          <span className="gv-sub">Runs on its own</span>
        </span>
        <span className="gv-chip" data-tone="muted">Sample</span>
      </div>
      <ol className="svv-flow">
        {steps.map((s, i) => (
          <li key={s} className="gv-in" style={d(0.3 + i * 0.22)}>
            <span className="svv-node">{i + 1}</span>
            <span>{s}</span>
            {i === steps.length - 1 ? (
              <span className="gv-chip ml-auto" data-tone="green">Done</span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** The touch for a pillar, or null for a calm text-only pillar. */
export function PillarVisual({ slug }: { slug: string }) {
  if (slug === "sales") return <SlowChatDemo demo={AFTER_HOURS} />;
  if (slug === "operations") return <GetVisual word="Report" />;
  if (slug === "automations") return <Flow />;
  return null;
}

export const PILLAR_VISUAL_SLUGS = ["sales", "operations", "automations"];

export const SERVICE_VISUALS_CSS = `
.sv-vis { position: relative; margin-top: 2rem; max-width: 26rem; }
.sv-vis::before { content: ""; position: absolute; inset: 14% 4% -8%; border-radius: 40px; background: radial-gradient(60% 60% at 50% 50%, rgba(77, 124, 255, 0.24), transparent 70%); filter: blur(30px); pointer-events: none; }
.sv-vis > * { position: relative; }
.sv-vis .gv-card { margin-top: 0; max-width: none; }
.svv-flow { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; }
.svv-flow li { position: relative; display: flex; align-items: center; gap: 12px; padding: 8px 10px; border-radius: 12px; background: rgba(255, 255, 255, 0.025); border: 1px solid rgba(255, 255, 255, 0.06); }
.svv-flow li + li::before { content: ""; position: absolute; left: 22px; top: -11px; width: 1px; height: 10px; background: rgba(143, 176, 255, 0.4); }
.svv-node { width: 24px; height: 24px; flex: none; display: grid; place-items: center; border-radius: 9999px; font-size: 11.5px; font-weight: 600; color: #DCE6FF; background: rgba(77, 124, 255, 0.2); border: 1px solid rgba(143, 176, 255, 0.4); }
`;
