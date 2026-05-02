"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { useT } from "@/lib/i18n";

export function Hero() {
  const t = useT();
  return (
    <section className="relative overflow-hidden border-b border-zinc-900">
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=80"
          alt="streetwear hero"
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
            {t.home.heroKicker}
          </span>
          <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {t.home.heroTitle}
          </h1>
          <p className="mt-5 max-w-xl text-base text-zinc-300 sm:text-lg">
            {t.home.heroSubtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href="/catalog"
              size="lg"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              {t.home.heroCta}
            </ButtonLink>
            <ButtonLink
              href="https://wa.me/996709993289"
              variant="outline"
              size="lg"
              leftIcon={<MessageCircle className="h-4 w-4" />}
            >
              {t.home.heroCtaSecondary}
            </ButtonLink>
          </div>
        </motion.div>

        <div className="pointer-events-none mt-10 grid grid-cols-3 gap-4 text-center sm:max-w-md">
          <Stat value="52K+" label="Instagram" />
          <Stat value="2" label={t.footer.branches.toLowerCase()} />
          <Stat value="100+" label={t.home.brandsTitle.toLowerCase()} />
        </div>
      </Container>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-3 backdrop-blur">
      <div className="text-2xl font-black text-lime-400 sm:text-3xl">{value}</div>
      <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
        {label}
      </div>
    </div>
  );
}
