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
    "#f59e0b",
    "#7c3aed",
    "#dc2626",
    "#0891b2",
    "#65a30d",
    "#db2777",
]

FONT_FAMILY = "Inter, system-ui, -apple-system, Segoe UI, sans-serif"


# Selo de maturidade padrão — honestidade calibrada, não defensiva.
def maturidade(metodo: str = "heurístico", producao: str = "solver dedicado") -> str:
    return f"Amostra curada · método {metodo} · produção usaria {producao}"
