# Verdance Systems AI — Design Direction (Site Revamp)

**Direction name: "The Control Room."**
One idea drives every decision on this site: *the website is the product demo.* Verdance sells AI systems that run businesses — so the site itself behaves like a calm, precise operations console. Evidence over adjectives. Telemetry over testimonials. Every decorative choice is replaced by an instrumental one: hairlines instead of glows, monospace data instead of stock metaphors, a live (simulated) dashboard instead of a quote wall.

This document is the single source of truth for the revamp. It is decisive — where the old system offered options, this one specifies exactly one.

---

## 1. Positioning of the visual language

| Axis | Decision |
|---|---|
| Mood | Precision instrument. Linear × Vercel × mission control. Calm confidence, zero hype. |
| Canvas | Deep near-black, dark-first (dark is the brand canvas; light theme is a faithful derivative). |
| Accent | One accent family only: electric azure. Plus one *signal* colour (emerald) reserved exclusively for "live/working/after" states in data UI. |
| Proof style | Simulated live systems, before/after deltas, named process, guarantees. No testimonial walls, no logo carousels of clients we don't have, no fake counters ("500+ businesses served" is banned). |
| Voice in UI copy | Short declarative statements. Numbers wherever possible. "No sales pitch" microcopy at every conversion point. |
| What we are NOT | Generic AI-gradient (purple/teal mesh), orbiting particles, neon terminal green, glassmorphism soup, stock robots/brains, emoji icons. |

The ui-ux-pro-max generator recommended a Motion-Driven style with Enterprise Gateway conversion patterns — we keep its structural guidance (motion discipline with `prefers-reduced-motion` as a first-class state, path-selection conversion, trust signals early) and **explicitly reject** its terminal-green/alert-red palette, which would break the premium azure identity the brand already owns.

---

## 2. Design tokens

### 2.1 Colour

Dark theme is the default and the brand canvas. All values below are the refined set; they slot into the existing CSS-variable architecture in `src/app/globals.css` (semantic vars on `:root`, light overrides via `[data-theme="light"]`, Tailwind v4 `@theme inline` map).

**Dark (default)**

```css
:root {
  color-scheme: dark;

  /* canvas — unchanged, it works */
  --bg:       #050709;   /* page ground */
  --bg-2:     #0A0D10;   /* alternate band */
  --bg-3:     #12161B;   /* card */
  --bg-4:     #1A2028;   /* raised card / input */
  --bg-glass: rgba(12, 17, 24, 0.72);
  --bg-rgb:   5, 7, 9;

  /* ink */
  --ink:       #FFFFFF;  /* headlines, key numbers */
  --ink-soft:  #C5CDD3;  /* body copy — 12.3:1 on --bg */
  --ink-muted: #8A96A0;  /* captions, labels — lifted from #6B7680 to clear 4.5:1 on card bgs */
  --ink-faint: #3E4750;  /* disabled / decorative only, never running text */

  /* azure family — unchanged hues, tightened roles */
  --accent:        #4F8DFF;  /* links, active states, accent text (7.0:1 on --bg) */
  --accent-bright: #7DABFF;  /* hovers, data highlights */
  --accent-glow:   #3B82F6;  /* gradient partner, focus rings */
  --accent-deep:   #1E4FD6;  /* pressed states, deep washes */
  --on-accent:     #05132E;  /* text on solid azure fills */

  /* NEW — signal colour. Emerald. ONLY for live/positive telemetry:
     the live dot, "after" values in delta rows, booked-call events,
     status "Running". Never for buttons, never for headings. */
  --signal:     #34D399;     /* 8.9:1 on --bg */
  --signal-dim: rgba(52, 211, 153, 0.14);

  /* hairlines — the primary structural device of the whole site */
  --hairline:   rgba(255,255,255, 0.07);
  --hairline-2: rgba(255,255,255, 0.12);
  --hairline-3: rgba(255,255,255, 0.22);
  --hairline-glow: rgba(79,141,255, 0.28);
}
```

**Light** (keeps existing architecture; only the deltas that matter)

```css
:root[data-theme="light"] {
  --bg: #F4F7FC;  --bg-2: #ECF1F9;  --bg-3: #FFFFFF;  --bg-4: #F7FAFE;
  --ink: #0A1524; --ink-soft: #33415A; --ink-muted: #4E5B71; /* darkened to hold 4.5:1 */
  --accent: #2563EB; --accent-deep: #1E40AF; --on-accent: #FFFFFF;
  --signal: #059669;  /* emerald-600 — 4.5:1+ on white */
}
```

**Usage rules**

- Azure is *interface*: CTAs, links, active nav, accent words, focus. Emerald is *evidence*: it only ever appears attached to a datum that represents the system working. This split is the palette's signature — the eye learns "green = it's alive."
- One solid-azure CTA per viewport maximum. Everything else is outline/ghost.
- No third accent. The old `--accent-2/-3` aliases collapse to the single azure family (keep the vars as aliases for migration, but no new component may treat them as different colours).
- Red exists only as a functional error colour in forms (`#F87171` dark / `#DC2626` light). It never appears in marketing copy — "before" states in delta rows use `--ink-muted` with strikethrough, not red. Calm, not alarmist.
- Ambient washes: max two radial azure washes per section, opacity ≤ 0.10, `filter: blur()` applied to a *static* element only (never animated blur).
- Grain overlay stays (opacity 0.04, `mix-blend-mode: overlay`) — it is the cheapest luxury cue we have.

### 2.2 Typography

**Fonts — reduce from five files to four, with hard roles:**

| Token | Font | Role |
|---|---|---|
| `--font-display` | **Geist** (500) | All headlines, nav, buttons |
| `--font-body` | **Inter** (400/500) | Body copy, UI text |
| `--font-mono` | **JetBrains Mono** (400/500) | Eyebrows, data, numbers, timestamps, the entire dashboard, delta values, process numbers |
| `--font-accent` | **Fraunces** italic (600) | The single accent word/phrase device (`.italic-accent`) — max one per headline |

**Drop Instrument Serif entirely** (redundant with Fraunces; one fewer font request). JetBrains Mono is promoted from a garnish to a first-class voice — it is the "telemetry voice" of the Control Room and appears in every proof device.

**Type scale — mobile-first (375 px) with fluid desktop steps.** All sizes are `clamp(min, fluid, max)`; the min is the 375 px value.

| Token | Value | Use |
|---|---|---|
| `--text-hero` | `clamp(2.5rem, 4.8vw + 1.6rem, 5.25rem)` | h1 only. 40 px at 375 → 84 px at 1440. lh 1.02, ls −0.04em |
| `--text-h2` | `clamp(1.9rem, 3.2vw + 1.2rem, 3.5rem)` | Section headlines. 30 → 56 px. lh 1.06, ls −0.035em |
| `--text-h3` | `clamp(1.35rem, 1.2vw + 1.05rem, 1.75rem)` | Card titles. 22 → 28 px. lh 1.15 |
| `--text-lead` | `clamp(1.0625rem, 0.5vw + 0.95rem, 1.25rem)` | Hero subline / section intros. 17 → 20 px. lh 1.55 |
| `--text-body` | `1rem` mobile / `1.0625rem` ≥768 | Body. lh 1.6. Never below 16 px on mobile (also prevents iOS input zoom) |
| `--text-small` | `0.875rem` | Captions, microcopy. lh 1.5 |
| `--text-eyebrow` | `0.72rem` mono, uppercase, ls 0.28em | Section eyebrows |
| `--text-data-lg` | `clamp(1.75rem, 2vw + 1.3rem, 2.5rem)` mono | Big numbers (deltas, stats). Always `font-variant-numeric: tabular-nums` |
| `--text-data` | `0.8125rem` mono | Dashboard rows, timestamps |

Rules: headlines max `15ch` (hero) / `20ch` (h2) measure; body max `62ch`; hero h1 at 375 px must fit its message in ≤ 3 lines — write copy to the container, not vice-versa. Tabular numerals on *every* animated or comparative number so digits never shift width.

### 2.3 Spacing

4 px base grid. Named steps (Tailwind-native equivalents in brackets):

`4 (1) · 8 (2) · 12 (3) · 16 (4) · 24 (6) · 32 (8) · 48 (12) · 64 (16) · 96 (24) · 128 (32)`

- **Section rhythm:** `--section-pad: clamp(4.5rem, 9vw, 8rem)` vertical. Sub-sections `clamp(3rem, 6vw, 5rem)`. Alternate `--bg` / `--bg-2` bands separated by a full-width `--hairline` rule — the page reads as an instrument panel of stacked modules.
- **Container:** `container-wide` 1440 max / `container-narrow` 1120 / `container-editorial` 880. Gutters: **20 px at 375, 40 px ≥ 768** (existing values, keep).
- **Card padding:** 20 px mobile, 28 px ≥ 768, 32 px on feature cards.
- **Stack gaps inside cards:** 12/16/24 only. No ad-hoc values.

### 2.4 Radius, borders, hairlines

| Token | Value | Use |
|---|---|---|
| `--radius-xs` | 4 px | badges, keyboard-chip elements |
| `--radius-sm` | 8 px | inputs, dashboard rows, small chips |
| `--radius-md` | 14 px | inner cards, offer cards |
| `--radius-lg` | 20 px | primary cards, demo frames (down from 22 — crisper) |
| `--radius-pill` | 9999 px | buttons, status pills |

- **Border weight is always 1 px.** No 2 px borders anywhere except focus rings.
- Default card border `--hairline`; interactive card hover → `--hairline-glow`; the top edge of premium cards gets the existing 1 px inset gradient sheen (`.surface::before`) — keep it, it's doing real work.
- **Hairline dividers are the site's signature structural device**: full-bleed 1 px rules between sections, vertical hairlines between grid columns on desktop, `hairline-glow` (azure gradient line) reserved for the hero and the discovery-call section only — it marks the two conversion moments.
- Corner registration marks (the architectural `+` ticks already in `HomeHero`) are promoted to a brand device: hero, dashboard frame, and guarantee block get them. Nowhere else.
- **Backdrop blur budget:** maximum two `backdrop-filter` surfaces mounted per viewport (navbar + one). The dashboard uses solid `--bg-3`, not glass — telemetry sits on solid ground.

---

## 3. Motion system

Motion is a *materials* budget, not a garnish. The brand feeling is "engineered, deliberate" — things arrive once, settle, and then only *data* moves.

### 3.1 Allowed primitives (the complete list)

1. `opacity` fades.
2. `transform: translateY/translateX` — entrance distance 12–20 px, hover lift −2 to −3 px.
3. `transform: scale` — 0.97→1 entrances, 1→1.02 hover max.
4. `transform: scaleX` on hairlines (grow-in from left, `transform-origin: left`).
5. Vertical digit-roll / row-slide *inside the dashboard demo only* (translateY of absolutely-positioned children within a fixed-height, `overflow: hidden` viewport — zero layout impact).

Everything animates on the compositor: `transform` + `opacity` only. `will-change` applied just-in-time and removed after settle (the existing `.enter-*` CSS classes already do this correctly — keep that pattern).

### 3.2 Entrance & scroll-reveal rules

- **Above the fold:** CSS-driven entrances only (existing `.enter-line`, `.enter-fade-up`, `.enter-grow-x`) so the hero can never get stuck hidden and the LCP element is not JS-gated. Headline lines rise (`lux-rise`) with 60–90 ms stagger; total hero choreography completes ≤ 1.2 s.
- **Below the fold:** IntersectionObserver reveal (existing `Reveal` primitive), threshold ~0.2, `once: true` — nothing re-animates on scroll-up. Fade-up 16 px, 600–800 ms, `--ease-out-expo`. Stagger within a group: 60 ms, cap 5 staggered children (6th+ arrive together).
- **Scroll-linked effects:** none. No parallax, no scrubbed timelines, no pinned GSAP sections. Scrolling must cost zero main-thread work. (Lenis smooth-scroll may stay on desktop only; it must not mount on touch devices — native scroll on mobile, always.)
- **Hover:** 150–200 ms out, `--ease-luxury`. Lift + border-colour + shadow only.

### 3.3 Banned (delete on sight)

- **Continuous rotation/orbit of any kind** — `animate-spin-slow`, orbiting particles, conic sweeps, ring rotations. The keyframe `spin-slow` is deleted from `globals.css`; current users (`BookDemoCTA`, `WhatVerdanceBuilds`, `HowItWorksPreview`, `TrustStrip`, `FAQ`, `ServicesOverview`, `Navbar`, `FAQAccordion`, `ConicBorder`, `ChatbotWidget`) lose it. Chevron/plus rotations on accordion toggles are the only rotation permitted (single 200 ms transition, not continuous).
- **Infinite idle loops on decoration** — `animate-float`, `aurora-drift`, `glow-pulse` on background elements. Backgrounds are static. Exception: the 2 px live-status dot may pulse (opacity 0.5↔1, 2.4 s) — it is data, not decoration.
- **Anything that animates layout** — width/height/top/left/margin/padding animations, accordion `height:auto` tweens without a transform strategy (use `grid-template-rows: 0fr→1fr` which is fine, or measured max-height), text that reflows while animating.
- **Animated `filter`/`backdrop-filter`**, animated gradients, `background-position` loops.
- **Jitter class:** magnetic buttons, cursor followers, tilt-on-hover cards, character-by-character text scrambles, typewriter headlines. (`MagneticButton` is retired; `RotatingHeadline` may stay **only if** it crossfades fixed-height lines — opacity/translate swap in a `1lh` fixed-height mask, never width-typing.)
- Marquees: one marquee maximum on the whole site (the hero ticker), `transform`-based, 60 s+ duration, paused when off-screen and under reduced motion.

### 3.4 The dashboard exception

The simulated live dashboard (§4.1) is the one place continuous motion is allowed, because there the motion *is the content*. Constraints: one event mutation every 2.4–4 s (randomised), each event animates a single row slide-in + one digit roll; driven by `setTimeout` + CSS transitions (no rAF loop, no GSAP ticker); fully paused via IntersectionObserver when < 30 % visible and on `document.visibilitychange`.

### 3.5 Reduced motion

`@media (prefers-reduced-motion: reduce)`:

- All entrances snap to final state (existing global override — keep).
- Dashboard renders a fully-populated **static snapshot** (best-looking frame: events listed, numbers at final values, "Live" pill becomes "Today's activity"). No ticking.
- Ticker marquee renders as a static wrapped list of 3 items.
- Hover lifts become colour-only changes.
- This is a designed state, not a degraded one — screenshot-test it.

### 3.6 Performance guardrails (SEO-critical)

- LCP element = the hero `h1` text (never an image/canvas). Hero fonts preloaded, `display: swap`.
- CLS = 0 by construction: every animated container has fixed dimensions; entrances use transform (no layout); dashboard viewport is fixed-height at every breakpoint.
- GSAP is removed from the landing page bundle. Framer Motion only for the `Reveal` primitive and accordion; everything else is CSS. Target: zero long tasks > 50 ms during scroll on a mid-tier Android.

---

## 4. Component specs

### 4.1 Hero with simulated live dashboard

The zero-testimonial proof pattern. Layout: conviction statement + the system visibly working.

**Copy structure (fixed):**

1. Eyebrow (mono): `AI SYSTEMS AGENCY — DESIGN · BUILD · RUN`
2. H1, conviction voice, ≤ 9 words, one Fraunces accent word: **"We don't talk about AI. We ship it."** (accent word: *ship*)
3. Lead (≤ 2 lines): "Marketing, sales, operations and automation systems — designed, built and run for you. You own everything we build."
4. CTA row: solid azure **"Book your AI Systems Audit"** + ghost **"WhatsApp us"** (WhatsApp glyph, SVG).
5. Microcopy under CTAs (mono, `--text-small`, `--ink-muted`): `Free · 30 min · leave with a roadmap · no sales pitch`

**The dashboard ("Verdance Ops — Live"):** a fixed-height instrument panel in a `surface` card (solid `--bg-3`, 1 px hairline, radius-lg, corner registration marks, mono type throughout).

- **Header row:** traffic-light dots (decorative, `--ink-faint`), title `verdance-ops · live`, and a Live pill (`--signal` dot pulsing + "LIVE" in mono).
- **Stat strip (3 tiles):** `Leads captured today: 47↑` · `Median response: 28s` · `Calls booked: 9↑`. Numbers tabular-nums; increments digit-roll; up-arrows in `--signal`.
- **Event feed (5 visible rows, fixed height):** timestamped events sliding in: `14:32 WhatsApp lead captured → replied in 24s`, `14:29 Call booked — discovery, Thu 10:00`, `14:21 Review request sent`, `14:14 Invoice paid — £1,450`, `13:58 Voice agent answered missed call`. Each row: mono timestamp (`--ink-muted`), event text (`--ink-soft`), category chip (azure outline). Booked-call rows get a `--signal` left-edge tick.
- Honesty label in the card footer (mono, `--ink-faint`): `Simulated feed — this is what your dashboard looks like.` Never fake it as real client data.

**375 px:** single column — eyebrow → h1 → lead → CTAs (full-width, stacked, 8 px gap) → dashboard below at full width, height 300 px (stat strip collapses to a horizontally scrollable row, 3 feed rows). Dashboard is fully visible within the first 1.5 viewports.
**≥ 1024:** two-column grid `1.05fr / 0.95fr`, text left, dashboard right, height 420 px, 5 feed rows.
**Background:** static — grain + masked 64 px grid + one blurred azure wash top-right + vignette (all existing layers in `HomeHero`, all static). No crystal/3D object.

### 4.2 Pillar card (×4: Marketing · Sales · Internal Operations · Automations)

The service architecture. A `surface` card that reads like a labelled module in a rack.

- **Anatomy:** mono index (`01`–`04`, `--ink-faint`, `--text-data-lg`) → 20 px Lucide SVG icon in azure (24 px stroke-1.5; never emoji) → h3 title → one-line promise (e.g. Sales: "Every enquiry answered in seconds, on every channel — and booked.") → 3-item capability list in mono `--text-data` (`Conversation AI · Voice agents · Follow-up & nurture`) → footer link `View systems →` (azure, arrow translates 4 px on hover).
- **States:** rest = `--hairline` border; hover = lift −3 px, border `--hairline-glow`, existing `surface-card-hover` shadow, 200 ms. Whole card clickable (`cursor-pointer`), opens the pillar's catalogue (§4.3) — on desktop as the section's detail panel, on mobile as an expand-in-place accordion (grid-rows 0fr→1fr, 300 ms).
- **Layout:** 375 px — vertical stack, full-width, 16 px gap between cards. ≥ 768 — 2×2 grid. ≥ 1280 — 4-across, equal height, separated by vertical hairlines (borderless variant, hairline columns) so the row reads as one instrument strip.

### 4.3 Offer card (catalogue item inside a pillar)

Compact productised row — the "shop shelf" for each pillar.

- **Anatomy (row layout):** left: offer name in `--font-body` 500 + one-line outcome (`--text-small`, `--ink-muted`). Right: **"from £X"** anchor in mono (`--ink`) + delivery chip (`~2 wks`, mono, hairline pill). Chevron end-cap.
- 56 px min height, `--radius-sm`, `--bg-4` on hover, hairline separators between rows, whole row tappable → discovery-call section with the offer pre-selected (query param).
- "From" pricing is mandatory on every offer — anchoring is a trust device here, not a leak. If an offer is truly custom: `from £—  · scoped on the audit call`.
- 375 px: name/outcome stack left, price right, chip drops under the price. Never truncate the outcome line — wrap.

### 4.4 Delta row (the testimonial replacement)

Before/after telemetry. Used in a "What changes" band of 4–5 rows.

- **Anatomy (one row):** metric label (body, `--ink-soft`) · **before** value (mono, `--ink-muted`, `text-decoration: line-through` with `text-decoration-color: var(--hairline-3)`) · arrow glyph `→` (azure) · **after** value (mono, `--ink` with `--signal` accent, `--text-data-lg`).
- Examples: `Lead response 4 hrs → 28 sec` · `After-hours enquiries voicemail → answered & booked` · `Follow-up 1 attempt → 12 touches, automatic` · `Invoices chased weekly → chased for you`.
- **Motion:** on reveal, the row fades up; the after-value digit-rolls from the before-value once (800 ms, ease-out-expo), then never again. Reduced motion: static final values.
- **Honesty rule:** section footnote in mono `--ink-faint`: `Typical system targets — set together on your audit call.` Deltas describe *the system's designed behaviour*, not fabricated client results.
- 375 px: label on its own line, before→after pair right-aligned beneath it, hairline between rows. Desktop: single-line 3-column grid (label 1fr / before auto / after auto), vertical hairline before the data columns.

### 4.5 Process step (numbered delivery method, 01–06)

Process-as-product: `01 Audit → 02 Blueprint → 03 Build → 04 Integrate → 05 Launch → 06 Run & optimise`.

- **Anatomy:** oversized mono number (`--text-data-lg`, azure at 24 % opacity, `tabular-nums`) → step name (h3) → 2-line description → mono meta-line (`Week 1 · you get: system blueprint PDF`) — every step names its **artifact** and **timing**; that specificity is the proof.
- **Layout 375 px:** vertical timeline — 1 px hairline spine on the left, steps hang right of it; the spine segment fills to `--accent` via `scaleY` grow as each step reveals (transform-only). **Desktop:** same vertical spine in a two-column layout (sticky section header left, steps right). No horizontal scrolling timelines.
- Step `01 Audit` embeds a compact inline CTA chip: `Start here — book the audit →`.

### 4.6 Guarantee / risk-reversal block

A single full-width `surface` band (not three cards) — one strong statement reads as conviction; three boxes read as terms & conditions.

- **Anatomy:** corner registration marks · eyebrow `THE DEAL, IN WRITING` · h2 ≤ 8 words: "Fixed price. Fixed timeline. **You own the system.**" (accent on *own*) · three hairline-separated columns beneath (mono labels + one-line each): **Fixed quote** "Price agreed before we build. It doesn't move." / **Delivery window** "A launch date in the contract, not a vibe." / **Your property** "Accounts, agents, automations — all in your name from day one." · single azure CTA.
- Border: 1 px `--hairline-glow` full perimeter (this block and the hero are the only two azure-bordered surfaces on the page).
- 375 px: the three columns stack with hairlines between; block gets `--bg-2` band behind it.

### 4.7 Sticky mobile CTA bar

- **< 768 px only.** Fixed bottom, `env(safe-area-inset-bottom)` respected, height 64 px + safe-area, `--bg-glass` + `backdrop-blur(16px)`, 1 px `--hairline-2` top border.
- Two buttons, 8 px gap: **"Book audit"** (solid azure, flex-2) + WhatsApp icon-button (48×48 px, hairline ghost, azure glyph). Both ≥ 48 px tall.
- Appears after the user scrolls past the hero CTAs (IO on the hero), slides up 12 px + fade, 300 ms; hides (translateY down) when the discovery-call section or footer is in view — never covers the form it points to. `position: fixed` + transform only; zero CLS.
- Replaces the floating WhatsApp FAB on mobile (never both). Desktop keeps the FAB, **pulse ring removed** (static, hover-lift only).

### 4.8 Discovery-call section ("The AI Systems Audit")

The named productised first call, calendar-direct.

- **Layout:** two-column ≥ 1024 (left: pitch; right: embedded calendar). 375 px: pitch then calendar, full-width.
- **Left column:** eyebrow `FREE · 30 MINUTES` → h2 "The AI Systems Audit" → what-you-leave-with checklist (3 items, azure SVG ticks): "A map of where AI pays back fastest in your business" / "A prioritised system roadmap — yours to keep" / "A fixed quote if you want us to build it" → microcopy (mono): `No sales pitch. No obligation. The roadmap is yours either way.` → secondary path: "Prefer chat? **WhatsApp us** — a human answers." → **AI-buyer-journey row** (mono label `ASK AN AI ABOUT US` + three hairline chip-links: ChatGPT · Claude · Perplexity, each a pre-filled prompt URL: "What does Verdance Systems AI do and what are their service pillars?").
- **Right column:** GHL calendar embed in a `surface` frame with corner marks; fixed min-height reserved (700 px mobile / 640 px desktop) so the embed never shifts layout; mono caption `Pick a slot — invite arrives instantly.`
- This section sits on `--bg-2` band bounded by `hairline-glow` rules top and bottom — the page's terminal conversion moment.

### 4.9 FAQ

- `container-editorial` (880 px). Real questions with real answers (pricing "from" ranges, ownership, timeline, what happens on the audit call, "what if we already have a CRM", data handling) — written as SEO/AEO content, marked up with `FAQPage` schema.
- Accordion rows: hairline-separated, 56 px min tap row, question in `--font-body` 500, plus-icon rotates 45° (single 200 ms transition — the one permitted rotation). Panel opens via `grid-template-rows: 0fr → 1fr`, 300 ms, ease-luxury. One open at a time. Answers max `62ch`, may contain one inline azure text-link.
- Under the last item: quiet CTA row — "Still deciding? `Ask on WhatsApp →`".

---

## 5. Landing page composition

### 5.1 Section order (single narrative: claim → proof → catalogue → method → deal → close)

| # | Section | Band | CTA present |
|---|---|---|---|
| 1 | **Hero + live dashboard** (§4.1) | `--bg` + washes | Audit (solid) + WhatsApp |
| 2 | **Capability ticker** — single marquee: `Conversation AI · Voice agents · CRM & pipelines · Custom agents · MCP integrations · …` | hairline-bounded strip | — |
| 3 | **What changes — delta rows** (§4.4, 4–5 rows) | `--bg-2` | — |
| 4 | **Four pillars** (§4.2 → §4.3 catalogues) | `--bg` | per-pillar "View systems →" |
| 5 | **How we deliver — 01–06** (§4.5) | `--bg-2` | inline chip on step 01 |
| 6 | **The deal — guarantee block** (§4.6) | `--bg` | Audit (solid) |
| 7 | **The AI Systems Audit — calendar** (§4.8) | `--bg-2`, glow-bounded | calendar + WhatsApp + AI chips |
| 8 | **FAQ** (§4.9) | `--bg` | WhatsApp (quiet) |
| 9 | **Footer** — nav, mono meta (`Built in the UK · Systems run 24/7`), legal | `--bg` below final hairline | text link to audit |

CTA cadence: conversion moments at sections 1, 6, 7 — top, post-proof, terminal. Sections 2–5 stay CTA-quiet apart from the step-01 chip so the middle of the page reads as evidence, not selling. Every CTA on the page is one of exactly two actions: book the audit, or WhatsApp — no third ask (no newsletter, no "learn more" dead-ends).

### 5.2 At 375 px

Everything single-column in the order above. Specifics: hero dashboard full-width at 300 px height directly under the CTAs; delta rows stacked with hairlines; pillar cards stacked, catalogues expand in place; process as left-spine timeline; guarantee columns stacked; calendar full-width; **sticky CTA bar (§4.7) active from post-hero to pre-§7**. First scroll-depth targets: value proposition + working dashboard inside 1.5 screens; first delta row inside 3 screens. Total page ≤ ~9 screens at 375 px — cut copy before adding screens.

### 5.3 Desktop (≥ 1024)

Alternating one-column/two-column rhythm so the page breathes: hero 2-col → ticker full-bleed → deltas centred narrow → pillars 4-across strip → process 2-col (sticky header left) → guarantee full-width band → audit 2-col → FAQ editorial-width. Vertical hairlines articulate all multi-column grids. Max content width 1440; the dark canvas runs full-bleed.

---

## 6. Typography & art direction — how this stays distinctive

1. **Telemetry is the brand image.** Where competitors put a purple-gradient brain, Verdance puts a working console. Every proof device (dashboard, deltas, offer prices, process meta) speaks JetBrains Mono with tabular numerals. That consistency — *mono = the machine talking* — is the visual signature, and it's ownable because it must be earned with real specificity.
2. **The Fraunces italic accent word** stays as the counter-voice: one warm, human, italic word inside each cold precise headline (`ship`, `own`, `runs`). Exactly one per headline, always azure. This tension (instrument grotesk × expressive serif) is the memorable typographic move.
3. **Hairline architecture over glow.** Depth comes from 1 px lines, banded backgrounds, corner registration marks and grain — the language of technical drawings and flight instruments — not from blur and bloom. Glows are demoted to two sanctioned moments (hero, audit section).
4. **Imagery stance:** no stock photography, no 3D abstractions, no robots. The site's "photography" is its own UI: dashboard frames, WhatsApp conversation mock (real message bubbles with genuine copy), pipeline views — treated as art-directed objects: solid grounds, corner marks, generous margin, honest "simulated" captions. If human photography enters later (founder page), it is monochrome with a subtle azure duotone — never inside the landing narrative's proof devices.
5. **Copy is a design material.** Conviction voice: short declaratives, numbers, no exclamation marks, no "unlock/supercharge/revolutionize". Microcopy in mono lowercase is part of the visual texture (`no sales pitch`, `simulated feed`, `yours to keep`).

---

## 7. Accessibility

- **Contrast:** running text ≥ 4.5:1 on its actual background (audit `--ink-muted` usage on `--bg-4` surfaces; the §2.1 lift to `#8A96A0` keeps captions compliant). Large display text ≥ 3:1. `--ink-faint` is decorative-only. Azure-on-dark (#4F8DFF on #050709 ≈ 7.0:1) and light-theme azure (#2563EB on #FFF ≈ 5.2:1) both pass; `--on-accent` on solid azure passes at 6.8:1+.
- **Focus:** global `:focus-visible` 2 px `--accent` outline, 3 px offset (existing — keep) on every interactive element, including dashboard chips, accordion rows, sticky-bar buttons and calendar iframe wrapper. Focus must never be clipped by `overflow: hidden` cards.
- **Touch targets:** ≥ 44×44 px everywhere; primary CTAs and sticky-bar buttons ≥ 48 px; accordion and offer rows ≥ 56 px full-row tappable; ≥ 8 px between adjacent targets.
- **Semantics:** one `h1`; sections as `<section aria-labelledby>`; dashboard feed as `<ul>` with `aria-live="off"` (announcing simulated ticks is noise) plus a visually-hidden summary sentence; delta rows carry visually-hidden "improved from X to Y" phrasing; accordions use `<button aria-expanded>` + region pattern; sticky bar is a `<nav aria-label="Quick actions">` that does not trap focus and does not obscure focused elements (scroll-padding-bottom set to bar height).
- **Motion:** §3.5 in full. Additionally `scroll-behavior` honours reduced-motion (no smooth-scroll lib under reduce).
- **Cursor:** `cursor-pointer` on every clickable surface, including whole-card click areas.
- All icons: Lucide/Heroicons SVG with `aria-hidden` + text labels (or `aria-label` on icon-only buttons, e.g. the WhatsApp sticky button). No emoji as UI.

---

## 8. Migration notes (for the build agents)

- `globals.css`: delete keyframes `spin-slow`, `float-y`, `aurora-drift`, `glow-pulse` (and their `.animate-*` classes); keep `pulse-ring` only for the dashboard live-dot; add `--signal`, `--signal-dim`, type-scale tokens (§2.2), `--section-pad`; lift `--ink-muted`; drop Instrument Serif from `layout.tsx` fonts.
- Retire: `MagneticButton`, `ConicBorder` rotation, GSAP imports on the landing path, mobile Lenis, FAB pulse ring.
- Keep and extend: `Reveal`, `.enter-*` CSS entrances, `surface` system, grain, corner marks, `DemoFrame` (rebuilt to §4.1 spec), theme-flip variable architecture.
- Pre-delivery checklist (every PR): no emoji icons · cursor-pointer everywhere · hover 150–300 ms · contrast audited in both themes · visible focus · reduced-motion designed states · verified at 375/768/1024/1440 · no banned motion (§3.3) · CLS 0 · LCP is the h1.
