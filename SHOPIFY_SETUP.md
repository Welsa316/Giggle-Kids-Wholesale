# Shopify Setup

This site is a custom Vue storefront for a Shopify backend. Products, collections, cart, checkout, and customer accounts all live in Shopify — this frontend talks to Shopify via two APIs:

- **Storefront API** (public) — fetches products, collections, drives the cart
- **Customer Account API** (OAuth, public client) — sign in, view orders

The site renders gracefully without either configured (placeholder products show; cart and account show "not configured" states), so you can see the UI before wiring anything up.

---

## Step 1 — Storefront API (15 min)

Powers product browsing and the cart.

1. **Open Shopify admin** → `Settings` → `Apps and sales channels` → `Develop apps`
2. Click **Create an app** (top right). Name it something like `Custom Storefront`.
3. Click **Configure Storefront API scopes**. Enable at minimum:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_read_content`
   - `unauthenticated_read_collection_listings`
4. Click **Save**.
5. Click **Install app** (top right). Confirm.
6. Open the **API credentials** tab. Copy the **Storefront API access token** — this is the public token.
7. Note your **store domain** (e.g. `giggle-kids.myshopify.com`).

Add to `.env.local` in the project root:

```
VITE_SHOPIFY_STORE_DOMAIN=giggle-kids.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=<paste the storefront token here>
```

Restart the dev server (`npm run dev`). Real products + collections should now appear.

---

## Step 2 — Customer Account API (20 min)

Powers sign-in, order history, account dashboard. Uses OAuth 2.0 with PKCE — no client secret needed (public client).

1. **Shopify admin** → `Settings` → `Customer accounts` → `Headless`
2. Toggle **New customer accounts** on if it isn't already.
3. Scroll to **Customer Account API** and click **Manage**.
4. Note the **Shop ID** at the top — a numeric value like `12345678`.
5. Under **Application setup** → **Storefront** → add an OAuth client:
   - **Application type**: Public (PKCE)
   - **Redirect URIs**: add both
     - `https://localhost:5173/account/callback` (local dev)
     - `https://yourdomain.com/account/callback` (production — add when you deploy)
   - **Scopes**: `openid`, `email`, `customer-account-api:full`
6. Save. Copy the **Client ID** Shopify generates.

Add to `.env.local`:

```
VITE_SHOPIFY_SHOP_ID=12345678
VITE_SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID=<paste the client id>
VITE_SHOPIFY_CUSTOMER_ACCOUNT_REDIRECT_URI=https://localhost:5173/account/callback
```

Restart dev server. Visit `/account/login` — clicking the button should redirect to Shopify's hosted login screen, then back to `/account/callback` and into `/account` showing the customer info + order history.

> **Note:** Shopify requires HTTPS for the OAuth callback URL — even on localhost.
> This project uses [`vite-plugin-mkcert`](https://github.com/liuweiGL/vite-plugin-mkcert)
> to auto-generate a locally-trusted SSL cert. The dev server runs on
> `https://localhost:5173` (not `http://`). First run installs a local CA in your
> system trust store; subsequent runs are seamless.

For production: change the redirect URI to your live domain and re-add it to the Shopify allowlist in the Customer Account API setup page.

---

## Step 3 — Custom domain checkout (optional but recommended)

By default, Shopify checkout redirects to `*.myshopify.com/checkouts/...` which can break the brand feel. To use your own domain:

1. Shopify admin → `Settings` → `Domains` → ensure your custom domain is set as the primary.
2. The Storefront API will return checkout URLs on the primary domain automatically.

---

## Where things live in this project

| What | File |
|------|------|
| Storefront API client + GraphQL queries | `src/lib/shopify.js` |
| Customer Account API + OAuth (PKCE) | `src/lib/shopifyAccount.js` |
| Cart state (single shared instance) | `src/composables/useCart.js` |
| Product / collection fetching | `src/composables/useProducts.js` |
| Customer auth state | `src/composables/useCustomer.js` |
| Routing (`/`, `/products/:handle`, etc.) | `src/router/index.js` |
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
| `/account/login` | Sign-in (redirects to Shopify) |
| `/account/callback` | OAuth return URL (handles code exchange) |
| `/account` | Dashboard + order history |

## Cart flow

1. User clicks "Add to bag" on a product → `useCart().addLine(variantId, qty)`
2. If no cart exists yet, `cartCreate` mutation runs first
3. `cartLinesAdd` mutation runs, returns updated cart
4. Cart drawer auto-opens
5. User clicks "Checkout" → redirects to Shopify-hosted checkout URL
6. Shopify handles payment, taxes, shipping, fulfillment

The cart ID persists in `localStorage` so it survives reloads. Cart expires server-side after ~10 days of inactivity — we handle that gracefully (clear and start fresh).

## Things to add later

- **Product reviews** — wire Judge.me / Yotpo / Stamped widgets into the product page
- **Search** — Shopify Storefront API has a `predictiveSearch` query
- **Variant images** — the product page currently shows the first image; could show variant.image when a variant is selected
- **Filters / sort on collection page** — Storefront API supports filter args
- **Wishlist** — pure client-side `localStorage` is fine for v1
- **Address / payment method management** — extend AccountView with Customer Account API mutations
