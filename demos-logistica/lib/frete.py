"""Modelo de custo de frete rodoviário BR (demonstrativo, coeficientes curados).

Referências conceituais: piso mínimo ANTT (Resolução/Portaria SUROC), índices
NTC&Logística e sensibilidade ao diesel (ANP). Os coeficientes abaixo são
curados e ilustrativos — não substituem a tabela vigente nem cotação comercial.
"""

from __future__ import annotations

# Eixos por tipo de veículo (aproximação demonstrativa).
VEHICLE_AXLES = {
    "VUC": 2,
    "Truck": 3,
    "Bitruck": 4,
    "Carreta": 5,
    "Carreta LS": 5,
    "Bitrem": 7,
}

# Coeficientes ANTT curados (demonstrativos): CCD em R$/km, CC (carga/descarga) em R$.
# Ordem de grandeza inspirada na Tabela A (lotação). Conferir ato vigente para uso real.
ANTT_COEF = {
    2: {"ccd": 3.29, "cc": 349.29},
    3: {"ccd": 4.07, "cc": 405.32},
    4: {"ccd": 4.63, "cc": 449.10},
    5: {"ccd": 5.32, "cc": 496.72},
    6: {"ccd": 6.05, "cc": 543.30},
    7: {"ccd": 6.28, "cc": 587.10},
}

# Perfis de GRIS e Ad Valorem (% sobre valor da nota) — demonstrativos.
GRIS_PCT = {
    "padrao_ntc": 0.0030,
    "alto_valor_agregado": 0.0045,
    "baixo_valor_agregado": 0.0020,
}
ADVALOREM_PCT = {
    "padrao_ntc": 0.0040,
    "alto_valor_agregado": 0.0060,
    "baixo_valor_agregado": 0.0030,
}

# Parcela do frete-peso sensível ao diesel (combustível).
FUEL_SHARE_DEFAULT = 0.35
DIESEL_REF_BRL = 6.10  # R$/litro de referência (demonstrativo)


def chargeable_weight(
    gross_kg: float, volume_m3: float, factor: float = 300.0
) -> float:
    """Peso taxável = maior entre peso real e peso cubado (fator kg/m³)."""
    return round(max(gross_kg, volume_m3 * factor), 2)


def axles_for(vehicle_type: str) -> int:
    return VEHICLE_AXLES.get(vehicle_type, 3)


def antt_floor(distance_km: float, vehicle_type: str) -> float:
    """Piso mínimo ANTT estimado (demonstrativo) = CCD·km + CC."""
    coef = ANTT_COEF[axles_for(vehicle_type)]
    return round(coef["ccd"] * distance_km + coef["cc"], 2)


def freight_components(
    distance_km: float,
    chargeable_kg: float,
    invoice_value: float,
    vehicle_type: str,
    gris_profile: str,
    base_rate_per_kg: float = 0.16,
    dist_factor: float = 0.00035,
    pedagio_per_km: float = 0.42,
    despacho: float = 28.0,
) -> dict[str, float]:
    """Componentes do frete comercial estimado (demonstrativo)."""
    dist_mult = 1.0 + distance_km * dist_factor
    frete_peso = chargeable_kg * base_rate_per_kg * dist_mult
    axles = axles_for(vehicle_type)
    pedagio = distance_km * pedagio_per_km * (axles / 3.0)
    gris = invoice_value * GRIS_PCT.get(gris_profile, 0.003)
    ad_valorem = invoice_value * ADVALOREM_PCT.get(gris_profile, 0.004)
    componentes = {
        "Frete-peso": round(frete_peso, 2),
        "Pedágio": round(pedagio, 2),
        "GRIS": round(gris, 2),
        "Ad Valorem": round(ad_valorem, 2),
        "Despacho/Taxas": round(despacho, 2),
    }
    componentes["Total"] = round(sum(componentes.values()), 2)
    return componentes


def diesel_delta(
    frete_peso: float,
    price_new: float,
    price_ref: float = DIESEL_REF_BRL,
    fuel_share: float = FUEL_SHARE_DEFAULT,
) -> float:
    """Variação (R$) no frete-peso ao mudar o preço do diesel."""
    if price_ref <= 0:
        return 0.0
    fuel_cost = frete_peso * fuel_share
    return round(fuel_cost * (price_new / price_ref - 1.0), 2)
