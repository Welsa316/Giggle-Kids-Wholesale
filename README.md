# Giggle Kids — Custom Storefront

Custom Vue 3 + Vite + Tailwind frontend for the Giggle Kids Shopify store. Replaces the default Shopify theme — products, collections, cart, and checkout all live in Shopify and are accessed via the Storefront API. Customers check out as guests; Shopify handles payment, fulfillment, and emails.

Brand: Giggle Kids LLC — Mardi Gras and crawfish themed children's clothing, made in New Orleans. Hand-smocked dresses + soft bamboo prints.

## Stack

- **Vue 3** (Composition API, `<script setup>`)
- **Vite 5**
- **Vue Router** (multi-page)
- **Tailwind CSS 3** (custom brand theme)
- **@shopify/storefront-api-client** — Shopify Storefront API

No backend required. Talks to Shopify directly. Works in placeholder mode if Shopify isn't configured yet.

## Quick start

```bash
npm install
cp .env.example .env.local
# fill in Shopify credentials — see SHOPIFY_SETUP.md
npm run dev      # http://localhost:5173
npm run build
npm run preview  # serve production build on :4173
```

## Routes

| Path | Page |
|------|------|
| `/` | Home — hero, featured collections, best sellers, brand story |
| `/collections/:handle` | Collection page (e.g. `/collections/mardi-gras`) |
| `/products/:handle` | Product detail with variants + add-to-cart |
| `/cart` | Cart page |
| `/about` | Studio / brand story |

Cart drawer slides over any page. Checkout button on cart redirects to Shopify-hosted checkout.

## Project structure

```
src/
├── App.vue                          Root layout (nav, footer, router-view, cart drawer)
├── main.js                          Bootstrap + Vue Router
├── assets/main.css                  Tailwind + custom CSS
├── router/index.js                  Routes
├── lib/shopify.js                   Storefront API client + GraphQL queries + helpers
├── composables/
│   ├── useCart.js                   Cart state (single shared instance)
│   ├── useProducts.js               Product / collection fetching
│   └── useReveal.js                 IntersectionObserver-based scroll reveals
├── views/
│   ├── HomeView.vue
│   ├── ProductView.vue
│   ├── CollectionView.vue
│   ├── CartView.vue
│   ├── AboutView.vue
│   └── NotFoundView.vue
└── components/
    ├── sections/                    Home page sections
    ├── ui/                          BaseButton, BaseInput, ProductCard, SectionHeader
    └── cart/CartDrawer.vue          Slide-out cart
```

## Setup

See **[SHOPIFY_SETUP.md](./SHOPIFY_SETUP.md)** for step-by-step. Summary:

1. Install the Shopify **Headless** app
2. Create a storefront in it → copy the **public Storefront API token** + your store domain
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

## What's wired

- Shopify Storefront API integration (products, collections, cart)
- Cart: add / update / remove lines, persist via localStorage, redirect to Shopify checkout
- Vue Router multi-page
- Mobile hamburger nav with cart icon + badge
- Newsletter signup UI (logs to console — wire to ESP)
- Smooth scroll, scroll-triggered reveals, dismissible announcement bar
- prefers-reduced-motion honored

## What's not wired

See [TODOS.md](./TODOS.md). Highlights:
- Real product / collection / studio photography
- Newsletter ESP integration (Klaviyo / Mailchimp / Shopify Email)
- Product reviews widget
- Real OG image, favicon set
