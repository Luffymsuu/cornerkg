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
- **next-intl** for i18n — Russian / Kyrgyz / English. Messages live in
  `messages/{ru,kg,en}.json`; the active locale is held in the
  `useLocaleStore` Zustand store and bridged to next-intl through
  `src/components/i18n/I18nProvider.tsx` (no locale-prefixed routes).
- Product imagery is bundled in `public/products/` — no external CDNs.
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
- **i18n**: components read translations through `useTranslations()` from
  `next-intl`. Never hard-code Russian / Kyrgyz / English strings in
  components — always add the key to all three files in `messages/`.
  Locale config (LOCALES, DEFAULT_LOCALE, LOCALE_LABELS) lives in
  `src/lib/i18n/config.ts`.
- **Checkout**: the cart form validates inputs (KG phone regex,
  required fields) via `src/lib/utils/validation.ts`, sanitises them
  through `src/lib/utils/sanitize.ts`, and builds a WhatsApp deep-link
  `https://wa.me/996709993289?text=...`. There is no real backend
  submission.
- **Resilience**: client subtrees that talk to localStorage / third-
  party SDKs (Cart, Catalog grid, Product gallery) are wrapped in
  `<ErrorBoundary>` with `<SectionErrorFallback>`. Route-level errors
  surface through `src/app/error.tsx`.
- **Loading states**: every async / hydration boundary uses one of the
  skeletons in `src/components/ui/Skeleton.tsx`. Below-the-fold home
  sections (BrandsStrip, ContactsBlock, Reviews) are deferred via
  `next/dynamic` in `src/components/home/BelowFold.tsx`.

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
    i18n/                 # Locale config (next-intl bridge)
    utils/                # formatPrice, cn, validation, sanitize, whatsapp
  store/                  # Zustand stores
messages/                 # ru.json / kg.json / en.json (next-intl)
public/
  products/               # local product imagery
  categories/             # local category-tile imagery
  hero.jpg                # homepage hero background
```

## Adding a real backend later

Replace the implementation of `src/lib/data/repository.ts` with one that
calls Supabase / Sanity / your REST API. The UI components only depend on
the exported functions (`listProducts`, `getProductBySlug`, etc.) and on
the `Product` / `CartItem` / `Order` types in `src/lib/data/types.ts`.
