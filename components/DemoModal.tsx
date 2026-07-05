"use client";

import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import { CONTENT, type Case } from "@/data/content";
import { cn } from "@/lib/utils";

interface DemoModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  caseItem: Case | null;
}

type IframeStatus = "loading" | "ready" | "error";

function DemoSkeleton() {
  const bar = "h-4 rounded-md bg-muted motion-reduce:animate-none animate-pulse";
  const card = "rounded-lg bg-muted motion-reduce:animate-none animate-pulse";

  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      {/* Header simulado */}
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-md bg-muted motion-reduce:animate-none animate-pulse" />
        <div className={cn(bar, "h-5 w-1/2")} />
      </div>

      {/* Cards de métricas */}
      <div className="grid grid-cols-3 gap-3">
        <div className={cn(card, "h-16")} />
        <div className={cn(card, "h-16")} />
        <div className={cn(card, "h-16")} />
      </div>

      {/* Gráfico principal */}
      <div className={cn(card, "h-40")} />

      {/* Tabela / lista */}
      <div className={cn(card, "h-28")} />

      {/* Barra inferior */}
      <div className={cn(bar, "w-3/4")} />
    </div>
  );
}

export function DemoModal({ isOpen, onClose, caseItem }: DemoModalProps) {
  const [isMobile, setIsMobile] = useState(false);
  // Status derivado da URL carregada/em erro: troca de demo volta a "loading"
  // automaticamente, sem effect de reset.
  const [loadedUrl, setLoadedUrl] = useState<string | null>(null);
  const [errorUrl, setErrorUrl] = useState<string | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const demoUrl = caseItem?.linkDemo ?? "";
  const embedUrl = demoUrl
    ? `${demoUrl}${demoUrl.includes("?") ? "&" : "?"}embed=true`
    : "";

  const status: IframeStatus =
    errorUrl === embedUrl && embedUrl
      ? "error"
      : loadedUrl === embedUrl && embedUrl
        ? "ready"
        : "loading";

  const abrirNovaAba = demoUrl ? (
    <a
      href={demoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-accent hover:underline"
    >
      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
      Abrir em nova aba
    </a>
  ) : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-h-[90vh] max-w-4xl gap-0 overflow-y-auto p-0 sm:max-w-4xl"
        showCloseButton
      >
        <DialogHeader className="border-b px-4 py-3">
          <div className="flex items-center justify-between gap-3 pr-6">
            <DialogTitle>{caseItem?.titulo ?? ""}</DialogTitle>
            {abrirNovaAba}
          </div>
          <DialogDescription className="sr-only">
            {caseItem?.perguntaNegocio ?? "Demonstração interativa da análise."}
          </DialogDescription>
        </DialogHeader>

        {caseItem ? (
          <div className="grid gap-4 border-b bg-muted/20 px-4 py-4 sm:grid-cols-2">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-accent">
                Pergunta de negócio
              </p>
              <p className="mt-0.5 text-sm text-foreground">
                {caseItem.perguntaNegocio}
              </p>
            </div>
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-accent">
                Decisão apoiada
              </p>
              <p className="mt-0.5 text-sm text-foreground">
                {caseItem.decisaoApoiada}
              </p>
            </div>
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-accent">
                Métrica principal
              </p>
              <p className="mt-0.5 text-sm text-foreground">
                {caseItem.metricaPrincipal}
              </p>
            </div>
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
                Limitação
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {caseItem.limitacao}
              </p>
            </div>
          </div>
        ) : null}

        {/* No mobile, o iframe é apertado: destacamos abrir em nova aba. */}
        {isMobile && demoUrl ? (
          <div className="border-b bg-accent/5 px-4 py-3">
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "default" }), "w-full")}
            >
              <ExternalLink className="size-4" aria-hidden />
              Abrir demo em tela cheia
            </a>
          </div>
        ) : null}

        <div className="relative bg-muted/30">
          {embedUrl ? (
            <>
              {status !== "ready" ? (
                <div
                  className={cn(
                    "absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-background/80 px-6 text-center",
                    status === "error" && "bg-background",
                  )}
                >
                  {status === "loading" ? (
                    <>
                      <DemoSkeleton />
                      <p className="max-w-md text-sm text-muted-foreground">
                        {CONTENT.secoes.demoCarregando}
                      </p>
                    </>
                  ) : (
                    <p className="max-w-md text-sm text-muted-foreground">
                      {CONTENT.secoes.demoErro}
                    </p>
                  )}
                </div>
              ) : null}
              <iframe
                src={embedUrl}
                title={caseItem?.titulo ?? "Demo"}
                loading="lazy"
                onLoad={() => setLoadedUrl(embedUrl)}
                onError={() => setErrorUrl(embedUrl)}
                className={cn(
                  "w-full border-0",
                  isMobile ? "h-[500px]" : "h-[700px]",
                )}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </>
          ) : (
            <div
              className={cn(
                "flex items-center justify-center px-6 text-center text-muted-foreground",
                isMobile ? "h-[300px]" : "h-[360px]",
              )}
            >
              {CONTENT.secoes.demoIndisponivel}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
