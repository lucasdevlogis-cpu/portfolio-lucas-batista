"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { analytics } from "@/lib/analytics";
import type { ReactDemoSlug } from "@/lib/demo-contract";

export function DemoNavigation({
  proofSlug,
  compact = false,
}: {
  proofSlug: ReactDemoSlug;
  compact?: boolean;
}) {
  return (
    <nav
      className={cn("flex flex-wrap items-center justify-between gap-3", compact && "pt-2")}
      aria-label="Navegação das provas"
    >
      <Link
        href="/#cases"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "min-h-11 border-border bg-transparent",
        )}
      >
        <ArrowLeft className="size-4" aria-hidden />
        Voltar às provas
      </Link>
      <Link
        href="/#contato"
        onClick={() => analytics.proofCtaClick(proofSlug, "contact")}
        className={cn(buttonVariants({ variant: "executive" }), "min-h-11")}
      >
        Conversar sobre o perfil
        <ArrowUpRight className="size-4" aria-hidden />
      </Link>
    </nav>
  );
}
