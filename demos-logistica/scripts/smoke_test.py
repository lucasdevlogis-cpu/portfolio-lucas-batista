"""Smoke test: executa app.py e cada page via AppTest e reporta exceções."""

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

print(f"\n{len(scripts) - falhas}/{len(scripts)} pages OK")
sys.exit(1 if falhas else 0)
