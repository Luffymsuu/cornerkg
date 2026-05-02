"use client";

import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { useLocaleStore } from "@/store/locale";
import { messagesByLocale, DEFAULT_LOCALE } from "@/lib/i18n/config";

/**
 * Bridges the Zustand-based locale store to next-intl. We don't use
 * locale-prefixed routes (URLs stay clean), so this client provider
 * supplies messages based on the current Zustand state. On initial SSR
 * the store returns its default ("ru"); after hydration, the persisted
 * choice takes over and the tree re-renders.
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  const locale = useLocaleStore((s) => s.locale) ?? DEFAULT_LOCALE;
  const messages = messagesByLocale[locale] ?? messagesByLocale[DEFAULT_LOCALE];

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone="Asia/Bishkek"
      now={new Date()}
    >
      {children}
    </NextIntlClientProvider>
  );
}
