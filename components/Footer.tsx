import { ArrowUp, ArrowUpRight, Code2, FileText, Link, Mail, Star } from "lucide-react";

import { CONTENT, GITHUB_DEMOS_URL } from "@/data/content";

function SocialLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors duration-normal ease-editorial hover:text-ink sm:min-h-9"
    >
      {children}
      <span
        className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-current transition-all duration-normal ease-editorial group-hover:w-full"
        aria-hidden
      />
    </a>
  );
}

export function Footer() {
  const { pessoal, footer, nav, contactLinks, footerLabels } = CONTENT;

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-[1440px] px-5 py-5 sm:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:items-start">
          <div>
            <p className="font-heading text-lg font-bold text-ink">{pessoal.nome}</p>
            <p className="mt-1 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {pessoal.titulo}
            </p>

            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1.5 text-xs font-bold text-accent-contrast">
              <Star className="size-3.5" aria-hidden />
              {footer.badgeCases}
            </div>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
              <SocialLink href={pessoal.linkedin}>
                <Link className="size-4" aria-hidden />
                {contactLinks.linkedinLabel}
              </SocialLink>
              <SocialLink href={pessoal.github}>
                <Code2 className="size-4" aria-hidden />
                {contactLinks.githubLabel}
              </SocialLink>
              <SocialLink href={`mailto:${pessoal.email}`}>
                <Mail className="size-4" aria-hidden />
                {contactLinks.emailLabel}
              </SocialLink>
            </div>
          </div>

          <div className="min-w-0">
            <div className="grid min-w-0 gap-4 sm:grid-cols-3">
              <div>
                <p className="font-heading text-base font-bold text-ink">
                  {footer.linksRapidosTitulo}
                </p>
                <nav
                  className="mt-2 flex flex-wrap gap-x-4 gap-y-1"
                  aria-label={footer.linksRapidosTitulo}
                >
                  {nav.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="group inline-flex min-h-11 items-center gap-1 text-sm text-muted-foreground transition-colors duration-normal ease-editorial hover:text-ink sm:min-h-8"
                    >
                      {link.label}
                      <ArrowUpRight
                        className="size-4 opacity-0 transition-all duration-normal ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                        aria-hidden
                      />
                    </a>
                  ))}
                </nav>
              </div>

              <div>
                <p className="font-heading text-base font-bold text-ink">{footerLabels.stack}</p>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-muted-foreground">
                  {pessoal.stackTags.join(" · ")}
                </p>
              </div>

              <div>
                <p className="font-heading text-base font-bold text-ink">{footerLabels.recursos}</p>
                <div className="mt-2 grid gap-1">
                  <a
                    href={contactLinks.cvUrl}
                    download
                    className="group inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-ink sm:min-h-8"
                  >
                    <FileText className="size-4" aria-hidden />
                    {footerLabels.cvPdf}
                    <ArrowUpRight
                      className="size-4 opacity-0 transition-all group-hover:opacity-100"
                      aria-hidden
                    />
                  </a>
                  <a
                    href={GITHUB_DEMOS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-ink sm:min-h-8"
                  >
                    <Code2 className="size-4" aria-hidden />
                    {footerLabels.repositorioDemos}
                    <ArrowUpRight
                      className="size-4 opacity-0 transition-all group-hover:opacity-100"
                      aria-hidden
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid items-center gap-3 border-t border-border pt-3 pr-14 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:pr-16">
          <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground">
            {footer.declaracaoLimitacao}
          </p>
          <p className="text-sm text-muted-foreground">{footer.copyright}</p>
          <a
            href="#conteudo"
            className="group inline-flex min-h-11 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-bold text-muted-foreground transition-all duration-normal ease-editorial hover:bg-editorial hover:text-ink focus-ring sm:min-h-9"
            aria-label={footer.voltarTopo}
          >
            <ArrowUp
              className="size-4 transition-transform group-hover:-translate-y-0.5"
              aria-hidden
            />
            {footer.voltarTopo}
          </a>
        </div>
      </div>
    </footer>
  );
}
