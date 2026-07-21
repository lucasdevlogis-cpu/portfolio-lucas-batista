# Roadmap e fila ativa

Atualizado em 21/07/2026. Esta é a única fila operacional do projeto.

## Concluído nesta refatoração

- [x] confirmar a causa do reinício e restaurar o arquivo de workspace;
- [x] inventariar as três cópias locais das demos;
- [x] definir arquitetura de repositório único;
- [x] mover o Streamlit para `apps/demos/`;
- [x] separar domínio, apresentação, pages e settings Python;
- [x] separar datasets `raw/` e `generated/`;
- [x] criar catálogo compartilhado e remover lista duplicada de slugs;
- [x] mover snapshots para `contracts/` e validar o schema;
- [x] consolidar tokens para CSS, Python e Streamlit;
- [x] adotar `st.navigation` com URLs explícitas;
- [x] dividir o modal e impedir iframe automático no mobile;
- [x] reduzir fronteiras cliente e remover Framer Motion;
- [x] remover componentes, helpers, CSS e arquivos históricos sem uso;
- [x] usar sitemap e robots nativos do Next.js;
- [x] mover QA e intermediários para `.artifacts/`;
- [x] regenerar CV a partir de `data/content.ts`;
- [x] corrigir dependências: `npm audit` com 0 vulnerabilidades;
- [x] adicionar CI única para contratos, Node, Python, smoke e E2E;
- [x] validar build, TypeScript, ESLint, Ruff, pytest e smoke 13/13;
- [x] executar Playwright completo: 17/17, incluindo ESC, retorno de foco,
      reduced motion e gate mobile do iframe;
- [x] capturar e revisar landing, modal e 3 âncoras em 375, 768 e 1440 px;
- [x] validar 12 rotas Streamlit desktop e 7 embeds complementares mobile;
- [x] executar Lighthouse: desktop 100/100/100/100 e mobile 93/100/100/100;
- [x] arquivar os dois clones locais antigos em
      `C:\Users\Lucas\Dev\archive\portfolio-demos-legacy\2026-07-20`;
- [x] consolidar documentação e regras do repositório.
- [x] publicar a refatoração pela PR arquitetural e mesclar em `main`;
- [x] corrigir CI Linux, smoke isolado e validação de filtro vazio;
- [x] normalizar as variáveis Vercel sem entradas duplicadas por ambiente;
- [x] publicar a landing na Vercel e confirmar CI `Quality` verde;
- [x] executar QA público da landing e Lighthouse: desktop 100/100/100/100 e
      mobile 99/100/100/100.

## P0 — fechar e publicar esta arquitetura

- [x] revisar, publicar e mesclar o commit arquitetural;
- [x] publicar Next e executar o checklist pós-deploy da landing;
- [ ] criar a app Streamlit canônica com repo `portfolio-lucas-batista`, branch
      `main` e entrypoint `apps/demos/app.py`;
- [ ] executar `qa:streamlit` na nova URL e atualizar a Vercel se o subdomínio
      mudar;
- [ ] remover a app/repositório legado somente após o corte validado.

Bloqueador atual: o Community Cloud exige delete/redeploy para trocar as
coordenadas GitHub e não oferece API pública de administração. O controle da
sessão autenticada ficou indisponível nesta execução por `sandboxPolicy`; o
runbook exato está em `OPERACAO.md`.

## P1 — elevar as provas complementares

- [ ] priorizar as 2 complementares com maior valor para recrutamento usando
      evidência de uso, não preferência estética;
- [ ] aplicar o mesmo roteiro das âncoras: pergunta, decisão, 3 KPIs, visual,
      método, limitação e CTA;
- [ ] reduzir dependência de CSS interno do Streamlit onde ainda existir;
- [ ] avaliar migração React apenas quando iframe, performance ou controle
      visual forem um problema comprovado;
- [ ] adicionar regressão visual estável para componentes críticos, evitando
      snapshots frágeis de página inteira.

## P2 — diferenciação

- [ ] criar o case de KPIs de CD apenas quando houver narrativa causal entre
      ocupação, picking, expedição e transporte;
- [ ] instrumentar abertura de provas e filtros para orientar priorização;
- [ ] avaliar um componente Streamlit React compartilhado somente se reduzir
      manutenção real;
- [ ] revisar copy e CV com dados profissionais novos, mantendo a mesma fonte.

## Ordem da próxima execução

1. Criar a nova app Streamlit a partir do repositório canônico.
2. Rodar `qa:streamlit` na URL nova antes do corte.
3. Atualizar `NEXT_PUBLIC_DEMOS_BASE_URL` e redeployar a Vercel se a URL mudar.
4. Validar modal, embed e nova aba; então retirar a app legada.
5. Fechar o P0 e iniciar o P1 com base em valor de recrutamento e uso.

## Critério de pronto

Nenhum P0 local aberto, `npm audit` zerado, 13/13 no Streamlit, E2E verde,
Lighthouse ≥ 90, evidência visual aprovada nos três viewports e Community Cloud
consumindo `apps/demos/app.py` do repositório canônico.
