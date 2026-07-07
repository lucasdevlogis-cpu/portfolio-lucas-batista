# Auditoria inicial — Redesign Premium Desktop

Data: 2026-07-07
Branch: `redesign/premium-desktop`

## Checks locais antes da alteração

- `npm run validate`: OK — 10 cases demonstráveis, 1 roadmap.
- `npm run lint`: OK.
- `npm run typecheck`: OK.

## Produção/domínio

- `npx vercel inspect portfolio-lucas-batista-murex.vercel.app`: deployment `dpl_452K61fig3TWr7iedkyo7wsm8VRf`, target `production`, status `Ready`, criado em 2026-07-07 16:09:15 UTC-3.
- Alias principal: `https://portfolio-lucas-batista-murex.vercel.app`.
- Preview/URL do deploy: `https://portfolio-lucas-batista-r8voda2v4-lucasdevlogis-5294s-projects.vercel.app`.
- Alias Git main: `https://portfolio-lucas-batista-git-main-lucasdevlogis-5294s-projects.vercel.app`.

## Divergência encontrada

A URL pública renderiza uma versão comercial antiga da landing, com navegação `Dores`, `Serviços`, `Cases`, `Método`, `Sobre`, `Contato` e headline de consultoria logística.

O código local e a documentação canônica apontam para o pivot `Executive Proof System`, com navegação `Perfil`, `Provas`, `Trajetória`, `Contato`, contato direto e CV PDF. Portanto, produção e código local estão desalinhados antes deste redesign.

## Arquitetura client-heavy encontrada

Componentes estáticos marcados como client por causa de Framer Motion:

- `Header`
- `Hero`
- `Cases`
- `CaseCard`
- `ProfileSection`
- `TrajectorySection`
- `Contato`
- `Footer`

Componentes que devem permanecer client:

- `CaseLibraryInteractive` por filtros.
- `CaseDemoLauncher` por estado de modal.
- `DemoModal` por dialog/iframe.
- `MobileNav` se mantido.
- `components/ui/dialog` por Base UI.

## Direção de execução

- Reduzir dependência de Framer Motion nas seções estáticas.
- Criar seções server-first e manter client apenas onde há interação real.
- Refinar tokens em `app/globals.css` para paleta editorial premium.
- Trocar catálogo de cards por hero proprietário, cases horizontais, biblioteca compacta e trajetória curada.
