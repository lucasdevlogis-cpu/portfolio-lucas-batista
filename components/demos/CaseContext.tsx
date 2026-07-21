import { ChevronDown } from "lucide-react";

import type { Case, DemoModalCopy } from "@/data/content";

function ContextBody({ caseItem, labels }: { caseItem: Case; labels: DemoModalCopy["context"] }) {
  return (
    <div>
      <div>
        <p className="technical-label text-primary">{labels.pergunta}</p>
        <p className="mt-2 text-sm leading-relaxed text-foreground">{caseItem.perguntaNegocio}</p>
      </div>

      <div className="mt-5">
        <p className="technical-label text-primary">{labels.metrica}</p>
        <p className="mt-2 font-heading text-xl font-extrabold uppercase leading-tight text-foreground">
          {caseItem.metricaPrincipal}
        </p>
      </div>

      <div className="mt-5">
        <p className="technical-label text-primary">{labels.descricao}</p>
        <p className="mt-2 text-sm leading-relaxed text-foreground">{caseItem.descricao}</p>
      </div>

      <div className="mt-5">
        <p className="technical-label text-accent">{labels.decisao}</p>
        <p className="mt-2 text-sm leading-relaxed text-foreground">{caseItem.decisaoApoiada}</p>
      </div>

      <p className="mt-5 text-xs font-semibold leading-relaxed text-muted-foreground">
        {caseItem.tags.join(" · ")}
      </p>

      <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
        <span className="font-bold text-danger">{labels.limitacao}: </span>
        {caseItem.limitacao}
      </p>
    </div>
  );
}

export function CaseContext({
  caseItem,
  labels,
}: {
  caseItem: Case;
  labels: DemoModalCopy["context"];
}) {
  return (
    <>
      <aside className="hidden overflow-y-auto border-r border-border bg-surface-dark px-6 py-6 lg:block">
        <ContextBody caseItem={caseItem} labels={labels} />
      </aside>

      <details className="group border-b border-border bg-surface-dark lg:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.08em] text-foreground [&::-webkit-details-marker]:hidden">
          {labels.contextoMobile}
          <ChevronDown
            className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
            aria-hidden
          />
        </summary>
        <div className="px-5 pb-5">
          <ContextBody caseItem={caseItem} labels={labels} />
        </div>
      </details>
    </>
  );
}
