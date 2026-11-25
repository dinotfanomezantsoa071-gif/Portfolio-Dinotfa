"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE, sectionViewport } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Délai en secondes avant l'apparition. */
  delay?: number;
}

/** Fait apparaître son contenu (fade + slide-up) quand il entre dans l'écran. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={sectionViewport}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}