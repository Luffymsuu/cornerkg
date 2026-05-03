"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations();
  return (
    <section className="relative overflow-hidden border-b border-zinc-900">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent" />
      </div>

      <Container className="relative flex min-h-[78vh] flex-col justify-center py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span className="inline-block rounded-full border border-lime-400/40 bg-lime-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-lime-300">
            {t("home.heroKicker")}
          </span>
          <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {t("home.heroTitle")}
          </h1>
          <p className="mt-5 max-w-xl text-base text-zinc-300 sm:text-lg">
            {t("home.heroSubtitle")}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href="/catalog"
              size="lg"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              {t("home.heroCta")}
            </ButtonLink>
            <ButtonLink
              href="https://wa.me/996709993289"
              variant="outline"
              size="lg"
              leftIcon={<MessageCircle className="h-4 w-4" />}
            >
              {t("home.heroCtaSecondary")}
            </ButtonLink>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
