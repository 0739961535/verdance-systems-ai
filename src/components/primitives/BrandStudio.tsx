"use client";

/**
 * BrandStudio - live brand-colour sandbox for testing on the real site.
 *
 * The whole design system is driven by CSS custom properties (--accent and its
 * --accent-rgb / bright / glow / deep / on-accent variants, mapped to
 * --color-* via Tailwind @theme). This panel overrides those variables inline
 * on <html>, so picking a colour recolours every token-driven surface across
 * the site instantly - buttons, gradients, glows, borders, demos, chat.
 *
 * Dev/testing tool only: mounted behind NEXT_PUBLIC_BRAND_STUDIO=1, so it never
 * ships on a normal production build. Choice persists in localStorage; Reset
 * removes the overrides and restores the per-theme defaults from globals.css.
 */

import { useState, useEffect } from "react";
import { Palette, X, RotateCcw, Check, Copy } from "lucide-react";

const KEY = "vsai-brand-accent-v6";
const DEFAULT = "#4F8DFF";

// Curated accents. Azure first (the original brand); alternates to audition.
const PRESETS: { name: string; hex: string }[] = [
  { name: "Azure", hex: "#4F8DFF" },
  { name: "Royal", hex: "#2563EB" },
  { name: "Sky", hex: "#38BDF8" },
  { name: "Indigo", hex: "#6366F1" },
  { name: "Violet", hex: "#8B5CF6" },
  { name: "Cognac", hex: "#7E4E24" },
  { name: "Claret", hex: "#A11E44" },
  { name: "Rose", hex: "#C13A62" },
  { name: "Emerald", hex: "#10B981" },
  { name: "Amber", hex: "#F59E0B" },
  { name: "Slate", hex: "#64748B" },
  { name: "Ink", hex: "#1E293B" },
];

type RGB = { r: number; g: number; b: number };

function hexToRgb(hex: string): RGB {
  const h = hex.replace("#", "");
  const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return { r: parseInt(n.slice(0, 2), 16), g: parseInt(n.slice(2, 4), 16), b: parseInt(n.slice(4, 6), 16) };
}
function toHex(rgb: RGB): string {
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0");
  return `#${c(rgb.r)}${c(rgb.g)}${c(rgb.b)}`;
}
function mix(a: string, b: string, amt: number): string {
  const x = hexToRgb(a), y = hexToRgb(b);
  return toHex({ r: x.r + (y.r - x.r) * amt, g: x.g + (y.g - x.g) * amt, b: x.b + (y.b - x.b) * amt });
}
function luminance({ r, g, b }: RGB): number {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}
function rgbStr(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  return `${r}, ${g}, ${b}`;
}

function derive(hex: string): Record<string, string> {
  const bright = mix(hex, "#FFFFFF", 0.28);
  const deep = mix(hex, "#0A1024", 0.42);
  const onAccent = luminance(hexToRgb(hex)) > 0.5 ? "#05132E" : "#FFFFFF";
  return {
    "--accent": hex,
    "--accent-rgb": rgbStr(hex),
    "--accent-bright": bright,
    "--accent-bright-rgb": rgbStr(bright),
    "--accent-glow": hex,
    "--accent-glow-rgb": rgbStr(hex),
    "--accent-deep": deep,
    "--accent-deep-rgb": rgbStr(deep),
    "--on-accent": onAccent,
  };
}

const OVERRIDE_KEYS = Object.keys(derive(DEFAULT));

function apply(hex: string) {
  const vars = derive(hex);
  const el = document.documentElement;
  for (const [k, v] of Object.entries(vars)) el.style.setProperty(k, v);
}
function clearOverrides() {
  const el = document.documentElement;
  OVERRIDE_KEYS.forEach((k) => el.style.removeProperty(k));
}

export function BrandStudio() {
  const [open, setOpen] = useState(false);
  const [hex, setHex] = useState(DEFAULT);
  const [customized, setCustomized] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved && /^#[0-9a-fA-F]{6}$/.test(saved)) {
      setHex(saved);
      setCustomized(true);
      apply(saved);
    }
  }, []);

  function pick(next: string) {
    if (!/^#[0-9a-fA-F]{6}$/.test(next)) return;
    setHex(next);
    setCustomized(true);
    apply(next);
    localStorage.setItem(KEY, next);
  }
  function reset() {
    clearOverrides();
    setHex(DEFAULT);
    setCustomized(false);
    localStorage.removeItem(KEY);
  }
  async function copyCss() {
    const css = Object.entries(derive(hex)).map(([k, v]) => `  ${k}: ${v};`).join("\n");
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked - ignore */
    }
  }

  const derived = derive(hex);

  return (
    <div className="fixed bottom-5 left-5 z-[70] flex flex-col items-start gap-3 font-sans">
      {open && (
        <div
          className="w-[300px] rounded-2xl border p-4 shadow-2xl"
          style={{
            background: "var(--color-bg-2)",
            borderColor: "rgba(var(--accent-rgb),0.3)",
            boxShadow: "0 24px 70px -18px rgba(var(--accent-rgb),0.45)",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Palette size={16} style={{ color: "var(--color-accent)" }} />
              <span className="font-display text-[14px] font-medium text-[color:var(--color-ink)]">Brand Studio</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close brand studio"
              className="grid h-7 w-7 place-items-center rounded-full text-[color:var(--color-ink-muted)]"
              style={{ background: "rgba(var(--hairline-rgb),0.06)" }}
            >
              <X size={14} />
            </button>
          </div>

          <p className="mt-1 text-[11px] leading-snug text-[color:var(--color-ink-muted)]">
            Pick an accent - the whole site recolours live.
          </p>

          {/* Picker + hex */}
          <div className="mt-3 flex items-center gap-2">
            <label
              className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border"
              style={{ borderColor: "var(--color-hairline)" }}
            >
              <input
                type="color"
                value={hex}
                onChange={(e) => pick(e.target.value)}
                className="absolute -inset-2 h-[calc(100%+16px)] w-[calc(100%+16px)] cursor-pointer border-0 bg-transparent p-0"
                aria-label="Accent colour"
              />
            </label>
            <input
              type="text"
              value={hex.toUpperCase()}
              onChange={(e) => {
                const v = e.target.value.startsWith("#") ? e.target.value : `#${e.target.value}`;
                setHex(v);
                if (/^#[0-9a-fA-F]{6}$/.test(v)) pick(v);
              }}
              spellCheck={false}
              className="h-11 flex-1 rounded-xl border bg-transparent px-3 font-mono text-[13px] uppercase tracking-wide text-[color:var(--color-ink)] outline-none"
              style={{ borderColor: "var(--color-hairline)" }}
              aria-label="Accent hex value"
            />
          </div>

          {/* Derived preview */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { label: "Accent", c: derived["--accent"] },
              { label: "Deep", c: derived["--accent-deep"] },
              { label: "Text on", c: derived["--on-accent"] },
            ].map((s) => (
              <div key={s.label} className="rounded-lg border p-1.5" style={{ borderColor: "var(--color-hairline)" }}>
                <div className="h-8 w-full rounded" style={{ background: s.c }} />
                <div className="mt-1 text-center font-mono text-[9px] uppercase tracking-wide text-[color:var(--color-ink-muted)]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Presets */}
          <div className="mt-3 grid grid-cols-6 gap-1.5">
            {PRESETS.map((p) => (
              <button
                key={p.hex}
                onClick={() => pick(p.hex)}
                title={`${p.name} · ${p.hex}`}
                aria-label={p.name}
                className="relative h-8 rounded-lg border transition-transform hover:scale-110"
                style={{
                  background: p.hex,
                  borderColor: hex.toLowerCase() === p.hex.toLowerCase() ? "var(--color-ink)" : "transparent",
                }}
              >
                {hex.toLowerCase() === p.hex.toLowerCase() && (
                  <Check size={12} className="absolute inset-0 m-auto" style={{ color: luminance(hexToRgb(p.hex)) > 0.5 ? "#000" : "#fff" }} />
                )}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={reset}
              disabled={!customized}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full border py-2 text-[12px] font-medium disabled:opacity-40"
              style={{ borderColor: "var(--color-hairline)", color: "var(--color-ink)" }}
            >
              <RotateCcw size={13} /> Reset
            </button>
            <button
              onClick={copyCss}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-[12px] font-medium"
              style={{ background: "var(--color-accent)", color: "var(--color-on-accent)" }}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "Copied" : "Copy CSS"}
            </button>
          </div>
        </div>
      )}

      {/* Launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close brand studio" : "Open brand studio"}
        className="grid h-12 w-12 place-items-center rounded-full shadow-lg transition-transform hover:scale-105"
        style={{
          background: "var(--color-bg-2)",
          border: "1px solid rgba(var(--accent-rgb),0.4)",
          boxShadow: "0 10px 30px -8px rgba(var(--accent-rgb),0.5)",
        }}
      >
        <Palette size={20} style={{ color: "var(--color-accent)" }} />
        {customized && (
          <span
            className="absolute right-0 top-0 h-3 w-3 rounded-full border-2"
            style={{ background: hex, borderColor: "var(--color-bg-2)" }}
          />
        )}
      </button>
    </div>
  );
}
