import styles from "./chips.module.css";

export type ChipRole = "dept" | "review" | "operator" | "attn" | "done";

/** Pill status chip. Colour comes from the role token, never from the label. */
export function StatusChip({ role, children, className }: { role: ChipRole; children: React.ReactNode; className?: string }) {
  return (
    <span className={`${styles.chip} ${className ?? ""}`} data-role={role}>
      {children}
    </span>
  );
}

/**
 * The chip a card wears, crossfading from the previous role (160ms) when the
 * card has just moved lanes. Without `from` it renders a plain chip.
 */
export function ChipSwap({ role, label, from, fromLabel }: { role: ChipRole; label: string; from?: ChipRole; fromLabel?: string }) {
  if (!from) return <StatusChip role={role}>{label}</StatusChip>;
  return (
    <span className={styles.stack}>
      <StatusChip role={role} className={styles.fadeIn}>
        {label}
      </StatusChip>
      <span aria-hidden className={styles.fadeOut}>
        <StatusChip role={from}>{fromLabel}</StatusChip>
      </span>
    </span>
  );
}
