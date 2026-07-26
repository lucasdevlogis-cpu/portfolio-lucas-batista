import pandas as pd
import pytest
from domain.rede_interhubs import calcular_corredores


def corredores() -> pd.DataFrame:
    return pd.DataFrame(
        [
            {
                "origem": "Hub A",
                "destino": "Hub B",
                "distance_km": 100.0,
                "volume_ton": 10.0,
                "origem_lat": -23.0,
                "origem_lon": -46.0,
                "destino_lat": -22.0,
                "destino_lon": -45.0,
            },
            {
                "origem": "Hub A",
                "destino": "Hub C",
                "distance_km": 200.0,
                "volume_ton": 20.0,
                "origem_lat": -23.0,
                "origem_lon": -46.0,
                "destino_lat": -21.0,
                "destino_lon": -44.0,
            },
        ]
    )


def test_calcula_custo_e_ordena_corredores_sem_alterar_origem() -> None:
    entrada = corredores()
    resultado = calcular_corredores(entrada, rate_km=4.5, ton_km=0.35)

    assert "custo_total" not in entrada.columns
    assert resultado["lane"].tolist() == ["Hub A → Hub B", "Hub A → Hub C"]
    assert resultado["custo_total"].tolist() == [800.0, 2300.0]
    assert resultado["custo_por_ton"].tolist() == [80.0, 115.0]


@pytest.mark.parametrize(
    ("coluna", "valor", "mensagem"),
    [
        ("volume_ton", 0.0, "volume"),
        ("distance_km", -1.0, "distância"),
    ],
)
def test_rejeita_corredor_com_dado_invalido(coluna: str, valor: float, mensagem: str) -> None:
    entrada = corredores()
    entrada.loc[0, coluna] = valor

    with pytest.raises(ValueError, match=mensagem):
        calcular_corredores(entrada)


def test_rejeita_schema_incompleto() -> None:
    with pytest.raises(ValueError, match="destino_lon"):
        calcular_corredores(corredores().drop(columns=["destino_lon"]))


def test_rejeita_premissa_de_custo_negativa() -> None:
    with pytest.raises(ValueError, match="premissas de custo"):
        calcular_corredores(corredores(), rate_km=-0.1)
