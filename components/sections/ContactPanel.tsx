"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  Download,
  FileText,
  Link,
  Mail,
  MapPin,
} from "lucide-react";

import { SectionShell } from "@/components/layout/SectionShell";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { CONTENT } from "@/data/content";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface ContactLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  external?: boolean;
  download?: boolean;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

function ContactLinkCard({
  href,
  icon,
  label,
  value,
  external,
  download,
  onClick,
  variant = "secondary",
}: ContactLinkProps) {
  const isPrimary = variant === "primary";

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      download={download}
      onClick={onClick}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group flex min-h-[4.5rem] items-center gap-4 rounded-xl border px-4 py-3.5 transition-all duration-normal ease-editorial sm:px-5 sm:py-4",
        isPrimary
          ? "border-accent/40 bg-accent/10 text-white hover:border-accent hover:bg-accent/15 hover:shadow-glow"
          : "border-white/15 bg-white/[0.04] text-white hover:border-white/25 hover:bg-white/[0.08]",
      )}
    >
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors",
          isPrimary ? "bg-accent text-white" : "bg-white/10 text-on-dark-accent",
        )}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-extrabold uppercase tracking-[0.12em] text-on-dark-accent">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-sm font-semibold text-white sm:text-base">
          {value}
        </span>
      </span>
      <span className="shrink-0 text-on-dark-accent transition-transform duration-normal group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        {download ? <Download className="size-5" aria-hidden /> : <ArrowUpRight className="size-5" aria-hidden />}
      </span>
    </motion.a>
  );
}

export function ContactPanel() {
  const { contactLinks, pessoal } = CONTENT;

  return (
    <SectionShell
      id="contato"
      tone="dark"
      eyebrow={contactLinks.eyebrow}
      title={contactLinks.titulo}
      lead={contactLinks.descricao}
      className="relative overflow-hidden bg-surface-dark"
      innerClassName="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-10"
      headerClassName="mb-0"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_78%_20%,rgba(20,184,166,0.12),transparent_55%),radial-gradient(ellipse_50%_40%_at_10%_85%,rgba(212,168,83,0.12),transparent_50%)]"
        aria-hidden
      />
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <div
        className="ambient-orb"
        style={{
          width: 360,
          height: 360,
          background: "rgba(22, 169, 156, 0.16)",
          top: "-80px",
          right: "-60px",
          opacity: 0.4,
        }}
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 1, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div className="grid gap-3">
          <ContactLinkCard
            href={pessoal.linkedin}
            external
            variant="primary"
            icon={<Link className="size-5" aria-hidden />}
            label={contactLinks.linkedinLabel}
            value={pessoal.linkedin.replace("https://", "")}
            onClick={() => analytics.linkedinClick("contato")}
          />
          <ContactLinkCard
            href={`mailto:${pessoal.email}`}
            icon={<Mail className="size-5" aria-hidden />}
            label={contactLinks.emailLabel}
            value={pessoal.email}
            onClick={() => analytics.contactClick("email")}
          />
          <ContactLinkCard
            href={pessoal.github}
            external
            icon={<Code2 className="size-5" aria-hidden />}
            label={contactLinks.githubLabel}
            value={pessoal.github.replace("https://", "")}
            onClick={() => analytics.githubClick("contato")}
          />
          {contactLinks.cvUrl ? (
            <ContactLinkCard
              href={contactLinks.cvUrl}
              download
              icon={<FileText className="size-5" aria-hidden />}
              label={contactLinks.cvLabel}
              value="Baixar PDF executivo"
              onClick={() => analytics.cvDownload()}
            />
          ) : null}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 1, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative space-y-5"
      >
        <PremiumCard tone="dark" className="p-5 lg:p-6" gradientBorder>
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-on-dark-accent">
            Quando me chamar
          </p>
          <ul className="mt-4 grid gap-3">
            {contactLinks.manifesto.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-on-dark-muted sm:text-base">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </PremiumCard>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <MapPin className="mt-0.5 size-5 shrink-0 text-on-dark-accent" aria-hidden />
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-on-dark-accent">Localização</p>
              <p className="mt-1 text-sm font-semibold text-white">{pessoal.localizacao}</p>
              <p className="text-xs text-on-dark-muted">{pessoal.tempoResposta}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <FileText className="mt-0.5 size-5 shrink-0 text-on-dark-accent" aria-hidden />
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-on-dark-accent">Sobre este dossiê</p>
              <p className="mt-1 text-sm leading-relaxed text-on-dark-muted">{contactLinks.nota}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionShell>
  );
}
