"""Componentes de UI reutilizáveis das demos (Streamlit)."""

from __future__ import annotations

from typing import Sequence

import pandas as pd
import streamlit as st

from lib import brand
from lib.viz import apply_theme
from paths import DATA_DIR


def is_embed() -> bool:
    """True quando a page é carregada em iframe (`?embed=true`), como na landing."""
    try:
        return st.query_params.get("embed") == "true"
    except Exception:  # noqa: BLE001 — fora de contexto (ex.: AppTest)
        return False


def map_height(default: int) -> int:
    """Altura de mapa/gráfico reduzida no embed (iframe apertado no modal)."""
    return min(default, 360) if is_embed() else default


def page_setup(title: str, icon: str = "🚚") -> None:
    """Configura a página e aplica o tema visual da marca."""
    embed = is_embed()
    st.set_page_config(
        page_title=title,
        page_icon=icon,
        layout="wide",
        initial_sidebar_state="collapsed" if embed else "auto",
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
          div[data-testid="stAppViewContainer"] > .main .block-container {
            padding-top: 1rem;
          }
        """
        if embed
        else ""
    )
    st.markdown(
        f"""
        <style>
          {embed_css}
          .stApp h1, .stApp h2, .stApp h3 {{ color: {brand.PRIMARY}; }}
          div[data-testid="stMetricValue"] {{ color: {brand.PRIMARY}; font-weight:700; }}
          /* KPIs como cartões */
          div[data-testid="stMetric"] {{
            background:{brand.CARD}; border:1px solid {brand.BORDER};
            border-radius:12px; padding:12px 16px;
          }}
          /* Hero (container com borda) */
          div[data-testid="stVerticalBlockBorderWrapper"] {{ border-radius:14px; }}
          .demo-badge {{
            display:inline-block; background:{brand.PRIMARY}14; color:{brand.PRIMARY};
            border:1px solid {brand.BORDER}; padding:2px 10px; border-radius:999px;
            font-size:0.72rem; font-weight:600; margin:0 6px 6px 0;
          }}
          .demo-selo {{
            display:inline-block; background:{brand.ACCENT}14; color:{brand.ACCENT};
            border:1px solid {brand.ACCENT}44; padding:3px 12px; border-radius:8px;
            font-size:0.78rem; font-weight:600;
          }}
          .demo-pergunta {{ font-size:1.05rem; color:{brand.FOREGROUND}; margin:.4rem 0; }}
          .demo-sidebar-brand {{
            font-weight:700; color:{brand.PRIMARY}; font-size:1rem; line-height:1.1;
          }}
          .demo-sidebar-brand span {{ display:block; color:{brand.MUTED}; font-weight:500; font-size:.72rem; }}
          /* Limpa chrome do Streamlit para embed mais limpo */
          footer {{ visibility:hidden; height:0; }}
          div[data-testid="stDecoration"] {{ display:none; }}
        </style>
        """,
        unsafe_allow_html=True,
    )


def sidebar_brand() -> None:
    """Cabeçalho de marca + navegação de volta às demos na sidebar."""
    with st.sidebar:
        st.markdown(
            "<div class='demo-sidebar-brand'>Lucas Batista"
            "<span>Inteligência Operacional para Logística</span></div>",
            unsafe_allow_html=True,
        )
        nav_link("app.py", "Todas as demos", icon="🏠")
        st.divider()


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
    st.plotly_chart(fig, **kwargs)


def section(titulo: str, descricao: str | None = None) -> None:
    """Cabeçalho de seção padronizado."""
    st.subheader(titulo)
    if descricao:
        st.caption(descricao)


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
    with st.container(border=True):
        cols = st.columns([2, 1]) if metric else [st.container()]
        with cols[0]:
            st.markdown(f"## {title}")
            if frameworks:
                framework_badges(frameworks)
            st.markdown(
                f"<p class='demo-pergunta'><b>Pergunta de negócio:</b> {pergunta}</p>",
                unsafe_allow_html=True,
            )
            if selo:
                maturity_selo(selo)
        if metric:
            with cols[1]:
                st.metric(
                    metric["label"],
                    metric["value"],
                    delta=metric.get("delta"),
                    help=metric.get("help"),
                    delta_color=metric.get("delta_color", "normal"),
                )
    st.write("")


def framework_badges(frameworks: Sequence[str]) -> None:
    """Selos dos frameworks de produção citados na demo."""
    if not frameworks:
        return
    pills = "".join(f"<span class='demo-badge'>{f}</span>" for f in frameworks)
    st.markdown(pills, unsafe_allow_html=True)


def maturity_selo(texto: str) -> None:
    st.markdown(f"<span class='demo-selo'>{texto}</span>", unsafe_allow_html=True)


def page_header(
    title: str,
    pergunta: str,
    frameworks: Sequence[str] | None = None,
    selo: str | None = None,
) -> None:
    """Cabeçalho padrão: título, selos de framework, pergunta de negócio e selo
    de maturidade."""
    st.title(title)
    if frameworks:
        framework_badges(frameworks)
    st.markdown(f"**Pergunta de negócio:** {pergunta}")
    if selo:
        maturity_selo(selo)
    st.write("")


def impact_metric(
    label: str,
    value: str,
    delta: str | None = None,
    help: str | None = None,
    delta_color: str = "normal",
) -> None:
    """Número executivo de destaque (topo da demo)."""
    st.metric(label, value, delta=delta, help=help, delta_color=delta_color)


def kpi_row(items: list[tuple[str, str]] | list[dict]) -> None:
    """Linha de KPIs. Aceita tuplas (label, value) ou dicts com delta/help."""
    cols = st.columns(len(items))
    for col, item in zip(cols, items):
        if isinstance(item, dict):
            col.metric(
                item["label"],
                item["value"],
                delta=item.get("delta"),
                help=item.get("help"),
            )
        else:
            col.metric(item[0], item[1])


def download_csv_button(
    df: pd.DataFrame, filename: str, label: str = "⬇️ Baixar resultado (CSV)"
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


def footer() -> None:
    st.divider()
    st.caption(
        "Lucas Batista — Inteligência Operacional para Logística · "
        "Resultados demonstrativos, não métricas de operação real."
    )
