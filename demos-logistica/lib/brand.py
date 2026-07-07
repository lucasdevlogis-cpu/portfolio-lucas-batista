"""Tokens de marca das demos (espelham `design/design.md`).

As demos precisam parecer parte do mesmo dossiê premium da landing. Mantemos
Streamlit pela velocidade de demo analítica, mas a camada visual deve esconder o
"chrome" padrão e reforçar leitura editorial, contraste e proporção.
"""

# Base editorial (papel envelhecido claro).
EDITORIAL = "#f6f1e8"
EDITORIAL_2 = "#efe7d8"

# Tinta escura e navy da landing.
INK = "#111827"
PRIMARY = "#17324d"
SURFACE_DARK = "#0b1220"
TEXT_ON_DARK_MUTED = "#c8d2dc"

# Cores de destaque vibrantes (landing redesign).
ACCENT = "#14b8a6"
ACCENT_DARK = "#0f766e"
ACCENT_LIGHT = "#5eead4"
WARM_ACCENT = "#d4a853"
WARM_ACCENT_DARK = "#9a6a2f"

BACKGROUND = EDITORIAL
FOREGROUND = INK
MUTED = "#4b5563"
BORDER = "#d8cfbf"
CARD = "#fffdf8"
GRID = "#e7ded0"

WARNING = "#f59e0b"
DANGER = "#dc2626"
SUCCESS = "#16a34a"

# Sequência categórica premium para gráficos (evitar arco-íris em categorias nominais).
SEQ = [
    PRIMARY,
    ACCENT,
    WARM_ACCENT,
    INK,
    WARNING,
    "#475569",
    DANGER,
    "#0e7490",
    "#7c2d12",
]

ROUTE_COLORS = [
    PRIMARY,
    ACCENT,
    WARM_ACCENT,
    "#0e7490",
    DANGER,
    WARNING,
    "#475569",
]

# Cores semânticas para status operacionais.
STATUS_COLORS = {
    "No prazo": SUCCESS,
    "Atrasado": DANGER,
    "Em risco": WARNING,
    "Ocorrencia aberta": DANGER,
    "Entregue": SUCCESS,
    "Em transito": ACCENT,
    "Apto": SUCCESS,
    "Abaixo do piso": WARNING,
    "Abaixo do piso ANTT": DANGER,
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
    "Alto": SUCCESS,
}

# Alturas padronizadas de gráficos e mapas.
CHART_HALF_HEIGHT = 340
CHART_FULL_HEIGHT = 430
CHART_HALF_EMBED_HEIGHT = 320
CHART_FULL_EMBED_HEIGHT = 360
MAP_FULL_HEIGHT = 460
MAP_EMBED_HEIGHT = 330

FONT_FAMILY = "Inter, system-ui, -apple-system, Segoe UI, sans-serif"


def maturidade(metodo: str = "heurístico", producao: str = "solver dedicado") -> str:
    """Selo de maturidade padrão — honestidade calibrada, não defensiva."""
    return f"Amostra curada · método {metodo} · produção usaria {producao}"
