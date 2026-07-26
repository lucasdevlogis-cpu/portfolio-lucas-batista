"""Triagem explicável de ocorrências com revisão humana obrigatória.

As regras somente sugerem categoria, prioridade e fila. Nenhuma ação crítica é
executada e a amostra curada é usada para verificar coerência interna, não
generalização estatística.
"""

from __future__ import annotations

import re
import unicodedata
from collections.abc import Iterable
from dataclasses import dataclass
from pathlib import Path

import pandas as pd

REQUIRED_COLUMNS = {"texto", "categoria", "prioridade"}


@dataclass(frozen=True)
class Rule:
    category: str
    priority: str
    terms: tuple[str, ...]
    queue: str


@dataclass(frozen=True)
class Classification:
    text: str
    normalized_text: str
    suggested_category: str
    suggested_priority: str
    suggested_queue: str
    matched_keywords: tuple[str, ...]
    match_count: int
    candidates: tuple[str, ...]
    ambiguous: bool
    review_required: bool
    review_reasons: tuple[str, ...]


@dataclass(frozen=True)
class ClassifiedOccurrence:
    text: str
    labeled_category: str
    labeled_priority: str
    classification: Classification


@dataclass(frozen=True)
class OccurrenceAnalysis:
    occurrences: tuple[ClassifiedOccurrence, ...]

    @property
    def unique_text_count(self) -> int:
        return len({item.classification.normalized_text for item in self.occurrences})

    @property
    def category_agreement_count(self) -> int:
        return sum(
            item.labeled_category == item.classification.suggested_category
            for item in self.occurrences
        )

    @property
    def priority_agreement_count(self) -> int:
        return sum(
            normalize_label(item.labeled_priority)
            == normalize_label(item.classification.suggested_priority)
            for item in self.occurrences
        )

    @property
    def automated_decision_count(self) -> int:
        return 0

    def category_counts(self) -> dict[str, int]:
        counts: dict[str, int] = {}
        for item in self.occurrences:
            category = item.classification.suggested_category
            counts[category] = counts.get(category, 0) + 1
        return counts

    def labeled_priority_counts(self) -> dict[str, int]:
        return _priority_counts(item.labeled_priority for item in self.occurrences)

    def suggested_priority_counts(self) -> dict[str, int]:
        return _priority_counts(item.classification.suggested_priority for item in self.occurrences)


RULES = (
    Rule(
        "Atraso",
        "Alta",
        (
            "atraso",
            "transito",
            "demora",
            "marginal",
            "congestionamento",
            "aguardando liberacao",
            "liberacao",
        ),
        "Acompanhar prazo e acionar a transportadora",
    ),
    Rule(
        "Endereco Incorreto",
        "Alta",
        ("endereco", "numero", "cep", "incompleto", "divergente"),
        "Validar cadastro antes de nova tentativa",
    ),
    Rule(
        "Cliente Ausente",
        "Média",
        ("cliente ausente", "ausente", "nao atende", "fechado", "tentativa", "interfone"),
        "Revisar contato e janela de reentrega",
    ),
    Rule(
        "Avaria",
        "Alta",
        ("avaria", "avariada", "danificado", "embalagem", "quebrado", "molhado"),
        "Solicitar evidência e encaminhar para análise",
    ),
    Rule(
        "Devolucao",
        "Média",
        ("devolucao", "retorno", "devolver"),
        "Encaminhar para revisão do fluxo reverso",
    ),
    Rule(
        "Recusa",
        "Média",
        ("recusa", "recusou", "nao aceitou"),
        "Revisar motivo e instrução do embarcador",
    ),
)

NO_MATCH_CATEGORY = "Outros"
NO_MATCH_PRIORITY = "Baixa"
NO_MATCH_QUEUE = "Triagem manual"
AMBIGUOUS_CATEGORY = "Revisão manual"
AMBIGUOUS_PRIORITY = "Média"
PRIORITY_ORDER = ("Alta", "Média", "Baixa")


def normalize_text(value: object) -> str:
    """Normaliza NFKD, remove diacríticos e aplica casefold."""
    decomposed = unicodedata.normalize("NFKD", str(value))
    without_marks = "".join(char for char in decomposed if not unicodedata.combining(char))
    return " ".join(without_marks.casefold().split())


def normalize_label(value: object) -> str:
    return normalize_text(value)


def _term_pattern(term: str) -> re.Pattern[str]:
    normalized = normalize_text(term)
    body = r"\s+".join(re.escape(part) for part in normalized.split())
    return re.compile(rf"(?<!\w){body}(?!\w)")


TERM_PATTERNS = {
    rule.category: tuple((term, _term_pattern(term)) for term in rule.terms) for rule in RULES
}


def classify_text(text: str) -> Classification:
    original = str(text).strip()
    if not original:
        raise ValueError("texto da ocorrência não pode ser vazio")
    normalized = normalize_text(original)
    matches_by_category: dict[str, tuple[str, ...]] = {}
    for rule in RULES:
        matched = tuple(
            term for term, pattern in TERM_PATTERNS[rule.category] if pattern.search(normalized)
        )
        if matched:
            matches_by_category[rule.category] = matched

    max_hits = max((len(terms) for terms in matches_by_category.values()), default=0)
    candidates = tuple(
        rule.category
        for rule in RULES
        if len(matches_by_category.get(rule.category, ())) == max_hits and max_hits > 0
    )
    ambiguous = len(candidates) > 1
    chosen = (
        next((rule for rule in RULES if rule.category == candidates[0]), None)
        if len(candidates) == 1
        else None
    )
    if ambiguous:
        category = AMBIGUOUS_CATEGORY
        priority = AMBIGUOUS_PRIORITY
        queue = NO_MATCH_QUEUE
        matched_keywords = tuple(
            term for candidate in candidates for term in matches_by_category[candidate]
        )
    elif chosen is None:
        category = NO_MATCH_CATEGORY
        priority = NO_MATCH_PRIORITY
        queue = NO_MATCH_QUEUE
        matched_keywords: tuple[str, ...] = ()
    else:
        category = chosen.category
        priority = chosen.priority
        queue = chosen.queue
        matched_keywords = matches_by_category[chosen.category]

    reasons: list[str] = []
    if not candidates:
        reasons.append("nenhum termo")
    if ambiguous:
        reasons.append("empate")
    if priority == "Alta":
        reasons.append("prioridade alta")

    return Classification(
        text=original,
        normalized_text=normalized,
        suggested_category=category,
        suggested_priority=priority,
        suggested_queue=queue,
        matched_keywords=matched_keywords,
        match_count=len(matched_keywords),
        candidates=candidates,
        ambiguous=ambiguous,
        review_required=bool(reasons),
        review_reasons=tuple(reasons),
    )


def _priority_counts(values: Iterable[object]) -> dict[str, int]:
    counts = {priority: 0 for priority in PRIORITY_ORDER}
    for value in values:
        normalized = normalize_label(value)
        label = next(
            (priority for priority in PRIORITY_ORDER if normalize_label(priority) == normalized),
            None,
        )
        if label is None:
            raise ValueError(f"prioridade inválida: {value}")
        counts[label] += 1
    return counts


def analyze_dataframe(df: pd.DataFrame) -> OccurrenceAnalysis:
    missing = sorted(REQUIRED_COLUMNS.difference(df.columns))
    if missing:
        raise ValueError(f"colunas obrigatórias ausentes: {', '.join(missing)}")
    if df.empty:
        raise ValueError("a amostra de ocorrências não pode ser vazia")

    occurrences: list[ClassifiedOccurrence] = []
    for row in df.to_dict("records"):
        labeled_category = str(row["categoria"]).strip()
        labeled_priority = str(row["prioridade"]).strip()
        if not labeled_category or not labeled_priority:
            raise ValueError("categoria e prioridade rotuladas são obrigatórias")
        if normalize_label(labeled_priority) not in {
            normalize_label(priority) for priority in PRIORITY_ORDER
        }:
            raise ValueError(f"prioridade inválida: {labeled_priority}")
        occurrences.append(
            ClassifiedOccurrence(
                text=str(row["texto"]),
                labeled_category=labeled_category,
                labeled_priority=labeled_priority,
                classification=classify_text(str(row["texto"])),
            )
        )
    return OccurrenceAnalysis(tuple(occurrences))


def analyze_path(path: Path) -> OccurrenceAnalysis:
    return analyze_dataframe(pd.read_csv(path, encoding="utf-8"))
