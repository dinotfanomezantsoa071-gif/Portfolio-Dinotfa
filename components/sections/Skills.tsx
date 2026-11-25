"use client";

import { motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechBadge } from "@/components/ui/TechBadge";
import { notions, skillCategories } from "@/data/skills";
import { useLanguage } from "@/lib/language";
import { fadeUp, sectionViewport, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const container = staggerContainer(0.08);

/**
 * Grille de 6 colonnes sur grand écran : 3 cartes de 2 colonnes, puis 2 cartes
 * de 3 colonnes (prévu pour 5 catégories). Sur tablette, la dernière carte
 * impaire occupe toute la largeur.
 */
function spanClasses(index: number, total: number): string {
  const desktop = index < 3 ? "lg:col-span-2" : "lg:col-span-3";
  const tablet =
    index === total - 1 && total % 2 === 1 ? "md:max-lg:col-span-2" : "";
  return cn(desktop, tablet);
}

export function Skills() {
  const { t, localize } = useLanguage();

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="section-y border-y border-border bg-surface"
    >
      <div className="container-page">
        <SectionHeading
          id="skills-title"
          title={t.skills.title}
          subtitle={t.skills.subtitle}
        />

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-6"
        >
          {skillCategories.map((category, index) => (
            <motion.li
              key={category.id}
              variants={fadeUp}
              className={cn(
                "rounded-2xl border border-border bg-background p-6",
                spanClasses(index, skillCategories.length),
              )}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon name={category.icon} className="size-5" />
                </span>
                <h3 className="text-lg font-semibold tracking-tight">
                  {localize(category.title)}
                </h3>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <li key={item.name.fr}>
                    <TechBadge name={localize(item.name)} icon={item.icon} />
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </motion.ul>

        {/* Notions : bloc volontairement séparé (bordure en pointillés). */}
        <Reveal className="mt-10">
          <div className="rounded-2xl border border-dashed border-border p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-border text-muted">
                <Icon name={notions.icon} className="size-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight">
                  {localize(notions.title)}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {t.skills.notionsDescription}
                </p>
              </div>
            </div>

            <ul className="mt-6 flex flex-wrap gap-2">
              {notions.items.map((item) => (
                <li key={item.name.fr}>
                  <TechBadge
                    name={localize(item.name)}
                    icon={item.icon}
                    className="border-dashed"
                  />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}