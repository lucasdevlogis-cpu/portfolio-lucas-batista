import {
  ArrowUp,
  ArrowUpRight,
  Code2,
  FileText,
  Link,
  Mail,
  Star,
} from "lucide-react";

import { CONTENT, GITHUB_DEMOS_URL } from "@/data/content";

function SocialLink({
  href,
  label,
  children,
  disabled,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  if (disabled || href.startsWith("[substituir")) {
    return (
      <span
        className="inline-flex items-center gap-2 text-sm text-muted-foreground"
        title="Preencher antes do deploy"
      >
        {children}
        <span className="sr-only">{label} — pendente</span>
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-ink"
    >
      {children}
      <span className="sr-only">{label}</span>
    </a>
  );
}

export function Footer() {
  const { pessoal, footer, nav, contactLinks } = CONTENT;
  const emailMissing = pessoal.email.startsWith("[");
  const emailHref = emailMissing ? undefined : `mailto:${pessoal.email}`;

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-12 sm:px-8 lg:grid-cols-4 lg:px-10 xl:px-12">
        <div>
          <p className="font-heading text-lg font-bold text-ink">
            {pessoal.nome}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{pessoal.titulo}</p>

          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent-contrast">
            <Star className="size-3.5" aria-hidden />
            {footer.badgeCases}
          </div>

          <div className="mt-4 flex flex-wrap gap-4">
            <SocialLink
              href={pessoal.linkedin}
              label={contactLinks.linkedinLabel}
              disabled={pessoal.linkedin.startsWith("[")}
            >
              <Link className="size-4" aria-hidden />
              {contactLinks.linkedinLabel}
            </SocialLink>
            <SocialLink
              href={pessoal.github}
              label={contactLinks.githubLabel}
              disabled={pessoal.github.startsWith("[")}
            >
              <Code2 className="size-4" aria-hidden />
              {contactLinks.githubLabel}
            </SocialLink>
            <SocialLink
              href={emailHref ?? "#"}
              label={contactLinks.emailLabel}
              disabled={emailMissing}
            >
              <Mail className="size-4" aria-hidden />
              {contactLinks.emailLabel}
            </SocialLink>
          </div>
        </div>

        <div>
          <p className="font-heading text-sm font-bold text-ink">
            {footer.linksRapidosTitulo}
          </p>
          <nav className="mt-4 flex flex-col gap-2" aria-label="Links rápidos do rodapé">
            {nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors duration-normal ease-editorial hover:text-ink"
              >
                {link.label}
                <ArrowUpRight className="size-3.5 opacity-0 transition-all duration-normal ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" aria-hidden />
              </a>
            ))}
          </nav>
        </div>

        <div>
          <p className="font-heading text-sm font-bold text-ink">Stack</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Python", "SQL", "Power BI", "Streamlit", "Next.js", "Power Automate"].map((stack) => (
              <span
                key={stack}
                className="rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-xs font-semibold text-ink"
              >
                {stack}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="font-heading text-sm font-bold text-ink">Recursos</p>
          <div className="mt-4 flex flex-col gap-2">
            <a
              href={contactLinks.cvUrl}
              download
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-ink"
            >
              <FileText className="size-4" aria-hidden />
              CV em PDF
              <ArrowUpRight className="size-3.5 opacity-0 transition-all group-hover:opacity-100" aria-hidden />
            </a>
            <a
              href={GITHUB_DEMOS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-ink"
            >
              <Code2 className="size-4" aria-hidden />
              Repositório das demos
              <ArrowUpRight className="size-3.5 opacity-0 transition-all group-hover:opacity-100" aria-hidden />
            </a>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            {footer.declaracaoLimitacao}
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 border-t border-border px-5 py-6 sm:flex-row sm:px-8 lg:px-10 xl:px-12">
        <p className="text-sm text-muted-foreground">
          {footer.copyright}
        </p>
        <a
          href="#conteudo"
          className="group inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-bold text-muted-foreground transition-all duration-normal ease-editorial hover:bg-editorial hover:text-ink focus-ring"
          aria-label={footer.voltarTopo}
        >
          <ArrowUp className="size-4 transition-transform group-hover:-translate-y-0.5" aria-hidden />
          {footer.voltarTopo}
        </a>
      </div>
    </footer>
  );
}
