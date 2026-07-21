"""Entrypoint único do casebook exploratório em Streamlit."""

import streamlit as st
from catalog import PUBLISHED_DEMOS
from presentation import ui

ui.configure_app()

home = st.Page("pages/home.py", title="Visão geral", url_path="", default=True)
anchors = [
    st.Page(entry.page, title=entry.title, url_path=entry.slug)
    for entry in PUBLISHED_DEMOS
    if entry.tier == "anchor" and entry.page and entry.slug
]
complementary = [
    st.Page(entry.page, title=entry.title, url_path=entry.slug)
    for entry in PUBLISHED_DEMOS
    if entry.tier == "complementary" and entry.page and entry.slug
]
method = st.Page("pages/metodos.py", title="Dados e métodos", url_path="metodos")

navigation = st.navigation(
    {
        "Casebook": [home],
        "Provas âncora": anchors,
        "Provas complementares": complementary,
        "Transparência": [method],
    },
    position="hidden" if ui.is_embed() else "sidebar",
)
navigation.run()
