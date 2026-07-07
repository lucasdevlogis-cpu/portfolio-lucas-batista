"use client";

import { motion } from "framer-motion";
import { Link as LinkIcon } from "lucide-react";

import { MobileNav } from "@/components/MobileNav";
import { buttonVariants } from "@/components/ui/button";
import { CONTENT } from "@/data/content";
import { cn } from "@/lib/utils";

export function Header() {
  const navLinks = CONTENT.nav;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 border-b border-white/10 bg-surface-dark/92 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#conteudo"
          className="font-heading text-lg font-black text-white transition-colors hover:text-on-dark-accent"
        >
          {CONTENT.pessoal.nome}
        </a>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Principal"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-on-dark-muted transition-colors duration-normal ease-editorial hover:bg-white/10 hover:text-white focus-ring"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {!CONTENT.pessoal.linkedin.startsWith("[") ? (
            <a
              href={CONTENT.pessoal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Lucas Batista"
              className="hidden size-10 items-center justify-center rounded-md text-on-dark-muted transition-all duration-normal ease-editorial hover:bg-white/10 hover:text-white hover:scale-110 focus-ring md:inline-flex"
            >
              <LinkIcon className="size-5" aria-hidden />
            </a>
          ) : null}
          <a
            href="#contato"
            className={cn(
              buttonVariants({ variant: "executive" }),
              "hidden h-10 rounded-lg bg-accent px-5 text-white transition-all duration-normal ease-editorial hover:-translate-y-0.5 hover:bg-accent-contrast hover:shadow-glow md:inline-flex",
            )}
          >
            {CONTENT.navCta}
          </a>

          <MobileNav />
        </div>
      </div>
    </motion.header>
  );
}
