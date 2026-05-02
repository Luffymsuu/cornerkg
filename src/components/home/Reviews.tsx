"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { useT } from "@/lib/i18n";

const REVIEWS = [
  {
    name: "Айдана",
    text: "Покупаю уже не первый раз. Кроссы — оригиналы, упаковка как из бутика. 10/10.",
  },
  {
    name: "Тимур",
    text: "Заказал Tech Fleece — забрал в этот же день из 2-го филиала. Менеджер на связи 24/7.",
  },
  {
    name: "Begaiym",
    text: "Лучший выбор стрит-стайла в Бишкеке. Цены ок, бренды реально топ.",
  },
  {
    name: "Илья",
    text: "Брал ресейл-кеды Yeezy, состояние в коробке — как обещали. Респект.",
  },
];

export function Reviews() {
  const t = useT();
  return (
    <Section title={t.home.reviewsTitle}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {REVIEWS.map((r, idx) => (
          <motion.figure
            key={r.name}
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
              “{r.text}”
            </blockquote>
            <figcaption className="mt-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              — {r.name}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}
