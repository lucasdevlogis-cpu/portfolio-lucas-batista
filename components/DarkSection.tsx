import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

type GlowVariant = "hero" | "top-right" | "top-left";

const glowLayers: Record<GlowVariant, string> = {
  hero: `
    radial-gradient(120% 90% at 85% 0%, color-mix(in srgb, var(--accent) 28%, transparent) 0%, transparent 55%),
    radial-gradient(90% 80% at 0% 100%, color-mix(in srgb, var(--primary) 85%, transparent) 0%, transparent 60%),
    linear-gradient(160deg, var(--surface-dark-2) 0%, var(--surface-dark) 45%, var(--surface-dark-3) 100%)
  `,
  "top-right": `
    radial-gradient(90% 70% at 100% 0%, color-mix(in srgb, var(--accent) 20%, transparent) 0%, transparent 55%),
    linear-gradient(160deg, var(--surface-dark-2) 0%, var(--surface-dark) 60%, var(--surface-dark-3) 100%)
  `,
  "top-left": `
    radial-gradient(80% 60% at 0% 0%, color-mix(in srgb, var(--accent) 18%, transparent) 0%, transparent 55%),
    linear-gradient(200deg, var(--surface-dark-2) 0%, var(--surface-dark) 55%, var(--surface-dark-3) 100%)
  `,
};

const gridStyle: CSSProperties = {
  backgroundImage: `
    linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
  `,
  backgroundSize: "56px 56px",
  maskImage: "radial-gradient(100% 70% at 70% 20%, black 0%, transparent 75%)",
  WebkitMaskImage:
    "radial-gradient(100% 70% at 70% 20%, black 0%, transparent 75%)",
};

interface DarkSectionProps {
  children: ReactNode;
  className?: string;
  glow?: GlowVariant;
  grid?: boolean;
  id?: string;
}

/**
 * Faixa escura navy da landing. Fonte única para Hero/Método/IA:
 * encapsula fundo `--surface-dark`, o glow radial teal/navy e a grade sutil.
 */
export function DarkSection({
  children,
  className,
  glow = "top-right",
  grid = false,
  id,
}: DarkSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden bg-surface-dark text-on-dark",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: glowLayers[glow] }}
        aria-hidden
      />
      {grid ? (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={gridStyle}
          aria-hidden
        />
      ) : null}
      {children}
    </section>
  );
}
