"use client";

import { useState, useSyncExternalStore, type ComponentType, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import type { Case, DemoModalCopy } from "@/data/content";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

import type { DemoModalProps } from "./DemoModal";

const subscribeToHydration = () => () => undefined;

function useIsHydrated(): boolean {
  return useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
}

interface CaseDemoLauncherProps {
  caseItem: Case;
  modalCopy: DemoModalCopy;
  className?: string;
  icon?: ReactNode;
  labelOverride?: string;
  defaultLabel: string;
  unavailableLabel: string;
}

export function CaseDemoLauncher({
  caseItem,
  modalCopy,
  className,
  icon,
  labelOverride,
  defaultLabel,
  unavailableLabel,
}: CaseDemoLauncherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [Modal, setModal] = useState<ComponentType<DemoModalProps> | null>(null);
  const isHydrated = useIsHydrated();
  const hasDemo = Boolean(caseItem.linkDemo);
  const visibleLabel = hasDemo
    ? (labelOverride ?? caseItem.ctaDemoLabel ?? defaultLabel)
    : unavailableLabel;

  const handleOpen = async () => {
    if (!hasDemo || !isHydrated) return;
    analytics.demoOpen(caseItem.titulo);
    if (!Modal) {
      const demoModule = await import("@/components/demos/DemoModal");
      setModal(() => demoModule.DemoModal);
    }
    setIsOpen(true);
  };

  return (
    <>
      <Button
        variant={hasDemo ? "executive" : "outline"}
        className={cn(
          "h-10 min-h-10 min-w-0 max-w-full shrink flex-1 rounded-lg",
          !hasDemo && "cursor-not-allowed opacity-60",
          className,
        )}
        onClick={handleOpen}
        disabled={!hasDemo || !isHydrated}
        aria-disabled={!hasDemo || !isHydrated}
        aria-label={hasDemo ? `${visibleLabel}: ${caseItem.titulo}` : unavailableLabel}
      >
        {icon}
        {visibleLabel}
      </Button>
      {Modal ? (
        <Modal isOpen={isOpen} onClose={setIsOpen} caseItem={caseItem} copy={modalCopy} />
      ) : null}
    </>
  );
}
