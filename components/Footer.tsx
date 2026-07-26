import { ArrowUpRight, Code2, FileText, Link, Mail } from "lucide-react";

import { CONTENT, GITHUB_DEMOS_URL } from "@/data/content";

export function Footer() {
  const { pessoal, footer, nav, contactLinks, footerLabels } = CONTENT;

  return (
    <footer className="border-t border-border bg-surface-dark">
      <div className="executive-container py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <p className="font-heading text-3xl font-black uppercase tracking-[-0.04em] text-foreground">
              {pessoal.nome}
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              {pessoal.titulo}
            </p>
            <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-accent">
              {footer.badgeCases}
            </p>
          </div>

          <nav aria-label={footer.linksRapidosTitulo}>
            <p className="technical-label text-primary">{footer.linksRapidosTitulo}</p>
            <div className="mt-5 grid divide-y divide-border border-t border-border">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group flex min-h-11 items-center justify-between py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </a>
              ))}
            </div>
          </nav>

          <div>
            <p className="technical-label text-primary">{footerLabels.recursos}</p>
            <div className="mt-5 grid divide-y divide-border border-t border-border">
              <a
                href={pessoal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-3 py-2 text-sm text-muted-foreground hover:text-primary"
              >
                <Link className="size-4" aria-hidden />
                {contactLinks.linkedinLabel}
              </a>
              <a
                href={`mailto:${pessoal.email}`}
                className="flex min-h-11 items-center gap-3 py-2 text-sm text-muted-foreground hover:text-primary"
              >
                <Mail className="size-4" aria-hidden />
                {contactLinks.emailLabel}
              </a>
              <a
                href={contactLinks.cvUrl}
                download
                className="flex min-h-11 items-center gap-3 py-2 text-sm text-muted-foreground hover:text-primary"
              >
                <FileText className="size-4" aria-hidden />
                {footerLabels.cvPdf}
              </a>
              <a
                href={GITHUB_DEMOS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-3 py-2 text-sm text-muted-foreground hover:text-primary"
              >
                <Code2 className="size-4" aria-hidden />
                {footerLabels.repositorioDemos}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 border-t border-border pt-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-4xl space-y-2 text-xs leading-relaxed text-muted-foreground">
            <p>{footer.declaracaoLimitacao}</p>
            <p>{footer.declaracaoAnalitica}</p>
          </div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.08em] text-muted-foreground">
            {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
