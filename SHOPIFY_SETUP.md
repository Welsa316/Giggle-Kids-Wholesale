# Shopify Setup

Custom Vue storefront for the Giggle Kids Shopify store. Products, collections, cart, and checkout all live in Shopify — this frontend talks to Shopify's **Storefront API** to render the catalog and drive the cart, then hands off to Shopify-hosted checkout.

Customers check out as guests (no account needed). Order confirmation + shipping updates go via Shopify's transactional emails.

The site renders gracefully without Shopify configured (placeholder products show; cart says "not configured"), so you can preview the UI before wiring credentials.

---

## Setup (15 min)

### 1. Install the Shopify Headless app

Shopify admin → **Settings** → **Apps and sales channels** → **Shopify App Store** → search **"Headless"** → install the official Shopify-built one.

It's free, first-party, no charge.

### 2. Create a storefront in the Headless app

1. Open the Headless app
2. Click **Add storefront** → name it (e.g. `Web` or `Custom Vue`)
3. The storefront entry has a **Storefront API** section

### 3. Grab Storefront API credentials

In your storefront → **Storefront API** section:

- Copy the **Public access token**
- Note your store domain (e.g. `giggle-kids.myshopify.com`)

The Headless app pre-configures the right scopes (product read, cart, checkout). No extra config needed.

### 4. Drop into `.env.local`

In the project root:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
VITE_SHOPIFY_STORE_DOMAIN=giggle-kids.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=<paste the public token>
VITE_SHOPIFY_API_VERSION=2024-10
```

### 5. Restart dev server

```bash
npm run dev
```

Visit `http://localhost:5173` — real products + collections appear within a second or two. "Add to bag" works. "Checkout" redirects to Shopify-hosted checkout.

---

## Custom checkout domain (optional)

By default, Shopify checkout redirects to `*.myshopify.com/checkouts/...`. To keep checkout on the brand domain:

1. Shopify admin → **Settings** → **Domains** → ensure your custom domain is set as the primary
2. The Storefront API will return checkout URLs on the primary domain automatically

For full custom domain checkout (`checkout.gigglekids.com`), see Shopify's docs on [primary domains for headless storefronts](https://shopify.dev/docs/storefronts/headless/building-with-the-customer-account-api/getting-started).

---

## Where things live in this project

| What | File |
|------|------|
| Storefront API client + GraphQL queries | `src/lib/shopify.js` |
| Cart state (single shared instance) | `src/composables/useCart.js` |
| Product / collection fetching | `src/composables/useProducts.js` |
| Routing | `src/router/index.js` |
| Cart slide-out drawer | `src/components/cart/CartDrawer.vue` |
| Product card | `src/components/ui/ProductCard.vue` |

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/collections/:handle` | Collection page (e.g. `/collections/mardi-gras`) |
| `/products/:handle` | Product detail page |
| `/cart` | Cart page |
| `/about` | About / studio |

## Cart flow

1. Customer clicks "Add to bag" on a product → `useCart().addLine(variantId, qty)`
2. If no cart exists yet, `cartCreate` mutation runs first
3. `cartLinesAdd` mutation runs, returns updated cart
4. Cart drawer auto-opens
5. Customer clicks "Checkout" → redirects to Shopify-hosted checkout URL
6. Shopify handles payment, taxes, shipping, fulfillment, and emails

The cart ID persists in `localStorage` so it survives reloads. Cart expires server-side after ~10 days of inactivity — handled gracefully (cleared and a fresh cart created on next add).

## Things to add later

- **Product reviews** — wire Judge.me / Yotpo / Stamped widgets into the product page
- **Search** — Shopify Storefront API has a `predictiveSearch` query
- **Variant images** — currently shows the first image on the product page; could swap to `variant.image` when a variant is selected
- **Filters / sort on collection page** — Storefront API supports filter args
- **Wishlist** — pure client-side `localStorage` is fine for v1
- **Customer accounts** (deferred — Phase 2) — full OAuth (PKCE) implementation lives in git history at commit `eb6d153`. See [TODOS.md](./TODOS.md#phase-2--customer-accounts-deferred-not-cancelled) for the restore checklist when ready to re-enable.
