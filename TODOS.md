# TODOs — what's left before launch

## Required for "real site" — do these first

- [ ] **Shopify Storefront API credentials** — see [SHOPIFY_SETUP.md](./SHOPIFY_SETUP.md). Without these, the site shows placeholder products.
- [ ] **Custom domain checkout** — keep the domain configured in the Headless app's storefront so checkout URLs land on the brand domain, not `*.myshopify.com`.
- [ ] **Newsletter ESP** — wire the footer newsletter form to Klaviyo / Mailchimp / Shopify Email. Currently logs to console (`SiteFooter.vue` `onSubscribe()`).

## Visual content

- [ ] **Real hero photograph** — `HeroSection.vue`. Currently a pink placeholder block.
- [ ] **Real studio photograph** — `AboutFounder.vue`. Currently a "Smocking Detail" placeholder.
- [ ] **Collection images** — these come from Shopify directly once the API is connected, but make sure each Shopify collection has a featured image set.
- [ ] **Product photography** — same: comes from Shopify product images. Make sure every product has at least 2 images so the hover swap works on `ProductCard.vue`.

## Brand details to confirm

- [ ] Real **studio address** — placeholder "Magazine Street, New Orleans" in `SiteFooter.vue`.
- [ ] Real **email + phone** — placeholders `hello@gigglekidsla.com` / `(504) 555-0100` in `SiteFooter.vue` + `index.html` JSON-LD.
- [ ] Real **customer review** — placeholder "Caroline T., Metairie LA" in `TrustSignals.vue`. Pull from Judge.me / Yotpo / Stamped, or hand-pick.
- [ ] Real **announcement bar copy** — placeholder "Complimentary shipping over $75" in `AnnouncementBar.vue`.

## Product reviews

- [ ] Add product reviews widget to `ProductView.vue` — Judge.me, Yotpo, Stamped, or Shopify-native.

## Search / discovery

- [ ] Add search to `SiteNav.vue` — Shopify Storefront API has a `predictiveSearch` query.
- [ ] Add filters + sort on `CollectionView.vue` — Storefront API supports filter args.

## SEO / metadata

- [ ] Real **OG image** — replace `/og-placeholder.jpg` (currently broken) with a real branded share image at 1200x630.
- [ ] **Favicon set** — currently a generic SVG data URI. Replace with branded favicons at 16, 32, 180, 192, 512.
- [ ] **Sitemap.xml** + `robots.txt` in `public/`. Sitemap can be generated from Shopify routes server-side or pre-build.
- [ ] **Per-page meta tags** — currently only the global `<title>` and `<meta description>` in `index.html`. Use `useHead` (`@unhead/vue`) or similar to set per-route meta on Product / Collection pages.

## Analytics

- [ ] **Shopify Web Pixels** — install Shopify's `web-pixels-extension` to track add-to-cart, view-item, purchase, etc.
- [ ] **GA4 / Plausible** — additional analytics if needed.

## Polish (not blocking)

- [ ] Add **wishlist** (localStorage, then sync to Shopify customer metafields once accounts ship).
- [ ] Variant images on `ProductView.vue` — when a variant is selected, switch the main image to that variant's image.
- [ ] Real **handwritten signature** for `AboutFounder.vue` if you want one — currently no signature.
- [ ] Consider replacing the "Smocking Detail" placeholder photo with a **process video** loop on `AboutFounder.vue`.

## Phase 2 — Customer accounts (deferred, not cancelled)

We launch with guest checkout only. Customer accounts get added back as a follow-up release once core storefront is stable and there's a real product catalog driving traffic.

**Reference implementation lives in git history** at commit `eb6d153` (full Customer Account API + OAuth/PKCE flow + AccountView/LoginView/CallbackView). To restore:

```bash
git show eb6d153:src/lib/shopifyAccount.js > src/lib/shopifyAccount.js
git show eb6d153:src/composables/useCustomer.js > src/composables/useCustomer.js
git show eb6d153:src/views/AccountView.vue > src/views/AccountView.vue
git show eb6d153:src/views/AccountLoginView.vue > src/views/AccountLoginView.vue
git show eb6d153:src/views/AccountCallbackView.vue > src/views/AccountCallbackView.vue
```

Then re-add the three Customer Account env vars to `.env.example`, the `/account/*` routes to `src/router/index.js`, and the account icon to `SiteNav.vue`.

**What needs to be true before enabling accounts:**
- [ ] Real domain deployed on Vercel (Shopify won't allow `localhost` as an OAuth callback — production URL only)
- [ ] Customer Account API enabled in Shopify Headless app for the storefront
- [ ] OAuth client registered with `https://yourdomain.com/account/callback` in the allowlist

**What customers gain:**
- Order history + reorder
- Saved addresses + payment methods (Shopify-managed)
- Faster repeat checkout
- Wishlist that persists across devices (via Shopify customer metafields)

**What we lose by enabling:**
- Slight friction at first sign-in (OAuth redirect round-trip)
- One more thing to support / debug
- Customer Account API has its own version cadence to track
