import { cn } from "@/lib/utils";

interface EditorialBadgeProps {
  children: React.ReactNode;
  tone?: "light" | "dark" | "gold";
  className?: string;
}

export function EditorialBadge({
  children,
  tone = "light",
  className,
}: EditorialBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-extrabold uppercase leading-none tracking-[0.16em]",
        tone === "light" &&
          "border-primary/12 bg-primary/[0.04] text-primary",
        tone === "dark" &&
          "border-white/12 bg-white/[0.06] text-on-dark-accent",
        tone === "gold" &&
          "border-warm-accent/25 bg-warm-accent/10 text-[#8A651F]",
        className,
      )}
    >
      {children}
    </span>
  );
}
