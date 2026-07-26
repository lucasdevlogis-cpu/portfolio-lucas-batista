import { AlertTriangle, FlaskConical } from "lucide-react";

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
    </section>
  );
}
