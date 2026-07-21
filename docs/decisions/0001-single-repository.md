# ADR 0001 — Repositório único para landing e demos

- Status: aceito
- Data: 20/07/2026

## Contexto

Havia três cópias locais das demos: uma dentro do portfólio, um clone de deploy
e um clone antigo. O fluxo exigia cópia manual, permitia divergência de código,
dados e documentação e tornava ambígua a fonte correta.

## Decisão

Manter um único repositório Git:

- Next.js continua na raiz;
- Streamlit vive em `apps/demos/`;
- catálogo e snapshots vivem em `contracts/`;
- Streamlit Cloud aponta diretamente para `apps/demos/app.py`;
- Vercel continua usando a raiz sem configuração especial;
- clones locais antigos são arquivados de forma recuperável.

## Consequências

Positivas:

- uma alteração atômica pode atualizar cálculo, contrato e apresentação;
- validações detectam divergência antes do build;
- não há sincronização manual nem segundo histórico ativo;
- documentação e CI descrevem um único fluxo.

Trade-offs:

- Vercel recebe também os arquivos Python no checkout;
- o gate Node precisa enxergar partes da árvore Python para validar contratos;
- alterações das demos e da landing compartilham o mesmo ciclo de revisão.

Esses custos são menores que o risco operacional de manter cópias divergentes.

## Migração

Concluído localmente:

1. app movido para `apps/demos/`;
2. imports, dados, scripts e testes ajustados;
3. dois runtimes validados;
4. clones locais antigos arquivados de forma recuperável.

Pendente em serviço externo:

1. apontar Streamlit Cloud para o repositório canônico;
2. validar a URL pública após a migração;
3. manter o repositório remoto antigo somente como legado temporário, sem novos
   commits.

## Reversão

Se o Streamlit Cloud não aceitar o entrypoint em subdiretório, o rollback é
temporário: manter a release anterior ativa enquanto se corrige configuração.
Não reintroduzir cópia manual como arquitetura permanente.
