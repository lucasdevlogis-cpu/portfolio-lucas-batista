"use client";

import { motion } from "framer-motion";
import { Code2, Download, ExternalLink, FileText, Link, Mail } from "lucide-react";

import { SectionShell } from "@/components/layout/SectionShell";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { buttonVariants } from "@/components/ui/button";
import { CONTENT } from "@/data/content";
import { cn } from "@/lib/utils";

export function ContactPanel() {
  const { contactLinks, pessoal } = CONTENT;

  return (
    <SectionShell
      id="contato"
      tone="dark"
      eyebrow={contactLinks.eyebrow}
      title={contactLinks.titulo}
      lead={contactLinks.descricao}
      className="relative overflow-hidden bg-surface-dark"
      innerClassName="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
      headerClassName="mb-0"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_78%_20%,rgba(20,184,166,0.12),transparent_55%),radial-gradient(ellipse_50%_40%_at_10%_85%,rgba(212,168,83,0.12),transparent_50%)]"
        aria-hidden
      />
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-30" aria-hidden />

      <motion.div
        initial={{ opacity: 1, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <p className="max-w-xl text-base leading-relaxed text-on-dark-muted lg:text-lg">
          {contactLinks.nota}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 1, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <PremiumCard tone="dark" className="relative p-6 lg:p-8" gradientBorder>
          <div className="grid gap-3">
            <a
              href={pessoal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "default" }),
                "group h-13 justify-between rounded-lg bg-white px-5 text-ink hover:bg-white/90",
              )}
            >
              <span className="inline-flex items-center gap-2">
                <Link className="size-4" aria-hidden />
                {contactLinks.primaryLabel}
              </span>
              <ExternalLink className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </a>
            <a
              href={`mailto:${pessoal.email}`}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-13 justify-start rounded-lg border-white/15 bg-white/[0.04] px-5 text-white transition-all hover:bg-white/10 hover:text-white",
              )}
            >
              <Mail className="size-4" aria-hidden />
              {pessoal.email}
            </a>
            <a
              href={pessoal.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-13 justify-between rounded-lg border-white/15 bg-white/[0.04] px-5 text-white transition-all hover:bg-white/10 hover:text-white",
              )}
            >
              <span className="inline-flex items-center gap-2">
                <Code2 className="size-4" aria-hidden />
                {contactLinks.githubLabel}
              </span>
              <ExternalLink className="size-4" aria-hidden />
            </a>
            {contactLinks.cvUrl ? (
              <a
                href={contactLinks.cvUrl}
                download
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-13 justify-between rounded-lg border-white/15 bg-white/[0.04] px-5 text-white transition-all hover:bg-white/10 hover:text-white",
                )}
              >
                <span className="inline-flex items-center gap-2">
                  <FileText className="size-4" aria-hidden />
                  {contactLinks.cvLabel}
                </span>
                <Download className="size-4" aria-hidden />
              </a>
            ) : null}
          </div>
        </PremiumCard>
      </motion.div>
    </SectionShell>
  );
}
