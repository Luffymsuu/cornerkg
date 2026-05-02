"use client";

import { useLocaleStore } from "@/store/locale";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils/cn";

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/70 p-1 text-[11px] font-semibold uppercase tracking-wider",
        className,
      )}
    >
      {LOCALES.map((l: Locale) => (
        <button
          key={l}
          type="button"
          aria-label={`Switch language to ${l}`}
          aria-pressed={locale === l}
          onClick={() => setLocale(l)}
          className={cn(
            "rounded-full px-2.5 py-1 transition",
            locale === l
              ? "bg-lime-400 text-zinc-950"
              : "text-zinc-400 hover:text-zinc-100",
          )}
        >
          {LOCALE_LABELS[l]}
        </button>
      ))}
    </div>
  );
}
