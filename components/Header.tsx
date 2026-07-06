"use client";

import { Link as LinkIcon, Menu } from "lucide-react";
import { useCallback, useState, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CONTENT } from "@/data/content";
import { scrollToSection, sectionIdFromHref } from "@/lib/scroll";
import { cn } from "@/lib/utils";

interface HeaderProps {
  activeSection?: string;
}

function subscribeNoop() {
  return () => {};
}

export function Header({ activeSection = "" }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  const handleNavClick = useCallback((href: string) => {
    scrollToSection(href);
    setOpen(false);
  }, []);

  const navLinks = CONTENT.nav;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-heading text-lg font-bold text-primary"
        >
          {CONTENT.pessoal.nome}
        </button>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Principal"
        >
          {navLinks.map((link) => {
            const id = sectionIdFromHref(link.href);
            const isActive = mounted && activeSection === id;
            return (
              <button
                key={link.href}
                type="button"
                aria-current={isActive ? "page" : undefined}
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-primary",
                )}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {!CONTENT.pessoal.linkedin.startsWith("[") ? (
            <a
              href={CONTENT.pessoal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Lucas Batista"
              className="hidden size-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-primary md:inline-flex"
            >
              <LinkIcon className="size-5" aria-hidden />
            </a>
          ) : null}
          <Button
            className="hidden h-10 px-5 font-medium bg-primary text-primary-foreground hover:bg-primary/90 md:inline-flex"
            onClick={() => handleNavClick("#contato")}
          >
            {CONTENT.navCta}
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  aria-label="Abrir menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,20rem)]">
              <SheetHeader>
                <SheetTitle>{CONTENT.pessoal.nome}</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile">
                {navLinks.map((link) => {
                  const id = sectionIdFromHref(link.href);
                  const isActive = mounted && activeSection === id;
                  return (
                    <button
                      key={link.href}
                      type="button"
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => handleNavClick(link.href)}
                      className={cn(
                        "rounded-md px-3 py-3 text-left text-base font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-muted",
                      )}
                    >
                      {link.label}
                    </button>
                  );
                })}
                <Button
                  className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => handleNavClick("#contato")}
                >
                  {CONTENT.navCta}
                </Button>
                {!CONTENT.pessoal.linkedin.startsWith("[") ? (
                  <a
                    href={CONTENT.pessoal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-2 rounded-md px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                  >
                    <LinkIcon className="size-5" aria-hidden />
                    LinkedIn
                  </a>
                ) : null}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
