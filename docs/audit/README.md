# Auditoria visual e QA

Artefatos de captura, scripts auxiliares e relatórios de verificação ficam nesta pasta.

- `screenshots/`: capturas antes/depois e evidências de viewport.
- `scripts/`: automações auxiliares de captura e inspeção.
- `tmp-captures/`: saídas temporárias de scripts, ignoradas pelo Git.

As capturas de aceite da implementação atual foram feitas com Playwright em 375×812, 768×1024 e 1440×900. `verify-modal-anchor.png` comprova a renderização direta da prova de frete, sem iframe.

Com o build servido em `http://localhost:3000`, regenere as verificações e capturas com:

```powershell
npm run qa:visual
```

O diagnóstico de performance é reproduzível com `npm run lighthouse:all` enquanto o build estiver servido em `http://localhost:3000`. Os relatórios JSON locais ficam em `lighthouse/` e são ignorados pelo Git.

Baseline de 20/07/2026:

| Perfil | Performance | A11y | Boas práticas | SEO |
|---|---:|---:|---:|---:|
| Desktop | 100 | 100 | 100 | 100 |
| Mobile | 91 | 100 | 100 | 100 |

O navegador embutido falhou por `sandboxPolicy`; Playwright Chromium foi o fallback operacional autorizado. Isso é limitação do ambiente, não do projeto.
