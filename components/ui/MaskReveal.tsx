import type { CSSProperties } from "react";

interface MaskRevealProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function MaskReveal({
  children,
  className,
  delay = 0,
  stagger = 55,
}: MaskRevealProps) {
  let wordIndex = 0;

  return (
    <span className={className}>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">
        {children.split(/(\s+)/).map((part, index) => {
          if (/^\s+$/.test(part)) {
            return part;
          }

          const animationDelay = delay + wordIndex++ * stagger;

          return (
            <span className="mask-reveal-mask" key={`${part}-${index}`}>
              <span
                className="mask-reveal-word"
                style={
                  {
                    animationDelay: `${animationDelay}ms`,
                  } satisfies CSSProperties
                }
              >
                {part}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
