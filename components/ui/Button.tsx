"use client";

import Link from "next/link";
import type {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";
import { Icon } from "@/components/ui/Icon";
import { useLanguage } from "@/lib/language";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";
type IconPosition = "left" | "right";

interface ButtonStyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Nom Iconify, ex : "lucide:arrow-right". */
  icon?: string;
  iconPosition?: IconPosition;
  className?: string;
}

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-foreground hover:bg-accent-strong",
  secondary:
    "border border-border bg-surface text-foreground hover:border-accent hover:bg-surface-strong",
  ghost: "text-muted hover:bg-surface hover:text-foreground",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: ButtonStyleProps): string {
  return cn(
    BASE_CLASSES,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  );
}

interface ButtonContentProps {
  icon?: string;
  iconPosition: IconPosition;
  children: ReactNode;
}

function ButtonContent({ icon, iconPosition, children }: ButtonContentProps) {
  return (
    <>
      {icon && iconPosition === "left" ? (
        <Icon name={icon} className="size-4 shrink-0" />
      ) : null}
      <span>{children}</span>
      {icon && iconPosition === "right" ? (
        <Icon name={icon} className="size-4 shrink-0" />
      ) : null}
    </>
  );
}

interface ButtonProps
  extends ButtonStyleProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {}

/** Bouton d'action (formulaires, actions). Pour un lien, utilise ButtonLink. */
export function Button({
  variant,
  size,
  icon,
  iconPosition = "left",
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, className })}
      {...rest}
    >
      <ButtonContent icon={icon} iconPosition={iconPosition}>
        {children}
      </ButtonContent>
    </button>
  );
}

interface ButtonLinkProps extends ButtonStyleProps {
  href: string;
  /** Lien externe : s'ouvre dans un nouvel onglet. */
  external?: boolean;
  /** Téléchargement d'un fichier (ex : le CV). */
  download?: boolean;
  ariaLabel?: string;
  transitionTypes?: string[];
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  children: ReactNode;
}

/** Lien stylé comme un bouton : interne (next/link), externe ou téléchargement. */
export function ButtonLink({
  href,
  external = false,
  download = false,
  ariaLabel,
  transitionTypes,
  onClick,
  variant,
  size,
  icon,
  iconPosition = "left",
  className,
  children,
}: ButtonLinkProps) {
  const { t } = useLanguage();
  const classes = buttonClasses({ variant, size, className });

  if (external || download) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        aria-label={ariaLabel}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        download={download ? true : undefined}
      >
        <ButtonContent icon={icon} iconPosition={iconPosition}>
          {children}
        </ButtonContent>
        {external ? <span className="sr-only">{t.common.newTab}</span> : null}
      </a>
    );
  }

  return (
    <Link
      href={href}
      transitionTypes={transitionTypes}
      className={classes}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <ButtonContent icon={icon} iconPosition={iconPosition}>
        {children}
      </ButtonContent>
    </Link>
  );
}