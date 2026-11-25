"use client";

import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
}

interface GlowStyle extends CSSProperties {
  "--glow-x": string;
  "--glow-y": string;
}

const INITIAL_GLOW_STYLE: GlowStyle = {
  "--glow-x": "50%",
  "--glow-y": "50%",
};

export function GlowCard({ children, className }: GlowCardProps) {
  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    event.currentTarget.style.setProperty("--glow-x", `${x}%`);
    event.currentTarget.style.setProperty("--glow-y", `${y}%`);
  };

  return (
    <div
      className={cn(
        "glow-card relative isolate rounded-3xl transition-[box-shadow,filter] duration-[400ms] hover:brightness-110 hover:[box-shadow:0_10px_32px_rgba(0,0,0,0.2),0_0_48px_color-mix(in_srgb,var(--accent)_24%,transparent)] motion-reduce:transition-none motion-reduce:hover:brightness-100",
        className,
      )}
      onMouseMove={handleMouseMove}
      style={INITIAL_GLOW_STYLE}
    >
      {children}
    </div>
  );
}
