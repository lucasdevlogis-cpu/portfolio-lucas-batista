"""Catálogo compartilhado entre a landing Next.js e o app Streamlit."""

from __future__ import annotations

import json
from dataclasses import dataclass

from settings import DEMO_CATALOG_PATH


@dataclass(frozen=True)
class DemoEntry:
    case_id: str
    slug: str | None
    page: str | None
    title: str
    tier: str
    published: bool


def load_catalog() -> tuple[DemoEntry, ...]:
    payload = json.loads(DEMO_CATALOG_PATH.read_text(encoding="utf-8"))
    return tuple(
        DemoEntry(
            case_id=item["caseId"],
            slug=item["slug"],
            page=item["page"],
            title=item["title"],
            tier=item["tier"],
            published=item["published"],
        )
        for item in payload["entries"]
    )


DEMO_CATALOG = load_catalog()
PUBLISHED_DEMOS = tuple(entry for entry in DEMO_CATALOG if entry.published)
