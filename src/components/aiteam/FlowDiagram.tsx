/**
 * Department -> Reviewer -> Operator -> You. A pulse travels along the line
 * (CSS only; static under reduced motion). Vertical on phones.
 */
const STAGES = [
  { k: "Department", v: "A head and its workers do the work" },
  { k: "Reviewer", v: "Checks every piece before it moves on" },
  { k: "Operator", v: "Turns it into a short plan for you" },
  { k: "You", v: "Approve, change or say no" },
];

export function FlowDiagram() {
  return (
    <div className="flow-wrap">
      <span aria-hidden className="flow-track" />
      <span aria-hidden className="flow-pulse">
        <i />
      </span>
    <ol className="flow-line" aria-label="How work moves: department, reviewer, operator, you">
      {STAGES.map((s, i) => (
        <li key={s.k} className={`flow-stage ${i === STAGES.length - 1 ? "is-you" : ""}`}>
          <span className="font-mono text-[0.7rem] text-[color:var(--color-accent)] tabular">{String(i + 1).padStart(2, "0")}</span>
          <span className="mt-2 block font-display text-[1.3rem] text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.02em" }}>{s.k}</span>
          <span className="mt-1 block text-[0.88rem] leading-snug text-[color:var(--color-ink-muted)]">{s.v}</span>
        </li>
      ))}
    </ol>
    </div>
  );
}
