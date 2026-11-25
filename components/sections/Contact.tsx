"use client";

import { ContactForm } from "@/components/sections/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";
import { useLanguage } from "@/lib/language";
import { toTelHref } from "@/lib/utils";

interface ContactItem {
  id: string;
  label: string;
  value: string;
  href: string | null;
  icon: string;
  external: boolean;
}

const stripProtocol = (url: string): string =>
  url.replace(/^https?:\/\/(www\.)?/, "");

export function Contact() {
  const { t } = useLanguage();

  const items: ContactItem[] = [
    {
      id: "email",
      label: t.contact.email,
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: "lucide:mail",
      external: false,
    },
    {
      id: "phone",
      label: t.contact.phone,
      value: profile.phone,
      href: toTelHref(profile.phone),
      icon: "lucide:phone",
      external: false,
    },
    {
      id: "github",
      label: t.contact.github,
      value: stripProtocol(profile.github),
      href: profile.github,
      icon: "mdi:github",
      external: true,
    },
    {
      id: "linkedin",
      label: t.contact.linkedin,
      value: stripProtocol(profile.linkedin),
      href: profile.linkedin,
      icon: "mdi:linkedin",
      external: true,
    },
    {
      id: "location",
      label: t.contact.location,
      value: profile.location,
      href: null,
      icon: "lucide:map-pin",
      external: false,
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="section-y"
    >
      <div className="container-page">
        <SectionHeading
          id="contact-title"
          title={t.contact.title}
          subtitle={t.contact.subtitle}
        />

        <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
          <Reveal className="lg:col-span-2">
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.id} className="flex items-start gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-accent">
                    <Icon name={item.icon} className="size-5" />
                  </span>

                  <div className="min-w-0">
                    <p className="text-sm text-muted">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        className="break-words font-medium transition-colors hover:text-accent"
                      >
                        {item.value}
                        {item.external ? (
                          <span className="sr-only"> {t.common.newTab}</span>
                        ) : null}
                      </a>
                    ) : (
                      <p className="font-medium">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="lg:col-span-3" delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}