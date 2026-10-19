"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from "motion/react";
import { Check, Pause, PenLine, Play, RotateCcw } from "lucide-react";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";
import { DEMO_ITEMS, DEPARTMENTS, STAGES, type DemoItem } from "@/data/aiTeam";
import { ChipSwap, type ChipRole } from "./StatusChip";
import s from "./CommandCentre.module.css";

/**
 * Sample command centre. Pieces of work travel Department, Reviewer,
 * Operator, Needs you. The visitor can approve or edit what reaches them.
 *
 * Loop rules (design-system-v2 section 4): ticks only while at least 30% of
 * the frame is on screen and the tab is visible, stops after 3 full cycles
 * and holds a full frame. Reduced motion: the static best frame, no ticking.
 * SAMPLE DATA only, labelled on the frame.
 */

type Stage = "dept" | "review" | "operator" | "attn";

type Card = {
  key: string;
  item: DemoItem;
  stage: Stage;
  /** Lane it just came from, for the chip crossfade. */
  from?: Stage;
  fresh?: boolean;
  /** Stagger slot for the move, 60ms apart. */
  order?: number;
  edited?: string;
};

type State = {
  cards: Card[];
  next: number;
  spawned: number;
  done: number;
  pressing: string | null;
  editing: string | null;
  paused: boolean;
  ended: boolean;
  focusNext: boolean;
  msg: { id: number; text: string } | null;
  announce: string;
};

type Action =
  | { type: "press"; key: string }
  | { type: "approve"; key: string; auto: boolean }
  | { type: "edit"; key: string }
  | { type: "save"; key: string; text: string }
  | { type: "cancel" }
  | { type: "toggle" }
  | { type: "replay" };

const CYCLES = 3;
const NEXT: Record<Exclude<Stage, "attn">, Stage> = { dept: "review", review: "operator", operator: "attn" };
const ROLE: Record<Stage, ChipRole> = { dept: "dept", review: "review", operator: "operator", attn: "attn" };
const SUB: Record<Stage, string> = { dept: "Head and workers", review: "Checks it", operator: "Plans it", attn: "You decide" };
const EASE = [0.16, 1, 0.3, 1] as const;

/** The opening frame, also the reduced-motion frame: one piece of work per stage. */
const OPENING: Stage[] = ["attn", "operator", "review", "dept"];

function initialState(): State {
  return {
    cards: OPENING.map((stage, i) => ({ key: `${DEMO_ITEMS[i].id}-0`, item: DEMO_ITEMS[i], stage })),
    next: OPENING.length,
    spawned: 0,
    done: 0,
    pressing: null,
    editing: null,
    paused: false,
    ended: false,
    focusNext: false,
    msg: null,
    announce: "",
  };
}

function chipLabel(stage: Stage, item: DemoItem) {
  if (stage === "dept") return item.dept;
  return STAGES.find((x) => x.role === ROLE[stage])?.label ?? stage;
}

/** Move every card forward one lane where the lane ahead is free, furthest first, then refill Department. */
function cascade(state: State): State {
  const cards: Card[] = state.cards.map((c) => ({ ...c, from: undefined, fresh: false, order: 0 }));
  const taken = (st: Stage) => cards.some((c) => c.stage === st);
  let order = 0;
  for (const st of ["operator", "review", "dept"] as const) {
    const c = cards.find((x) => x.stage === st);
    if (c && !taken(NEXT[st])) {
      c.from = st;
      c.stage = NEXT[st];
      c.order = order++;
    }
  }
  let { next, spawned } = state;
  if (!taken("dept")) {
    const item = DEMO_ITEMS[next % DEMO_ITEMS.length];
    cards.push({ key: `${item.id}-${next}`, item, stage: "dept", fresh: true, order: order++ });
    next += 1;
    spawned += 1;
  }
  const ended = state.ended || spawned >= DEMO_ITEMS.length * CYCLES;
  return {
    ...state,
    cards,
    next,
    spawned,
    ended,
    announce: ended && !state.ended ? "Demo finished. Holding the last frame." : state.announce,
  };
}

function reducer(state: State, a: Action): State {
  switch (a.type) {
    case "press":
      return { ...state, pressing: a.key };
    case "approve": {
      const card = state.cards.find((c) => c.key === a.key);
      if (!card) return state;
      const done = state.done + 1;
      const moved = cascade({
        ...state,
        cards: state.cards.filter((c) => c.key !== a.key),
        done,
        pressing: null,
        editing: null,
        focusNext: !a.auto,
        msg: { id: done, text: a.auto ? "Approved. Sent. Logged." : "Sent. Logged." },
      });
      if (a.auto) return moved;
      const nextUp = moved.cards.find((c) => c.stage === "attn");
      return { ...moved, announce: `${card.item.title} approved. Sent. Logged.${nextUp ? ` Next: ${nextUp.item.title}.` : ""}` };
    }
    case "edit":
      return { ...state, editing: a.key, pressing: null, focusNext: false };
    case "save":
      return {
        ...state,
        editing: null,
        cards: state.cards.map((c) => (c.key === a.key ? { ...c, edited: a.text, from: undefined } : c)),
        msg: { id: -(state.done + 1) * 1000 - state.next, text: "Edit saved. Waiting for you." },
        announce: "Edit saved. It waits for your approval.",
      };
    case "cancel":
      return { ...state, editing: null };
    case "toggle":
      return { ...state, paused: !state.paused, pressing: null, announce: state.paused ? "Demo playing." : "Demo paused." };
    case "replay":
      return { ...state, ended: false, paused: false, spawned: 0, announce: "Demo playing." };
  }
}

/** True while at least 30% of the element is on screen and the tab is visible. */
function useActiveOnScreen<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.intersectionRatio >= 0.3), { threshold: [0, 0.3, 0.6] });
    io.observe(el);
    const onVis = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);
  return [ref, inView && tabVisible] as const;
}

export function CommandCentre() {
  const reduce = useReducedMotionPref();
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const [ref, active] = useActiveOnScreen<HTMLDivElement>();

  const running = active && !reduce && !state.paused && !state.ended && !state.editing;
  const attnKey = state.cards.find((c) => c.stage === "attn")?.key;
  const pressing = state.pressing;

  useEffect(() => {
    if (!running || !attnKey) return;
    // event cadence: --demo-tick randomised 2400 to 4000ms, plus --demo-hold so the Needs-you card can be read
    const delay = pressing ? 420 : 2400 + Math.random() * 1600 + 1200;
    const id = window.setTimeout(() => {
      if (pressing) dispatch({ type: "approve", key: pressing, auto: true });
      else dispatch({ type: "press", key: attnKey });
    }, delay);
    return () => window.clearTimeout(id);
  }, [running, attnKey, pressing]);

  const pill =
    reduce || state.ended
      ? { state: "idle", text: "Today" }
      : state.editing
        ? { state: "attn", text: "Waiting for you" }
        : state.paused
          ? { state: "idle", text: "Paused" }
          : { state: "live", text: "Live" };

  return (
    <MotionConfig reducedMotion="user">
      <div ref={ref} className={s.frame} role="group" aria-label="Sample command centre, for illustration">
        {(["tl", "tr", "bl", "br"] as const).map((c) => (
          <span key={c} aria-hidden className={s.reg} data-c={c} />
        ))}

        <div className={s.bar}>
          <span className={s.dots} aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <span className={s.title}>ashford · staff</span>
          <div className={s.barEnd}>
            <span className={s.pill} data-state={pill.state}>
              <span className={s.pillDot} aria-hidden />
              {pill.text}
            </span>
            {!reduce &&
              (state.ended ? (
                <button type="button" className={s.ctrl} onClick={() => dispatch({ type: "replay" })} aria-label="Replay the demo">
                  <RotateCcw size={16} strokeWidth={1.5} aria-hidden />
                </button>
              ) : (
                <button
                  type="button"
                  className={s.ctrl}
                  onClick={() => dispatch({ type: "toggle" })}
                  aria-label="Pause the demo"
                  aria-pressed={state.paused}
                >
                  {state.paused ? <Play size={16} strokeWidth={1.5} aria-hidden /> : <Pause size={16} strokeWidth={1.5} aria-hidden />}
                </button>
              ))}
          </div>
        </div>

        <LayoutGroup id="command-centre">
          <div className={s.board}>
            {STAGES.map((stage, i) => {
              const st = stage.role as Stage;
              const cards = state.cards.filter((c) => c.stage === st);
              const list = cards.map((c) => (
                <CardView
                  key={c.key}
                  card={c}
                  pressing={state.pressing === c.key}
                  editing={state.editing === c.key}
                  focusOnMount={state.focusNext}
                  dispatch={dispatch}
                />
              ));
              return (
                <section key={st} className={s.lane} data-stage={st} aria-label={stage.label}>
                  <div className={s.head} aria-hidden>
                    <span className={s.headNum}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={s.headName}>{stage.label}</span>
                    <span className={s.headSub}>{SUB[st]}</span>
                  </div>
                  <div className={s.body}>
                    {cards.length === 0 && st === "attn" && <p className={s.empty}>Nothing waiting for you</p>}
                    <ul className={s.list}>{st === "attn" ? <AnimatePresence mode="popLayout">{list}</AnimatePresence> : list}</ul>
                  </div>
                </section>
              );
            })}
          </div>
        </LayoutGroup>

        <div className={s.foot}>
          <p className={s.label}>Sample command centre, for illustration</p>
          <p className={s.msg} aria-hidden>
            <AnimatePresence mode="wait" initial={false}>
              {state.msg && (
                <motion.span
                  key={state.msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, minWidth: 0 }}
                >
                  <Check size={14} strokeWidth={2} aria-hidden />
                  <span>{state.msg.text}</span>
                </motion.span>
              )}
            </AnimatePresence>
          </p>
          <p className={s.done}>
            Done today
            <motion.span
              key={state.done}
              className={s.doneNum}
              initial={state.done ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, ease: EASE }}
            >
              {state.done}
            </motion.span>
          </p>
        </div>

        <p className="sr-only" aria-live="polite">
          {state.announce}
        </p>
      </div>
    </MotionConfig>
  );
}

type CardProps = {
  card: Card;
  pressing: boolean;
  editing: boolean;
  focusOnMount: boolean;
  dispatch: React.Dispatch<Action>;
};

function CardView({ card, pressing, editing, focusOnMount, dispatch }: CardProps) {
  const { item, stage } = card;
  const delay = (card.order ?? 0) * 0.06;
  const head = DEPARTMENTS.find((d) => d.name === item.dept)?.head;

  return (
    <motion.li
      layoutId={card.key}
      layout="position"
      className={s.card}
      data-stage={stage}
      initial={card.fresh ? { opacity: 0, y: 12 } : false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 32, rotate: 1.5, scale: 0.98, transition: { duration: 0.24, ease: [0.4, 0, 1, 1] } }}
      whileHover={{ y: -2 }}
      transition={{
        // springs give the cards weight as they hand off between lanes
        layout: { type: "spring", visualDuration: 0.6, bounce: 0.2, delay },
        opacity: { duration: 0.32, ease: EASE, delay },
        y: { type: "spring", visualDuration: 0.4, bounce: 0.25, delay },
      }}
    >
      <div className={s.cardTop}>
        <ChipSwap
          role={ROLE[stage]}
          label={chipLabel(stage, item)}
          from={card.from ? ROLE[card.from] : undefined}
          fromLabel={card.from ? chipLabel(card.from, item) : undefined}
        />
        <span className={s.biz}>{item.biz}</span>
      </div>
      <p className={s.cardTitle} title={item.title}>
        {item.title}
      </p>

      {stage === "dept" && (
        <div className={s.detail}>
          <dl className={s.kv}>
            <dt>Head</dt>
            <dd>{head}</dd>
            <dt>Worker</dt>
            <dd>{item.worker}</dd>
          </dl>
          <span className={s.progress} aria-hidden>
            <i />
          </span>
        </div>
      )}

      {stage === "review" && (
        <div className={s.detail}>
          <ul className={s.checks}>
            {item.check.map((c, i) => (
              <li key={c} className={card.from ? s.tickIn : undefined} style={{ animationDelay: `${0.35 + i * 0.12}s` }}>
                <Check size={14} strokeWidth={2} aria-hidden />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {stage === "operator" && (
        <div className={s.detail}>
          <span className={s.planLabel}>Plan</span>
          <p className={s.plan}>{item.plan}</p>
        </div>
      )}

      {stage === "attn" && <AttnDetail card={card} pressing={pressing} editing={editing} focusOnMount={focusOnMount} dispatch={dispatch} />}
    </motion.li>
  );
}

function AttnDetail({ card, pressing, editing, focusOnMount, dispatch }: CardProps) {
  const draft = card.edited ?? card.item.draft;
  const [text, setText] = useState(draft);
  const inputRef = useRef<HTMLInputElement>(null);
  const approveRef = useRef<HTMLButtonElement>(null);
  const editRef = useRef<HTMLButtonElement>(null);
  const wasEditing = useRef(false);
  const focusFirst = useRef(focusOnMount);

  // A visitor who just approved keeps their place on the next card.
  useEffect(() => {
    if (focusFirst.current) approveRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (editing) inputRef.current?.focus({ preventScroll: true });
    else if (wasEditing.current) editRef.current?.focus({ preventScroll: true });
    wasEditing.current = editing;
  }, [editing]);

  if (editing) {
    return (
      <form
        className={s.detail}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "save", key: card.key, text: text.trim() || card.item.draft });
        }}
      >
        <label className="sr-only" htmlFor={`edit-${card.key}`}>
          Edit the reply for {card.item.title}
        </label>
        <input
          id={`edit-${card.key}`}
          ref={inputRef}
          className={s.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") dispatch({ type: "cancel" });
          }}
          autoComplete="off"
        />
        <div className={s.actions}>
          <button type="submit" className={s.act} data-kind="approve">
            <Check size={16} strokeWidth={1.5} aria-hidden />
            Save
          </button>
          <button type="button" className={s.act} onClick={() => dispatch({ type: "cancel" })}>
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className={s.detail}>
      <p className={s.draft} title={draft}>
        {card.edited && <span className={s.edited}>Edited by you · </span>}
        {draft}
      </p>
      <div className={s.actions}>
        <button
          ref={approveRef}
          type="button"
          className={s.act}
          data-kind="approve"
          data-pressing={pressing}
          onClick={() => dispatch({ type: "approve", key: card.key, auto: false })}
          aria-label={`Approve: ${card.item.title}`}
        >
          <Check size={16} strokeWidth={1.5} aria-hidden />
          Approve
        </button>
        <button
          ref={editRef}
          type="button"
          className={s.act}
          onClick={() => {
            setText(draft);
            dispatch({ type: "edit", key: card.key });
          }}
          aria-label={`Edit: ${card.item.title}`}
        >
          <PenLine size={16} strokeWidth={1.5} aria-hidden />
          Edit
        </button>
      </div>
    </div>
  );
}
