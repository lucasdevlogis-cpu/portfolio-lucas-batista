import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface MetricPillProps {
  value: string;
  label: string;
  detail?: string;
  tone?: "light" | "dark";
  className?: string;
  icon?: LucideIcon;
  delay?: number;
}

export function MetricPill({
  value,
  label,
  detail,
  tone = "light",
  className,
  icon: Icon,
  delay = 0,
}: MetricPillProps) {
  const dark = tone === "dark";

  return (
    <motion.div
      initial={{ opacity: 1, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className={cn(
        "group min-w-0 overflow-hidden rounded-lg border p-4 transition-colors duration-normal ease-editorial",
        dark
          ? "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]"
          : "border-primary/10 bg-card/80 hover:border-primary/20 hover:bg-card",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        {Icon ? (
          <div
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-md transition-transform duration-normal group-hover:scale-110",
              dark
                ? "bg-white/10 text-on-dark-accent"
                : "bg-primary/[0.06] text-primary",
            )}
          >
            <Icon className="size-4" aria-hidden />
          </div>
        ) : null}
        <div className="min-w-0">
          <p
            className={cn(
              "break-words font-heading text-3xl font-bold leading-none tracking-tight",
              dark ? "text-white" : "text-ink",
            )}
          >
            {value}
          </p>
          <p
            className={cn(
              "mt-2 break-words text-sm font-bold leading-snug",
              dark ? "text-on-dark-accent" : "text-primary",
            )}
          >
            {label}
          </p>
          {detail ? (
            <p
              className={cn(
                "mt-1 break-words text-xs leading-relaxed",
                dark ? "text-on-dark-muted" : "text-muted-foreground",
              )}
            >
              {detail}
            </p>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
