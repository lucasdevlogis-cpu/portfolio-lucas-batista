"use client";

import { ChevronDown, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CONTENT, type Case } from "@/data/content";
import { cn } from "@/lib/utils";

interface DemoBriefingModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  caseItem: Case | null;
}

type IframeStatus = "loading" | "ready" | "error";

function DemoSkeleton() {
  const bar =
    "h-4 rounded-md bg-muted motion-reduce:animate-none animate-pulse";
  const card = "rounded-lg bg-muted motion-reduce:animate-none animate-pulse";

  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-md bg-muted motion-reduce:animate-none animate-pulse" />
        <div className={cn(bar, "h-5 w-1/2")} />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className={cn(card, "h-16")} />
        <div className={cn(card, "h-16")} />
        <div className={cn(card, "h-16")} />
      </div>
      <div className={cn(card, "h-40")} />
      <div className={cn(card, "h-28")} />
      <div className={cn(bar, "w-3/4")} />
    </div>
  );
}

function BriefingContext({
  caseItem,
  collapsible,
}: {
  caseItem: Case;
  collapsible: boolean;
}) {
  const body = (
    <>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-eyebrow text-accent-contrast">
            Pergunta de negócio
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground">
            {caseItem.perguntaNegocio}
          </p>
        </div>
        <div>
          <p className="text-eyebrow text-accent-contrast">Decisão apoiada</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground">
            {caseItem.decisaoApoiada}
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-6">
        <p className="text-eyebrow text-accent-contrast">Métrica principal</p>
        <p className="mt-2 font-heading text-xl font-semibold text-primary md:text-2xl">
          {caseItem.metricaPrincipal}
        </p>
      </div>

      {caseItem.tags.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {caseItem.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        {caseItem.limitacao}
      </p>
    </>
  );

  if (!collapsible) {
    return <div className="border-b bg-muted/30 px-4 py-5 sm:px-6">{body}</div>;
  }

  return (
    <details className="group border-b bg-muted/30">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 sm:px-6 [&::-webkit-details-marker]:hidden">
        <span className="text-sm font-medium text-foreground">
          Contexto da análise
        </span>
        <ChevronDown
          className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
          aria-hidden
        />
      </summary>
      <div className="px-4 pb-5 sm:px-6">{body}</div>
    </details>
  );
}

/**
 * Modal editorial — faixa 2 colunas pergunta/decisão + métrica tipográfica (Figma 3:15).
 */
export function DemoBriefingModal({
  isOpen,
  onClose,
  caseItem,
}: DemoBriefingModalProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [loadedUrl, setLoadedUrl] = useState<string | null>(null);
  const [errorUrl, setErrorUrl] = useState<string | null>(null);
  const [loadRequestedUrl, setLoadRequestedUrl] = useState<string | null>(null);

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

  const shouldMountIframe = !isMobile || loadRequestedUrl === embedUrl;

  const abrirNovaAba = demoUrl ? (
    <a
      href={demoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-accent-contrast hover:underline"
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
        <DialogHeader className="border-b px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between gap-3 pr-6">
            <DialogTitle className="font-heading text-lg">
              {caseItem?.titulo ?? ""}
            </DialogTitle>
            {abrirNovaAba}
          </div>
          <DialogDescription className="sr-only">
            {caseItem?.perguntaNegocio ?? "Demonstração interativa da análise."}
          </DialogDescription>
        </DialogHeader>

        {caseItem ? (
          <BriefingContext caseItem={caseItem} collapsible={isMobile} />
        ) : null}

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
          {embedUrl && !shouldMountIframe ? (
            <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
              <p className="max-w-sm text-sm text-muted-foreground">
                A demo interativa carrega dentro deste modal. No celular ela
                fica apertada — carregue aqui ou abra em tela cheia.
              </p>
              <button
                type="button"
                onClick={() => setLoadRequestedUrl(embedUrl)}
                className={cn(buttonVariants({ variant: "default" }), "w-full")}
              >
                Carregar demo aqui
              </button>
            </div>
          ) : embedUrl ? (
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
                  isMobile
                    ? "h-[60vh] min-h-[300px] max-h-[500px]"
                    : "h-[700px]",
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
