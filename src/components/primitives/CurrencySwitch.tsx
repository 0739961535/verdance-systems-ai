"use client";

import { CODES, CURRENCY, setCurrency, useCurrency } from "@/lib/currency";

/** R / £ / $ switch. Shared by every calculator on the page. */
export function CurrencySwitch({ className = "" }: { className?: string }) {
  const current = useCurrency();
  return (
    <div role="group" aria-label="Currency" className={`inline-flex rounded-full border p-1 ${className}`} style={{ borderColor: "var(--hairline)" }}>
      {CODES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setCurrency(code)}
          aria-pressed={current === code}
          aria-label={CURRENCY[code].label}
          className="min-h-9 min-w-10 rounded-full px-3 font-mono text-sm font-semibold transition-colors"
          style={current === code ? { background: "var(--color-accent)", color: "#fff" } : { color: "var(--color-ink-muted)" }}
        >
          {CURRENCY[code].symbol}
        </button>
      ))}
    </div>
  );
}
