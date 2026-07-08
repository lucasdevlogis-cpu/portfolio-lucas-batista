# Configuração dos MCPs do Cursor

Este arquivo documenta como configurar os servidores MCP declarados em `.cursor/mcp.json`.

## GitHub MCP

1. Gere um Personal Access Token no GitHub:
   - Acesse: https://github.com/settings/tokens
   - Escopos recomendados: `repo`, `read:user`, `read:org`
2. Substitua `<SEU_TOKEN_GITHUB>` em `.cursor/mcp.json` pelo token real.
3. Alternativa: defina a variável de ambiente `GITHUB_PERSONAL_ACCESS_TOKEN` no seu sistema e substitua o valor por `"${env:GITHUB_PERSONAL_ACCESS_TOKEN}"` se o Cursor suportar expansão.

## Vercel MCP

1. Gere um token na Vercel:
   ```bash
   npx vercel tokens create
   ```
2. Substitua `<SEU_TOKEN_VERCEL>` em `.cursor/mcp.json` pelo token real.
3. Alternativa: defina a variável de ambiente `VERCEL_TOKEN` no seu sistema.

## Web Search e Puppeteer

Não requerem autenticação. São baixados via `npx` sob demanda.

## Segurança

- **Nunca commitar** tokens reais no repositório.
- O arquivo `.cursor/mcp.json` está no `.gitignore`? Se não estiver, adicione ou mantenha os placeholders em commits.
- Prefira variáveis de ambiente sempre que possível.
