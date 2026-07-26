"use client";

import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function DemoError({ reset }: { reset: () => void }) {
  return (
    <main
      id="conteudo"
      className="flex min-h-screen items-center justify-center bg-background px-5 py-8"
    >
      <div className="w-full max-w-2xl border border-border bg-card p-6 sm:p-10">
        <p className="technical-label text-danger">Falha de apresentação</p>
        <h1 className="mt-4 font-heading text-3xl font-black uppercase tracking-[-0.03em] text-foreground sm:text-5xl">
          A prova não pôde ser carregada.
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Os dados permanecem preservados. Tente renderizar novamente esta experiência.
        </p>
        <Button className="mt-7" onClick={reset}>
          <RotateCcw aria-hidden />
          Tentar novamente
        </Button>
      </div>
    </main>
  );
}
