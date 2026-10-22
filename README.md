# 91112.com — World Emergency & Safety Hub

Emergency numbers for 193 countries, first-aid and preparedness guides, free safety tools, lead generation, donations, contests and careers. Built for GitHub Pages (free plan) using its native Jekyll build — no Actions or paid services needed.

## Structure
| Path | What it is |
|---|---|
| `_layouts/default.html` | Shared page shell: owner bar, emergency strip, header, AdSense script, footer |
| `_layouts/country.html` | Template for every country page |
| `_data/countries.json` | Emergency-number dataset (193 countries) — edit numbers here |
| `numbers/*.html` | One tiny stub per country (`iso:` in front matter) |
| `first-aid/`, `prepare/`, `tools/` | Guides and interactive tools |
| `assets/js/config.js` | Payment links, donation goal, encoded form relay key |
| `assets/js/chrome.js` | Full footer, lead-gen blocks, consent banner, mobile call bar |
| `assets/js/main.js` | Country detection, search, forms, tools, video embeds |
| `sitemap.xml`, `robots.txt`, `ads.txt` | SEO + AdSense files |

## Operating notes
- **Forms**: every form posts through an encoded relay key in `config.js`; the owner inbox address never appears in the source or on screen. The first submission triggers a one-time FormSubmit activation email — confirm it once.
- **Payments**: paste PayPal / Stripe / Buy Me a Coffee / Razorpay links into `config.js` to switch the Support page from pledges to instant checkout.
- **Custom domain**: point DNS at GitHub Pages (A records 185.199.108.153, .109.153, .110.153, .111.153; `www` CNAME `webworksa1.github.io`), then add `91112.com` under Settings → Pages → Custom domain and enforce HTTPS.
- **AdSense**: `ads.txt` and the site-wide script are in place; enable Google's certified CMP (Privacy & messaging) for EEA/UK traffic.
- See `RESEARCH.md` (research + 25-site benchmark) and `PROMPTS.md` (phase-wise build prompts).

Owner / domain / sponsorship inquiries: https://web.works/contact
