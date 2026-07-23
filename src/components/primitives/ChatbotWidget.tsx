"use client";

/**
 * ChatbotWidget — "Mia", Verdance's own AI assistant, living in the bottom-right.
 * Replaces the old WhatsApp FAB. Since Verdance sells AI chat assistants, running
 * one on the site is the product demonstrating itself. Scripted (no backend):
 * greets, answers the three things people ask, and funnels to a free consult.
 * Theme-aware, reduced-motion safe, mobile-friendly.
 */

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Bot, X, Send } from "lucide-react";

/**
 * Routes where the floating Mia button is suppressed. On the form pages the
 * qualifying form IS the conversion — Mia only ever funnels people here, so on
 * these pages she's redundant and (being bottom-right, fixed) physically
 * overlaps the form's fields and submit control. Hide her so every field and
 * button stays tappable.
 */
const HIDE_ON = ["/contact", "/apply"];

type Msg = { from: "mia" | "you"; text: string; cta?: boolean };

const GREETING =
  "Hey — I'm Mia, Verdance's AI assistant 👋 I can answer a quick question or get you booked in for a free consult. What brings you by?";

const QUICK = ["What do you do?", "How much is it?", "Book a free consult"];

function miaReply(text: string): Msg {
  const t = text.toLowerCase();
  if (/book|consult|demo|call|start|get going|sign|yes|please/.test(t))
    return {
      from: "mia",
      text: "Perfect — pick a time that suits you and we'll take it from there. 👇",
      cta: true,
    };
  if (/price|cost|how much|pricing|fee|expensive|budget|charge/.test(t))
    return {
      from: "mia",
      text: "It's tailored to what we build for you. We start with a free consult, map out exactly what'll move the needle, then build it out. Want me to set up that consult?",
    };
  if (/do|what|service|help|how|work|book|lead|call/.test(t))
    return {
      from: "mia",
      text: "We install an AI system that answers every call, text and message, chases every lead, and books them straight into your calendar — 24/7. Want to see it on your own business?",
    };
  return {
    from: "mia",
    text: "Great question. The quickest way to get you a proper answer is a short free consult — want me to line one up?",
    cta: true,
  };
}

export function ChatbotWidget() {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [nudged, setNudged] = useState(false); // shown once — never repeats
  const [messages, setMessages] = useState<Msg[]>([{ from: "mia", text: GREETING }]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Gentle nudge bubble once — appears briefly, then auto-dismisses so it never
  // lingers over the page content. Suppressed on narrow/touch screens, where a
  // floating bubble would sit over the section content or a CTA.
  useEffect(() => {
    if (nudged || open) return;
    const isNarrow = window.matchMedia("(max-width: 768px)").matches;
    if (isNarrow) return;
    const show = window.setTimeout(() => setNudge(true), 3200);
    const hide = window.setTimeout(() => {
      setNudge(false);
      setNudged(true);
    }, 3200 + 6500);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, [nudged, open]);

  // Opening the chat dismisses the nudge for good.
  useEffect(() => {
    if (open) {
      setNudge(false);
      setNudged(true);
    }
  }, [open]);

  // Auto-scroll to the newest message.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function send(text: string) {
    const clean = text.trim();
    if (!clean) return;
    setMessages((m) => [...m, { from: "you", text: clean }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, miaReply(clean)]);
    }, 850);
  }

  // Suppress on form pages so nothing overlaps the qualifying form. (All hooks
  // above run unconditionally — this early return keeps hook order stable.)
  if (pathname && HIDE_ON.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.32, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-col overflow-hidden rounded-2xl border shadow-2xl"
            style={{
              width: "min(370px, calc(100vw - 2.5rem))",
              height: "min(560px, calc(100vh - 7rem))",
              background: "var(--color-bg-2)",
              borderColor: "rgba(var(--accent-rgb),0.22)",
              boxShadow: "0 24px 70px -18px rgba(var(--accent-rgb),0.4)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3.5 border-b"
              style={{
                borderColor: "var(--color-hairline)",
                background:
                  "linear-gradient(120deg, rgba(var(--accent-rgb),0.14), rgba(var(--accent-deep-rgb),0.06))",
              }}
            >
              <span
                className="grid place-items-center h-10 w-10 rounded-full shrink-0"
                style={{
                  background: "linear-gradient(160deg, var(--color-accent), var(--color-accent-deep))",
                  color: "var(--color-on-accent)",
                }}
              >
                <Bot size={20} strokeWidth={1.9} />
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-display text-[15px] font-medium text-[color:var(--color-ink)] leading-tight">
                  Mia · Verdance AI
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#3BD671" }} />
                  Online now
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="grid place-items-center h-8 w-8 rounded-full text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-ink)] transition-colors"
                style={{ background: "rgba(var(--hairline-rgb),0.05)" }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {messages.map((m, i) => (
                <Bubble key={i} msg={m} onBook={() => setOpen(false)} />
              ))}
              {typing && (
                <div className="flex items-center gap-1.5 self-start rounded-2xl rounded-bl-md px-4 py-3"
                  style={{ background: "rgba(var(--hairline-rgb),0.05)" }}>
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="block h-1.5 w-1.5 rounded-full"
                      style={{ background: "var(--color-ink-muted)" }}
                      animate={reduce ? undefined : { opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Quick replies */}
            <div className="flex flex-wrap gap-2 px-4 pb-2">
              {QUICK.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors"
                  style={{
                    borderColor: "rgba(var(--accent-rgb),0.28)",
                    color: "var(--color-accent)",
                    background: "rgba(var(--accent-rgb),0.05)",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 px-3 py-3 border-t"
              style={{ borderColor: "var(--color-hairline)" }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                aria-label="Message Mia"
                className="flex-1 bg-transparent px-2 text-[14px] text-[color:var(--color-ink)] placeholder:text-[color:var(--color-ink-muted)] outline-none"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="grid place-items-center h-9 w-9 rounded-full shrink-0"
                style={{ background: "var(--color-accent)", color: "var(--color-on-accent)" }}
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nudge bubble */}
      <AnimatePresence>
        {nudge && !open && (
          <motion.button
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="max-w-[230px] rounded-2xl rounded-br-md border px-4 py-3 text-left text-[13px] leading-snug"
            style={{
              background: "var(--color-bg-2)",
              borderColor: "rgba(var(--accent-rgb),0.22)",
              color: "var(--color-ink)",
              boxShadow: "0 16px 40px -14px rgba(var(--accent-rgb),0.4)",
            }}
          >
            Hi 👋 I&apos;m Mia — want to see what we could build for your business?
          </motion.button>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Chat with Mia"}
        className="relative grid place-items-center h-14 w-14 rounded-full shrink-0"
        style={{
          background: "linear-gradient(160deg, var(--color-accent), var(--color-accent-deep))",
          color: "var(--color-on-accent)",
          boxShadow: "0 14px 36px -8px rgba(var(--accent-rgb),0.6)",
        }}
        initial={reduce ? false : { opacity: 0, scale: 0.85 }}
        animate={reduce ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1, ease: [0.19, 1, 0.22, 1] }}
        whileHover={reduce ? undefined : { scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
      >
        {!reduce && !open && (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{ animation: "pulse-ring 2.6s ease-out infinite", border: "2px solid rgba(var(--accent-rgb),0.5)" }}
          />
        )}
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={24} />
            </motion.span>
          ) : (
            <motion.span key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <Bot size={26} strokeWidth={1.9} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

function Bubble({ msg, onBook }: { msg: Msg; onBook: () => void }) {
  const isMia = msg.from === "mia";
  return (
    <div className={`flex flex-col ${isMia ? "items-start" : "items-end"}`}>
      <div
        className="max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed"
        style={
          isMia
            ? {
                background: "rgba(var(--hairline-rgb),0.05)",
                color: "var(--color-ink)",
                borderBottomLeftRadius: 6,
              }
            : {
                background: "var(--color-accent)",
                color: "var(--color-on-accent)",
                borderBottomRightRadius: 6,
              }
        }
      >
        {msg.text}
      </div>
      {msg.cta && (
        <Link
          href="/contact"
          onClick={onBook}
          className="mt-2 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium"
          style={{ background: "var(--color-accent)", color: "var(--color-on-accent)" }}
        >
          Book your free consult
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      )}
    </div>
  );
}
