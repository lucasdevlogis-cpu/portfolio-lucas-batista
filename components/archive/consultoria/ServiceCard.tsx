"use client";

import { Check, Lightbulb, Star } from "lucide-react";

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
  recomendado?: boolean;
}

export function ServiceCard({
  numero,
  titulo,
  paraQuem,
  quandoContratar,
  entregas,
  exemplo,
  corBorda,
  recomendado = false,
}: ServiceCardProps) {
  const borderClass = corBorda.replace(/^border-/, "border-l-");

  return (
    <Card
      className={cn(
        "rounded-xl border bg-card shadow-sm transition-all hover:shadow-md hover:scale-[1.01]",
        "border-l-4",
        recomendado
          ? "border-l-accent ring-1 ring-accent/25 shadow-md"
          : borderClass,
      )}
    >
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ring-4 ring-white",
              recomendado
                ? "bg-accent text-white"
                : "bg-primary text-primary-foreground",
            )}
          >
            {numero}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-heading text-xl font-semibold text-primary">
                {titulo}
              </h3>
              {recomendado ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent-contrast">
                  <Star className="size-3" aria-hidden />
                  Porta de entrada mais procurada
                </span>
              ) : null}
            </div>

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
