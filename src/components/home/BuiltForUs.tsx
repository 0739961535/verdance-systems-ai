import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

/**
 * "Built for our own business": Ashford, the system Verdance runs on.
 * Always dark, like a control room. Abstract UI tiles only, no real
 * screenshots, names or numbers. Server component, static markup.
 */

const C = {
  bg: "#07090E",
  panel: "#0B0E15",
  panel2: "#0F131C",
  line: "rgba(255,255,255,0.08)",
  line2: "rgba(255,255,255,0.14)",
  ink: "#EDEFF3",
  soft: "rgba(237,239,243,0.72)",
  muted: "rgba(237,239,243,0.5)",
  bar: "rgba(255,255,255,0.09)",
  barStrong: "rgba(255,255,255,0.18)",
  accent: "#8FB0FF",
} as const;

const mono = { fontFamily: "var(--font-mono)", letterSpacing: "0.12em" } as const;

function MicroLabel({ children, color = C.muted }: { children: ReactNode; color?: string }) {
  return (
    <span className="uppercase" style={{ ...mono, fontSize: 11, color }}>
      {children}
    </span>
  );
}

function Bar({ w, strong = false, h = 8 }: { w: string; strong?: boolean; h?: number }) {
  return <span className="block rounded-full" style={{ width: w, height: h, background: strong ? C.barStrong : C.bar }} />;
}

/* Shared mock frame: a small window with a label strip on top. */
function MockPanel({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div
      aria-hidden
      className={`overflow-hidden rounded-xl ${className}`}
      style={{ background: C.panel, border: `1px solid ${C.line}` }}
    >
      <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: `1px solid ${C.line}` }}>
        <span className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: C.line2 }} />
          <span className="h-2 w-2 rounded-full" style={{ background: C.line2 }} />
          <span className="h-2 w-2 rounded-full" style={{ background: C.line2 }} />
        </span>
        <MicroLabel>{label}</MicroLabel>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

/* 1. Voice: static waveform */
const WAVE = [6, 10, 16, 24, 14, 30, 38, 22, 12, 28, 40, 34, 18, 26, 36, 20, 10, 16, 30, 24, 14, 8, 18, 26, 12, 6];

function VoiceMock() {
  return (
    <MockPanel label="Voice line">
      <div className="flex items-center justify-between">
        <MicroLabel color={C.accent}>Listening</MicroLabel>
        <MicroLabel>Morning brief</MicroLabel>
      </div>
      <svg viewBox={`0 0 ${WAVE.length * 10} 44`} className="mt-5 h-14 w-full" preserveAspectRatio="none">
        {WAVE.map((h, i) => (
          <rect
            key={i}
            x={i * 10 + 3}
            y={22 - h / 2}
            width="4"
            height={h}
            rx="2"
            fill={i > 8 && i < 16 ? C.accent : "rgba(255,255,255,0.22)"}
          />
        ))}
      </svg>
      <div className="mt-5 grid gap-2.5">
        {["New leads", "Today", "Tasks"].map((t, i) => (
          <div key={t} className="flex items-center gap-3 rounded-lg px-3 py-2.5" style={{ background: C.panel2, border: `1px solid ${C.line}` }}>
            <MicroLabel>{t}</MicroLabel>
            <span className="ml-auto flex w-1/2 justify-end">
              <Bar w={["70%", "90%", "55%"][i]} />
            </span>
          </div>
        ))}
      </div>
    </MockPanel>
  );
}

/* 2. AI team: drafted, approved, sent */
function ApprovalMock() {
  const steps = [
    { label: "Drafted", done: true },
    { label: "Approved", done: true },
    { label: "Sent", done: false },
  ];
  return (
    <MockPanel label="Drafts">
      <div className="grid gap-2.5">
        <Bar w="38%" strong />
        <Bar w="92%" />
        <Bar w="84%" />
        <Bar w="60%" />
      </div>
      <ol className="mt-6 flex flex-wrap items-center gap-2">
        {steps.map((s, i) => (
          <li key={s.label} className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
              style={{
                border: `1px solid ${s.done ? "rgba(143,176,255,0.35)" : C.line2}`,
                background: s.done ? "rgba(143,176,255,0.08)" : "transparent",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.done ? C.accent : C.line2 }} />
              <MicroLabel color={s.done ? C.accent : C.muted}>{s.label}</MicroLabel>
            </span>
            {i < steps.length - 1 && <span className="h-px w-4" style={{ background: C.line2 }} />}
          </li>
        ))}
      </ol>
      <div className="mt-6 flex items-center gap-3 pt-4" style={{ borderTop: `1px solid ${C.line}` }}>
        <MicroLabel>Waiting for approval</MicroLabel>
        <span className="ml-auto">
          <span className="inline-block h-7 w-20 rounded-md" style={{ background: C.panel2, border: `1px solid ${C.line2}` }} />
        </span>
      </div>
    </MockPanel>
  );
}

/* 3. Tracking: pipeline line with four stages */
function PipelineMock() {
  const stages = ["Enquiry", "Replied", "Qualified", "Booked"];
  return (
    <MockPanel label="Pipeline">
      <div className="relative pt-1">
        <span className="absolute left-[6px] right-[6px] top-[11px] h-px" style={{ background: C.line2 }} />
        <ol className="relative grid grid-cols-4">
          {stages.map((s, i) => (
            <li key={s} className={`flex flex-col ${i === 0 ? "items-start" : i === stages.length - 1 ? "items-end" : "items-center"}`}>
              <span
                className="h-3 w-3 rounded-full"
                style={{ background: i === stages.length - 1 ? C.accent : C.panel, border: `1px solid ${i === stages.length - 1 ? C.accent : "rgba(255,255,255,0.35)"}` }}
              />
              <span className="mt-3">
                <MicroLabel color={i === stages.length - 1 ? C.accent : C.muted}>{s}</MicroLabel>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </MockPanel>
  );
}

/* 4. Portals: sparkline, no axes, no numbers */
function PortalMock() {
  return (
    <MockPanel label="Client portal">
      <div className="flex items-center justify-between">
        <Bar w="40%" strong />
        <MicroLabel color={C.accent}>Live</MicroLabel>
      </div>
      <svg viewBox="0 0 200 60" className="mt-4 h-16 w-full" preserveAspectRatio="none">
        <path
          d="M0 50 L20 46 L40 48 L60 38 L80 40 L100 30 L120 32 L140 22 L160 24 L180 14 L200 10 L200 60 L0 60 Z"
          fill="rgba(143,176,255,0.08)"
        />
        <path
          d="M0 50 L20 46 L40 48 L60 38 L80 40 L100 30 L120 32 L140 22 L160 24 L180 14 L200 10"
          fill="none"
          stroke={C.accent}
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </MockPanel>
  );
}

/* 5. Knowledge base: nightly review checklist */
function NightlyMock() {
  const rows = [
    { w: "72%", done: true },
    { w: "58%", done: true },
    { w: "80%", done: false },
  ];
  return (
    <MockPanel label="Nightly review">
      <ul className="grid gap-3">
        {rows.map((r, i) => (
          <li key={i} className="flex items-center gap-3">
            <span
              className="flex h-4 w-4 shrink-0 items-center justify-center rounded"
              style={{ border: `1px solid ${r.done ? C.accent : C.line2}`, background: r.done ? "rgba(143,176,255,0.12)" : "transparent" }}
            >
              {r.done && (
                <svg viewBox="0 0 12 12" className="h-2.5 w-2.5">
                  <path d="M2.5 6.2 L5 8.5 L9.5 3.5" fill="none" stroke={C.accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            <Bar w={r.w} strong={!r.done} />
          </li>
        ))}
      </ul>
    </MockPanel>
  );
}

type Tile = { id: string; title: string; body: string; mock: ReactNode; span: string; large: boolean };

const TILES: Tile[] = [
  {
    id: "voice",
    title: "A voice assistant we call from the phone",
    body: "It checks new leads, reads out the day and gets work done. Hands free.",
    mock: <VoiceMock />,
    span: "lg:col-span-3",
    large: true,
  },
  {
    id: "team",
    title: "An AI team that waits for a yes",
    body: "It drafts replies, follow-ups and reports. Nothing goes out until one of us approves it.",
    mock: <ApprovalMock />,
    span: "lg:col-span-3",
    large: true,
  },
  {
    id: "tracking",
    title: "Every enquiry tracked",
    body: "From the first message to the booked call. Nobody falls through the gaps.",
    mock: <PipelineMock />,
    span: "lg:col-span-2",
    large: false,
  },
  {
    id: "portals",
    title: "Client portals with live results",
    body: "Clients see how their systems are doing, any time, without asking.",
    mock: <PortalMock />,
    span: "lg:col-span-2",
    large: false,
  },
  {
    id: "knowledge",
    title: "A knowledge base that gets better",
    body: "Every night it studies our playbooks and improves them, so tomorrow runs better than today.",
    mock: <NightlyMock />,
    span: "lg:col-span-2",
    large: false,
  },
];

export function BuiltForUs() {
  return (
    <section
      className="section-pad relative isolate"
      aria-labelledby="built-for-us-title"
      style={{ background: C.bg, color: C.ink, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}
    >
      <div className="container-wide">
        <div className="max-w-3xl">
          <p className="eyebrow" style={{ color: C.muted }}>
            Built for our own business
          </p>
          <h2 id="built-for-us-title" className="h2 mt-5" style={{ color: C.ink }}>
            We run our own company on the same systems we build for you.
          </h2>
          <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.6]" style={{ color: C.soft }}>
            We call it Ashford. It answers to us every day. If something does not work, we feel it first and fix it before it reaches you.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {TILES.map((t) => (
            <li
              key={t.id}
              className={`flex flex-col rounded-2xl p-5 sm:p-6 ${t.span} ${t.id === "knowledge" ? "md:col-span-2 lg:col-span-2" : ""}`}
              style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.line}` }}
            >
              <h3
                className="font-display"
                style={{ color: C.ink, fontSize: t.large ? "clamp(1.3rem, 0.6vw + 1.1rem, 1.6rem)" : "1.25rem", lineHeight: 1.2, letterSpacing: "-0.025em" }}
              >
                {t.title}
              </h3>
              <p className="mt-3 text-[1rem] leading-[1.6] sm:text-[1.0625rem]" style={{ color: C.soft }}>
                {t.body}
              </p>
              <div className="mt-6 lg:mt-auto lg:pt-6">{t.mock}</div>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col gap-4 pt-8 md:mt-16 md:flex-row md:items-center md:justify-between" style={{ borderTop: `1px solid ${C.line}` }}>
          <p className="max-w-2xl text-[1.0625rem] leading-[1.6]" style={{ color: C.soft }}>
            Ashford is ours. The parts that work for your business are what we set up for you.
          </p>
          <Link
            href="/services/ai-operations-system"
            className="group inline-flex min-h-11 items-center gap-2 text-[1rem] font-medium underline decoration-[rgba(255,255,255,0.2)] underline-offset-4 hover:decoration-current"
            style={{ color: C.ink }}
          >
            How the same systems work for you
            <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
