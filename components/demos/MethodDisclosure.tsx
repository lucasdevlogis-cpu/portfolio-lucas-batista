import { AlertTriangle, FlaskConical } from "lucide-react";

import type { DemoSnapshot } from "@/lib/demo-contract";

export function MethodDisclosure({ snapshot }: { snapshot: DemoSnapshot }) {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <article className="demo-panel bg-surface-dark text-white">
        <div className="flex items-center gap-2 text-on-dark-accent">
          <FlaskConical className="size-4" aria-hidden />
          <p className="text-[11px] font-bold uppercase tracking-[0.14em]">Método</p>
        </div>
        <p className="mt-4 text-base leading-relaxed text-white">{snapshot.method}</p>
      </article>
      <article className="demo-panel">
        <div className="flex items-center gap-2 text-danger">
          <AlertTriangle className="size-4" aria-hidden />
          <p className="text-[11px] font-bold uppercase tracking-[0.14em]">Limite da prova</p>
        </div>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{snapshot.limitation}</p>
      </article>
    </section>
  );
}
