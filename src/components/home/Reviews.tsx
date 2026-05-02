"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { useTranslations } from "next-intl";

const REVIEW_IDS = ["1", "2", "3", "4"] as const;

export function Reviews() {
  const t = useTranslations();
  return (
    <Section title={t("home.reviewsTitle")}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {REVIEW_IDS.map((id, idx) => (
          <motion.figure
            key={id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5"
          >
            <div className="flex items-center gap-1 text-lime-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-lime-400" />
              ))}
            </div>
            <blockquote className="mt-3 text-sm text-zinc-200">
              «{t(`reviews.${id}.text`)}»
            </blockquote>
            <figcaption className="mt-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              — {t(`reviews.${id}.name`)}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}
