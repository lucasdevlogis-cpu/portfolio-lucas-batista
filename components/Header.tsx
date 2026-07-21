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
    <header className="sticky top-0 z-40 border-b border-white/10 bg-surface-dark/90 backdrop-blur-xl transition-colors duration-normal ease-editorial">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <a
          href="#conteudo"
          className="font-heading text-lg font-bold text-white transition-colors hover:text-on-dark-accent"
        >
          {name}
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label={primaryNavigationLabel}>
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-2 text-base font-semibold transition-colors duration-normal ease-editorial focus-ring",
                  isActive ? "text-white" : "text-on-dark-muted hover:bg-white/10 hover:text-white",
                )}
              >
                {link.label}
                {isActive ? (
                  <span
                    className="absolute bottom-1 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-accent"
                    aria-hidden
                  />
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
              className="hidden size-10 items-center justify-center rounded-md text-on-dark-muted transition-all duration-normal ease-editorial hover:bg-white/10 hover:text-white hover:scale-110 focus-ring md:inline-flex"
            >
              <LinkIcon className="size-5" aria-hidden />
            </a>
          ) : null}
          <a
            href="#contato"
            onClick={() => analytics.ctaClick(navCta, "header")}
            className={cn(
              buttonVariants({ variant: "executive" }),
              "hidden h-10 rounded-lg bg-accent-contrast px-5 text-white transition-all duration-normal ease-editorial hover:-translate-y-0.5 hover:bg-primary hover:shadow-glow md:inline-flex",
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
