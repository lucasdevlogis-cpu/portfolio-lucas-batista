import { cn } from "@/lib/utils";

interface PremiumCardProps {
  as?: "article" | "div";
  className?: string;
  children: React.ReactNode;
}

export function PremiumCard({ as = "div", className, children }: PremiumCardProps) {
  const Component = as;

  return (
    <Component
      className={cn(
        "relative overflow-hidden rounded-xl border border-primary/15 bg-card shadow-card transition-colors duration-normal ease-editorial hover:border-primary/25",
        className,
      )}
    >
      {children}
    </Component>
  );
}
