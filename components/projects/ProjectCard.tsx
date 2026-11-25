"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { GlowCard } from "@/components/ui/GlowCard";
import { Icon } from "@/components/ui/Icon";
import { TechBadge } from "@/components/ui/TechBadge";
import { useLanguage } from "@/lib/language";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  /** Position dans la liste : sert à la numérotation et à l'alternance image/texte. */
  index: number;
}

/**
 * Sur les écrans avec souris, les boutons secondaires apparaissent au survol
 * (ou au focus clavier). Sur écran tactile, ils restent toujours visibles.
 */
const REVEAL_ON_HOVER =
  "[@media(hover:hover)]:translate-y-1 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:translate-y-0 [@media(hover:hover)]:group-focus-within:opacity-100";

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { t, localize } = useLanguage();

  const href = `/projects/${project.slug}`;
  const number = String(index + 1).padStart(2, "0");
  const reversed = index % 2 === 1;
  const hasSecondaryLinks = project.github !== null || project.demo !== null;

  return (
    <GlowCard>
      <motion.article
        whileHover={{ y: -6, transition: { duration: 0.25, ease: EASE } }}
        className="group grid overflow-hidden rounded-3xl border border-border bg-surface transition-[border-color] duration-300 hover:border-accent/50 lg:grid-cols-2"
      >
        <Link
          href={href}
          transitionTypes={["nav-forward"]}
          tabIndex={-1}
          aria-hidden="true"
          className={cn(
            "relative block aspect-[16/10] overflow-hidden bg-surface-strong lg:aspect-auto lg:min-h-[22rem]",
            reversed && "lg:order-2",
          )}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={`${t.projects.imageAlt} ${project.title}`}
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted transition-transform duration-500 ease-out group-hover:scale-105">
              <Icon name="lucide:image" className="size-10" />
              <span className="text-sm">{t.projects.imagePlaceholder}</span>
            </div>
          )}

          <span className="absolute left-4 top-4 z-10 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur">
            {localize(project.category)}
          </span>
        </Link>

        <div className="flex flex-col justify-center gap-5 p-6 sm:p-8 lg:p-10">
          <div className="flex items-center gap-3 text-sm text-muted">
            <span className="font-mono text-accent">{number}</span>
            <span aria-hidden="true" className="h-px w-8 bg-border" />
            <span>{localize(project.type)}</span>
          </div>

          <div>
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-accent">
              <Icon name="lucide:user-round" className="size-4" />
              <span className="sr-only">{t.projects.role} : </span>
              {localize(project.role)}
            </p>
          </div>

          <p className="leading-relaxed text-muted">
            {localize(project.description)}
          </p>

          <ul
            aria-label={t.projects.technologies}
            className="flex flex-wrap gap-2"
          >
            {project.technologies.map((name) => (
              <li key={name}>
                <TechBadge name={name} />
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <ButtonLink
              href={href}
              transitionTypes={["nav-forward"]}
              icon="lucide:arrow-right"
              iconPosition="right"
              ariaLabel={`${t.projects.viewProject} : ${project.title}`}
            >
              {t.projects.viewProject}
            </ButtonLink>

            {hasSecondaryLinks ? (
              <div
                className={cn(
                  "flex flex-wrap gap-2 transition-all duration-300",
                  REVEAL_ON_HOVER,
                )}
              >
                {project.github ? (
                  <ButtonLink
                    href={project.github}
                    external
                    variant="secondary"
                    icon="mdi:github"
                  >
                    {t.projects.github}
                  </ButtonLink>
                ) : null}
                {project.demo ? (
                  <ButtonLink
                    href={project.demo}
                    external
                    variant="secondary"
                    icon="lucide:external-link"
                  >
                    {t.projects.demo}
                  </ButtonLink>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </motion.article>
    </GlowCard>
  );
}