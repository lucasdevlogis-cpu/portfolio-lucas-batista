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
    <div className={cn("relative aspect-video overflow-hidden rounded-t-xl bg-card", className)}>
      <Image
        src={caseItem.thumbnail}
        alt={alt}
        fill
        loading="lazy"
        className="pointer-events-none object-cover object-top"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface-dark/35 to-transparent"
        aria-hidden
      />
    </div>
  );
}
