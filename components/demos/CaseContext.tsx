import { ChevronDown } from "lucide-react";

import type { Case, DemoModalCopy } from "@/data/content";

function ContextBody({ caseItem, labels }: { caseItem: Case; labels: DemoModalCopy["context"] }) {
  return (
    <div>
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-warm-accent-contrast">
          {labels.pergunta}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink">{caseItem.perguntaNegocio}</p>
      </div>

      <div className="mt-5">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-warm-accent-contrast">
          {labels.metrica}
        </p>
        <p className="mt-2 font-heading text-xl font-bold leading-tight text-ink">
          {caseItem.metricaPrincipal}
        </p>
      </div>

      <div className="mt-5">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-warm-accent-contrast">
          {labels.descricao}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink">{caseItem.descricao}</p>
      </div>

      <div className="mt-5">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-warm-accent-contrast">
          {labels.decisao}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink">{caseItem.decisaoApoiada}</p>
      </div>

      <p className="mt-5 text-xs font-semibold leading-relaxed text-muted-foreground">
        {caseItem.tags.join(" · ")}
      </p>

      <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
        <span className="font-bold text-ink">{labels.limitacao}: </span>
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
      <aside className="hidden overflow-y-auto bg-editorial px-6 py-5 lg:block">
        <ContextBody caseItem={caseItem} labels={labels} />
      </aside>

      <details className="group border-b bg-editorial lg:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-5 py-3 text-sm font-bold text-ink [&::-webkit-details-marker]:hidden">
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
