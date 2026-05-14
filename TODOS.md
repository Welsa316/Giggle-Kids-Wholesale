# TODOs — what's left before launch

## Content (highest impact, fastest to do)

- [ ] **Real founder name, photo, and bio** — `AboutFounder.vue`. Currently uses placeholder name "Claire Boudreaux" and an Unsplash portrait.
- [ ] **Real product photography** for the 4 best sellers — `data/bestSellers.js`. Currently placehold.co color blocks.
- [ ] **Real collection photography** for the 6 collection tiles — `data/collections.js`. Currently Unsplash stock.
- [ ] **Real hero photo** — `HeroSection.vue`. Currently Unsplash stock.
- [ ] **Confirmed wholesale terms numbers** — `WholesaleTerms.vue`. Placeholders: $150 opening / $75 reorder / 2–3 day fulfillment / NET 60 via Faire.
- [ ] **Real retailer quote + stocked-in count** — `TrustSignals.vue`. Placeholder: "200+ boutiques", quote attributed to "Sarah Whitman, Magnolia & Co., Birmingham AL".
- [ ] **Real contact email + phone** — `SiteFooter.vue`. Placeholders: hello@gigglekidsla.com, (225) 555-0100.
- [ ] **Real Faire shop URL** — currently `#` in `SiteNav.vue`, `HeroSection.vue`, `BestSellers.vue` items, `SiteFooter.vue`.
- [ ] **Actual line sheet PDF** — replace `public/line-sheet-placeholder.pdf` with the real catalog PDF.
- [ ] **Real announcement bar copy** — `AnnouncementBar.vue`. Or remove the bar entirely if no current promo.

## Backend / integrations

- [ ] **Inquiry form POST endpoint** — Express + PostgreSQL on Railway. Current handler in `InquiryForm.vue` `onSubmit()` just `console.log`s; replace with `fetch('/api/inquiries', { method: 'POST', body: JSON.stringify(form) })`. Marked with `// TODO`.
- [ ] **Newsletter signup integration** — Mailchimp / Klaviyo / ConvertKit. Current handler in `SiteFooter.vue` `onSubscribe()` just `console.log`s. Marked with `// TODO`.
- [ ] **Spam protection** — hCaptcha or honeypot field on the inquiry form before going live.

## SEO / metadata

- [ ] **OpenGraph + Twitter Card meta tags** in `index.html` (image, title, description, url).
- [ ] **Favicon set** — currently a generic flower emoji SVG data URI. Replace with branded favicon at all standard sizes (16, 32, 180, 192, 512).
- [ ] **Sitemap.xml** + `robots.txt` in `public/`.
- [ ] **JSON-LD schema** — `Organization` and `LocalBusiness` (Baton Rouge address) in `index.html`.

## Analytics

- [ ] **Plausible or GA4** snippet in `index.html`.
- [ ] **Form-submission event** fired in `InquiryForm.vue` on success.
- [ ] **Faire-link click events** to measure CTA conversion.

## Polish (nice-to-have, not blockers)

- [ ] Replace Unsplash placeholders with photographer-credited shots.
- [ ] Add a "stockist locator" section with map of current retailers (post-launch v2).
- [ ] Add a press / "as seen in" row if there are any features.
- [ ] Test inquiry form in real email clients to make sure auto-reply renders.
- [ ] Run Lighthouse and address any a11y / perf flags.
- [ ] Verify color contrast at every text/background pairing with axe DevTools.

## Deferred to v2

- i18n (single-locale EN only for MVP)
- Stockist map (interactive, with addresses)
- Account portal for repeat buyers
- Direct-checkout (skip Faire) for established wholesale accounts
