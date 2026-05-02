"use client";

import { useT } from "@/lib/i18n";
import { useFavoritesStore } from "@/store/favorites";
import { getProductById } from "@/lib/data/repository";
import { ProductGrid } from "@/components/catalog/ProductGrid";

export function Favorites() {
  const t = useT();
  const ids = useFavoritesStore((s) => s.ids);
  const hydrated = useFavoritesStore((s) => s.hydrated);

  if (!hydrated) return <div className="min-h-[20vh]" />;

  const products = ids
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 p-10 text-center text-sm text-zinc-400">
        {t.profile.noFavs}
      </div>
    );
  }

  return <ProductGrid products={products} />;
}
