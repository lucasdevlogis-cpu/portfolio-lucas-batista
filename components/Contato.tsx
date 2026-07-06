import { Code2, ExternalLink, FileText, Link, Mail } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { CONTENT } from "@/data/content";
import { cn } from "@/lib/utils";

export function Contato() {
  const { pessoal, contactLinks } = CONTENT;
  const hasCv = Boolean(contactLinks.cvUrl);

  return (
    <section id="contato" className="scroll-mt-20 bg-surface-dark py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-on-dark-accent">
            {contactLinks.eyebrow}
          </p>
          <h2 className="mt-4 font-heading text-4xl font-black text-white md:text-5xl">
            {contactLinks.titulo}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-on-dark-muted">
            {contactLinks.descricao}
          </p>
          <p className="mt-6 max-w-xl border-t border-white/10 pt-5 text-sm leading-relaxed text-on-dark-muted">
            {contactLinks.nota}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-ink/20 sm:p-7">
          <div className="grid gap-3">
            <a
              href={pessoal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-12 justify-between rounded-md bg-white text-ink hover:bg-white/90",
              )}
            >
              <span className="inline-flex items-center gap-2">
                <Link className="size-4" aria-hidden />
                {contactLinks.primaryLabel}
              </span>
              <ExternalLink className="size-4" aria-hidden />
            </a>

            <a
              href={`mailto:${pessoal.email}`}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 justify-between rounded-md border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white",
              )}
            >
              <span className="inline-flex items-center gap-2">
                <Mail className="size-4" aria-hidden />
                {pessoal.email}
              </span>
              <ExternalLink className="size-4" aria-hidden />
            </a>

            <a
              href={pessoal.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 justify-between rounded-md border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white",
              )}
            >
              <span className="inline-flex items-center gap-2">
                <Code2 className="size-4" aria-hidden />
                {contactLinks.githubLabel}
              </span>
              <ExternalLink className="size-4" aria-hidden />
            </a>

            {hasCv ? (
              <a
                href={contactLinks.cvUrl}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-12 justify-between rounded-md border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white",
                )}
              >
                <span className="inline-flex items-center gap-2">
                  <FileText className="size-4" aria-hidden />
                  {contactLinks.cvLabel}
                </span>
                <ExternalLink className="size-4" aria-hidden />
              </a>
            ) : (
              <Button
                variant="outline"
                className="h-12 justify-start rounded-md border-white/15 bg-transparent text-white/60"
                disabled
              >
                <FileText className="size-4" aria-hidden />
                {contactLinks.cvLabel}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
