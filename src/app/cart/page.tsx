"use client";

import { ShoppingBag } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { CheckoutForm } from "@/components/cart/CheckoutForm";
import { useTranslations } from "next-intl";
import { useCartStore } from "@/store/cart";
import { CartRowSkeleton } from "@/components/ui/Skeleton";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SectionErrorFallback } from "@/components/SectionErrorFallback";

export default function CartPage() {
  const t = useTranslations();
  const items = useCartStore((s) => s.items);
  const hydrated = useCartStore((s) => s.hydrated);

  return (
    <Container className="py-10 sm:py-14">
      <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
        {t("cart.title")}
      </h1>

      {!hydrated ? (
        <div
          className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5"
          aria-busy
        >
          <CartRowSkeleton />
          <CartRowSkeleton />
        </div>
      ) : items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <ErrorBoundary
            fallback={(_, reset) => <SectionErrorFallback reset={reset} />}
          >
            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
              {items.map((item) => (
                <CartItemRow key={item.lineId} item={item} />
              ))}
            </section>
          </ErrorBoundary>

          <ErrorBoundary
            fallback={(_, reset) => <SectionErrorFallback reset={reset} />}
          >
            <CheckoutForm />
          </ErrorBoundary>
        </div>
      )}
    </Container>
  );

  function EmptyCart() {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 p-12 text-center">
        <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-lime-400/10 text-lime-400">
          <ShoppingBag className="h-6 w-6" />
        </span>
        <h2 className="text-xl font-bold">{t("cart.empty")}</h2>
        <p className="mt-1 text-sm text-zinc-400">{t("home.heroSubtitle")}</p>
        <div className="mt-6">
          <ButtonLink href="/catalog">{t("cart.emptyAction")}</ButtonLink>
        </div>
      </div>
    );
  }
}
