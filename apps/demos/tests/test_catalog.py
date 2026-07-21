"""Invariantes do catálogo compartilhado de demos."""

from catalog import DEMO_CATALOG, PUBLISHED_DEMOS
from settings import APP_DIR


def test_catalog_has_unique_case_ids_and_slugs() -> None:
    case_ids = [entry.case_id for entry in DEMO_CATALOG]
    slugs = [entry.slug for entry in PUBLISHED_DEMOS]

    assert len(case_ids) == len(set(case_ids))
    assert len(slugs) == len(set(slugs))


def test_every_published_demo_has_a_page() -> None:
    assert len(PUBLISHED_DEMOS) == 10
    for entry in PUBLISHED_DEMOS:
        assert entry.slug
        assert entry.page
        assert (APP_DIR / entry.page).is_file()


def test_catalog_has_three_anchor_demos() -> None:
    anchors = [entry for entry in PUBLISHED_DEMOS if entry.tier == "anchor"]
    assert [entry.case_id for entry in anchors] == [
        "01-precificacao-frete",
        "02-torre-controle",
        "08-cvrp-urbano",
    ]
