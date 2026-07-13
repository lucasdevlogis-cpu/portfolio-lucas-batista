"use client";

import { useState, type ComponentType, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { caseDemoCta, CONTENT, type Case } from "@/data/content";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface DemoModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  caseItem: Case | null;
}

interface CaseDemoLauncherProps {
  caseItem: Case;
  className?: string;
  icon?: ReactNode;
}

export function CaseDemoLauncher({
  caseItem,
  className,
  icon,
}: CaseDemoLauncherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [Modal, setModal] = useState<ComponentType<DemoModalProps> | null>(
    null,
  );
  const labels = CONTENT.secoes;
  const hasDemo = Boolean(caseItem.linkDemo);
  const cta = caseDemoCta(caseItem);

  const handleOpen = async () => {
    if (!hasDemo) return;
    analytics.demoOpen(caseItem.titulo);
    if (!Modal) {
      const mod = await import("@/components/DemoModal");
      setModal(() => mod.DemoModal);
    }
    setIsOpen(true);
  };

  return (
    <>
      <Button
        variant={hasDemo ? "executive" : "outline"}
        className={cn(
          "h-10 min-h-10 flex-1 rounded-lg",
          !hasDemo && "cursor-not-allowed opacity-60",
          className,
        )}
        onClick={handleOpen}
        aria-disabled={!hasDemo}
        aria-label={hasDemo ? cta.ariaLabel : labels.caseDemoUnavailableLabel}
      >
        {icon}
        {hasDemo ? cta.label : labels.caseDemoUnavailableLabel}
      </Button>
      {Modal ? (
        <Modal
          isOpen={isOpen}
          onClose={(open) => setIsOpen(open)}
          caseItem={caseItem}
        />
      ) : null}
    </>
  );
}
