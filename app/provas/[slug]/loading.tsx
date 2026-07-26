export default function DemoLoading() {
  return (
    <main
      id="conteudo"
      className="flex min-h-screen items-center justify-center bg-background px-5 py-8"
    >
      <div className="w-full max-w-[1280px] border border-border bg-card p-6 sm:p-10">
        <p className="technical-label text-primary">Carregando prova técnica</p>
        <div
          className="mt-5 h-12 w-3/4 animate-pulse bg-surface-dark motion-reduce:animate-none"
          aria-hidden
        />
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground" role="status">
          Preparando os indicadores, gráficos e o contexto espacial.
        </p>
      </div>
    </main>
  );
}
