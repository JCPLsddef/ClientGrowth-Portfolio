# Client Growth — Redesign: Research, Direction, and Build Plan

Status: proposal v1 (research complete). Nothing in the live site has changed yet.
This document is the spec for the redesign branch. It holds the three deliverables
from the brief: (1) a cited benchmark, (2) a redesign direction mapped to the real
sections, (3) a phased build plan. Voice rules from the brief are applied throughout
(first person, no em dashes, no we/our, no hedging).

Method note: juanmora.co and velocitypartners.com both hard-block automated fetching
(HTTP 403, Cloudflare). Their detail was reconstructed from Awwwards / FWA / CSS Design
Awards listings, the authors' own writeups and open-source repos, Fonts In Use, and
search snippets of the live pages, all as observed mid-2026. Copy is quoted as found in
those sources. Live sites may have shifted since.

---

## Contents
- Part 0 — Answers to your three questions
- Part 1 — Cited benchmark (grouped by the 4 dimensions)
- Part 2 — Redesign direction (evolved brand + section-by-section)
- Part 3 — Phased build plan
- Appendix — Source list

---

# Part 0 — Answers to your three questions

## What I love about juanmora.co (so you can correct my weighting)

The thing that actually matters for Client Growth is not his palette or his Webflow
stack. It is his **copy structure**, and it happens to be the exact solution to your
two-audience problem.

Every value-prop line on his site pairs a **client outcome** with a **craft signal**, in
one sentence:

- "Creating high-end and beautiful websites built to perform and convert"
- "Building elegant and responsive projects featuring creative micro-interactions and seamless CMS hand-off"

A business owner reads "built to perform and convert." A hiring manager reads "creative
micro-interactions and seamless CMS hand-off." Same sentence, both audiences served, no
compromise. That is the single highest-value thing to steal from him, and I want to make
it the spine of your copy. [awwwards.com/sites/juan-mora-1, juanmora.co/about.html]

The other three things I love, in priority order:

1. **The feel comes from smooth scroll, not effects.** His site runs Lenis + GSAP. The
   buttery, eased scroll is roughly 80% of why it reads as premium. Ordinary fade-up
   reveals look high-craft simply because the page moves beautifully. This is cheap to
   reproduce (Lenis is a tiny, framework-agnostic library) and is the best premium-per-
   effort win available.
2. **Restraint.** Two accent colors on near-black, oversized tight-leading type doing the
   layout work, one idea per scroll beat. It looks expensive because it is disciplined.
3. **Copy-as-interaction personality.** His breakout piece literally tells you "don't
   scroll down" then animates as you do. One small playful moment that signals craft
   without a line of WebGL. [thefwa.com/cases/juan-mora-dont-scroll-down]

What I am deliberately NOT taking from him: his actual peach/blue palette (your gold
identity is better for you), and a full custom cursor (it hurts clarity on a page whose
job is booking calls).

## Any element that MUST stay (my recommendation, pending your call)

Already locked by your brief: first-person voice, gold accent, the "Growth Architecture"
words, and never inventing the `content/work.ts` assets. Beyond those, here is what I
think is genuinely worth preserving versus opening up. I am asking you to confirm in chat.

Strongly recommend keeping (these are doing real work):
- The **guarantee / risk-reversal** ("If I do not produce a measurable result in your
  first 90 days, you stop paying."). Best-in-class. Do not touch the promise.
- The **proof layer and its TODO-gating** in `content/work.ts`. It is the reason nothing
  fake ever ships. The redesign builds on it, it does not replace it.
- The **scarcity line** ("maximum of three Partnership clients").
- The **"ad spend goes straight to Google, never to me"** line. It kills the biggest
  local-owner fear and is currently buried. I want to promote it, not cut it.
- **CountUp on the proof stats.** It is the Linear/Stripe playbook done right already.

Open to replacing (your call, see questions):
- The **gradient orb hero**.
- The **Founder parallax monogram reveal** (the 230vh scroll-linked section).
- The **KnightLogo three.js mark**.
- The **single long-page structure** (vs adding a dedicated Work index + case studies).

Dead code I will remove regardless: `components/Hero.tsx` is unused (the live hero is
`components/ui/herowith-logos.tsx`).

## Other sites worth adding to the benchmark (suggestions)

The set you picked is strong. Three I would add, each for a specific gap:
- **Igloo Inc / Lusion / Resn** — if you want one more reference for a *contained* 3D
  craft moment that is not a full Bruno-style game.
- **Family / Studio Lovelock / Cosmos** — tighter, copy-forward studio sites that sit
  between juanmora and Velocity (good for the dual-audience tone).
- **Attio or Linear's /method and /customers pages** — best-in-class for turning proof
  and process into scannable, premium B2B layout (directly useful for your Work + How I
  think sections).

If you have any sites *you* return to, send them. Otherwise I will pull from these only
where they fill a gap the current eight do not.

---

# Part 1 — Cited benchmark (the patterns worth stealing)

Each pattern: source + URL, why it works, how to rebuild it in your stack (Next 15 App
Router, Tailwind v3, Framer Motion v11, hand-built, three.js 0.171 used sparingly).
WebGL-dependent patterns are flagged OPTIONAL with a lean adaptation.

## 1. Motion and interaction

**1.1 Smooth-scroll spine (Lenis).** Source: juanmora.co (Lenis + GSAP), Locomotive
(Locomotive Scroll, now Lenis-based). [locomotive.ca, github.com/darkroomengineering/lenis]
Why: eased momentum scrolling is the largest single contributor to a "premium" feel;
it makes plain reveals read as high-craft. Rebuild: add `lenis` in a root client
component, RAF-drive it, let Framer `useScroll` / `whileInView` ride on top. Gate off for
`prefers-reduced-motion` and coarse pointers. Do NOT add Locomotive Scroll itself (fights
Next hydration and a11y). This is the #1 low-effort win.

**1.2 Staggered hero load sequence.** Source: brittanychiang.com / `bchiang7/v4` (anime.js
SVG logo line-draw, then 100ms-staggered fade-up); Active Theory / Unseen branded
preloader (counter 00→100, clip-path reveal). [github.com/bchiang7/v4, awwwards.com/sites/active-theory-v6]
Why: signals craft in the first two seconds. Rebuild: SVG draw via `motion.path`
`initial={{pathLength:0}} animate={{pathLength:1}}`; hero items via a parent with
`variants` + `staggerChildren: 0.1`, children `{opacity:0, y:20} -> {opacity:1, y:0}`.
Keep any preloader under ~1.2s and skippable (business buyers will not wait).

**1.3 Magnetic CTAs + lerp cursor.** Source: Cuberto (documented: cursor `speed 0.7`,
`ease expo.out`; magnetic buttons translate toward pointer). [cuberto.com/tutorials/27,
github.com/Cuberto/mouse-follower] Why: rewards cursor movement, makes CTAs feel
intentional, highest craft-per-line for hiring managers. Rebuild: magnetic button wrapper
measures `getBoundingClientRect()`, sets `x/y` motion values to `delta * 0.3`, springs
back on leave. Their lerp is exactly `useSpring`. FLAG: skip the full custom cursor on the
sales path; magnetic buttons give 80% of the effect with none of the conversion risk.

**1.4 Spotlight cursor field.** Source: brittanychiang.com current site (a fixed
radial-gradient div follows the pointer over a dark page). [brittanychiang.com] Why: adds
depth and life to flat dark sections at near-zero cost. Rebuild: `onMouseMove` sets CSS
vars `--x/--y`; overlay `pointer-events-none fixed inset-0` with
`radial-gradient(600px at var(--x) var(--y), rgba(212,168,83,0.06), transparent 80%)`.
Gate on `(pointer:fine)` and reduced-motion.

**1.5 Scroll-reveals and count-ups as the only "wow."** Source: Linear word-illumination,
general 2026 craft writeups. [framer.com/blog/text-animations] Why: motion is read as a
signal of quality, but only when it serves comprehension. You already do this well
(`Reveal`, `BlurText`, `CountUp`, all reduced-motion aware). Keep stagger small (~0.08s).
Do not animate body paragraphs or add carousels.

**1.6 Hover-preview index + drag-to-browse work.** Source: Unseen "World" / index hover
previews; Locomotive drag navigation. [unseen.co/projects, awwwards.com/sites/unseen-studio]
Why: a tactile, exploratory view of work that feels like an object you handle. Rebuild:
`Link` rows, on `onMouseEnter` set active index, render one absolutely-positioned
`motion.img` that follows the cursor via `useSpring` and crossfades between projects.
Drag grid via Framer `drag="x"` with `dragElastic={0.08}`. WebGL-free.

**1.7 Clip-path page transitions.** Source: Cuberto masked transitions; Unseen menu
effects. [awwwards.com/inspiration/cuberto-typography-transition] Why: routes feel
authored, not loaded. Rebuild: App Router `template.tsx` with `AnimatePresence`, animate a
charcoal panel `clipPath` `inset(100% 0 0 0)` -> `inset(0 0 0 0)` -> `inset(0 0 0 100%)`.

**1.8 Contained 3D craft moment (not a 3D site).** Source: bruno-simon.com (Three.js +
Cannon.js car game; MatCap materials, no lights, baked shadows, Draco glTF). [bruno-simon.com,
github.com/brunosimon/folio-2019] Why: the medium proves the capability. FLAG:
HIGH-EFFORT / OPTIONAL. Lean adaptation: one lazy-loaded gold `MeshMatcapMaterial` object
(coin/medallion/abstract form), slow auto-rotate + subtle pointer parallax, behind
reduced-motion. Uses the three.js 0.171 already installed, respects "sparingly."

## 2. Visual design

**2.1 Two-typeface restraint.** Source: Locomotive (Editorial New + Helvetica Now + a
custom identity face, 4 styles total). [fontsinuse.com/uses/61459, pangrampangram.com]
Why: extreme type restraint reads as confidence. Rebuild: lock to one display/grotesk +
one editorial serif for pull-quotes + numerals, max ~4 weights, via `next/font`. Drop the
unused Anton; consider retiring one of the current four families.

**2.2 Oversized, tight-leading display type as layout.** Source: juanmora.co,
brittanychiang.com (`clamp()` scale). Why: big type does the spacing work and sets a
manifesto tone. Rebuild: `text-[clamp(2.5rem,8vw,7rem)] font-medium tracking-[-0.03em]
leading-[0.95]`. Your hero already uses `clamp(40px,7vw,84px)`; push it further.

**2.3 Charcoal elevation layers.** Source: brittanychiang.com tokens (navy / light-navy /
lightest-navy for surface elevation). [github.com/bchiang7/v4] Why: a 3-tier dark palette
gives depth without color. Rebuild: add `night-900/800/700` tokens; current dark is flat
(`#0D0B09` / `#14110D`). Map green->gold, navy->charcoal.

**2.4 Numbered editorial sections + index lists.** Source: Locomotive, Unseen ("01 Index,
02 Projects, 03 Contact, 04 World"), brittanychiang.com ("01. About"). [unseen.co] Why:
numbering signals a considered, ordered argument and chunks a long page. Rebuild:
`<span className="font-mono text-gold">01</span>` + a trailing `flex-1 h-px bg-night-700`
rule. Costs nothing.

**2.5 Single-accent discipline + cream/night band rhythm.** Source: juanmora.co restraint,
Linear/Stripe premium-by-restraint. Why: if only CTAs, stat numbers, and the one guarantee
sentence glow gold, the eye is guided straight to conversion points. Rebuild: keep gold off
body text; keep the alternating cream/white/night section backgrounds you already have.

**2.6 Bento progressive disclosure for a dense offer.** Source: Stripe 2026 redesign
("bento grid... hover-over modals for progressive disclosure"; Katie Dill: "a homepage
is a manifesto"). [summify.io/discover/how-stripe-built-their-new-website-ypzNhw] Why: a
grid shows a multi-part offer without a wall of text. Rebuild: the Growth Architecture
five parts as a bento (one oversized "Conversion Website" tile + four smaller), detail on
hover/tap. Words stay locked, layout changes.

## 3. Copy and messaging

**3.1 Dual-audience line formula (the crown jewel).** Source: juanmora.co value-prop
lines (outcome verb + craft detail). Why: solves the clients-vs-hiring-managers split in a
single sentence. Rebuild: make it the rule for every headline and value line: client
outcome + the craft that delivers it, first person, under 3 lines, zero glossary words.

**3.2 Confident, human voice.** Source: Velocity Partners "10 principles of writing"
("You don't have to be loud, but you do have to be confident." / "Just try to sound like a
human." / "if it's going over 3 lines... it's way too long."). [velocitypartners.com/blog/10-principles-of-writing-at-velocity]
Why: confidence + plain speech reads as competence to both audiences. Rebuild: enforce the
3-line rule sitewide; add one contrarian one-liner to `Reframe` (e.g. "Most marketing buys
you clicks. Clicks do not call you back.").

**3.3 Hero headline = outcome + audience self-selection; subhead carries the mechanism.**
Source: KlientBoost / Primer hero formulas; Linear. [klientboost.com/landing-pages/landing-page-headlines,
goprimer.com/blog/the-winning-hero-section-formula] Why: the right visitor self-selects in
one second. Rebuild: keep "Become the obvious choice in your market." Tighten the subhead
from ~45 words to under 25; move the mechanism (website + visibility + follow-up) to a
caption under the CTAs.

**3.4 First-person, specific CTA microcopy + friction-killer.** Source: Aagaard/Unbounce
first-person test (+90% on "Start my free..."). [blog.powr.io/5-tips-for-writing-effective-microcopy-for-cta-buttons-examples]
Why: first-person voices the user's intent; a friction-killer removes the last objection.
Rebuild: test "Get my free Visibility Audit"; add "Takes 2 minutes. No call required. I
reply within 24 hours." under the hero CTA.

**3.5 One-line mission / identity formula.** Source: cassie.codes ("A front end developer
trying to make the web more whimsical again, one SVG at a time."). [cassie.codes] Why: a
single sentence with a point of view is memorable. Rebuild: a CG version, e.g. "I help
local businesses become the obvious choice online, one high-craft system at a time."

## 4. Structure and flow

**4.1 Work-first for craft, long-form for conversion (the dual path).** Source: Unseen IA
(Index -> Projects -> Contact -> World, a linear buyer path plus an exploratory path);
Velocity long-form sales structure. [unseen.co] Why: this is your exact problem solved.
Rebuild: keep the long-form home as the conversion spine for local clients; add a dedicated
`/work` index + richer case studies for hiring managers; a secondary nav entry can point
craft-curious visitors there.

**4.2 Uniform case-study template.** Source: Locomotive (one rich-content scaffold, bespoke
media per project). [awwwards.com case "Reinventing Locomotive"] Why: consistency speeds
comprehension and signals process discipline. Rebuild: one `<CaseStudy>` component with
slots (hero, challenge, approach, build, result metric, gallery, next-project). Your Triple
W page becomes the first instance.

**4.3 Proof sequencing: aggregate metric, then stories, then proof beside every CTA.**
Source: NanoGlobals/Growbo (lead with a volume metric), Instapage/SaaS Hero (social proof
above fold and below CTAs, "+68%"). [saashero.net/content/landing-page-social-proof-examples]
Why: an aggregate number answers "can they do this?" instantly; per-CTA proof removes risk
at the decision moment. Rebuild: you lead `Proof` with a 4-stat band already; add a
one-line testimonial directly above the `AuditForm` in `FinalCTA` (currently none).

**4.4 Two-tier pricing, one flagship, scarcity, soft fallback.** Source: Growbo productized
pricing; Linear/Stripe dual CTA. [growbo.com/pricing-page-examples-productized-services]
Why: two options reduce paralysis; scarcity is believable for a solo operator; the soft
fallback catches the not-ready buyer. Rebuild: your `Pricing` already does this; promote
the "ad spend goes to Google" de-risk line to its own gold-accented line.

**4.5 Risk reversal as its own section in the buyer's language.** Source: River guarantee
templates; Conversion Sciences. [rivereditor.com/blogs/guarantee-risk-reversal-paragraphs-remove-90-percent-objections]
Why: transfers risk exactly when price is on the table. Rebuild: keep `RiskReversal` right
after `Pricing` (already correct); add one more quoted objection ("How long until I see
something?").

---

# Part 2 — Redesign direction

Direction in one line: **evolve the charcoal/gold brand into a confident editorial system
where smooth motion and oversized type do the work, every line serves both audiences at
once, and the long-form sales page gains a craft-grade Work wing.**

This is an evolution, not a reskin. The identity (gold, voice, proof discipline, the
Growth Architecture words) is preserved. What changes is the type system, the motion
language, the depth of the dark palette, the offer's layout, and the addition of a real
Work section.

## The evolved brand

- **Type.** Tighten to a 2-3 family system. Display/grotesk for headlines (push the
  oversized clamp scale and tight tracking), one editorial serif reserved for pull-quotes
  and the founder voice, numerals tabular for stats. Drop unused Anton. (Specific families
  to be confirmed in build Phase 0.)
- **Color depth.** Keep marble creams and gold. Add charcoal elevation layers
  (`night-900/800/700`) so dark sections gain depth without a second color. Gold stays the
  single accent on CTAs, stat numbers, and the guarantee line only. (Optional lever: one
  very sparingly used cool secondary, juanmora-style, only if you want it.)
- **Motion language.** Lenis smooth-scroll spine; staggered hero load; magnetic CTAs;
  a subtle spotlight field on dark sections; clip-path route transitions; reveals and
  count-ups as today. Everything reduced-motion gated. No custom cursor on the sales path.
- **Layout language.** Numbered editorial section labels; oversized type as layout; a
  two-column sticky pattern available for the Work and About areas; bento for the offer.

## Section-by-section

- **Nav.** Editorial, numbered feel. Dual-audience links (Work / Services / About / For
  hiring teams). Sticky "Get my free Visibility Audit" appears after the hero scrolls out.
- **Hero.** Keep the charcoal-to-gold depth and the headline "Become the obvious choice in
  your market." Push the type bigger and tighter. Add the staggered load sequence and
  magnetic CTAs. Tighten the subhead to under 25 words; move the mechanism to a caption.
  First-person CTA + friction-killer. Replace or evolve the orb (pending your call).
- **SocialProof.** Keep the immediate trust hit. Restyle to the new type scale.
- **Problem / Reframe.** Enforce the 3-line rule. Add one contrarian Velocity-style line.
- **Proof + Work.** Keep the aggregate stat band and CountUp. Rebuild the Work grid as an
  alternating 12-col editorial grid with grayscale-to-color hover (Chiang), and add a
  dedicated `/work` index with a hover-preview list. Case studies move to one uniform
  template.
- **How I think.** Restyle as the recruiter-facing craft argument; this is where the
  hiring-manager audience is explicitly served. Numbered, editorial.
- **Growth Architecture.** Words locked. Restyle as a Stripe-style bento (one oversized
  Conversion Website tile + four smaller, detail on hover/tap).
- **How it works.** Tighten copy; keep the 3-step clarity.
- **Founder.** Keep the "you get me" message and the Laval/3-clients facts. Evolve or keep
  the parallax monogram (pending your call). Editorial serif for his voice.
- **Pricing.** Keep two tiers, flagship, scarcity. Promote the "ad spend goes to Google"
  line to its own gold-accented line.
- **RiskReversal.** Keep the promise and dark-card treatment. Add one more quoted objection.
- **FAQ.** Restyle accordion to the new system.
- **FinalCTA.** Add a one-line testimonial above the form. First-person CTA + friction-killer.
- **Footer.** Restyle to editorial; keep the giant wordmark.

---

# Part 3 — Phased build plan

Each phase is shippable and reviewable on the Vercel preview for this branch/PR. I will
stop at each checkpoint for your review before continuing. Nothing merges to main without
your explicit go-ahead.

**Phase 0 — Foundation (low visual risk).**
- Add Lenis smooth-scroll provider (RAF, reduced-motion + touch aware).
- Establish design tokens v2: charcoal elevation layers, refined type scale and easing,
  confirm the 2-3 font families. Remove unused Anton and dead `components/Hero.tsx`.
- Add reusable primitives: `MagneticButton`, `Spotlight`, `SectionLabel` (numbered),
  `WordReveal` (clip-path mask-up). Extend `Reveal` if needed.
- Checkpoint: preview shows smooth scroll, new tokens, no visual regressions.

**Phase 1 — Hero + Nav (first impression).**
- Evolve the hero per the direction: bigger/tighter type, staggered load, magnetic CTAs,
  tightened subhead + mechanism caption, first-person CTA + friction-killer. Resolve the
  orb decision.
- Editorial numbered nav with post-hero sticky CTA.
- Checkpoint: preview.

**Phase 2 — Proof + Work wing (the dual-audience core).**
- Rebuild the Work grid (alternating 12-col, grayscale-to-color hover). Add `/work` index
  with hover-preview list. Refactor the case study into a uniform `<CaseStudy>` template
  (Triple W as first instance). Keep CountUp and stat band.
- Checkpoint: preview (this is the phase hiring managers judge).

**Phase 3 — Offer + thinking.**
- Restyle Growth Architecture as a bento (words locked). Restyle How I think and How it
  works. Apply the 3-line copy rule and the dual-audience line formula across these.
- Checkpoint: preview.

**Phase 4 — Founder + conversion close.**
- Founder (resolve monogram decision), Pricing (promote the Google-ad-spend line),
  RiskReversal (add objection), FAQ restyle, FinalCTA (testimonial above form,
  first-person CTA).
- Checkpoint: preview.

**Phase 5 — Motion polish + a11y/perf + go-live.**
- Clip-path route transitions. Optional contained MatCap 3D moment. Spotlight on dark
  sections. Full reduced-motion, focus, and layout-shift audit. Review performance on the
  preview together.
- Checkpoint: final review, then merge to main on your explicit confirmation.

---

# Appendix — Source list

Portfolios: awwwards.com/sites/juan-mora-1; juanmora.co/about.html;
thefwa.com/cases/juan-mora-dont-scroll-down; github.com/bchiang7/v4; brittanychiang.com;
v4.brittanychiang.com; bruno-simon.com; github.com/brunosimon/folio-2019;
thefwa.com/cases/bruno-simon-portfolio; cassie.codes; cssdesignawards.com/sites/cassie-codes.

Studios: cuberto.com; cuberto.com/tutorials/27; github.com/Cuberto/mouse-follower;
locomotive.ca; fontsinuse.com/uses/61459; pangrampangram.com/blogs/font-in-use/locomotive;
v6.activetheory.net; awwwards.com/sites/active-theory-v6; thefwa.com/cases/active-theory-v6;
unseen.co; unseen.co/projects; awwwards.com/sites/unseen-studio;
github.com/darkroomengineering/lenis.

Sales / conversion: velocitypartners.com/blog/10-principles-of-writing-at-velocity;
velocitypartners.com/blog/mastering-tone-of-voice-in-b2b-content-marketing;
klientboost.com/landing-pages/landing-page-headlines; goprimer.com/blog/the-winning-hero-section-formula;
linear.app; blog.powr.io/5-tips-for-writing-effective-microcopy-for-cta-buttons-examples;
instapage.com/blog/landing-page-social-proof-marketing; saashero.net/content/landing-page-social-proof-examples;
nanoglobals.com/productized-service-websites; growbo.com/pricing-page-examples-productized-services;
rivereditor.com/blogs/guarantee-risk-reversal-paragraphs-remove-90-percent-objections;
conversionsciences.com/eliminate-risk-and-bump-your-lead-conversion-rate;
summify.io/discover/how-stripe-built-their-new-website-ypzNhw; framer.com/blog/text-animations.
