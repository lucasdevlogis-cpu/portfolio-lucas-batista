"""Smoke test: executa app.py e cada page via AppTest e reporta exceções.

Além do happy-path, cobre um cenário de borda conhecido: filtro vazio na
Mini Torre de Controle (page 02), que já derrubou a demo em produção.
"""

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from streamlit.testing.v1 import AppTest  # noqa: E402

scripts = [ROOT / "app.py"] + sorted((ROOT / "pages").glob("*.py"))

falhas = 0
for script in scripts:
    try:
        at = AppTest.from_file(str(script), default_timeout=60)
        at.run()
        if at.exception:
            falhas += 1
            print(f"[FALHA] {script.name}: {at.exception}")
        else:
            print(f"[OK]    {script.name}")
    except Exception as exc:  # noqa: BLE001
        falhas += 1
        print(f"[ERRO]  {script.name}: {exc}")


def test_torre_filtro_vazio() -> bool:
    """Page 02 não pode quebrar quando todos os filtros ficam vazios."""
    page = ROOT / "pages" / "02_mini_torre_controle.py"
    try:
        at = AppTest.from_file(str(page), default_timeout=60)
        at.run()
        at.multiselect[0].set_value([]).run()
        if at.exception:
            print(f"[FALHA] 02 filtro vazio: {at.exception}")
            return False
        print("[OK]    02 filtro vazio (multiselect vazio não quebra)")
        return True
    except Exception as exc:  # noqa: BLE001
        print(f"[ERRO]  02 filtro vazio: {exc}")
        return False


if not test_torre_filtro_vazio():
    falhas += 1

total = len(scripts) + 1
print(f"\n{total - falhas}/{total} checagens OK")
sys.exit(1 if falhas else 0)
