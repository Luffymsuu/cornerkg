"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { useT } from "@/lib/i18n";
import { useFavoritesStore } from "@/store/favorites";
import { formatPrice } from "@/lib/utils/formatPrice";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/lib/data/types";

export function ProductCard({ product }: { product: Product }) {
  const t = useT();
  const fav = useFavoritesStore((s) => s.has(product.id));
  const toggle = useFavoritesStore((s) => s.toggle);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/60 transition-colors hover:border-zinc-700"
    >
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[4/5] w-full overflow-hidden bg-zinc-800"
      >
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isHit && <Badge tone="lime">{t.common.hit}</Badge>}
          {product.isNew && <Badge tone="zinc">{t.common.new}</Badge>}
          {product.oldPrice && (
            <Badge tone="red">
              -{Math.round((1 - product.price / product.oldPrice) * 100)}%
            </Badge>
          )}
        </div>
      </Link>

      <button
        type="button"
        aria-label="favorite"
        onClick={(e) => {
          e.preventDefault();
          toggle(product.id);
        }}
        className={cn(
          "absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border bg-zinc-950/70 backdrop-blur transition",
          fav
            ? "border-lime-400 text-lime-400"
            : "border-zinc-700 text-zinc-300 hover:border-lime-400 hover:text-lime-400",
        )}
      >
        <Heart className={cn("h-4 w-4", fav && "fill-lime-400")} />
      </button>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          {product.brand}
        </span>
        <Link
          href={`/product/${product.slug}`}
          className="line-clamp-2 text-sm font-semibold text-zinc-100 transition hover:text-lime-400"
        >
          {product.title}
        </Link>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-lime-400">
              {formatPrice(product.price, t.common.currency)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-zinc-500 line-through">
                {formatPrice(product.oldPrice, t.common.currency)}
              </span>
            )}
          </div>
          {product.sizes.length > 0 && (
            <span className="text-[10px] text-zinc-500">
              {t.common.size}:{" "}
              {product.sizes.length === 1
                ? product.sizes[0]
                : `${product.sizes[0]}–${product.sizes[product.sizes.length - 1]}`}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
