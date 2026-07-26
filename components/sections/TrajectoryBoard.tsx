import { Award, GraduationCap, Languages } from "lucide-react";

import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/motion/Reveal";
import { CONTENT, isPeriodoAtual } from "@/data/content";

export function TrajectoryBoard() {
  const { experienceSignals } = CONTENT;

  return (
    <SectionShell
      id="trajetoria"
      eyebrow={experienceSignals.eyebrow}
      title={experienceSignals.titulo}
      lead={experienceSignals.resumo}
      className="border-b border-border bg-surface-dark-2"
    >
      <div className="border-t border-border">
        {experienceSignals.experiencias.map((experience, index) => {
          const current = isPeriodoAtual(experience.periodo);
          return (
            <Reveal
              key={experience.cargo + experience.empresa}
              delay={Math.min(index * 0.04, 0.16)}
            >
              <article className="grid border-b border-border py-7 lg:grid-cols-[10rem_minmax(16rem,0.85fr)_1.15fr] lg:gap-8 lg:py-9">
                <div className="flex items-start justify-between gap-4 lg:block">
                  <span className="font-mono text-xs font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground lg:mt-4">
                    {experience.periodo}
                  </p>
                </div>

                <div className="mt-5 lg:mt-0">
                  {current ? (
                    <span className="inline-block border-l-2 border-accent pl-2 font-mono text-[0.65rem] font-bold uppercase tracking-[0.1em] text-accent">
                      Atual
                    </span>
                  ) : null}
                  <h3 className="mt-3 font-heading text-2xl font-extrabold uppercase leading-[0.98] tracking-[-0.025em] text-foreground">
                    {experience.cargo}
                  </h3>
                  <p className="mt-2 font-mono text-xs font-semibold uppercase tracking-[0.06em] text-primary">
                    {experience.empresa}
                  </p>
                </div>

                <div className="mt-6 lg:mt-0">
                  <ul className="grid gap-3 text-sm leading-relaxed text-muted-foreground">
                    {experience.atribuicoes.map((item) => (
                      <li key={item} className="grid grid-cols-[0.75rem_1fr] gap-2">
                        <span className="mt-[0.55rem] h-px bg-primary" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {experience.destaques ? (
                    <div className="mt-5 border-l-2 border-accent pl-4">
                      {experience.destaques.map((highlight) => (
                        <p
                          key={highlight}
                          className="mt-2 font-mono text-xs font-semibold uppercase leading-relaxed tracking-[0.04em] text-accent first:mt-0"
                        >
                          {highlight}
                        </p>
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-12 grid border border-border lg:grid-cols-3">
        <article className="border-b border-border p-6 sm:p-8 lg:border-r lg:border-b-0">
          <div className="flex items-center gap-3 text-primary">
            <GraduationCap className="size-5" aria-hidden />
            <h3 className="technical-label">{experienceSignals.formacaoTitulo}</h3>
          </div>
          <div className="mt-6 divide-y divide-border">
            {experienceSignals.formacao.map((item) => (
              <div key={item.titulo} className="py-4 first:pt-0 last:pb-0">
                <p className="text-sm font-bold text-foreground">{item.titulo}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {item.instituicao} · {item.periodo}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="border-b border-border p-6 sm:p-8 lg:border-r lg:border-b-0">
          <div className="flex items-center gap-3 text-primary">
            <Award className="size-5" aria-hidden />
            <h3 className="technical-label">{experienceSignals.certificacoesTitulo}</h3>
          </div>
          <ul className="mt-6 grid gap-3 text-sm text-muted-foreground">
            {experienceSignals.certificacoes.map((item) => (
              <li key={item} className="border-b border-border pb-3 last:border-0">
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="p-6 sm:p-8">
          <div className="flex items-center gap-3 text-primary">
            <Languages className="size-5" aria-hidden />
            <h3 className="technical-label">{experienceSignals.idiomasTitulo}</h3>
          </div>
          <ul className="mt-6 divide-y divide-border">
            {experienceSignals.idiomas.map((item) => (
              <li key={item} className="py-4 text-sm text-muted-foreground first:pt-0 last:pb-0">
                {item}
              </li>
            ))}
          </ul>
        </article>
      </Reveal>
    </SectionShell>
  );
}
