"use client";

import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils/cn";
import { listBrands, listCategories, getPriceBounds } from "@/lib/data/repository";
import type { Category } from "@/lib/data/types";
import { formatPrice } from "@/lib/utils/formatPrice";

export interface FilterValue {
  category: Category | "all";
  brand: string | "all";
  minPrice: number;
  maxPrice: number;
  sort: "newest" | "price_asc" | "price_desc";
}

export function Filters({
  value,
  onChange,
  onReset,
}: {
  value: FilterValue;
  onChange: (patch: Partial<FilterValue>) => void;
  onReset: () => void;
}) {
  const t = useT();
  const brands = listBrands();
  const categories = listCategories();
  const bounds = getPriceBounds();

  return (
    <aside className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">
          {t.catalog.filtersTitle}
        </h3>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-medium text-zinc-400 hover:text-lime-400"
        >
          {t.common.reset}
        </button>
      </div>

      {/* Category */}
      <div>
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          {t.common.category}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Pill
            active={value.category === "all"}
            onClick={() => onChange({ category: "all" })}
          >
            {t.catalog.categoryAll}
          </Pill>
          {categories.map((c) => (
            <Pill
              key={c}
              active={value.category === c}
              onClick={() => onChange({ category: c })}
            >
              {t.categories[c]}
            </Pill>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div>
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          {t.common.brand}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Pill
            active={value.brand === "all"}
            onClick={() => onChange({ brand: "all" })}
          >
            {t.catalog.brandAll}
          </Pill>
          {brands.map((b) => (
            <Pill
              key={b}
              active={value.brand === b}
              onClick={() => onChange({ brand: b })}
            >
              {b}
            </Pill>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          {t.common.price}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            min={bounds.min}
            max={bounds.max}
            placeholder={t.common.from}
            value={value.minPrice || ""}
            onChange={(e) =>
              onChange({ minPrice: Number(e.target.value) || 0 })
            }
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950/50 px-3 py-2 text-xs text-zinc-100 focus:border-lime-400/60 focus:outline-none"
          />
          <span className="text-zinc-600">—</span>
          <input
            type="number"
            inputMode="numeric"
            min={bounds.min}
            max={bounds.max}
            placeholder={t.common.to}
            value={value.maxPrice || ""}
            onChange={(e) =>
              onChange({ maxPrice: Number(e.target.value) || 0 })
            }
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950/50 px-3 py-2 text-xs text-zinc-100 focus:border-lime-400/60 focus:outline-none"
          />
        </div>
        <div className="mt-2 text-[10px] text-zinc-500">
          {formatPrice(bounds.min, t.common.currency)} —{" "}
          {formatPrice(bounds.max, t.common.currency)}
        </div>
      </div>

      {/* Sort */}
      <div>
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          {t.common.sort}
        </div>
        <div className="flex flex-col gap-1.5">
          <Pill
            active={value.sort === "newest"}
            onClick={() => onChange({ sort: "newest" })}
            full
          >
            {t.common.sortNewest}
          </Pill>
          <Pill
            active={value.sort === "price_asc"}
            onClick={() => onChange({ sort: "price_asc" })}
            full
          >
            {t.common.sortAsc}
          </Pill>
          <Pill
            active={value.sort === "price_desc"}
            onClick={() => onChange({ sort: "price_desc" })}
            full
          >
            {t.common.sortDesc}
          </Pill>
        </div>
      </div>
    </aside>
  );
}

function Pill({
  active,
  onClick,
  children,
  full,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-medium transition",
        full ? "w-full text-left" : "",
        active
          ? "border-lime-400 bg-lime-400/10 text-lime-300"
          : "border-zinc-800 bg-zinc-950/40 text-zinc-300 hover:border-zinc-600",
      )}
    >
      {children}
    </button>
  );
}
