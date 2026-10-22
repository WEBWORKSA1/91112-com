# 91112.com — World Emergency & Safety Hub

Emergency numbers for 193 countries, first-aid and preparedness guides, and free safety tools. Static site for GitHub Pages (free plan).

- **Edit content**: `build/firstaid.py`, `build/prepare.py`, `build/pages.py`, `build/tools.py`, then run `python3 build/build.py` (needs Python 3.12+ and Node).
- **Country data**: `assets/js/countries-data.js`.
- **Payments / donation goal**: `assets/js/config.js` (paste PayPal / Stripe / Buy Me a Coffee / Razorpay links).
- **Forms** post through an encoded relay key in `config.js`; the first submission triggers a one-time FormSubmit activation email to the owner inbox — confirm it once.
- **Custom domain**: point DNS (A records 185.199.108.153 / .109 / .110 / .111; `www` CNAME `webworksa1.github.io`), then add `91112.com` under Settings → Pages → Custom domain.
- See `RESEARCH.md` and `PROMPTS.md`.

Owner / domain / sponsorship inquiries: https://web.works/contact
