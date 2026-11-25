import { profile } from "@/data/profile";

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactResult {
  ok: boolean;
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function buildMailtoUrl(payload: ContactPayload, subject: string): string {
  const body = `${payload.message}\n\n- ${payload.name} (${payload.email})`;
  return `mailto:${profile.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

/**
 * Point d'entrée unique pour l'envoi du formulaire.
 * Pour l'instant : ouvre le client mail avec un message prérempli (aucun backend).
 * Plus tard : remplace le corps de cette fonction par un appel fetch
 * vers un service (Formspree, Resend, route API Next.js, etc.).
 */
export async function sendContactMessage(
  payload: ContactPayload,
  subject: string,
): Promise<ContactResult> {
  window.location.href = buildMailtoUrl(payload, subject);
  return { ok: true };
}