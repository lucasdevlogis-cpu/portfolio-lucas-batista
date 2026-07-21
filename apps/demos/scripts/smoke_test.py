"""Smoke test das demos com isolamento de processo por checagem.

Cada page roda em um subprocesso próprio. Isso evita que estado nativo de
PyArrow/NumPy/Streamlit se acumule entre AppTests e, em caso de crash, informa
qual demo provocou a falha.
"""

import argparse
import logging
import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
THIS_FILE = Path(__file__).resolve()
sys.path.insert(0, str(ROOT))

SCRIPTS = [ROOT / "app.py"] + sorted(
    page for page in (ROOT / "pages").glob("*.py") if page.name != "home.py"
)


def run_script(script: Path) -> int:
    """Executa uma aplicação Streamlit isolada e retorna seu código de saída."""
    from streamlit.testing.v1 import AppTest

    logging.disable(logging.WARNING)
    try:
        at = AppTest.from_file(str(script), default_timeout=60)
        at.run()
        if at.exception:
            print(f"[FALHA] {script.name}: {at.exception}", flush=True)
            return 1
        print(f"[OK]    {script.name}", flush=True)
        return 0
    except Exception as exc:  # noqa: BLE001
        print(f"[ERRO]  {script.name}: {exc}", flush=True)
        return 1


def run_torre_filtro_vazio() -> int:
    """Valida o domínio da page 02 sem um segundo rerender do AppTest."""
    import pandas as pd
    from domain.control_tower import filter_deliveries, summarize_deliveries

    try:
        deliveries = pd.read_csv(ROOT / "data" / "generated" / "torre_entregas.csv")
        filtered = filter_deliveries(
            deliveries,
            carriers=[],
            regions=deliveries["regiao"].unique(),
        )
        summary = summarize_deliveries(filtered)
        if not filtered.empty or summary.critical or summary.at_risk:
            print("[FALHA] 02 filtro vazio: carteira ou KPIs não zeraram", flush=True)
            return 1
        print("[OK]    02 filtro vazio (multiselect vazio não quebra)", flush=True)
        return 0
    except Exception as exc:  # noqa: BLE001
        print(f"[ERRO]  02 filtro vazio: {exc}", flush=True)
        return 1


def run_worker(kind: str, target: Path) -> int:
    if kind == "script":
        return run_script(target)
    return run_torre_filtro_vazio()


def output_tail(value: str, limit: int = 12) -> str:
    return "\n".join(value.strip().splitlines()[-limit:])


def run_coordinator() -> int:
    checks = [("script", script) for script in SCRIPTS]
    checks.append(("torre-empty", ROOT / "pages" / "mini_torre_controle.py"))
    failures = 0

    child_env = os.environ.copy()
    child_env["PYTHONFAULTHANDLER"] = "1"
    child_env["PYTHONUNBUFFERED"] = "1"
    child_env["PYTHONUTF8"] = "1"

    for kind, target in checks:
        command = [
            sys.executable,
            str(THIS_FILE),
            "--worker",
            kind,
            "--target",
            str(target),
        ]
        try:
            completed = subprocess.run(
                command,
                cwd=ROOT,
                env=child_env,
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
                timeout=90,
                check=False,
            )
        except subprocess.TimeoutExpired:
            failures += 1
            print(f"[ERRO]  {target.name}: timeout após 90s", flush=True)
            continue

        if completed.returncode == 0:
            print(completed.stdout.strip(), flush=True)
            continue

        failures += 1
        label = "02 filtro vazio" if kind == "torre-empty" else target.name
        print(
            f"[ERRO]  {label}: subprocesso encerrou com código {completed.returncode}",
            flush=True,
        )
        if completed.stdout.strip():
            print(output_tail(completed.stdout), flush=True)
        if completed.stderr.strip():
            print(output_tail(completed.stderr), file=sys.stderr, flush=True)

    total = len(checks)
    print(f"\n{total - failures}/{total} checagens OK", flush=True)
    return 1 if failures else 0


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--worker", choices=("script", "torre-empty"))
    parser.add_argument("--target", type=Path)
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()
    if args.worker:
        if args.target is None:
            raise SystemExit("--target é obrigatório no modo worker")
        raise SystemExit(run_worker(args.worker, args.target.resolve()))
    raise SystemExit(run_coordinator())
