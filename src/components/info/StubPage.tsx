"use client";

import { useTranslations } from "next-intl";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

interface StubPageProps {
  /** Translation key under `pages.*` (e.g. "delivery", "returns", "faq", "about"). */
  pageKey: "delivery" | "returns" | "faq" | "about";
}

/**
 * Placeholder page rendered for `/info/delivery`, `/info/returns`, `/faq`,
 * `/about` until the store owner provides real copy. Kept intentionally
 * sparse — no fabricated facts (delivery rates, return policy specifics)
 * because those depend on the store's actual operating rules.
 */
export function StubPage({ pageKey }: StubPageProps) {
  const t = useTranslations();
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-16 sm:py-24">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
          {t(`pages.${pageKey}.title`)}
        </h1>
        <p className="mt-4 text-base text-zinc-300 sm:text-lg">
          {t(`pages.${pageKey}.subtitle`)}
        </p>

        <div className="mt-8 rounded-2xl border border-lime-400/20 bg-lime-400/5 p-5 text-sm text-zinc-200">
          {t("pages.stubMessage")}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink
            href="https://wa.me/996709993289"
            leftIcon={<MessageCircle className="h-4 w-4" />}
          >
            {t("common.writeOnWhatsapp")}
          </ButtonLink>
          <ButtonLink
            href="/"
            variant="outline"
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            {t("nav.home")}
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
