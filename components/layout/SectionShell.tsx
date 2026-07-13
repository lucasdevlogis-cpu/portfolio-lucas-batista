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
        "scroll-mt-24 overflow-hidden py-10 lg:py-16 xl:py-20",
        dark ? "bg-surface-dark text-white" : "bg-editorial text-ink",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto min-w-0 max-w-[1440px] px-5 sm:px-8 lg:px-10 xl:px-12 2xl:px-16",
          innerClassName,
        )}
      >
        {title ? (
          <div className={cn("mb-5 max-w-4xl lg:mb-8", headerClassName)}>
            {eyebrow ? (
              <p className={dark ? "eyebrow-dark" : "eyebrow"}>{eyebrow}</p>
            ) : null}
            <h2
              className={cn(
                "mt-3 font-heading text-3xl font-bold leading-[1.05] tracking-tight md:text-4xl",
                dark ? "text-white" : "text-ink",
              )}
            >
              {title}
            </h2>
            {lead ? (
              <p
                className={cn(
                  "mt-3 max-w-3xl text-base leading-relaxed md:max-w-4xl",
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
