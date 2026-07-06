"use client";

import { cn } from "@/lib/utils";

interface CategoryTabsProps<T extends string> {
  categories: readonly T[];
  active: T;
  onChange: (category: T) => void;
  ariaLabel: string;
}

/**
 * Filtros como tabs underline — não pills arredondadas.
 */
export function CategoryTabs<T extends string>({
  categories,
  active,
  onChange,
  ariaLabel,
}: CategoryTabsProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="mb-8 flex flex-wrap gap-x-6 gap-y-2 border-b border-border"
    >
      {categories.map((categoria) => {
        const ativo = active === categoria;
        return (
          <button
            key={categoria}
            type="button"
            role="tab"
            aria-selected={ativo}
            onClick={() => onChange(categoria)}
            className={cn(
              "-mb-px border-b-2 pb-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
              ativo
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {categoria}
          </button>
        );
      })}
    </div>
  );
}
