# Roadmap e fila ativa

Atualizado em 20/07/2026. Esta é a única fila operacional do projeto.

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

## P0 — fechar e publicar esta arquitetura

- [x] revisar o diff final e criar o commit arquitetural local;
- [ ] migrar no Streamlit Cloud a origem para este repositório e
      `apps/demos/app.py`;
- [ ] publicar Next e Streamlit, então executar o checklist pós-deploy.

Os dois últimos itens alteram serviços externos e exigem autorização explícita.

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

1. Com autorização, enviar o commit canônico ao GitHub.
2. Migrar a origem do Streamlit Cloud para este repositório.
3. Publicar Next e Streamlit.
4. Executar QA e Lighthouse novamente nas URLs públicas.
5. Iniciar o P1 com base em valor de recrutamento e evidência de uso.

## Critério de pronto

Nenhum P0 local aberto, `npm audit` zerado, 13/13 no Streamlit, E2E verde,
Lighthouse ≥ 90 e evidência visual aprovada nos três viewports. Publicação não
faz parte do pronto local porque exige autorização externa.
