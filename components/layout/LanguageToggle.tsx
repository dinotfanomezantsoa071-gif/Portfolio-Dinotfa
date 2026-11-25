"use client";

import { useLanguage } from "@/lib/language";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

const OPTIONS: readonly Locale[] = ["fr", "en"];

export function LanguageToggle() {
  const { locale, toggleLocale, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={t.language.switchLabel}
      title={t.language.switchLabel}
      className="inline-flex h-10 items-center rounded-full border border-border p-1 text-xs font-semibold transition-colors hover:bg-surface-strong"
    >
      {OPTIONS.map((code) => (
        <span
          key={code}
          className={cn(
            "rounded-full px-2.5 py-1.5 leading-none transition-colors",
            locale === code
              ? "bg-accent text-accent-foreground"
              : "text-muted",
          )}
        >
          {code.toUpperCase()}
        </span>
      ))}
    </button>
  );
}