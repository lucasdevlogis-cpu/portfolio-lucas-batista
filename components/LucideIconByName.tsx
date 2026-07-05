import { createElement } from "react";

import type { LucideIconName } from "@/data/content";
import { getLucideIcon } from "@/lib/lucide-icons";
import { cn } from "@/lib/utils";

interface LucideIconByNameProps {
  name: LucideIconName;
  className?: string;
}

export function LucideIconByName({ name, className }: LucideIconByNameProps) {
  return createElement(getLucideIcon(name), {
    className: cn(className),
    "aria-hidden": true,
  });
}
