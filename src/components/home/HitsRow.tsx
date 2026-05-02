"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { ProductCard } from "@/components/catalog/ProductCard";
import { useTranslations } from "next-intl";
import type { Product } from "@/lib/data/types";

type Variant = "hits" | "new";

export function HitsRow({
  products,
  variant = "hits",
}: {
  products: Product[];
  variant?: Variant;
}) {
  const t = useTranslations();
  const title = variant === "new" ? t("home.newTitle") : t("home.hitsTitle");
  return (
    <Section
      title={title}
      action={
        <Link
          href="/catalog"
          className="hidden items-center gap-1 text-sm font-medium text-lime-400 hover:text-lime-300 sm:inline-flex"
        >
          {t("nav.catalog")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      }
    >
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </Section>
  );
}
