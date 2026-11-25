"use client";

import { ViewTransition, type ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const directionalAnimations = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "none",
};

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <ViewTransition
      default="none"
      enter={directionalAnimations}
      exit={directionalAnimations}
    >
      {children}
    </ViewTransition>
  );
}
