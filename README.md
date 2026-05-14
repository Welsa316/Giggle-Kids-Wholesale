# Giggle Kids — Wholesale Landing

Vue 3 + Vite + Tailwind landing page for Giggle Kids, a Louisiana boutique brand selling hand-smocked children's clothing wholesale to retail buyers via Faire.

## Stack

- Vue 3 (Composition API, `<script setup>`)
- Vite 5
- Tailwind CSS 3 (custom brand theme — see `tailwind.config.js`)
- No backend yet — inquiry form logs to console with `// TODO` markers at network-call sites

## Setup

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve dist/ on :4173
```

## Project structure

```
src/
├── App.vue                      Section composition + skip-to-content link
├── main.js                      Vue bootstrap
├── assets/main.css              Tailwind directives + base resets
├── data/                        Content arrays (collections, products, value props, steps)
└── components/
    ├── ui/                      BaseButton, BaseInput, BaseTextarea, SectionHeader
    └── sections/                12 page sections (one file per section)
```

## Design system

Defined in `tailwind.config.js`. Brief summary:

| Token | Value |
|-------|-------|
| `bg-cream` | `#FAF6F1` |
| `text-ink` | `#3D3530` |
| `text-ink-muted` | `#5C5048` |
| `bg-purple` | `#5D4A6E` |
| `text-purple-soft` | `#A78BB8` |
| `bg-pink` | `#F5D6D9` |
| `bg-sage` | `#B8C4B1` |
| `border-border` | `#EDE3D6` |

Fonts: Playfair Display (serif headlines) + Nunito (sans body). Loaded from Google Fonts in `index.html`.

Radii: `rounded` = 12px (cards/inputs), `rounded-full` = pill (buttons only).

## Sections (in order)

1. `AnnouncementBar` — dismissible promo strip
2. `SiteNav` — sticky header, hamburger on mobile
3. `HeroSection` — split layout, asymmetric CTA pair
4. `WholesaleTerms` — purple band: MOQ / lead time / NET 60
5. `ValueProps` — 4 numbered, no-icon cards
6. `FeaturedCollections` — 6-tile photo grid
7. `BestSellers` — 4 editorial product cards
8. `TrustSignals` — stocked-in count + retailer quote
9. `AboutFounder` — portrait + first-person founder copy
10. `HowToOrder` — 3 numbered steps with connector line
11. `InquiryForm` — validated form, line sheet PDF download alternative
12. `SiteFooter` — 3 columns + newsletter signup

## What's wired

- Form validation (required fields, email regex)
- Smooth anchor scrolling (`scroll-smooth` on `<html>`)
- Mobile hamburger with focus trap-style ESC close + body scroll lock
- Dismissible announcement bar
- Newsletter signup UI (logs to console)

## What's not wired (see [TODOS.md](./TODOS.md))

- Backend inquiry POST
- Real product/collection/founder photography
- Real wholesale numbers and contact details
- Newsletter ESP integration
- Analytics, OG/Twitter meta, full favicon set
