"use client";

import { useTranslations } from "next-intl";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

interface InfoPageProps {
  /** Translation key under `pages.*` (e.g. "delivery", "returns", "about"). */
  pageKey: "delivery" | "returns" | "about";
  /** Stable section keys; each section reads `pages.<pageKey>.sections.<key>.{title,body}`. */
  sections: readonly string[];
}

/**
 * Shared layout for `/info/delivery`, `/info/returns`, `/about`. Renders a
 * page header followed by a stack of titled sections, then a WhatsApp CTA.
 * Content is provided via i18n; section bodies are kept intentionally
 * generic — concrete tariffs / numbers belong in WhatsApp, not in static
 * marketing copy.
 */
export function InfoPage({ pageKey, sections }: InfoPageProps) {
  const t = useTranslations();
  return (
    <Container className="py-12 sm:py-20">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
          {t(`pages.${pageKey}.title`)}
        </h1>
        <p className="mt-3 text-base text-zinc-300 sm:text-lg">
          {t(`pages.${pageKey}.subtitle`)}
        </p>

        <div className="mt-10 space-y-6">
          {sections.map((key) => (
            <section
              key={key}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 sm:p-6"
            >
              <h2 className="text-lg font-bold text-zinc-100 sm:text-xl">
                {t(`pages.${pageKey}.sections.${key}.title`)}
              </h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-zinc-300">
                {t(`pages.${pageKey}.sections.${key}.body`)}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-lime-400/20 bg-lime-400/5 p-5 text-sm text-zinc-200">
          {t(`pages.${pageKey}.footerCta`)}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
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
