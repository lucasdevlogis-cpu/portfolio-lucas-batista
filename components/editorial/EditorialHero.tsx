"use client";

import { ArrowDown, ArrowRight } from "lucide-react";

import { DarkSection } from "@/components/DarkSection";
import { BriefStrip } from "@/components/editorial/BriefStrip";
import { Button } from "@/components/ui/button";
import { CONTENT } from "@/data/content";
import { scrollToSection } from "@/lib/scroll";

/**
 * Hero editorial — 2 colunas desktop, stack mobile. Sem grade decorativa nem pill blur.
 */
export function EditorialHero() {
  const { pessoal, hero } = CONTENT;

  return (
    <DarkSection glow="hero">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-24 pb-16 sm:px-6 md:pt-32 md:pb-20 lg:grid-cols-[minmax(0,1fr)_var(--brief-width)] lg:items-start lg:gap-16">
        <div className="max-prose">
          <p className="text-sm font-medium text-on-dark-muted">
            <span className="font-semibold text-white">{pessoal.nome}</span>
            {" · "}
            {pessoal.titulo}
          </p>

          <p className="text-eyebrow mt-5 text-on-dark-accent">{hero.badge}</p>

          <h1 className="text-display mt-4 font-heading font-bold text-white">
            {pessoal.headline}
          </h1>

          <p className="text-lede mt-6 text-on-dark-muted">
            {pessoal.subheadline}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              className="h-12 gap-2 bg-accent px-7 text-base font-semibold text-white hover:bg-accent/90"
              onClick={() => scrollToSection("#contato")}
            >
              {hero.ctaPrimario}
              <ArrowRight className="size-4" aria-hidden />
            </Button>
            <Button
              className="h-12 gap-2 border border-white/25 bg-transparent px-7 text-base font-medium text-white hover:bg-white/10 hover:text-white"
              onClick={() => scrollToSection("#cases")}
            >
              <ArrowDown className="size-4" aria-hidden />
              {hero.ctaSecundario}
            </Button>
          </div>

          {/* Stats + contato no mobile (headhunter 60s) */}
          <div className="mt-10 lg:hidden">
            <BriefStrip
              variant="inline"
              provasTitulo={hero.provasTitulo}
              provas={hero.provas}
              linkedin={pessoal.linkedin}
              email={pessoal.email}
              className="border-t border-white/10 pt-8"
            />
          </div>
        </div>

        <BriefStrip
          variant="sidebar"
          provasTitulo={hero.provasTitulo}
          provas={hero.provas}
          linkedin={pessoal.linkedin}
          email={pessoal.email}
        />
      </div>
    </DarkSection>
  );
}
