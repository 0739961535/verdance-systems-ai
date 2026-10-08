/**
 * CalendarMock - a booking calendar picking a slot on its own: the day
 * lights, a time is chosen, a confirmation lands. CSS only (opacity and
 * transform on a loop), static under reduced motion. Sample, not live.
 */
// A month that starts on a Sunday, laid out Monday first, so the 12th is a Thursday.
const DAYS = Array.from({ length: 42 }, (_, i) => i - 5);
const weekday = (d: number) => (d + 5) % 7; // 0 = Monday
const OPEN = new Set(DAYS.filter((d) => d >= 1 && d <= 30 && weekday(d) < 5 && d % 3 !== 1));
const PICK = 12;

export function CalendarMock() {
  return (
    <div className="cal browser-frame g-border" aria-hidden>
      <div className="cal-head">
        <span className="font-display text-[1rem] text-[color:var(--color-ink)]">Free pre-audit</span>
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[color:var(--color-ink-muted)]">30 min · video</span>
      </div>
      <div className="cal-body">
        <div>
          <p className="cal-month">November</p>
          <div className="cal-grid">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <span key={`h${i}`} className="cal-dow">{d}</span>
            ))}
            {DAYS.map((d) => (
              <span key={d} className={`cal-day ${d < 1 || d > 30 ? "is-out" : ""} ${OPEN.has(d) || d === PICK ? "is-open" : ""} ${d === PICK ? "is-pick" : ""}`}>
                {d >= 1 && d <= 30 ? d : ""}
              </span>
            ))}
          </div>
        </div>
        <div className="cal-slots">
          <p className="cal-month">Thu 12</p>
          {["09:00", "10:30", "13:00", "15:30"].map((t, i) => (
            <span key={t} className={`cal-slot ${i === 1 ? "is-pick" : ""}`}>{t}</span>
          ))}
        </div>
      </div>
      <div className="cal-confirm">
        <span className="cal-check">✓</span>
        <span>
          <span className="block font-medium text-[color:var(--color-ink)]">Booked, Thu 12 at 10:30</span>
          <span className="block text-[0.8rem] text-[color:var(--color-ink-muted)]">Calendar invite sent</span>
        </span>
      </div>
    </div>
  );
}
