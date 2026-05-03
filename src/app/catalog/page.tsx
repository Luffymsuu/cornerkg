"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { Filters, type FilterValue } from "@/components/catalog/Filters";
import { listProducts, getPriceBounds } from "@/lib/data/repository";
import { useTranslations } from "next-intl";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SectionErrorFallback } from "@/components/SectionErrorFallback";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import { formatPrice } from "@/lib/utils/formatPrice";
import type { Category } from "@/lib/data/types";
import { SlidersHorizontal, X } from "lucide-react";

function CatalogInner() {
  const t = useTranslations();
  const router = useRouter();
  const params = useSearchParams();
  const bounds = getPriceBounds();

  const [filters, setFilters] = useState<FilterValue>(() => {
    const cat = (params.get("category") as Category | "all" | null) ?? "all";
    return {
      category: cat,
      brand: "all",
      size: "all",
      minPrice: 0,
      maxPrice: 0,
      sort: "newest",
    };
  });
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Sync category from URL ?category=...
  useEffect(() => {
    const urlCat = params.get("category") as Category | null;
    if (urlCat && urlCat !== filters.category) {
      setFilters((f) => ({ ...f, category: urlCat }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const products = useMemo(
    () =>
      listProducts({
        category: filters.category,
        brand: filters.brand,
        size: filters.size,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
        sort: filters.sort,
      }),
    [filters],
  );

  const onChange = (patch: Partial<FilterValue>) =>
    setFilters((f) => ({ ...f, ...patch }));

  const onReset = () => {
    setFilters({
      category: "all",
      brand: "all",
      size: "all",
      minPrice: 0,
      maxPrice: 0,
      sort: "newest",
    });
    router.push("/catalog");
  };

  return (
    <Container className="py-10 sm:py-14">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("catalog.titleLong")}
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            {t("catalog.itemsCount", { count: products.length })} ·{" "}
            {formatPrice(bounds.min, t("common.currency"))}
            {"\u00A0—\u00A0"}
            {formatPrice(bounds.max, t("common.currency"))}
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-xs font-semibold text-zinc-200 hover:border-lime-400 lg:hidden"
          onClick={() => setShowFiltersMobile((v) => !v)}
        >
          {showFiltersMobile ? (
            <X className="h-4 w-4" />
          ) : (
            <SlidersHorizontal className="h-4 w-4" />
          )}
          {showFiltersMobile ? t("catalog.hideFilters") : t("catalog.showFilters")}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        {/* desktop filters */}
        <div className="hidden lg:block">
          <Filters value={filters} onChange={onChange} onReset={onReset} />
        </div>
        {/* mobile filters drawer */}
        {showFiltersMobile && (
          <div className="lg:hidden">
            <Filters value={filters} onChange={onChange} onReset={onReset} />
          </div>
        )}

        <div>
          <ErrorBoundary
            fallback={(_, reset) => <SectionErrorFallback reset={reset} />}
          >
            {products.length === 0 ? (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-10 text-center text-zinc-400">
                {t("catalog.noResults")}
              </div>
            ) : (
              <ProductGrid products={products} />
            )}
          </ErrorBoundary>
        </div>
      </div>
    </Container>
  );
}

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <Container className="py-10 sm:py-14">
          <ProductGridSkeleton count={8} />
        </Container>
      }
    >
      <CatalogInner />
    </Suspense>
  );
}
