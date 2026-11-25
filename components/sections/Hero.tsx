"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { profile } from "@/data/profile";
import { useLanguage } from "@/lib/language";
import { EASE, fadeUp, staggerContainer } from "@/lib/motion";

const container = staggerContainer(0.12, 0.1);

/** Grille discrète en arrière-plan, estompée vers les bords. */
const GRID_STYLE: CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
  backgroundSize: "48px 48px",
  maskImage: "radial-gradient(ellipse at center, black 25%, transparent 75%)",
  WebkitMaskImage:
    "radial-gradient(ellipse at center, black 25%, transparent 75%)",
};

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-50"
        style={GRID_STYLE}
      />

      <div className="container-page grid min-h-[calc(100svh-4rem)] items-center gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-24">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.h1
            id="hero-title"
            variants={fadeUp}
            aria-label={profile.name}
            className="text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl"
          >
            <motion.span
              aria-hidden="true"
              initial={{ opacity: 0, y: 12, scale: 0.75 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.24,
                type: "spring",
                stiffness: 280,
                damping: 17,
              }}
              className="inline-block text-accent"
            >
              {profile.name.charAt(0)}
            </motion.span>
            <span aria-hidden="true">{profile.name.slice(1)}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-2xl font-medium sm:text-3xl"
          >
            <MaskReveal>{t.hero.title}</MaskReveal>
          </motion.p>

          <motion.p
            variants={fadeUp}
            aria-label={t.hero.subtitle}
            className="mt-3 text-base font-medium text-accent sm:text-lg"
          >
            <motion.span
              aria-hidden="true"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.45, ease: EASE }}
              className="inline-block"
            >
              {t.hero.subtitle.charAt(0)}
            </motion.span>
            <span aria-hidden="true">{t.hero.subtitle.slice(1)}</span>
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <ButtonLink
              href="/#projects"
              size="lg"
              icon="lucide:arrow-down"
              iconPosition="right"
              className="w-full sm:w-auto"
            >
              {t.hero.viewProjects}
            </ButtonLink>
            <ButtonLink
              href="/#about"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {t.hero.aboutMe}
            </ButtonLink>
            <ButtonLink
              href={profile.cvPath}
              download
              variant="secondary"
              size="lg"
              icon="lucide:download"
              className="w-full sm:w-auto"
            >
              {t.hero.downloadCv}
            </ButtonLink>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8">
            <SocialLinks />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
          className="relative mx-auto w-full max-w-[15rem] sm:max-w-xs lg:max-w-sm"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-surface">
            {profile.photo ? (
              <Image
                src={profile.photo}
                alt={profile.fullName}
                fill
                priority
                sizes="(min-width: 1024px) 384px, 80vw"
                className="object-cover"
              />
            ) : (
              <div
                aria-hidden="true"
                className="flex size-full items-center justify-center"
              >
                <span className="text-8xl font-semibold text-accent">D</span>
              </div>
            )}
          </div>

          <div className="mt-4 text-center lg:text-left">
            <p className="font-medium">{profile.fullName}</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted">
              <Icon name="lucide:map-pin" className="size-4" />
              {profile.location}
            </p>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label={t.hero.scrollDown}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 rounded-full p-2 text-muted transition-colors hover:text-foreground lg:inline-flex"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex"
        >
          <Icon name="lucide:chevrons-down" className="size-6" />
        </motion.span>
      </a>
    </section>
  );
}