"use client";

import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
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

export function DemoModal({ isOpen, onClose, caseItem }: DemoModalProps) {
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-h-[90vh] max-w-4xl gap-0 overflow-y-auto p-0 sm:max-w-4xl"
        showCloseButton
      >
        <DialogHeader className="border-b px-4 py-3">
          <div className="flex items-center justify-between gap-3 pr-6">
            <DialogTitle>{caseItem?.titulo ?? ""}</DialogTitle>
            {demoUrl ? (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-accent hover:underline"
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                Abrir em nova aba
              </a>
            ) : null}
          </div>
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

        <div className="bg-muted/30">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={caseItem?.titulo ?? "Demo"}
              className={cn(
                "w-full border-0",
                isMobile ? "h-[500px]" : "h-[700px]",
              )}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
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
