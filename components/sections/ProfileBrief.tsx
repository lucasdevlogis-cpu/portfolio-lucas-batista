import { ArrowUpRight } from "lucide-react";

import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/motion/Reveal";
import { CONTENT } from "@/data/content";

export function ProfileBrief() {
  const { careerTarget, recruiterBrief, experienceSignals } = CONTENT;

  return (
    <SectionShell
      id="perfil"
      eyebrow={recruiterBrief.eyebrow}
      title={recruiterBrief.titulo}
      lead={recruiterBrief.resumo}
      className="border-b border-border bg-surface-dark-2"
    >
      <Reveal className="grid border border-border lg:grid-cols-[1.05fr_0.95fr]">
        <article className="border-b border-border p-6 sm:p-8 lg:border-r lg:border-b-0 lg:p-10 xl:p-12">
          <p className="technical-label text-primary">{careerTarget.eyebrow}</p>
          <h3 className="mt-5 max-w-2xl font-heading text-[clamp(2rem,5vw,4.5rem)] font-black uppercase leading-[0.9] tracking-[-0.05em] text-foreground">
            {careerTarget.titulo}
          </h3>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {careerTarget.resumo}
          </p>

          <dl className="mt-10 grid border-t border-border sm:grid-cols-2">
            <div className="border-b border-border py-5 sm:border-r sm:pr-5">
              <dt className="technical-label text-muted-foreground">
                {careerTarget.labels.senioridade}
              </dt>
              <dd className="mt-2 text-sm font-semibold leading-relaxed text-foreground">
                {careerTarget.senioridade}
              </dd>
            </div>
            <div className="border-b border-border py-5 sm:pl-5">
              <dt className="technical-label text-muted-foreground">
                {careerTarget.labels.modeloAtuacao}
              </dt>
              <dd className="mt-2 text-sm font-semibold leading-relaxed text-foreground">
                {careerTarget.modeloAtuacao}
              </dd>
            </div>
            <div className="border-b border-border py-5 sm:border-r sm:pr-5 sm:border-b-0">
              <dt className="technical-label text-muted-foreground">
                {careerTarget.labels.dominiosNegocio}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-foreground">
                {experienceSignals.dominios.join(" / ")}
              </dd>
            </div>
            <div className="py-5 sm:pl-5">
              <dt className="technical-label text-muted-foreground">
                {careerTarget.labels.localizacaoAbertura}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-foreground">
                {careerTarget.disponibilidade}
              </dd>
            </div>
          </dl>
        </article>

        <div className="divide-y divide-border">
          {recruiterBrief.itens.map((item, index) => (
            <article
              key={item.titulo}
              className="group grid gap-5 p-6 sm:grid-cols-[3.5rem_1fr] sm:p-8 lg:block lg:p-10 xl:p-12"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-xs font-bold text-primary">0{index + 1}</span>
                <ArrowUpRight
                  className="size-5 text-border transition-colors group-hover:text-primary"
                  aria-hidden
                />
              </div>
              <div className="mt-0 lg:mt-6">
                <h3 className="font-heading text-2xl font-extrabold uppercase leading-none text-foreground">
                  {item.titulo}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {item.descricao}
                </p>
                {item.evidencia ? (
                  <p className="mt-5 border-l-2 border-accent pl-3 font-mono text-xs font-semibold uppercase leading-relaxed tracking-[0.06em] text-accent">
                    {item.evidencia}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </SectionShell>
  );
}
