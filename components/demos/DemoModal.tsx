"use client";

import { ExternalLink } from "lucide-react";

import { CaseContext } from "@/components/demos/CaseContext";
import { DemoShell } from "@/components/demos/DemoShell";
import { StreamlitDemoFrame } from "@/components/demos/StreamlitDemoFrame";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Case, DemoModalCopy } from "@/data/content";
import { CASE_DEMO_SLUGS } from "@/lib/demo-catalog";
import { getDemoSnapshot } from "@/lib/demo-contract";

export interface DemoModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  caseItem: Case;
  copy: DemoModalCopy;
}

export function DemoModal({ isOpen, onClose, caseItem, copy }: DemoModalProps) {
  const demoUrl = caseItem.linkDemo;
  const demoSlug = CASE_DEMO_SLUGS[caseItem.id];
  const snapshot = demoSlug ? getDemoSnapshot(demoSlug) : null;
  const openUrl = snapshot && demoSlug ? `/provas/${demoSlug}` : demoUrl;
  const thumbnailAlt = caseItem.thumbnailAlt ?? `Pré-visualização do case ${caseItem.titulo}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-h-[92vh] max-w-6xl gap-0 overflow-hidden rounded-2xl border-border bg-card p-0 lg:max-w-7xl"
        showCloseButton
        closeLabel={copy.closeLabel}
      >
        <DialogHeader className="border-b border-border px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-3 pr-8">
            <div className="min-w-0">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-warm-accent-contrast">
                {caseItem.categoria}
              </p>
              <DialogTitle className="mt-1 font-heading text-xl font-bold leading-tight text-ink">
                {caseItem.titulo}
              </DialogTitle>
            </div>
            <div className="flex shrink-0 items-center">
              <a
                href={openUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={copy.openExternalLabel}
                className="inline-flex size-10 items-center justify-center rounded-lg text-accent-contrast hover:bg-editorial sm:hidden"
              >
                <ExternalLink className="size-4" aria-hidden />
              </a>
              <a
                href={openUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden min-h-11 items-center gap-1 text-xs font-bold text-accent-contrast hover:underline sm:inline-flex"
              >
                <ExternalLink className="size-3.5" aria-hidden />
                {copy.openExternalLabel}
              </a>
            </div>
          </div>
          <DialogDescription className="sr-only">{caseItem.perguntaNegocio}</DialogDescription>
        </DialogHeader>

        <div className="grid max-h-[calc(92vh-4.5rem)] overflow-y-auto lg:grid-cols-[22rem_1fr] lg:overflow-hidden">
          <CaseContext caseItem={caseItem} labels={copy.context} />

          <div className="relative flex min-h-[300px] flex-col bg-card">
            {snapshot ? (
              <div className="min-h-[520px] overflow-y-auto bg-editorial">
                <DemoShell snapshot={snapshot} compact />
              </div>
            ) : demoUrl ? (
              <StreamlitDemoFrame
                key={demoUrl}
                demoUrl={demoUrl}
                openUrl={openUrl}
                title={caseItem.titulo}
                thumbnail={caseItem.thumbnail}
                thumbnailAlt={thumbnailAlt}
                copy={copy}
              />
            ) : (
              <div className="flex min-h-[300px] items-center justify-center px-6 text-center text-muted-foreground">
                {copy.unavailableLabel}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
