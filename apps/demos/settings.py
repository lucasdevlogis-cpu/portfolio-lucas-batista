"""Caminhos estáveis do aplicativo Streamlit e do monorepo."""

from pathlib import Path

APP_DIR = Path(__file__).resolve().parent
REPO_ROOT = APP_DIR.parents[1]
DATA_ROOT = APP_DIR / "data"
RAW_DATA_DIR = DATA_ROOT / "raw"
GENERATED_DATA_DIR = DATA_ROOT / "generated"
DEMO_CATALOG_PATH = REPO_ROOT / "contracts" / "demo-catalog.json"
DEMO_SNAPSHOT_DIR = REPO_ROOT / "contracts" / "demo-snapshots"
