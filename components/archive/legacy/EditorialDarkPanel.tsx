import { cn } from "@/lib/utils";

interface EditorialDarkPanelProps {
  children: React.ReactNode;
  className?: string;
}

export function EditorialDarkPanel({
  children,
  className,
}: EditorialDarkPanelProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-ink/20",
        className,
      )}
    >
      {children}
    </div>
  );
}
