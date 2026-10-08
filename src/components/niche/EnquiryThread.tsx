import type { Niche } from "@/data/niches";

/**
 * EnquiryThread - the niche hero's proof panel. One enquiry, one reply, one
 * booking, with the clock visible on each. Server-rendered and sized by its
 * content, so it is in the first paint and cannot shift layout. Entrances are
 * the shared CSS .enter-* classes, which the global reduced-motion rule stops.
 */
export function EnquiryThread({ thread }: { thread: Niche["thread"] }) {
  return (
    <div
      className="surface relative overflow-hidden"
      style={{ borderRadius: 20, background: "var(--bg-3)", border: "1px solid var(--hairline-2)" }}
    >
      {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos) => (
        <span key={pos} aria-hidden className={`pointer-events-none absolute ${pos} font-mono text-[10px] text-[color:var(--color-ink-faint)]`}>+</span>
      ))}

      {/* header */}
      <div className="flex items-center justify-between gap-3 px-5 pt-4 pb-3" style={{ borderBottom: "1px solid var(--hairline)" }}>
        <span className="font-mono text-[0.78rem] tracking-[0.12em] text-[color:var(--color-ink-muted)] truncate">
          {thread.channel}
        </span>
        <span className="flex shrink-0 items-center gap-2 font-mono text-[0.72rem] tracking-[0.22em] text-[color:var(--color-ink-soft)]">
          <span className="relative inline-flex w-2 h-2 rounded-full" style={{ background: "var(--signal)" }} />
          5-MIN STANDARD
        </span>
      </div>

      {/* timing strip */}
      <dl className="grid grid-cols-3" style={{ borderBottom: "1px solid var(--hairline)" }}>
        {[
          { k: "Enquiry", v: thread.inbound.time },
          { k: "Reply", v: thread.reply.time },
          { k: "Booked", v: thread.outcome.time },
        ].map((s, i) => (
          <div key={s.k} className="px-4 py-3" style={{ borderLeft: i ? "1px solid var(--hairline)" : undefined }}>
            <dt className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[color:var(--color-ink-muted)]">{s.k}</dt>
            <dd className="mt-1 font-mono text-lg md:text-2xl text-[color:var(--color-ink)]" style={{ fontVariantNumeric: "tabular-nums" }}>
              {s.v}
            </dd>
          </div>
        ))}
      </dl>

      {/* conversation */}
      <ol className="flex flex-col gap-3 px-5 py-5" aria-label="Example conversation">
        <li className="enter-fade-up max-w-[85%]" style={{ animationDelay: "0.45s" }}>
          <div
            className="rounded-2xl rounded-tl-sm px-4 py-3 text-[0.92rem] leading-[1.5] text-[color:var(--color-ink)]"
            style={{ background: "var(--bg-4)", border: "1px solid var(--hairline)" }}
          >
            {thread.inbound.text}
          </div>
          <span className="mt-1 block font-mono text-[0.7rem] text-[color:var(--color-ink-faint)]" style={{ fontVariantNumeric: "tabular-nums" }}>
            {thread.inbound.time}
          </span>
        </li>
        <li className="enter-fade-up ml-auto max-w-[85%] text-right" style={{ animationDelay: "0.9s" }}>
          <div
            className="rounded-2xl rounded-tr-sm px-4 py-3 text-left text-[0.92rem] leading-[1.5] text-[color:var(--color-ink)]"
            style={{ background: "rgba(var(--accent-rgb),0.12)", border: "1px solid rgba(var(--accent-rgb),0.3)" }}
          >
            {thread.reply.text}
          </div>
          <span className="mt-1 block font-mono text-[0.7rem] text-[color:var(--color-ink-faint)]" style={{ fontVariantNumeric: "tabular-nums" }}>
            {thread.reply.time} · replied
          </span>
        </li>
        <li className="enter-fade-up" style={{ animationDelay: "1.35s" }}>
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-3 font-mono text-[0.85rem] text-[color:var(--color-ink)]"
            style={{ background: "var(--signal-dim)", borderLeft: "2px solid var(--signal)", fontVariantNumeric: "tabular-nums" }}
          >
            <span className="text-[color:var(--color-ink-muted)]">{thread.outcome.time}</span>
            <span className="truncate">{thread.outcome.text}</span>
          </div>
        </li>
      </ol>

      <div className="px-5 py-2.5" style={{ borderTop: "1px solid var(--hairline)" }}>
        <span className="font-mono text-[0.72rem] tracking-[0.08em] text-[color:var(--color-ink-faint)]">
          Example conversation. Simulated, not a real customer.
        </span>
      </div>
    </div>
  );
}
