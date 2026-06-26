# Demos Logística — Streamlit Cloud

Demos interativas embedadas no portfólio Lucas Batista via iframe (`?embed=true`).

## Pages

| Slug | Case P0/P2 |
|------|------------|
| `01_precificacao_frete` | Simulador de Custo de Frete |
| `02_mini_torre_controle` | Mini Torre de Controle |
| `03_cvrp_urbano` | Roteirização urbana (extra) |
| `04_promessa_cep` | Promessa por CEP |
| `07_classificador_ocorrencias` | Classificador de Ocorrências |

## Rodar localmente

```bash
cd demos-logistica
pip install -r requirements.txt
python scripts/generate_data.py
streamlit run app.py
```

Abra <http://localhost:8501>

## Deploy Streamlit Cloud (prompt 3.5)

1. Crie repo GitHub `demos-logistica` (pode ser subpasta deste monorepo ou repo dedicado).
2. **Main file:** `app.py`
3. Conecte em [share.streamlit.io](https://share.streamlit.io)
4. Copie a URL (ex: `https://demos-logistica-xxx.streamlit.app`)
5. Na raiz do portfólio Next.js, crie `.env.local`:

```env
NEXT_PUBLIC_DEMOS_BASE_URL=https://demos-logistica-xxx.streamlit.app
```

1. Rebuild: `npm run build`

## Embed na landing

```
https://SUA-URL.streamlit.app/01_precificacao_frete?embed=true
```

O componente `DemoModal` adiciona `?embed=true` automaticamente.

## Dados

CSVs sintéticos em `data/`. Regenerar:

```bash
python scripts/generate_data.py
```

**Limitação:** todos os resultados são demonstrativos.
