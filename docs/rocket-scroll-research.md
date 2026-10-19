# Rocket scroll research

October 2026. What the best scroll-driven storytelling sites do, especially rocket and launch themes, and what we took for the home page "flight" (src/components/home/flight/).

## What we looked at

| Reference | What it is | What makes it premium | What we took |
|---|---|---|---|
| [Apple product pages (AirPods Pro, iPhone)](https://www.apple.com/airpods-pro/), technique write-ups at [CSS-Tricks](https://css-tricks.com/?p=308477) and [Setproduct](https://www.setproduct.com/blog/how-to-3d-animate-scroll) | A tall scroll container with a sticky, full-screen stage. Scroll progress picks the frame. | One thing on screen at a time. The page "holds" while the story moves. Short lines of big type. Nothing hijacks the scroll bar, it is native scroll plus `position: sticky`. | The pinned stage: a tall section with a sticky 100svh scene, scrubbed by native scroll. Big type, three short lines. |
| [SpaceX (unofficial design-system read)](https://open-design.ai/plugins/design-system-spacex/) | One full-screen scene per section over photography. | Near-black canvas, a faintly blue "starlight" white for text, bold geometric type, zero drop shadows, imagery does the work. | Space stays near-black with a blue-white ink. No card shadows inside the flight. |
| [Helix Earth, "rocket launch with scroll" (Awwwards inspiration)](https://www.awwwards.com/inspiration/scroll-triggered-animation-mouse-effects-helix-earth), site [helixearth.com](https://www.helixearth.com/for-investors.html) by OctoTEK | Investor page where a launch is tied to scroll. | The launch is the metaphor for the pitch, not decoration. | Map the flight to how we work, stage by stage. |
| [Apsis Aerospace scroll scrub (Kombai gallery)](https://kombai.com/gallery/animations/scroll_scrub_aerospace/) | Fixed canvas drawing about 144 AVIF frames, sections scroll over it, a HUD (frame counter, progress rail) reads the same progress value. | The HUD makes scroll feel like a throttle. | A slim mission HUD: three segment progress bar (Launch, Ascent, Orbit) driven by the same progress. We did not copy the frame sequence: 144 frames is megabytes, and we need well under 2 KB of SVG. |
| [Stripe Connect spaceship, recreated by Benjamin Reid](https://codepen.io/benjaminreid/pen/MBVjPd) | Inline SVG ship, flame is its own path animated around its own origin (Web Animations API). | Crisp vector, the flame alone flickers, the ship barely moves. Restraint. | Our rocket is one inline SVG; only the flame group and the jet scale. |
| [Layered star parallax pen (JDoe)](https://codepen.io/JDoe/pen/QxvgOZ) | Three star layers moving at different speeds. | Cheap depth: three flat layers read as a deep sky. | Three star layers, each one `translate3d` at its own rate. |
| [Codrops: Camera fly-through on scroll with Theatre.js and R3F](https://tympanus.net/codrops/2023/02/14/animate-a-camera-fly-through-on-scroll-using-theatre-js-and-react-three-fiber/), [14islands r3f-scroll-rig](https://gittrend.io/repo/14islands/r3f-scroll-rig) (MIT) | Real 3D, camera on a path tied to scroll. | True depth, cinematic. | Rejected for us: three.js plus R3F is about 150 KB+ gzipped and a GPU cost on mid-range Android, against a 85+ Lighthouse budget. We fake depth with layers instead. |
| [Codrops: practical intro to CSS scroll() and view()](https://tympanus.net/codrops/?p=75216), [Josh Comeau on animation-timeline](https://joshwcomeau.com/animation/scroll-driven-animations), [scroll-driven-animations.style by Bramus](https://scroll-driven-animations.style) (Apache 2.0), [MDN view()](https://developer.mozilla.org/docs/Web/CSS/animation-timeline/view) | Native scroll-linked animation, off the main thread. | Smooth under CPU load. Linear easing feels best when tied to the finger. | Linear mapping from scroll to position, eased only inside each stage. Native timelines are not yet in stable Firefox, so we use one passive scroll listener writing transform and opacity (works everywhere, measured below). |
| [Motion scroll() docs](https://motion.dev/docs/scroll) (MIT, already in the repo) | Scroll progress callback, uses ScrollTimeline when it can. | | Kept for the hero rocket. The flight uses a 40-line listener so it costs no extra bundle. |
| [Chrome scroll-driven animations course](https://developer.chrome.com/blog/scroll-driven-animations-video-course) | 10 episodes, including 3D on scroll. | | Background on performance: write only transform and opacity, avoid layout reads in the frame. |
| [GSAP ScrollTrigger](https://gsap.com/community/standard-license/) | The industry default for pinning and scrubbing. | | Not added. Licence is free ("Standard No Charge", Webflow, 2025) but forbids building tools that compete with Webflow, and the brief says only bundle a library if it pays its weight. Sticky CSS does the pinning for free. |
| Skills: [frontend-design (anthropics/skills)](https://skillselion.com/skills/xenitv1/claude-code-maestro/frontend-design) (installed), [scroll-animations (dylantarre)](https://skillselion.com/skills/dylantarre/animation-principles/scroll-animations), [gsap-framer-scroll-animation (github/awesome-copilot)](https://claudemarketplaces.com/skills/github/awesome-copilot/gsap-framer-scroll-animation), [motion-web-design](https://skills.sh/motionharvest/agent-skills/motion-web-design) | Agent skills for scroll work. | | Used the installed frontend-design skill's rules (commit to one direction, restraint, typography first). Did not install the third-party ones: one listing carried a high-risk audit flag, and they mostly wrap GSAP, which we chose not to add. |
| [21st.dev Launch Vehicle (MIT)](https://21st.dev/@timmikeladze/components/launch-vehicle.md) | Two-stage SVG rocket with stage separation. | Stage separation is a satisfying "click" moment. | The idea only: our first stage drops away as you move from Ascent to Orbit. Our own SVG. |

## What makes these feel premium

1. **The page holds still while the story moves.** Sticky stage, native scroll, no scroll-jacking.
2. **A story in a few stages,** each with one short line. Three is the number people remember.
3. **Depth from layers,** each moving at its own speed: far stars, near stars, cloud wisps that rush past, a horizon that falls away and curves into a planet.
4. **The sky changes as you climb:** dusk blue at the pad, then black space with the Earth's rim and a thin blue line of atmosphere.
5. **One "click" per stage:** a stage lock (the HUD segment fills, the label brightens), stage separation, engine cut at orbit. Those give the haptic feel without real vibration (browsers block vibrate without a tap, and it would log a warning).
6. **Restraint:** one moving hero object, no shadows in space, big type, lots of empty sky.
7. **Performance:** transform and opacity only, layers promoted once, geometry measured on resize never in the frame, nothing animates when the section is off screen.

## Licences

No code was copied from any reference. Ideas only. Everything in the flight is our own SVG and CSS. Libraries used are already in the repo (motion 12.38.0, MIT).

## How the rocket maps to Verdance

| Stage | Picture | Words |
|---|---|---|
| 1 Launch | Rocket clears the pad, dusk sky, the tower falls away | We look at how your business runs. |
| 2 Ascent | Clouds rush past, the sky goes dark, the first stage drops away | AI starts doing the work: answering, following up, admin. |
| 3 Orbit | Engine off, black space, the Earth's rim, three small lights circle | It runs day and night. Then "Watch it work" shows it. |
| 4 You stay in control | The existing "You stay in control" section and the final button | One main button, same words as the hero. |

## Rocket redesign v3 (October 2026)

Ideas only, nothing copied.

| Reference | What we took |
|---|---|
| [SpaceX Falcon 9](https://www.spacex.com/vehicles/falcon-9/) | Believable two-stage proportions (about 12:1), ogive fairing, dark interstage, grid fins, folded legs, three visible engine bells. |
| [Smithsonian NASM: Falcon 9 grid fin](https://airandspace.si.edu/collection-objects/grid-fin-rocket-launch-vehicle-falcon-9/nasm_A20220607000) | The lattice fin as the one piece of hardware that says "real rocket" at a glance. |
| [Apple product pages (iPhone Pro titanium)](https://www.apple.com/iphone/) | One studio-lit object: brushed titanium white, crisp key highlight, soft fill strip, cool rim light; space grey hardware; a single hairline accent; motion that is scrubbed exactly by scroll, slow and weighted, with one confident moment. |

What changed in the flight: the rocket is about 1.35 to 1.5 times bigger, a sky boundary the rocket breaks through at 48% (collar of light, soft wash, then everything slows), near cloud layers pass in front of it, a gentler stage separation, and a single burst at 87% (core flash, two shockwave rings, shock diamonds, a light wash and a short damped nudge) before the hand-off. v5 replaced the drawn hull with a photoreal render (see below); only the plumes are inline SVG.

## v5: photoreal rocket and real space (October 2026)

- Rocket: our own render, generated on Higgsfield (titanium white, azure hairline, V on the fairing), upscaled to 4K, black background keyed to alpha by `scripts/assets/key-rocket.mjs` and split at the interstage for stage separation. Built to AVIF/WebP by `npm run flight:images`.
- Space: the night side of the Earth with its glowing limb, photographed from the ISS (NASA iss072e340644, public domain; see docs/image-credits.md). It rises into view after the break-through. On desktop the scene's layers follow the pointer at different depths (look-around); phones get the still image.
- No 3D globe: a lazy three.js Earth would cost about 150KB of script and main-thread time for little gain over the photo, so it was left out to protect the speed score.
