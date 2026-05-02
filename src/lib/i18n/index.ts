"use client";

import { useLocaleStore } from "@/store/locale";
import { dictionaries, type Dictionary } from "./dictionaries";

/**
 * Returns the active dictionary. Use `t.common.addToCart` etc. — the
 * shape is statically typed against the `ru` reference dictionary.
 */
export function useT(): Dictionary {
  const locale = useLocaleStore((s) => s.locale);
  return dictionaries[locale];
}

export { dictionaries };
export type { Locale, Dictionary } from "./dictionaries";
export { LOCALES, LOCALE_LABELS } from "./dictionaries";
