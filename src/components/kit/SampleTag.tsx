import type { CSSProperties, ReactNode } from "react";

/**
 * The one way the site marks something as a sample: a quiet pill set into the
 * corner of the frame it describes (never a grey line floating under an
 * image). Only where a viewer could take a screen for real client results.
 * Styles are inline so the tag looks the same wherever it is used.
 *
 * place: a corner of the nearest positioned parent, or "inline" to sit in
 * the flow (for frames with their own footer row).
 */
type Place = "tl" | "tr" | "bl" | "br" | "inline";

const BASE: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "4px 10px",
  borderRadius: 999,
  fontFamily: "var(--font-mono), ui-monospace, monospace",
  fontSize: 10.5,
  lineHeight: 1.3,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
  pointerEvents: "none",
  zIndex: 3,
};

const TONES: Record<"dark" | "light", CSSProperties> = {
  dark: { color: "#DCE3F2", background: "rgba(6, 11, 26, 0.72)", border: "1px solid rgba(191, 210, 255, 0.22)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" },
  light: { color: "#3F3D38", background: "rgba(251, 250, 247, 0.86)", border: "1px solid rgba(14, 14, 16, 0.14)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" },
};

const PLACES: Record<Place, CSSProperties> = {
  tl: { position: "absolute", top: 12, left: 12 },
  tr: { position: "absolute", top: 12, right: 12 },
  bl: { position: "absolute", bottom: 12, left: 12 },
  br: { position: "absolute", bottom: 12, right: 12 },
  inline: { position: "relative" },
};

export function SampleTag({ children = "Sample data", place = "tr", tone = "dark", style }: { children?: ReactNode; place?: Place; tone?: "dark" | "light"; style?: CSSProperties }) {
  return <span style={{ ...BASE, ...TONES[tone], ...PLACES[place], ...style }}>{children}</span>;
}
