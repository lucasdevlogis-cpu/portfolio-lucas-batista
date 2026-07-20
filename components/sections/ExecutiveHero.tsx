"use client";

import {
  ArrowRight,
  Building2,
  Mail,
} from "lucide-react";

import { SectionShell } from "@/components/layout/SectionShell";
import { analytics } from "@/lib/analytics";
import { EditorialBadge } from "@/components/ui/EditorialBadge";
import { buttonVariants } from "@/components/ui/button";
import { CONTENT } from "@/data/content";
import { cn } from "@/lib/utils";

export function ExecutiveHero() {
  const { pessoal, hero } = CONTENT;

  return (
    <SectionShell
      className="relative overflow-hidden border-b border-white/10 bg-surface-dark pb-10 pt-12 text-white lg:pt-14 xl:pt-16"
      innerClassName="relative grid max-w-[1440px] items-start gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.75fr)] lg:gap-10 xl:grid-cols-[minmax(0,1.35fr)_minmax(380px,0.65fr)] xl:gap-12"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_82%_12%,rgba(20,184,166,0.14),transparent_58%),radial-gradient(ellipse_48%_42%_at_12%_86%,rgba(212,168,83,0.12),transparent_52%)]"
        aria-hidden
      />
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-35" aria-hidden />
      <div className="bg-noise pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-transparent to-editorial"
        aria-hidden
      />

      <div className="relative flex min-w-0 flex-col justify-center">
        <div>
          <EditorialBadge tone="dark">{hero.badge}</EditorialBadge>
        </div>

        <h1 className="mt-3 max-w-full break-words font-heading text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-6xl">
          {pessoal.nome}
        </h1>

        <p className="mt-4 max-w-[820px] break-words text-xl font-semibold leading-tight text-on-dark-accent sm:text-2xl">
          {pessoal.titulo}
        </p>

        <p className="mt-4 max-w-[780px] break-words text-base leading-relaxed text-on-dark-muted md:text-lg">
          {pessoal.subheadline}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href="#cases"
            onClick={() => analytics.ctaClick(hero.ctaPrimario, "hero")}
            className={cn(
              buttonVariants({ variant: "executive", size: "lg" }),
              "group/button h-12 w-full gap-2 rounded-lg bg-accent-contrast px-6 text-base font-bold text-white shadow-glow transition-all duration-normal ease-editorial hover:-translate-y-0.5 hover:bg-primary sm:w-auto",
            )}
          >
            {hero.ctaPrimario}
            <ArrowRight className="size-4 transition-transform duration-normal group-hover/button:translate-x-1" aria-hidden />
          </a>
          <a
            href="#contato"
            onClick={() => analytics.ctaClick(hero.ctaSecundario, "hero")}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-12 w-full gap-2 rounded-lg border-white/15 bg-white/[0.055] px-6 text-base font-bold text-white backdrop-blur-sm transition-all duration-normal ease-editorial hover:-translate-y-0.5 hover:bg-white/10 hover:text-white sm:w-auto",
            )}
          >
            <Mail className="size-4" aria-hidden />
            {hero.ctaSecundario}
          </a>
        </div>
      </div>

      <div className="relative hidden min-w-0 lg:block">
        <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-sm">
          <div className="flex items-start gap-4 border-b border-white/10 pb-5">
            <div className="relative flex size-18 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-primary to-accent shadow-lg">
              <span className="font-heading text-lg font-bold text-white">LB</span>
            </div>
            <div className="min-w-0">
              <p className="font-heading text-xl font-bold text-white">{pessoal.nomeCurto}</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {pessoal.stackTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.07] px-2.5 py-1 text-[11px] font-semibold text-on-dark-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-on-dark-muted">Passagem por</p>
            <div className="mt-3 flex flex-col gap-2 text-sm font-semibold text-white/90">
              {pessoal.empresasResumo.map((empresa) => (
                <span key={empresa.nome} className="flex items-center gap-2">
                  <Building2 className="size-4 shrink-0 text-on-dark-accent" aria-hidden />
                  {empresa.abreviacao
                    ? `${empresa.nome} (${empresa.abreviacao})`
                    : empresa.nome}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </SectionShell>
  );
}
