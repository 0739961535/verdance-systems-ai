"use client";

import { useEffect, useState } from "react";

export type ThemeMode = "dark" | "light";

/**
 * Reads the active site theme from <html data-theme> and tracks live toggles
 * (ThemeToggle stamps the attribute; a MutationObserver keeps this in sync).
 * Defaults to "dark" on first render so SSR is stable; the real value is
 * applied in an effect on the client.
 */
export function useHtmlTheme(): ThemeMode {
  const [mode, setMode] = useState<ThemeMode>("dark");
  useEffect(() => {
    const read = () =>
      setMode(document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark");
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);
  return mode;
}
