"use client";

import { useTranslations } from "next-intl";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

const ITEM_KEYS = [
  "originals",
  "payment",
  "delivery",
  "returns",
  "tryOn",
  "size",
  "regions",
  "contact",
] as const;

export function FaqList() {
  const t = useTranslations();
  return (
    <Container className="py-12 sm:py-20">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
          {t("pages.faq.title")}
        </h1>
        <p className="mt-3 text-base text-zinc-300 sm:text-lg">
          {t("pages.faq.subtitle")}
        </p>

        <div className="mt-10 divide-y divide-zinc-800/80 rounded-2xl border border-zinc-800 bg-zinc-900/50">
          {ITEM_KEYS.map((key, i) => (
            <details
              key={key}
              open={i === 0}
              className="group px-5 py-4 sm:px-6 sm:py-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-zinc-100 marker:hidden [&::-webkit-details-marker]:hidden">
                <span>{t(`pages.faq.items.${key}.q`)}</span>
                <span
                  aria-hidden
                  className="ml-2 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-zinc-700 text-xs text-zinc-400 transition group-open:rotate-45 group-open:border-lime-400 group-open:text-lime-400"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                {t(`pages.faq.items.${key}.a`)}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-lime-400/20 bg-lime-400/5 p-5 text-sm text-zinc-200">
          {t("pages.faq.footerCta")}
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
