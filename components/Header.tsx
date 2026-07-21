"use client";

import { Link as LinkIcon } from "lucide-react";

import { MobileNav } from "@/components/MobileNav";
import { analytics } from "@/lib/analytics";
import { buttonVariants } from "@/components/ui/button";
import type { MobileNavCopy, NavLink } from "@/data/content";
import { useActiveSection } from "@/lib/use-active-section";
import { cn } from "@/lib/utils";

interface HeaderProps {
  name: string;
  navLinks: NavLink[];
  navCta: string;
  linkedin: string;
  linkedinLabel: string;
  primaryNavigationLabel: string;
  linkedinAriaLabel: string;
  mobileNav: MobileNavCopy;
}

export function Header({
  name,
  navLinks,
  navCta,
  linkedin,
  linkedinLabel,
  primaryNavigationLabel,
  linkedinAriaLabel,
  mobileNav,
}: HeaderProps) {
  const sectionIds = navLinks.map((link) => link.href.replace("#", ""));
  const activeSection = useActiveSection(sectionIds);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/94 backdrop-blur-md">
      <div className="executive-container flex h-[4.25rem] items-center justify-between">
        <a
          href="#conteudo"
          className="focus-ring inline-flex min-h-11 items-center font-mono text-xs font-bold uppercase tracking-[0.08em] text-foreground transition-colors hover:text-primary"
        >
          <span className="mr-2 bg-primary px-1.5 py-1 text-primary-foreground">LB</span>
          <span className="hidden sm:inline">{name}</span>
        </a>

        <nav className="hidden h-full items-center md:flex" aria-label={primaryNavigationLabel}>
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "focus-ring relative inline-flex h-full items-center px-4 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.1em] transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
                {isActive ? (
                  <span className="absolute inset-x-4 bottom-0 h-0.5 bg-primary" aria-hidden />
                ) : null}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {!linkedin.startsWith("[") ? (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={linkedinAriaLabel}
              onClick={() => analytics.linkedinClick("header")}
              className="focus-ring hidden size-10 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary md:inline-flex"
            >
              <LinkIcon className="size-5" aria-hidden />
            </a>
          ) : null}
          <a
            href="#contato"
            onClick={() => analytics.ctaClick(navCta, "header")}
            className={cn(
              buttonVariants({ variant: "executive" }),
              "hidden h-10 px-5 md:inline-flex",
            )}
          >
            {navCta}
          </a>

          <MobileNav
            navLinks={navLinks}
            navCta={navCta}
            linkedin={linkedin}
            linkedinLabel={linkedinLabel}
            copy={mobileNav}
          />
        </div>
      </div>
    </header>
  );
}
