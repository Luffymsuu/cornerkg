"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { LOCALES, type Locale } from "@/lib/i18n/dictionaries";

interface LocaleState {
  locale: Locale;
  setLocale: (l: Locale) => void;
  cycleLocale: () => void;
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set, get) => ({
      locale: "ru",
      hydrated: false,
      setLocale: (l) => set({ locale: l }),
      cycleLocale: () => {
        const idx = LOCALES.indexOf(get().locale);
        const next = LOCALES[(idx + 1) % LOCALES.length];
        set({ locale: next });
      },
      setHydrated: (v) => set({ hydrated: v }),
    }),
    {
      name: "corner.locale",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
