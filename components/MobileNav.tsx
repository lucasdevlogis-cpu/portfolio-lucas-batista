"use client";

import { useState } from "react";

import { Link as LinkIcon, Menu, X } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { MobileNavCopy, NavLink } from "@/data/content";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  navLinks: NavLink[];
  navCta: string;
  linkedin: string;
  linkedinLabel: string;
  copy: MobileNavCopy;
}

export function MobileNav({ navLinks, navCta, linkedin, linkedinLabel, copy }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="inline-flex size-10 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] text-white shadow-sm transition-colors hover:bg-white/10 md:hidden"
        aria-label={copy.openLabel}
      >
        <Menu className="size-5" aria-hidden />
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="fixed inset-x-4 top-16 bottom-auto max-w-none translate-x-0 translate-y-0 rounded-xl border-border bg-card p-3 sm:inset-x-auto sm:right-4 sm:left-auto sm:w-72"
      >
        <div className="mb-2 flex items-center justify-between px-1">
          <DialogTitle className="text-sm font-bold text-ink">{copy.menuTitle}</DialogTitle>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-ink"
            aria-label={copy.closeLabel}
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>
        <DialogDescription className="sr-only">{copy.description}</DialogDescription>
        <nav aria-label={copy.navigationLabel}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className={cn(
              buttonVariants({ variant: "executive", size: "lg" }),
              "mt-2 h-11 w-full rounded-lg",
            )}
          >
            {navCta}
          </a>
          {!linkedin.startsWith("[") ? (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center gap-2 rounded-md px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-ink"
            >
              <LinkIcon className="size-5" aria-hidden />
              {linkedinLabel}
            </a>
          ) : null}
        </nav>
      </DialogContent>
    </Dialog>
  );
}
