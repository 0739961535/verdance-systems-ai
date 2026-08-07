"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { SITE } from "@/data/site";

/**
 * BookingCard - native booking for the AI Systems Audit. Fetches real
 * availability from the CRM calendar through our own API routes and books
 * directly, so the page keeps its own design instead of an embedded
 * third-party iframe. Falls back to the hosted calendar link if the API
 * is unavailable.
 */

type Day = { date: string; slots: string[] };
type Step = "loading" | "pick" | "details" | "booking" | "done" | "fallback";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function dayLabel(date: string): { weekday: string; day: string; month: string } {
  const d = new Date(`${date}T12:00:00Z`);
  return { weekday: WEEKDAYS[d.getUTCDay()], day: String(d.getUTCDate()), month: MONTHS[d.getUTCMonth()] };
}

const inputCls =
  "w-full rounded-lg px-3.5 py-3 text-[0.95rem] text-[color:var(--color-ink)] placeholder:text-[color:var(--color-ink-muted)] outline-none focus-visible:outline-2 focus-visible:outline-[color:var(--color-accent)]";
const inputStyle = { background: "var(--bg-4)", border: "1px solid var(--hairline-2)" } as const;

export function BookingCard() {
  const [step, setStep] = useState<Step>("loading");
  const [days, setDays] = useState<Day[]>([]);
  const [dayIdx, setDayIdx] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/booking/slots")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { days: Day[] }) => {
        if (d.days?.length) {
          setDays(d.days);
          setStep("pick");
        } else {
          setStep("fallback");
        }
      })
      .catch(() => setStep("fallback"));
  }, []);

  const selectedDay = days[dayIdx];
  const times = useMemo(() => selectedDay?.slots ?? [], [selectedDay]);

  async function book() {
    if (!slot) return;
    setStep("booking");
    setError(null);
    const res = await fetch("/api/booking/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, slot }),
    }).catch(() => null);

    if (res?.ok) {
      setStep("done");
      return;
    }
    if (res?.status === 409) {
      setError("That time was just taken. Please choose another slot.");
      setSlot(null);
      setStep("pick");
      // refresh availability
      fetch("/api/booking/slots")
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => d?.days?.length && setDays(d.days));
      return;
    }
    setError("Something went wrong on our side. Please try again, or use the calendar link below.");
    setStep("details");
  }

  return (
    <div
      className="surface relative overflow-hidden"
      style={{ borderRadius: 20, border: "1px solid var(--hairline-2)", background: "var(--bg-3)" }}
    >
      {/* header */}
      <div className="flex items-center justify-between px-5 py-4 md:px-7" style={{ borderBottom: "1px solid var(--hairline)" }}>
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
          {step === "done" ? "Confirmed" : "Book your audit"}
        </span>
        <span className="font-mono text-[0.66rem] tracking-[0.08em] text-[color:var(--color-ink-faint)]">
          30 min · video call
        </span>
      </div>

      <div className="px-5 py-6 md:px-7">
        {step === "loading" && (
          <div className="py-16 text-center font-mono text-[0.8rem] text-[color:var(--color-ink-muted)]">
            Checking availability…
          </div>
        )}

        {step === "fallback" && (
          <div className="py-12 text-center">
            <p className="text-[0.95rem] text-[color:var(--color-ink-soft)]">
              Live availability is loading slowly. Book directly on our calendar instead:
            </p>
            <a
              href={SITE.ghlBooking}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent mt-6 min-h-12"
            >
              Open the booking calendar
              <ArrowUpRight size={15} aria-hidden />
            </a>
          </div>
        )}

        {step === "pick" && selectedDay && (
          <>
            {/* day selector */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
              {days.map((d, i) => {
                const l = dayLabel(d.date);
                const active = i === dayIdx;
                return (
                  <button
                    key={d.date}
                    type="button"
                    onClick={() => { setDayIdx(i); setSlot(null); }}
                    aria-pressed={active}
                    className="shrink-0 rounded-lg px-3.5 py-2.5 text-center cursor-pointer"
                    style={{
                      border: `1px solid ${active ? "var(--accent)" : "var(--hairline-2)"}`,
                      background: active ? "rgba(var(--accent-rgb), 0.10)" : "transparent",
                      transition: "border-color 0.15s var(--ease-luxury), background-color 0.15s var(--ease-luxury)",
                    }}
                  >
                    <div className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[color:var(--color-ink-muted)]">
                      {l.weekday}
                    </div>
                    <div className="mt-0.5 font-display font-medium text-[color:var(--color-ink)]" style={{ fontVariantNumeric: "tabular-nums" }}>
                      {l.day} {l.month}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* time grid */}
            <div className="mt-5 grid grid-cols-3 sm:grid-cols-4 gap-2">
              {times.map((t) => {
                const active = slot === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSlot(t)}
                    aria-pressed={active}
                    className="rounded-lg py-2.5 font-mono text-[0.85rem] cursor-pointer"
                    style={{
                      fontVariantNumeric: "tabular-nums",
                      color: active ? "var(--on-accent)" : "var(--ink)",
                      background: active ? "var(--accent)" : "transparent",
                      border: `1px solid ${active ? "var(--accent)" : "var(--hairline-2)"}`,
                      transition: "all 0.15s var(--ease-luxury)",
                    }}
                  >
                    {t.slice(11, 16)}
                  </button>
                );
              })}
            </div>

            <p className="mt-3 font-mono text-[0.62rem] tracking-[0.08em] text-[color:var(--color-ink-faint)]">
              Times shown in South Africa Standard Time (GMT+2).
            </p>

            <button
              type="button"
              disabled={!slot}
              onClick={() => setStep("details")}
              className="btn btn-accent mt-5 w-full min-h-12 justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </>
        )}

        {(step === "details" || step === "booking") && slot && selectedDay && (
          <>
            <button
              type="button"
              onClick={() => setStep("pick")}
              className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-[color:var(--color-ink-muted)] cursor-pointer"
            >
              <ArrowLeft size={13} aria-hidden /> Change time
            </button>

            <div
              className="mt-4 rounded-lg px-4 py-3 font-mono text-[0.85rem] text-[color:var(--color-ink)]"
              style={{ background: "rgba(var(--accent-rgb), 0.08)", border: "1px solid rgba(var(--accent-rgb), 0.35)", fontVariantNumeric: "tabular-nums" }}
            >
              {dayLabel(selectedDay.date).weekday} {dayLabel(selectedDay.date).day} {dayLabel(selectedDay.date).month} · {slot.slice(11, 16)} SAST
            </div>

            <form
              className="mt-5 flex flex-col gap-3"
              onSubmit={(e) => { e.preventDefault(); void book(); }}
            >
              <input className={inputCls} style={inputStyle} placeholder="Full name" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} />
              <input className={inputCls} style={inputStyle} placeholder="Work email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <input className={inputCls} style={inputStyle} placeholder="Phone (optional)" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
              {error && <p className="text-[0.85rem]" style={{ color: "#F87171" }}>{error}</p>}
              <button type="submit" disabled={step === "booking"} className="btn btn-accent w-full min-h-12 justify-center disabled:opacity-60">
                {step === "booking" ? "Booking…" : "Confirm booking"}
              </button>
            </form>
          </>
        )}

        {step === "done" && (
          <div className="py-10 text-center">
            <span
              className="inline-flex items-center justify-center w-12 h-12 rounded-full"
              style={{ background: "var(--signal-dim)", border: "1px solid var(--signal)" }}
            >
              <Check size={22} aria-hidden style={{ color: "var(--signal)" }} />
            </span>
            <h3 className="mt-4 font-display text-xl font-medium text-[color:var(--color-ink)]">
              Your audit is booked.
            </h3>
            <p className="mt-2 text-[0.95rem] text-[color:var(--color-ink-soft)]">
              The calendar invitation is on its way to {email}. We&apos;ll see you there.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
