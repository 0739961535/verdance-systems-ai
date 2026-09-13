"use client";

import { useState, useMemo, useId } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * What missed calls cost.
 *
 * The arithmetic that actually sells this market: missed contacts, times what
 * a customer is worth, times how many you would have won. A business owner
 * can check it in their head, which is the whole point.
 *
 * Deliberately shows the loss and never our price. Pricing is quoted per
 * project after the audit call, and a number on a public page would anchor
 * against that.
 *
 * The three outputs map onto the `roi` block of a blueprint brief in Verdance
 * OS (current_cost, payback, annual), so a figure the prospect entered
 * themselves can carry straight into their proposal. That matters because ROI
 * is the block most likely to get invented, and a number they typed is a
 * number they cannot argue with later.
 */

type Currency = "ZAR" | "GBP";

const CURRENCIES: Record<Currency, { symbol: string; locale: string; label: string; defaultValue: number }> = {
  ZAR: { symbol: "R", locale: "en-ZA", label: "Rand", defaultValue: 4000 },
  GBP: { symbol: "£", locale: "en-GB", label: "Pounds", defaultValue: 250 },
};

function money(amount: number, currency: Currency) {
  const { symbol, locale } = CURRENCIES[currency];
  return `${symbol}${Math.round(amount).toLocaleString(locale).replace(/,/g, " ")}`;
}

interface FieldProps {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  format: (n: number) => string;
}

function Field({ label, hint, value, min, max, step, onChange, format }: FieldProps) {
  const id = useId();
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-medium text-[color:var(--color-ink)] mb-1"
      >
        {label}
      </label>
      <p className="text-sm text-[color:var(--color-ink-muted)] mb-3">{hint}</p>
      <div className="flex items-center gap-4">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 accent-[color:var(--color-accent)] min-h-6"
        />
        <output
          htmlFor={id}
          className="font-mono text-lg font-bold text-[color:var(--color-ink)] tabular-nums min-w-24 text-right"
        >
          {format(value)}
        </output>
      </div>
    </div>
  );
}

export function MissedCallCalculator() {
  const [currency, setCurrency] = useState<Currency>("ZAR");
  const [missedPerWeek, setMissedPerWeek] = useState(15);
  const [customerValue, setCustomerValue] = useState(CURRENCIES.ZAR.defaultValue);
  const [closeRate, setCloseRate] = useState(30);

  const result = useMemo(() => {
    const weekly = missedPerWeek * customerValue * (closeRate / 100);
    return { weekly, monthly: (weekly * 52) / 12, annual: weekly * 52 };
  }, [missedPerWeek, customerValue, closeRate]);

  function switchCurrency(next: Currency) {
    setCurrency(next);
    setCustomerValue(CURRENCIES[next].defaultValue);
  }

  const valueMax = currency === "ZAR" ? 100000 : 5000;
  const valueStep = currency === "ZAR" ? 500 : 25;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 items-start">
      {/* inputs */}
      <div className="flex flex-col gap-7">
        <div>
          <span className="block font-medium text-[color:var(--color-ink)] mb-3">
            Currency
          </span>
          <div className="inline-flex rounded-full border p-1" style={{ borderColor: "var(--hairline)" }}>
            {(Object.keys(CURRENCIES) as Currency[]).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => switchCurrency(code)}
                aria-pressed={currency === code}
                className="px-4 py-1.5 rounded-full text-sm font-semibold transition-colors min-h-9"
                style={
                  currency === code
                    ? { background: "var(--color-accent)", color: "#fff" }
                    : { color: "var(--color-ink-muted)" }
                }
              >
                {CURRENCIES[code].symbol} {CURRENCIES[code].label}
              </button>
            ))}
          </div>
        </div>

        <Field
          label="Calls and messages you miss in a week"
          hint="Rung out, went to voicemail, or sat unanswered until the next day. Most owners guess low here."
          value={missedPerWeek}
          min={1}
          max={100}
          step={1}
          onChange={setMissedPerWeek}
          format={(n) => String(n)}
        />

        <Field
          label="What one customer is worth to you"
          hint="The average job, not the biggest one. Use lifetime value if they come back."
          value={customerValue}
          min={0}
          max={valueMax}
          step={valueStep}
          onChange={setCustomerValue}
          format={(n) => money(n, currency)}
        />

        <Field
          label="How many of those you would normally win"
          hint="Out of the people who actually reach you, the share that becomes a customer."
          value={closeRate}
          min={1}
          max={100}
          step={1}
          onChange={setCloseRate}
          format={(n) => `${n}%`}
        />
      </div>

      {/* result */}
      <div
        className="rounded-2xl border p-7 lg:sticky lg:top-28"
        style={{ borderColor: "var(--hairline)", background: "rgba(var(--accent-rgb),0.04)" }}
      >
        <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]">
          What that is costing you
        </span>

        <div className="mt-5">
          <span className="block text-sm text-[color:var(--color-ink-muted)] mb-1">A year</span>
          <div
            className="font-display font-bold tabular-nums leading-none text-[color:var(--color-accent)]"
            style={{ fontSize: "clamp(2.1rem, 5vw, 3.1rem)", letterSpacing: "-0.03em" }}
          >
            {money(result.annual, currency)}
          </div>
        </div>

        <dl className="mt-6 pt-5 grid grid-cols-2 gap-4 border-t" style={{ borderColor: "var(--hairline)" }}>
          <div>
            <dt className="text-sm text-[color:var(--color-ink-muted)]">A month</dt>
            <dd className="font-mono font-bold text-lg text-[color:var(--color-ink)] tabular-nums mt-0.5">
              {money(result.monthly, currency)}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-[color:var(--color-ink-muted)]">A week</dt>
            <dd className="font-mono font-bold text-lg text-[color:var(--color-ink)] tabular-nums mt-0.5">
              {money(result.weekly, currency)}
            </dd>
          </div>
        </dl>

        <p className="mt-6 text-sm text-[color:var(--color-ink-soft)] leading-relaxed">
          That is {missedPerWeek} people a week who tried to give you money and did not
          reach anyone. They did not leave a message. They called the next name on the
          list.
        </p>

        <Link
          href="/contact"
          className="btn btn-accent justify-center min-h-12 w-full mt-6 inline-flex"
        >
          Book a free audit call
          <ArrowUpRight size={15} aria-hidden />
        </Link>

        <p className="mt-4 text-xs text-[color:var(--color-ink-muted)] leading-relaxed">
          Thirty minutes. We go through where the enquiries are actually going and what
          to fix first. Free, and the plan is yours whether or not you work with us.
        </p>
      </div>
    </div>
  );
}
