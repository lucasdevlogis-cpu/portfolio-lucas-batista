import { ArrowRight, ExternalLink, Mail } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { CONTENT } from "@/data/content";
import { cn } from "@/lib/utils";

export function Hero() {
  const { pessoal, hero, careerTarget, proofStats, contactLinks } = CONTENT;

  return (
    <section className="relative overflow-hidden bg-editorial text-ink">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(15,118,110,0.13),transparent_34%),linear-gradient(180deg,rgba(255,253,248,0.9),rgba(246,241,232,1))]"
        aria-hidden
      />
      <div className="relative mx-auto grid w-full max-w-7xl gap-8 px-4 pt-24 pb-12 sm:px-6 md:pt-32 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)] lg:gap-12 lg:px-8">
        <div className="min-w-0 max-w-3xl overflow-hidden">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-warm-accent">
            {hero.badge}
          </p>
          <h1 className="mt-5 font-heading text-4xl font-black leading-[0.95] text-ink sm:text-6xl lg:text-7xl">
            {pessoal.nome}
          </h1>
          <p className="mt-5 max-w-2xl break-words font-heading text-lg font-bold leading-tight text-primary sm:text-3xl">
            {pessoal.headline}
          </p>
          <p className="mt-5 max-w-xl break-words text-sm leading-relaxed text-muted-foreground sm:max-w-2xl sm:text-lg">
            {pessoal.subheadline}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#cases"
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-12 w-full gap-2 rounded-md bg-ink px-6 text-base font-semibold text-white hover:bg-ink/90 sm:w-auto",
              )}
            >
              {hero.ctaPrimario}
              <ArrowRight className="size-4" aria-hidden />
            </a>
            <a
              href="#contato"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 w-full gap-2 rounded-md border-border bg-card/70 px-6 text-base font-semibold text-ink hover:bg-card sm:w-auto",
              )}
            >
              <Mail className="size-4" aria-hidden />
              {hero.ctaSecundario}
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 border-t border-border pt-6 sm:grid-cols-3">
            {hero.provas.map((prova) => (
              <div key={prova.valor}>
                <p className="font-heading text-3xl font-black text-ink">
                  {prova.valor}
                </p>
                <p className="mt-1 text-sm leading-snug text-muted-foreground">
                  {prova.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <aside className="w-full min-w-0 max-w-full overflow-hidden rounded-xl bg-surface-dark p-5 text-white shadow-2xl shadow-ink/15 lg:p-7">
          <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-on-dark-accent">
              {careerTarget.eyebrow}
            </p>
            <h2 className="mt-3 break-words font-heading text-xl font-bold leading-tight text-white sm:text-2xl">
              {careerTarget.titulo}
            </h2>
            <p className="mt-4 break-words text-sm leading-relaxed text-on-dark-muted">
              {careerTarget.resumo}
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {proofStats.slice(0, 4).map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-white/10 bg-white/[0.045] p-4"
              >
                <p className="font-heading text-2xl font-black text-white">
                  {stat.valor}
                </p>
                <p className="mt-1 text-sm font-semibold text-on-dark-accent">
                  {stat.label}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-on-dark-muted">
                  {stat.detalhe}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-2 border-t border-white/10 pt-5 text-sm text-on-dark-muted">
            <a
              href={pessoal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between gap-3 rounded-md border border-white/10 px-3 py-2 transition-colors hover:bg-white/10 hover:text-white"
            >
              {contactLinks.linkedinLabel}
              <ExternalLink className="size-4" aria-hidden />
            </a>
            <a
              href={`mailto:${pessoal.email}`}
              className="inline-flex items-center justify-between gap-3 rounded-md border border-white/10 px-3 py-2 transition-colors hover:bg-white/10 hover:text-white"
            >
              {contactLinks.emailLabel}
              <Mail className="size-4" aria-hidden />
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
