"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { profile } from "@/data/profile";
import { useLanguage } from "@/lib/language";
import { getNavItems } from "@/lib/navigation";

export function Footer() {
  const { t } = useLanguage();
  const items = getNavItems(t.nav);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-semibold tracking-tight">
              {profile.name}
            </p>
            <p className="mt-2 text-sm text-muted">{t.hero.title}</p>
            <p className="text-sm text-muted">{t.hero.subtitle}</p>
          </div>

          <nav aria-label={t.footer.label}>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
              {items.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="text-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <SocialLinks />
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p>
              © {year} {profile.fullName}. {t.footer.rights}
            </p>
            <p className="mt-1">{t.footer.builtWith}</p>
          </div>

          <Link
            href="/#home"
            className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
          >
            <Icon name="lucide:arrow-up" className="size-4" />
            {t.footer.backToTop}
          </Link>
        </div>
      </div>
    </footer>
  );
}