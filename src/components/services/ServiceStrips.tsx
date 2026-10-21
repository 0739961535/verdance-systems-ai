import { DrawOnView } from "@/components/services/DrawOnView";

/**
 * Two shared strips for the service pages.
 *
 * BeforeAfter: what changes for the customer, in two rows of three beats
 * ("Today" ends in a loss, "With Verdance" ends booked). The point in five
 * seconds: the same moment, a different ending.
 *
 * BuildStem: the 10 working days as a stem with ten tick marks, after the
 * three steps before day 1 (call, map, plan). Live on day 10 is the bloom.
 *
 * Both draw in once on view (stroke-dashoffset and opacity), static under
 * reduced motion.
 */

const d = (s: number) => ({ ["--d" as string]: `${s}s` });

const CSS = `
.ba { display: grid; gap: 28px; }
.ba-row { display: grid; gap: 12px; }
.ba-label { display: inline-flex; align-self: start; justify-self: start; align-items: center; min-height: 28px; padding: 2px 12px; border-radius: 999px; font-family: var(--font-mono); font-size: 0.8125rem; letter-spacing: 0.06em; text-transform: uppercase; }
.ba-row[data-k="today"] .ba-label { color: #C9D1E3; background: rgba(255, 255, 255, 0.06); }
.ba-row[data-k="us"] .ba-label { color: #DCE6FF; background: rgba(77, 124, 255, 0.2); }
.ba-beats { display: grid; grid-template-columns: minmax(0, 1fr) 18px minmax(0, 1fr) 18px minmax(0, 1fr); align-items: stretch; }
@media (min-width: 768px) { .ba-beats { grid-template-columns: minmax(0, 1fr) 56px minmax(0, 1fr) 56px minmax(0, 1fr); } }
.ba-beat { display: flex; align-items: center; min-height: 64px; padding: 12px; border-radius: 14px; font-size: 0.95rem; line-height: 1.3; font-weight: 500; color: #EAF0FF; background: #0A1226; border: 1.5px solid rgba(143, 176, 255, 0.2); }
@media (min-width: 768px) { .ba-beat { padding: 16px 20px; font-size: 1.0625rem; min-height: 72px; } }
.ba-row[data-k="today"] .ba-beat { color: #C9D1E3; border-style: dashed; border-color: rgba(201, 209, 227, 0.22); }
.ba-row[data-k="today"] .ba-beat[data-end] { color: #F6B8A8; border-color: rgba(246, 140, 120, 0.45); }
.ba-row[data-k="us"] .ba-beat[data-end] { color: #9BE8BE; border-color: rgba(91, 214, 154, 0.55); background: rgba(91, 214, 154, 0.06); }
.ba-link { display: block; width: 100%; height: 2px; overflow: visible; }
.ba-gap { display: flex !important; align-items: center; }
.ba-link line { stroke-width: 1.5; }
.ba-row[data-k="today"] .ba-link line { stroke: rgba(201, 209, 227, 0.35); }
.ba-row[data-k="us"] .ba-link line { stroke: #4D7CFF; }

.bs { display: grid; gap: 40px; }
@media (min-width: 1024px) { .bs { grid-template-columns: minmax(0, 3fr) minmax(0, 7fr); gap: 56px; align-items: start; } }
.bs-cap { font-family: var(--font-mono); font-size: 0.8125rem; letter-spacing: 0.08em; text-transform: uppercase; color: #9AA3B5; }
.bs-pre ol { list-style: none; margin: 16px 0 0; padding: 0; display: grid; gap: 14px; }
.bs-pre li { display: grid; grid-template-columns: 14px 1fr; gap: 12px; align-items: start; }
.bs-bud { margin-top: 6px; width: 10px; height: 10px; border-radius: 999px 999px 999px 0; transform: rotate(-45deg); border: 1.5px solid #8FB0FF; }
.bs-pre b { display: block; font-size: 1.0625rem; font-weight: 600; color: #F2F5FC; }
.bs-pre span.bs-tx { display: block; margin-top: 2px; font-size: 0.98rem; line-height: 1.5; color: #C9D1E3; }
.bs-main { min-width: 0; }
.bs-track { position: relative; margin-top: 18px; }
.bs-stem { position: absolute; left: 0; right: 0; top: 0; height: 2px; width: 100%; overflow: visible; }
.bs-stem line { stroke: #4D7CFF; stroke-width: 1.5; }
.bs-days { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(10, minmax(0, 1fr)); }
.bs-day { position: relative; display: flex; flex-direction: column; align-items: center; }
.bs-tick { width: 1.5px; height: 14px; margin-top: -6px; background: #8FB0FF; }
.bs-num { margin-top: 8px; font-family: var(--font-mono); font-size: 0.8125rem; color: #C9D1E3; font-variant-numeric: tabular-nums; }
.bs-day[data-live] .bs-tick { display: none; }
.bs-flower { margin-top: -14px; width: 28px; height: 28px; }
.bs-flower path { fill: rgba(77, 124, 255, 0.35); stroke: #BFD3FF; stroke-width: 1.5; vector-effect: non-scaling-stroke; }
.bs-flower circle { fill: #4D7CFF; }
.bs-day[data-live] .bs-num { margin-top: 2px; color: #F2F5FC; font-weight: 600; }
.bs-phases { margin-top: 18px; display: grid; grid-template-columns: repeat(10, minmax(0, 1fr)); column-gap: 6px; }
.bs-ph { padding-top: 8px; border-top: 1.5px solid rgba(143, 176, 255, 0.45); font-size: 0.9rem; font-weight: 600; color: #F2F5FC; text-align: center; white-space: nowrap; }
.bs-ph small { display: block; font-family: var(--font-mono); font-weight: 400; font-size: 0.75rem; letter-spacing: 0.06em; text-transform: uppercase; color: #9AA3B5; margin-top: 2px; }
.bs-ph[data-live] { border-top-color: #9BE8BE; color: #9BE8BE; overflow: visible; }
.bs-notes { list-style: none; margin: 28px 0 0; padding: 0; display: grid; gap: 14px; }
@media (min-width: 768px) { .bs-notes { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; } }
.bs-notes b { display: block; font-size: 1.0625rem; font-weight: 600; color: #F2F5FC; }
.bs-notes span { display: block; margin-top: 2px; font-size: 0.98rem; line-height: 1.5; color: #C9D1E3; }
`;

export function ServiceStripsStyle() {
  return <style>{CSS}</style>;
}

function Link() {
  return (
    <svg className="ba-link" viewBox="0 0 10 2" preserveAspectRatio="none" aria-hidden>
      <line className="dv-line" pathLength={1} x1="0" y1="1" x2="10" y2="1" />
    </svg>
  );
}

function Row({ k, label, beats, base }: { k: "today" | "us"; label: string; beats: [string, string, string]; base: number }) {
  return (
    <div className="ba-row" data-k={k}>
      <span className="ba-label dv-fade" style={d(base)}>
        {label}
      </span>
      <ol className="ba-beats" aria-label={label}>
        {beats.map((b, i) => (
          <li key={b} className="contents">
            {i > 0 ? (
              <span aria-hidden className="ba-gap dv-fade" style={d(base + i * 0.25)}>
                <Link />
              </span>
            ) : null}
            <span className="ba-beat dv-fade" data-end={i === 2 ? "" : undefined} style={d(base + 0.1 + i * 0.25)}>
              {b}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function BeforeAfter({ today, withUs }: { today: [string, string, string]; withUs: [string, string, string] }) {
  return (
    <DrawOnView className="ba">
      <Row k="today" label="Today" beats={today} base={0} />
      <Row k="us" label="With Verdance" beats={withUs} base={0.6} />
    </DrawOnView>
  );
}

const PRE = [
  { name: "Call", text: "A free 30-minute call about how enquiries reach you today." },
  { name: "Map", text: "The Operations Map: where your time and money leak, in numbers." },
  { name: "Plan", text: "A fixed quote in writing. You sign it off and day 1 starts." },
];

export function BuildStem({ buildNote }: { buildNote: string }) {
  return (
    <DrawOnView className="bs">
      <div className="bs-pre">
        <p className="bs-cap">Before day 1</p>
        <ol>
          {PRE.map((p, i) => (
            <li key={p.name} className="dv-fade" style={d(i * 0.1)}>
              <span className="bs-bud" aria-hidden />
              <span>
                <b>{p.name}</b>
                <span className="bs-tx">{p.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div className="bs-main">
        <p className="bs-cap">10 working days</p>
        <div className="bs-track">
          <svg className="bs-stem" viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden>
            <line className="dv-line" pathLength={1} x1="5" y1="1" x2="95" y2="1" style={d(0.2)} />
          </svg>
          <ol className="bs-days" aria-label="Days 1 to 10">
            {Array.from({ length: 10 }, (_, i) => (
              <li key={i} className="bs-day dv-fade" data-live={i === 9 ? "" : undefined} style={d(0.3 + i * 0.07)}>
                {i === 9 ? (
                  <svg className="bs-flower" viewBox="-14 -14 28 28" aria-hidden>
                    {[0, 72, 144, 216, 288].map((a) => (
                      <path key={a} transform={`rotate(${a})`} d="M0 -2 C 3.5 -4 3.5 -10 0 -12 C -3.5 -10 -3.5 -4 0 -2 Z" />
                    ))}
                    <circle r="2.2" />
                  </svg>
                ) : (
                  <span className="bs-tick" aria-hidden />
                )}
                <span className="bs-num">
                  <span className="sr-only">Day </span>
                  {i + 1}
                </span>
              </li>
            ))}
          </ol>
          <div className="bs-phases" aria-hidden>
            <span className="bs-ph dv-fade" style={{ ...d(0.6), gridColumn: "1 / 6" }}>
              Build<small>Week 1</small>
            </span>
            <span className="bs-ph dv-fade" style={{ ...d(0.9), gridColumn: "6 / 10" }}>
              Test<small>Week 2</small>
            </span>
            <span className="bs-ph dv-fade" data-live="" style={{ ...d(1.1), gridColumn: "10 / 11" }}>
              Live
            </span>
          </div>
        </div>
        <ul className="bs-notes">
          <li className="dv-fade" style={d(0.8)}>
            <b>Build</b>
            <span>{buildNote}</span>
          </li>
          <li className="dv-fade" style={d(1)}>
            <b>Test</b>
            <span>You and your team try it before any customer sees it.</span>
          </li>
          <li className="dv-fade" style={d(1.2)}>
            <b>Live</b>
            <span>It goes live on day 10, and we watch the first weeks closely.</span>
          </li>
        </ul>
      </div>
    </DrawOnView>
  );
}
