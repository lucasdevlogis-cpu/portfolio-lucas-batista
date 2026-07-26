import { ArrowDownRight, ArrowRight, Mail } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { CONTENT } from "@/data/content";
import { cn } from "@/lib/utils";

export function ExecutiveHero() {
  const { pessoal, hero, careerTarget, recruiterBrief, footerLabels } = CONTENT;
  const [firstName, middleName, ...lastName] = pessoal.nome.split(" ");
  const remainingName = [middleName, ...lastName].filter(Boolean).join(" ");

  return (
    <section className="relative overflow-hidden border-b border-border bg-surface-dark">
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-55" aria-hidden />
      <div
        className="pointer-events-none absolute inset-y-0 left-[62%] hidden w-px bg-border lg:block"
        aria-hidden
      />

      <div className="executive-container relative grid min-h-[calc(100svh-4.25rem)] lg:grid-cols-[minmax(0,1.65fr)_minmax(19rem,0.75fr)]">
        <div className="flex flex-col justify-between py-10 sm:py-14 lg:pr-14 lg:py-14">
          <div className="flex items-center justify-between gap-4 border-b border-border pb-4 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            <span className="text-primary">01 / {hero.badge}</span>
            <span>{pessoal.localizacao}</span>
          </div>

          <div className="py-12 sm:py-16 lg:py-8">
            <h1 className="font-heading text-[clamp(4.1rem,15vw,8.75rem)] font-black uppercase leading-[0.76] tracking-[-0.075em] text-foreground">
              <span className="block lg:hidden">{firstName}</span>
              <span className="block text-primary lg:hidden">{remainingName}</span>
              <span className="hidden lg:block">
                {firstName} {middleName}
              </span>
              <span className="hidden text-primary lg:block">{lastName.join(" ")}</span>
            </h1>
            <p className="mt-8 max-w-4xl font-heading text-[clamp(1.35rem,3vw,2.65rem)] font-bold uppercase leading-[0.98] tracking-[-0.035em] text-foreground">
              {pessoal.headline}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {pessoal.subheadline}
            </p>
          </div>

          <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row">
            <a
              href="#cases"
              className={cn(
                buttonVariants({ variant: "executive", size: "lg" }),
                "h-14 w-full justify-between px-5 sm:w-auto sm:min-w-64",
              )}
            >
              {hero.ctaPrimario}
              <ArrowDownRight className="size-5" aria-hidden />
            </a>
            <a
              href="#contato"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-14 w-full justify-between border-border bg-transparent px-5 text-foreground hover:border-primary hover:bg-primary/8 sm:w-auto sm:min-w-56",
              )}
            >
              {hero.ctaSecundario}
              <Mail className="size-4" aria-hidden />
            </a>
          </div>
        </div>

        <aside className="border-t border-border py-10 lg:border-t-0 lg:py-16 lg:pl-10 xl:pl-12">
          <p className="technical-label text-primary">{careerTarget.eyebrow}</p>
          <p className="mt-5 font-heading text-2xl font-extrabold uppercase leading-[1.02] text-foreground">
            {careerTarget.titulo}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {careerTarget.resumo}
          </p>

          <dl className="mt-10 border-t border-border">
            <div className="border-b border-border py-4">
              <dt className="technical-label text-muted-foreground">
                {careerTarget.labels.senioridade}
              </dt>
              <dd className="mt-2 text-sm font-semibold text-foreground">
                {careerTarget.senioridade}
              </dd>
            </div>
            <div className="border-b border-border py-4">
              <dt className="technical-label text-muted-foreground">{footerLabels.stack}</dt>
              <dd className="mt-2 font-mono text-xs leading-relaxed text-accent">
                {pessoal.stackTags.join(" / ")}
              </dd>
            </div>
            <div className="border-b border-border py-4">
              <dt className="technical-label text-muted-foreground">
                {careerTarget.labels.localizacaoAbertura}
              </dt>
              <dd className="mt-2 text-sm font-semibold text-foreground">
                {pessoal.tempoResposta}
              </dd>
            </div>
          </dl>

          <a
            href="#perfil"
            className="group mt-8 inline-flex min-h-11 items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-primary focus-ring"
          >
            {recruiterBrief.eyebrow}
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </a>
        </aside>
      </div>
    </section>
  );
}
