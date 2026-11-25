import { Icon } from "@/components/ui/Icon";
import { getTechIcon } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";

interface TechBadgeProps {
  name: string;
  /** Icône Iconify personnalisée. Par défaut : celle de lib/tech-icons.ts. */
  icon?: string;
  className?: string;
}

export function TechBadge({ name, icon, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground",
        className,
      )}
    >
      <Icon name={icon ?? getTechIcon(name)} className="size-4 shrink-0 text-muted" />
      {name}
    </span>
  );
}