"use client";

import { openConsent } from "@/lib/consent";

/** Footer link that reopens the cookie choice. */
export function CookieSettingsLink() {
  return (
    <button type="button" onClick={openConsent} className="underline underline-offset-4">
      Cookie settings
    </button>
  );
}
