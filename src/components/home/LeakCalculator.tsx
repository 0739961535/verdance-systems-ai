"use client";

import { useId, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { CurrencySwitch } from "@/components/primitives/CurrencySwitch";
import { formatMoney, CURRENCY, localAmount, useCurrency } from "@/lib/currency";

/**
 * LeakCalculator - two of the visitor's own numbers, one money figure in
 * their currency (rand, pounds or dollars).
 * The only assumption is conservative and stated in the sentence itself
 * (one enquiry in twenty slips away), so the visitor can check it in their
 * head. Nothing is sent.
 */

const SHARE = 0.05; // "one in twenty"
const WEEKS_PER_MONTH = 52 / 12;


function NumberField({
  label,
  prefix,
  value,
  onChange,
  max,
}: {
  label: string;
  prefix?: string;
  value: string;
  onChange: (v: string) => void;
  max: number;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-[0.95rem] font-medium text-[color:var(--color-ink)]">
        {label}
      </label>
      <div
        className="mt-2 flex min-h-14 items-center rounded-2xl px-4 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[color:var(--color-accent)]"
        style={{ background: "var(--bg-3)", border: "1px solid var(--hairline-2)" }}
      >
        {prefix && <span className="mr-1.5 font-mono text-lg text-[color:var(--color-ink-muted)]">{prefix}</span>}
        <input
          id={id}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="off"
          value={value}
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, "").slice(0, 7);
            const n = Math.min(Number(digits || 0), max);
            onChange(digits === "" ? "" : String(n));
          }}
          className="h-14 w-full bg-transparent font-mono text-xl text-[color:var(--color-ink)] tabular outline-none"
        />
      </div>
    </div>
  );
}

export function LeakCalculator() {
  const [perWeek, setPerWeek] = useState("20");
  const cur = useCurrency();
  // The sale value belongs to the currency it was typed in.
  const [entered, setEntered] = useState<{ cur: string; v: string } | null>(null);
  const sale = entered?.cur === cur ? entered.v : String(localAmount(2500, cur));
  const setSale = (v: string) => setEntered({ cur, v });
  const rand = (n: number) => formatMoney(n, cur);

  const w = Number(perWeek || 0);
  const v = Number(sale || 0);
  const month = w * WEEKS_PER_MONTH * SHARE * v;
  const year = month * 12;

  return (
    <div
      className="grid gap-8 rounded-[28px] p-6 sm:p-8 md:grid-cols-[1fr_1.1fr] md:gap-12 md:p-10"
      style={{ background: "var(--bg-2)", border: "1px solid var(--hairline-2)" }}
    >
      <div className="grid content-start gap-5">
        <NumberField label="Enquiries you get a week" value={perWeek} onChange={setPerWeek} max={2000} />
        <NumberField label="What an average sale is worth" prefix={CURRENCY[cur].symbol} value={sale} onChange={setSale} max={1000000} />
        <CurrencySwitch className="self-start" />
        <p className="text-[0.85rem] leading-relaxed text-[color:var(--color-ink-muted)]">
          Calls, WhatsApps, website forms and DMs. Change the numbers to your own. They stay in your browser.
        </p>
      </div>

      <div className="flex flex-col justify-between gap-6 md:border-l md:pl-12" style={{ borderColor: "var(--hairline)" }}>
        <div aria-live="polite">
          <p className="text-[0.98rem] leading-relaxed text-[color:var(--color-ink-soft)]">
            If just one enquiry in twenty goes to someone else because nobody answered in time, that is
          </p>
          <p
            className="mt-3 font-display text-[color:var(--color-ink)] tabular"
            style={{ fontSize: "clamp(2.4rem, 4vw + 1rem, 4rem)", lineHeight: 1, letterSpacing: "-0.04em" }}
          >
            {rand(month)}
            <span className="ml-2 text-[0.4em] font-normal tracking-normal text-[color:var(--color-ink-muted)]">a month</span>
          </p>
          <p className="mt-3 font-mono text-[0.8rem] tracking-[0.06em] text-[color:var(--color-ink-muted)]">
            {rand(year)} a year · your numbers, not ours
          </p>
        </div>
        <a href={GENERIC_BOOK_URL} className="btn btn-accent min-h-12 justify-center self-start">
          Get your free Operations Map
          <ArrowUpRight size={16} aria-hidden />
        </a>
      </div>
    </div>
  );
}
