"use client";

import { useLanguage } from "@/lib/language";

/** Premier élément focusable de la page : permet de sauter la navigation au clavier. */
export function SkipLink() {
  const { t } = useLanguage();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-foreground"
    >
      {t.meta.skipToContent}
    </a>
  );
}