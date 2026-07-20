# Avaliação do projeto — 20/07/2026

> Snapshot de saúde comprovado localmente. Produção só é considerada atual após o checklist de [`VERCEL.md`](VERCEL.md).

## Estado executivo

| Área | Estado local | Evidência |
|---|---|---|
| Landing Executive Proof System | Pronta | ordem canônica e conteúdo revisados |
| Provas âncora | Prontas | 3 rotas SSG em React/Next, ECharts e MapLibre |
| Provas complementares | Prontas | 7 demos Streamlit no modal híbrido |
| Roadmap | Declarado | `06-kpis-cd`, sem CTA de demo |
| Contrato de snapshots | Válido | 3/3 JSONs validados pelo TypeScript |
| Tokens compartilhados | Sincronizados | JSON → CSS + Python |
| Acessibilidade | Aprovada localmente | Lighthouse 100 desktop/mobile |
| Dependências | Sem achados | `npm audit`: 0 vulnerabilidades |
| Deploy desta versão | Pendente | requer push e verificação Vercel/Streamlit |

## Qualidade verificada

| Verificação | Resultado |
|---|---:|
| `npm run validate` | OK — 10 demos + 1 roadmap + 3 snapshots |
| `npm run lint` | OK |
| `npm run typecheck` | OK |
| `npm run build` | OK — Next.js 16.2.10, sem warnings de cache |
| Playwright | 14/14 |
| Smoke Streamlit | 13/13 |
| Slugs landing ↔ Streamlit | 10/10 |
| `npm audit --audit-level=moderate` | 0 vulnerabilidades |

### Lighthouse local

Medição em build de produção servido por `next start`:

| Perfil | Performance | Acessibilidade | Boas práticas | SEO |
|---|---:|---:|---:|---:|
| Desktop | 100 | 100 | 100 | 100 |
| Mobile | 91 | 100 | 100 | 100 |

O gate em `scripts/run-lighthouse.mjs` falha se qualquer categoria ficar abaixo de 90. Relatórios JSON locais ficam em `docs/audit/lighthouse/` e são ignorados pelo Git.

## Mudanças consolidadas

- Tokens de landing e Streamlit agora partem de `design/tokens.json`.
- `public/profile.jpg` e a imagem correspondente no JSON-LD foram removidos.
- As provas `01`, `02` e `08` ganharam rotas públicas e renderização direta no modal.
- Gráficos e mapas das âncoras usam cores semânticas, tooltips legíveis, atribuição de mapa e carregamento sob demanda.
- A pergunta de frete passou a dizer “quanto se afasta do piso ANTT”, compatível com resultados positivos ou negativos.
- Numeração visual das demos Streamlit foi alinhada aos IDs dos cases da landing.
- Emojis de status/insight foram substituídos por rótulos semânticos nas superfícies compartilhadas.
- Contraste, nomes acessíveis de CTAs e carregamento local do Analytics foram corrigidos; Lighthouse a11y e boas práticas chegaram a 100.
- O hero não anima o elemento LCP; mobile permanece acima do gate de 90.
- Cache imutável customizado foi removido de assets não versionados e de `/_next/static`; o Next controla o cache interno.
- Lighthouse foi instalado e encapsulado em scripts reproduzíveis; Next e ESLint estão alinhados em 16.2.10.

## Auditoria visual

Capturas atuais em [`audit/screenshots/after/`](audit/screenshots/after/) cobrem 375×812, 768×1024 e 1440×900, além do modal âncora. O navegador embutido não pôde ser usado por erro externo `sandboxPolicy`; Playwright Chromium foi o fallback já autorizado e validado.

## Gaps reais restantes

1. Publicar e validar esta versão em produção.
2. Elevar as sete demos Streamlit secundárias na fase 2.
3. Separar datasets gerados em `demos-logistica/data/generated/`.
4. Adicionar regressão visual automatizada e teste com NVDA.
5. Decidir domínio próprio e foto profissional somente com assets reais.

Fila e ordem de execução: [`P0_P1_P2_CHECKLIST.md`](P0_P1_P2_CHECKLIST.md).

---

*Não grave SHA como verdade estática; confirme o deploy com `npx vercel inspect`.*
