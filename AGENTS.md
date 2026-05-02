# cornerkg — agent / contributor notes

E-commerce frontend for the Bishkek streetwear & sneaker reseller **cornerkg**
(Instagram [@cornerkg_](https://www.instagram.com/cornerkg_/), WhatsApp
[+996 709 99 32 89](https://wa.me/996709993289)).

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS 4** (CSS-first config in `src/app/globals.css`)
- **Zustand 5** for client state (cart, favorites, profile, locale)
- **Framer Motion** for entrance / hover animations
- **Embla Carousel** for product galleries & brand strip
- Custom lightweight i18n in `src/lib/i18n` — Russian / Kyrgyz / English
- No backend yet — everything persists to `localStorage` through a thin
  repository layer in `src/lib/data` so it can be swapped for Supabase /
  Sanity / a custom REST API later without touching UI code.

## Quick commands

```
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

## Architecture conventions

- **Design tokens**: dark base `bg-zinc-950`, accent `lime` (`#a3e635`).
  Always use the `text-lime-400` / `bg-lime-400` / `border-lime-400/40`
  variants — do not introduce a new accent color.
- **State**: Zustand stores in `src/store/` are persisted to `localStorage`
  under stable keys (`corner.cart`, `corner.favorites`, `corner.profile`,
  `corner.locale`). Always guard reads with `typeof window !== 'undefined'`.
- **Data**: product data is exported from `src/lib/data/products.ts` and
  consumed only via the repository functions in `src/lib/data/repository.ts`.
  When swapping to a real backend, only `repository.ts` changes.
- **i18n**: components read translations through the `useT()` hook from
  `src/lib/i18n`. Never hard-code Russian / Kyrgyz / English strings in
  components — always add a key to `src/lib/i18n/dictionaries.ts`.
- **Checkout**: the cart form builds a WhatsApp deep-link
  `https://wa.me/996709993289?text=...` — there is no real backend submission.

## File layout

```
src/
  app/                    # Next.js App Router pages
    layout.tsx            # Root layout: Navbar, Footer, providers
    page.tsx              # Home
    catalog/page.tsx      # Catalog with filters
    product/[slug]/       # Product detail
    cart/page.tsx         # Cart + checkout form (WhatsApp deeplink)
    profile/page.tsx      # Profile, addresses, orders, favorites
  components/
    layout/               # Navbar, Footer, LocaleSwitcher
    ui/                   # Button, Input, Badge, etc.
    home/                 # Hero, Categories, Hits, Brands, Reviews, Contacts
    catalog/              # Filters, ProductGrid, ProductCard
    product/              # Gallery, SizePicker, AddToCart
    cart/                 # CartItem, CheckoutForm
    profile/              # ProfileTabs, OrderHistory
  lib/
    data/                 # Types, mock products, repository
    i18n/                 # Locale, dictionaries, useT()
    utils/                # formatPrice, cn, whatsapp helpers
  store/                  # Zustand stores
```

## Adding a real backend later

Replace the implementation of `src/lib/data/repository.ts` with one that
calls Supabase / Sanity / your REST API. The UI components only depend on
the exported functions (`listProducts`, `getProductBySlug`, etc.) and on
the `Product` / `CartItem` / `Order` types in `src/lib/data/types.ts`.
