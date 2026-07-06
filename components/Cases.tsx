import { CaseCard } from "@/components/CaseCard";
import { CaseLibraryInteractive } from "@/components/CaseLibraryInteractive";
import { LucideIconByName } from "@/components/LucideIconByName";
import {
  CASES_DESTAQUE,
  CASES_ROADMAP,
  CONTENT,
} from "@/data/content";

export function Cases() {
  const { secoes } = CONTENT;

  return (
    <section id="cases" className="scroll-mt-20 bg-editorial py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-4xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-warm-accent">
            {secoes.cases.eyebrow}
          </p>
          <h2 className="mt-4 font-heading text-4xl font-black text-ink md:text-5xl">
            {secoes.cases.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {secoes.cases.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {CASES_DESTAQUE.map((caseItem, index) => (
            <div
              key={caseItem.id}
              className={index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}
            >
              <CaseCard
                {...caseItem}
                destaque={index === 0}
              />
            </div>
          ))}
        </div>

        <CaseLibraryInteractive />

        {CASES_ROADMAP.length > 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-border bg-card/70 p-5">
            <h3 className="font-heading text-xl font-black text-ink">
              {secoes.casesRoadmap.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {secoes.casesRoadmap.subtitle}
            </p>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CASES_ROADMAP.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className="flex gap-3 rounded-lg border border-border bg-card p-4"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <LucideIconByName
                      name={caseItem.icone}
                      className="size-5"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-warm-accent">
                      {caseItem.categoria}
                    </p>
                    <p className="mt-1 font-heading text-base font-bold text-ink">
                      {caseItem.titulo}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {caseItem.perguntaNegocio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
