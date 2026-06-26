"use client";

import { Check } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  numero: number;
  titulo: string;
  descricao: string;
  entregas: string[];
  corBorda: string;
}

export function ServiceCard({
  numero,
  titulo,
  descricao,
  entregas,
  corBorda,
}: ServiceCardProps) {
  const borderClass = corBorda.replace(/^border-/, "border-l-");

  return (
    <Card
      className={cn(
        "rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md",
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
            <p className="mt-2 text-muted-foreground">{descricao}</p>
            <ul className="mt-4 space-y-2">
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
        </div>
      </CardContent>
    </Card>
  );
}
