"""Gera CSVs sintéticos para as demos (executar uma vez)."""

from pathlib import Path

import numpy as np
import pandas as pd

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
DATA_DIR.mkdir(exist_ok=True)

rng = np.random.default_rng(42)

REGIOES = ["Sudeste", "Sul", "Nordeste", "Norte", "Centro-Oeste"]
TIPOS = ["Seca", "Refrigerada", "Granel", "Frágil"]


def frete_embarques(n: int = 200) -> None:
    peso = rng.uniform(0.5, 5000, n).round(2)
    regiao = rng.choice(REGIOES, n)
    tipo = rng.choice(TIPOS, n)
    valor = rng.uniform(100, 50000, n).round(2)
    base = peso * rng.uniform(0.08, 0.35, n)
    multi = np.select(
        [regiao == "Norte", regiao == "Nordeste", regiao == "Centro-Oeste"],
        [1.35, 1.15, 1.08],
        default=1.0,
    )
    frete = (base * multi * rng.uniform(0.9, 1.1, n)).round(2)
    df = pd.DataFrame(
        {
            "peso_kg": peso,
            "regiao": regiao,
            "tipo_carga": tipo,
            "valor_declarado": valor,
            "frete_estimado": frete,
            "componente_base": (frete * 0.55).round(2),
            "componente_pedagio": (frete * 0.12).round(2),
            "componente_gris": (frete * 0.08).round(2),
            "componente_advalorem": (frete * 0.05).round(2),
            "componente_outros": (frete * 0.2).round(2),
        }
    )
    df.to_csv(DATA_DIR / "frete_embarques.csv", index=False)


def cvrp_entregas(n: int = 40) -> None:
    lat = -23.55 + rng.normal(0, 0.08, n)
    lon = -46.63 + rng.normal(0, 0.08, n)
    df = pd.DataFrame(
        {
            "entrega_id": [f"E{i:03d}" for i in range(1, n + 1)],
            "lat": lat.round(6),
            "lon": lon.round(6),
            "demanda_kg": rng.integers(5, 120, n),
            "janela_inicio": rng.integers(8, 12, n),
            "janela_fim": rng.integers(14, 20, n),
        }
    )
    df.to_csv(DATA_DIR / "cvrp_entregas.csv", index=False)


def promessa_cep(n: int = 150) -> None:
    cep_prefix = rng.integers(1000, 99999, n)
    df = pd.DataFrame(
        {
            "cep5": [f"{c:05d}" for c in cep_prefix],
            "bairro": [f"Bairro {i % 30}" for i in range(n)],
            "regiao": rng.choice(REGIOES, n),
            "prazo_medio_dias": rng.integers(2, 12, n),
            "taxa_insucesso_pct": rng.uniform(1, 18, n).round(1),
            "custo_medio_frete": rng.uniform(12, 85, n).round(2),
            "volume_entregas": rng.integers(10, 500, n),
        }
    )
    df.to_csv(DATA_DIR / "promessa_cep.csv", index=False)


def ocorrencias(n: int = 40) -> None:
    exemplos = [
        ("Cliente ausente no endereço, tentativa 2", "Cliente Ausente", "Média"),
        ("Atraso por trânsito intenso na marginal", "Atraso", "Alta"),
        ("Endereço incompleto — sem número", "Endereco Incorreto", "Alta"),
        ("Embalagem avariada na conferência", "Avaria", "Alta"),
        ("Destinatário recusou recebimento", "Recusa", "Média"),
        ("Devolução solicitada pelo embarcador", "Devolucao", "Média"),
        ("Carga aguardando liberação no CD", "Atraso", "Baixa"),
    ]
    rows = [exemplos[i % len(exemplos)] for i in range(n)]
    df = pd.DataFrame(rows, columns=["texto", "categoria", "prioridade"])
    df.to_csv(DATA_DIR / "ocorrencias.csv", index=False)


if __name__ == "__main__":
    frete_embarques()
    cvrp_entregas()
    promessa_cep()
    ocorrencias()
    print("CSVs gerados em", DATA_DIR)
