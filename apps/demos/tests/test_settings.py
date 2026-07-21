"""Garante a separação entre dados brutos, gerados e contratos."""

from settings import DEMO_CATALOG_PATH, DEMO_SNAPSHOT_DIR, GENERATED_DATA_DIR, RAW_DATA_DIR


def test_data_directories_are_separate() -> None:
    assert RAW_DATA_DIR.is_dir()
    assert GENERATED_DATA_DIR.is_dir()
    assert RAW_DATA_DIR.parent == GENERATED_DATA_DIR.parent
    assert RAW_DATA_DIR != GENERATED_DATA_DIR


def test_shared_contracts_exist() -> None:
    assert DEMO_CATALOG_PATH.is_file()
    assert DEMO_SNAPSHOT_DIR.is_dir()
