# Giggle Kids — Custom Storefront

Custom Vue 3 + Vite + Tailwind frontend for the Giggle Kids Shopify store. Replaces the default Shopify theme — products, collections, cart, checkout, and customer accounts all live in Shopify and are accessed via the Storefront API + Customer Account API.

Brand: hand-smocked children's clothing, made in New Orleans, Louisiana since 2012.

## Stack

- **Vue 3** (Composition API, `<script setup>`)
- **Vite 5**
- **Vue Router** (multi-page)
- **Tailwind CSS 3** (custom brand theme — see `tailwind.config.js`)
- **@shopify/storefront-api-client** — Shopify Storefront API
- **Custom OAuth (PKCE) wrapper** — Shopify Customer Account API

No backend required — talks to Shopify directly. Works in placeholder mode if Shopify isn't configured yet.

## Quick start

```bash
npm install
cp .env.example .env.local
# fill in Shopify credentials — see SHOPIFY_SETUP.md
npm run dev      # http://localhost:5173
npm run build
npm run preview  # serve production build on :4173
```

The site renders gracefully without Shopify configured — placeholder products show on the home page, cart drawer shows "not configured", account pages prompt for setup. Once `.env.local` has real credentials, real Shopify data flows in automatically.

## Routes

| Path | Page |
|------|------|
| `/` | Home — hero, featured collections, best sellers, brand story |
| `/collections/:handle` | Collection page (e.g. `/collections/mardi-gras`) |
| `/products/:handle` | Product detail page with variants + add-to-cart |
| `/cart` | Cart page |
| `/about` | Studio / brand story |
| `/account/login` | Sign-in (redirects to Shopify-hosted) |
| `/account/callback` | OAuth return (handles code exchange) |
| `/account` | Customer dashboard + order history |

## Project structure

```
src/
├── App.vue                          Root layout (nav, footer, router-view, cart drawer)
├── main.js                          Bootstrap + Vue Router
├── assets/main.css                  Tailwind + custom CSS (drop caps, reveals)
├── router/index.js                  Routes
├── lib/
│   ├── shopify.js                   Storefront API client + GraphQL queries + helpers
│   └── shopifyAccount.js            Customer Account API + OAuth (PKCE)
├── composables/
│   ├── useCart.js                   Cart state (single shared instance)
│   ├── useProducts.js               Product / collection fetching
│   ├── useCustomer.js               Customer auth state + orders
│   └── useReveal.js                 IntersectionObserver-based scroll reveals
├── views/
│   ├── HomeView.vue
│   ├── ProductView.vue
│   ├── CollectionView.vue
│   ├── CartView.vue
│   ├── AboutView.vue
│   ├── AccountView.vue              Dashboard + orders
│   ├── AccountLoginView.vue         "Continue with Shopify" button
│   ├── AccountCallbackView.vue      OAuth callback handler
│   └── NotFoundView.vue
└── components/
    ├── sections/                    Home page sections
    ├── ui/                          BaseButton, BaseInput, BaseTextarea, ProductCard, SectionHeader
    └── cart/CartDrawer.vue          Slide-out cart
```

## Setup

See **[SHOPIFY_SETUP.md](./SHOPIFY_SETUP.md)** for step-by-step:

1. Storefront API: create a Shopify dev app, enable Storefront scopes, copy the public token
2. Customer Account API: enable headless customer accounts, register a public OAuth client (PKCE), copy the client ID
3. Drop into `.env.local`, restart dev server

## Design system

| Token | Value |
|-------|-------|
| `bg-cream` | `#FAF6F1` |
| `bg-cream-deep` | `#F3ECE2` |
| `text-ink` | `#3D3530` |
| `text-ink-muted` | `#5C5048` |
| `bg-purple` | `#5D4A6E` |
| `text-purple-soft` | `#A78BB8` |
| `border-border` | `#EDE3D6` |

Fonts: Playfair Display (serif headlines) + Nunito (sans body), loaded from Google Fonts.

Radii: `rounded` = 8px, `rounded-full` = pill (buttons only).

## What's wired

- Shopify Storefront API integration (products, collections, cart)
- Cart: add / update / remove lines, persist via localStorage, redirect to Shopify checkout
- Customer Account API OAuth flow (PKCE — public client, no secret)
- Vue Router multi-page with route transitions
- Mobile hamburger nav with cart + account icons
- Newsletter signup UI (logs to console — wire to ESP)
- Smooth scroll, scroll-triggered reveals, dismissible announcement bar
- prefers-reduced-motion honored

## What's not wired

See [TODOS.md](./TODOS.md). Highlights:
- Real product / collection / studio photography
- Newsletter ESP integration (Klaviyo / Mailchimp / Shopify Email)
- Product reviews widget (Judge.me / Yotpo / Stamped)
- Shopify analytics (`web-pixels-extension`)
- Real OG image, favicon set
