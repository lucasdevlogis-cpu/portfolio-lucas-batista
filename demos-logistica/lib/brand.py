"""Generated brand tokens. Edit design/tokens.json and run npm run tokens:sync."""

BACKGROUND = "#f5f2ed"
FOREGROUND = "#07111f"
CARD = "#ffffff"
CARD_FOREGROUND = "#07111f"
POPOVER = "#ffffff"
POPOVER_FOREGROUND = "#07111f"
PRIMARY = "#153451"
PRIMARY_FOREGROUND = "#ffffff"
SECONDARY = "#e6e1d8"
SECONDARY_FOREGROUND = "#07111f"
MUTED = "#ded8ce"
MUTED_FOREGROUND = "#556070"
ACCENT = "#16a99c"
ACCENT_CONTRAST = "#0d746d"
ACCENT_FOREGROUND = "#ffffff"
EDITORIAL = "#f5f2ed"
EDITORIAL_2 = "#e8e4dc"
INK = "#07111f"
WARM_ACCENT = "#c9983f"
WARM_ACCENT_CONTRAST = "#7a5a1a"
SURFACE_DARK = "#07111f"
SURFACE_DARK_2 = "#101b2b"
SURFACE_DARK_3 = "#17263a"
TEXT_ON_DARK = "#ffffff"
TEXT_ON_DARK_MUTED = "#aeb9c7"
TEXT_ON_DARK_ACCENT = "#5eead4"
BORDER = "#c8c2b8"
INPUT = "#c8c2b8"
RING = "#16a99c"
CHART_1 = "#153451"
CHART_2 = "#16a99c"
CHART_3 = "#c9983f"
CHART_4 = "#64748b"
CHART_5 = "#07111f"
SUCCESS = "#16865a"
WARNING = "#b7791f"
DANGER = "#c2413b"

ACCENT_DARK = ACCENT_CONTRAST
ACCENT_LIGHT = TEXT_ON_DARK_ACCENT
WARM_ACCENT_DARK = WARM_ACCENT_CONTRAST
GRID = EDITORIAL_2
CHART4 = CHART_4
CHART_HALF_HEIGHT = 340
CHART_FULL_HEIGHT = 430
CHART_HALF_EMBED_HEIGHT = 320
CHART_FULL_EMBED_HEIGHT = 320
MAP_FULL_HEIGHT = 460
MAP_EMBED_HEIGHT = 330
FONT_FAMILY = "Inter, system-ui, -apple-system, Segoe UI, sans-serif"
HEADING_FONT_FAMILY = "'Source Serif 4', Georgia, ui-serif, serif"
SEQ = [PRIMARY, ACCENT, WARM_ACCENT, CHART4, INK, WARNING, DANGER]
ROUTE_COLORS = [PRIMARY, ACCENT, WARM_ACCENT, CHART4, DANGER, WARNING]
STATUS_COLORS = {
    "No prazo": SUCCESS,
    "Atrasado": DANGER,
    "Em risco": WARNING,
    "Ocorrência aberta": DANGER,
    "Entregue": SUCCESS,
    "Em transito": ACCENT,
    "Em trânsito": ACCENT,
    "Abaixo do piso": WARNING,
    "Abaixo do piso ANTT": DANGER,
}
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

def maturidade(metodo: str = "heurístico", producao: str = "solver dedicado") -> str:
    return f"Amostra curada · método {metodo} · produção usaria {producao}"
