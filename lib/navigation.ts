import type { Dictionary } from "@/data/translations";
import { NAV_SECTIONS, type NavSection } from "@/lib/constants";

export interface NavItem {
  id: NavSection;
  label: string;
  href: string;
}

/** Liens de navigation. Le préfixe "/#" fonctionne depuis l'accueil comme depuis les pages projet. */
export function getNavItems(nav: Dictionary["nav"]): NavItem[] {
  return NAV_SECTIONS.map((id) => ({
    id,
    label: nav[id],
    href: `/#${id}`,
  }));
}