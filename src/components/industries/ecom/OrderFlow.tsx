"use client";

import { useEffect, useRef } from "react";

/**
 * OrderFlow - the "Where's my order?" diagram. Four channel petals feed one
 * stem: the Answers agent reads the question, looks the order up in the
 * store, then either replies within 60 seconds or hands over to a named
 * person, and everything lands in the monthly report.
 * 5-second job: the question never waits for a person.
 *
 * Two drawings of the same flow: across on desktop, down on phones (labels
 * stay 13px or larger). Lines draw once on view (stroke-dashoffset), boxes
 * fade in (opacity). Without JavaScript or under reduced motion, it is
 * simply shown.
 */

const BLUE = "#2554D4";
const SKY = "#8FB0FF";
const INK = "#F2F5FC";
const MUTED = "#9AA3B5";
const PANEL = "#0A1226";

function petal(L: number, W: number) {
  return `M0 0 C ${L * 0.3} ${-W} ${L * 0.85} ${-W * 0.7} ${L} 0 C ${L * 0.85} ${W * 0.7} ${L * 0.3} ${W} 0 0 Z`;
}

type Channel = { name: string; angle: number };

function Bloom({ cx, cy, L, W, labelR, channels, size, anchor }: { cx: number; cy: number; L: number; W: number; labelR: number; channels: Channel[]; size: number; anchor: "end" | "middle" }) {
  return (
    <g>
      {channels.map((c, i) => {
        const rad = (c.angle * Math.PI) / 180;
        const lx = cx + Math.cos(rad) * labelR;
        const ly = cy + Math.sin(rad) * labelR;
        return (
          <g key={c.name} className="of-node" style={{ ["--d" as string]: `${i * 0.06}s` }}>
            <path d={petal(L, W)} transform={`translate(${cx} ${cy}) rotate(${c.angle})`} fill={BLUE} fillOpacity="0.14" stroke={SKY} strokeOpacity="0.8" strokeWidth="1.5" />
            <text x={lx} y={ly} textAnchor={anchor} dominantBaseline="middle" fontSize={size} fill={INK}>
              {c.name}
            </text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r="5" fill={SKY} />
    </g>
  );
}

function Box({ x, y, w, h, label, sub, size, subSize, accent = false, d = 0 }: { x: number; y: number; w: number; h: number; label: string; sub?: string; size: number; subSize: number; accent?: boolean; d?: number }) {
  const cy = y + h / 2;
  return (
    <g className="of-node" style={{ ["--d" as string]: `${d}s` }}>
      <rect x={x} y={y} width={w} height={h} rx="14" fill={accent ? "#13203F" : PANEL} stroke={accent ? SKY : BLUE} strokeWidth="1.5" />
      <text x={x + w / 2} y={sub ? cy - subSize * 0.62 : cy} textAnchor="middle" dominantBaseline="middle" fontSize={size} fontWeight="500" fill={INK}>
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={cy + size * 0.62} textAnchor="middle" dominantBaseline="middle" fontSize={subSize} fill={MUTED}>
          {sub}
        </text>
      )}
    </g>
  );
}

function Line({ d, delay }: { d: string; delay: number }) {
  return <path className="of-path" d={d} pathLength={1} fill="none" stroke={SKY} strokeOpacity="0.85" strokeWidth="1.5" strokeLinecap="round" style={{ ["--d" as string]: `${delay}s` }} />;
}

const NODES = {
  agent: { label: "Answers agent", sub: "Your AI helper reads it" },
  store: { label: "Store lookup", sub: "Shopify or WooCommerce" },
  reply: { label: "Reply in 60 seconds", sub: "With the tracking link" },
  hand: { label: "Handover", sub: "To a named person" },
  report: { label: "Monthly report", sub: "Questions and hours saved" },
};

function Desktop() {
  const ch: Channel[] = [
    { name: "WhatsApp", angle: 225 },
    { name: "Email", angle: 195 },
    { name: "Instagram", angle: 165 },
    { name: "Web chat", angle: 135 },
  ];
  return (
    <svg viewBox="0 80 1200 360" className="of-svg of-desk" role="img" aria-labelledby="of-desc-d">
      <desc id="of-desc-d">
        Questions from WhatsApp, email, Instagram and web chat go to the Answers agent, which looks the order up in your store. It replies within 60 seconds, or hands over to a named person. Everything goes into the monthly report.
      </desc>
      <Bloom cx={250} cy={230} L={130} W={30} labelR={152} channels={ch} size={17} anchor="end" />
      <Line d="M250 230 H300" delay={0.2} />
      <Box x={300} y={194} w={190} h={72} {...NODES.agent} size={17} subSize={13} d={0.3} />
      <Line d="M490 230 H540" delay={0.4} />
      <Box x={540} y={194} w={200} h={72} {...NODES.store} size={17} subSize={13} d={0.45} />
      <Line d="M740 230 C 775 230 770 140 805 140" delay={0.55} />
      <Line d="M740 230 C 775 230 770 320 805 320" delay={0.55} />
      <Box x={805} y={104} w={200} h={72} {...NODES.reply} size={17} subSize={13} accent d={0.65} />
      <Box x={805} y={284} w={200} h={72} {...NODES.hand} size={17} subSize={13} d={0.65} />
      <Line d="M1005 140 C 1035 140 1030 230 1050 230" delay={0.75} />
      <Line d="M1005 320 C 1035 320 1030 230 1050 230" delay={0.75} />
      <Box x={1050} y={194} w={146} h={72} label="Monthly report" sub="Every question" size={16} subSize={13} d={0.85} />
      <text x={250} y={420} textAnchor="middle" fontSize="13" fill={MUTED} letterSpacing="0.08em">YOUR CHANNELS</text>
      <text x={905} y={420} textAnchor="middle" fontSize="13" fill={MUTED} letterSpacing="0.08em">NO QUESTION WAITS</text>
    </svg>
  );
}

function Phone() {
  const ch: Channel[] = [
    { name: "WhatsApp", angle: 215 },
    { name: "Email", angle: 250 },
    { name: "Instagram", angle: 290 },
    { name: "Web chat", angle: 325 },
  ];
  return (
    <svg viewBox="0 44 360 640" className="of-svg of-phone" role="img" aria-labelledby="of-desc-p">
      <desc id="of-desc-p">
        Questions from WhatsApp, email, Instagram and web chat go to the Answers agent, which looks the order up in your store. It replies within 60 seconds, or hands over to a named person. Everything goes into the monthly report.
      </desc>
      <Bloom cx={180} cy={196} L={100} W={24} labelR={124} channels={ch} size={15} anchor="middle" />
      <Line d="M180 196 V238" delay={0.2} />
      <Box x={50} y={238} w={260} h={68} {...NODES.agent} size={17} subSize={14} d={0.3} />
      <Line d="M180 306 V346" delay={0.4} />
      <Box x={50} y={346} w={260} h={68} {...NODES.store} size={17} subSize={14} d={0.45} />
      <Line d="M180 414 C 180 440 92 440 92 472" delay={0.55} />
      <Line d="M180 414 C 180 440 268 440 268 472" delay={0.55} />
      <Box x={8} y={472} w={168} h={72} label="Reply in 60s" sub="With tracking" size={17} subSize={14} accent d={0.65} />
      <Box x={184} y={472} w={168} h={72} {...NODES.hand} size={17} subSize={14} d={0.65} />
      <Line d="M92 544 C 92 572 180 572 180 604" delay={0.75} />
      <Line d="M268 544 C 268 572 180 572 180 604" delay={0.75} />
      <Box x={50} y={604} w={260} h={68} {...NODES.report} size={17} subSize={14} d={0.85} />
    </svg>
  );
}

export function OrderFlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.classList.add("is-armed");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add("is-on");
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="of">
      <style>{CSS}</style>
      <Desktop />
      <Phone />
    </div>
  );
}

const CSS = `
.of { font-family: var(--font-sans), Inter, system-ui, sans-serif; }
.of-svg { display: block; width: 100%; height: auto; }
.of-desk { display: none; }
@media (min-width: 900px) { .of-desk { display: block; } .of-phone { display: none; } }
.of.is-armed .of-path { stroke-dasharray: 1; stroke-dashoffset: 1; }
.of.is-armed .of-node { opacity: 0; }
.of.is-on .of-path { stroke-dashoffset: 0; transition: stroke-dashoffset 0.7s cubic-bezier(0.16,1,0.3,1) var(--d, 0s); }
.of.is-on .of-node { opacity: 1; transition: opacity 0.6s ease-out var(--d, 0s); }
`;
