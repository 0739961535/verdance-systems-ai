"use client";

import { useEffect, useRef, useState } from "react";
import { AtSign, FileText, Home, Mail, MessageCircle, Phone } from "lucide-react";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";

/**
 * ChannelOrbit - every channel a customer uses, flowing into one core.
 *
 * Six channel nodes sit on a tilted orbit around the core. Message particles
 * travel in along each line (and replies travel back out). Hover, focus or
 * tap a channel to light it up and see a one-line example; with no input it
 * cycles on its own while on screen.
 *
 * Cheap by construction: lines are one SVG, particles are small divs moved
 * with composited transforms (each rides a full-size box translated by
 * percentages of itself), no canvas or WebGL. Reduced motion: no particles,
 * no auto-cycle. Without JS: the static orbit and the first example.
 */

type Channel = {
  key: string;
  label: string;
  short: string;
  Icon: typeof Phone;
  ask: string;
  reply: string;
  meta: string;
};

const CHANNELS: Channel[] = [
  { key: "whatsapp", label: "WhatsApp", short: "WhatsApp", Icon: MessageCircle, ask: "Is Saturday still open?", reply: "It is. 09:00 or 11:30?", meta: "Replied in 4s" },
  { key: "calls", label: "Phone calls", short: "Calls", Icon: Phone, ask: "Missed call, 19:02", reply: "Sorry we missed you. How can we help?", meta: "Texted back in 8s" },
  { key: "forms", label: "Website forms", short: "Web forms", Icon: FileText, ask: "Quote request: full kitchen refit", reply: "Thanks. Two quick questions so we can quote today.", meta: "Replied in 6s" },
  { key: "social", label: "Instagram and Facebook", short: "Social DMs", Icon: AtSign, ask: "Do you do weekend appointments?", reply: "We do, Saturday 09:00 to 13:00. Shall I book you in?", meta: "Replied in 5s" },
  { key: "email", label: "Email", short: "Email", Icon: Mail, ask: "Availability in May for 24 people?", reply: "Two weekends are open. Shall I send the dates?", meta: "Replied in 7s" },
  { key: "portals", label: "Portals and listings", short: "Portals", Icon: Home, ask: "Is the 3-bed still available?", reply: "It is. Can you view Saturday at 11:30?", meta: "Replied in 4s" },
];

// Node positions on the orbit, as % of the stage. Start top-left, clockwise.
const POS = CHANNELS.map((_, i) => {
  const a = ((i * 60 - 120) * Math.PI) / 180;
  return { x: 50 + Math.cos(a) * 36, y: 50 + Math.sin(a) * 36 };
});

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
      if (!document.hidden) setActive((a) => (a + 1) % CHANNELS.length);
    }, 3200);
    return () => clearInterval(id);
  }, [reduce, touched, visible]);

  const pick = (i: number) => {
    setActive(i);
    setTouched(true);
  };

  const c = CHANNELS[active];

  return (
    <div ref={ref} className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
      {/* the orbit */}
      <div className="orbit-wrap" data-tilt="4">
        <div className="orbit-stage" data-playing={visible && !reduce ? "" : undefined}>
          <div className="orbit-ring" aria-hidden />
          <div className="orbit-ring orbit-ring-2" aria-hidden />

          <svg className="orbit-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            {POS.map((p, i) => (
              <line
                key={i}
                x1={p.x}
                y1={p.y}
                x2={50}
                y2={50}
                vectorEffect="non-scaling-stroke"
                className={i === active ? "is-on" : undefined}
              />
            ))}
          </svg>

          {/* particles: in toward the core, replies back out */}
          {!reduce &&
            POS.map((p, i) =>
              [0, 1].map((k) => (
                <span
                  key={`${i}-${k}`}
                  aria-hidden
                  className={`orbit-particle ${k ? "is-out" : ""} ${i === active ? "is-on" : ""}`}
                  style={
                    {
                      "--x0": `${p.x}%`,
                      "--y0": `${p.y}%`,
                      animationDelay: `${(i * 0.37 + k * 1.2).toFixed(2)}s`,
                    } as React.CSSProperties
                  }
                >
                  <i />
                </span>
              )),
            )}

          <div className="orbit-core" aria-hidden>
            <span className="orbit-core-pulse" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]">Your system</span>
            <span className="mt-1 font-display text-[1.05rem] leading-tight text-[color:var(--color-ink)] sm:text-[1.25rem]" style={{ letterSpacing: "-0.02em" }}>
              One inbox
            </span>
            <span className="mt-0.5 italic-accent text-[0.95rem] sm:text-[1.1rem]">always on</span>
          </div>

          <ul className="contents" aria-label="Channels">
            {CHANNELS.map((ch, i) => (
              <li key={ch.key} className="contents">
                <button
                  type="button"
                  className="orbit-node"
                  data-on={i === active ? "" : undefined}
                  style={{ left: `${POS[i].x}%`, top: `${POS[i].y}%` }}
                  onClick={() => pick(i)}
                  onMouseEnter={() => pick(i)}
                  onFocus={() => pick(i)}
                  aria-pressed={i === active}
                >
                  <ch.Icon size={15} aria-hidden />
                  <span className="sm:hidden">{ch.short}</span>
                  <span className="hidden sm:inline">{ch.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* the example for the lit channel */}
      <div className="glass-panel sheen" aria-live="polite">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
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
