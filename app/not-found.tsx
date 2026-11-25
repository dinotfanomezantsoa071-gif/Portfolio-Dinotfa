"use client";

import { ButtonLink } from "@/components/ui/Button";
import { useLanguage } from "@/lib/language";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <main
      id="main-content"
      className="container-page flex min-h-[70svh] flex-col items-start justify-center gap-5 py-24"
    >
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        {t.notFound.title}
      </h1>
      <p className="max-w-md text-base text-muted sm:text-lg">
        {t.notFound.text}
      </p>
      <ButtonLink href="/" icon="lucide:arrow-left" size="lg">
        {t.notFound.back}
      </ButtonLink>
    </main>
  );
}