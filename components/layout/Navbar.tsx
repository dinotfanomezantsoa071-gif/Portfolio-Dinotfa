"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { profile } from "@/data/profile";
import { NAV_SECTIONS } from "@/lib/constants";
import { useLanguage } from "@/lib/language";
import { getNavItems } from "@/lib/navigation";
import { useActiveSection, useScrolled } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const MOBILE_MENU_ID = "mobile-menu";

export function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const isHome = pathname === "/";
  const observedSection = useActiveSection(NAV_SECTIONS, isHome);
  const activeId = isHome
    ? observedSection
    : pathname.startsWith("/projects")
      ? "projects"
      : null;

  const items = getNavItems(t.nav);

  const closeMenu = (): void => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        menuOpen
          ? "border-border bg-background"
          : scrolled
            ? "border-border bg-nav backdrop-blur-lg"
            : "border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/#home"
          transitionTypes={["nav-back"]}
          onClick={closeMenu}
          aria-label={t.nav.homeLink}
          className="inline-flex items-center gap-2"
        >
          <span
            aria-hidden="true"
            className="inline-flex size-8 items-center justify-center rounded-lg bg-foreground text-sm font-bold text-background"
          >
            D
          </span>
          <span className="text-base font-semibold tracking-tight">
            {profile.name}
          </span>
        </Link>

        <nav aria-label={t.nav.mainLabel} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => {
              const isActive = activeId === item.id;

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative isolate inline-flex items-center rounded-full px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-muted hover:text-foreground",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active-pill"
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 rounded-full bg-surface-strong"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    ) : null}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />

          <ButtonLink
            href={profile.cvPath}
            download
            variant="secondary"
            size="sm"
            icon="lucide:download"
            className="hidden lg:inline-flex"
          >
            {t.nav.cv}
          </ButtonLink>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls={MOBILE_MENU_ID}
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface-strong lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="inline-flex"
              >
                <Icon
                  name={menuOpen ? "lucide:x" : "lucide:menu"}
                  className="size-5"
                />
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <MobileMenu
        id={MOBILE_MENU_ID}
        open={menuOpen}
        items={items}
        activeId={activeId}
        onNavigate={closeMenu}
      />
    </header>
  );
}