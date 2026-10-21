import { DrawOnView } from "@/components/services/DrawOnView";

/**
 * /services: the Earth moment. A thin night limb used as a divider above
 * "Works with anything you already use": the edge of the planet at night,
 * a line of atmosphere, and two lit places (the UK and South Africa).
 * Always on, and connected. Decorative; one line of text says the point.
 */

const CSS = `
.el { position: relative; background: #060B1A; overflow: hidden; }
.el-svg { display: block; width: 100%; height: 120px; }
@media (min-width: 768px) { .el-svg { height: 160px; } }
.el-atmo { fill: none; stroke: url(#el-g); stroke-width: 1.5; }
.el-haze { fill: none; stroke: rgba(77, 124, 255, 0.28); stroke-width: 14; filter: blur(10px); }
.el-city { fill: #FFD9A0; }
.el-tag { font-family: var(--font-mono, ui-monospace, monospace); font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; fill: #C9D1E3; }
.el-cap { position: absolute; left: 0; right: 0; top: 18px; text-align: center; font-size: 0.95rem; color: #C9D1E3; }
@media (min-width: 768px) { .el-cap { top: 26px; } }
`;

const CITIES: [number, number, number][] = [
  // UK cluster
  [606, 116, 1.8], [614, 119, 1.2], [600, 121, 1.1], [620, 114, 1], [609, 124, 0.9],
  // South Africa cluster
  [822, 118, 1.7], [834, 121, 1.2], [816, 124, 1], [840, 116, 1], [828, 127, 0.9],
];

export function ServicesEarthLimb() {
  return (
    <div className="el" aria-hidden>
      <style>{CSS}</style>
      <DrawOnView threshold={0.5}>
        <p className="el-cap dv-fade" style={{ ["--d" as string]: "0.5s" }}>
          Answering in the UK and South Africa, day and night.
        </p>
        <svg className="el-svg" viewBox="0 0 1440 160" preserveAspectRatio="xMidYMax slice">
          <defs>
            <linearGradient id="el-g" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#2554D4" stopOpacity="0" />
              <stop offset="0.35" stopColor="#4D7CFF" />
              <stop offset="0.65" stopColor="#8FB0FF" />
              <stop offset="1" stopColor="#2554D4" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="el-p" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#0E1A3A" />
              <stop offset="1" stopColor="#060B1A" />
            </linearGradient>
          </defs>
          <circle cx="720" cy="2560" r="2460" fill="url(#el-p)" />
          <path className="el-haze dv-fade" d="M-200 278.5 A2460 2460 0 0 1 1640 278.5" />
          <path className="el-atmo dv-line" pathLength={1} d="M-200 278.5 A2460 2460 0 0 1 1640 278.5" />
          {CITIES.map(([x, y, r], i) => (
            <circle key={i} className="el-city dv-fade" style={{ ["--d" as string]: `${0.35 + i * 0.03}s` }} cx={x} cy={y} r={r} />
          ))}
          <text className="el-tag dv-fade" style={{ ["--d" as string]: "0.6s" }} x="611" y="146" textAnchor="middle">
            UK
          </text>
          <text className="el-tag dv-fade" style={{ ["--d" as string]: "0.6s" }} x="828" y="148" textAnchor="middle">
            SA
          </text>
        </svg>
      </DrawOnView>
    </div>
  );
}
