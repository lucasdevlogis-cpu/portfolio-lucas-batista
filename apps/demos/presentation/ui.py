"""Primitivos de apresentação compartilhados pelas demos Streamlit."""

from __future__ import annotations

import re
from collections.abc import Iterator, Sequence
from contextlib import contextmanager
from html import escape
from pathlib import Path
from typing import Any
from urllib.parse import parse_qs, urlparse

import pandas as pd
import streamlit as st
from settings import GENERATED_DATA_DIR

from presentation import tokens
from presentation.charts import apply_theme, polish

THEME_PATH = Path(__file__).with_name("theme.css")


def is_embed() -> bool:
    """Indica quando a demo está dentro do modal da landing."""

    def truthy(value: object) -> bool:
        if isinstance(value, (list, tuple)):
            return any(truthy(item) for item in value)
        return str(value).lower() in {"1", "true", "yes", "on"}

    try:
        if truthy(st.query_params.get("embed")):
            return True
    except Exception:  # noqa: BLE001 - contexto reduzido no AppTest
        pass

    try:
        if bool(getattr(st.context, "is_embedded", False)):
            return True
        url = getattr(st.context, "url", "") or ""
        return truthy(parse_qs(urlparse(url).query).get("embed"))
    except Exception:  # noqa: BLE001 - contexto indisponível fora do runner
        return False


def configure_app() -> None:
    """Configura o entrypoint uma única vez antes de criar a navegação."""
    st.set_page_config(
        page_title="Demos de logística | Lucas Batista",
        page_icon="🚚",
        layout="wide",
        initial_sidebar_state="collapsed" if is_embed() else "expanded",
    )
    page_setup("Demos de logística")


def page_setup(_title: str, icon: str | None = None) -> None:
    """Aplica o tema; o título da rota é controlado por ``st.Page``."""
    del icon
    apply_theme()
    _inject_css(embed=is_embed())


def map_height(default: int) -> int:
    return min(default, tokens.MAP_EMBED_HEIGHT) if is_embed() else default


def chart_height(default: int) -> int:
    if not is_embed():
        return default
    if default >= tokens.CHART_FULL_HEIGHT:
        return tokens.CHART_FULL_EMBED_HEIGHT
    return min(default, tokens.CHART_HALF_EMBED_HEIGHT)


@st.cache_data(show_spinner=False)
def load_csv(filename: str, **read_kwargs: Any) -> pd.DataFrame:
    """Carrega um dataset gerado e explica como reconstruí-lo quando ausente."""
    path = GENERATED_DATA_DIR / filename
    read_kwargs.setdefault("encoding", "utf-8")
    try:
        return pd.read_csv(path, **read_kwargs)
    except FileNotFoundError:
        st.error(
            f"Dataset `{filename}` não encontrado. Gere os dados com:\n\n"
            "```bash\npython apps/demos/scripts/build_datasets.py\n```"
        )
        st.stop()


def _inject_css(embed: bool) -> None:
    stylesheet = THEME_PATH.read_text(encoding="utf-8")
    variables = f"""
    :root {{
      --demo-background: {tokens.BACKGROUND};
      --demo-card: {tokens.CARD};
      --demo-ink: {tokens.INK};
      --demo-muted: {tokens.MUTED_FOREGROUND};
      --demo-border: {tokens.BORDER};
      --demo-primary: {tokens.PRIMARY};
      --demo-accent: {tokens.ACCENT};
      --demo-accent-dark: {tokens.ACCENT_DARK};
      --demo-warm: {tokens.WARM_ACCENT};
      --demo-success: {tokens.SUCCESS};
      --demo-warning: {tokens.WARNING};
      --demo-danger: {tokens.DANGER};
      --demo-dark: {tokens.SURFACE_DARK};
      --demo-dark-muted: {tokens.TEXT_ON_DARK_MUTED};
      --demo-dark-accent: {tokens.TEXT_ON_DARK_ACCENT};
      --demo-body: {tokens.FONT_FAMILY};
      --demo-heading: {tokens.HEADING_FONT_FAMILY};
    }}
    """
    embed_rules = (
        """
    header[data-testid="stHeader"],
    section[data-testid="stSidebar"],
    div[data-testid="stSidebarCollapsedControl"] { display: none !important; }
    div[data-testid="stMainBlockContainer"] {
      max-width: 1040px;
      padding-top: .75rem !important;
      padding-bottom: 1rem !important;
    }
    """
        if embed
        else ""
    )
    st.markdown(
        f"<style>{variables}\n{stylesheet}\n{embed_rules}</style>",
        unsafe_allow_html=True,
    )


@contextmanager
def filter_container(label: str = "Filtros") -> Iterator[None]:
    """Mantém parâmetros na lateral e prioriza leitura no modo embed."""
    with st.sidebar:
        st.caption(label.upper())
        yield


def breadcrumb(texto: str) -> None:
    plain_text = re.sub(r"<[^>]+>", "", texto)
    st.markdown(
        f"<p class='demo-breadcrumb'>{escape(plain_text)}</p>",
        unsafe_allow_html=True,
    )


def nav_link(path: str, label: str, icon: str | None = None) -> None:
    try:
        st.page_link(path, label=label, icon=icon)
    except Exception:  # noqa: BLE001 - fallback para execução isolada no AppTest
        st.caption(label)


def plot(fig: Any, **kwargs: Any) -> None:
    kwargs.setdefault("width", "stretch")
    kwargs.setdefault("config", {"displayModeBar": False, "responsive": True})
    st.plotly_chart(polish(fig), **kwargs)


def section(titulo: str, descricao: str | None = None) -> None:
    description = (
        f"<p class='demo-section-description'>{escape(descricao)}</p>" if descricao else ""
    )
    st.markdown(
        f"<header class='demo-section-header'><h2>{escape(titulo)}</h2>{description}</header>",
        unsafe_allow_html=True,
    )


def hero(
    title: str,
    pergunta: str,
    frameworks: Sequence[str] | None = None,
    selo: str | None = None,
    metric: dict[str, Any] | None = None,
) -> None:
    """Primeira dobra editorial: pergunta, método e uma evidência principal."""
    tags = "".join(
        f"<span class='demo-tag'>{escape(str(framework))}</span>"
        for framework in (frameworks or [])[:4]
    )
    maturity = f"<p class='demo-maturity'>{escape(selo)}</p>" if selo else ""
    metric_html = ""
    if metric:
        delta = metric.get("delta") or metric.get("help")
        metric_html = (
            "<aside class='demo-hero-metric'>"
            f"<span>{escape(str(metric['label']))}</span>"
            f"<strong>{escape(str(metric['value']))}</strong>"
            + (f"<p>{escape(str(delta))}</p>" if delta else "")
            + "</aside>"
        )
    st.markdown(
        f"""
        <section class="demo-hero">
          <div class="demo-hero-copy">
            <div class="demo-tags">{tags}</div>
            <h1>{escape(title)}</h1>
            <p class="demo-question"><span>Pergunta de negócio</span>{escape(pergunta)}</p>
            {maturity}
          </div>
          {metric_html}
        </section>
        """,
        unsafe_allow_html=True,
    )


def kpi_grid(items: list[dict[str, Any]], columns: int | None = None) -> None:
    if not items:
        return
    column_count = columns or (2 if is_embed() and len(items) > 2 else len(items))
    column_count = max(1, min(column_count, len(items)))
    for start in range(0, len(items), column_count):
        cols = st.columns(column_count)
        for offset, item in enumerate(items[start : start + column_count]):
            with cols[offset]:
                kpi_metric(item["label"], item["value"], item.get("severity"))


def kpi_metric(label: str, value: str, severity: str | None = None) -> None:
    tone = severity if severity in {"success", "warning", "danger"} else "neutral"
    st.markdown(
        f"<article class='demo-kpi demo-kpi--{tone}'>"
        f"<span>{escape(label)}</span><strong>{escape(value)}</strong></article>",
        unsafe_allow_html=True,
    )


def insight(texto: str, rotulo: str = "Nota") -> None:
    with st.container(border=True):
        st.caption(rotulo.upper())
        st.markdown(texto)


def progress_bar(label: str, valor: float, maximo: float = 100.0, cor: str | None = None) -> None:
    del cor
    progress = max(0.0, min(1.0, float(valor) / float(maximo))) if maximo else 0.0
    st.progress(progress, text=f"{label}: {valor:.1f}%")


def download_csv_button(
    df: pd.DataFrame, filename: str, label: str = "Baixar resultado (CSV)"
) -> None:
    st.download_button(
        label,
        df.to_csv(index=False).encode("utf-8"),
        file_name=filename,
        mime="text/csv",
    )


def method_expander(markdown: str, titulo: str = "Como funciona?") -> None:
    with st.expander(titulo):
        st.markdown(markdown)


def provenance_expander(
    fonte: str,
    tipo: str,
    producao: str,
    limitacoes: str,
    titulo: str = "Dados, limitações e proveniência",
) -> None:
    with st.expander(titulo):
        st.markdown(
            f"- **Fonte da amostra:** {fonte}\n"
            f"- **Tipo de dado:** {tipo}\n"
            f"- **Método de produção:** {producao}\n"
            f"- **Limitações:** {limitacoes}"
        )


def demo_cta(next_demo_path: str | None = None, next_label: str = "Ver próxima demo") -> None:
    with st.container(border=True):
        st.markdown("#### Próximos passos")
        st.caption(
            "Baixe o resultado quando disponível, avance para outra análise "
            "ou converse sobre a aplicação em uma operação real."
        )
        first, second = st.columns(2)
        with first:
            if next_demo_path:
                nav_link(next_demo_path, next_label)
        with second:
            st.link_button(
                "Contato profissional",
                "https://portfolio-lucas-batista-murex.vercel.app#contato",
                width="stretch",
            )


def footer() -> None:
    st.divider()
    st.caption(
        "Lucas Batista · Operações, dados e inteligência logística · "
        "Resultados demonstrativos, não métricas de operação real."
    )
