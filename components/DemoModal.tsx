"use client";

import { ChevronDown, ExternalLink } from "lucide-react";
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

function CaseContext({
  caseItem,
  collapsible,
}: {
  caseItem: Case;
  collapsible: boolean;
}) {
  const labels = CONTENT.secoes.demoContextLabels;
  const body = (
    <>
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-warm-accent">
          {labels.pergunta}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink">
          {caseItem.perguntaNegocio}
        </p>
      </div>

      <div className="mt-5">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-warm-accent">
          {labels.decisao}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink">
          {caseItem.decisaoApoiada}
        </p>
      </div>

      <div className="mt-5 border-t border-border pt-5">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-warm-accent">
          {labels.metrica}
        </p>
        <p className="mt-2 font-heading text-xl font-black leading-tight text-ink">
          {caseItem.metricaPrincipal}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {caseItem.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border bg-card px-3 py-1 text-xs font-bold text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
        <span className="font-bold text-ink">{labels.limitacao}: </span>
        {caseItem.limitacao}
      </p>
    </>
  );

  if (!collapsible) {
    return <div className="bg-editorial px-5 py-5 sm:px-6">{body}</div>;
  }

  return (
    <details className="group border-b bg-editorial">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-bold text-ink sm:px-6 [&::-webkit-details-marker]:hidden">
        {labels.contextoMobile}
        <ChevronDown
          className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
          aria-hidden
        />
      </summary>
      <div className="px-5 pb-5 sm:px-6">{body}</div>
    </details>
  );
}

export function DemoModal({ isOpen, onClose, caseItem }: DemoModalProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [loadedUrl, setLoadedUrl] = useState<string | null>(null);
  const [errorUrl, setErrorUrl] = useState<string | null>(null);
  const [loadRequestedUrl, setLoadRequestedUrl] = useState<string | null>(null);
  const [timeoutUrl, setTimeoutUrl] = useState<string | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setLoadedUrl(null);
      setErrorUrl(null);
      setTimeoutUrl(null);
      setLoadRequestedUrl(null);
    }
    onClose(open);
  };

  const demoUrl = caseItem?.linkDemo ?? "";
  const embedUrl = demoUrl
    ? `${demoUrl}${demoUrl.includes("?") ? "&" : "?"}embed=true`
    : "";

  useEffect(() => {
    if (!embedUrl || loadedUrl === embedUrl) return;
    const timer = setTimeout(() => {
      if (loadedUrl !== embedUrl) {
        setTimeoutUrl(embedUrl);
      }
    }, 15000);
    return () => clearTimeout(timer);
  }, [embedUrl, loadedUrl]);

  const status: IframeStatus =
    (errorUrl === embedUrl && embedUrl) ||
    (timeoutUrl === embedUrl && embedUrl)
      ? "error"
      : loadedUrl === embedUrl && embedUrl
        ? "ready"
        : "loading";

  const shouldMountIframe = !isMobile || loadRequestedUrl === embedUrl;
  const labels = CONTENT.secoes;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-h-[92vh] max-w-6xl gap-0 overflow-hidden rounded-2xl border-border bg-card p-0 lg:max-w-7xl"
        showCloseButton
      >
        <DialogHeader className="border-b border-border px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-3 pr-6">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-warm-accent">
                {caseItem?.categoria ?? ""}
              </p>
              <DialogTitle className="mt-1 font-heading text-xl font-black text-ink">
                {caseItem?.titulo ?? ""}
              </DialogTitle>
            </div>
            {demoUrl ? (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-accent-contrast hover:underline"
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                {labels.demoOpenExternalLabel}
              </a>
            ) : null}
          </div>
          <DialogDescription className="sr-only">
            {caseItem?.perguntaNegocio ?? CONTENT.secoes.demoIndisponivel}
          </DialogDescription>
        </DialogHeader>

        <div className="grid max-h-[calc(92vh-4.5rem)] lg:grid-cols-[22rem_1fr]">
          {caseItem ? (
            <CaseContext caseItem={caseItem} collapsible={isMobile} />
          ) : null}

          <div className="relative flex flex-col bg-card">
            {isMobile && demoUrl ? (
              <div className="border-b border-border bg-accent/5 px-5 py-3">
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "default" }), "w-full")}
                >
                  <ExternalLink className="size-4" aria-hidden />
                  {labels.demoFullscreenLabel}
                </a>
              </div>
            ) : null}

            <div className="relative flex-1">
              {embedUrl && !shouldMountIframe ? (
                <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
                  <p className="max-w-sm text-sm text-muted-foreground">
                    {labels.demoMobileHint}
                  </p>
                  <button
                    type="button"
                    onClick={() => setLoadRequestedUrl(embedUrl)}
                    className={cn(buttonVariants({ variant: "default" }), "w-full")}
                  >
                    {labels.demoLoadInlineLabel}
                  </button>
                </div>
              ) : embedUrl ? (
                <>
                  {status !== "ready" ? (
                    <div
                      className={cn(
                        "absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-background/95 px-6 text-center",
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
                    title={caseItem?.titulo ?? CONTENT.secoes.demoIndisponivel}
                    loading="lazy"
                    onLoad={() => setLoadedUrl(embedUrl)}
                    onError={() => setErrorUrl(embedUrl)}
                    className={cn(
                      "w-full border-0",
                      isMobile
                        ? "h-[60vh] min-h-[300px] max-h-[500px]"
                        : "h-[min(640px,calc(92vh-11rem))] min-h-[420px]",
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
