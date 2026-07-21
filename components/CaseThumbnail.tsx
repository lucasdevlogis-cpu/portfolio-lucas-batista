import Image from "next/image";

import type { Case } from "@/data/content";
import { cn } from "@/lib/utils";

interface CaseThumbnailProps {
  caseItem: Case;
  className?: string;
}

export function CaseThumbnail({ caseItem, className }: CaseThumbnailProps) {
  const alt = caseItem.thumbnailAlt ?? `Pré-visualização do case ${caseItem.titulo}`;

  if (!caseItem.thumbnail) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden border-b border-border bg-card",
        className,
      )}
    >
      <Image
        src={caseItem.thumbnail}
        alt={alt}
        fill
        loading="lazy"
        className="pointer-events-none object-cover object-top transition-transform duration-slow ease-editorial group-hover:scale-[1.015]"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5"
        aria-hidden
      />
    </div>
  );
}
