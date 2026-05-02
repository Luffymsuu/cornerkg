"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, ChevronLeft, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Gallery } from "./Gallery";
import { SizePicker } from "./SizePicker";
import { AddToCart } from "./AddToCart";
import { useT } from "@/lib/i18n";
import { useFavoritesStore } from "@/store/favorites";
import { formatPrice } from "@/lib/utils/formatPrice";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/lib/data/types";

export function ProductView({ product }: { product: Product }) {
  const t = useT();
  const fav = useFavoritesStore((s) => s.has(product.id));
  const toggleFav = useFavoritesStore((s) => s.toggle);
  const [size, setSize] = useState<string | undefined>(undefined);
  const [sizeError, setSizeError] = useState<string | undefined>();

  return (
    <Container className="py-8 sm:py-14">
      <Link
        href="/catalog"
        className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-400 transition hover:text-lime-400"
      >
        <ChevronLeft className="h-4 w-4" />
        {t.common.back}
      </Link>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <Gallery images={product.images} alt={product.title} />

        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {product.isHit && <Badge tone="lime">{t.common.hit}</Badge>}
              {product.isNew && <Badge tone="zinc">{t.common.new}</Badge>}
              {product.condition && (
                <Badge tone="zinc">
                  {t.common.condition}: {product.condition}
                </Badge>
              )}
            </div>
            <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              {product.brand} · {t.categories[product.category]}
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              {product.title}
            </h1>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black text-lime-400">
              {formatPrice(product.price, t.common.currency)}
            </span>
            {product.oldPrice && (
              <span className="text-base text-zinc-500 line-through">
                {formatPrice(product.oldPrice, t.common.currency)}
              </span>
            )}
          </div>

          <p className="text-sm leading-relaxed text-zinc-300">
            {product.description}
          </p>

          {product.sizes.length > 0 ? (
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
                  {t.product.sizesTitle}
                </span>
                {sizeError && (
                  <span className="text-[11px] text-red-400">{sizeError}</span>
                )}
              </div>
              <SizePicker
                sizes={product.sizes}
                value={size}
                onChange={(s) => {
                  setSize(s);
                  setSizeError(undefined);
                }}
              />
            </div>
          ) : (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 text-xs text-zinc-400">
              {t.product.noSizes}
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <div className="flex-1">
              <AddToCart product={product} size={size} onError={setSizeError} />
            </div>
            <button
              type="button"
              onClick={() => toggleFav(product.id)}
              className={cn(
                "inline-flex h-14 items-center justify-center gap-2 rounded-full border px-6 text-sm font-semibold transition",
                fav
                  ? "border-lime-400 text-lime-400"
                  : "border-zinc-800 text-zinc-200 hover:border-lime-400 hover:text-lime-400",
              )}
            >
              <Heart className={cn("h-4 w-4", fav && "fill-lime-400")} />
              {t.nav.favorites}
            </button>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 text-xs text-zinc-400">
            <div className="font-semibold text-zinc-200">
              {t.home.contactsTitle}
            </div>
            <div className="mt-2 space-y-1">
              <div>{t.home.contactAddress}</div>
              <div>{t.home.contactHours}</div>
            </div>
            <div className="mt-3">
              <ButtonLink
                href="https://wa.me/996709993289"
                variant="outline"
                size="sm"
                leftIcon={<MessageCircle className="h-4 w-4" />}
              >
                WhatsApp
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
