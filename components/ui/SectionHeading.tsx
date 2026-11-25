import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Identifiant du titre, à relier via aria-labelledby sur la section. */
  id: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({
  id,
  title,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("mb-12 max-w-2xl", className)}>
      <h2
        id={id}
        className="text-3xl font-semibold tracking-tight sm:text-4xl"
      >
        {title}
      </h2>
      <div aria-hidden="true" className="mt-4 h-1 w-12 rounded-full bg-accent" />
      {subtitle ? (
        <p className="mt-4 text-base text-muted sm:text-lg">{subtitle}</p>
      ) : null}
    </Reveal>
  );
}