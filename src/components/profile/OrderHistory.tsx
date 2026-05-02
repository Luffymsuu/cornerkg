"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useProfileStore } from "@/store/profile";
import { formatPrice } from "@/lib/utils/formatPrice";
import { ListRowSkeleton } from "@/components/ui/Skeleton";

export function OrderHistory() {
  const t = useTranslations();
  const orders = useProfileStore((s) => s.orders);
  const hydrated = useProfileStore((s) => s.hydrated);

  if (!hydrated) {
    return (
      <div className="space-y-3" aria-busy>
        <ListRowSkeleton />
        <ListRowSkeleton />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 p-10 text-center text-sm text-zinc-400">
        {t("profile.noOrders")}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((o) => (
        <article
          key={o.id}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5"
        >
          <header className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                {t("profile.orderId")} #{o.id}
              </div>
              <div className="mt-1 text-xs text-zinc-400">
                {t("profile.orderDate")}:{" "}
                {new Date(o.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="text-right">
              <div className="text-base font-bold text-lime-400">
                {formatPrice(o.total, t("common.currency"))}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-zinc-500">
                {t("profile.orderStatusSent")}
              </div>
            </div>
          </header>

          <ul className="mt-4 space-y-2">
            {o.items.map((it) => (
              <li
                key={it.lineId}
                className="flex items-center gap-3 rounded-xl bg-zinc-950/60 p-2"
              >
                <Link
                  href={`/product/${it.product.slug}`}
                  className="relative aspect-square w-12 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900"
                >
                  <Image
                    src={it.product.images[0]}
                    alt={it.product.title}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </Link>
                <div className="min-w-0 flex-1 text-xs">
                  <Link
                    href={`/product/${it.product.slug}`}
                    className="block truncate font-semibold text-zinc-100 hover:text-lime-400"
                  >
                    {it.product.title}
                  </Link>
                  <div className="text-zinc-500">
                    {it.size && `${t("common.size")}: ${it.size} · `}
                    {t("common.qty")}: {it.quantity}
                  </div>
                </div>
                <span className="text-xs font-semibold text-zinc-200">
                  {formatPrice(it.product.price * it.quantity, t("common.currency"))}
                </span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
