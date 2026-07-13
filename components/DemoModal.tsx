"use client";

import { ChevronDown, ExternalLink } from "lucide-react";
import Image from "next/image";
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

interface DemoModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  caseItem: Case | null;
}

type IframeStatus = "loading" | "ready" | "timeout" | "error";

const DEMO_TIMEOUT_MS = 22000;

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
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-warm-accent-contrast">
          {labels.pergunta}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink">
          {caseItem.perguntaNegocio}
        </p>
      </div>

      <div className="mt-5">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-warm-accent-contrast">
          {labels.metrica}
        </p>
        <p className="mt-2 font-heading text-xl font-black leading-tight text-ink">
          {caseItem.metricaPrincipal}
        </p>
      </div>

      <div className="mt-5">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-warm-accent-contrast">
          {labels.descricao}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink">
          {caseItem.descricao}
        </p>
      </div>

      <div className="mt-5">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-warm-accent-contrast">
          {labels.decisao}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink">
          {caseItem.decisaoApoiada}
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
    <details className="group border-b bg-editorial" open>
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
    }, DEMO_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [embedUrl, loadedUrl]);

  const status: IframeStatus =
    errorUrl === embedUrl && embedUrl
      ? "error"
      : loadedUrl === embedUrl && embedUrl
        ? "ready"
        : timeoutUrl === embedUrl && embedUrl
          ? "timeout"
          : "loading";

  const shouldMountIframe = !isMobile || loadRequestedUrl === embedUrl;
  const labels = CONTENT.secoes;
  const showPreview = status !== "ready";
  const thumbnailSrc = caseItem?.thumbnail;
  const thumbnailAlt =
    caseItem?.thumbnailAlt ??
    (caseItem ? `Pré-visualização do case ${caseItem.titulo}` : "");

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-h-[92vh] max-w-6xl gap-0 overflow-hidden rounded-2xl border-border bg-card p-0 lg:max-w-7xl"
        showCloseButton
        closeLabel={CONTENT.dialog.closeLabel}
      >
        <DialogHeader className="border-b border-border px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-3 pr-6">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-warm-accent-contrast">
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
                className="inline-flex min-h-11 shrink-0 items-center gap-1 text-xs font-bold text-accent-contrast hover:underline"
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

        <div className="grid max-h-[calc(92vh-4.5rem)] overflow-y-auto lg:grid-cols-[22rem_1fr] lg:overflow-hidden">
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
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "min-h-11 w-full",
                  )}
                >
                  <ExternalLink className="size-4" aria-hidden />
                  {labels.demoFullscreenLabel}
                </a>
              </div>
            ) : null}

            <div className="relative flex-1">
              {embedUrl && !shouldMountIframe ? (
                <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
                  {thumbnailSrc ? (
                    <div className="relative mb-2 aspect-video w-full max-w-lg overflow-hidden rounded-xl border border-border">
                      <Image
                        src={thumbnailSrc}
                        alt={thumbnailAlt}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                    </div>
                  ) : null}
                  <p className="max-w-sm text-sm text-muted-foreground">
                    {labels.demoMobileHint}
                  </p>
                  <button
                    type="button"
                    onClick={() => setLoadRequestedUrl(embedUrl)}
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "min-h-11 w-full",
                    )}
                  >
                    {labels.demoLoadInlineLabel}
                  </button>
                </div>
              ) : embedUrl ? (
                <>
                  {showPreview ? (
                    <div
                      className={cn(
                        "absolute inset-0 z-10 flex flex-col",
                        "motion-safe:transition-opacity motion-safe:duration-normal motion-safe:ease-editorial",
                      )}
                      aria-live="polite"
                    >
                      <div className="relative flex-1 overflow-hidden bg-editorial">
                        {thumbnailSrc ? (
                          <Image
                            src={thumbnailSrc}
                            alt={thumbnailAlt}
                            fill
                            priority
                            className="object-cover object-top"
                            sizes="(max-width: 1024px) 100vw, 60vw"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-editorial" />
                        )}
                        <div className="absolute inset-0 bg-surface-dark/55" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
                          <p className="max-w-md text-sm font-semibold text-white">
                            {status === "error"
                              ? labels.demoErro
                              : status === "timeout"
                                ? labels.demoTimeoutHint
                                : labels.demoInicializando}
                          </p>
                          {status === "loading" || status === "timeout" ? (
                            <div
                              className="size-8 rounded-full border-2 border-white/30 border-t-accent motion-safe:animate-spin motion-reduce:animate-none"
                              aria-hidden
                            />
                          ) : null}
                          {demoUrl &&
                          (status === "timeout" || status === "error") ? (
                            <a
                              href={demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={cn(
                                buttonVariants({ variant: "outline" }),
                                "min-h-11 border-white/30 bg-white/10 text-white hover:bg-white/20",
                              )}
                            >
                              <ExternalLink className="size-4" aria-hidden />
                              {labels.demoOpenExternalLabel}
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <iframe
                    src={embedUrl}
                    title={caseItem?.titulo ?? CONTENT.secoes.demoIndisponivel}
                    loading="eager"
                    onLoad={() => setLoadedUrl(embedUrl)}
                    onError={() => setErrorUrl(embedUrl)}
                    className={cn(
                      "w-full border-0",
                      "motion-safe:transition-opacity motion-safe:duration-normal motion-safe:ease-editorial",
                      status === "ready" ? "opacity-100" : "opacity-0",
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
