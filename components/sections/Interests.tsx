"use client";

import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { interests } from "@/data/profile";
import { useLanguage } from "@/lib/language";

export function Interests() {
  const { t, localize } = useLanguage();

  return (
    <Reveal className="h-full">
      <section
        aria-labelledby="interests-title"
        className="h-full rounded-2xl border border-border bg-surface p-6 sm:p-8"
      >
        <h2
          id="interests-title"
          className="text-xl font-semibold tracking-tight"
        >
          {t.interests.title}
        </h2>

        <ul className="mt-6 flex flex-wrap gap-2">
          {interests.map((interest) => (
            <li
              key={interest.id}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium"
            >
              <Icon name={interest.icon} className="size-4 text-muted" />
              {localize(interest.label)}
            </li>
          ))}
        </ul>
      </section>
    </Reveal>
  );
}