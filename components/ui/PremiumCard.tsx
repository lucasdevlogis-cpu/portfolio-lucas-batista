import { cn } from "@/lib/utils";

interface PremiumCardProps {
  as?: "article" | "div";
  tone?: "light" | "dark";
  className?: string;
  hover?: boolean;
  gradientBorder?: boolean;
  children: React.ReactNode;
}

export function PremiumCard({
  as = "div",
  tone = "light",
  className,
  hover = true,
  gradientBorder = false,
  children,
}: PremiumCardProps) {
  const Component = as;

  return (
    <Component
      className={cn(
        "relative overflow-hidden rounded-xl border transition-all duration-normal ease-editorial will-change-transform",
        tone === "light" &&
          "border-primary/15 bg-card shadow-card",
        tone === "dark" &&
          "border-white/[0.12] bg-white/[0.06] shadow-[0_24px_80px_rgba(0,0,0,0.22)]",
        hover &&
          "hover:-translate-y-1 hover:shadow-elevated hover:border-primary/25",
        tone === "dark" && hover && "hover:border-white/25 hover:bg-white/[0.08]",
        gradientBorder && "gradient-border",
        className,
      )}
    >
      {children}
    </Component>
  );
}
