# Operação e deploy

## Setup

```powershell
npm ci
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements-dev.txt
Copy-Item .env.example .env.local
```

Variáveis obrigatórias na Vercel, em Production, Preview e Development:

```env
NEXT_PUBLIC_SITE_URL=https://portfolio-lucas-batista-murex.vercel.app
NEXT_PUBLIC_DEMOS_BASE_URL=https://portfolio-lucas-batista-asbsqusjhhbyje6pktjpvw.streamlit.app
```

## Desenvolvimento

Em terminais separados:

```powershell
npm run dev
```

```powershell
streamlit run apps/demos/app.py
```

Para simular o embed, abra uma page Streamlit com `?embed=true`.

## Rotina de alteração

Tokens:

```powershell
npm run tokens:sync
```

Dados ou cálculo Python:

```powershell
npm run demos:build
npm run demos:export
npm run demos:smoke
```

Conteúdo editorial:

```powershell
npm run cv:generate
```

Gate completo:

```powershell
npm run verify:full
```

`verify:full` cobre código, contratos, build, smoke, E2E e auditoria npm. Para
uma mudança visual, execute também os dois QAs de navegador e o Lighthouse.

## Vercel

Configuração esperada:

- repositório: `lucasdevlogis-cpu/portfolio-lucas-batista`;
- root directory: vazio;
- framework preset: Next.js;
- build command: vazio, usa `npm run build`;
- output directory: vazio, usa `.next/`;
- install command: vazio, usa `npm install`;
- Node.js: 24.x.

Não criar `vercel.json`, não definir `output: "export"` e não apontar output
para `dist`.

## Streamlit Community Cloud

Configuração-alvo:

- repositório: `lucasdevlogis-cpu/portfolio-lucas-batista`;
- branch: `main`;
- main file path: `apps/demos/app.py`;
- Python compatível com os pins de `apps/demos/requirements.txt`.

O arquivo de requirements fica ao lado do entrypoint. A configuração visual
fica em `.streamlit/config.toml` na raiz, pois o serviço executa a aplicação a
partir da raiz do repositório.

O Community Cloud identifica cada app por repositório, branch e entrypoint e
não permite editar essas coordenadas. Por isso, a origem canônica foi publicada
como uma nova aplicação.

Estado do corte, sem indisponibilidade:

1. [x] criar a nova app com as coordenadas canônicas;
2. [x] executar `npm run qa:streamlit` na nova URL;
3. [x] atualizar `NEXT_PUBLIC_DEMOS_BASE_URL` nos três ambientes da Vercel e
       redeployar a landing;
4. [x] validar modal, embed e abertura em nova aba;
5. [ ] somente depois remover a app legada.

Se preservar exatamente o subdomínio atual for obrigatório, remova a app antiga
e redeploye pedindo o mesmo custom subdomain. Esse caminho implica uma janela de
indisponibilidade e depende de o nome voltar a ficar disponível. Não copie
arquivos entre clones e não mantenha dois históricos de código ativos.

Referências oficiais:

- [File organization](https://docs.streamlit.io/deploy/streamlit-community-cloud/deploy-your-app/file-organization)
- [Deploy an app](https://docs.streamlit.io/deploy/streamlit-community-cloud/deploy-your-app/deploy)
- [Rename or change GitHub coordinates](https://docs.streamlit.io/deploy/streamlit-community-cloud/manage-your-app/rename-your-app)
- [`st.navigation`](https://docs.streamlit.io/develop/api-reference/navigation/st.navigation)

## QA local de produção

O Playwright sobe o build automaticamente. Para QA visual e Lighthouse, suba o
servidor manualmente:

```powershell
npm run build
npm run start
```

Em outro terminal:

```powershell
npm run qa:visual
npm run lighthouse:all
```

Saídas ficam em `.artifacts/`, inclusive relatório e traces do Playwright.

Com o Streamlit ativo em `http://localhost:8501`, capture todas as pages em
desktop e as 7 complementares em embed mobile:

```powershell
npm run qa:streamlit
```

Os scripts substituem suas próprias capturas a cada rodada para impedir falso
aceite com artefato antigo.

## QA pós-deploy

Os mesmos scripts aceitam URLs públicas por variável de ambiente:

```powershell
$env:QA_BASE_URL='https://portfolio-lucas-batista-murex.vercel.app'
npm run qa:visual

$env:LIGHTHOUSE_URL=$env:QA_BASE_URL
$env:LIGHTHOUSE_SCOPE='production'
npm run lighthouse:all

$env:STREAMLIT_QA_BASE_URL='https://portfolio-lucas-batista-asbsqusjhhbyje6pktjpvw.streamlit.app'
npm run qa:streamlit
```

O QA Streamlit suporta tanto execução direta local quanto o wrapper com iframe
usado pelo Community Cloud.

Em URLs públicas, o Lighthouse executa três rodadas por modo e aplica o gate à
mediana, preservando os JSON individuais em `.artifacts/lighthouse/runs/`. Em
localhost, a execução padrão é única. Use `LIGHTHOUSE_RUNS` entre 1 e 5 apenas
quando precisar controlar explicitamente a amostragem.

## Checklist pós-deploy

- homepage, `robots.txt`, `sitemap.xml`, OG image e CV respondem;
- nav, foco, menu mobile, ESC e voltar ao topo funcionam;
- 3 âncoras abrem no modal e diretamente em `/provas/{slug}`;
- 7 complementares abrem no iframe e em nova aba;
- `?embed=true` remove navegação Streamlit e mantém a prova utilizável;
- URLs de LinkedIn, email, GitHub e CV estão corretas;
- Lighthouse mobile não fica abaixo de 90 em nenhuma categoria;
- não há erro no console ou request 4xx/5xx próprio.

## Troubleshooting

| Sintoma                        | Verificação                                          |
| ------------------------------ | ---------------------------------------------------- |
| Demo sem URL                   | conferir `NEXT_PUBLIC_DEMOS_BASE_URL` no build       |
| Slug quebrado                  | rodar `npm run validate` e revisar o catálogo        |
| Token divergente               | rodar `npm run tokens:sync`                          |
| Snapshot divergente            | rodar `npm run demos:build` e `npm run demos:export` |
| Streamlit não encontra arquivo | confirmar main file `apps/demos/app.py` e branch     |
| Vercel procura `dist`          | limpar Output Directory e remover overrides          |
| CV desatualizado               | rodar `npm run cv:generate`                          |
