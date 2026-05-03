/**
 * Thin repository over the in-memory product list. All UI components must
 * import from this module instead of `products.ts` directly. To swap in a
 * real backend (Supabase, Sanity, REST), replace these implementations
 * with async fetches — the function signatures and types are stable.
 */
import { PRODUCTS } from "./products";
import type { Category, Product } from "./types";

export interface ListOptions {
  category?: Category | "all";
  brand?: string | "all";
  size?: string | "all";
  minPrice?: number;
  maxPrice?: number;
  query?: string;
  sort?: "newest" | "price_asc" | "price_desc";
}

export function listProducts(opts: ListOptions = {}): Product[] {
  let items = [...PRODUCTS];

  if (opts.category && opts.category !== "all") {
    items = items.filter((p) => p.category === opts.category);
  }

  if (opts.brand && opts.brand !== "all") {
    items = items.filter((p) => p.brand === opts.brand);
  }

  if (opts.size && opts.size !== "all") {
    items = items.filter((p) => p.sizes.includes(opts.size!));
  }

  if (typeof opts.minPrice === "number") {
    items = items.filter((p) => p.price >= opts.minPrice!);
  }

  if (typeof opts.maxPrice === "number") {
    items = items.filter((p) => p.price <= opts.maxPrice!);
  }

  if (opts.query) {
    const q = opts.query.toLowerCase().trim();
    items = items.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }

  switch (opts.sort) {
    case "price_asc":
      items.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      items.sort((a, b) => b.price - a.price);
      break;
    case "newest":
    default:
      items.sort(
        (a, b) =>
          new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime(),
      );
  }

  return items;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function listHits(limit = 8): Product[] {
  return PRODUCTS.filter((p) => p.isHit).slice(0, limit);
}

/**
 * Returns recently added products that aren't already featured in the
 * "Hits" rail. Hits and New are mutually exclusive on the home page so
 * the same product never appears twice.
 */
export function listNew(limit = 8): Product[] {
  return [...PRODUCTS]
    .filter((p) => !p.isHit)
    .sort(
      (a, b) =>
        new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime(),
    )
    .slice(0, limit);
}

export function listSizes(): string[] {
  const set = new Set<string>();
  for (const p of PRODUCTS) {
    for (const s of p.sizes) set.add(s);
  }
  // Numeric sizes (sneakers / pants) ascend numerically; lettered sizes
  // follow in canonical order. Items not in the canonical list trail.
  const letterOrder = ["XS", "S", "M", "L", "XL", "XXL"];
  return Array.from(set).sort((a, b) => {
    const an = Number(a);
    const bn = Number(b);
    if (!Number.isNaN(an) && !Number.isNaN(bn)) return an - bn;
    if (!Number.isNaN(an)) return -1;
    if (!Number.isNaN(bn)) return 1;
    const ai = letterOrder.indexOf(a);
    const bi = letterOrder.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}

export function listBrands(): string[] {
  return Array.from(new Set(PRODUCTS.map((p) => p.brand))).sort();
}

export function listCategories(): Category[] {
  return Array.from(new Set(PRODUCTS.map((p) => p.category)));
}

export function getPriceBounds(): { min: number; max: number } {
  const prices = PRODUCTS.map((p) => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}
