"use client";

import { Reveal } from "@/components/ui/Reveal";
import { spokenLanguages } from "@/data/profile";
import { useLanguage } from "@/lib/language";

export function Languages() {
  const { t, localize } = useLanguage();

  return (
    <Reveal className="h-full">
      <section
        aria-labelledby="languages-title"
        className="h-full rounded-2xl border border-border bg-surface p-6 sm:p-8"
      >
        <h2
          id="languages-title"
          className="text-xl font-semibold tracking-tight"
        >
          {t.languages.title}
        </h2>

        <ul className="mt-6 divide-y divide-border">
          {spokenLanguages.map((language) => (
            <li
              key={language.id}
              className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
            >
              <span className="font-medium">{localize(language.name)}</span>
              <span className="text-sm text-muted">
                {localize(language.level)}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </Reveal>
  );
}