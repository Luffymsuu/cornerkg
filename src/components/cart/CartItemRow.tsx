"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils/formatPrice";
import type { CartItem } from "@/lib/data/types";

export function CartItemRow({ item }: { item: CartItem }) {
  const t = useTranslations();
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeLine = useCartStore((s) => s.removeLine);

  return (
    <div className="flex gap-4 border-b border-zinc-800 py-4 last:border-b-0">
      <Link
        href={`/product/${item.product.slug}`}
        className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 sm:w-28"
      >
        <Image
          src={item.product.images[0]}
          alt={item.product.title}
          fill
          sizes="120px"
          className="object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              {item.product.brand}
            </span>
            <Link
              href={`/product/${item.product.slug}`}
              className="block truncate text-sm font-semibold text-zinc-100 hover:text-lime-400"
            >
              {item.product.title}
            </Link>
            {item.size && (
              <span className="mt-1 inline-block text-xs text-zinc-400">
                {t("common.size")}: {item.size}
              </span>
            )}
          </div>
          <button
            type="button"
            aria-label="remove"
            onClick={() => removeLine(item.lineId)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 hover:border-red-500 hover:text-red-400"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <QtyStepper
            value={item.quantity}
            onDec={() => setQuantity(item.lineId, item.quantity - 1)}
            onInc={() => setQuantity(item.lineId, item.quantity + 1)}
          />
          <div className="text-right">
            <div className="text-base font-bold text-lime-400">
              {formatPrice(item.product.price * item.quantity, t("common.currency"))}
            </div>
            {item.quantity > 1 && (
              <div className="text-[10px] text-zinc-500">
                {formatPrice(item.product.price, t("common.currency"))} ×{" "}
                {item.quantity}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function QtyStepper({
  value,
  onDec,
  onInc,
}: {
  value: number;
  onDec: () => void;
  onInc: () => void;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-zinc-800">
      <button
        type="button"
        aria-label="decrease"
        onClick={onDec}
        className="inline-flex h-9 w-9 items-center justify-center text-zinc-300 hover:text-lime-400"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="min-w-[2ch] px-1 text-center text-sm font-semibold text-zinc-100">
        {value}
      </span>
      <button
        type="button"
        aria-label="increase"
        onClick={onInc}
        className="inline-flex h-9 w-9 items-center justify-center text-zinc-300 hover:text-lime-400"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
