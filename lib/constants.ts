import type { Locale, Theme } from "@/types";

export const DEFAULT_LOCALE: Locale = "fr";

export const DEFAULT_THEME: Theme = "dark";

export const STORAGE_KEYS = {
  theme: "dinot-theme",
  locale: "dinot-locale",
} as const;

export const NAV_SECTIONS = [
  "home",
  "about",
  "skills",
  "projects",
  "journey",
  "contact",
] as const;

export type NavSection = (typeof NAV_SECTIONS)[number];

/** Définis NEXT_PUBLIC_SITE_URL dans .env.local (ou chez ton hébergeur) une fois le site en ligne. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";