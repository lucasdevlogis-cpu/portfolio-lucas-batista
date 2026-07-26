import { cn } from "@/lib/utils";

interface SectionShellProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  tone?: "light" | "dark";
  className?: string;
  innerClassName?: string;
  headerClassName?: string;
  children: React.ReactNode;
}

export function SectionShell({
  id,
  eyebrow,
  title,
  lead,
  tone = "light",
  className,
  innerClassName,
  headerClassName,
  children,
}: SectionShellProps) {
  const dark = tone === "dark";

  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 overflow-hidden py-16 lg:py-24 xl:py-28",
        dark ? "bg-surface-dark text-white" : "bg-editorial text-ink",
        className,
      )}
    >
      <div className={cn("executive-container min-w-0", innerClassName)}>
        {title ? (
          <div
            className={cn(
              "mb-8 grid gap-5 lg:mb-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end",
              headerClassName,
            )}
          >
            <div>
              {eyebrow ? <p className={dark ? "eyebrow-dark" : "eyebrow"}>{eyebrow}</p> : null}
              <h2 className={cn("section-title mt-3", dark ? "text-white" : "text-ink")}>
                {title}
              </h2>
            </div>
            {lead ? (
              <p
                className={cn(
                  "max-w-2xl text-base leading-relaxed lg:justify-self-end lg:text-lg",
                  dark ? "text-on-dark-muted" : "text-muted-foreground",
                )}
              >
                {lead}
              </p>
            ) : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
