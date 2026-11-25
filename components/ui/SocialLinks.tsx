"use client";

import { motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { profile } from "@/data/profile";
import { useLanguage } from "@/lib/language";
import { cn } from "@/lib/utils";

interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: string;
  external: boolean;
}

interface SocialLinksProps {
  className?: string;
}

export function SocialLinks({ className }: SocialLinksProps) {
  const { t } = useLanguage();

  const links: SocialLink[] = [
    {
      id: "github",
      label: t.contact.github,
      href: profile.github,
      icon: "mdi:github",
      external: true,
    },
    {
      id: "linkedin",
      label: t.contact.linkedin,
      href: profile.linkedin,
      icon: "mdi:linkedin",
      external: true,
    },
    {
      id: "email",
      label: t.contact.email,
      href: `mailto:${profile.email}`,
      icon: "lucide:mail",
      external: false,
    },
  ];

  return (
    <ul
      aria-label={t.hero.socialsLabel}
      className={cn("flex items-center gap-2", className)}
    >
      {links.map((link) => (
        <li key={link.id}>
          <motion.a
            href={link.href}
            aria-label={
              link.external ? `${link.label} ${t.common.newTab}` : link.label
            }
            title={link.label}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex size-11 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <Icon name={link.icon} className="size-5" />
          </motion.a>
        </li>
      ))}
    </ul>
  );
}