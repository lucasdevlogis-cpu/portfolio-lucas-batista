"use client";

import { ArrowUp, ArrowUpRight, Code2, Link, Mail, Star } from "lucide-react";

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
  const { pessoal, footer, nav } = CONTENT;
  const emailHref = pessoal.email.startsWith("[")
    ? "#"
    : `mailto:${pessoal.email}`;

  const handleVoltarTopo = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        {/* Coluna 1 — Brand + social */}
        <div>
          <p className="font-heading text-lg font-semibold text-primary">
            {pessoal.nome}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{pessoal.titulo}</p>

          {/* Badge prova social */}
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent-contrast">
            <Star className="size-3.5" aria-hidden />
            {footer.badgeCases}
          </div>

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

        {/* Coluna 2 — Links rápidos */}
        <div>
          <p className="font-heading text-sm font-semibold text-primary">
            {footer.linksRapidosTitulo}
          </p>
          <nav className="mt-4 flex flex-col gap-2" aria-label="Links rápidos do rodapé">
            {nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1 text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-primary"
              >
                {link.label}
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            ))}
          </nav>
        </div>

        {/* Coluna 3 — Declaração */}
        <div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {footer.declaracaoLimitacao}
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          {footer.copyright}
        </p>
        <button
          onClick={handleVoltarTopo}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-slate-100 hover:text-primary"
          aria-label={footer.voltarTopo}
        >
          <ArrowUp className="size-4" aria-hidden />
          {footer.voltarTopo}
        </button>
      </div>
    </footer>
  );
}
