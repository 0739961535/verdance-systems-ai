"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { SITE } from "@/data/site";
import { isBookingUrl, track } from "@/lib/analytics";
import { FounderPortrait } from "@/components/brand/FounderPortrait";
import { FOUNDER } from "@/data/founder";
import { PREPARE, TEXT_CONSENT, TIME_TAKERS, isLowFit, type Answers } from "./questions";

/**
 * BookingFlow: Verdance's own booking, calendar first. Used on /book and
 * in the home page #book section. The CRM calendar is the diary of record
 * (GET /api/booking/slots, POST /api/booking/book), but the visitor only
 * ever sees this card.
 *
 *   1 time     a two-week calendar of live slots
 *   2 details  three questions: name and business, email and phone (with
 *              an optional text and WhatsApp consent tick), and what is
 *              taking up the team's time
 *   3 done     booked; then an optional "help us prepare" step with the
 *              remaining questions, and an honest note when the business
 *              is below our usual size (never a dead end)
 *
 * If the calendar cannot load, the card asks for details instead and we
 * send times (POST /api/booking/request). On the home page it also catches
 * the page's booking links and scrolls here instead of loading /book.
 */

type Day = { date: string; slots: string[] };
type SlotState = "idle" | "loading" | "ready" | "error";
type Step = "time" | "details" | "done" | "prepared" | "requested";

const SA = "Africa/Johannesburg";
const fmtWeekday = new Intl.DateTimeFormat("en-GB", { weekday: "short", timeZone: "UTC" });
const fmtDayNum = new Intl.DateTimeFormat("en-GB", { day: "numeric", timeZone: "UTC" });
const fmtMonth = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
const fmtDayLong = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });
const fmtSA = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: SA });

const noon = (date: string) => new Date(`${date}T12:00:00Z`);
/** The visitor's time zone: Daniel's (SAST) on the server and during hydration, theirs after. */
const noopSubscribe = () => () => {};
const browserZone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || SA;
  } catch {
    return SA;
  }
};
function useVisitorZone(): string {
  return useSyncExternalStore(noopSubscribe, browserZone, () => SA);
}

/** Formatting for one time zone: slot times, long dates, the zone's name and abbreviation. */
function zoneTools(tz: string) {
  let zone = tz;
  try {
    new Intl.DateTimeFormat("en-GB", { timeZone: zone });
  } catch {
    zone = SA;
  }
  const time = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: zone });
  const long = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: zone });
  const ymd = new Intl.DateTimeFormat("en-CA", { timeZone: zone });
  const short = new Intl.DateTimeFormat("en-GB", { timeZone: zone, timeZoneName: "short" });
  const abbr = (ms = Date.now()) => (zone === SA ? "SAST" : (short.formatToParts(ms).find((p) => p.type === "timeZoneName")?.value ?? ""));
  const name =
    zone === SA
      ? "South African time"
      : zone === "Europe/London"
        ? "UK time"
        : `${(zone.split("/").pop() || zone).replace(/_/g, " ")} time`;
  const ms = (slot: string) => Date.parse(slot);
  return {
    zone,
    isSA: zone === SA,
    name,
    abbr,
    dateOf: (slot: string) => ymd.format(ms(slot)),
    today: () => ymd.format(new Date()),
    timeLabel: (slot: string) => (Number.isFinite(ms(slot)) ? time.format(ms(slot)) : slot.slice(11, 16)),
    longLabel: (slot: string) => (Number.isFinite(ms(slot)) ? `${long.format(ms(slot))} at ${time.format(ms(slot))}` : slot),
  };
}
const addDays = (date: string, n: number) => new Date(noon(date).getTime() + n * 86_400_000).toISOString().slice(0, 10);

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const phoneOk = (p: string) => !p.trim() || (p.replace(/\D/g, "").length >= 9 && /^[+\d\s()-]+$/.test(p.trim()));

function storedUtms(): Record<string, string> {
  const out: Record<string, string> = {};
  try {
    Object.assign(out, JSON.parse(sessionStorage.getItem("verdance_utm") || "{}"));
  } catch {}
  const cur = new URLSearchParams(window.location.search);
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    const v = cur.get(k);
    if (v) out[k] = v;
  }
  return out;
}

export function BookingFlow({ page = "home" }: { page?: "home" | "book" }) {
  const tz = useVisitorZone();
  const z = useMemo(() => zoneTools(tz), [tz]);
  const [step, setStep] = useState<Step>("time");
  const [slotState, setSlotState] = useState<SlotState>("idle");
  const [days, setDays] = useState<Day[]>([]);
  const [date, setDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [testMode, setTestMode] = useState(false);

  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [textConsent, setTextConsent] = useState(false);
  const [picks, setPicks] = useState<string[]>([]);
  const [other, setOther] = useState("");
  const [honey, setHoney] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // the CRM took the details but not the appointment: confirm it by hand
  const [pending, setPending] = useState(false);
  const [ticket, setTicket] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [prepState, setPrepState] = useState<"open" | "sending" | "sent" | "skipped">("open");
  const source = useRef("");

  const rootRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  const slotRef = useRef<SlotState>("idle");
  useEffect(() => {
    slotRef.current = slotState;
  }, [slotState]);

  /* ---------- availability ---------- */
  const loadSlots = useCallback(() => {
    setSlotState("loading");
    fetch("/api/booking/slots", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: { days?: Day[]; dryRun?: boolean }) => {
        const list = (d.days ?? []).filter((x) => x.slots?.length);
        if (!list.length) throw new Error("empty");
        setDays(list);
        setDate(null);
        setTestMode(!!d.dryRun);
        setSlotState("ready");
      })
      .catch(() => setSlotState("error"));
  }, []);

  useEffect(() => {
    source.current = (new URLSearchParams(window.location.search).get("for") || "").slice(0, 40);
    const el = rootRef.current;
    if (!el) return;
    // Fetch when the card nears the screen (on /book it already is, so the
    // observer fires at once).
    const near = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && slotRef.current === "idle") loadSlots();
      },
      { rootMargin: "800px 0px 800px 0px" },
    );
    // While the card is on screen the sticky mobile bar steps aside.
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

  // The page's booking links scroll here instead of loading /book.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target instanceof Element ? e.target : null)?.closest<HTMLAnchorElement>("a[href]");
      if (!a || a.closest(".bk-card")) return;
      const href = a.getAttribute("href") ?? "";
      if (!isBookingUrl(href) && href !== "#book") return;
      const target = document.getElementById("book");
      if (!target) return;
      e.preventDefault();
      try {
        const forParam = new URL(href, window.location.href).searchParams.get("for");
        if (forParam) source.current = forParam.slice(0, 40);
      } catch {}
      if (slotRef.current === "idle") loadSlots();
      // Sections above render lazily (content-visibility), so their real
      // heights arrive after the first jump: keep correcting for a moment.
      target.scrollIntoView({ block: "start" });
      const until = performance.now() + 1800;
      let user = false;
      const stop = () => (user = true);
      window.addEventListener("wheel", stop, { once: true, passive: true });
      window.addEventListener("touchstart", stop, { once: true, passive: true });
      const settle = () => {
        if (user) return;
        const top = target.getBoundingClientRect().top;
        const want = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
        if (Math.abs(top - want) > 4) target.scrollIntoView({ block: "start" });
        if (performance.now() < until) requestAnimationFrame(settle);
      };
      requestAnimationFrame(settle);
      try {
        history.replaceState(null, "", "#book");
      } catch {}
      window.setTimeout(() => headRef.current?.focus({ preventScroll: true }), 60);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [loadSlots]);

  /* ---------- steps ---------- */
  const go = useCallback((next: Step) => {
    moved.current = true;
    setError(null);
    setShowErrors(false);
    setStep(next);
  }, []);

  useEffect(() => {
    if (!moved.current) return;
    headRef.current?.focus({ preventScroll: true });
    const top = rootRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 72 || top > window.innerHeight * 0.6) rootRef.current?.scrollIntoView({ block: "start" });
  }, [step, prepState]);

  /* ---------- calendar grid: two weeks from this Monday ---------- */
  // The calendar's days in the visitor's own zone: a slot can fall on a
  // different date there than in South Africa.
  const localDays = useMemo<Day[]>(() => {
    const map = new Map<string, string[]>();
    for (const d of days) for (const t of d.slots) {
      const key = z.dateOf(t);
      map.set(key, [...(map.get(key) ?? []), t]);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([date, slots]) => ({ date, slots }));
  }, [days, z]);
  const activeDate = date && localDays.some((d) => d.date === date) ? date : (localDays[0]?.date ?? null);

  const grid = useMemo(() => {
    const today = z.today();
    const wd = (noon(today).getUTCDay() + 6) % 7; // Monday = 0
    const start = addDays(today, -wd);
    const byDate = new Map(localDays.map((d) => [d.date, d]));
    const last = localDays.length ? localDays[localDays.length - 1].date : today;
    const weeks = Math.min(3, Math.max(2, Math.ceil(((noon(last).getTime() - noon(start).getTime()) / 86_400_000 + 1) / 7)));
    return Array.from({ length: weeks * 7 }, (_, i) => {
      const dt = addDays(start, i);
      return { date: dt, day: byDate.get(dt) ?? null, past: dt < today };
    });
  }, [localDays, z]);
  const selectedDay = localDays.find((d) => d.date === activeDate) ?? null;
  const monthLabel = (() => {
    if (!grid.length) return "";
    const first = fmtMonth.format(noon(grid[0].date));
    const last = fmtMonth.format(noon(grid[grid.length - 1].date));
    return first === last ? first : `${first.replace(/ \d{4}$/, last.slice(-4) === first.slice(-4) ? "" : first.slice(-5))} to ${last}`;
  })();

  /* ---------- details ---------- */
  const errs = {
    name: name.trim().length < 2 ? "Please add your name." : "",
    business: !business.trim() ? "Please add the name of your business." : "",
    email: !EMAIL_RE.test(email.trim()) ? "Please add a valid email address." : "",
    phone: !phoneOk(phone) ? "Please check the number, or leave it empty." : "",
  };
  const detailsOk = !errs.name && !errs.business && !errs.email && !errs.phone;
  /** Show the errors and move focus to the first field that needs fixing. */
  const flagErrors = () => {
    setShowErrors(true);
    const first = errs.name ? "bk-name" : errs.business ? "bk-biz" : errs.email ? "bk-email" : errs.phone ? "bk-phone" : "";
    if (first) requestAnimationFrame(() => document.getElementById(first)?.focus());
  };
  const togglePick = (p: string) => setPicks((cur) => (cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p]));

  const payload = () => ({
    name: name.trim(),
    business: business.trim(),
    email: email.trim(),
    phone: phone.trim(),
    textConsent,
    timeTaker: { picks, other: other.trim() },
    source: source.current,
    utm: storedUtms(),
    tz: z.zone,
    website: honey,
  });

  async function book() {
    if (!slot || sending) return;
    if (!detailsOk) {
      flagErrors();
      return;
    }
    setSending(true);
    setError(null);
    const res = await fetch("/api/booking/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload(), slot }),
    }).catch(() => null);
    setSending(false);
    if (res?.ok) {
      const j = await res.json().catch(() => ({}));
      setTicket(typeof j.ticket === "string" ? j.ticket : null);
      setPending(j.pending === true);
      if (!j.dryRun) track("audit_booked", { booking_page: page === "book" ? "book_page" : "home_flow", niche: source.current || undefined });
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
      setError("Too many tries in a short time. Please wait a few minutes, or WhatsApp us.");
      return;
    }
    setError("Something went wrong on our side. Please try again, or WhatsApp us and we will book it for you.");
  }

  async function request() {
    if (sending) return;
    if (!detailsOk) {
      flagErrors();
      return;
    }
    setSending(true);
    setError(null);
    const res = await fetch("/api/booking/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload()),
    }).catch(() => null);
    setSending(false);
    if (res?.ok) {
      go("requested");
      return;
    }
    setError("That did not go through. Please WhatsApp us and we will find a time.");
  }

  async function prepare() {
    if (!ticket || prepState === "sending") return;
    if (!Object.keys(answers).length) {
      setPrepState("skipped");
      go("prepared");
      return;
    }
    setPrepState("sending");
    const res = await fetch("/api/booking/prepare", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticket, answers }),
    }).catch(() => null);
    setPrepState(res?.ok ? "sent" : "open");
    if (res?.ok) go("prepared");
    else setError("Your answers did not save. Your call is still booked. Try again, or skip.");
  }

  const stepNo = step === "time" ? 1 : step === "details" ? 2 : 3;
  const stepName = step === "time" ? "Choose a time" : step === "details" ? "Three quick questions" : "Booked";
  const fallback = step === "time" && slotState === "error";

  return (
    <div ref={rootRef} className="bk-card" style={{ scrollMarginTop: "5.5rem" }} data-cta-location="booking">
      <style>{CSS}</style>

      <div className="bk-top">
        <div className="bk-host">
          <FounderPortrait size="face" />
          <div className="bk-host-t">
            <span className="bk-host-n">Free 30-minute call with {FOUNDER.name.split(" ")[0]}</span>
            <span className="bk-meta">Video call · {z.name} · Nothing to sign</span>
          </div>
        </div>
        {testMode && <p className="bk-test">Test mode. Nothing is booked and no one is contacted.</p>}
        {!["done", "prepared", "requested"].includes(step) && !fallback && (
          <>
            <div className="bk-top-row">
              {step === "details" ? (
                <button type="button" className="bk-back" onClick={() => go("time")}>
                  <ArrowLeft size={16} aria-hidden /> Change the time
                </button>
              ) : (
                <span className="bk-section">{stepName}</span>
              )}
              <span className="bk-count" aria-hidden>
                Step {stepNo} of 2
              </span>
            </div>
            <div className="bk-bar" role="progressbar" aria-label={`Step ${stepNo} of 2: ${stepName}`} aria-valuemin={1} aria-valuemax={2} aria-valuenow={stepNo}>
              <span style={{ transform: `scaleX(${stepNo / 2})` }} />
            </div>
          </>
        )}
      </div>

      <div className="bk-body" key={`${step}-${fallback}`}>
        {/* ---------- 1 the calendar ---------- */}
        {step === "time" && !fallback && (
          <div>
            <h2 ref={headRef} tabIndex={-1} className="bk-h">
              Pick a time that suits you.
            </h2>
            {error && (
              <p className="bk-err bk-err-box" role="alert">
                {error}
              </p>
            )}
            {(slotState === "idle" || slotState === "loading") && (
              <div className="bk-loading" aria-live="polite">
                <span className="bk-skel bk-skel-cal" />
                <span className="bk-skel" />
                <span className="bk-sr">Checking the calendar</span>
              </div>
            )}
            {slotState === "ready" && (
              <div className="bk-cal-wrap">
                <div className="bk-cal">
                  <p className="bk-month">{monthLabel}</p>
                  <div className="bk-cal-grid" role="group" aria-label="Choose a day">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((w) => (
                      <span key={w} className="bk-wd" aria-hidden>
                        {w}
                      </span>
                    ))}
                    {grid.map((c) => {
                      const open = !!c.day && !c.past;
                      return (
                        <button
                          key={c.date}
                          type="button"
                          className="bk-dc"
                          disabled={!open}
                          aria-pressed={open ? c.date === activeDate : undefined}
                          aria-label={`${fmtDayLong.format(noon(c.date))}${open ? `, ${c.day!.slots.length} times free` : ", no times"}`}
                          onClick={() => {
                            setDate(c.date);
                            setSlot(null);
                          }}
                        >
                          {fmtDayNum.format(noon(c.date))}
                          {open && <span className="bk-dot" aria-hidden />}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {selectedDay && (
                  <div className="bk-slots">
                    <p className="bk-slots-h">{fmtDayLong.format(noon(selectedDay.date))}</p>
                    <div className="bk-times" role="group" aria-label={`Times on ${fmtDayLong.format(noon(selectedDay.date))}`}>
                      {selectedDay.slots.map((t) => (
                        <button key={t} type="button" className="bk-time" aria-pressed={slot === t} onClick={() => setSlot(t)}>
                          {z.timeLabel(t)}
                        </button>
                      ))}
                    </div>
                    <p className="bk-meta bk-tz">
                      Times shown in {z.name} ({z.abbr()}).{!z.isSA && " Daniel is in South Africa (SAST)."}
                    </p>
                  </div>
                )}
              </div>
            )}
            {slotState === "ready" && (
              <button type="button" className="btn btn-accent bk-primary" disabled={!slot} onClick={() => go("details")}>
                {slot ? `Continue with ${fmtWeekday.format(noon(z.dateOf(slot)))} ${z.timeLabel(slot)}` : "Choose a time to continue"}
                {slot && <ArrowRight size={16} aria-hidden />}
              </button>
            )}
          </div>
        )}

        {/* ---------- 2 three questions (also the fallback request) ---------- */}
        {(step === "details" || fallback) && (
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              void (fallback ? request() : book());
            }}
          >
            {fallback ? (
              <>
                <h2 ref={headRef} tabIndex={-1} className="bk-h">
                  Tell us when suits you.
                </h2>
                <p className="bk-p">Leave your details and we&apos;ll send you two options today. Or WhatsApp us and we&apos;ll book it with you.</p>
              </>
            ) : (
              <>
                <h2 ref={headRef} tabIndex={-1} className="bk-h">
                  Three quick questions.
                </h2>
                {slot && (
                  <p className="bk-chosen">
                    <Check size={15} aria-hidden /> {z.longLabel(slot)} <When slot={slot} z={z} />
                  </p>
                )}
              </>
            )}

            <fieldset className="bk-q">
              <legend className="bk-ql">
                <span>01</span> Who are you, and what is the business?
              </legend>
              <div className="bk-row2">
                <Field id="bk-name" label="Your name" err={showErrors ? errs.name : ""}>
                  <input id="bk-name" className="bk-input" autoComplete="name" maxLength={120} value={name} onChange={(e) => setName(e.target.value)} aria-invalid={showErrors && !!errs.name} aria-describedby={showErrors && errs.name ? "bk-name-err" : undefined} />
                </Field>
                <Field id="bk-biz" label="Business name" err={showErrors ? errs.business : ""}>
                  <input id="bk-biz" className="bk-input" autoComplete="organization" maxLength={160} value={business} onChange={(e) => setBusiness(e.target.value)} aria-invalid={showErrors && !!errs.business} aria-describedby={showErrors && errs.business ? "bk-biz-err" : undefined} />
                </Field>
              </div>
            </fieldset>

            <fieldset className="bk-q">
              <legend className="bk-ql">
                <span>02</span> Where should the invitation go?
              </legend>
              <div className="bk-row2">
                <Field id="bk-email" label="Email" err={showErrors ? errs.email : ""}>
                  <input id="bk-email" className="bk-input" type="email" inputMode="email" autoComplete="email" maxLength={160} value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={showErrors && !!errs.email} aria-describedby={showErrors && errs.email ? "bk-email-err" : undefined} />
                </Field>
                <Field id="bk-phone" label="Mobile (optional)" err={showErrors ? errs.phone : ""}>
                  <input id="bk-phone" className="bk-input" type="tel" inputMode="tel" autoComplete="tel" maxLength={40} placeholder={z.zone === "Europe/London" ? "+44" : "+27"} value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={showErrors && !!errs.phone} aria-describedby={showErrors && errs.phone ? "bk-phone-err" : undefined} />
                </Field>
              </div>
              <label className="bk-consent">
                <input type="checkbox" checked={textConsent} onChange={(e) => setTextConsent(e.target.checked)} />
                <span className="bk-box" aria-hidden>
                  {textConsent && <Check size={14} strokeWidth={2.5} />}
                </span>
                <span>{TEXT_CONSENT}</span>
              </label>
            </fieldset>

            <fieldset className="bk-q">
              <legend className="bk-ql">
                <span>03</span> What&apos;s taking up your team&apos;s time?
              </legend>
              <p className="bk-hint">Tap any that fit, or say it in your own words. Both are optional.</p>
              <div className="bk-chips">
                {TIME_TAKERS.map((p) => (
                  <button key={p} type="button" className="bk-chip" aria-pressed={picks.includes(p)} onClick={() => togglePick(p)}>
                    {picks.includes(p) && <Check size={13} strokeWidth={2.5} aria-hidden />}
                    {p}
                  </button>
                ))}
              </div>
              <label className="bk-sr" htmlFor="bk-other">
                In your own words
              </label>
              <textarea id="bk-other" className="bk-input bk-text" rows={2} maxLength={400} value={other} onChange={(e) => setOther(e.target.value)} placeholder="For example: stock questions on WhatsApp eat most of Monday" />
            </fieldset>

            {/* bots fill this; people never see it */}
            <div className="bk-hp" aria-hidden>
              <label htmlFor="bk-website">Website</label>
              <input id="bk-website" tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} />
            </div>

            {error && (
              <p className="bk-err bk-err-box" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="btn btn-accent bk-primary" disabled={sending} aria-busy={sending}>
              {sending ? (fallback ? "Sending" : "Booking your call") : fallback ? "Send me some times" : "Confirm the call"}
              {!sending && <Check size={16} aria-hidden />}
            </button>
            <p className="bk-meta bk-after">
              We use these details to arrange and prepare for this call.{" "}
              <a href="/privacy" target="_blank" rel="noopener">
                Privacy policy
              </a>
            </p>
            {fallback && (
              <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className="bk-ghost">
                WhatsApp us instead
              </a>
            )}
          </form>
        )}

        {/* ---------- 3 booked, then help us prepare ---------- */}
        {step === "done" && slot && (
          <div className="bk-done" aria-live="polite">
            <span className="bk-done-icon">
              <Check size={22} aria-hidden />
            </span>
            <h2 ref={headRef} tabIndex={-1} className="bk-h">
              {pending ? "Thanks, we've got your request." : "Your call is booked."}
            </h2>
            <p className="bk-when">
              {z.longLabel(slot)} <When slot={slot} z={z} />
            </p>
            <p className="bk-p">
              {pending
                ? `Thanks, we've got your request for ${z.longLabel(slot)}. You'll get a confirmation by email shortly.`
                : `An invitation with the video link is on its way to ${email.trim()}.`}
            </p>

            {ticket && (
              <div className="bk-prep">
                <p className="bk-section">Optional · about a minute</p>
                <h4 className="bk-h4">Help us prepare.</h4>
                <p className="bk-hint">A few taps, so we come to the call with examples that fit your business. Skip any you like.</p>
                {PREPARE.map((q) => (
                  <fieldset key={q.id} className="bk-pq">
                    <legend className="bk-pl">{q.title}</legend>
                    <div className="bk-chips">
                      {q.options.map((o) => (
                        <button
                          key={o}
                          type="button"
                          className="bk-chip"
                          aria-pressed={answers[q.id] === o}
                          onClick={() => setAnswers((a) => ({ ...a, [q.id]: a[q.id] === o ? undefined : o }))}
                        >
                          {answers[q.id] === o && <Check size={13} strokeWidth={2.5} aria-hidden />}
                          {o}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                ))}
                {error && (
                  <p className="bk-err bk-err-box" role="alert">
                    {error}
                  </p>
                )}
                <button type="button" className="btn btn-accent bk-primary" onClick={() => void prepare()} disabled={prepState === "sending"} aria-busy={prepState === "sending"}>
                  {prepState === "sending" ? "Saving" : "Send my answers"}
                </button>
                <button
                  type="button"
                  className="bk-skip"
                  onClick={() => {
                    setPrepState("skipped");
                    go("prepared");
                  }}
                >
                  Skip for now
                </button>
              </div>
            )}
            {!ticket && <NextSteps />}
          </div>
        )}

        {step === "prepared" && slot && (
          <div className="bk-done" aria-live="polite">
            {prepState === "sent" && isLowFit(answers) ? (
              <>
                <h2 ref={headRef} tabIndex={-1} className="bk-h">
                  Thank you. An honest note.
                </h2>
                <p className="bk-p">
                  Your call on {z.longLabel(slot)} ({z.abbr(Date.parse(slot))}) is still booked. From your answers, a full system may be more than your business needs right
                  now. We do our best work with teams handling a steady flow of enquiries every week.
                </p>
                <p className="bk-p">We will still tell you plainly what is worth doing at your size, even if that is nothing from us yet. If you would rather not use the time, a quick WhatsApp is enough to cancel.</p>
                <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className="bk-ghost">
                  WhatsApp us
                </a>
                <div className="bk-links">
                  <span className="bk-meta">Or read first</span>
                  <Link href="/how-it-works">How it works</Link>
                  <Link href="/services">What we build</Link>
                  <Link href="/missed-call-calculator">What missed enquiries cost</Link>
                </div>
              </>
            ) : (
              <>
                <span className="bk-done-icon">
                  <Check size={22} aria-hidden />
                </span>
                <h2 ref={headRef} tabIndex={-1} className="bk-h">
                  {prepState === "sent" ? "Thank you. We will come prepared." : "All set."}
                </h2>
                <p className="bk-when">
                  {z.longLabel(slot)} <When slot={slot} z={z} />
                </p>
                <NextSteps />
              </>
            )}
          </div>
        )}

        {step === "requested" && (
          <div className="bk-done" aria-live="polite">
            <span className="bk-done-icon">
              <Check size={22} aria-hidden />
            </span>
            <h2 ref={headRef} tabIndex={-1} className="bk-h">
              Thank you. We will send you times.
            </h2>
            <p className="bk-p">Expect two or three options at {email.trim()} within the working day. Reply with the one that suits you.</p>
            <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className="bk-ghost">
              Or WhatsApp us now
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

/** The zone after a chosen time, plus Daniel's SAST time when the visitor is elsewhere. */
function When({ slot, z }: { slot: string; z: ReturnType<typeof zoneTools> }) {
  const ms = Date.parse(slot);
  return (
    <span className="bk-meta">
      {z.abbr(ms)}
      {!z.isSA && Number.isFinite(ms) && ` · ${fmtSA.format(ms)} SAST for Daniel`}
    </span>
  );
}

function NextSteps() {
  return (
    <>
      <ol className="bk-next">
        <li>
          <span>01</span>The invitation and video link are in your inbox.
        </li>
        <li>
          <span>02</span>We look at your business before the call, so the thirty minutes are spent on it.
        </li>
        <li>
          <span>03</span>On the call we show you where time and money leak, and say plainly if we are not the right fit.
        </li>
      </ol>
      <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className="bk-ghost">
        Need to move it? WhatsApp us
      </a>
    </>
  );
}

function Field({ id, label, err, children }: { id: string; label: string; err: string; children: React.ReactNode }) {
  return (
    <div className="bk-field">
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

const CSS = `
html[data-book-visible] nav[data-cta-location="sticky_mobile"] { transform: translateY(110%) !important; }
.bk-card {
  position: relative; overflow: hidden; overflow: clip; border-radius: 24px; background: #0A1226; color: #F2F5FC;
  border: 1px solid rgba(255,255,255,0.1); min-width: 0; max-width: 100%; container-type: inline-size;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 40px 120px -48px rgba(77,124,255,0.45);
}
.bk-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.bk-hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
.bk-top { padding: 20px 20px 0; }
.bk-host { display: flex; align-items: center; gap: 14px; padding-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.bk-host-t { display: grid; gap: 2px; min-width: 0; }
.bk-host-n { font-weight: 600; font-size: 1rem; color: #F2F5FC; }
.bk-test { margin: 12px 0 0; padding: 8px 12px; border-radius: 10px; font-size: 0.875rem; color: #F2C46D; background: rgba(242,196,109,0.08); border: 1px solid rgba(242,196,109,0.3); }
.bk-top-row { display: flex; align-items: center; justify-content: space-between; min-height: 44px; gap: 12px; margin-top: 8px; }
.bk-back { display: inline-flex; align-items: center; gap: 6px; min-height: 44px; margin-left: -10px; padding: 0 10px; border-radius: 12px; background: none; border: 0; color: rgba(234,240,255,0.8); font-size: 0.95rem; cursor: pointer; }
.bk-back:hover { color: #FFFFFF; background: rgba(255,255,255,0.04); }
.bk-meta { font-size: 0.8125rem; color: rgba(234,240,255,0.66); letter-spacing: 0.01em; }
.bk-count { font-variant-numeric: tabular-nums; font-size: 0.8125rem; color: rgba(234,240,255,0.66); }
.bk-bar { position: relative; height: 2px; margin-top: 4px; border-radius: 2px; background: rgba(255,255,255,0.08); overflow: hidden; }
.bk-bar > span { position: absolute; inset: 0; background: linear-gradient(90deg, #4D7CFF, #8FB0FF); transform-origin: 0 50%; transition: transform 420ms cubic-bezier(.16,1,.3,1); }
.bk-section { margin: 0; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #8FB0FF; }
.bk-body { padding: 20px 20px 24px; animation: bk-in 320ms cubic-bezier(.16,1,.3,1) both; }
@keyframes bk-in { from { opacity: 0; transform: translate3d(0, 10px, 0); } to { opacity: 1; transform: none; } }
.bk-h { margin: 0; font-family: var(--font-display); font-weight: 600; font-size: 1.5rem; line-height: 1.2; letter-spacing: -0.025em; color: #F2F5FC; outline: none; }
.bk-h4 { margin: 8px 0 0; font-family: var(--font-display); font-weight: 600; font-size: 1.25rem; letter-spacing: -0.02em; color: #F2F5FC; }
.bk-hint { margin: 6px 0 0; font-size: 0.9375rem; line-height: 1.5; color: rgba(234,240,255,0.7); }
.bk-p { margin: 12px 0 0; font-size: 1rem; line-height: 1.55; color: rgba(234,240,255,0.82); max-width: 54ch; }

/* calendar */
.bk-cal-wrap { display: grid; gap: 20px; margin-top: 20px; }
.bk-month { margin: 0 0 10px; font-size: 0.95rem; font-weight: 600; color: #DCE6FF; }
.bk-cal-grid { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 4px; }
.bk-wd { padding: 4px 0 6px; text-align: center; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.06em; color: rgba(234,240,255,0.55); }
.bk-dc {
  position: relative; display: flex; align-items: center; justify-content: center; aspect-ratio: 1; min-height: 40px; border-radius: 12px;
  font-size: 0.98rem; font-weight: 600; font-variant-numeric: tabular-nums; color: #F2F5FC; cursor: pointer;
  background: rgba(77,124,255,0.08); border: 1px solid rgba(143,176,255,0.22); transition: border-color 160ms, background-color 160ms;
}
.bk-dc:hover:not(:disabled) { border-color: rgba(143,176,255,0.6); }
.bk-dc:disabled { cursor: default; background: none; border-color: transparent; color: rgba(234,240,255,0.3); font-weight: 500; }
.bk-dc[aria-pressed="true"] { background: #4D7CFF; border-color: #4D7CFF; color: #FFFFFF; }
.bk-dot { position: absolute; bottom: 6px; left: 50%; width: 4px; height: 4px; margin-left: -2px; border-radius: 999px; background: #8FB0FF; }
.bk-dc[aria-pressed="true"] .bk-dot { background: #FFFFFF; }
.bk-slots-h { margin: 0 0 10px; font-size: 0.95rem; font-weight: 600; color: #DCE6FF; }
.bk-times { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
.bk-time {
  min-height: 48px; border-radius: 12px; cursor: pointer; font-size: 1rem; font-weight: 500; font-variant-numeric: tabular-nums; color: #F2F5FC;
  background: transparent; border: 1px solid rgba(255,255,255,0.14); transition: border-color 160ms, background-color 160ms;
}
.bk-time:hover { border-color: rgba(143,176,255,0.6); }
.bk-time[aria-pressed="true"] { background: #4D7CFF; border-color: #4D7CFF; color: #FFFFFF; }
.bk-tz { margin: 12px 0 0; }

/* questions */
.bk-chosen { display: inline-flex; flex-wrap: wrap; align-items: center; gap: 6px; margin: 12px 0 0; padding: 8px 12px; border-radius: 10px; background: rgba(77,124,255,0.12); color: #DCE6FF; font-size: 0.95rem; font-weight: 500; font-variant-numeric: tabular-nums; }
.bk-q { border: 0; margin: 24px 0 0; padding: 20px 0 0; min-width: 0; border-top: 1px solid rgba(255,255,255,0.08); }
.bk-ql { padding: 0; font-size: 1.0625rem; font-weight: 600; color: #F2F5FC; }
.bk-ql span { margin-right: 8px; font-size: 0.8125rem; color: #8FB0FF; font-variant-numeric: tabular-nums; }
.bk-row2 { display: grid; gap: 12px; margin-top: 14px; }
.bk-field { min-width: 0; }
.bk-label { display: block; margin-bottom: 6px; font-size: 0.875rem; font-weight: 500; color: rgba(234,240,255,0.8); }
.bk-input {
  width: 100%; min-height: 50px; padding: 12px 14px; border-radius: 12px; font-size: 1rem; color: #F2F5FC; font-family: inherit;
  background: #13203F; border: 1px solid rgba(255,255,255,0.14); outline: none; transition: border-color 160ms, box-shadow 160ms;
}
.bk-text { margin-top: 12px; min-height: 76px; resize: vertical; line-height: 1.5; }
.bk-input::placeholder { color: rgba(234,240,255,0.45); }
.bk-input:focus { border-color: #4D7CFF; box-shadow: 0 0 0 3px rgba(77,124,255,0.25); }
.bk-input[aria-invalid="true"] { border-color: #F59E9E; }
.bk-err { margin: 6px 0 0; font-size: 0.875rem; color: #F8B4B4; }
.bk-err-box { margin: 16px 0 0; padding: 10px 12px; border-radius: 12px; background: rgba(248,113,113,0.08); border: 1px solid rgba(248,113,113,0.3); }
.bk-consent { position: relative; display: flex; gap: 12px; align-items: flex-start; min-height: 44px; margin-top: 12px; padding: 8px 0; cursor: pointer; font-size: 0.9375rem; line-height: 1.5; color: rgba(234,240,255,0.84); }
.bk-consent input { position: absolute; opacity: 0; width: 24px; height: 24px; margin: 0; top: 8px; left: 0; }
.bk-box { flex: none; display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; margin-top: 1px; border-radius: 7px; border: 1px solid rgba(255,255,255,0.3); background: #13203F; color: #FFFFFF; }
.bk-consent input:checked + .bk-box { background: #4D7CFF; border-color: #4D7CFF; }
.bk-consent input:focus-visible + .bk-box { outline: 2px solid #8FB0FF; outline-offset: 2px; }
.bk-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.bk-chip {
  display: inline-flex; align-items: center; gap: 6px; min-height: 44px; padding: 8px 14px; border-radius: 999px; cursor: pointer;
  font-size: 0.9375rem; font-weight: 500; color: #F2F5FC; text-align: left; line-height: 1.3;
  background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.16); transition: border-color 160ms, background-color 160ms;
}
.bk-chip:hover { border-color: rgba(143,176,255,0.6); }
.bk-chip[aria-pressed="true"] { border-color: #4D7CFF; background: rgba(77,124,255,0.18); }
.bk-primary { width: 100%; min-height: 54px; justify-content: center; margin-top: 24px; font-size: 1.02rem; gap: 8px; }
.bk-primary:disabled { opacity: 0.45; cursor: not-allowed; }
.bk-after { margin: 12px 0 0; text-align: center; }
.bk-after a, .bk-links a { color: #8FB0FF; text-decoration: underline; text-underline-offset: 3px; }
.bk-ghost {
  display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%; min-height: 52px; margin-top: 12px;
  border-radius: 999px; border: 1px solid rgba(255,255,255,0.16); color: #F2F5FC; font-size: 0.98rem; font-weight: 500; text-decoration: none;
  transition: border-color 160ms, background-color 160ms;
}
.bk-ghost:hover { border-color: rgba(143,176,255,0.5); background: rgba(77,124,255,0.06); }
.bk-skip { display: flex; align-items: center; justify-content: center; width: 100%; min-height: 48px; margin-top: 6px; background: none; border: 0; color: rgba(234,240,255,0.75); font-size: 0.95rem; cursor: pointer; text-decoration: underline; text-underline-offset: 4px; }
.bk-links { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 16px; margin-top: 20px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.08); }
.bk-links a { display: inline-flex; align-items: center; min-height: 44px; font-size: 0.95rem; }
.bk-loading { display: grid; gap: 10px; margin-top: 20px; }
.bk-skel { display: block; height: 52px; border-radius: 12px; background: linear-gradient(90deg, rgba(255,255,255,0.03), rgba(255,255,255,0.07), rgba(255,255,255,0.03)); background-size: 200% 100%; animation: bk-shim 1.4s linear infinite; }
.bk-skel-cal { height: 240px; }
@keyframes bk-shim { to { background-position: -200% 0; } }

/* done and prepare */
.bk-done-icon { display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; margin-bottom: 16px; border-radius: 999px; background: rgba(77,124,255,0.16); border: 1px solid #4D7CFF; color: #8FB0FF; }
.bk-when { margin: 10px 0 0; font-size: 1.125rem; font-weight: 600; color: #DCE6FF; font-variant-numeric: tabular-nums; }
.bk-prep { margin-top: 28px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); }
.bk-pq { border: 0; margin: 20px 0 0; padding: 0; min-width: 0; }
.bk-pl { padding: 0; font-size: 1rem; font-weight: 600; color: #F2F5FC; }
.bk-pq .bk-chips { margin-top: 10px; }
.bk-next { list-style: none; margin: 20px 0 8px; padding: 0; border-top: 1px solid rgba(255,255,255,0.08); }
.bk-next li { display: grid; grid-template-columns: 36px 1fr; gap: 8px; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 0.98rem; line-height: 1.5; color: rgba(234,240,255,0.86); overflow-wrap: anywhere; }
.bk-next li span { font-size: 0.8125rem; font-weight: 600; color: #8FB0FF; font-variant-numeric: tabular-nums; padding-top: 2px; }
.bk-card :focus-visible { outline: 2px solid #8FB0FF; outline-offset: 2px; }
.bk-card .bk-h:focus-visible { outline: none; }
@container (min-width: 520px) {
  .bk-top { padding: 24px 32px 0; }
  .bk-body { padding: 24px 32px 32px; }
  .bk-h { font-size: 1.75rem; }
  .bk-row2 { grid-template-columns: 1fr 1fr; }
  .bk-times { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
@container (min-width: 760px) {
  .bk-cal-wrap { grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); gap: 28px; align-items: start; }
  .bk-times { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
@media (prefers-reduced-motion: reduce) {
  .bk-body, .bk-skel { animation: none; }
  .bk-bar > span, .bk-chip, .bk-dc, .bk-time, .bk-input, .bk-ghost { transition: none; }
}
`;
