"use client";

import { LucideIconByName } from "@/components/LucideIconByName";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { LucideIconName } from "@/data/content";
import { cn } from "@/lib/utils";

interface PainPointCardProps {
  icon: LucideIconName;
  title: string;
  index: number;
  className?: string;
}

export function PainPointCard({
  icon,
  title,
  index,
  className,
}: PainPointCardProps) {
  return (
    <Card
      className={cn(
        "relative rounded-xl border bg-card shadow-md transition-shadow hover:shadow-lg",
        className,
      )}
    >
      <Badge className="absolute top-4 right-4 bg-accent/10 text-accent-contrast hover:bg-accent/10">
        {index + 1}
      </Badge>
      <CardContent className="p-6">
        <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/5 text-primary">
          <LucideIconByName name={icon} className="size-6" />
        </div>
        <p className="pr-8 font-medium leading-snug text-foreground">{title}</p>
      </CardContent>
    </Card>
  );
}
