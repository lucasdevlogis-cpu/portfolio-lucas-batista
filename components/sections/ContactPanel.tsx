import { ArrowUpRight, Code2, Download, FileText, Link, Mail, MapPin } from "lucide-react";

import { SectionShell } from "@/components/layout/SectionShell";
import { CONTENT } from "@/data/content";
import { cn } from "@/lib/utils";

interface ContactLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  external?: boolean;
  download?: boolean;
  variant?: "primary" | "secondary";
}

function ContactLinkCard({
  href,
  icon,
  label,
  value,
  external,
  download,
  variant = "secondary",
}: ContactLinkProps) {
  const isPrimary = variant === "primary";

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      download={download}
      className={cn(
        "group flex min-h-14 min-w-0 items-center gap-3 rounded-xl border px-3.5 py-2.5 transition-all duration-normal ease-editorial focus-ring sm:px-4",
        isPrimary
          ? "border-accent/40 bg-accent/10 text-white hover:border-accent hover:bg-accent/15 hover:shadow-glow"
          : "border-white/15 bg-white/[0.04] text-white hover:border-white/25 hover:bg-white/[0.08]",
      )}
    >
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors",
          isPrimary ? "bg-accent-contrast text-white" : "bg-white/10 text-on-dark-accent",
        )}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-extrabold uppercase tracking-[0.12em] text-on-dark-accent">
          {label}
        </span>
        <span className="mt-0.5 block break-words text-sm font-semibold text-white">{value}</span>
      </span>
      <span className="shrink-0 text-on-dark-accent transition-transform duration-normal group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        {download ? (
          <Download className="size-4 sm:size-5" aria-hidden />
        ) : (
          <ArrowUpRight className="size-4 sm:size-5" aria-hidden />
        )}
      </span>
    </a>
  );
}

export function ContactPanel() {
  const { contactLinks, pessoal } = CONTENT;

  return (
    <SectionShell
      id="contato"
      tone="dark"
      className="relative !py-6 bg-surface-dark sm:!py-8 lg:!py-10 xl:!py-10"
      innerClassName="max-w-6xl"
    >
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-30" aria-hidden />

      <div className="relative overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.045] p-4 shadow-premium sm:p-5 lg:p-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.45fr)] lg:items-center">
          <div className="max-w-xl">
            <p className="eyebrow-dark">{contactLinks.eyebrow}</p>
            <h2 className="mt-2 font-heading text-3xl font-bold leading-[1.05] tracking-tight text-white md:text-4xl">
              {contactLinks.titulo}
            </h2>
            <p className="mt-2 max-w-md text-base leading-relaxed text-on-dark-muted">
              {contactLinks.descricao}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-on-dark-muted">
              <span className="inline-flex min-h-8 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3">
                <MapPin className="size-4 text-on-dark-accent" aria-hidden />
                <strong className="font-semibold text-white">{pessoal.localizacao}</strong>
              </span>
              <span className="inline-flex min-h-8 items-center rounded-full border border-white/10 bg-white/[0.04] px-3">
                {pessoal.tempoResposta}
              </span>
            </div>
          </div>

          <div className="grid min-w-0 gap-3 sm:grid-cols-2">
            <ContactLinkCard
              href={pessoal.linkedin}
              external
              variant="primary"
              icon={<Link className="size-5" aria-hidden />}
              label={contactLinks.linkedinLabel}
              value={contactLinks.linkedinValue}
            />
            <ContactLinkCard
              href={`mailto:${pessoal.email}`}
              icon={<Mail className="size-5" aria-hidden />}
              label={contactLinks.emailLabel}
              value={contactLinks.emailValue}
            />
            <ContactLinkCard
              href={pessoal.github}
              external
              icon={<Code2 className="size-5" aria-hidden />}
              label={contactLinks.githubLabel}
              value={contactLinks.githubValue}
            />
            {contactLinks.cvUrl ? (
              <ContactLinkCard
                href={contactLinks.cvUrl}
                download
                icon={<FileText className="size-5" aria-hidden />}
                label={contactLinks.cvLabel}
                value={contactLinks.cvValue}
              />
            ) : null}
          </div>
        </div>

        <div className="mt-5 grid gap-4 border-t border-white/10 pt-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start">
          <div className="min-w-0">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-on-dark-accent">
              {contactLinks.manifestoTitle}
            </p>
            <ul className="mt-2 grid gap-2 sm:grid-cols-3">
              {contactLinks.manifesto.map((item) => (
                <li
                  key={item}
                  className="flex min-w-0 items-start gap-2 text-sm leading-snug text-on-dark-muted"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex min-w-0 items-start gap-2 text-sm leading-snug text-on-dark-muted">
            <FileText className="mt-0.5 size-4 shrink-0 text-on-dark-accent" aria-hidden />
            <p>
              <span className="font-extrabold uppercase tracking-[0.12em] text-on-dark-accent">
                {contactLinks.noteLabel}:{" "}
              </span>
              {contactLinks.nota}
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
