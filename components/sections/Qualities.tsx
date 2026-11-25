"use client";

import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { qualities } from "@/data/profile";
import { useLanguage } from "@/lib/language";

export function Qualities() {
  const { t, localize } = useLanguage();

  return (
    <Reveal>
      <section
        aria-labelledby="qualities-title"
        className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
      >
        <h2
          id="qualities-title"
          className="text-xl font-semibold tracking-tight"
        >
          {t.qualities.title}
        </h2>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {qualities.map((quality) => (
            <li
              key={quality.id}
              className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3"
            >
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Icon name={quality.icon} className="size-5" />
              </span>
              <span className="text-sm font-medium">
                {localize(quality.label)}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </Reveal>
  );
}