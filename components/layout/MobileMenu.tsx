"use client";

import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { profile } from "@/data/profile";
import { useLanguage } from "@/lib/language";
import { EASE, staggerContainer } from "@/lib/motion";
import type { NavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  id: string;
  open: boolean;
  items: NavItem[];
  activeId: string | null;
  onNavigate: () => void;
}

const listVariants = staggerContainer(0.05, 0.08);

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: EASE },
  },
};

export function MobileMenu({
  id,
  open,
  items,
  activeId,
  onNavigate,
}: MobileMenuProps) {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id={id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="absolute inset-x-0 top-full overflow-hidden border-b border-border bg-background lg:hidden"
        >
          <nav
            aria-label={t.nav.mobileLabel}
            className="container-page max-h-[calc(100dvh-4rem)] overflow-y-auto py-4"
          >
            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-1"
            >
              {items.map((item) => {
                const isActive = activeId === item.id;

                return (
                  <motion.li key={item.id} variants={itemVariants}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "flex min-h-12 items-center justify-between rounded-xl px-3 text-base font-medium transition-colors hover:bg-surface",
                        isActive ? "text-accent" : "text-foreground",
                      )}
                    >
                      {item.label}
                      <Icon
                        name="lucide:arrow-right"
                        className="size-4 text-muted"
                      />
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="mt-3 border-t border-border px-3 pt-4"
            >
              <ButtonLink
                href={profile.cvPath}
                download
                size="lg"
                icon="lucide:download"
                className="w-full"
                onClick={onNavigate}
              >
                {t.hero.downloadCv}
              </ButtonLink>
            </motion.div>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}