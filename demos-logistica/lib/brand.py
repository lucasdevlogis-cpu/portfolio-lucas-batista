"""Tokens de marca do portfólio Lucas Batista (espelham design/design.md)."""

PRIMARY = "#1e3a5f"
ACCENT = "#0d9488"
BACKGROUND = "#f8fafc"
FOREGROUND = "#0f172a"
MUTED = "#64748b"
BORDER = "#e2e8f0"
CARD = "#ffffff"

WARNING = "#f59e0b"
DANGER = "#dc2626"
SUCCESS = "#16a34a"

# Sequência categórica para gráficos (primary/accent na frente).
SEQ = [
    PRIMARY,
    ACCENT,
    WARNING,
    "#7c3aed",
    DANGER,
    "#0891b2",
    "#65a30d",
    "#db2777",
]

# Cores semânticas para status operacionais.
STATUS_COLORS = {
    "No prazo": SUCCESS,
    "Atrasado": DANGER,
    "Em risco": WARNING,
    "Ocorrencia aberta": DANGER,
    "Entregue": SUCCESS,
    "Em transito": ACCENT,
}

# Cores semânticas para níveis de confiança / severidade.
SEVERITY_COLORS = {
    "Alta": SUCCESS,
    "Média": WARNING,
    "Baixa": DANGER,
    "Baixo": DANGER,
    "Crítico": DANGER,
    "Atenção": WARNING,
    "OK": SUCCESS,
}

# Alturas padronizadas de gráficos e mapas.
CHART_HALF_HEIGHT = 360
CHART_FULL_HEIGHT = 480
MAP_FULL_HEIGHT = 520
MAP_EMBED_HEIGHT = 360

FONT_FAMILY = "Inter, system-ui, -apple-system, Segoe UI, sans-serif"


def maturidade(metodo: str = "heurístico", producao: str = "solver dedicado") -> str:
    """Selo de maturidade padrão — honestidade calibrada, não defensiva."""
    return f"Amostra curada · método {metodo} · produção usaria {producao}"
