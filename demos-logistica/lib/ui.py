"""Componentes de UI reutilizáveis das demos (Streamlit)."""

from __future__ import annotations

from contextlib import contextmanager
from html import escape
from typing import Iterator, Sequence
from urllib.parse import parse_qs, urlparse

import pandas as pd
import streamlit as st

from lib import brand
from lib.viz import apply_theme, polish
from paths import DATA_DIR


def is_embed() -> bool:
    """True quando a page é carregada em iframe (`?embed=true`), como na landing."""
    def truthy(value: object) -> bool:
        if isinstance(value, (list, tuple)):
            return any(truthy(item) for item in value)
        return str(value).lower() in {"1", "true", "yes", "on"}

    try:
        if truthy(st.query_params.get("embed")):
            return True
    except Exception:  # noqa: BLE001 — fora de contexto (ex.: AppTest)
        pass

    try:
        if bool(getattr(st.context, "is_embedded", False)):
            return True
    except Exception:  # noqa: BLE001 — contexto indisponível em testes/headless
        pass

    try:
        url = getattr(st.context, "url", "") or ""
        return truthy(parse_qs(urlparse(url).query).get("embed"))
    except Exception:  # noqa: BLE001
        return False


def map_height(default: int) -> int:
    """Altura de mapa/gráfico reduzida no embed (iframe apertado no modal)."""
    return min(default, brand.MAP_EMBED_HEIGHT) if is_embed() else default


def chart_height(default: int) -> int:
    """Altura de gráfico reduzida no embed para caber no modal da landing."""
    if not is_embed():
        return default
    if default >= brand.CHART_FULL_HEIGHT:
        return brand.CHART_FULL_EMBED_HEIGHT
    return min(default, brand.CHART_HALF_EMBED_HEIGHT)


def page_setup(title: str, icon: str = "🚚") -> None:
    """Configura a página e aplica o tema visual da marca."""
    embed = is_embed()
    st.set_page_config(
        page_title=title,
        page_icon=icon,
        layout="wide",
        initial_sidebar_state="collapsed" if embed else "expanded",
    )
    apply_theme()
    _inject_css(embed)


def load_csv(filename: str, **read_kwargs) -> pd.DataFrame:
    """Lê um CSV de `data/` com mensagem amigável se o dataset não existir.

    Um clone novo do repo não tem os CSVs até rodar `build_datasets.py`; sem este
    guard, cada page quebraria com um traceback cru.
    """
    path = DATA_DIR / filename
    try:
        return pd.read_csv(path, **read_kwargs)
    except FileNotFoundError:
        st.error(
            f"Dataset `{filename}` não encontrado. Gere os dados com:\n\n"
            "```bash\npython scripts/build_datasets.py\n```"
        )
        st.stop()


def _inject_css(embed: bool = False) -> None:
    # No embed, escondemos o header do Streamlit e reduzimos o padding do topo
    # para o iframe do modal aproveitar melhor a área visível.
    embed_css = (
        """
          header[data-testid="stHeader"] { display:none; }
          section[data-testid="stSidebar"],
          div[data-testid="stSidebarCollapsedControl"],
          button[kind="header"] { display:none !important; }
          div[data-testid="stAppViewContainer"] { margin-left: 0 !important; }
          div[data-testid="stMainBlockContainer"],
          div[data-testid="stAppViewContainer"] > .main .block-container {
            padding-top: .75rem !important;
            padding-bottom: 1rem !important;
            max-width: 1000px;
          }
          .demo-hero { padding: 1rem; margin-bottom: .75rem; }
          .demo-hero-grid { grid-template-columns: 1fr; gap: .85rem; }
          .demo-hero-title { font-size: 1.55rem; }
          .demo-hero-question { font-size: .92rem; }
          .kpi-card { padding: 12px 14px; }
          .kpi-value { font-size: 1.28rem; }
        """
        if embed
        else ""
    )
    st.markdown(
        f"""
        <style>
          html, body, .stApp {{
            font-family: {brand.FONT_FAMILY};
            color: {brand.FOREGROUND};
            background: {brand.BACKGROUND};
          }}
          .stApp {{
            background:
              radial-gradient(720px 360px at 92% 0%, rgba(15, 118, 110, .11), transparent 58%),
              linear-gradient(180deg, {brand.EDITORIAL}, {brand.EDITORIAL_2});
          }}
          div[data-testid="stMainBlockContainer"],
          div[data-testid="stAppViewContainer"] > .main .block-container {{
            max-width: 1180px;
            padding-top: 1.65rem !important;
            padding-bottom: 2.2rem !important;
          }}
          section[data-testid="stSidebar"] {{
            background: {brand.CARD};
            border-right: 1px solid {brand.BORDER};
          }}
          section[data-testid="stSidebar"] div[data-testid="stSidebarNav"] {{
            display: none;
          }}
          section[data-testid="stSidebar"] a {{
            border-radius: 8px;
            color: {brand.INK};
            font-weight: 650;
          }}
          section[data-testid="stSidebar"] a:hover {{
            background: rgba(15,118,110,.08);
            color: {brand.PRIMARY};
          }}
          header[data-testid="stHeader"] {{
            background: rgba(246, 241, 232, .72);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid {brand.BORDER};
          }}
          .stApp h1, .stApp h2, .stApp h3 {{
            color: {brand.INK};
            letter-spacing: 0;
          }}
          .stApp h1 {{ font-weight: 800; }}
          .stApp h2, .stApp h3 {{ font-weight: 750; }}
          .stMarkdown p, .stCaption, div[data-testid="stCaptionContainer"] {{
            color: {brand.MUTED};
          }}
          div[data-testid="stMarkdownContainer"] a {{
            color: {brand.PRIMARY};
            font-weight: 650;
            text-underline-offset: 4px;
          }}
          div[data-testid="stVerticalBlockBorderWrapper"] {{
            border-color: {brand.BORDER} !important;
            border-radius: 14px !important;
            background: rgba(255, 253, 248, .72);
            box-shadow: 0 10px 30px rgba(17, 24, 39, .045);
          }}
          div[data-testid="stMetricValue"] {{
            color: {brand.INK};
            font-weight: 800;
            letter-spacing: 0;
          }}
          div[data-testid="stMetricLabel"] p {{
            color: {brand.MUTED};
            font-weight: 700;
          }}
          div[data-testid="stMetric"] {{
            background:{brand.CARD};
            border:1px solid {brand.BORDER};
            border-radius:14px;
            padding:14px 16px;
            box-shadow: 0 8px 24px rgba(17,24,39,.04);
          }}
          button[kind="primary"], .stButton > button {{
            border-radius: 8px !important;
            font-weight: 750 !important;
            min-height: 2.55rem;
            border: 1px solid {brand.BORDER} !important;
            background: {brand.CARD} !important;
            color: {brand.INK} !important;
            box-shadow: 0 8px 20px rgba(17,24,39,.04);
          }}
          button[kind="primary"]:hover, .stButton > button:hover {{
            border-color: rgba(15,118,110,.34) !important;
            color: {brand.PRIMARY} !important;
            background: rgba(255,253,248,.88) !important;
          }}
          .stDownloadButton > button {{
            border-radius: 8px !important;
            min-height: 2.55rem;
            border: 1px solid rgba(15,118,110,.25) !important;
            background: {brand.PRIMARY} !important;
            color: white !important;
            font-weight: 800 !important;
            box-shadow: 0 10px 24px rgba(23,50,77,.14);
          }}
          .stDownloadButton > button:hover {{
            background: {brand.SURFACE_DARK} !important;
            color: white !important;
            border-color: rgba(255,255,255,.18) !important;
          }}
          .stTabs [data-baseweb="tab-list"] {{
            width: fit-content;
            gap: .25rem;
            padding: .25rem;
            border: 1px solid {brand.BORDER};
            border-radius: 10px;
            background: rgba(255, 253, 248, .72);
            box-shadow: 0 8px 20px rgba(17,24,39,.035);
          }}
          .stTabs [data-baseweb="tab"] {{
            height: auto;
            padding: .45rem .7rem;
            border-radius: 8px;
            color: {brand.MUTED};
            font-weight: 750;
          }}
          .stTabs [aria-selected="true"] {{
            color: {brand.INK};
            background: {brand.CARD};
            box-shadow: inset 0 0 0 1px {brand.BORDER};
          }}
          .stTabs [data-baseweb="tab-highlight"] {{
            display: none;
          }}
          iframe, div[data-testid="stIFrame"] {{
            border-radius: 14px;
          }}
          div[data-testid="stDataFrame"] {{
            border: 1px solid {brand.BORDER};
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 10px 28px rgba(17,24,39,.045);
            background: {brand.CARD};
          }}
          div[data-testid="stAlert"] {{
            border-radius: 14px;
            border: 1px solid {brand.BORDER};
            background: rgba(255,253,248,.82);
            box-shadow: 0 10px 28px rgba(17,24,39,.045);
          }}
          div[data-testid="stAlert"] p {{
            color: {brand.INK};
            font-weight: 650;
          }}
          div[data-testid="stExpander"] details {{
            border: 1px solid {brand.BORDER};
            border-radius: 14px;
            background: rgba(255,253,248,.76);
            box-shadow: 0 10px 28px rgba(17,24,39,.04);
            overflow: hidden;
          }}
          div[data-testid="stExpander"] summary {{
            color: {brand.INK};
            font-weight: 800;
            min-height: 2.75rem;
            padding: .6rem .85rem;
          }}
          div[data-testid="stExpanderDetails"] {{
            border-top: 1px solid {brand.BORDER};
            background: rgba(255,253,248,.56);
          }}
          div[data-testid="stExpander"] div[data-testid="stMarkdownContainer"] {{
            color: {brand.MUTED};
          }}
          .demo-hero {{
            background: {brand.SURFACE_DARK};
            color: white;
            border: 1px solid rgba(255,255,255,.12);
            border-radius: 18px;
            padding: 1.3rem;
            box-shadow: 0 22px 52px rgba(17,24,39,.16);
            margin-bottom: 1rem;
          }}
          .demo-hero-grid {{
            display:grid;
            grid-template-columns: minmax(0, 1.45fr) minmax(16rem, .75fr);
            gap: 1.1rem;
            align-items: stretch;
          }}
          .demo-hero .demo-hero-title {{
            margin: .55rem 0 .65rem 0;
            color: white !important;
            font-size: 2.15rem;
            line-height: 1.04;
            font-weight: 850;
            letter-spacing: 0;
          }}
          .demo-hero .demo-hero-question {{
            color: {brand.TEXT_ON_DARK_MUTED} !important;
            font-size: 1rem;
            line-height: 1.58;
            margin: 0;
          }}
          .demo-hero .demo-hero-question b {{
            color: white !important;
          }}
          .demo-hero-metric {{
            background: rgba(255,255,255,.06);
            border: 1px solid rgba(255,255,255,.12);
            border-radius: 14px;
            padding: 1rem;
            min-height: 100%;
          }}
          .demo-hero-metric-label {{
            color: #5eead4;
            text-transform: uppercase;
            letter-spacing: .12em;
            font-size: .68rem;
            font-weight: 850;
          }}
          .demo-hero-metric-value {{
            color: white;
            font-size: 1.42rem;
            line-height: 1.12;
            font-weight: 850;
            margin-top: .55rem;
          }}
          .demo-hero-metric-delta {{
            color: #d1d5db;
            font-size: .84rem;
            line-height: 1.45;
            margin-top: .55rem;
          }}
          .demo-badge {{
            display:inline-block;
            background: rgba(15,118,110,.09);
            color:{brand.ACCENT};
            border:1px solid rgba(15,118,110,.2);
            padding:4px 10px;
            border-radius:999px;
            font-size:0.72rem;
            font-weight:750;
            margin:0 6px 6px 0;
          }}
          .demo-hero .demo-badge {{
            background: rgba(255,255,255,.07);
            color:#d1d5db;
            border:1px solid rgba(255,255,255,.12);
          }}
          .demo-selo {{
            display:inline-block;
            background:rgba(15,118,110,.14);
            color:{brand.ACCENT};
            border:1px solid rgba(15,118,110,.24);
            padding:5px 12px;
            border-radius:8px;
            font-size:0.76rem;
            font-weight:750;
            margin-top: .8rem;
          }}
          .demo-hero .demo-selo {{
            color:#99f6e4;
            border-color:rgba(94,234,212,.24);
          }}
          .demo-breadcrumb {{
            font-size:0.72rem;
            font-weight:850;
            color:{brand.WARM_ACCENT};
            text-transform:uppercase;
            letter-spacing:0.12em;
            margin-bottom:.55rem;
          }}
          .demo-breadcrumb b {{ color:{brand.ACCENT}; }}
          .demo-sidebar-brand {{
            font-weight:850; color:{brand.INK}; font-size:1rem; line-height:1.1;
          }}
          .demo-sidebar-brand span {{ display:block; color:{brand.MUTED}; font-weight:500; font-size:.72rem; }}
          .demo-sidebar-section {{
            color:{brand.WARM_ACCENT};
            font-size:.68rem;
            font-weight:850;
            letter-spacing:.12em;
            text-transform:uppercase;
            margin:1rem 0 .35rem 0;
          }}
          .demo-sidebar-note {{
            color:{brand.MUTED};
            font-size:.78rem;
            line-height:1.35;
            margin:.35rem 0 .8rem 0;
          }}
          .kpi-card {{
            background:{brand.CARD};
            border:1px solid {brand.BORDER};
            border-radius:14px;
            padding:14px 16px;
            margin-bottom:10px;
            box-shadow:0 10px 26px rgba(17,24,39,.04);
          }}
          .kpi-card.success {{ border-top:4px solid {brand.SUCCESS}; }}
          .kpi-card.warning {{ border-top:4px solid {brand.WARNING}; }}
          .kpi-card.danger {{ border-top:4px solid {brand.DANGER}; }}
          .kpi-label {{
            font-size:0.72rem;
            color:{brand.MUTED};
            font-weight:800;
            text-transform:uppercase;
            letter-spacing:.08em;
          }}
          .kpi-value {{
            font-size:1.42rem;
            line-height:1.08;
            color:{brand.INK};
            font-weight:850;
            letter-spacing:0;
            margin-top:.25rem;
          }}
          .demo-section {{
            margin: 1.2rem 0 .55rem 0;
          }}
          .demo-section-title {{
            color:{brand.INK};
            font-size:1.1rem;
            line-height:1.2;
            font-weight:850;
            letter-spacing:0;
            margin:0;
          }}
          .demo-section-desc {{
            color:{brand.MUTED};
            font-size:.88rem;
            line-height:1.45;
            margin:.25rem 0 0 0;
          }}
          .demo-cta {{
            background:{brand.CARD};
            border:1px solid {brand.BORDER};
            border-radius:16px;
            padding:18px;
            margin-top:1rem;
            box-shadow:0 14px 34px rgba(17,24,39,.05);
          }}
          footer {{ visibility:hidden; height:0; }}
          div[data-testid="stDecoration"] {{ display:none; }}
          @media (max-width: 760px) {{
            div[data-testid="stMainBlockContainer"],
            div[data-testid="stAppViewContainer"] > .main .block-container {{
              padding-left: 1rem;
              padding-right: 1rem;
            }}
            .demo-hero-grid {{ grid-template-columns: 1fr; }}
            .demo-hero {{ border-radius: 14px; }}
            .demo-hero .demo-hero-title {{ font-size: 1.72rem; }}
          }}
          {embed_css}
        </style>
        """,
        unsafe_allow_html=True,
    )


def sidebar_brand() -> None:
    """Cabeçalho de marca + navegação de volta às demos na sidebar."""
    if is_embed():
        return
    with st.sidebar:
        st.markdown(
            "<div class='demo-sidebar-brand'>Lucas Batista"
            "<span>Inteligência Operacional para Logística</span></div>",
            unsafe_allow_html=True,
        )
        st.markdown(
            "<p class='demo-sidebar-note'>Provas navegáveis para avaliar raciocínio operacional, dados e prototipagem.</p>",
            unsafe_allow_html=True,
        )
        nav_link("app.py", "Visão geral das demos")
        st.markdown("<div class='demo-sidebar-section'>Cases âncora</div>", unsafe_allow_html=True)
        nav_link("pages/01_precificacao_frete.py", "01 Frete e custo")
        nav_link("pages/02_mini_torre_controle.py", "02 Torre de controle")
        nav_link("pages/03_cvrp_urbano.py", "03 Roteirização CVRP")
        st.markdown("<div class='demo-sidebar-section'>Biblioteca</div>", unsafe_allow_html=True)
        nav_link("pages/04_promessa_cep.py", "04 Promessa por CEP")
        nav_link("pages/05_vrptw_ultima_milha.py", "05 VRPTW última milha")
        nav_link("pages/06_rede_interhubs.py", "06 Rede inter-hubs")
        nav_link("pages/07_classificador_ocorrencias.py", "07 Classificador")
        nav_link("pages/08_ship_from_store.py", "08 Ship-from-store")
        nav_link("pages/09_tsp_baseline_sp.py", "09 Sequência TSP")
        nav_link("pages/10_auditoria_endereco.py", "10 Auditoria endereço")
        st.markdown("<div class='demo-sidebar-section'>Método</div>", unsafe_allow_html=True)
        nav_link("pages/11_sobre_dados_metodos.py", "Dados e métodos")
        st.divider()


@contextmanager
def filter_container(label: str = "Filtros") -> Iterator[None]:
    """Container de filtros ciente do embed.

    A versão full-page usa a sidebar. No embed a sidebar também recebe os
    widgets, mas fica invisível por CSS: o modal prioriza a leitura do case
    com defaults bons; ajuste fino continua disponível ao abrir a demo inteira.
    """
    with st.sidebar:
        yield


def breadcrumb(texto: str) -> None:
    """Trilha compacta de contexto (ex.: 'Case: Precificação de Frete · Demo')."""
    st.markdown(f"<div class='demo-breadcrumb'>{texto}</div>", unsafe_allow_html=True)


def nav_link(path: str, label: str, icon: str | None = None) -> None:
    """st.page_link com fallback silencioso fora de contexto multipage (ex.: testes)."""
    try:
        st.page_link(path, label=label, icon=icon)
    except Exception:  # noqa: BLE001
        st.caption(f"{icon or ''} {label}".strip())


def plot(fig, **kwargs) -> None:
    """Renderiza um gráfico Plotly com largura total e sem modebar."""
    kwargs.setdefault("width", "stretch")
    kwargs.setdefault("config", {"displayModeBar": False})
    fig = polish(fig)
    st.plotly_chart(fig, **kwargs)


def section(titulo: str, descricao: str | None = None) -> None:
    """Cabeçalho de seção padronizado."""
    desc = (
        f"<p class='demo-section-desc'>{escape(descricao)}</p>"
        if descricao
        else ""
    )
    st.markdown(
        f"""
        <div class="demo-section">
          <h2 class="demo-section-title">{escape(titulo)}</h2>
          {desc}
        </div>
        """,
        unsafe_allow_html=True,
    )


def hero(
    title: str,
    pergunta: str,
    frameworks: Sequence[str] | None = None,
    selo: str | None = None,
    metric: dict | None = None,
) -> None:
    """Primeira dobra da demo: título, selos, pergunta e métrica de impacto.

    `metric`: dict com label, value e opcionalmente delta, help, delta_color.
    """
    badges = ""
    if frameworks:
        badges = "".join(
            f"<span class='demo-badge'>{escape(str(framework))}</span>"
            for framework in frameworks
        )
    selo_html = (
        f"<div><span class='demo-selo'>{escape(selo)}</span></div>" if selo else ""
    )
    metric_html = ""
    if metric:
        metric_delta = metric.get("delta")
        metric_help = metric.get("help")
        metric_html = (
            "<aside class='demo-hero-metric'>"
            f"<div class='demo-hero-metric-label'>{escape(str(metric['label']))}</div>"
            f"<div class='demo-hero-metric-value'>{escape(str(metric['value']))}</div>"
            + (
                f"<div class='demo-hero-metric-delta'>{escape(str(metric_delta))}</div>"
                if metric_delta
                else ""
            )
            + (
                f"<div class='demo-hero-metric-delta'>{escape(str(metric_help))}</div>"
                if metric_help
                else ""
            )
            + "</aside>"
        )
    st.markdown(
        f"""
        <section class="demo-hero">
          <div class="demo-hero-grid">
            <div>
              {badges}
              <h1 class="demo-hero-title">{escape(title)}</h1>
              <p class="demo-hero-question"><b>Pergunta de negócio:</b> {escape(pergunta)}</p>
              {selo_html}
            </div>
            {metric_html}
          </div>
        </section>
        """,
        unsafe_allow_html=True,
    )
    st.write("")


def framework_badges(frameworks: Sequence[str]) -> None:
    """Selos dos frameworks de produção citados na demo."""
    if not frameworks:
        return
    pills = "".join(
        f"<span class='demo-badge'>{escape(str(f))}</span>" for f in frameworks
    )
    st.markdown(pills, unsafe_allow_html=True)


def maturity_selo(texto: str) -> None:
    st.markdown(
        f"<span class='demo-selo'>{escape(texto)}</span>",
        unsafe_allow_html=True,
    )


def page_header(
    title: str,
    pergunta: str,
    frameworks: Sequence[str] | None = None,
    selo: str | None = None,
) -> None:
    """Cabeçalho padrão: título, selos de framework, pergunta de negócio e selo
    de maturidade."""
    hero(title, pergunta, frameworks=frameworks, selo=selo)


def impact_metric(
    label: str,
    value: str,
    delta: str | None = None,
    help: str | None = None,
    delta_color: str = "normal",
) -> None:
    """Número executivo de destaque (topo da demo)."""
    severity = "danger" if delta_color == "inverse" else None
    if delta_color == "off":
        severity = "warning"
    kpi_metric(label, value if delta is None else f"{value} · {delta}", severity)
    if help:
        st.caption(help)


def _render_metric(col, item: tuple[str, str] | dict) -> None:
    with col:
        if isinstance(item, dict):
            value = item["value"]
            if item.get("delta"):
                value = f"{value} · {item['delta']}"
            kpi_metric(item["label"], value, item.get("severity"))
            if item.get("help"):
                st.caption(item["help"])
        else:
            kpi_metric(item[0], item[1])


def kpi_row(
    items: list[tuple[str, str]] | list[dict], columns: int | None = None
) -> None:
    """Linha de KPIs. Aceita tuplas (label, value) ou dicts com delta/help.

    No embed (iframe estreito do modal) mais de 2 colunas ficam espremidas, então
    caímos para uma grade 2×2. `columns` força um número específico se preciso.
    """
    n = len(items)
    if n == 0:
        return
    if columns is None:
        columns = 2 if (is_embed() and n > 2) else n
    columns = max(1, min(columns, n))
    for start in range(0, n, columns):
        cols = st.columns(columns)
        for offset, item in enumerate(items[start : start + columns]):
            _render_metric(cols[offset], item)


def kpi_grid(items: list[dict], columns: int | None = None) -> None:
    """Grade de KPIs com borda por severidade, responsiva no embed (2×2).

    Cada item: dict com `label`, `value` e opcional `severity`
    (success/warning/danger). Substitui blocos manuais de `st.columns(4)`
    que espremem no iframe do modal.
    """
    n = len(items)
    if n == 0:
        return
    if columns is None:
        columns = 2 if (is_embed() and n > 2) else n
    columns = max(1, min(columns, n))
    for start in range(0, n, columns):
        cols = st.columns(columns)
        for offset, item in enumerate(items[start : start + columns]):
            with cols[offset]:
                kpi_metric(item["label"], item["value"], item.get("severity"))


def kpi_metric(label: str, value: str, severity: str | None = None) -> None:
    """KPI com borda colorida por severidade (success/warning/danger)."""
    css_class = severity if severity in {"success", "warning", "danger"} else ""
    st.markdown(
        f"<div class='kpi-card {css_class}'>"
        f"<div class='kpi-label'>{escape(label)}</div>"
        f"<div class='kpi-value'>{escape(value)}</div>"
        "</div>",
        unsafe_allow_html=True,
    )


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
            f"""
- **Fonte da amostra:** {fonte}
- **Tipo de dado:** {tipo}
- **Método de produção:** {producao}
- **Limitações:** {limitacoes}
"""
        )


def demo_cta(next_demo_path: str | None = None, next_label: str = "Ver próxima demo") -> None:
    """Container de CTA final das demos: próxima demo e contato."""
    st.markdown(
        "<div class='demo-cta'>"
        "<p style='font-weight:850;margin:0 0 .35rem 0;'>Próximos passos</p>"
        "<p style='margin:0;'>Use esta prova como referência de raciocínio técnico, "
        "baixe os dados quando disponível ou avance para a próxima análise.</p>"
        "</div>",
        unsafe_allow_html=True,
    )
    cols = st.columns([1, 1])
    with cols[0]:
        if next_demo_path:
            nav_link(next_demo_path, next_label)
    with cols[1]:
        st.markdown(
            "[Contato profissional](https://portfolio-lucas-batista-murex.vercel.app#contato)"
        )


def footer() -> None:
    st.divider()
    st.caption(
        "Lucas Batista — Operações, Dados e Inteligência Logística · "
        "Resultados demonstrativos, não métricas de operação real."
    )
