import type { LocalizedText } from "@/types";

type ClassValue = string | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Texte identique dans les deux langues (noms de technologies, etc.). */
export function same(value: string): LocalizedText {
  return { fr: value, en: value };
}

export function toTelHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}