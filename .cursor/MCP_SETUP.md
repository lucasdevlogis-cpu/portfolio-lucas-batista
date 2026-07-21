# MCPs locais do Cursor

`.cursor/mcp.json` é configuração exclusiva da máquina e está ignorado pelo
Git. Ele pode referenciar integrações locais, mas nunca deve conter uma segunda
descrição da arquitetura do projeto.

## Credenciais

- Guarde tokens em variáveis de ambiente, não em arquivos versionados.
- Use `GITHUB_PERSONAL_ACCESS_TOKEN` e `VERCEL_TOKEN` apenas quando a integração
  correspondente estiver habilitada.
- Conceda somente os escopos necessários para a tarefa atual.
- Nunca copie o conteúdo de `.cursor/mcp.json`, `.env.local` ou arquivos de
  autenticação para logs, issues ou commits.

No PowerShell, defina uma variável apenas para a sessão atual com:

```powershell
$env:NOME_DA_VARIAVEL = "valor"
```

O arquivo local pode usar a sintaxe de expansão de ambiente suportada pelo
servidor MCP configurado. Consulte a documentação do conector antes de alterar
o formato.

## Operação

- Teste primeiro ações somente leitura.
- Push, deploy e alterações em serviços externos exigem autorização explícita.
- Se um MCP não estiver configurado, use a CLI ou o fluxo local documentado em
  `docs/OPERACAO.md`; não versione credenciais para contornar a ausência.
