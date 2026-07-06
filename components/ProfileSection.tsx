import { CheckCircle2 } from "lucide-react";

import { CONTENT } from "@/data/content";

export function ProfileSection() {
  const { careerTarget, recruiterBrief } = CONTENT;

  return (
    <section id="perfil" className="scroll-mt-20 bg-card py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-warm-accent">
            {recruiterBrief.eyebrow}
          </p>
          <h2 className="mt-4 font-heading text-4xl font-black text-ink md:text-5xl">
            {recruiterBrief.titulo}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {recruiterBrief.resumo}
          </p>
          <div className="mt-8 rounded-xl border border-border bg-editorial p-5">
            <p className="font-heading text-xl font-bold text-primary">
              {careerTarget.senioridade}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {careerTarget.modeloAtuacao}
            </p>
            <p className="mt-4 border-t border-border pt-4 text-sm font-semibold text-ink">
              {careerTarget.disponibilidade}
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {recruiterBrief.itens.map((item) => (
            <article
              key={item.titulo}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="mb-4 flex size-10 items-center justify-center rounded-md bg-accent/10 text-accent-contrast">
                <CheckCircle2 className="size-5" aria-hidden />
              </div>
              <h3 className="font-heading text-lg font-bold text-ink">
                {item.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.descricao}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
