"use client";

/**
 * SystemDiagram - the "how the product actually works" schematic.
 * Left: every channel a lead can arrive on. Center: the Verdance AI core (Mia).
 * Right: the outcomes it produces. An animated beam carries a pulse from the
 * inputs, through the core, out to the outcomes - on a loop - so a visitor sees
 * the flow, not just a static picture. Theme-aware, reduced-motion safe,
 * stacks cleanly on mobile.
 */

import { useDemoMotion } from "@/components/primitives/useDemoMotion";
import { Reveal } from "@/components/primitives/Reveal";
import { motion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Globe,
  AtSign,
  PhoneMissed,
  CalendarCheck,
  Send,
  Star,
  BellRing,
  Bot,
} from "lucide-react";

const INPUTS = [
  { icon: Phone, label: "Phone call" },
  { icon: MessageCircle, label: "WhatsApp message" },
  { icon: Globe, label: "Website chat" },
  { icon: AtSign, label: "Instagram & socials" },
  { icon: PhoneMissed, label: "Missed call" },
];

const OUTPUTS = [
  { icon: CalendarCheck, label: "Booked in your calendar" },
  { icon: Send, label: "Follow-up sent automatically" },
  { icon: Star, label: "Review invite after the visit" },
  { icon: BellRing, label: "You get notified - that's it" },
];

function FlowCard({
  icon: Icon,
  label,
  align,
  delay,
}: {
  icon: typeof Phone;
  label: string;
  align: "left" | "right";
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div
        className="flex items-center gap-3 rounded-xl border px-4 py-3"
        style={{
          borderColor: "var(--color-hairline)",
          background: "rgba(var(--hairline-rgb),0.02)",
        }}
      >
        <span
          className="grid place-items-center h-9 w-9 rounded-lg shrink-0"
          style={{
            background: "rgba(var(--accent-rgb),0.10)",
            border: "1px solid rgba(var(--accent-rgb),0.22)",
            color: "var(--color-accent)",
          }}
        >
          <Icon size={17} strokeWidth={1.75} />
        </span>
        <span className="text-[13.5px] text-[color:var(--color-ink-soft)] leading-tight">
          {label}
        </span>
        {align === "right" && (
          <span
            aria-hidden
            className="ml-auto h-1.5 w-1.5 rounded-full shrink-0"
            style={{ background: "rgba(var(--accent-rgb),0.5)" }}
          />
        )}
      </div>
    </Reveal>
  );
}

/** A thin beam with a pulse travelling toward (or from) the core. */
function Beam({ direction }: { direction: "in" | "out" }) {
  const reduce = useDemoMotion();
  return (
    <div className="relative hidden lg:block h-px w-full self-center">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(var(--accent-rgb),0.35), transparent)",
        }}
      />
      {!reduce && (
        <motion.span
          aria-hidden
          className="absolute top-1/2 h-1.5 w-1.5 rounded-full"
          style={{
            marginTop: -3,
            background: "var(--color-accent)",
            boxShadow: "0 0 10px 2px rgba(var(--accent-rgb),0.7)",
          }}
          initial={{ left: direction === "in" ? "0%" : "100%", opacity: 0 }}
          animate={{
            left: direction === "in" ? ["0%", "100%"] : ["100%", "0%"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            repeatDelay: 0.9,
            ease: "easeInOut",
            delay: direction === "in" ? 0 : 0.8,
          }}
        />
      )}
    </div>
  );
}

function Core() {
  const reduce = useDemoMotion();
  return (
    <div className="relative grid place-items-center py-2">
      {/* pulsing halo */}
      {!reduce && (
        <motion.span
          aria-hidden
          className="absolute rounded-full"
          style={{
            width: 150,
            height: 150,
            border: "1px solid rgba(var(--accent-rgb),0.4)",
          }}
          animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <div
        className="relative grid place-items-center h-28 w-28 rounded-full text-center"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(var(--accent-rgb),0.22), var(--color-bg-3))",
          border: "1px solid rgba(var(--accent-rgb),0.4)",
          boxShadow: "0 0 44px -6px rgba(var(--accent-rgb),0.5)",
        }}
      >
        <div className="flex flex-col items-center">
          <span
            className="grid place-items-center h-10 w-10 rounded-xl"
            style={{
              background: "linear-gradient(160deg, var(--color-accent), var(--color-accent-deep))",
              color: "var(--color-on-accent)",
            }}
          >
            <Bot size={22} strokeWidth={1.9} />
          </span>
          <span className="mt-2 font-display text-sm font-medium text-[color:var(--color-ink)]">
            Verdance AI
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-[color:var(--color-accent)]">
            Mia · 24/7
          </span>
        </div>
      </div>
    </div>
  );
}

export function SystemDiagram() {
  return (
    <section className="relative section-pad bg-canvas overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 40%, rgba(var(--accent-rgb),0.05), transparent 70%)",
        }}
      />
      <div className="container-wide">
        <div className="max-w-3xl">
          <Reveal>
            <span className="eyebrow">The system</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 headline-section max-w-[18ch]">
              Every lead, into{" "}
              <span className="italic-accent">one intelligent system.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 text-lg text-[color:var(--color-ink-soft)] leading-relaxed">
              However a customer reaches out, it lands in the same place - an AI
              that answers, qualifies, and books. You don&apos;t touch a thing until
              they&apos;re in your calendar.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid items-center gap-6 lg:grid-cols-[1fr_100px_auto_100px_1fr] lg:gap-4">
          {/* Inputs */}
          <div className="flex flex-col gap-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)] mb-1">
              Leads come in
            </div>
            {INPUTS.map((it, i) => (
              <FlowCard key={it.label} icon={it.icon} label={it.label} align="right" delay={0.12 + i * 0.06} />
            ))}
          </div>

          {/* Beam in */}
          <Beam direction="in" />

          {/* Core */}
          <Reveal delay={0.2}>
            <Core />
          </Reveal>

          {/* Beam out */}
          <Beam direction="out" />

          {/* Outputs */}
          <div className="flex flex-col gap-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-accent)] mb-1 lg:text-right">
              Customers go out
            </div>
            {OUTPUTS.map((it, i) => (
              <FlowCard key={it.label} icon={it.icon} label={it.label} align="left" delay={0.24 + i * 0.06} />
            ))}
          </div>
        </div>

        <Reveal delay={0.3}>
          <p className="mt-12 max-w-2xl text-[color:var(--color-ink-muted)] text-[15px] leading-relaxed">
            One system, every channel, all day and all night. No new apps for you
            to run - it plugs into the phone, website, and calendar you already use.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
