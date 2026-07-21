import { BarChart3, MessageSquareText, Zap } from "lucide-react";

import { SectionShell } from "@/components/layout/SectionShell";
import { EditorialBadge } from "@/components/ui/EditorialBadge";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { CONTENT } from "@/data/content";

const itemIcons = [BarChart3, Zap, MessageSquareText];

export function ProfileBrief() {
  const { careerTarget, recruiterBrief, experienceSignals } = CONTENT;
  const labels = careerTarget.labels;

  return (
    <SectionShell
      id="perfil"
      eyebrow={recruiterBrief.eyebrow}
      title={recruiterBrief.titulo}
      lead={recruiterBrief.resumo}
      className="relative border-b border-border/70"
      headerClassName="mb-8"
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr] xl:grid-cols-[1.05fr_1fr]">
        <div>
          <PremiumCard className="flex h-full flex-col p-6 lg:p-8">
            <div className="relative flex h-full flex-col">
              <EditorialBadge tone="gold">{careerTarget.eyebrow}</EditorialBadge>
              <h3 className="mt-5 max-w-2xl font-heading text-2xl font-bold leading-[1.1] tracking-tight text-ink sm:text-3xl">
                {careerTarget.titulo}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
                {careerTarget.resumo}
              </p>
              <div className="mt-6 grid gap-4 border-t border-border pt-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-primary">
                      {labels.senioridade}
                    </p>
                    <p className="mt-2 text-base leading-snug text-ink">
                      {careerTarget.senioridade}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-primary">
                      {labels.modeloAtuacao}
                    </p>
                    <p className="mt-2 text-base leading-snug text-ink">
                      {careerTarget.modeloAtuacao}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-primary">
                    {labels.dominiosNegocio}
                  </p>
                  <p className="mt-2.5 text-sm font-semibold leading-relaxed text-ink">
                    {experienceSignals.dominios.join(" · ")}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-primary">
                    {labels.localizacaoAbertura}
                  </p>
                  <p className="mt-1.5 text-sm leading-snug text-ink">
                    {careerTarget.disponibilidade}
                  </p>
                </div>
              </div>
            </div>
          </PremiumCard>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {recruiterBrief.itens.map((item, index) => {
            const Icon = itemIcons[index % itemIcons.length];
            return (
              <article
                key={item.titulo}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 shadow-card transition-colors duration-normal ease-editorial hover:border-primary/25 lg:p-7"
              >
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-accent/10 text-accent-contrast">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h3 className="font-heading text-xl font-bold text-ink">{item.titulo}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                  {item.descricao}
                </p>
                {item.evidencia && (
                  <p className="mt-3 text-sm font-bold text-accent-contrast">{item.evidencia}</p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
