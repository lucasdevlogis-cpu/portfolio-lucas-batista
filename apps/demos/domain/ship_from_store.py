"""Modelo de alocação Ship-from-Store (origem ótima) para demonstração.

Decide a melhor origem (CD, loja, hub) por pedido comparando com o baseline de
sempre despachar do CD. Mantém a lógica reproduzível para geração de snapshots.
"""

from __future__ import annotations

import pandas as pd

from domain.routing import haversine

DEFAULT_PESO_PRAZO = 15.0
DEFAULT_RATE_KM = 0.9
DEFAULT_HANDLING = 1.5
DEFAULT_USAR_CAPACIDADE = True


def prazo_por_distancia(km: float) -> int:
    """Prazo em dias baseado em faixas de distância."""
    if km <= 50:
        return 1
    if km <= 300:
        return 2
    if km <= 800:
        return 3
    return 4


def custo_origem(
    origem: pd.Series,
    dest_lat: float,
    dest_lon: float,
    demanda: int,
    rate_km: float = DEFAULT_RATE_KM,
    handling: float = DEFAULT_HANDLING,
) -> tuple[float, int, float]:
    """Retorna (custo, prazo_dias, distancia_km) para uma origem e destino."""
    dist = haversine(origem["lat"], origem["lon"], dest_lat, dest_lon)
    prazo = prazo_por_distancia(dist)
    custo = origem["custo_fixo"] + dist * rate_km + demanda * handling
    return round(custo, 2), prazo, round(dist, 2)


def resolver_alocacao(
    origens: pd.DataFrame,
    pedidos: pd.DataFrame,
    peso_prazo: float = DEFAULT_PESO_PRAZO,
    rate_km: float = DEFAULT_RATE_KM,
    handling: float = DEFAULT_HANDLING,
    usar_capacidade: bool = DEFAULT_USAR_CAPACIDADE,
) -> pd.DataFrame:
    """Resolve a alocação ótima de cada pedido considerando custo, prazo e capacidade.

    O baseline fixo é sempre o CD; a economia e a redução de prazo são calculadas
    contra esse baseline.
    """
    cds = origens[origens["origem_tipo"].str.upper() == "CD"]
    if cds.empty:
        raise ValueError("Pelo menos uma origem do tipo CD é obrigatória.")
    cd = cds.iloc[0]

    restante = {row["origem_id"]: int(row["capacidade_dia"]) for _, row in origens.iterrows()}
    linhas = []
    for _, pedido in pedidos.iterrows():
        b_custo, b_prazo, _ = custo_origem(
            cd, pedido["dest_lat"], pedido["dest_lon"], pedido["demanda_un"], rate_km, handling
        )

        candidatos = []
        for _, origem in origens.iterrows():
            if usar_capacidade and restante[origem["origem_id"]] < pedido["demanda_un"]:
                continue
            custo, prazo, dist = custo_origem(
                origem,
                pedido["dest_lat"],
                pedido["dest_lon"],
                pedido["demanda_un"],
                rate_km,
                handling,
            )
            score = custo + prazo * peso_prazo
            candidatos.append((score, custo, prazo, dist, origem))

        if not candidatos:
            custo, prazo, dist = custo_origem(
                cd,
                pedido["dest_lat"],
                pedido["dest_lon"],
                pedido["demanda_un"],
                rate_km,
                handling,
            )
            escolha = (custo + prazo * peso_prazo, custo, prazo, dist, cd)
        else:
            escolha = min(candidatos, key=lambda x: x[0])

        _, custo, prazo, dist, origem = escolha
        if usar_capacidade:
            restante[origem["origem_id"]] -= int(pedido["demanda_un"])

        linhas.append(
            {
                "pedido_id": pedido["pedido_id"],
                "uf_destino": pedido["uf_destino"],
                "dest_lat": pedido["dest_lat"],
                "dest_lon": pedido["dest_lon"],
                "demanda_un": pedido["demanda_un"],
                "origem_escolhida": origem["origem_id"],
                "origem_tipo": origem["origem_tipo"],
                "origem_lat": origem["lat"],
                "origem_lon": origem["lon"],
                "distancia_km": dist,
                "prazo_dias": prazo,
                "custo": custo,
                "economia": round(b_custo - custo, 2),
                "reducao_prazo": b_prazo - prazo,
            }
        )

    return pd.DataFrame(linhas)
