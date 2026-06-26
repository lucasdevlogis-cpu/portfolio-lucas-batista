"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface DemoModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  demoUrl: string;
  titulo: string;
}

export function DemoModal({
  isOpen,
  onClose,
  demoUrl,
  titulo,
}: DemoModalProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const embedUrl = demoUrl
    ? `${demoUrl}${demoUrl.includes("?") ? "&" : "?"}embed=true`
    : "";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-4xl gap-0 overflow-hidden p-0 sm:max-w-4xl"
        showCloseButton
      >
        <DialogHeader className="border-b px-4 py-3">
          <DialogTitle>{titulo}</DialogTitle>
        </DialogHeader>
        <div className="bg-muted/30">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={titulo}
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
                isMobile ? "h-[500px]" : "h-[700px]",
              )}
            >
              Demo interativa em construção — disponível na Fase 2 (Streamlit
              Cloud).
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
