import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  gradientBorder?: boolean;
}

export function GlassCard({
  children,
  className,
  dark = false,
  gradientBorder = false,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl",
        dark ? "glass-dark" : "glass",
        gradientBorder && "gradient-border",
        className,
      )}
    >
      {children}
    </div>
  );
}
