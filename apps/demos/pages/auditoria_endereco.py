"""05. Auditoria de Endereço — triagem de prontidão cadastral."""

import pandas as pd
import plotly.express as px
import streamlit as st
from domain import auditoria_endereco as domain
from presentation import maps as folium_maps
from presentation import tables, ui
from presentation import tokens as brand

ui.page_setup("05. Auditoria de Endereço", icon="🔎")

source = ui.load_csv(
    "enderecos.csv",
    dtype={"cep8": str, "numero": str, "logradouro": str, "complemento": str},
)
audited = domain.audit_dataframe(source)
decisions = domain.decision_counts(audited)
alerts = domain.alert_counts(audited)
valid_points = domain.valid_map_rows(audited)
blocked_outside_map = len(audited) - len(valid_points)

ui.breadcrumb("Case: Auditoria de Endereço · <b>Demo interativa</b>")

ui.hero(
    "05. Auditoria de Endereço",
    "Quais endereços estão prontos, precisam de revisão ou devem ser bloqueados antes da validação logística?",
    frameworks=["Qualidade cadastral", "Validação postal", "Prontidão para geocoding"],
    selo=brand.maturidade(
        metodo="regras de qualidade",
        producao="validação postal + geocoding",
    ),
    metric={
        "label": "Cadastros prontos",
        "value": f"{decisions['Aptos'] / len(audited) * 100:.0f}%",
        "delta": f"{decisions['Bloquear']} bloqueados para correção",
        "delta_color": "inverse",
        "help": "Prontos = confiança Alta (score ≥ 80); ainda exigem validação postal/geocoding.",
    },
)

ui.kpi_grid(
    [
        {
            "label": "Bloquear",
            "value": f"{decisions['Bloquear']} · {decisions['Bloquear'] / len(audited):.0%}",
            "severity": "danger",
        },
        {
            "label": "Revisar",
            "value": f"{decisions['Revisar']} · {decisions['Revisar'] / len(audited):.0%}",
            "severity": "warning",
        },
        {
            "label": "Aptos",
            "value": f"{decisions['Aptos']} · {decisions['Aptos'] / len(audited):.0%}",
            "severity": "success",
        },
    ]
)

tab_overview, tab_details, tab_export = st.tabs(["Visão Geral", "Detalhes", "Exportar"])

with tab_overview:
    decision_column, alert_column = st.columns(2)
    with decision_column:
        ui.section("Fila de decisão")
        decision_frame = pd.DataFrame(
            {
                "decisão": ["Bloquear", "Revisar", "Aceitar"],
                "endereços": [
                    decisions["Bloquear"],
                    decisions["Revisar"],
                    decisions["Aptos"],
                ],
            }
        )
        decision_chart = px.bar(
            decision_frame,
            x="endereços",
            y="decisão",
            orientation="h",
            color="decisão",
            color_discrete_map={
                "Bloquear": brand.DANGER,
                "Revisar": brand.WARNING,
                "Aceitar": brand.SUCCESS,
            },
        )
        decision_chart.update_layout(
            height=ui.chart_height(brand.CHART_HALF_HEIGHT),
            showlegend=False,
            yaxis_title="",
            xaxis_title="endereços",
        )
        ui.plot(decision_chart, width="stretch")

    with alert_column:
        ui.section("Regras acionadas (ocorrências)")
        alert_frame = pd.DataFrame(
            [{"alerta": label, "ocorrências": value} for label, value in alerts.items()]
        )
        alert_chart = px.bar(
            alert_frame,
            x="ocorrências",
            y="alerta",
            orientation="h",
            color_discrete_sequence=[brand.DANGER],
        )
        alert_chart.update_layout(
            height=ui.chart_height(brand.CHART_HALF_HEIGHT),
            yaxis_title="",
            xaxis_title="ocorrências",
        )
        ui.plot(alert_chart, width="stretch")
        st.caption("Alertas acumulam: um mesmo endereço pode acionar mais de uma regra.")

    ui.section("Cobertura territorial validada")
    if not valid_points.empty:
        map_frame = valid_points.copy()
        map_frame["lat"] = map_frame["lat_validada"].astype(float)
        map_frame["lon"] = map_frame["lon_validada"].astype(float)
        map_object = folium_maps.base_map(
            center=(-15, -50),
            zoom=4,
            height=ui.map_height(brand.MAP_FULL_HEIGHT),
        )
        folium_maps.add_points(
            map_object,
            map_frame,
            lat="lat",
            lon="lon",
            tipo="entrega",
            color_by="nivel_confianca",
            popup_fields=[
                "pedido_id",
                "municipio",
                "uf",
                "score",
                "acao",
                "alertas",
            ],
            tooltip_field="pedido_id",
            cluster=False,
        )
        map_object = folium_maps.add_legend(
            map_object,
            "Decisão da triagem",
            [
                {"color": brand.SUCCESS, "label": "Aceitar · confiança Alta"},
                {"color": brand.WARNING, "label": "Revisar · confiança Média"},
            ],
            position="bottomright",
        )
        folium_maps.render(
            map_object,
            height=ui.map_height(brand.MAP_FULL_HEIGHT),
            key="auditoria_mapa",
        )
    st.caption(
        f"{len(valid_points)} aparecem no mapa; {blocked_outside_map} bloqueados por coordenadas "
        "fora do Brasil não são plotados."
    )

with tab_details:
    ui.section("Endereços por prioridade de ação")
    details = audited.sort_values(["score", "pedido_id"])[
        ["pedido_id", "municipio", "uf", "score", "nivel_confianca", "acao", "alertas"]
    ].copy()
    details["nivel_confianca"] = details["nivel_confianca"].apply(tables.status_text)
    details["acao"] = details["acao"].apply(tables.status_text)
    tables.format_dataframe(
        details,
        config={
            "pedido_id": tables.text_column("Pedido"),
            "municipio": tables.text_column("Município"),
            "uf": tables.text_column("UF"),
            "score": tables.score_column("Score"),
            "nivel_confianca": tables.status_column("Confiança"),
            "acao": tables.status_column("Ação"),
            "alertas": tables.text_column("Alertas"),
        },
    )

with tab_export:
    ui.section("Auditoria por endereço")
    export_columns = [
        "pedido_id",
        "cep8",
        "logradouro",
        "numero",
        "complemento",
        "bairro",
        "municipio",
        "uf",
        "score",
        "nivel_confianca",
        "acao",
        "alertas",
    ]
    export_frame = audited[export_columns].copy()
    ui.download_csv_button(export_frame, "auditoria_endereco.csv")

ui.method_expander(
    """
- **Triagem de prontidão:** o score parte de 100 e desconta por CEP inválido,
  logradouro/número ausentes, coordenada inválida ou fora do Brasil e fonte de
  baixa confiança.
- **Ação:** Alta (≥ 80) → aceitar para validação; Média (50–79) → revisar;
  Baixa (< 50) → bloquear até corrigir o cadastro.
- **Produção:** depois da triagem, validar em base postal e então geocodificar,
  registrando fonte, confiança e resultado da revisão.
"""
)
ui.provenance_expander(
    fonte="Endereços sintéticos curados com defeitos cadastrais representativos.",
    tipo="Sintético e determinístico.",
    producao="Validação postal + geocoding com score de confiança e revisão humana.",
    limitacoes=(
        "Não consulta DNE/CNEFE nem API de geocoding; não corrige CEP ou endereço. "
        "A amostra demonstra somente prontidão e triagem."
    ),
)
ui.demo_cta(next_demo_path="pages/precificacao_frete.py")
ui.footer()
