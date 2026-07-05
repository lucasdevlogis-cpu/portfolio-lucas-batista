"""Valida que os slugs de URL esperados pela landing existem como pages.

Espelha a regra do Streamlit: arquivo `pages/NN_{slug}.py` vira a URL `/{slug}`.
A lista de slugs esperados fica em `EXPECTED_SLUGS` (espelho de `CASE_DEMO_SLUGS`
em `data/content.ts`). Falha com código 1 se algum slug não tiver page.
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGES_DIR = ROOT / "pages"

# Espelho de CASE_DEMO_SLUGS (data/content.ts). Mantenha em sincronia.
EXPECTED_SLUGS = [
    "precificacao_frete",
    "mini_torre_controle",
    "promessa_cep",
    "ship_from_store",
    "auditoria_endereco",
    "classificador_ocorrencias",
    "cvrp_urbano",
    "vrptw_ultima_milha",
    "rede_interhubs",
    "tsp_baseline_sp",
]


def slug_from_file(name: str) -> str:
    """`08_ship_from_store.py` -> `ship_from_store` (remove prefixo NN_ e .py)."""
    return re.sub(r"^\d+_", "", name[:-3])


def main() -> int:
    if not PAGES_DIR.is_dir():
        print(f"[ERRO] Diretório de pages não encontrado: {PAGES_DIR}")
        return 1

    available = {slug_from_file(p.name) for p in PAGES_DIR.glob("*.py")}
    missing = [s for s in EXPECTED_SLUGS if s not in available]

    for slug in missing:
        print(f"[FALHA] slug '{slug}' esperado pela landing não tem page correspondente.")

    if missing:
        print(f"\n{len(EXPECTED_SLUGS) - len(missing)}/{len(EXPECTED_SLUGS)} slugs OK")
        return 1

    print(f"{len(EXPECTED_SLUGS)}/{len(EXPECTED_SLUGS)} slugs OK")
    return 0


if __name__ == "__main__":
    sys.exit(main())
