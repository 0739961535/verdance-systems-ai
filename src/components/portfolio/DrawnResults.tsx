/**
 * A drawn stand-in for the e-commerce brand's live results page, used until
 * the client gives written OK to show the real one. No names and no numbers:
 * every figure is a shimmer bar. Inline SVG, no image to load, sized by the
 * device frame around it (16:10 laptop, 1:2 phone).
 */

const INK = "#DCE3F2";
const SOFT = "#7F8AA3";
const PANEL = "#0F1A36";
const LINE = "rgba(143,176,255,0.16)";

function Bar({ x, y, w, h = 14, o = 0.22 }: { x: number; y: number; w: number; h?: number; o?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill="#8FB0FF" opacity={o} />;
}

function Tile({ x, y, w, h, label }: { x: number; y: number; w: number; h: number; label: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="16" fill={PANEL} stroke={LINE} />
      <text x={x + 22} y={y + 38} fontSize="17" fill={SOFT} fontFamily="Inter, system-ui, sans-serif">
        {label}
      </text>
      <Bar x={x + 22} y={y + 60} w={w * 0.42} h={30} o={0.3} />
      <Bar x={x + 22} y={y + h - 34} w={w * 0.6} h={10} o={0.14} />
    </g>
  );
}

export function DrawnResults({ variant }: { variant: "wide" | "tall" }) {
  if (variant === "tall") {
    return (
      <svg viewBox="0 0 480 960" width="100%" height="100%" preserveAspectRatio="xMidYMin slice" role="img" aria-label="Drawing of the brand's results page on a phone, names and numbers hidden">
        <rect width="480" height="960" fill="#060B1A" />
        <text x="32" y="92" fontSize="22" fill={SOFT} fontFamily="ui-monospace, monospace" letterSpacing="2">
          RESULTS
        </text>
        <text x="32" y="134" fontSize="30" fontWeight="600" fill={INK} fontFamily="Inter, system-ui, sans-serif">
          What runs today
        </text>
        <Tile x={32} y={170} w={416} h={150} label="Answered after hours" />
        <Tile x={32} y={340} w={416} h={150} label="Handed to the team" />
        <Tile x={32} y={510} w={416} h={150} label="Hours back" />
        <rect x="32" y="690" width="416" height="210" rx="16" fill={PANEL} stroke={LINE} />
        <text x="54" y="728" fontSize="17" fill={SOFT} fontFamily="Inter, system-ui, sans-serif">
          Monthly report
        </text>
        {[0, 1, 2, 3].map((i) => (
          <Bar key={i} x={54} y={752 + i * 34} w={[300, 340, 250, 320][i]} h={12} o={0.16} />
        ))}
      </svg>
    );
  }
  const bars = [0.5, 0.62, 0.45, 0.7, 0.58, 0.8, 0.66, 0.9, 0.74, 0.86, 0.78, 0.95];
  return (
    <svg viewBox="0 0 1280 800" width="100%" height="100%" preserveAspectRatio="xMidYMin slice" role="img" aria-label="Drawing of the brand's live results page: what runs today, after-hours conversations, hours back and the monthly report, names and numbers hidden">
      <rect width="1280" height="800" fill="#060B1A" />
      {/* side bar */}
      <rect width="220" height="800" fill="#0A1226" />
      <Bar x={36} y={48} w={120} h={16} o={0.35} />
      {["Today", "Chats", "Handovers", "Reports"].map((t, i) => (
        <text key={t} x="36" y={130 + i * 52} fontSize="18" fill={i === 0 ? INK : SOFT} fontFamily="Inter, system-ui, sans-serif">
          {t}
        </text>
      ))}
      {/* header */}
      <text x="270" y="78" fontSize="15" fill={SOFT} fontFamily="ui-monospace, monospace" letterSpacing="2">
        RESULTS PAGE
      </text>
      <text x="270" y="118" fontSize="32" fontWeight="600" fill={INK} fontFamily="Inter, system-ui, sans-serif">
        What runs today
      </text>
      <Tile x={270} y={150} w={300} h={150} label="Answered after hours" />
      <Tile x={590} y={150} w={300} h={150} label="Handed to the team" />
      <Tile x={910} y={150} w={320} h={150} label="Hours back this month" />
      {/* chart */}
      <rect x="270" y="324" width="620" height="420" rx="16" fill={PANEL} stroke={LINE} />
      <text x="294" y="364" fontSize="17" fill={SOFT} fontFamily="Inter, system-ui, sans-serif">
        Conversations by day
      </text>
      {bars.map((h, i) => (
        <rect key={i} x={300 + i * 48} y={710 - h * 300} width="28" height={h * 300} rx="6" fill="#4D7CFF" opacity={0.25 + h * 0.4} />
      ))}
      <line x1="294" x2="866" y1="711" y2="711" stroke={LINE} />
      {/* report */}
      <rect x="910" y="324" width="320" height="420" rx="16" fill={PANEL} stroke={LINE} />
      <text x="934" y="364" fontSize="17" fill={SOFT} fontFamily="Inter, system-ui, sans-serif">
        Monthly report
      </text>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <Bar key={i} x={934} y={392 + i * 44} w={[220, 260, 190, 240, 200, 250, 170][i]} h={12} o={0.16} />
      ))}
    </svg>
  );
}
