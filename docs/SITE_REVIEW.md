# Site review: verdancesystemsai.com

Round 3 review, October 2026. It covers every public page, scored before this branch (`main` at 39349d5) and after it (`round-3-polish`).

**Benchmarks:** Linear, Vercel, Basement Studio, Resend, Raycast, Stripe and Locomotive. What they share:

- one idea per screen, carried by a real product visual rather than decoration
- type doing most of the work
- motion that explains something
- every surface built from the same few components
- no page that looks like a template

**Scale:** 1 to 10, where 10 means it could sit next to the benchmarks.

**Axes:** Impact = visual impact, Hier = hierarchy, Motion = motion quality, Copy = copy clarity, Conv = conversion path, Mob = mobile, Speed = speed, Cons = consistency.

## Scores

| Page | | Impact | Hier | Motion | Copy | Conv | Mob | Speed | Cons | Avg |
|---|---|---|---|---|---|---|---|---|---|---|
| Home | before | 7 | 7 | 7 | 8 | 8 | 7 | 8 | 7 | 7.4 |
| | after | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 9 | 8.1 |
| Services | before | 3 | 5 | 3 | 5 | 4 | 6 | 8 | 3 | 4.6 |
| | after | 8 | 8 | 8 | 7 | 8 | 8 | 8 | 9 | 8.0 |
| Service pages (x12) | before | 4 | 5 | 4 | 4 | 4 | 6 | 7 | 3 | 4.6 |
| | after | 8 | 8 | 8 | 6 | 8 | 8 | 8 | 9 | 7.9 |
| Ashford's Staff | before | 7 | 7 | 7 | 8 | 7 | 7 | 8 | 7 | 7.3 |
| | after | 8 | 8 | 7 | 8 | 8 | 8 | 8 | 9 | 8.0 |
| Industries | before | 3 | 5 | 3 | 5 | 5 | 6 | 8 | 3 | 4.8 |
| | after | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 9 | 8.1 |
| Niche pages (x5) | before | 6 | 7 | 6 | 8 | 8 | 7 | 8 | 6 | 7.0 |
| | after | 8 | 8 | 7 | 8 | 9 | 8 | 8 | 9 | 8.1 |
| How It Works | before | 3 | 5 | 3 | 6 | 4 | 6 | 7 | 3 | 4.6 |
| | after | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 9 | 8.1 |
| Step pages (x6) | before | 3 | 6 | 2 | 8 | 4 | 6 | 8 | 3 | 5.0 |
| | after | 7 | 8 | 7 | 8 | 8 | 8 | 8 | 9 | 7.9 |
| Contact | before | 3 | 6 | 2 | 6 | 7 | 6 | 7 | 3 | 5.0 |
| | after | 8 | 8 | 7 | 8 | 8 | 8 | 7 | 9 | 7.9 |
| Free pre-audit (/audit) | before | n/a (no page) | | | | | | | | |
| | after | 8 | 8 | 7 | 8 | 9 | 8 | 8 | 9 | 8.1 |
| Legal | before | 3 | 7 | 1 | 7 | 2 | 7 | 9 | 3 | 4.9 |
| | after | 7 | 8 | 6 | 7 | 6 | 8 | 9 | 9 | 7.5 |
| Logo and icons | before | 3 | | | | | | | 3 | |
| | after | 8 | | | | | | | 9 | |

Speed is mobile Lighthouse performance. 9 is 95 or higher; 8 is 90 to 94.

## Top issues per page (before), and what was done

### Site-wide
1. **Two design languages.** The homepage and niche pages had the new system. Every other page still used the old `GradientMesh` and text-only hero, `surface-card-hover` cards and the old FinalCTA. It read as two websites.
   - **Done:** a shared kit used by every inner page. It has `PageHero` (breadcrumb, serif accent, pre-audit CTA, its own visual), `SectionHead`, `CTABand`, `card-x` (gradient border, inner light, pointer spotlight, lift, press) and `NumberTicker`.
2. **The logo was a letter in a box.**
   - **Done:** a new flow mark, three streams converging on one node, with a Satoshi wordmark and "Systems AI" in Instrument Serif italic. It is used by the nav, footer, SVG favicon, Apple icon and OG image. Two alternative concepts sit in `public/brand`.
3. **Motion that caused jank:**
   - the nav animated its padding on scroll (layout on every scroll)
   - the button shine animated `left`
   - the call ring animated `box-shadow`
   - the scale reveal animated `filter: blur`
   - "wipe" reveals animated `clip-path`
   - the mega menu keyframe double-applied `translate` (fixed on main in 39349d5)
   - **Done:** all of these now animate transform and opacity only. There are motion tokens (`--ease-out`, `--ease-inout`, `--dur-fast/base/slow/reveal`, `--stagger`) and one stagger rhythm (60 ms). Scrolling held 59 to 60 fps on every tested page at 390 px with a 4x CPU throttle.
4. **Copy left over from the old voice:** dashes used as punctuation, "Free consult", and CTAs pointing at /contact instead of the pre-audit.
   - **Done:** service copy is now cleaned at render time (`plain()`), and every page closes on the pre-audit CTA. A full rewrite of the 12 service descriptions is still open (see Next).
5. **Invalid markup:** step pages and legal pages rendered a second `<main>` inside the layout's `<main>`.
   - **Done:** fixed.

### Services
- **Before:** a text-only hero; grids of near-identical cards with five bullets each; a closing line that said nothing.
- **Done:**
  - The hero shows the four pillars as an isometric stack of glass planes, each listing its services, that spreads on hover.
  - Each pillar now has a sticky title with a counting index beside cards that show their parts.
  - The Ashford's Staff card and a "where to start" block lead into the pre-audit.

### Service pages (x12)
- **Before:**
  - a text-only hero
  - an old framer demo in a style that differed per page
  - "Everything inside - unpacked." with dashes
  - "Why / Outcome" boxes that looked like a template
- **Done:**
  - Every service gets a live console in its hero, built from its own data: its parts down the side, each part's steps lighting up in turn.
  - Parts and steps sit in premium cards; "Why" and "Outcome" are paired cards with the CTA; related services are linked cards.
  - The 12 different legacy demos are retired from these pages.

### Industries
- **Before:** a text-only hero and generic industry cards with a scale-on-hover icon.
- **Done:**
  - The hero is a fanned hand of the five offer cards, which opens wider on hover.
  - "Current offers" comes first, then the other industries in the shared card.

### Niche pages
- **Before:** strong hero and story, but the middle sections were plain boxes and the close was a bespoke block.
- **Done:**
  - Steps, included items, the guarantee, the investment cards and proof all use `card-x`.
  - Deltas became a "Today vs With Verdance" table card.
  - The page closes on the shared `CTABand` and its niche booking link.

### How It Works and the step pages
- **Before:** a text-only hero; a legacy `SystemDiagram` and demos; step pages laid out like a document.
- **Done:**
  - The hero is a process track: a light fills the line and each step lights as it passes.
  - The steps are cards with counting numbers, and "What you do" uses three plain cards.
  - Each step page has a progress ring (step n of six) and a card showing what you leave that step with.
  - The step pages have sticky section titles, beat cards, a "what we need" and question pair, and prev/next cards.

### Contact
- **Before:** a centred heading and the booking iframe.
- **Done:**
  - The hero is a calendar that picks a day and a time and shows the confirmation.
  - The real booking embed sits in a premium frame.
  - Direct contact links are now 44 px tap targets.

### Free pre-audit (/audit, new)
The whole site sells the pre-audit, but no page explained it.
- **Done:** a new page.
  - The hero is a sample report (reply times per channel, a "fix first" note).
  - It then covers what you leave with, three steps, an FAQ and the CTA.
  - It is in the sitemap.

### Legal
- **Before:** a bare text page with a nested `<main>`.
- **Done:** a hero with a small document stack, and the prose in a card.

## Benchmark notes
- **Linear and Raycast:** one strong product visual per hero, and type in two weights. The new `PageHero` does exactly this on every page.
- **Vercel and Resend:** gradient borders, inner light, a grid under the hero, quiet motion. That is the `card-x` and `hero-grid` treatment.
- **Basement and Locomotive:** signature moments. The channel orbit (home), the pillar stack (services), the process track (how it works) and the step ring are the site's set pieces.
- **Stripe:** the same few components everywhere. The kit replaced roughly 15 one-off section styles.

**On 3D and WebGL:** I chose CSS 3D on purpose: the orbit, the stack and the laptop. A WebGL scene in the hero would cost 150 to 250 KB of JS and mobile Lighthouse points for a visual the CSS versions already deliver. three.js and react-three-fiber are still in package.json for the legacy `visuals/Hero*` files, but no live page imports them.

## Next (not in this branch)
1. Rewrite the 12 service descriptions in the plain house voice. The data still carries jargon such as "funnel" and "nurture".
2. Fill `src/data/bestMonth.ts` with the real snapshot.
3. Remove the legacy components (`sections/v3`, `demos/*`, `visuals/Hero*`) and the `three` dependency once Daniel signs off.
4. Product pages (`/products/*`), `/packages`, `/portfolio` and `/ai-agency` still use the old system and are not linked from the main nav. Redesign them or redirect them.
