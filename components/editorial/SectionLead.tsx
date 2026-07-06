import { cn } from "@/lib/utils";

interface SectionLeadProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Cabeçalho editorial — título forte sem risquinho/teal repetido do SectionHeader.
 */
export function SectionLead({
  title,
  subtitle,
  eyebrow,
  align = "left",
  className,
}: SectionLeadProps) {
  return (
    <header
      className={cn(
        "mb-12 max-prose",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-eyebrow text-accent-contrast">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-primary md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-lede text-muted-foreground">{subtitle}</p>
      ) : null}
    </header>
  );
}
