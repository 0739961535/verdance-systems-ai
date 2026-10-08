/**
 * Rand for display. Under a million: "R12 600". From a million: "R1.2 million",
 * so a big input never turns into a wall of digits.
 */
export function formatRand(n: number): string {
  const v = Math.max(0, n);
  if (v >= 1_000_000) {
    const m = v / 1_000_000;
    return `R${(m >= 10 ? Math.round(m).toString() : m.toFixed(1).replace(/\.0$/, ""))} million`;
  }
  return `R${Math.round(v).toLocaleString("en-ZA").replace(/[,  ]/g, " ")}`;
}
