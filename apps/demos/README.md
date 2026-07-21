# Demos de logística

Motor Python das provas exploratórias. O aplicativo pertence ao mesmo
repositório da landing; não existe etapa de cópia para outro clone.

## Estrutura

```text
apps/demos/
├── app.py                    entrypoint e navegação
├── catalog.py                catálogo compartilhado
├── settings.py               caminhos absolutos estáveis
├── domain/                   frete e roteirização
├── presentation/             UI, tema, charts, mapas e tabelas
├── pages/                    home, 10 provas e métodos
├── data/raw/                 amostras curadas
├── data/generated/           CSVs determinísticos
├── scripts/                  build, export e smoke
└── tests/                    testes de contrato e caminhos
```

## Rodar da raiz

```powershell
pip install -r requirements-dev.txt
npm run demos:build
streamlit run apps/demos/app.py
```

## Validar

```powershell
npm run lint:python
npm run demos:test
npm run demos:smoke
npm run demos:export
npm run demos:validate
```

O smoke deve terminar em 13/13. O exporter grava os 3 snapshots âncora em
`contracts/demo-snapshots/`.

## Publicação

Streamlit Community Cloud:

- repo: `lucasdevlogis-cpu/portfolio-lucas-batista`;
- branch: `main`;
- main file: `apps/demos/app.py`.

O requirements de produção é `apps/demos/requirements.txt`; ferramentas locais
ficam em `apps/demos/requirements-dev.txt`.

## Regras

- cálculo em `domain/`, não em helpers de UI;
- copy de cada prova em português;
- até 3 KPIs e uma pergunta de negócio explícita;
- usar `presentation/ui.py` e `theme.css`;
- não depender de seletor interno do Streamlit sem necessidade;
- dados reais, credenciais e APIs pagas obrigatórias são proibidos.
