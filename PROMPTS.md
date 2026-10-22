# 91112.com — Phase-wise Build Prompts

Concept: **91112 — World Emergency & Safety Hub** (911 + 112). Static HTML/CSS/JS on GitHub Pages (free) using Pages' native Jekyll build for shared layouts and data-driven country pages. AdSense `ca-pub-6620975821265271`. Every form submits to the owner inbox through an encoded relay — the address must never appear in source or on screen. Every page carries the owner bar linking to https://web.works/contact.

---
## Phase 1 — Foundation & compliance
> Create the site shell as a Jekyll layout (`_layouts/default.html`): meta title/description, canonical, OG/Twitter, JSON-LD, Google Fonts (Archivo, IBM Plex Sans/Mono), and the AdSense script `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6620975821265271" crossorigin="anonymous"></script>`. Top of every page: "Contact, if you are interested in this website/domain name/Sponsorship/Advertisement/Partnership" → web.works/contact; below it a red strip "In an emergency call [local number] — not an emergency service". Sticky header, mobile menu, dark mode, legal footer, cookie-consent banner (Essential only → non-personalised ads). Add `ads.txt`, `robots.txt`, Liquid `sitemap.xml`, manifest, favicon. Use only relative links (`page.root`) so the site works under `/91112-com/` and on the apex domain.

## Phase 2 — Data layer
> Build `_data/countries.json` (193 countries: name, ISO, region, single/police/ambulance/fire, note, m112, m911, slug) from Wikipedia's emergency-number list and national sources; expose it to the browser via a Liquid-generated `assets/js/countries-data.js`. Detect the visitor's country from timezone, then browser locale; allow manual override saved to localStorage. Paint the number into the header strip, hero dial and sticky mobile "Call" button (tel: links).

## Phase 3 — Core pages
> Home (hero dial + country search + stats + why-91112 + first-aid grid + lead form + preparedness + tools + videos + support/contests/careers + FAQ). `numbers.html` (search, region filters, full table, A–Z links). One SEO page per country from `_layouts/country.html` (numbers, 112/911 compatibility, "what to say when you call", FAQ + breadcrumb schema, nearby countries, correction link, last-checked date). `the-number-91112.html` explainer (history, people, business, economy, AI, culture).

## Phase 4 — Content (AdSense-grade, original, YMYL-safe)
> Write 15 first-aid guides (CPR, choking, stroke, heart attack, bleeding, burns, seizures, anaphylaxis, recovery position, heatstroke, hypothermia, poisoning, drowning, fractures/head injury, low blood sugar) and 12 preparedness guides (kit, family plan, earthquake, flood, wildfire, cyclone, home fire, power outage, travel, seniors, teaching kids, workplace plan). Each: emergency callout, numbered steps, do/don't, when to call, embedded video where available, TOC, related links, last-reviewed note, Article schema, lead block. Hub pages with filter.

## Phase 5 — Interactive tools
> Kit builder (home/go-bag/car/baby/pet, progress ring, print), readiness quiz (score + gaps + lead CTA), ICE card maker (print), travel emergency card (multi-country, print), CPR metronome (110 bpm audio + vibration), stroke onset timer with BE FAST checklist, emergency phrase card (10 languages), gated family-plan template (email unlock = lead magnet).

## Phase 6 — Lead generation (dedicated)
> `get-protected.html`: 3-step form (needs chips → details → contact + consent), progress bar, trust badges, referral disclosure; compact quick-quote block injected on home, guides, numbers and tools; URL prefill (`?need=medical-alert`). Categories: medical alert, home security, CPR training, AED, workplace plan, kits, travel insurance, preparedness consult. Submit via `fetch` to the relay assembled from encoded parts in `config.js`, honeypot anti-spam, redirect to `thank-you.html` (noindex, no ads).

## Phase 7 — Revenue & community
> `support.html` (tiers $5/$25/$100/$250, frequency, purpose: operations / promotion / hiring / contests / school programme, goal bar, PayPal/Stripe/BMC/Razorpay links from config else pledge form). `contests.html` (3 categories, entry form, sponsor CTA, official rules incl. minors handled via adults). `careers.html` (reviewers, writers, translators, verifiers, video, partnerships + application form). `advertise.html` (sponsored guide, country sponsorship, lead partnership, contest/school sponsorship, media-kit form, domain-acquisition pointer). `videos.html` (category filter, click-to-load privacy-enhanced YouTube).

## Phase 8 — Trust, legal, AdSense readiness
> About + editorial policy, contact, report-correction, privacy & cookies (AdSense/Google partner disclosure, opt-out links, GDPR/CCPA/DPDP rights), terms, medical disclaimer, trademark & copyright disclosure (911/112 used descriptively; no affiliation with ITU/NENA/EENA/governments/Red Cross; no trademark claimed in "91112"), HTML sitemap. No emblem-like symbols (no red cross, no Star of Life). Ads off thank-you and 404.

## Phase 9 — QA
> Headless-browser checks: no JS errors, no horizontal scroll at 390px, forms submit, quiz/tools work, internal links resolve, owner bar on every page, the inbox address appears nowhere in the repo output.

## Phase 10 — Deploy & grow
> Push to `WEBWORKSA1/91112-com`, enable Pages (branch deploy), add custom domain 91112.com once DNS points to GitHub (A: 185.199.108–111.153; www CNAME webworksa1.github.io), enforce HTTPS, submit sitemap to Search Console, apply to AdSense, enable Google's certified CMP for EEA/UK. Growth: add languages (es, fr, hi, ar, pt), medical-reviewer bylines, monthly country re-verification, school outreach, sponsor sales.
