"use client";

import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { spokenLanguages } from "@/data/profile";
import { useLanguage } from "@/lib/language";
import { getAllProjects } from "@/lib/projects";

/** Icônes associées, dans le même ordre que `about.focus` dans data/translations.ts. */
const FOCUS_ICONS: readonly string[] = [
  "lucide:globe",
  "lucide:smartphone",
  "lucide:layers",
  "lucide:terminal",
  "lucide:database",
  "lucide:binary",
  "lucide:pencil-ruler",
];

const FALLBACK_FOCUS_ICON = "lucide:code";

const STUDY_LEVEL = "L3";

export function About() {
  const { t } = useLanguage();

  /** Uniquement des chiffres réels, calculés à partir des données du site. */
  const stats = [
    {
      id: "projects",
      label: t.about.stats.projects,
      value: String(getAllProjects().length),
    },
    { id: "level", label: t.about.stats.level, value: STUDY_LEVEL },
    {
      id: "languages",
      label: t.about.stats.languages,
      value: String(spokenLanguages.length),
    },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="section-y"
    >
      <div className="container-page">
        <SectionHeading id="about-title" title={t.about.title} />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
              {t.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="flex flex-col-reverse justify-end rounded-2xl border border-border bg-surface p-4"
                >
                  <dt className="mt-1 text-xs text-muted sm:text-sm">
                    {stat.label}
                  </dt>
                  <dd className="text-3xl font-semibold tracking-tight">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <h3 className="text-xl font-semibold tracking-tight">
                {t.about.focusTitle}
              </h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {t.about.focus.map((label, index) => (
                  <li
                    key={label}
                    className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3"
                  >
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <Icon
                        name={FOCUS_ICONS[index] ?? FALLBACK_FOCUS_ICON}
                        className="size-5"
                      />
                    </span>
                    <span className="text-sm font-medium">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}