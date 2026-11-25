"use client";

import { useCallback, useSyncExternalStore } from "react";
import { translations } from "@/data/translations";
import { DEFAULT_LOCALE, STORAGE_KEYS } from "@/lib/constants";
import { createPersistedStore } from "@/lib/persisted-store";
import type { Locale, Localized } from "@/types";

const isLocale = (value: string | null): value is Locale =>
  value === "fr" || value === "en";

const languageStore = createPersistedStore<Locale>({
  key: STORAGE_KEYS.locale,
  fallback: DEFAULT_LOCALE,
  isValid: isLocale,
  onChange: (locale) => {
    document.documentElement.lang = locale;
  },
});

export function useLanguage() {
  const locale = useSyncExternalStore(
    languageStore.subscribe,
    languageStore.getSnapshot,
    languageStore.getServerSnapshot,
  );

  const toggleLocale = useCallback(() => {
    languageStore.set(locale === "fr" ? "en" : "fr");
  }, [locale]);

  /** Choisit la valeur correspondant à la langue active. */
  const localize = useCallback(
    <T,>(value: Localized<T>): T => value[locale],
    [locale],
  );

  return {
    locale,
    setLocale: languageStore.set,
    toggleLocale,
    t: translations[locale],
    localize,
  };
}