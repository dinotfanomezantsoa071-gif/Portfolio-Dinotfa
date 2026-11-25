"use client";

import { useCallback, useSyncExternalStore } from "react";
import { DEFAULT_THEME, STORAGE_KEYS } from "@/lib/constants";
import { createPersistedStore } from "@/lib/persisted-store";
import type { Theme } from "@/types";

const isTheme = (value: string | null): value is Theme =>
  value === "light" || value === "dark";

function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!prefersReducedMotion) {
    root.classList.add("theme-transition");
    window.setTimeout(() => root.classList.remove("theme-transition"), 400);
  }

  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;
}

const themeStore = createPersistedStore<Theme>({
  key: STORAGE_KEYS.theme,
  fallback: DEFAULT_THEME,
  isValid: isTheme,
  getDefault: () => DEFAULT_THEME,
  onChange: applyTheme,
});

export function useTheme() {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot,
  );

  const toggleTheme = useCallback(() => {
    themeStore.set(theme === "dark" ? "light" : "dark");
  }, [theme]);

  return { theme, setTheme: themeStore.set, toggleTheme };
}