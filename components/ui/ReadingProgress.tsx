"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/language";

export function ReadingProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const { locale } = useLanguage();

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      frame = 0;

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        maxScroll > 0
          ? Math.min(1, Math.max(0, window.scrollY / maxScroll))
          : 0;
      const progressElement = progressRef.current;

      if (progressElement) {
        progressElement.style.transform = `scaleX(${progress})`;
        progressElement.setAttribute(
          "aria-valuenow",
          String(Math.round(progress * 100)),
        );
      }
    };

    const scheduleUpdate = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    scheduleUpdate();

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <div
      ref={progressRef}
      role="progressbar"
      aria-label={
        locale === "fr" ? "Progression de lecture" : "Reading progress"
      }
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      className="reading-progress fixed left-0 top-0 z-50 h-1 w-full origin-left"
    />
  );
}
