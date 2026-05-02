"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { useTranslations } from "next-intl";
import type { Category } from "@/lib/data/types";

const CATEGORY_TILES: Array<{ key: Category; image: string }> = [
  { key: "sneakers", image: "/categories/sneakers.jpg" },
  { key: "hoodies", image: "/categories/hoodies.jpg" },
  { key: "tshirts", image: "/categories/tshirts.jpg" },
  { key: "pants", image: "/categories/pants.jpg" },
  { key: "outerwear", image: "/categories/outerwear.jpg" },
  { key: "accessories", image: "/categories/accessories.jpg" },
];

export function CategoryTiles() {
  const t = useTranslations();
  return (
    <Section title={t("home.categoriesTitle")}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
        {CATEGORY_TILES.map((tile, idx) => (
          <motion.div
            key={tile.key}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
          >
            <Link
              href={`/catalog?category=${tile.key}`}
              className="group relative block aspect-square overflow-hidden rounded-2xl border border-zinc-800/80"
            >
              <Image
                src={tile.image}
                alt={t(`categories.${tile.key}`)}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <span className="text-sm font-bold tracking-tight text-zinc-50 sm:text-base">
                  {t(`categories.${tile.key}`)}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
