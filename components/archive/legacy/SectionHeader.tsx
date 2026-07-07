import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  eyebrow,
  tone = "light",
  className,
}: SectionHeaderProps) {
  const isDark = tone === "dark";

  return (
    <header className={cn("max-w-4xl", className)}>
      {eyebrow ? (
        <p className={isDark ? "eyebrow-dark" : "eyebrow"}>{eyebrow}</p>
      ) : null}
      <h2
        className={cn("mt-4", isDark ? "section-title-dark" : "section-title")}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn("mt-5", isDark ? "section-lead-dark" : "section-lead")}
        >
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}
