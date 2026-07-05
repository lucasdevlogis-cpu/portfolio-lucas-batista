"use client";

import { cn } from "@/lib/utils";

interface SectionDividerProps {
  /** Cor de início do gradiente */
  from: "background" | "white";
  /** Cor de fim do gradiente */
  to: "background" | "white";
  /** Se deve renderizar uma linha brand sutil no centro */
  withBrandLine?: boolean;
  className?: string;
}

/**
 * Divisor sutil entre seções. Cria uma transição de cor gradiente entre
 * backgrounds adjacentes, com linha brand opcional como thread visual.
 */
export function SectionDivider({
  from,
  to,
  withBrandLine = false,
  className,
}: SectionDividerProps) {
  const fromClass = from === "background" ? "from-background" : "from-white";
  const toClass = to === "background" ? "to-background" : "to-white";

  return (
    <div
      className={cn(
        "relative w-full",
        withBrandLine ? "h-4" : "h-3",
        className,
      )}
      aria-hidden="true"
    >
      {/* Gradiente de transição entre backgrounds */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-b",
          fromClass,
          toClass,
        )}
      />
      {/* Linha brand sutil — thread visual */}
      {withBrandLine ? (
        <div className="absolute top-1/2 right-0 left-0 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/[0.08] to-transparent" />
      ) : null}
    </div>
  );
}
