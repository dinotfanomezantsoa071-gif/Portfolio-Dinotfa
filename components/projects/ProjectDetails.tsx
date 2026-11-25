"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { TechBadge } from "@/components/ui/TechBadge";
import { useLanguage } from "@/lib/language";
import { EASE, fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectDetailsProps {
  project: Project;
  previous: Project;
  next: Project;
}

const heroContainer = staggerContainer(0.1, 0.05);

interface DetailSectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

function DetailSection({ id, title, children }: DetailSectionProps) {
  return (
    <Reveal>
      <section aria-labelledby={`${id}-title`}>
        <h2
          id={`${id}-title`}
          className="text-2xl font-semibold tracking-tight"
        >
          {title}
        </h2>
        <div className="mt-4">{children}</div>
      </section>
    </Reveal>
  );
}

interface CheckListProps {
  items: string[];
}

function CheckList({ items }: CheckListProps) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
            <Icon name="lucide:check" className="size-4" />
          </span>
          <span className="leading-relaxed text-muted">{item}</span>
        </li>
      ))}
    </ul>
  );
}

interface ProjectLinksProps {
  project: Project;
  /** true : affiche « bientôt disponible » quand un lien vaut null. */
  showPlaceholders: boolean;
  className?: string;
}

function ProjectLinks({
  project,
  showPlaceholders,
  className,
}: ProjectLinksProps) {
  const { t } = useLanguage();
  const labels = t.projectDetails;

  const entries = [
    {
      id: "github",
      href: project.github,
      label: labels.github,
      soon: labels.githubSoon,
      icon: "mdi:github",
    },
    {
      id: "demo",
      href: project.demo,
      label: labels.demo,
      soon: labels.demoSoon,
      icon: "lucide:external-link",
    },
  ];

  const visible = entries.filter(
    (entry) => entry.href !== null || showPlaceholders,
  );

  if (visible.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {visible.map((entry) =>
        entry.href ? (
          <ButtonLink
            key={entry.id}
            href={entry.href}
            external
            variant={entry.id === "github" ? "primary" : "secondary"}
            icon={entry.icon}
          >
            {entry.label}
          </ButtonLink>
        ) : (
          <span
            key={entry.id}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-dashed border-border px-5 text-sm text-muted"
          >
            <Icon name={entry.icon} className="size-4" />
            {entry.soon}
          </span>
        ),
      )}
    </div>
  );
}

interface AdjacentLinkProps {
  project: Project;
  direction: "previous" | "next";
}

function AdjacentLink({ project, direction }: AdjacentLinkProps) {
  const { t } = useLanguage();
  const isNext = direction === "next";

  return (
    <Link
      href={`/projects/${project.slug}`}
      transitionTypes={isNext ? ["nav-forward"] : ["nav-back"]}
      className={cn(
        "group flex flex-col gap-2 rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent",
        isNext && "sm:items-end sm:text-right",
      )}
    >
      <span className="inline-flex items-center gap-2 text-sm text-muted">
        {isNext ? null : (
          <Icon
            name="lucide:arrow-left"
            className="size-4 transition-transform group-hover:-translate-x-1"
          />
        )}
        {isNext ? t.projectDetails.next : t.projectDetails.previous}
        {isNext ? (
          <Icon
            name="lucide:arrow-right"
            className="size-4 transition-transform group-hover:translate-x-1"
          />
        ) : null}
      </span>
      <span className="text-lg font-semibold tracking-tight">
        {project.title}
      </span>
    </Link>
  );
}

export function ProjectDetails({
  project,
  previous,
  next,
}: ProjectDetailsProps) {
  const { t, localize } = useLanguage();
  const labels = t.projectDetails;

  const context = project.context ? localize(project.context) : null;
  const objective = project.objective ? localize(project.objective) : null;
  const architecture = project.architecture
    ? localize(project.architecture)
    : null;

  return (
    <>
      {/* Hero du projet */}
      <header className="border-b border-border bg-surface">
        <div className="container-page py-12 md:py-16">
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp}>
              <Link
                href="/#projects"
                transitionTypes={["nav-back"]}
                className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                <Icon name="lucide:arrow-left" className="size-4" />
                {labels.back}
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-2 text-sm"
            >
              <span className="rounded-full bg-accent-soft px-3 py-1 font-medium text-accent">
                {localize(project.category)}
              </span>
              <span className="rounded-full border border-border px-3 py-1 text-muted">
                {localize(project.type)}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
            >
              {project.title}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-4 inline-flex items-center gap-2 text-base font-medium text-accent sm:text-lg"
            >
              <Icon name="lucide:user-round" className="size-5" />
              <span className="sr-only">{t.projects.role} : </span>
              {localize(project.role)}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
            >
              {localize(project.description)}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 empty:hidden">
              <ProjectLinks project={project} showPlaceholders={false} />
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* Image de couverture */}
      <div className="container-page pt-10 md:pt-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
          className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-border bg-surface-strong"
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={`${t.projects.imageAlt} ${project.title}`}
              fill
              priority
              sizes="(min-width: 1152px) 1088px, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted">
              <Icon name="lucide:image" className="size-12" />
              <span className="text-sm">{t.projects.imagePlaceholder}</span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Contenu */}
      <div className="container-page section-y grid gap-12 lg:grid-cols-3 lg:gap-16">
        <aside className="lg:col-start-3 lg:row-start-1">
          <div className="space-y-6 lg:sticky lg:top-24">
            <Reveal>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <dl className="space-y-5">
                  <div>
                    <dt className="text-sm text-muted">{labels.myRole}</dt>
                    <dd className="mt-1 font-medium">
                      {localize(project.role)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted">{labels.typeLabel}</dt>
                    <dd className="mt-1 font-medium">
                      {localize(project.type)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted">
                      {t.projects.category}
                    </dt>
                    <dd className="mt-1 font-medium">
                      {localize(project.category)}
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h2 className="text-lg font-semibold tracking-tight">
                  {labels.technologies}
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((name) => (
                    <li key={name}>
                      <TechBadge name={name} />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h2 className="text-lg font-semibold tracking-tight">
                  {labels.links}
                </h2>
                <ProjectLinks
                  project={project}
                  showPlaceholders
                  className="mt-4 flex-col items-start"
                />
              </div>
            </Reveal>
          </div>
        </aside>

        <div className="space-y-14 lg:col-span-2 lg:col-start-1 lg:row-start-1">
          <DetailSection id="presentation" title={labels.presentation}>
            <p className="leading-relaxed text-muted">
              {localize(project.description)}
            </p>
          </DetailSection>

          {context ? (
            <DetailSection id="context" title={labels.context}>
              <p className="leading-relaxed text-muted">{context}</p>
            </DetailSection>
          ) : null}

          {objective ? (
            <DetailSection id="objective" title={labels.objective}>
              <p className="leading-relaxed text-muted">{objective}</p>
            </DetailSection>
          ) : null}

          <DetailSection id="role" title={labels.myRole}>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent">
              <Icon name="lucide:user-round" className="size-4" />
              {localize(project.role)}
            </p>
            <h3 className="mb-3 text-sm font-medium text-muted">
              {labels.work}
            </h3>
            <CheckList items={localize(project.work)} />
          </DetailSection>

          <DetailSection id="features" title={labels.features}>
            <CheckList items={localize(project.features)} />
          </DetailSection>

          {architecture ? (
            <DetailSection id="architecture" title={labels.architecture}>
              <CheckList items={architecture} />
            </DetailSection>
          ) : null}

          <DetailSection id="screenshots" title={labels.screenshots}>
            {project.screenshots.length > 0 ? (
              <ul className="grid gap-4 sm:grid-cols-2">
                {project.screenshots.map((shot) => (
                  <li
                    key={shot.src}
                    className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-surface-strong"
                  >
                    <Image
                      src={shot.src}
                      alt={localize(shot.alt)}
                      fill
                      sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border px-6 py-12 text-muted">
                <Icon name="lucide:images" className="size-10" />
                <span className="text-sm">{labels.screenshotsSoon}</span>
              </div>
            )}
          </DetailSection>
        </div>
      </div>

      {/* Projet précédent / suivant */}
      <nav
        aria-label={`${labels.previous} / ${labels.next}`}
        className="border-t border-border bg-surface"
      >
        <div className="container-page grid gap-4 py-10 sm:grid-cols-2">
          <AdjacentLink project={previous} direction="previous" />
          <AdjacentLink project={next} direction="next" />
        </div>
      </nav>
    </>
  );
}