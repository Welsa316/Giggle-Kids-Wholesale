# TODOs — what's left before launch

## Required for "real site" — do these first

- [ ] **Shopify Storefront API credentials** — see [SHOPIFY_SETUP.md](./SHOPIFY_SETUP.md). Without these, the site shows placeholder products.
- [ ] **Shopify Customer Account API credentials** — see SHOPIFY_SETUP.md. Without these, sign-in is disabled.
- [ ] **Custom domain checkout** — point a custom domain at Shopify so checkout URLs use the brand domain, not `*.myshopify.com`.
- [ ] **Newsletter ESP** — wire the footer + about page newsletter forms to Klaviyo / Mailchimp / Shopify Email. Currently logs to console (`SiteFooter.vue` `onSubscribe()`).

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

- [ ] Add **wishlist** (localStorage, then sync to Shopify customer metafields).
- [ ] Variant images on `ProductView.vue` — when a variant is selected, switch the main image to that variant's image.
- [ ] Address book / saved payment methods on `AccountView.vue` — extend with Customer Account API mutations.
- [ ] **Order tracking** — link from `AccountView.vue` orders list to Shopify's tracking URL.
- [ ] Real **handwritten signature** for `AboutFounder.vue` if you want one — currently no signature.
- [ ] Consider replacing the "Smocking Detail" placeholder photo with a **process video** loop on `AboutFounder.vue`.
