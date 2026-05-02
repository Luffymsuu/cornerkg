"use client";

import { useTranslations } from "next-intl";
import { useFavoritesStore } from "@/store/favorites";
import { getProductById } from "@/lib/data/repository";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";

export function Favorites() {
  const t = useTranslations();
  const ids = useFavoritesStore((s) => s.ids);
  const hydrated = useFavoritesStore((s) => s.hydrated);

  if (!hydrated) return <ProductGridSkeleton count={4} />;

  const products = ids
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 p-10 text-center text-sm text-zinc-400">
        {t("profile.noFavs")}
      </div>
    );
  }

  return <ProductGrid products={products} />;
}
