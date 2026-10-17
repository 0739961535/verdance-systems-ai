# Design System v2: Control Room, tightened

Extends `docs/design-direction.md`. Only what is new or stricter lives here. Where the two disagree, this file wins.
Source of truth for tokens and fonts is `src/app/globals.css` (Satoshi display/body, Instrument Serif italic via `.italic-accent`, Geist Mono). The font table in design-direction §2.2 is stale; ignore it.

**Overrides of design-direction:** §4.3 "from £X" pricing is withdrawn. No prices anywhere on the site, in rand or pounds. Offer rows end in a delivery chip (`Live in 10 working days`) instead.

Generator check (ui-ux-pro-max, "Real-Time / Operations Landing" + "Trust & Authority"): keep its structure (live preview in hero, metrics then how-it-works then CTA, status colours, before/after, certificates). Reject its Fira fonts and navy palette.

---

## 1. Rhythm, widths, one CTA

Mobile first at 390px. Gutter 20px (`container-*` already does this), 40px at 768+.

| Token (new, add to `:root`, same in both themes) | Value | Use |
|---|---|---|
| `--space-section` | `clamp(4.5rem, 3.2rem + 5.5vw, 8rem)` | 72px at 390, 128px at 1440. Replaces ad hoc `py-*` on sections (`.section-pad` keeps working, same curve) |
| `--space-head` | `clamp(2rem, 1.6rem + 1.6vw, 3.5rem)` | Section head to content |
| `--space-block` | `clamp(1.5rem, 1.2rem + 1vw, 2.25rem)` | Between blocks inside a section |
| `--space-cta` | `clamp(2rem, 1.6rem + 1.8vw, 3rem)` | Content to the section CTA |

- Widths: hero and demo surfaces `container-wide` (1440); offer stack, guarantees, moment cards `container-narrow` (1120); prose and FAQ `container-editorial` (880). Headline measure 20ch, lead 52ch, body 62ch.
- Section anatomy, always in this order: eyebrow, h2 (one `.italic-accent` word max), lead (2 lines max), content, one CTA. Nothing else.
- **One CTA per section.** One action, one button. The primary (solid azure) appears at most once per viewport; every other section CTA is the ghost/outline button or a text link pointing to the same place. The only secondary allowed is the "No sales pitch" microcopy line under it (mono, `--text-small`, `--ink-muted`).
- Every CTA on every page points to the Operations Map booking. Label: `Book your free Operations Map`. No "Learn more", no "Get started".
- Bands alternate `--bg` / `--bg-2`, split by a full-bleed 1px `--hairline`. Never two `--bg-2` bands in a row.
- At 390px: CTAs full width, min height 52px; stacked elements 12px apart; no section taller than ~2.5 viewports without a CTA.

## 2. Offer stack and guarantee seal

### 2.1 Offer stack ("What you get", value framing, no prices)

A single `surface` card, radius-lg, `container-narrow`. Reads like a spec sheet, not a pricing table.

1. **Header row:** mono eyebrow `THE REVENUE TEAM` + delivery chip right (`Live in 10 working days`, hairline pill, mono).
2. **Four value rows** (Hormozi equation, in this order, each a 3-column grid at 768+, stacked at 390):
   | Lever | Row label (mono, `--ink-muted`) | Content |
   |---|---|---|
   | Dream outcome | `WHAT CHANGES` | Every enquiry answered within 60 seconds, every follow-up done |
   | Likelihood | `WHY IT WORKS` | Built on your own numbers from the Operations Map; we only propose if it pays back 2x |
   | Time | `HOW FAST` | Live in 10 working days |
   | Effort | `WHAT YOU DO` | Approve what matters from one screen. The team does the rest |
   Row anatomy: label left (mono 0.72rem), statement middle (`--text-h3`-small, `--ink`), proof right (one short mono datum in `--ink-soft`, e.g. `< 60 s`, `10 days`, `1 screen`). Rows split by `--hairline`. Row 1 statement carries the single `.italic-accent` word.
3. **Included list:** 4 to 6 named jobs (e.g. `Answers WhatsApp and email`, `Chases unpaid quotes`), each with a 16px Lucide `Check` in `--accent`. Two columns at 768+.
4. **Guarantee strip:** the two seals (2.2) side by side, compact variant.
5. **Footer:** the section CTA (ghost if the hero primary is on screen, else solid).

States: static card, no hover lift (it is not clickable). Rows reveal with the standard 60ms stagger, cap 5. No strike-through "value" prices, no "worth R___" anchors, no countdowns.

### 2.2 Guarantee seal (certificate)

Two seals only: **60-Second Guarantee** and **Break-Even Exit**. Specific beats strong: every seal states the exact trigger and the exact remedy.

Anatomy (card, radius-md, `--bg-3`, 1px `--hairline-2`, corner registration marks, padding 24px / 32px at 768+):
- Top: 40px circular seal mark. Inline SVG: 1px `--hairline-3` outer ring, a second ring at 70% opacity of `--accent`, centre glyph (Lucide `Timer` for 60-Second, `Scale` for Break-Even) in `--accent`. Static. No rotation, no shine sweep.
- Mono eyebrow `GUARANTEE 01` / `GUARANTEE 02`.
- Name, `--font-display` 500, h3 size.
- **The terms**, two lines in a definition list, mono labels:
  - `IF` 99% of enquiries are not answered within 60 seconds in a month / `THEN` that month is credited.
  - `IF` the system has not broken even by day 90 / `THEN` you can leave.
- Footer hairline, then mono `--ink-muted` line: `Written into your agreement.`

Tokens (new): `--seal-ring: rgba(var(--accent-rgb), 0.55)` both themes. Card top edge uses the existing `.surface::before` sheen.
States: rest only on the marketing page. Focus is not needed (non-interactive). Reduced motion: identical (seal never animates; card fades in like any reveal).
Compact variant (inside the offer stack): mark 28px, name + one-line terms, no footer. Never show a seal without its terms.

## 3. "Before / With AI" moment card

One moment, one card. Used in groups of 3 on niche pages (e.g. "Saturday 21:14, a wedding enquiry arrives").

Structure, `surface` card, radius-lg, `container-narrow`:
- **Header:** mono timestamp + channel (`SAT 21:14 · WhatsApp`), and the enquiry in one line of `--ink` in a quoted bubble (radius-sm, `--bg-4`).
- **Split timeline** (2 columns at 768+, stacked at 390 with Before first):
  - **Before** column, header `BEFORE` (mono, `--ink-muted`). A vertical 1px `--hairline-2` spine with 2 to 3 time stamps (`21:14 seen`, `Mon 09:40 replied`, `Booked elsewhere`). Text `--ink-muted`; the outcome line has `text-decoration: line-through; text-decoration-color: var(--hairline-3)`. Clock chip shows the elapsed gap in mono: `60 h 26 m`. No red.
  - **With the Revenue Team** column, header `WITH AI` (mono, `--signal-ink`). Spine is `--signal`. Stamps: `21:14:38 answered`, `21:16 options sent`, `21:22 viewing booked`. Clock chip: `38 s` in `--signal-ink` on `--signal-dim`, `--text-data-lg`, tabular-nums.
- **Delta footer:** one line, `--ink`: the outcome in their terms (`R180k event kept`, phrased as a scenario, not a result) + mono footnote `Illustrative scenario`.

The memorable device is the two clock chips: a long grey number against a tiny green one. Keep both chips the same width (min-width 7ch) so the contrast is in the digits, not the boxes.

Motion: on reveal the Before column renders static; the With AI spine draws (`scaleY` 0 to 1, 700ms `--ease-out`), stamps arrive at 120ms stagger, the clock chip counts up 0 to 38 s once (600ms). Reduced motion: final state, no count.

## 4. Living product-demo surfaces

Applies to the command centre (`src/components/aiteam/CommandCentre.tsx`), the unified inbox, and any future demo.

**Frame chrome:** `surface` on solid `--bg-3` (no glass), radius-lg, 1px `--hairline-2`, `--shadow-raised`, corner registration marks. Title bar 40px: three 8px dots in `--ink-faint` (decorative, `aria-hidden`), mono title (`ashford · staff`), right-aligned status pill. Body padding 16px / 20px at 768+.

**Density:** rows 44px min (they are tap targets when interactive), 12px horizontal padding, `--text-data` mono for meta, 0.9375rem Satoshi for the message line. Max 5 visible rows desktop, 4 at 390. Fixed-height viewport, `overflow: hidden`, CLS 0.

**Status chips** (pill, 22px high, mono 0.6875rem uppercase, ls 0.12em, 1px border, 6px dot). New tokens, both themes:

| Role | Token | Dark | Light | Chip fill / border |
|---|---|---|---|---|
| Department (head, workers) | `--st-dept` | `var(--accent)` #5B8FFF | `var(--accent)` #2554D4 | `rgba(var(--accent-rgb),0.10)` / `--hairline-glow` |
| Reviewer | `--st-review` | `var(--ink-soft)` #C9C5BD | `var(--ink-soft)` #3A3935 | `--surface-tint-2` / `--hairline-3` |
| Operator (done, sent, booked) | `--st-operator` | `var(--signal)` #3DD68C | `--signal-ink` #0B7547 | `--signal-dim` / `rgba(signal,0.30)` |
| Needs you | `--st-attn` | `#F2B04C` | `#9A5B00` | `--st-attn-dim`: `rgba(242,176,76,0.12)` dark, `rgba(154,91,0,0.08)` light / `rgba(attn,0.35)` |

New text token `--signal-ink`: dark `#3DD68C` (same as signal), light `#0B7547`. Use it for any signal-coloured **text** in light mode; existing `--signal` #0F8A55 stays for dots and lines (it fails 4.5:1 as text on white).
Amber is the only new hue and it is reserved for "Needs you". It means "the owner decides", never error, never warning copy in marketing. Needs-you rows also get a 2px left tick in `--st-attn` and an `Approve` / `Edit` button pair (ghost, 44px).

**Label rule:** every demo surface carries `Sample, for illustration` exactly: mono 0.6875rem, `--ink-muted` (not `--ink-faint`, which fails contrast), bottom-left inside the frame footer, always visible including the reduced-motion snapshot. Sample data uses invented first names and generic businesses; never a real client name, never real prices.

**Motion tokens** (use existing, add two):
- Row arrive: `translateY(12px)` + opacity, `--dur-base` 320ms, `--ease-out`.
- Chip state change (dept to review to operator): colour crossfade 160ms (`--dur-fast`), `--ease-inout`.
- Stagger `--stagger` 60ms, cap 5.
- New `--demo-tick: 2800ms` (event cadence, randomise 2400 to 4000ms) and `--demo-hold: 1200ms` (pause on a Needs-you row so it can be read).
- Loop only while ≥30% visible and the tab is visible; stop after 3 full cycles and hold the best frame.
- Reduced motion: static best frame (one row per role, one Needs-you visible), pill reads `Today` instead of `Live`, no ticking.

**Mobile (390px):** frame full width of the container, never wider; no horizontal scroll inside the frame (chips wrap under the message line, long text truncates to 1 line with ellipsis, full text in an accessible label). Tabs/filters become a 2-row segmented control, each segment ≥44px. Anything tappable ≥44x44px with 8px between targets. Demo controls are `button` elements with `cursor-pointer`, visible `:focus-visible` ring, and `aria-pressed` where toggled.

## 5. Anti-patterns and contrast

**Never:**
- Purple/pink/teal AI gradients, mesh blobs, orbs, particle fields, glowing brains or robots.
- Glass soup: more than 2 `backdrop-filter` surfaces per viewport; glass on any demo frame.
- Emoji icons. Lucide SVG only, stroke 1.5.
- Prices, "worth R___" anchors, strike-through value stacks, countdown timers, fake scarcity.
- Fake proof: testimonials, client logos, counters ("500+ businesses"), real client names. Demos always labelled.
- Neon terminal green, red "before" states, a third accent hue (amber is a status, not an accent).
- Two primary buttons in one section; "Learn more" CTAs.
- Rotating seals, shine sweeps, tilt cards, typewriter text, scroll-jacking.
- Tech-first copy in UI ("GPT", "agents", "LLM") on buyer pages. Name the job, not the model.

**Contrast checks (WCAG 2.1, computed):**

| Pair | Dark | Light | Pass |
|---|---|---|---|
| `--ink-muted` on `--bg-3` / `--bg-4` | 5.43 / 5.07 | 6.10 on `--bg`, 5.74 on `--bg-2` | AA |
| `--accent` text on card | 5.97 | 6.37 | AA |
| `--signal` text on card | 9.81 | 4.39 FAIL, use `--signal-ink` 5.75 (white), 4.88 (`--bg-2`) | AA with token |
| `--signal-ink` on `--signal-dim` chip | 8.58 | 5.05 | AA |
| `--st-attn` on card | 9.72 | 5.43 (white), 4.60 (`--bg-2`) | AA |
| `--st-attn` on its dim chip | 8.28 | 4.71 | AA |
| `--on-accent` on solid `--accent` | 6.04 | white on #2554D4 6.37 | AA |
| `--ink-faint` | 2.02 | 2.67 | Decorative only, never text |

Ship checks: test every new pattern at 390, 768, 1024, 1440 in both themes and with reduced motion on; tab through every demo control; confirm zero horizontal scroll at 390.
