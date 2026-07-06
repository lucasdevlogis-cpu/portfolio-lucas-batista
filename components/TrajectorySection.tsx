import { CONTENT } from "@/data/content";

export function TrajectorySection() {
  const { experienceSignals } = CONTENT;

  return (
    <section id="trajetoria" className="scroll-mt-20 bg-editorial py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-warm-accent">
              {experienceSignals.eyebrow}
            </p>
            <h2 className="mt-4 font-heading text-4xl font-black text-ink md:text-5xl">
              {experienceSignals.titulo}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {experienceSignals.resumo}
            </p>
          </div>

          <div className="grid gap-6">
            <div className="grid gap-4">
              {experienceSignals.trajetoria.map((signal, index) => (
                <article
                  key={signal.titulo}
                  className="grid gap-4 rounded-xl border border-border bg-card p-5 sm:grid-cols-[4rem_1fr]"
                >
                  <p className="font-heading text-3xl font-black text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-ink">
                      {signal.titulo}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {signal.descricao}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-heading text-xl font-bold text-ink">
                  {experienceSignals.stackTitulo}
                </h3>
                <div className="mt-4 grid gap-4">
                  {experienceSignals.stackGrupos.map((grupo) => (
                    <div key={grupo.grupo}>
                      <p className="text-sm font-bold text-primary">
                        {grupo.grupo}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {grupo.itens.join(" · ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-surface-dark p-5 text-white">
                <h3 className="font-heading text-xl font-bold text-white">
                  {experienceSignals.dominiosTitulo}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {experienceSignals.dominios.map((dominio) => (
                    <span
                      key={dominio}
                      className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm text-on-dark-muted"
                    >
                      {dominio}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
