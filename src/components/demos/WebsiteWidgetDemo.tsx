"use client";

/**
 * WebsiteWidgetDemo - fake browser frame with embedded chat widget.
 * Browser shows a fake business hero; chat bubble pops up bottom-right,
 * AI greets, visitor asks question, AI books them.
 *
 * Caller: src/app/services/page.tsx
 */

import { useDemoMotion } from "@/components/primitives/useDemoMotion";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { DemoLabel, TypingDots } from "./_micro";

type Msg = { from: "ai" | "visitor"; text: string };

const SCRIPT: Msg[] = [
  { from: "ai", text: "Hi! Looking to book a job in?" },
  { from: "visitor", text: "Yes - what's the soonest?" },
  { from: "ai", text: "Thursday 2pm or Friday 10am. Which works?" },
  { from: "visitor", text: "Thursday 2pm" },
  { from: "ai", text: "Booked. Confirmation on its way ✓" },
];

const STEP_MS = 1700;
const OPEN_AT = 2200;
const TOTAL_MS = OPEN_AT + (SCRIPT.length + 1) * STEP_MS + 4000;

export function WebsiteWidgetDemo() {
  const reduce = useDemoMotion();
  const [opened, setOpened] = useState(reduce);
  const [shownIdx, setShownIdx] = useState(reduce ? SCRIPT.length : 0);
  const [typingFor, setTypingFor] = useState<number | null>(null);

  useEffect(() => {
    if (reduce) return;
    let timers: number[] = [];
    const run = () => {
      timers.forEach((t) => window.clearTimeout(t));
      timers = [];
      setOpened(false);
      setShownIdx(0);
      setTypingFor(null);

      timers.push(window.setTimeout(() => setOpened(true), OPEN_AT));
      let acc = OPEN_AT + 600;
      SCRIPT.forEach((m, i) => {
        if (m.from === "ai") {
          timers.push(window.setTimeout(() => setTypingFor(i), acc));
          acc += 900;
        }
        timers.push(
          window.setTimeout(() => {
            setTypingFor((t) => (t === i ? null : t));
            setShownIdx(i + 1);
          }, acc)
        );
        acc += m.from === "ai" ? 800 : 1200;
      });
    };
    run();
    const loop = window.setInterval(run, TOTAL_MS);
    return () => {
      window.clearInterval(loop);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [reduce]);

  return (
    <div className="p-6 md:p-7">
      <DemoLabel className="mb-5">Website Widget · Embedded chat</DemoLabel>

      <BrowserFrame url="bryantdental.com">
        <div
          className="relative h-full w-full overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 20% 30%, rgba(var(--accent-rgb),0.10), transparent 60%), var(--color-bg-2)",
          }}
        >
          <div className="flex items-center justify-between px-6 pt-5">
            <div className="flex items-center gap-2 font-display font-medium text-[color:var(--color-ink)] text-sm">
              <span className="inline-block h-3 w-3 rounded-full" style={{ background: "var(--color-accent)" }} />
              Bryant Electrical
            </div>
            <div className="flex items-center gap-4 text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]">
              <span>Services</span>
              <span>Team</span>
              <span>Book</span>
            </div>
          </div>

          <div className="px-6 pt-10">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
              Established 2012
            </div>
            <h3 className="mt-3 font-display text-2xl md:text-3xl font-medium leading-tight text-[color:var(--color-ink)]">
              Calmer dentistry.{" "}
              <span className="italic-accent">Same-week appointments.</span>
            </h3>
            <p className="mt-2 max-w-md text-[12.5px] text-[color:var(--color-ink-soft)] leading-relaxed">
              Hygiene, aesthetics, implants. Book online in under a minute.
            </p>
            <div className="mt-4 flex gap-2">
              <span
                className="rounded-full px-3 py-1.5 text-[11px] font-medium"
                style={{ background: "var(--color-accent)", color: "var(--color-on-accent)" }}
              >
                Book a visit
              </span>
              <span
                className="rounded-full px-3 py-1.5 text-[11px]"
                style={{ background: "rgba(var(--hairline-rgb),0.06)", color: "var(--color-ink)" }}
              >
                Our team
              </span>
            </div>
          </div>

          <div className="absolute bottom-4 right-4">
            <AnimatePresence>
              {opened && (
                <ChatWindow
                  key="win"
                  script={SCRIPT.slice(0, shownIdx)}
                  typingFor={typingFor}
                />
              )}
            </AnimatePresence>
            <ChatLauncher pulsing={!opened} />
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
}

function BrowserFrame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border"
      style={{
        borderColor: "var(--color-hairline)",
        background: "rgba(var(--hairline-rgb),0.02)",
        height: 380,
      }}
    >
      <div
        className="flex items-center gap-2 px-3 py-2 border-b"
        style={{ borderColor: "var(--color-hairline)", background: "rgba(var(--bg-rgb),0.4)" }}
      >
        <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: "#ef4444" }} />
        <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: "#facc15" }} />
        <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: "#4F8DFF" }} />
        <div
          className="ml-3 flex-1 rounded-md flex items-center gap-2 px-3 py-1"
          style={{ background: "rgba(var(--hairline-rgb),0.05)" }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 1l3 3-3 3 M3 12a9 9 0 109-9" stroke="rgba(var(--hairline-rgb),0.4)" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span className="font-mono text-[10.5px] text-[color:var(--color-ink-muted)]">{url}</span>
        </div>
      </div>
      <div className="relative h-[calc(100%-37px)]">{children}</div>
    </div>
  );
}

function ChatLauncher({ pulsing }: { pulsing: boolean }) {
  return (
    <div className="relative inline-block">
      {pulsing && (
        <span
          aria-hidden
          className="absolute -inset-1.5 rounded-full"
          style={{ border: "1.5px solid rgba(var(--accent-rgb),0.5)", animation: "pulse-ring 2.2s ease-out infinite" }}
        />
      )}
      <span
        className="inline-flex h-11 w-11 items-center justify-center rounded-full"
        style={{
          background: "linear-gradient(180deg, #4F8DFF, #4F8DFF)",
          color: "var(--color-on-accent)",
          boxShadow: "0 12px 28px rgba(var(--accent-rgb),0.35)",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M21 12a8 8 0 11-3.2-6.4L21 4l-1.1 3.7A8 8 0 0121 12z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}

function ChatWindow({
  script, typingFor,
}: {
  script: Msg[]; typingFor: number | null;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: -56, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
      className="absolute bottom-0 right-0 w-[240px] rounded-2xl overflow-hidden"
      style={{
        background: "var(--color-bg-2)",
        border: "1px solid rgba(var(--accent-rgb),0.28)",
        boxShadow: "0 24px 48px rgba(var(--bg-rgb),0.5)",
      }}
    >
      <div
        className="px-3 py-2 flex items-center gap-2"
        style={{ background: "rgba(var(--accent-rgb),0.06)", borderBottom: "1px solid var(--color-hairline)" }}
      >
        <span
          className="h-6 w-6 rounded-full grid place-items-center font-display font-medium text-[10px]"
          style={{ background: "var(--color-accent)", color: "var(--color-on-accent)" }}
        >
          V
        </span>
        <div className="leading-tight">
          <div className="text-[11px] font-medium text-[color:var(--color-ink)]">Mia</div>
          <div className="text-[9.5px] text-[color:var(--color-accent)]">online</div>
        </div>
      </div>
      <div className="px-3 py-2.5 space-y-1.5 max-h-[180px] overflow-hidden">
        {script.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`flex ${m.from === "ai" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[88%] rounded-xl px-2.5 py-1.5 text-[11px] leading-snug ${
                m.from === "ai" ? "rounded-tr-md" : "rounded-tl-md"
              }`}
              style={{
                background: m.from === "ai" ? "var(--color-accent)" : "rgba(var(--hairline-rgb),0.06)",
                color: m.from === "ai" ? "var(--color-on-accent)" : "var(--color-ink)",
                fontWeight: m.from === "ai" ? 500 : 400,
              }}
            >
              {m.text}
            </div>
          </motion.div>
        ))}
        {typingFor !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
            <div
              className="rounded-xl rounded-tr-md px-2.5 py-1.5"
              style={{ background: "rgba(var(--hairline-rgb),0.06)", color: "var(--color-ink-soft)" }}
            >
              <TypingDots />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
