import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DemoNavigation({ compact = false }: { compact?: boolean }) {
  return (
    <nav
      className={cn("flex flex-wrap items-center justify-between gap-3", compact && "pt-2")}
      aria-label="Navegação das provas"
    >
      <Link
        href="/#cases"
        className={cn(buttonVariants({ variant: "outline" }), "min-h-10 rounded-lg")}
      >
        <ArrowLeft className="size-4" aria-hidden />
        Voltar às provas
      </Link>
      <Link
        href="/#contato"
        className={cn(buttonVariants({ variant: "executive" }), "min-h-10 rounded-lg")}
      >
        Conversar sobre o perfil
        <ArrowUpRight className="size-4" aria-hidden />
      </Link>
    </nav>
  );
}
