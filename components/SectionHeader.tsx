"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
}

const alignClasses = {
  left: "text-left",
  center: "text-center mx-auto",
  right: "text-right ml-auto",
} as const;

export function SectionHeader({
  title,
  subtitle,
  align = "center",
}: SectionHeaderProps) {
  return (
    <motion.div
      className={cn("mb-12 max-w-3xl", alignClasses[align])}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="font-heading text-3xl font-bold tracking-tight text-primary md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-lg text-muted-foreground">{subtitle}</p>
      ) : null}
    </motion.div>
  );
}
