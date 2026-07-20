# Skill: Mobile-first

> Canônico: [`docs/MOBILE_SPEC.md`](../../docs/MOBILE_SPEC.md).

1. Implementar em 375 px; validar também 768 e 1440 px.
2. Sem overflow horizontal; fonte ≥14 px; alvo ≥44×44 px.
3. Hero em uma coluna, painel lateral escondido e CTAs full-width.
4. Âncoras empilhadas; biblioteca vira cards com filtros horizontais.
5. Modal âncora renderiza `DemoShell`; complementar mantém preview + iframe.
6. KPI row empilha quando necessário; gráfico e mapa usam largura total.
7. Bibliotecas pesadas continuam lazy.

Nomes ativos: `CaseLibrary`, `DemoModal`, `DemoShell`. Cockpit e componentes `archive/` não retornam.
