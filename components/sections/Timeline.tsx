"use client";

import { motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education } from "@/data/education";
import { useLanguage } from "@/lib/language";
import { EASE, sectionViewport } from "@/lib/motion";

export function Timeline() {
  const { t, localize } = useLanguage();

  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className="section-y border-y border-border bg-surface"
    >
      <div className="container-page">
        <SectionHeading
          id="journey-title"
          title={t.journey.title}
          subtitle={t.journey.subtitle}
        />

        <div className="relative max-w-3xl">
          <div
            aria-hidden="true"
            className="absolute inset-y-2 start-[7px] w-0.5 bg-border"
          />
          <motion.div
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="absolute inset-y-2 start-[7px] w-0.5 origin-top bg-accent"
          />

          <ol className="space-y-12">
            {education.map((entry) => {
              const topics = entry.topics ? localize(entry.topics) : null;

              return (
                <motion.li
                  key={entry.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={sectionViewport}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="relative ps-10"
                >
                  <span
                    aria-hidden="true"
                    className="absolute start-0 top-1.5 size-4 rounded-full border-2 border-accent bg-surface"
                  />

                  <p className="font-mono text-sm text-accent">
                    {localize(entry.period)}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                    {localize(entry.title)}
                  </h3>

                  {entry.track ? (
                    <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent">
                      <Icon name="lucide:graduation-cap" className="size-4" />
                      <span className="sr-only">{t.journey.track} : </span>
                      {localize(entry.track)}
                    </p>
                  ) : null}

                  <p className="mt-3 text-base text-muted">
                    {entry.institution}
                  </p>

                  {topics ? (
                    <>
                      <p className="mt-5 text-sm font-medium">
                        {t.journey.studied}
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {topics.map((topic) => (
                          <li
                            key={topic}
                            className="rounded-full border border-border bg-background px-3 py-1 text-sm text-muted"
                          >
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}