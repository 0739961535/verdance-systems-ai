"use client";

import { useId, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { formatRand } from "@/lib/money";
import type { CalcField, NicheCalculator as Calc } from "@/data/niches";

/**
 * NicheCalculator - the missed-call calculator, adapted per niche.
 *
 * The result is the product of the visitor's own inputs (percentages as
 * fractions), shown as a chain so every step can be checked in your head.
 * No number on this card comes from us. Nothing is sent anywhere.
 */

const rand = formatRand;

function count(n: number) {
  return n >= 10 ? String(Math.round(n)) : n.toFixed(1).replace(/\.0$/, "");
}

function Field({ field, value, onChange }: { field: CalcField; value: number; onChange: (n: number) => void }) {
  const id = useId();
  const clamp = (n: number) => Math.min(field.max, Math.max(field.min, n));
  return (
    <div>
      <label htmlFor={id} className="block font-medium text-[color:var(--color-ink)] mb-1">
        {field.label}
      </label>
      <p className="text-sm text-[color:var(--color-ink-muted)] mb-3">{field.hint}</p>
      <div className="flex items-center gap-4">
        <input
          type="range"
          aria-label={`${field.label} slider`}
          min={field.min}
          max={field.max}
          step={field.step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 accent-[color:var(--color-accent)] min-h-11"
        />
        <div
          className="flex min-h-11 w-32 shrink-0 items-center rounded-xl px-3 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[color:var(--color-accent)]"
          style={{ background: "var(--bg-3)", border: "1px solid var(--hairline-2)" }}
        >
          {field.format === "rand" && <span className="mr-1 font-mono text-[color:var(--color-ink-muted)]">R</span>}
          <input
            id={id}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="off"
            value={String(value)}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "").slice(0, 7);
              onChange(digits === "" ? field.min : Math.min(field.max, Number(digits)));
            }}
            onBlur={() => onChange(clamp(value))}
            className="w-full min-w-0 bg-transparent text-right font-mono text-base text-[color:var(--color-ink)] tabular-nums outline-none"
          />
          {field.format === "pct" && <span className="ml-1 font-mono text-[color:var(--color-ink-muted)]">%</span>}
        </div>
      </div>
    </div>
  );
}

export function NicheCalculator({ calc, bookHref }: { calc: Calc; bookHref: string }) {
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(calc.fields.map((f) => [f.key, f.initial]))
  );

  const { chain, monthly } = useMemo(() => {
    let running = 0;
    const chain: number[] = [];
    calc.fields.forEach((f, i) => {
      const v = f.format === "pct" ? values[f.key] / 100 : values[f.key];
      running = i === 0 ? v : running * v;
      chain.push(running);
    });
    return { chain, monthly: running };
  }, [calc.fields, values]);

  // Intermediate lines: after field 2 up to the field before the value.
  const steps = calc.steps.map((label, i) => ({ label, n: chain[i + 1] }));

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 items-start">
      <div className="flex flex-col gap-7">
        {calc.fields.map((f) => (
          <Field key={f.key} field={f} value={values[f.key]} onChange={(n) => setValues((v) => ({ ...v, [f.key]: n }))} />
        ))}
      </div>

      <div
        className="rounded-[20px] border p-7 lg:sticky lg:top-28"
        style={{ borderColor: "var(--hairline-2)", background: "rgba(var(--accent-rgb),0.05)" }}
        aria-live="polite"
      >
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]">
          {calc.resultLabel}
        </span>

        <div className="mt-5">
          <span className="block text-sm text-[color:var(--color-ink-muted)] mb-1">A year</span>
          <div
            className="font-display font-medium tabular-nums leading-none text-[color:var(--color-ink)]"
            style={{ fontSize: "clamp(2.1rem, 5vw, 3.1rem)", letterSpacing: "-0.03em" }}
          >
            {rand(monthly * 12)}
          </div>
          <span className="mt-2 block font-mono text-[0.95rem] text-[color:var(--color-ink)] tabular-nums">
            {rand(monthly)} a month
          </span>
        </div>

        <dl className="mt-6 pt-5 border-t space-y-2" style={{ borderColor: "var(--hairline)" }}>
          {steps.map((s) => (
            <div key={s.label} className="flex items-baseline justify-between gap-4 text-sm">
              <dt className="text-[color:var(--color-ink-soft)] first-letter:uppercase">{s.label}</dt>
              <dd className="font-mono text-[color:var(--color-ink)] tabular-nums">{count(s.n)}</dd>
            </div>
          ))}
        </dl>

        <a href={bookHref} className="btn btn-accent justify-center min-h-12 w-full mt-6 inline-flex">
          Check this on a pre-audit
          <ArrowUpRight size={15} aria-hidden />
        </a>

        <ul className="mt-5 space-y-1.5">
          {calc.assumptions.map((a) => (
            <li key={a} className="text-xs leading-relaxed text-[color:var(--color-ink-muted)]">
              {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
