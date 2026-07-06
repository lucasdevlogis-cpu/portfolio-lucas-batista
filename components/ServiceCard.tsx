"use client";

import { Check, Lightbulb } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  numero: number;
  titulo: string;
  paraQuem: string;
  quandoContratar: string;
  entregas: string[];
  exemplo: string;
  corBorda: string;
}

export function ServiceCard({
  numero,
  titulo,
  paraQuem,
  quandoContratar,
  entregas,
  exemplo,
  corBorda,
}: ServiceCardProps) {
  const borderClass = corBorda.replace(/^border-/, "border-l-");

  return (
    <Card
      className={cn(
        "rounded-xl border bg-card shadow-sm transition-all hover:shadow-md hover:scale-[1.01]",
        "border-l-4",
        borderClass,
      )}
    >
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            {numero}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-heading text-xl font-semibold text-primary">
              {titulo}
            </h3>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-accent-contrast">
                  Para quem é
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {paraQuem}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-accent-contrast">
                  Quando contratar
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {quandoContratar}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-contrast">
                O que entrega
              </p>
              <ul className="mt-2 space-y-1.5">
                {entregas.map((entrega) => (
                  <li
                    key={entrega}
                    className="flex items-start gap-2 text-sm text-foreground"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-accent"
                      aria-hidden
                    />
                    <span>{entrega}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-lg bg-secondary/70 px-3 py-2.5">
              <Lightbulb
                className="mt-0.5 size-4 shrink-0 text-primary"
                aria-hidden
              />
              <p className="text-sm leading-snug text-foreground">
                <span className="font-medium">Exemplo de uso: </span>
                {exemplo}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
