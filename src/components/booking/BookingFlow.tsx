"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { GENERIC_BOOK_URL, BOOK_BASE } from "@/data/booking";
import { SITE } from "@/data/site";
import { track } from "@/lib/analytics";
import { QUESTIONS, isLowFit, type Answers, type QuestionId } from "./questions";

/**
 * BookingFlow: the home page booking, step by step, on the page. Seven
 * one-tap questions, an honest note when the business is below our usual
 * size (never a dead end), contact details with POPIA consent, a time from
 * the live calendar (GET /api/booking/slots), a confirm step and a success
 * screen. No page reloads; answers are kept when the visitor goes back.
 *
 * It also catches the page's "Book a free 30-minute call" links (they point
 * at the external booking site) and scrolls here instead. If the slots API
 * fails, the links go through to the external page as before, and the flow
 * shows that same link.
 */

type Day = { date: string; slots: string[] };
type SlotState = "idle" | "loading" | "ready" | "error";
type StepKey = QuestionId | "fit" | "details" | "time" | "confirm" | "done";

const TZ = "Africa/Johannesburg";
const fmtDay = new Intl.DateTimeFormat("en-GB", { weekday: "short", timeZone: "UTC" });
const fmtDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
const fmtLong = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: TZ });
const fmtTime = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: TZ });

function timeLabel(slot: string): string {
  const ms = Date.parse(slot);
  return Number.isFinite(ms) ? fmtTime.format(ms) : slot.slice(11, 16);
}
function longLabel(slot: string): string {
  const ms = Date.parse(slot);
  return Number.isFinite(ms) ? `${fmtLong.format(ms)} at ${fmtTime.format(ms)}` : slot;
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const phoneOk = (p: string) => p.replace(/\D/g, "").length >= 9 && /^[+\d\s()-]+$/.test(p.trim());

export function BookingFlow() {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState<StepKey>("business");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const [slotState, setSlotState] = useState<SlotState>("idle");
  const [days, setDays] = useState<Day[]>([]);
  const [dayIdx, setDayIdx] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  const slotRef = useRef<SlotState>("idle");
  useEffect(() => {
    slotRef.current = slotState;
  }, [slotState]);

  const lowFit = isLowFit(answers);
  const steps = useMemo<StepKey[]>(
    () => [...QUESTIONS.map((q) => q.id), ...(lowFit ? (["fit"] as const) : []), "details", "time", "confirm"],
    [lowFit],
  );
  const idx = steps.indexOf(step);
  const total = steps.length;

  /* ---------- availability ---------- */
  const loadSlots = useCallback(() => {
    setSlotState("loading");
    fetch("/api/booking/slots", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: { days?: Day[] }) => {
        const list = (d.days ?? []).filter((x) => x.slots?.length);
        if (!list.length) throw new Error("empty");
        setDays(list);
        setDayIdx(0);
        setSlotState("ready");
      })
      .catch(() => setSlotState("error"));
  }, []);

  // Fetch when the section nears the screen, not on page load.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const near = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && slotRef.current === "idle") loadSlots();
      },
      { rootMargin: "600px 0px 600px 0px" },
    );
    // While the flow is on screen the sticky mobile bar steps aside, so it
    // never covers the form's own buttons.
    const seen = new IntersectionObserver(([e]) => {
      document.documentElement.toggleAttribute("data-book-visible", e.isIntersecting);
    });
    near.observe(el);
    seen.observe(el);
    return () => {
      near.disconnect();
      seen.disconnect();
      document.documentElement.removeAttribute("data-book-visible");
    };
  }, [loadSlots]);

  // The page's booking links scroll here while the flow can book.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target instanceof Element ? e.target : null)?.closest<HTMLAnchorElement>("a[href]");
      if (!a || a.closest(".bk-card")) return; // the flow's own fallback links go out
      const href = a.getAttribute("href") ?? "";
      if (!href.startsWith(BOOK_BASE) && href !== SITE.ghlBooking && href !== "#book") return;
      if (slotRef.current === "error") return; // fallback: the external page
      const target = document.getElementById("book");
      if (!target) return;
      e.preventDefault();
      if (slotRef.current === "idle") loadSlots();
      target.scrollIntoView({ block: "start" });
      try {
        history.replaceState(null, "", "#book");
      } catch {}
      window.setTimeout(() => headRef.current?.focus({ preventScroll: true }), 60);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [loadSlots]);

  /* ---------- moving between steps ---------- */
  const go = useCallback((next: StepKey) => {
    if (next === "time" && slotRef.current === "idle") loadSlots();
    moved.current = true;
    setError(null);
    setShowErrors(false);
    setStep(next);
  }, [loadSlots]);

  // Keep the step in view and move focus to its heading for keyboard and
  // screen reader users (not on first render).
  useEffect(() => {
    if (!moved.current) return;
    headRef.current?.focus({ preventScroll: true });
    const top = rootRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 72 || top > window.innerHeight * 0.6) rootRef.current?.scrollIntoView({ block: "start" });
  }, [step]);

  const next = () => go(steps[Math.min(idx + 1, total - 1)]);
  const back = () => idx > 0 && go(steps[idx - 1]);

  function choose(q: (typeof QUESTIONS)[number], option: string) {
    setAnswers((a) => ({ ...a, [q.id]: option }));
    if (q.other && option === q.other) return; // wait for the text
    // a short beat so the tick is seen before the next question
    window.setTimeout(() => {
      const after = { ...answers, [q.id]: option };
      const list: StepKey[] = [...QUESTIONS.map((x) => x.id), ...(isLowFit(after) ? (["fit"] as const) : []), "details", "time", "confirm"];
      go(list[list.indexOf(q.id) + 1]);
    }, 160);
  }

  /* ---------- details ---------- */
  const errs = {
    name: name.trim().length < 2 ? "Please add your name." : "",
    email: !EMAIL_RE.test(email.trim()) ? "Please add a valid email address." : "",
    phone: !phoneOk(phone) ? "Please add a phone number we can reach you on." : "",
    consent: !consent ? "Please tick the box so we can book the call." : "",
  };
  const detailsOk = !errs.name && !errs.email && !errs.phone && !errs.consent;

  /* ---------- booking ---------- */
  async function book() {
    if (!slot || sending) return;
    setSending(true);
    setError(null);
    const res = await fetch("/api/booking/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim(), slot, answers, consent }),
    }).catch(() => null);
    setSending(false);
    if (res?.ok) {
      track("audit_booked", { booking_page: "home_flow" });
      go("done");
      return;
    }
    if (res?.status === 409) {
      setSlot(null);
      go("time");
      setError("That time was just taken. Please choose another.");
      loadSlots();
      return;
    }
    if (res?.status === 429) {
      setError("Too many tries in a short time. Please wait a few minutes, or book on our calendar below.");
      return;
    }
    setError("Something went wrong on our side. Please try again, or book on our calendar below.");
  }

  const q = QUESTIONS.find((x) => x.id === step);
  const selectedDay = days[dayIdx];
  const section =
    q ? "About your business" : step === "fit" ? "A quick note" : step === "details" ? "Your details" : step === "time" ? "Pick a time" : "Confirm";

  return (
    <div ref={rootRef} className="bk-card" style={{ scrollMarginTop: "5.5rem" }}>
      <style>{CSS}</style>

      {step !== "done" && (
        <div className="bk-top">
          <div className="bk-top-row">
            {idx > 0 ? (
              <button type="button" className="bk-back" onClick={back}>
                <ArrowLeft size={16} aria-hidden /> Back
              </button>
            ) : (
              <span className="bk-meta">30 min · video call · free</span>
            )}
            <span className="bk-count" aria-hidden>
              {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
          <div
            className="bk-bar"
            role="progressbar"
            aria-label={`Step ${idx + 1} of ${total}: ${section}`}
            aria-valuemin={1}
            aria-valuemax={total}
            aria-valuenow={idx + 1}
          >
            <span style={{ transform: `scaleX(${(idx + 1) / total})` }} />
          </div>
          <p className="bk-section">{section}</p>
        </div>
      )}

      <div className="bk-body" key={step}>
        {/* ---------- the seven questions ---------- */}
        {q && (
          <fieldset className="bk-fs">
            <legend className="bk-sr">{q.title}</legend>
            <h3 ref={headRef} tabIndex={-1} className="bk-h">
              {q.title}
            </h3>
            {q.hint && <p className="bk-hint">{q.hint}</p>}
            <div className="bk-choices">
              {q.options.map((o) => {
                const on = answers[q.id] === o;
                return (
                  <button key={o} type="button" className="bk-choice" aria-pressed={on} onClick={() => choose(q, o)}>
                    <span>{o}</span>
                    <span className="bk-tick" aria-hidden>
                      {on && <Check size={14} strokeWidth={2.5} />}
                    </span>
                  </button>
                );
              })}
            </div>
            {q.other && answers[q.id] === q.other && (
              <form
                className="bk-other"
                onSubmit={(e) => {
                  e.preventDefault();
                  next();
                }}
              >
                <label className="bk-label" htmlFor="bk-other">
                  In a few words
                </label>
                <input
                  id="bk-other"
                  className="bk-input"
                  maxLength={200}
                  autoFocus
                  value={answers.leakOther ?? ""}
                  onChange={(e) => setAnswers((a) => ({ ...a, leakOther: e.target.value }))}
                  placeholder="For example: stock questions on WhatsApp"
                />
                <button type="submit" className="btn btn-accent bk-primary">
                  Continue <ArrowRight size={16} aria-hidden />
                </button>
              </form>
            )}
            {answers[q.id] && !(q.other && answers[q.id] === q.other) && (
              <button type="button" className="bk-skip" onClick={next}>
                Keep this answer <ArrowRight size={14} aria-hidden />
              </button>
            )}
          </fieldset>
        )}

        {/* ---------- honest note for smaller businesses ---------- */}
        {step === "fit" && (
          <div>
            <h3 ref={headRef} tabIndex={-1} className="bk-h">
              An honest note before you book.
            </h3>
            <p className="bk-p">
              From your answers, a full system may be more than your business needs right now. We do our best work
              with teams handling a steady flow of enquiries every week.
            </p>
            <p className="bk-p">
              You are still welcome to book. We will tell you plainly what is worth doing at your size, even if that
              is nothing from us yet.
            </p>
            <button type="button" className="btn btn-accent bk-primary" onClick={next}>
              Continue to book <ArrowRight size={16} aria-hidden />
            </button>
            <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className="bk-ghost">
              Ask a quick question on WhatsApp
            </a>
            <div className="bk-links">
              <span className="bk-meta">Or read first</span>
              <Link href="/how-it-works">How it works</Link>
              <Link href="/services">What we build</Link>
              <Link href="/missed-call-calculator">What missed enquiries cost</Link>
            </div>
          </div>
        )}

        {/* ---------- details and consent ---------- */}
        {step === "details" && (
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              if (detailsOk) next();
              else setShowErrors(true);
            }}
          >
            <h3 ref={headRef} tabIndex={-1} className="bk-h">
              Who should we expect on the call?
            </h3>
            <div className="bk-fields">
              <Field id="bk-name" label="Full name" err={showErrors ? errs.name : ""}>
                <input id="bk-name" className="bk-input" autoComplete="name" maxLength={120} value={name} onChange={(e) => setName(e.target.value)} aria-invalid={showErrors && !!errs.name} aria-describedby={showErrors && errs.name ? "bk-name-err" : undefined} />
              </Field>
              <Field id="bk-email" label="Work email" err={showErrors ? errs.email : ""}>
                <input id="bk-email" className="bk-input" type="email" inputMode="email" autoComplete="email" maxLength={160} value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={showErrors && !!errs.email} aria-describedby={showErrors && errs.email ? "bk-email-err" : undefined} />
              </Field>
              <Field id="bk-phone" label="Phone or WhatsApp number" err={showErrors ? errs.phone : ""}>
                <input id="bk-phone" className="bk-input" type="tel" inputMode="tel" autoComplete="tel" maxLength={40} placeholder="+27" value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={showErrors && !!errs.phone} aria-describedby={showErrors && errs.phone ? "bk-phone-err" : undefined} />
              </Field>
              <div>
                <label className="bk-consent">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} aria-invalid={showErrors && !!errs.consent} aria-describedby={showErrors && errs.consent ? "bk-consent-err" : undefined} />
                  <span className="bk-box" aria-hidden>
                    {consent && <Check size={14} strokeWidth={2.5} />}
                  </span>
                  <span>
                    I agree that Verdance may contact me about this call and store these answers.{" "}
                    <a href="/privacy" target="_blank" rel="noopener">
                      Privacy policy
                    </a>
                  </span>
                </label>
                {showErrors && errs.consent && (
                  <p id="bk-consent-err" className="bk-err">
                    {errs.consent}
                  </p>
                )}
              </div>
            </div>
            <button type="submit" className="btn btn-accent bk-primary">
              Choose a time <ArrowRight size={16} aria-hidden />
            </button>
          </form>
        )}

        {/* ---------- pick a time ---------- */}
        {step === "time" && (
          <div>
            <h3 ref={headRef} tabIndex={-1} className="bk-h">
              Pick a time that suits you.
            </h3>
            {error && <p className="bk-err bk-err-box" role="alert">{error}</p>}
            {(slotState === "idle" || slotState === "loading") && (
              <div className="bk-loading" aria-live="polite">
                <span className="bk-skel" />
                <span className="bk-skel" />
                <span className="bk-sr">Checking the calendar</span>
              </div>
            )}
            {slotState === "error" && <Fallback />}
            {slotState === "ready" && selectedDay && (
              <>
                <div className="bk-days" role="group" aria-label="Day">
                  {days.map((d, i) => {
                    const at = new Date(`${d.date}T12:00:00Z`);
                    return (
                      <button
                        key={d.date}
                        type="button"
                        className="bk-day"
                        aria-pressed={i === dayIdx}
                        onClick={() => {
                          setDayIdx(i);
                          setSlot(null);
                        }}
                      >
                        <span className="bk-day-w">{fmtDay.format(at)}</span>
                        <span className="bk-day-d">{fmtDate.format(at)}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="bk-times" role="group" aria-label={`Times on ${fmtDay.format(new Date(`${selectedDay.date}T12:00:00Z`))} ${fmtDate.format(new Date(`${selectedDay.date}T12:00:00Z`))}`}>
                  {selectedDay.slots.map((t) => (
                    <button key={t} type="button" className="bk-time" aria-pressed={slot === t} onClick={() => setSlot(t)}>
                      {timeLabel(t)}
                    </button>
                  ))}
                </div>
                <p className="bk-meta bk-tz">South African time (SAST, GMT+2)</p>
                <button type="button" className="btn btn-accent bk-primary" disabled={!slot} onClick={next}>
                  Continue <ArrowRight size={16} aria-hidden />
                </button>
              </>
            )}
          </div>
        )}

        {/* ---------- confirm ---------- */}
        {step === "confirm" && slot && (
          <div>
            <h3 ref={headRef} tabIndex={-1} className="bk-h">
              Check and confirm.
            </h3>
            <dl className="bk-sum">
              <div>
                <dt>When</dt>
                <dd>
                  {longLabel(slot)} <span className="bk-meta">SAST</span>
                </dd>
                <button type="button" onClick={() => go("time")}>Change</button>
              </div>
              <div>
                <dt>Who</dt>
                <dd>
                  {name.trim()}
                  <br />
                  <span className="bk-dim">{email.trim()}</span>
                  <br />
                  <span className="bk-dim">{phone.trim()}</span>
                </dd>
                <button type="button" onClick={() => go("details")}>Change</button>
              </div>
              <div>
                <dt>Call</dt>
                <dd>30 minutes, video call, free</dd>
              </div>
            </dl>
            {error && <p className="bk-err bk-err-box" role="alert">{error}</p>}
            <button type="button" className="btn btn-accent bk-primary" onClick={() => void book()} disabled={sending} aria-busy={sending}>
              {sending ? "Booking your call" : "Confirm booking"}
              {!sending && <Check size={16} aria-hidden />}
            </button>
            <p className="bk-meta bk-after">A calendar invitation goes to your email straight away.</p>
            {error && (
              <a href={GENERIC_BOOK_URL} className="bk-ghost">
                Book on our calendar instead <ArrowUpRight size={14} aria-hidden />
              </a>
            )}
          </div>
        )}
        {step === "confirm" && !slot && (
          <div>
            <h3 ref={headRef} tabIndex={-1} className="bk-h">
              Pick a time first.
            </h3>
            <button type="button" className="btn btn-accent bk-primary" onClick={() => go("time")}>
              Choose a time
            </button>
          </div>
        )}

        {/* ---------- done ---------- */}
        {step === "done" && slot && (
          <div className="bk-done" aria-live="polite">
            <span className="bk-done-icon">
              <Check size={22} aria-hidden />
            </span>
            <h3 ref={headRef} tabIndex={-1} className="bk-h">
              Your call is booked.
            </h3>
            <p className="bk-when">
              {longLabel(slot)} <span className="bk-meta">SAST</span>
            </p>
            <ol className="bk-next">
              <li>
                <span>01</span>A calendar invitation is on its way to {email.trim()}.
              </li>
              <li>
                <span>02</span>We read your answers before the call, so we start on your business, not on forms.
              </li>
              <li>
                <span>03</span>On the call we show you where time and money leak, and say plainly if we are not the right fit.
              </li>
            </ol>
            <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className="bk-ghost">
              Need to move it? WhatsApp us
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ id, label, err, children }: { id: string; label: string; err: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="bk-label" htmlFor={id}>
        {label}
      </label>
      {children}
      {err && (
        <p id={`${id}-err`} className="bk-err">
          {err}
        </p>
      )}
    </div>
  );
}

function Fallback() {
  return (
    <div className="bk-fallback">
      <p className="bk-p">The live calendar is not loading here right now. Book on our calendar page instead, or message us and we will find a time.</p>
      <a href={GENERIC_BOOK_URL} className="btn btn-accent bk-primary">
        Open the booking calendar <ArrowUpRight size={16} aria-hidden />
      </a>
      <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className="bk-ghost">
        WhatsApp us instead
      </a>
    </div>
  );
}

const CSS = `
html[data-book-visible] nav[data-cta-location="sticky_mobile"] { transform: translateY(110%) !important; }
.bk-card {
  position: relative; overflow: hidden; overflow: clip; border-radius: 22px; background: #0A1226; color: #F2F5FC;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 40px 120px -48px rgba(77,124,255,0.45);
}
.bk-card { min-width: 0; max-width: 100%; }
.bk-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.bk-top { padding: 16px 20px 0; }
.bk-top-row { display: flex; align-items: center; justify-content: space-between; min-height: 44px; gap: 12px; }
.bk-back {
  display: inline-flex; align-items: center; gap: 6px; min-height: 44px; margin-left: -8px; padding: 0 10px;
  border-radius: 12px; background: none; border: 0; color: rgba(234,240,255,0.78); font-size: 0.95rem; cursor: pointer;
}
.bk-back:hover { color: #FFFFFF; background: rgba(255,255,255,0.04); }
.bk-meta { font-size: 0.8125rem; color: rgba(234,240,255,0.6); letter-spacing: 0.01em; }
.bk-count { font-variant-numeric: tabular-nums; font-size: 0.8125rem; letter-spacing: 0.08em; color: rgba(234,240,255,0.6); }
.bk-bar { position: relative; height: 2px; margin-top: 8px; border-radius: 2px; background: rgba(255,255,255,0.08); overflow: hidden; }
.bk-bar > span { position: absolute; inset: 0; background: linear-gradient(90deg, #4D7CFF, #8FB0FF); transform-origin: 0 50%; transition: transform 420ms cubic-bezier(.16,1,.3,1); }
.bk-section { margin: 14px 0 0; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #8FB0FF; }
.bk-body { padding: 10px 20px 24px; animation: bk-in 320ms cubic-bezier(.16,1,.3,1) both; }
@keyframes bk-in { from { opacity: 0; transform: translate3d(0, 10px, 0); } to { opacity: 1; transform: none; } }
.bk-fs { border: 0; margin: 0; padding: 0; min-width: 0; }
.bk-h { margin: 0; font-family: var(--font-display); font-weight: 600; font-size: 1.5rem; line-height: 1.2; letter-spacing: -0.025em; color: #F2F5FC; outline: none; }
.bk-hint { margin: 8px 0 0; font-size: 0.95rem; line-height: 1.5; color: rgba(234,240,255,0.66); }
.bk-p { margin: 12px 0 0; font-size: 1rem; line-height: 1.55; color: rgba(234,240,255,0.8); max-width: 52ch; }
.bk-choices { display: grid; gap: 8px; margin-top: 20px; }
.bk-choice {
  display: flex; align-items: center; justify-content: space-between; gap: 12px; width: 100%; min-height: 54px;
  padding: 12px 16px; border-radius: 14px; text-align: left; cursor: pointer;
  font-size: 1rem; font-weight: 500; line-height: 1.3; color: #F2F5FC;
  background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.12);
  transition: border-color 160ms, background-color 160ms, transform 160ms;
}
.bk-choice:hover { border-color: rgba(143,176,255,0.5); background: rgba(77,124,255,0.06); }
.bk-choice:active { transform: scale(0.99); }
.bk-choice[aria-pressed="true"] { border-color: #4D7CFF; background: rgba(77,124,255,0.14); }
.bk-tick {
  flex: none; display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.22); color: #FFFFFF;
}
.bk-choice[aria-pressed="true"] .bk-tick { background: #4D7CFF; border-color: #4D7CFF; }
.bk-skip { display: inline-flex; align-items: center; gap: 6px; min-height: 44px; margin-top: 12px; padding: 0; background: none; border: 0; color: #8FB0FF; font-size: 0.95rem; font-weight: 600; cursor: pointer; }
.bk-other { margin-top: 16px; }
.bk-label { display: block; margin-bottom: 6px; font-size: 0.875rem; font-weight: 500; color: rgba(234,240,255,0.78); }
.bk-input {
  width: 100%; min-height: 52px; padding: 12px 14px; border-radius: 12px; font-size: 1rem; color: #F2F5FC;
  background: #13203F; border: 1px solid rgba(255,255,255,0.14); outline: none; transition: border-color 160ms, box-shadow 160ms;
}
.bk-input::placeholder { color: rgba(234,240,255,0.42); }
.bk-input:focus { border-color: #4D7CFF; box-shadow: 0 0 0 3px rgba(77,124,255,0.25); }
.bk-input[aria-invalid="true"] { border-color: #F59E9E; }
.bk-fields { display: grid; gap: 16px; margin-top: 20px; }
.bk-err { margin: 6px 0 0; font-size: 0.875rem; color: #F8B4B4; }
.bk-err-box { margin: 16px 0 0; padding: 10px 12px; border-radius: 12px; background: rgba(248,113,113,0.08); border: 1px solid rgba(248,113,113,0.3); }
.bk-consent { position: relative; display: flex; gap: 12px; align-items: flex-start; min-height: 44px; padding: 10px 0; cursor: pointer; font-size: 0.9375rem; line-height: 1.5; color: rgba(234,240,255,0.8); }
.bk-consent input { position: absolute; opacity: 0; width: 24px; height: 24px; margin: 0; top: 10px; left: 0; }
.bk-consent a { color: #8FB0FF; text-decoration: underline; text-underline-offset: 3px; }
.bk-box {
  flex: none; display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; margin-top: 1px;
  border-radius: 7px; border: 1px solid rgba(255,255,255,0.3); background: #13203F; color: #FFFFFF;
}
.bk-consent input:checked + .bk-box { background: #4D7CFF; border-color: #4D7CFF; }
.bk-consent input:focus-visible + .bk-box { outline: 2px solid #8FB0FF; outline-offset: 2px; }
.bk-consent input[aria-invalid="true"] + .bk-box { border-color: #F59E9E; }
.bk-primary { width: 100%; min-height: 54px; justify-content: center; margin-top: 24px; font-size: 1.02rem; gap: 8px; }
.bk-primary:disabled { opacity: 0.4; cursor: not-allowed; }
.bk-ghost {
  display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%; min-height: 52px; margin-top: 10px;
  border-radius: 999px; border: 1px solid rgba(255,255,255,0.16); color: #F2F5FC; font-size: 0.98rem; font-weight: 500; text-decoration: none;
  transition: border-color 160ms, background-color 160ms;
}
.bk-ghost:hover { border-color: rgba(143,176,255,0.5); background: rgba(77,124,255,0.06); }
.bk-links { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 16px; margin-top: 20px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.08); }
.bk-links a { display: inline-flex; align-items: center; min-height: 44px; color: #8FB0FF; font-size: 0.95rem; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(143,176,255,0.4); }
.bk-days { display: flex; gap: 8px; margin: 20px -20px 0; padding: 0 20px 4px; overflow-x: auto; scroll-snap-type: x proximity; scrollbar-width: none; }
.bk-days::-webkit-scrollbar { display: none; }
.bk-day {
  flex: none; scroll-snap-align: start; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px;
  min-width: 68px; min-height: 60px; padding: 8px 12px; border-radius: 14px; cursor: pointer; color: #F2F5FC;
  background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.12); transition: border-color 160ms, background-color 160ms;
}
.bk-day[aria-pressed="true"] { border-color: #4D7CFF; background: rgba(77,124,255,0.14); }
.bk-day-w { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(234,240,255,0.6); }
.bk-day-d { font-size: 0.98rem; font-weight: 600; font-variant-numeric: tabular-nums; }
.bk-times { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin-top: 16px; }
.bk-time {
  min-height: 48px; border-radius: 12px; cursor: pointer; font-size: 1rem; font-weight: 500; font-variant-numeric: tabular-nums; color: #F2F5FC;
  background: transparent; border: 1px solid rgba(255,255,255,0.12); transition: border-color 160ms, background-color 160ms;
}
.bk-time:hover, .bk-day:hover { border-color: rgba(143,176,255,0.5); }
.bk-time[aria-pressed="true"] { background: #4D7CFF; border-color: #4D7CFF; color: #FFFFFF; }
.bk-tz { margin: 12px 0 0; }
.bk-loading { display: grid; gap: 10px; margin-top: 20px; }
.bk-skel { display: block; height: 52px; border-radius: 12px; background: linear-gradient(90deg, rgba(255,255,255,0.03), rgba(255,255,255,0.07), rgba(255,255,255,0.03)); background-size: 200% 100%; animation: bk-shim 1.4s linear infinite; }
@keyframes bk-shim { to { background-position: -200% 0; } }
.bk-sum { margin: 20px 0 0; border-top: 1px solid rgba(255,255,255,0.08); }
.bk-sum > div { display: grid; grid-template-columns: 64px 1fr auto; gap: 12px; align-items: start; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.08); }
.bk-sum dt { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(234,240,255,0.6); padding-top: 3px; }
.bk-sum dd { margin: 0; font-size: 1rem; line-height: 1.45; color: #F2F5FC; font-variant-numeric: tabular-nums; overflow-wrap: anywhere; }
.bk-sum button { min-height: 44px; margin: -12px 0; padding: 0 4px; background: none; border: 0; color: #8FB0FF; font-size: 0.9rem; font-weight: 600; cursor: pointer; }
.bk-dim { color: rgba(234,240,255,0.66); }
.bk-after { margin: 12px 0 0; text-align: center; }
.bk-done { padding: 20px 0 0; }
.bk-done-icon { display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; margin-bottom: 16px; border-radius: 999px; background: rgba(77,124,255,0.16); border: 1px solid #4D7CFF; color: #8FB0FF; }
.bk-when { margin: 10px 0 0; font-size: 1.125rem; font-weight: 600; color: #DCE6FF; font-variant-numeric: tabular-nums; }
.bk-next { list-style: none; margin: 20px 0 8px; padding: 0; border-top: 1px solid rgba(255,255,255,0.08); }
.bk-next li { display: grid; grid-template-columns: 36px 1fr; gap: 8px; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 0.98rem; line-height: 1.5; color: rgba(234,240,255,0.84); overflow-wrap: anywhere; }
.bk-next li span { font-size: 0.8rem; font-weight: 600; color: #8FB0FF; font-variant-numeric: tabular-nums; padding-top: 2px; }
.bk-fallback { margin-top: 4px; }
.bk-card :focus-visible { outline: 2px solid #8FB0FF; outline-offset: 2px; }
.bk-card .bk-h:focus-visible { outline: none; }
@media (min-width: 640px) {
  .bk-top { padding: 22px 32px 0; }
  .bk-body { padding: 12px 32px 32px; }
  .bk-days { margin: 20px -32px 0; padding: 0 32px 4px; }
  .bk-h { font-size: 1.75rem; }
  .bk-choices { grid-template-columns: 1fr 1fr; }
  .bk-times { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
@media (prefers-reduced-motion: reduce) {
  .bk-body, .bk-skel { animation: none; }
  .bk-bar > span, .bk-choice, .bk-day, .bk-time, .bk-input, .bk-ghost { transition: none; }
}
`;
