"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, MotionConfig, motion, type Transition } from "framer-motion";
import { Check } from "lucide-react";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";
import { CHANNELS, addSecs, type Channel } from "./channels";
import s from "./inbox.module.css";

/**
 * UnifiedInbox: every channel a customer uses, landing in one inbox.
 *
 * Story per message: the channel pings, its mark lifts off the rail and
 * travels (shared layoutId) into the top of the inbox, older rows step
 * down. The conversation opens, a typing indicator runs, the reply lands
 * with its time, then Answered, Booked and Followed up tick in order.
 * Then the next channel takes the stage.
 *
 * Runs only while at least 30% on screen and the tab is visible, and stops
 * after 3 full cycles on the kitchen refit, fully answered. Reduced motion:
 * that same frame, static; channel taps swap content instantly.
 */

const N = CHANNELS.length;
const HOME = 2; // Website: the kitchen refit is the frame we rest on.
const MAX_CYCLES = 3;
const KEEP = 5;

// Phases of one message, and how long each one is held (ms).
const P = { incoming: 0, landed: 1, open: 2, typing: 3, replied: 4, answered: 5, booked: 6, followed: 7 } as const;
const FINAL = P.followed;
const HOLD = [700, 650, 650, 1300, 700, 650, 650, 2600];

type Entry = { id: number; ch: number };
type State = { entries: Entry[]; phase: number; advances: number; auto: boolean; nextId: number };

// Seed so the inbox is already lived in, newest first, kitchen refit on top.
const SEED: Entry[] = [HOME, 1, 0, 6, 5].map((ch, i) => ({ id: -1 - i, ch }));
const INITIAL: State = { entries: SEED, phase: FINAL, advances: 0, auto: true, nextId: 1 };

const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1];
const T_BASE: Transition = { duration: 0.32, ease: EASE_OUT };
const T_FLY: Transition = { duration: 0.56, ease: EASE_OUT };

const tint = (c: Channel) => ({ ["--tint" as string]: c.tint }) as CSSProperties;

function Mark({ c, lg }: { c: Channel; lg?: boolean }) {
  return (
    <span className={`${s.mark} ${lg ? s.markLg : ""}`} style={tint(c)} aria-hidden>
      {c.icon}
    </span>
  );
}

export function UnifiedInbox() {
  const reduce = useReducedMotionPref();
  const [st, setSt] = useState<State>(INITIAL);
  const [onScreen, setOnScreen] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [announce, setAnnounce] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    const onVis = () => setTabVisible(!document.hidden);
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const done = st.phase === FINAL && (!st.auto || st.advances >= MAX_CYCLES * N);
  const running = onScreen && tabVisible && !reduce && !done;

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => {
      setSt((p) => {
        if (p.phase < FINAL) return { ...p, phase: p.phase + 1 };
        const ch = (p.entries[0].ch + 1) % N;
        return {
          ...p,
          entries: [{ id: p.nextId, ch }, ...p.entries].slice(0, KEEP),
          phase: P.incoming,
          advances: p.advances + 1,
          nextId: p.nextId + 1,
        };
      });
    }, HOLD[st.phase]);
    return () => window.clearTimeout(t);
  }, [running, st.phase, st.entries]);

  const pick = (ch: number) => {
    setSt((p) => ({
      ...p,
      entries: [{ id: p.nextId, ch }, ...p.entries].slice(0, KEEP),
      phase: reduce ? FINAL : P.incoming,
      auto: false,
      nextId: p.nextId + 1,
    }));
    setAnnounce(`${CHANNELS[ch].label} example: ${CHANNELS[ch].ask} Reply: ${CHANNELS[ch].reply}`);
  };

  const { entries, phase } = st;
  const incoming = phase === P.incoming ? entries[0] : null;
  const rows = incoming ? entries.slice(1) : entries;
  // While a new message is still landing, the previous conversation stays open, finished.
  const featured = phase >= P.open ? entries[0] : entries[1];
  const fPhase = phase >= P.open ? phase : FINAL;
  const fc = CHANNELS[featured.ch];
  const top = entries[0];

  return (
    <MotionConfig reducedMotion="user">
      <div ref={ref} className={s.frame} role="group" aria-label="Example unified inbox">
        <span aria-hidden className={`${s.reg} ${s.regTl}`} />
        <span aria-hidden className={`${s.reg} ${s.regTr}`} />
        <span aria-hidden className={`${s.reg} ${s.regBl}`} />
        <span aria-hidden className={`${s.reg} ${s.regBr}`} />

        {/* Title bar */}
        <div className={s.titlebar}>
          <span className={s.dots} aria-hidden>
            <i /><i /><i />
          </span>
          <span className="font-mono text-[0.75rem] text-[color:var(--color-ink-muted)]">verdance · inbox</span>
          <span className={s.pill} data-live={running ? "" : undefined}>
            <span className={s.pillDot} aria-hidden />
            {reduce ? "Today" : "Live"}
          </span>
        </div>

        <div className={s.body}>
          {/* Channel rail */}
          <div className={s.rail}>
            <p className={`${s.colHead} ${s.railHead}`}>Channels</p>
            <ul className={s.railList} aria-label="Play an example from a channel">
              {CHANNELS.map((c, i) => {
                const lifting = incoming?.ch === i;
                return (
                  <li key={c.key}>
                    <button
                      type="button"
                      className={s.chan}
                      aria-pressed={featured.ch === i}
                      aria-label={`${c.label}: play example`}
                      onClick={() => pick(i)}
                    >
                      <span className="relative inline-grid">
                        <Mark c={c} />
                        {lifting && (
                          <>
                            <span key={`ping-${incoming.id}`} className={s.ping} style={{ ...tint(c), borderRadius: 8 }} aria-hidden />
                            <motion.span
                              layoutId={`pk-${incoming.id}`}
                              className={s.packet}
                              initial={{ scale: 0.6, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ ...T_BASE, layout: T_FLY }}
                            >
                              <Mark c={c} />
                            </motion.span>
                          </>
                        )}
                      </span>
                      <span className={s.chanLabel}>
                        <span className="lg:hidden">{c.short}</span>
                        <span className="hidden lg:inline">{c.label}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* One inbox */}
          <div className={s.list}>
            <p className={s.colHead}>
              <span>Inbox</span>
              <span>All channels</span>
            </p>
            <div className={s.listBox}>
              <ul className={s.rows} aria-label="Inbox">
                <AnimatePresence initial={false} mode="popLayout">
                  {rows.map((e) => {
                    const c = CHANNELS[e.ch];
                    const isTop = e.id === top.id;
                    const answered = !isTop || phase >= P.replied;
                    return (
                      <motion.li
                        key={e.id}
                        layout
                        className={s.row}
                        data-on={e.id === featured.id ? "" : undefined}
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, transition: { duration: 0.16 } }}
                        transition={T_BASE}
                      >
                        <motion.span layoutId={`pk-${e.id}`} className="inline-grid" transition={{ layout: T_FLY }}>
                          <Mark c={c} />
                        </motion.span>
                        <span className={s.rowMain}>
                          <span className={s.rowName}>{c.from}</span>
                          <span className={s.rowText}>{c.ask}</span>
                        </span>
                        {answered ? (
                          <span className={`${s.rowMeta} ${s.metaDone}`}>
                            <Check size={12} strokeWidth={2} aria-hidden />
                            {c.secs}s
                          </span>
                        ) : (
                          <span className={`${s.rowMeta} ${s.metaNew}`}>
                            <span className={s.newDot} aria-hidden />
                            New
                          </span>
                        )}
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
            </div>
          </div>

          {/* Featured conversation */}
          <div className={s.convo}>
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={featured.id}
                className={s.convoInner}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0, transition: T_BASE }}
                exit={{ opacity: 0, transition: { duration: 0.15, ease: [0.4, 0, 1, 1] } }}
              >
                <div className={s.convoHead}>
                  <Mark c={fc} lg />
                  <span className="min-w-0">
                    <span className={s.convoName}>{fc.from}</span>
                    <span className={s.convoVia}>via {fc.label}</span>
                  </span>
                  <span className={s.clock}>{fc.at}</span>
                </div>

                <div className={s.thread}>
                  <motion.div
                    className={`${s.bubble} ${s.bubbleIn}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={T_BASE}
                  >
                    {fc.ask}
                  </motion.div>

                  <AnimatePresence initial={false} mode="popLayout">
                    {fPhase === P.typing && (
                      <motion.div
                        key="typing"
                        className={s.typing}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, transition: { duration: 0.12 } }}
                        transition={T_BASE}
                        aria-hidden
                      >
                        <i /><i /><i />
                      </motion.div>
                    )}
                    {fPhase >= P.replied && (
                      <motion.div
                        key="reply"
                        className={`${s.bubble} ${s.bubbleOut}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={T_BASE}
                      >
                        {fc.reply}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {fPhase >= P.replied && (
                    <motion.span
                      className={s.stamp}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ ...T_BASE, delay: 0.12 }}
                    >
                      {addSecs(fc.at, fc.secs)} · <span className={s.fast}>Replied in {fc.secs}s</span>
                    </motion.span>
                  )}
                </div>

                <ol className={s.log} aria-label="What happened next">
                  {fc.outcomes.map((o, k) => {
                    const on = fPhase >= P.answered + k;
                    return (
                      <li key={o.label} className={s.logRow}>
                        <span className={s.chip} data-done={on ? "" : undefined}>
                          <span className={s.chipDot} aria-hidden />
                          {o.label}
                        </span>
                        {on ? (
                          <motion.span
                            className={s.logDetail}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={T_BASE}
                          >
                            {o.detail}
                          </motion.span>
                        ) : (
                          <span className={s.logDetail} aria-label="Pending">
                            <span className={s.logWait} />
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className={s.footer}>
          <span>Example conversations, for illustration</span>
          <span className="hidden sm:inline">Every reply inside 60 seconds</span>
        </div>

        <p className={s.srOnly} aria-live="polite">{announce}</p>
      </div>
    </MotionConfig>
  );
}
