import { Code2, Link, Mail } from "lucide-react";

import { CONTENT } from "@/data/content";

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
      className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
    >
      {children}
      <span className="sr-only">{label}</span>
    </a>
  );
}

export function Footer() {
  const { pessoal, footer } = CONTENT;
  const emailHref = pessoal.email.startsWith("[")
    ? "#"
    : `mailto:${pessoal.email}`;

  return (
    <footer className="border-t bg-white py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="font-heading text-lg font-semibold text-primary">
            {pessoal.nome}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{pessoal.titulo}</p>
          <div className="mt-4 flex flex-wrap gap-4">
            <SocialLink
              href={pessoal.linkedin}
              label="LinkedIn"
              disabled={pessoal.linkedin.startsWith("[")}
            >
              <Link className="size-4" aria-hidden />
              LinkedIn
            </SocialLink>
            <SocialLink
              href={pessoal.github}
              label="GitHub"
              disabled={pessoal.github.startsWith("[")}
            >
              <Code2 className="size-4" aria-hidden />
              GitHub
            </SocialLink>
            <SocialLink
              href={emailHref}
              label="Email"
              disabled={pessoal.email.startsWith("[")}
            >
              <Mail className="size-4" aria-hidden />
              Email
            </SocialLink>
          </div>
        </div>
        <div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {footer.declaracaoLimitacao}
          </p>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl border-t px-4 pt-8 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
