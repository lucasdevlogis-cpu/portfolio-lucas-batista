import { ArrowUpRight, Code2, Download, FileText, Link, Mail, MapPin } from "lucide-react";

import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/motion/Reveal";
import { CONTENT } from "@/data/content";
import { cn } from "@/lib/utils";

interface ContactLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  external?: boolean;
  download?: boolean;
  primary?: boolean;
}

function ContactLink({ href, icon, label, value, external, download, primary }: ContactLinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      download={download}
      className={cn(
        "focus-ring group grid min-h-20 grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b px-4 py-4 transition-colors last:border-b-0 sm:px-5",
        primary
          ? "border-background/20 bg-primary text-primary-foreground hover:bg-primary/90"
          : "border-background/20 text-background hover:bg-background/5",
      )}
    >
      <span className="[&_svg]:size-5">{icon}</span>
      <span>
        <span className="block font-mono text-[0.65rem] font-bold uppercase tracking-[0.1em] opacity-65">
          {label}
        </span>
        <span className="mt-1 block text-sm font-bold">{value}</span>
      </span>
      {download ? (
        <Download className="size-4" aria-hidden />
      ) : (
        <ArrowUpRight
          className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      )}
    </a>
  );
}

export function ContactPanel() {
  const { contactLinks, pessoal } = CONTENT;

  return (
    <SectionShell
      id="contato"
      tone="dark"
      className="bg-background"
      innerClassName="max-w-[1280px]"
    >
      <Reveal className="bg-foreground text-background">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="border-b border-background/20 p-6 sm:p-10 lg:border-r lg:border-b-0 lg:p-12 xl:p-16">
            <p className="technical-label text-primary">{contactLinks.eyebrow}</p>
            <h2 className="mt-5 max-w-[9ch] font-heading text-[clamp(3rem,8vw,7rem)] font-black uppercase leading-[0.8] tracking-[-0.065em]">
              {contactLinks.titulo}
            </h2>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-background/70 sm:text-lg">
              {contactLinks.descricao}
            </p>

            <div className="mt-9 flex flex-col gap-3 border-t border-background/20 pt-5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-background/65 sm:flex-row sm:gap-8">
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4 text-primary" aria-hidden />
                {pessoal.localizacao}
              </span>
              <span>{pessoal.tempoResposta}</span>
            </div>

            <div className="mt-10 border-l-2 border-primary pl-4">
              <p className="technical-label text-primary">{contactLinks.manifestoTitle}</p>
              <ul className="mt-4 grid gap-2 text-sm leading-relaxed text-background/70">
                {contactLinks.manifesto.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <ContactLink
                href={pessoal.linkedin}
                external
                primary
                icon={<Link aria-hidden />}
                label={contactLinks.linkedinLabel}
                value={contactLinks.linkedinValue}
              />
              <ContactLink
                href={`mailto:${pessoal.email}`}
                icon={<Mail aria-hidden />}
                label={contactLinks.emailLabel}
                value={contactLinks.emailValue}
              />
              <ContactLink
                href={pessoal.github}
                external
                icon={<Code2 aria-hidden />}
                label={contactLinks.githubLabel}
                value={contactLinks.githubValue}
              />
              {contactLinks.cvUrl ? (
                <ContactLink
                  href={contactLinks.cvUrl}
                  download
                  icon={<FileText aria-hidden />}
                  label={contactLinks.cvLabel}
                  value={contactLinks.cvValue}
                />
              ) : null}
            </div>

            <div className="border-t border-background/20 p-5 sm:p-7">
              <p className="technical-label text-primary">{contactLinks.noteLabel}</p>
              <p className="mt-3 text-xs leading-relaxed text-background/60">{contactLinks.nota}</p>
            </div>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
