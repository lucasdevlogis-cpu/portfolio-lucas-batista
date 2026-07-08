"use client";

import Image from "next/image";

import { LucideIconByName } from "@/components/LucideIconByName";
import type { Case, CaseCategoria } from "@/data/content";
import { cn } from "@/lib/utils";

const categoriaCores: Record<
  CaseCategoria,
  { from: string; to: string; accent: string }
> = {
  "Frete e Custo": { from: "#153451", to: "#1a4566", accent: "#c9983f" },
  "Roteirização e SLA": { from: "#16a99c", to: "#0d8a7f", accent: "#f5f2ed" },
  "Last Mile e E-commerce": { from: "#8A651F", to: "#c9983f", accent: "#07111f" },
  "Operação de CD": { from: "#556070", to: "#475569", accent: "#f5f2ed" },
  "Rede e Estratégia": { from: "#07111f", to: "#153451", accent: "#c9983f" },
  "Método e Governança": { from: "#153451", to: "#0d8a7f", accent: "#f5f2ed" },
};

interface CaseThumbnailProps {
  caseItem: Case;
  className?: string;
}

export function CaseThumbnail({ caseItem, className }: CaseThumbnailProps) {
  const numero = caseItem.id.split("-")[0] ?? "00";
  const cores =
    categoriaCores[caseItem.categoria] ?? categoriaCores["Frete e Custo"];

  if (caseItem.thumbnail) {
    return (
      <div
        className={cn(
          "relative aspect-video overflow-hidden rounded-t-2xl bg-card",
          className,
        )}
      >
        <Image
          src={caseItem.thumbnail}
          alt={`Pré-visualização do case ${caseItem.titulo}`}
          fill
          loading="lazy"
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden rounded-t-2xl bg-card",
        className,
      )}
    >
      <svg
        viewBox="0 0 400 225"
        className="absolute inset-0 size-full"
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient
            id={`grad-${caseItem.id}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={cores.from} />
            <stop offset="100%" stopColor={cores.to} />
          </linearGradient>
          <pattern
            id={`grid-${caseItem.id}`}
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="400" height="225" fill={`url(#grad-${caseItem.id})`} />
        <rect width="400" height="225" fill={`url(#grid-${caseItem.id})`} />
        <path
          d="M 0 180 Q 100 160, 200 120 T 400 80"
          fill="none"
          stroke={cores.accent}
          strokeWidth="2"
          opacity="0.35"
        />
        <circle cx="320" cy="85" r="4" fill={cores.accent} opacity="0.7" />
        <circle cx="360" cy="65" r="4" fill={cores.accent} opacity="0.7" />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex size-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.12] text-white shadow-lg backdrop-blur-sm">
          <LucideIconByName name={caseItem.icone} className="size-8" />
        </div>
      </div>

      <span className="absolute left-4 top-3 font-heading text-2xl font-bold text-white/30">
        {numero}
      </span>
    </div>
  );
}
