"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowLeft, MessageCircle, ChevronDown } from "lucide-react";
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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Container className="py-12 sm:py-20">
      <div className="max-w-3xl">
        <ButtonLink
          href="/"
          variant="outline"
          leftIcon={<ArrowLeft className="h-4 w-4" />}
          className="mb-6"
        >
          {t("nav.home")}
        </ButtonLink>

        <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
          {t("pages.faq.title")}
        </h1>
        <p className="mt-3 text-base text-zinc-300 sm:text-lg">
          {t("pages.faq.subtitle")}
        </p>

        <div className="mt-10 divide-y divide-zinc-800/80 rounded-2xl border border-zinc-800 bg-zinc-900/50">
          {ITEM_KEYS.map((key, i) => (
            <div key={key} className="px-5 py-4 sm:px-6 sm:py-5">
              <button
                onClick={() => handleToggle(i)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 text-left text-base font-semibold text-zinc-100"
              >
                <span>{t(`pages.faq.items.${key}.q`)}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-200 ${
                    openIndex === i
                      ? "rotate-180 text-lime-400"
                      : "rotate-0"
                  }`}
                  aria-hidden
                />
              </button>
              {openIndex === i && (
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  {t(`pages.faq.items.${key}.a`)}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-lime-400/20 bg-lime-400/5 p-5 text-sm text-zinc-200">
          {t("pages.faq.footerCta")}
        </div>

        <div className="mt-6">
          <ButtonLink
            href="https://wa.me/996709993289"
            leftIcon={<MessageCircle className="h-4 w-4" />}
          >
            {t("common.writeOnWhatsapp")}
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
