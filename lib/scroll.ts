"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const SCROLL_THRESHOLD = 8;

function subscribeToScroll(callback: () => void): () => void {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

const getScrolledSnapshot = (): boolean => window.scrollY > SCROLL_THRESHOLD;

const getScrolledServerSnapshot = (): boolean => false;

/** true dès que la page a défilé de quelques pixels. */
export function useScrolled(): boolean {
  return useSyncExternalStore(
    subscribeToScroll,
    getScrolledSnapshot,
    getScrolledServerSnapshot,
  );
}

/**
 * Renvoie l'identifiant de la section visible au centre de l'écran.
 * `enabled` permet de désactiver l'observation hors de la page d'accueil.
 */
export function useActiveSection(
  ids: readonly string[],
  enabled: boolean,
): string {
  const [active, setActive] = useState<string>(ids[0]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [ids, enabled]);

  return active;
}