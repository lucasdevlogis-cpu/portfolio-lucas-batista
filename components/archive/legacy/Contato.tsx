"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Download,
  ExternalLink,
  FileText,
  Link,
  Mail,
} from "lucide-react";

import { EditorialDarkPanel } from "@/components/archive/legacy/EditorialDarkPanel";
import { SectionHeader } from "@/components/archive/legacy/SectionHeader";
import { Button, buttonVariants } from "@/components/ui/button";
import { CONTENT } from "@/data/content";
import { cn } from "@/lib/utils";

export function Contato() {
  const { pessoal, contactLinks } = CONTENT;
  const hasCv = Boolean(contactLinks.cvUrl);

  return (
    <section
      id="contato"
      className="scroll-mt-20 relative overflow-hidden bg-surface-dark py-20 text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(13,148,136,0.15), transparent 50%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(184,134,11,0.1), transparent 45%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeader
            eyebrow={contactLinks.eyebrow}
            title={contactLinks.titulo}
            subtitle={contactLinks.descricao}
            tone="dark"
            className="max-w-none"
          />
          <p className="mt-6 max-w-xl border-t border-white/10 pt-6 text-sm leading-relaxed text-on-dark-muted">
            {contactLinks.nota}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <EditorialDarkPanel className="rounded-2xl p-6 sm:p-8">
            <div className="grid gap-3">
              <a
                href={pessoal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "group h-12 justify-between rounded-lg bg-white text-ink shadow-card transition-all duration-normal ease-editorial hover:-translate-y-1 hover:bg-white/90 hover:shadow-elevated",
                )}
              >
                <span className="inline-flex items-center gap-2">
                  <Link className="size-4 transition-transform group-hover:scale-110" aria-hidden />
                  {contactLinks.primaryLabel}
                </span>
                <ExternalLink className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </a>

              <a
                href={`mailto:${pessoal.email}`}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "group h-12 justify-between rounded-lg border-white/15 bg-transparent text-white transition-all duration-normal ease-editorial hover:-translate-y-1 hover:bg-white/10 hover:text-white hover:border-white/25",
                )}
              >
                <span className="inline-flex items-center gap-2">
                  <Mail className="size-4 transition-transform group-hover:scale-110" aria-hidden />
                  {pessoal.email}
                </span>
              </a>

              <a
                href={pessoal.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "group h-12 justify-between rounded-lg border-white/15 bg-transparent text-white transition-all duration-normal ease-editorial hover:-translate-y-1 hover:bg-white/10 hover:text-white hover:border-white/25",
                )}
              >
                <span className="inline-flex items-center gap-2">
                  <Code2 className="size-4 transition-transform group-hover:scale-110" aria-hidden />
                  {contactLinks.githubLabel}
                </span>
                <ExternalLink className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </a>

              {hasCv ? (
                <a
                  href={contactLinks.cvUrl}
                  download
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group h-12 justify-between rounded-lg border-white/15 bg-transparent text-white transition-all duration-normal ease-editorial hover:-translate-y-1 hover:bg-white/10 hover:text-white hover:border-white/25",
                  )}
                >
                  <span className="inline-flex items-center gap-2">
                    <FileText className="size-4 transition-transform group-hover:scale-110" aria-hidden />
                    {contactLinks.cvLabel}
                  </span>
                  <Download className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
                </a>
              ) : (
                <Button
                  variant="outline"
                  className="h-12 justify-start rounded-lg border-white/15 bg-transparent text-white/60"
                  disabled
                >
                  <FileText className="size-4" aria-hidden />
                  {contactLinks.cvLabel}
                </Button>
              )}
            </div>
          </EditorialDarkPanel>
        </motion.div>
      </div>
    </section>
  );
}
