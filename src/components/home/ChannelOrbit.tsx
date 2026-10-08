"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";
import { WhatsAppIcon } from "@/components/sections/v4/WhatsAppIcon";

/**
 * ChannelOrbit - every channel a customer uses, flowing into one hub.
 *
 * Glass tiles with the channels' own marks sit on a tilted orbit over a
 * faint starfield. Curved beams run to a central hub with a soft bloom;
 * light trails travel along them, brightest on the lit channel. Hover,
 * focus or tap a channel for a one-line example; with no input it cycles
 * while on screen. The plane eases flatter as it scrolls into view
 * (desktop, via Interactions data-scroll-tilt).
 *
 * Cheap by construction: one SVG with CSS dash animations, CSS gradients
 * for the starfield and bloom, no canvas or WebGL. Reduced motion: no
 * trails, no cycling. Without JS: the static orbit and the first example.
 */

type Channel = {
  key: string;
  label: string;
  short: string;
  tint: string;
  icon: ReactNode;
  ask: string;
  reply: string;
  meta: string;
};

const ICON = 22;

const CHANNELS: Channel[] = [
  {
    key: "whatsapp", label: "WhatsApp", short: "WhatsApp", tint: "37, 211, 102",
    icon: <WhatsAppIcon className="h-[22px] w-[22px]" />,
    ask: "Is Saturday still open?", reply: "It is. 09:00 or 11:30?", meta: "Replied in 4s",
  },
  {
    key: "calls", label: "Phone calls", short: "Calls", tint: "52, 199, 89",
    icon: (
      <svg width={ICON} height={ICON} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z" />
      </svg>
    ),
    ask: "Missed call, 19:02", reply: "Sorry we missed you. How can we help?", meta: "Texted back in 8s",
  },
  {
    key: "web", label: "Website chat and forms", short: "Website", tint: "91, 143, 255",
    icon: (
      <svg width={ICON} height={ICON} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <path d="M3 8.5h18M7 6.3h.01M9.5 6.3h.01" strokeLinecap="round" />
        <path d="M7 13h7M7 16h4" strokeLinecap="round" />
      </svg>
    ),
    ask: "Quote request: full kitchen refit", reply: "Thanks. Two quick questions so we can quote today.", meta: "Replied in 6s",
  },
  {
    key: "instagram", label: "Instagram", short: "Instagram", tint: "221, 42, 123",
    icon: (
      <svg width={ICON} height={ICON} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    ask: "Do you do weekend appointments?", reply: "We do, Saturday 09:00 to 13:00. Shall I book you in?", meta: "Replied in 5s",
  },
  {
    key: "facebook", label: "Facebook", short: "Facebook", tint: "24, 119, 242",
    icon: (
      <svg width={ICON} height={ICON} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.6V21h3Z" />
      </svg>
    ),
    ask: "Do you deliver to Durban?", reply: "We do, in 2 to 3 working days. Want the link?", meta: "Replied in 3s",
  },
  {
    key: "email", label: "Email", short: "Email", tint: "234, 67, 53",
    icon: (
      <svg width={ICON} height={ICON} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="m4 7 8 6 8-6" strokeLinejoin="round" />
      </svg>
    ),
    ask: "Availability in May for 24 people?", reply: "Two weekends are open. Shall I send the dates?", meta: "Replied in 7s",
  },
  {
    key: "portals", label: "Portals and listings", short: "Portals", tint: "251, 188, 5",
    icon: (
      <svg width={ICON} height={ICON} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-5H9v5H5a1 1 0 0 1-1-1v-8Z" strokeLinejoin="round" />
      </svg>
    ),
    ask: "Is the 3-bed still available?", reply: "It is. Can you view Saturday at 11:30?", meta: "Replied in 4s",
  },
];

const N = CHANNELS.length;
// Positions as % of the stage, starting at the top and going clockwise.
const POS = CHANNELS.map((_, i) => {
  const a = ((i * 360) / N - 90) * (Math.PI / 180);
  return { x: 50 + Math.cos(a) * 37, y: 50 + Math.sin(a) * 37 };
});

/** Curved beam from a node to the hub, in a w x h viewBox. */
function beam(p: { x: number; y: number }, w: number, h: number) {
  const x1 = (p.x / 100) * w;
  const y1 = (p.y / 100) * h;
  const cx = w / 2;
  const cy = h / 2;
  const mx = (x1 + cx) / 2;
  const my = (y1 + cy) / 2;
  const k = 0.18;
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${(mx - (cy - y1) * k).toFixed(1)} ${(my + (cx - x1) * k).toFixed(1)} ${cx} ${cy}`;
}

function Beams({ w, h, active, animate, className }: { w: number; h: number; active: number; animate: boolean; className: string }) {
  return (
    <svg className={`orbit-lines ${className}`} viewBox={`0 0 ${w} ${h}`} aria-hidden>
      {POS.map((p, i) => {
        const d = beam(p, w, h);
        const on = i === active;
        return (
          <g key={i}>
            <path d={d} className={`beam-base ${on ? "is-on" : ""}`} />
            {on && <path d={d} className="beam-glow" />}
            {animate && (
              <path d={d} pathLength={100} className={`beam-trail ${on ? "is-on" : ""}`} style={{ animationDelay: `${(i * 0.41).toFixed(2)}s` }} />
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function ChannelOrbit() {
  const reduce = useReducedMotionPref();
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || touched || !visible) return;
    const id = setInterval(() => {
      if (!document.hidden) setActive((a) => (a + 1) % N);
    }, 3200);
    return () => clearInterval(id);
  }, [reduce, touched, visible]);

  const pick = (i: number) => {
    setActive(i);
    setTouched(true);
  };

  const c = CHANNELS[active];
  const playing = visible && !reduce;

  return (
    <div ref={ref} className="grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-12">
      <div className="orbit-wrap">
        <div className="orbit-stage" data-scroll-tilt data-playing={playing ? "" : undefined}>
          <div className="orbit-stars" aria-hidden />
          <div className="orbit-stars orbit-stars-2" aria-hidden />
          <div className="orbit-ring" aria-hidden />
          <div className="orbit-ring orbit-ring-2" aria-hidden />

          <Beams w={100} h={100} active={active} animate={playing} className="lg:hidden" />
          <Beams w={160} h={110} active={active} animate={playing} className="hidden lg:block" />

          <div className="orbit-hub" aria-hidden>
            <span className="orbit-bloom" />
            <span className="orbit-hub-ring" />
            <span className="orbit-hub-core">
              <svg viewBox="0 0 40 40" className="h-[34%] w-[34%]" aria-hidden>
                <path d="M11 11 L20 29 L29 11" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="orbit-hub-label">One inbox</span>
            </span>
          </div>

          <ul className="contents" aria-label="Channels">
            {CHANNELS.map((ch, i) => (
              <li key={ch.key} className="contents">
                <button
                  type="button"
                  className="orbit-tile"
                  data-on={i === active ? "" : undefined}
                  style={{ left: `${POS[i].x}%`, top: `${POS[i].y}%`, ["--tint" as string]: ch.tint }}
                  onClick={() => pick(i)}
                  onMouseEnter={() => pick(i)}
                  onFocus={() => pick(i)}
                  aria-pressed={i === active}
                  aria-label={ch.label}
                >
                  <span className="orbit-tile-glass">{ch.icon}</span>
                  <span className="orbit-tile-label">{ch.short}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="glass-panel g-border sheen" aria-live="polite">
        <p className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: `rgb(${c.tint})` }} />
          {c.label} · example
        </p>
        <div key={c.key} className="mt-5 flex flex-col gap-2.5 example-swap">
          <div className="example-bubble">{c.ask}</div>
          <div className="example-bubble is-reply">{c.reply}</div>
          <span className="self-end font-mono text-[0.7rem] tracking-[0.06em] text-[color:var(--color-accent)]">{c.meta}</span>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-2 border-t pt-5" style={{ borderColor: "var(--hairline)" }}>
          {["Answered", "Booked", "Followed up", "Kept on record"].map((o) => (
            <span key={o} className="flex items-center gap-2 text-[0.88rem] text-[color:var(--color-ink-soft)]">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
              {o}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
