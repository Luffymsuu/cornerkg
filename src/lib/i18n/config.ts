/**
 * i18n configuration shared between server and client.
 *
 * Translation messages live in `/messages/{locale}.json`. They are loaded
 * statically here so the bundler can split them per locale. The active
 * locale is stored in the Zustand `useLocaleStore` (persisted to
 * localStorage); see `src/components/i18n/I18nProvider.tsx` for how it's
 * wired up to next-intl.
 */

import ruMessages from "../../../messages/ru.json";
import kgMessages from "../../../messages/kg.json";
import enMessages from "../../../messages/en.json";

export const LOCALES = ["ru", "kg", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ru";

export const LOCALE_LABELS: Record<Locale, string> = {
  ru: "Рус",
  kg: "Кыр",
  en: "Eng",
};

export type Messages = typeof ruMessages;

export const messagesByLocale: Record<Locale, Messages> = {
  ru: ruMessages,
  kg: kgMessages,
  en: enMessages,
};
