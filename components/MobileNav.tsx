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
        className="inline-flex size-11 items-center justify-center border border-border bg-card text-foreground transition-colors hover:border-primary hover:text-primary md:hidden"
        aria-label={copy.openLabel}
      >
        <Menu className="size-5" aria-hidden />
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="fixed inset-x-3 top-[4.75rem] bottom-auto max-w-none translate-x-0 translate-y-0 rounded-sm border-border bg-popover p-3 shadow-premium sm:inset-x-auto sm:right-4 sm:left-auto sm:w-80"
      >
        <div className="mb-2 flex items-center justify-between px-1">
          <DialogTitle className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-primary">
            {copy.menuTitle}
          </DialogTitle>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex size-10 items-center justify-center border border-border text-muted-foreground hover:border-primary hover:text-primary"
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
              className="block border-t border-border px-2 py-3.5 font-heading text-xl font-extrabold uppercase text-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className={cn(buttonVariants({ variant: "executive", size: "lg" }), "mt-3 h-12 w-full")}
          >
            {navCta}
          </a>
          {!linkedin.startsWith("[") ? (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex min-h-11 items-center gap-2 px-2 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-primary"
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
