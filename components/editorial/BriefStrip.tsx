import type { HeroProva } from "@/data/content";
import { cn } from "@/lib/utils";

interface BriefStripProps {
  provasTitulo: string;
  provas: HeroProva[];
  linkedin?: string;
  email?: string;
  className?: string;
  variant?: "sidebar" | "inline";
}

/**
 * Coluna direita do hero — stats + contato (ProfileStrip / node Figma 2:38).
 */
export function BriefStrip({
  provasTitulo,
  provas,
  linkedin,
  email,
  className,
  variant = "sidebar",
}: BriefStripProps) {
  const showLinkedin = linkedin && !linkedin.startsWith("[");
  const showEmail = email && !email.startsWith("[");

  return (
    <aside
      className={cn(
        variant === "sidebar" &&
          "hidden lg:block lg:border-l lg:border-white/10 lg:pl-10",
        className,
      )}
      aria-label={provasTitulo}
    >
      <p className="text-eyebrow text-on-dark-accent/90">{provasTitulo}</p>

      <dl className="mt-6 space-y-6">
        {provas.map((prova) => (
          <div key={prova.valor}>
            <dt className="font-heading text-2xl font-bold text-white">
              {prova.valor}
            </dt>
            <dd className="mt-1 text-sm leading-snug text-on-dark-muted">
              {prova.label}
            </dd>
          </div>
        ))}
      </dl>

      {showLinkedin || showEmail ? (
        <div className="mt-8 border-t border-white/10 pt-6 text-sm text-on-dark-muted">
          {showLinkedin ? (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-colors hover:text-white"
            >
              LinkedIn
            </a>
          ) : null}
          {showEmail ? (
            <a
              href={`mailto:${email}`}
              className={cn(
                "block transition-colors hover:text-white",
                showLinkedin && "mt-2",
              )}
            >
              {email}
            </a>
          ) : null}
        </div>
      ) : null}
    </aside>
  );
}
