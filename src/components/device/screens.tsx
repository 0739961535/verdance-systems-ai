import type { ReactNode } from "react";
import type { Beat } from "@/data/conversations";

/**
 * Phone screens. Pure presentational pieces (no hooks), sized in em so they
 * scale with the <Phone> frame. Used by ChatPhone (animated) and by the
 * scroll stories (one screen per step).
 */

/* ------------------------------------------------------------------ */
/* Chat                                                               */
/* ------------------------------------------------------------------ */

export function ChatView({
  business,
  beats,
  typing = false,
  animate = false,
  keyPrefix = "b",
  children,
}: {
  business: { name: string; initials: string };
  beats: Beat[];
  typing?: boolean;
  animate?: boolean;
  keyPrefix?: string;
  children?: ReactNode;
}) {
  return (
    <>
      <div className="wa-header">
        <BackChevron />
        <div className="wa-avatar">{business.initials}</div>
        <div className="min-w-0 leading-tight">
          <div className="truncate font-semibold" style={{ fontSize: "1.05em" }}>{business.name}</div>
          <div style={{ fontSize: "0.8em", color: "#8696A0" }}>{typing ? "typing…" : "online"}</div>
        </div>
      </div>

      <div className="wa-body">
        <div className="wa-stack">
        <div className="wa-chip">Today</div>
        {beats.map((b, i) => (
          <BeatView key={`${keyPrefix}-${i}`} beat={b} animate={animate} />
        ))}
        {typing && (
          <div className="wa-typing wa-enter">
            <span />
            <span />
            <span />
          </div>
        )}
        </div>
      </div>

      <div className="wa-composer">
        <div className="wa-composer-field">Message</div>
        <div className="wa-composer-mic">
          <MicIcon />
        </div>
      </div>
      {children}
    </>
  );
}

export function BeatView({ beat, animate }: { beat: Beat; animate: boolean }) {
  const enter = animate ? " wa-enter" : "";
  if (beat.kind === "missed") {
    return (
      <div className={`wa-missed${enter}`}>
        <PhoneMissedIcon />
        <span>{beat.text}</span>
        <span style={{ color: "#8696A0", fontSize: "0.85em" }}>{beat.time}</span>
      </div>
    );
  }
  if (beat.kind === "card") {
    return (
      <div className={`wa-card${enter}`} data-dir={beat.dir ?? "out"}>
        <div className="wa-card-head">
          <CalendarIcon />
          <span>{beat.title}</span>
        </div>
        <div className="wa-card-body">
          {beat.lines.map((l) => (
            <div key={l}>{l}</div>
          ))}
          <span className="wa-time" style={{ marginTop: "0.1em" }}>
            {beat.time}
            <Ticks />
          </span>
          <div style={{ clear: "both" }} />
        </div>
      </div>
    );
  }
  if (beat.kind === "in") {
    return (
      <div className={`wa-bubble${enter}`} data-dir="in" data-picked={beat.picked ? "" : undefined}>
        {beat.picked && <span className="wa-picked">Selected</span>}
        {beat.text}
        <span className="wa-time">{beat.time}</span>
      </div>
    );
  }
  const quick = beat.options?.style === "quick" ? beat.options : undefined;
  const list = beat.options?.style === "list" ? beat.options : undefined;
  return (
    <>
      <div className={`wa-bubble${enter}`} data-dir="out" data-wide={list || beat.product ? "" : undefined}>
        {beat.product && (
          <div className="wa-product">
            <div className="wa-product-img" aria-hidden />
            <div className="wa-product-body">
              <div className="font-semibold">{beat.product.name}</div>
              <div className="wa-product-detail">{beat.product.detail}</div>
            </div>
          </div>
        )}
        {beat.text}
        <span className="wa-time">
          {beat.time}
          <Ticks />
        </span>
        {list && (
          <div className="wa-list">
            {list.title && <div className="wa-list-title">{list.title}</div>}
            {list.items.map((it) => (
              <div key={it} className="wa-list-row">
                <span>{it}</span>
                <span className="wa-radio" />
              </div>
            ))}
          </div>
        )}
        {beat.product && <div className="wa-action">{beat.product.cta}</div>}
      </div>
      {quick && (
        <div className={`wa-quick${enter}`}>
          {quick.items.map((it) => (
            <span key={it}>{it}</span>
          ))}
        </div>
      )}
      {beat.meta && <div className={`wa-meta${enter}`}>{beat.meta}</div>}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Lock screen                                                        */
/* ------------------------------------------------------------------ */

export function LockView({
  on = true,
  clock,
  date,
  notes,
}: {
  on?: boolean;
  clock: string;
  date: string;
  notes: { app: string; title: string; body: string; tone?: "accent" | "missed" | "muted"; when?: string }[];
}) {
  return (
    <div className="lock" data-on={on ? "" : undefined}>
      <div className="lock-date">{date}</div>
      <div className="lock-clock">{clock}</div>
      {notes.map((n, i) => (
        <div key={`${n.title}-${i}`} className="lock-note" style={i ? { marginTop: "0.6em" } : undefined}>
          <div
            className="lock-app"
            style={
              n.tone === "missed"
                ? { background: "linear-gradient(140deg,#3ccf6e,#1f9d4c)" }
                : n.tone === "muted"
                  ? { background: "rgba(255,255,255,0.18)" }
                  : undefined
            }
          >
            {n.tone === "missed" ? <HandsetIcon /> : <CalendarIcon />}
          </div>
          <div className="min-w-0 text-left">
            <div className="flex items-baseline justify-between gap-2" style={{ fontSize: "0.82em" }}>
              <span className="font-semibold uppercase tracking-wide opacity-80">{n.app}</span>
              <span className="opacity-70">{n.when ?? "now"}</span>
            </div>
            <div className="mt-[0.15em] font-semibold" style={{ fontSize: "1.02em" }}>{n.title}</div>
            <div className="opacity-85" style={{ fontSize: "0.92em", lineHeight: 1.35 }}>{n.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Phone call                                                         */
/* ------------------------------------------------------------------ */

export function CallView({
  name,
  sub,
  state,
}: {
  name: string;
  sub: string;
  state: "ringing" | "noanswer" | "connected";
}) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center text-center"
      style={{
        paddingTop: "7.5em",
        background:
          state === "noanswer"
            ? "linear-gradient(180deg,#2a1416 0%,#120a0b 70%)"
            : "linear-gradient(180deg,#1b2a3f 0%,#0b1018 70%)",
        transition: "background 0.6s ease",
      }}
    >
      <div
        className={state === "ringing" ? "call-ring" : undefined}
        style={{
          width: "6em",
          height: "6em",
          borderRadius: 9999,
          display: "grid",
          placeItems: "center",
          background: "rgba(255,255,255,0.12)",
          fontSize: "1em",
          fontWeight: 700,
        }}
      >
        <span style={{ fontSize: "2em" }}>{name.slice(0, 1)}</span>
      </div>
      <div style={{ marginTop: "1.1em", fontSize: "1.7em", fontWeight: 600, letterSpacing: "-0.01em" }}>{name}</div>
      <div style={{ marginTop: "0.3em", fontSize: "1em", color: state === "noanswer" ? "#F59AA4" : "rgba(255,255,255,0.65)" }}>
        {sub}
      </div>
      <div className="absolute inset-x-0 flex justify-center" style={{ bottom: "4.2em", gap: "5em" }}>
        {state === "noanswer" ? (
          <CallButton color="rgba(255,255,255,0.18)" label="Call again">
            <HandsetIcon />
          </CallButton>
        ) : (
          <>
            <CallButton color="#ff3b30" label="End">
              <span style={{ display: "inline-flex", transform: "rotate(135deg)" }}>
                <HandsetIcon />
              </span>
            </CallButton>
          </>
        )}
      </div>
    </div>
  );
}

function CallButton({ color, label, children }: { color: string; label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center" style={{ gap: "0.5em" }}>
      <div style={{ width: "4.6em", height: "4.6em", borderRadius: 9999, background: color, display: "grid", placeItems: "center" }}>
        {children}
      </div>
      <span style={{ fontSize: "0.85em", opacity: 0.75 }}>{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* App-style panels (audit report, setup, monthly report)             */
/* ------------------------------------------------------------------ */

export function PanelView({
  title,
  kicker,
  rows,
  footer,
}: {
  title: string;
  kicker: string;
  rows: { label: string; value: string; tone?: "bad" | "good" | "plain"; done?: boolean }[];
  footer?: string;
}) {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ paddingTop: "4.6em", background: "#0d0f13" }}>
      <div style={{ padding: "0 1.3em" }}>
        <div style={{ fontSize: "0.8em", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8b93a3", fontFamily: "var(--font-mono)" }}>
          {kicker}
        </div>
        <div style={{ marginTop: "0.35em", fontSize: "1.65em", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.15 }}>{title}</div>
      </div>
      <div style={{ marginTop: "1.2em", padding: "0 0.9em", display: "flex", flexDirection: "column", gap: "0.5em" }}>
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex items-center justify-between"
            style={{
              gap: "0.8em",
              padding: "0.85em 0.9em",
              borderRadius: "0.9em",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span className="flex items-center" style={{ gap: "0.6em", fontSize: "0.98em" }}>
              {r.done !== undefined && (
                <span
                  style={{
                    width: "1.2em",
                    height: "1.2em",
                    borderRadius: 9999,
                    display: "grid",
                    placeItems: "center",
                    background: r.done ? "#3D7EFF" : "transparent",
                    border: r.done ? "none" : "1.5px solid rgba(255,255,255,0.25)",
                    flex: "none",
                  }}
                >
                  {r.done && (
                    <svg viewBox="0 0 12 12" width="0.7em" height="0.7em" fill="none" stroke="#fff" strokeWidth="2" aria-hidden>
                      <path d="m2.5 6.2 2.2 2.2 4.8-4.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
              )}
              {r.label}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.9em",
                fontVariantNumeric: "tabular-nums",
                color: r.tone === "bad" ? "#F59AA4" : r.tone === "good" ? "#7FD6B8" : "#E9EDEF",
                whiteSpace: "nowrap",
              }}
            >
              {r.value}
            </span>
          </div>
        ))}
      </div>
      {footer && (
        <div style={{ marginTop: "auto", padding: "1em 1.3em 2.2em", fontSize: "0.85em", color: "#8b93a3", lineHeight: 1.45 }}>{footer}</div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Icons                                                              */
/* ------------------------------------------------------------------ */

export function Ticks() {
  return (
    <svg viewBox="0 0 16 11" width="1.3em" height="0.9em" fill="none" stroke="#53BDEB" strokeWidth="1.6" aria-hidden>
      <path d="M1 6l3 3 6-7.5M6.5 8.5l.5.5 6-7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BackChevron() {
  return (
    <svg viewBox="0 0 10 16" width="0.7em" height="1.1em" fill="none" stroke="#E9EDEF" strokeWidth="2" aria-hidden>
      <path d="M8.5 1.5 2 8l6.5 6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" width="1.2em" height="1.2em" fill="#fff" aria-hidden>
      <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-2.1A7 7 0 0 0 19 12h-2Z" />
    </svg>
  );
}

export function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="1.25em" height="1.25em" fill="none" stroke="#fff" strokeWidth="1.8" aria-hidden>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" strokeLinecap="round" />
      <path d="m9 14.5 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HandsetIcon() {
  return (
    <svg viewBox="0 0 24 24" width="1.35em" height="1.35em" fill="#fff" aria-hidden>
      <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z" />
    </svg>
  );
}

function PhoneMissedIcon() {
  return (
    <svg viewBox="0 0 24 24" width="1.1em" height="1.1em" fill="none" stroke="#F15C6D" strokeWidth="2" aria-hidden>
      <path d="m16 3 5 5M21 3l-5 5" strokeLinecap="round" />
      <path d="M21 16.5v2.5a2 2 0 0 1-2.2 2A17 17 0 0 1 3 5.2 2 2 0 0 1 5 3h2.5a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.5 2.1l-1 1a14 14 0 0 0 5 5l1-1a2 2 0 0 1 2.1-.5c.8.3 1.7.6 2.6.7a2 2 0 0 1 1.6 2Z" strokeLinejoin="round" />
    </svg>
  );
}
