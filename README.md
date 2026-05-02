# cornerkg

E-commerce frontend for **cornerkg** — a streetwear & sneaker reseller in
Bishkek (Instagram [@cornerkg_](https://www.instagram.com/cornerkg_/),
WhatsApp [+996 709 99 32 89](https://wa.me/996709993289)).

The store currently has no backend — orders are sent to the manager via a
pre-filled WhatsApp message. State (cart, favorites, profile, order
history) is persisted in `localStorage` through a thin repository layer
that can be swapped for a real API (Supabase / Sanity / custom REST)
without touching UI code.

## Stack

- **Next.js 15** App Router · TypeScript · Geist font
- **Tailwind CSS 4** (CSS-first config in `src/app/globals.css`)
- **Zustand 5** with `persist` middleware for client state
- **Framer Motion** for entrance / hover animations
- **Embla Carousel** for product galleries
- Lightweight built-in i18n (RU / KG / EN)

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

## Structure

See `AGENTS.md` for the full architectural conventions (file layout,
state management, design tokens, how to swap to a real backend, etc.).

```
src/
  app/                 # Next.js App Router pages
  components/          # UI building blocks (layout / home / catalog / product / cart / profile / ui)
  lib/
    data/              # Types, mock products, repository
    i18n/              # Dictionaries + useT() hook
    utils/             # cn(), formatPrice(), whatsapp helpers
  store/               # Zustand stores: cart, favorites, profile, locale
```

## Pages

| Route             | Purpose                                                   |
|-------------------|-----------------------------------------------------------|
| `/`               | Hero, categories, hits, new arrivals, brands, contacts, reviews |
| `/catalog`        | Product grid with filters (category / brand / price / sort) |
| `/product/[slug]` | Product detail: gallery, size picker, add-to-cart, favorite toggle |
| `/cart`           | Cart + checkout form that builds a WhatsApp deeplink      |
| `/profile`        | Profile data, order history, favorites (no auth)          |

## Replacing the mock data

All product data lives in `src/lib/data/products.ts` and is consumed only
through `src/lib/data/repository.ts`. To plug in a real backend:

1. Keep the types in `src/lib/data/types.ts` stable.
2. Rewrite each function in `repository.ts` to fetch from your backend
   (you can make them `async` — components already handle that pattern).
3. Profile / cart / favorites can keep using `localStorage` or be moved
   to a Supabase table behind the same Zustand stores.
