# SEO and GEO playbook

What was built, what it can and cannot do, and the work that is yours.

---

## The honest ceiling

The ask was "pop up when someone searches for AI in all areas around South Africa and the UK". Three things make the literal version of that unreachable, and it is better to know now than in four months.

**One.** "AI" as a search term is not a market you can enter. The results are owned by OpenAI, Google and Wikipedia. Nobody searching "AI" is buying anything. The searches worth winning are the ones with intent attached: *AI receptionist for dentists*, *missed call automation*, *AI agency Cape Town*, *WhatsApp automation for estate agents*.

**Two.** Local rankings are decided mostly off the website. Proximity to the searcher, a verified Google Business Profile, review volume and recency, and citations from other sites. Code changes cannot move those. What I have built is the part that makes the off-site work pay off, not a substitute for it.

**Three.** Two countries is two campaigns. Google treats a South African business and a British one as separate entities with separate proof requirements. Ranking in Manchester from a Pretoria-based operation with no UK address, no UK reviews and no UK citations is the hardest version of this problem. It is doable, but it runs on a different timeline to the local one.

**What is reachable in six months:** first page for *AI agency* plus a city name in four or five South African metros, and page one for several service-plus-industry terms nationally. The UK is a twelve to eighteen month project unless you get a UK address and UK reviews.

---

## The contradiction you have to resolve

Your own rule says no geographic location appears anywhere. Your site says `areaServed: "Worldwide"`. Local search needs the opposite: a named place, repeated, corroborated.

You cannot have both on the same surface. The split I have implemented:

- **Pitch decks stay location-free.** The rule exists so a prospect never thinks "they are not local to me". That still holds, and the pitch engine still enforces it.
- **The website names places.** Its job is to be found by someone typing a place name into a search box.

If you disagree with that split, say so, because everything below depends on it.

---

## What I changed

| Change | Why it matters |
|---|---|
| `areaServed: "Worldwide"` replaced with named countries and regions | "Worldwide" tells a search engine nothing about where to rank you. It was the single biggest on-site blocker. |
| Added `contactPoint` for both numbers, tagged `ZA` and `GB` | Tells Google you genuinely operate in both, and which number belongs to which. |
| 18 location pages at `/ai-agency/<city>`, plus an index at `/ai-agency` | The pages that can rank for "AI agency" plus a city name. Each carries `ProfessionalService` schema with a real `areaServed`. |
| `FAQPage` schema on every location page | Structured data raises AI citation rates substantially, and FAQ blocks are the format generative engines quote most readily. |
| Location pages added to the sitemap | So they get discovered. |
| `sameAs` expanded with a prioritised TODO list | One link is close to no entity signal. See below. |
| Portfolio page put back behind `noindex` | It is six "Coming soon" boxes. Indexing it would have been thin content on a page prospects reach while deciding on a five-figure quote. |

`robots.ts` already allowed GPTBot, ClaudeBot, PerplexityBot and the rest. That was good work and I left it alone.

---

## Your work, in order of impact

### 1. Google Business Profile

This is the largest single lever in local search and nothing on the website substitutes for it.

The complication: you have no shopfront. Google allows a **service area business**, which hides the street address and lists the areas you cover instead. But you still need a real address to verify against, usually by video call showing the workspace, signage and evidence of trading.

- Register the South African profile first, against a real address, as a service area business covering the metros you actually work.
- Category: *Software company* or *Marketing agency*. Pick one and do not change it later.
- The UK profile needs a UK address. Without one, UK local rankings stay out of reach and you compete nationally instead. That is a business decision, not a technical one.

### 2. Reviews

Rankings in the local pack move on review count, recency and whether the review text mentions the service and the place. You sell review automation. You are not running it on yourself.

Ask every past client. Five reviews beats zero by more than fifty beats five.

### 3. Fill in `sameAs`

In `src/app/layout.tsx`. Right now it holds one personal LinkedIn profile. Generative engines work out who you are by cross-referencing independent sources, so a single link is nearly no signal at all. In order of value:

1. Company LinkedIn page, not just your personal one
2. Google Business Profile URL, once it exists
3. Clutch profile, which is where buyers comparing agencies actually look
4. Crunchbase
5. YouTube channel

Add each URL the day the profile goes live.

### 4. One case study with a real number

This is the SEO task, the GEO task and the pricing task at the same time.

Generative engines quote specifics. "Bookings up 34% in six weeks for a dental group" is quotable. "We build AI systems" is not. It also unblocks the portfolio page, which then comes out of `noindex` and into the sitemap.

One real number does more for you right now than another ten pages.

### 5. More location pages, but only where you can write them

Fifteen South African cities and three British ones are live, covering
Gauteng, the Western Cape, KwaZulu-Natal, the Eastern Cape, the Free State,
Limpopo, Mpumalanga and North West.

`src/data/locations.ts` has the rule at the top. Google penalises doorway pages, meaning near-identical pages that differ only by a swapped city name, and that penalty can drag the whole domain down.

Every city needs a true, specific `angle` and `localContext`. If you cannot write them, do not add the city. Fifteen real pages beat forty templated ones, and forty templated ones are an active liability.

---

## GEO specifics

Getting quoted in ChatGPT, Perplexity and AI Overviews runs on slightly different rules to blue-link SEO.

- **Structured data is the strongest lever.** Schema-rich pages are cited disproportionately. Every location page now carries `ProfessionalService`, `BreadcrumbList` and `FAQPage`.
- **Write in the shape engines quote**: a direct question as a heading, then a complete answer in the first two sentences. Your FAQ voice already does this. Your headline voice did not, which is part of why the copy rewrite mattered.
- **Numbers, dates and named specifics get quoted.** Vague capability claims do not.
- **Comparison tables get quoted heavily.** A genuinely fair "AI receptionist versus answering service versus hiring someone" table would be one of the most quotable pages you could publish.
- **Being mentioned elsewhere matters more than in classic SEO**, because engines corroborate across sources before quoting. This is the same work as `sameAs` above.

---

## Measuring it

Check monthly, not weekly. Local rankings move slowly and daily checking produces noise and bad decisions.

1. **Google Search Console.** Connect it if it is not already. Watch impressions on queries containing a city name.
2. **Ask the engines directly.** Once a month, ask ChatGPT, Claude and Perplexity "who are the best AI automation agencies in Johannesburg" and write down whether you appear and what they say. That is your GEO rank tracker and it costs nothing.
3. **Google Business Profile insights**, once the profile exists: how many found you by search versus by name.

The honest first milestone is appearing at all for one city-plus-service query. Everything after that compounds.
