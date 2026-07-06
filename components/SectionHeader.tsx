"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "left" | "center" | "right";
  tone?: "light" | "dark";
}

const alignClasses = {
  left: "text-left items-start",
  center: "text-center mx-auto items-center",
  right: "text-right ml-auto items-end",
} as const;

export function SectionHeader({
  title,
  subtitle,
  eyebrow,
  align = "center",
  tone = "light",
}: SectionHeaderProps) {
  return (
    <motion.div
      className={cn("mb-14 flex max-w-3xl flex-col", alignClasses[align])}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      {eyebrow ? (
        <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent-contrast">
          <span className="h-px w-6 bg-accent" aria-hidden />
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "font-heading text-3xl font-bold md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]",
          tone === "dark" ? "text-white" : "text-primary",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            tone === "dark" ? "text-slate-300" : "text-muted-foreground",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  );
}
