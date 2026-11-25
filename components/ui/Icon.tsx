"use client";

import { Icon as IconifyIcon } from "@iconify/react";

interface IconProps {
  /** Nom Iconify, ex : "lucide:download". */
  name: string;
  className?: string;
}

/** Icône décorative (masquée aux lecteurs d'écran). Le sens est porté par le texte ou l'aria-label voisin. */
export function Icon({ name, className }: IconProps) {
  return <IconifyIcon icon={name} className={className} aria-hidden="true" />;
}