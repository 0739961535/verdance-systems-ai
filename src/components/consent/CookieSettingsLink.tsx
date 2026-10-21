"use client";

import { openConsent } from "@/lib/consent";

/** Footer link that reopens the cookie choice. */
export function CookieSettingsLink() {
  return (
    <button type="button" onClick={openConsent} className="inline-flex min-h-11 items-center underline underline-offset-4">
      Cookie settings
    </button>
  );
}
