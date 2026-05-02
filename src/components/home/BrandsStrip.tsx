"use client";

import { Section } from "@/components/ui/Section";
import { listBrands } from "@/lib/data/repository";
import { useTranslations } from "next-intl";

export function BrandsStrip() {
  const t = useTranslations();
  const brands = listBrands();
  // Repeat the strip twice so the animation feels continuous.
  const doubled = [...brands, ...brands];

  return (
    <Section title={t("home.brandsTitle")} fullBleed>
      <div className="relative mx-4 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 sm:mx-6 lg:mx-8">
        <div
          className="flex gap-10 whitespace-nowrap py-6 px-4"
          style={{
            animation: "brand-marquee 35s linear infinite",
          }}
        >
          {doubled.map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="text-2xl font-black uppercase tracking-tight text-zinc-300 sm:text-3xl"
            >
              {b}
              <span className="mx-3 text-lime-400">·</span>
            </span>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes brand-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </Section>
  );
}
