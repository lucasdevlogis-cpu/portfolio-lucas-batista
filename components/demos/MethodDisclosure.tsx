import { AlertTriangle, FlaskConical, ShieldCheck } from "lucide-react";

import type { DemoSnapshot } from "@/lib/demo-contract";

export function MethodDisclosure({ snapshot }: { snapshot: DemoSnapshot }) {
  return (
    <section className="grid border border-border lg:grid-cols-2">
      <article className="border-b border-border bg-surface-dark p-5 text-white sm:p-6 lg:border-r lg:border-b-0">
        <div className="flex items-center gap-2 text-on-dark-accent">
          <FlaskConical className="size-4" aria-hidden />
          <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em]">Método</p>
        </div>
        <p className="mt-4 text-base leading-relaxed text-white">{snapshot.method}</p>
      </article>
      <article className="p-5 sm:p-6">
        <div className="flex items-center gap-2 text-danger">
          <AlertTriangle className="size-4" aria-hidden />
          <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em]">
            Limite da prova
          </p>
        </div>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {snapshot.limitation}
        </p>
      </article>
      {snapshot.governance ? (
        <article className="border-t border-border bg-card p-5 sm:p-6 lg:col-span-2">
          <div className="flex items-center gap-2 text-success">
            <ShieldCheck className="size-4" aria-hidden />
            <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em]">
              Governança humana
            </p>
          </div>
          <div className="mt-4 grid gap-5 lg:grid-cols-[1.2fr_1fr_1fr]">
            <div>
              <p className="technical-label text-muted-foreground">Política de revisão</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                {snapshot.governance.reviewPolicy}
              </p>
              <p className="mt-3 font-mono text-xs font-bold uppercase tracking-[0.08em] text-success">
                {snapshot.governance.automatedDecisionCount} decisões autônomas
              </p>
            </div>
            <div>
              <p className="technical-label text-muted-foreground">Gatilhos obrigatórios</p>
              <ul className="mt-2 space-y-1 text-sm text-foreground">
                {snapshot.governance.reviewTriggers.map((trigger) => (
                  <li key={trigger}>— {trigger}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="technical-label text-muted-foreground">Ações vedadas</p>
              <ul className="mt-2 space-y-1 text-sm text-foreground">
                {snapshot.governance.prohibitedActions.map((action) => (
                  <li key={action}>— {action}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      ) : null}
    </section>
  );
}
