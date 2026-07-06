import { Link as LinkIcon, Menu } from "lucide-react";

import { CONTENT } from "@/data/content";

export function Header() {
  const navLinks = CONTENT.nav;

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-editorial/88 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#conteudo"
          className="font-heading text-lg font-black text-ink"
        >
          {CONTENT.pessoal.nome}
        </a>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Principal"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-card hover:text-ink focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {!CONTENT.pessoal.linkedin.startsWith("[") ? (
            <a
              href={CONTENT.pessoal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Lucas Batista"
              className="hidden size-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-card hover:text-ink md:inline-flex"
            >
              <LinkIcon className="size-5" aria-hidden />
            </a>
          ) : null}
          <a
            href="#contato"
            className="hidden h-10 items-center rounded-md bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-ink/90 md:inline-flex"
          >
            {CONTENT.navCta}
          </a>

          <details className="relative md:hidden">
            <summary
              aria-label="Abrir menu"
              className="flex size-10 list-none items-center justify-center rounded-md border border-border bg-card text-ink shadow-sm [&::-webkit-details-marker]:hidden"
            >
              <Menu className="size-5" aria-hidden />
            </summary>
            <nav
              className="absolute right-0 mt-2 w-72 rounded-xl border border-border bg-card p-3 shadow-xl shadow-ink/10"
              aria-label="Mobile"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block rounded-md px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contato"
                className="mt-2 flex h-11 items-center justify-center rounded-md bg-ink px-4 text-sm font-semibold text-white"
              >
                {CONTENT.navCta}
              </a>
              {!CONTENT.pessoal.linkedin.startsWith("[") ? (
                <a
                  href={CONTENT.pessoal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 rounded-md px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-ink"
                >
                  <LinkIcon className="size-5" aria-hidden />
                  LinkedIn
                </a>
              ) : null}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
