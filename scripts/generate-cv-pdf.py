"""Generate executive CV PDF from portfolio content (Executive Proof System)."""

from __future__ import annotations

from pathlib import Path

from fpdf import FPDF

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "lucas-batista-cv.pdf"
ARIAL = Path(r"C:\Windows\Fonts\arial.ttf")
FONT = "Arial"

PRIMARY = (23, 50, 77)  # #17324d
INK = (17, 24, 39)  # #111827
MUTED = (75, 85, 99)  # #4b5563
ACCENT = (15, 118, 110)  # #0f766e


class CvPdf(FPDF):
    def header(self) -> None:
        pass

    def footer(self) -> None:
        self.set_y(-12)
        self.set_font(FONT, "", 8)
        self.set_text_color(*MUTED)
        self.cell(0, 8, "Lucas Batista — CV executivo | portfolio-lucas-batista.vercel.app", align="C")


def section_title(pdf: CvPdf, title: str) -> None:
    pdf.ln(4)
    pdf.set_font(FONT, "", 11)
    pdf.set_text_color(*PRIMARY)
    pdf.cell(0, 7, title, new_x="LMARGIN", new_y="NEXT")
    pdf.set_draw_color(216, 207, 191)
    pdf.line(pdf.l_margin, pdf.get_y(), pdf.w - pdf.r_margin, pdf.get_y())
    pdf.ln(3)


def bullet(pdf: CvPdf, text: str) -> None:
    pdf.set_font(FONT, "", 10)
    pdf.set_text_color(*INK)
    width = pdf.w - pdf.l_margin - pdf.r_margin
    pdf.multi_cell(width, 5.5, f"- {text}")


def main() -> None:
    pdf = CvPdf()
    pdf.add_font(FONT, "", str(ARIAL))
    pdf.set_auto_page_break(auto=True, margin=16)
    pdf.add_page()
    pdf.set_margins(18, 18, 18)

    pdf.set_font(FONT, "", 22)
    pdf.set_text_color(*INK)
    pdf.cell(0, 10, "Lucas Batista", new_x="LMARGIN", new_y="NEXT")

    pdf.set_font(FONT, "", 12)
    pdf.set_text_color(*PRIMARY)
    pdf.cell(0, 7, "Operações, Dados e Inteligência Logística", new_x="LMARGIN", new_y="NEXT")

    pdf.set_font(FONT, "", 10)
    pdf.set_text_color(*MUTED)
    width = pdf.w - pdf.l_margin - pdf.r_margin
    pdf.multi_cell(
        width,
        5.5,
        "Perfil híbrido para operações, analytics e produto interno. +10 anos em logística "
        "com demos navegáveis de raciocínio operacional, frete, SLA, last mile e roteirização.",
    )

    pdf.ln(2)
    pdf.set_font(FONT, "", 9)
    pdf.set_text_color(*ACCENT)
    pdf.cell(
        0,
        5,
        "lucas.farias.log@outlook.com  |  linkedin.com/in/lucasfariaslog  |  github.com/lucasdevlogis-cpu",
        new_x="LMARGIN",
        new_y="NEXT",
    )

    section_title(pdf, "Posições-alvo")
    for role in [
        "Operations Analytics",
        "Supply Chain Analytics",
        "Logistics Intelligence",
        "Product Ops / Internal Tools",
        "BI e automação operacional",
    ]:
        bullet(pdf, role)

    section_title(pdf, "Sinais de senioridade")
    bullet(pdf, "+10 anos em operações logísticas (transporte, varejo, e-commerce, indústria)")
    bullet(pdf, "Transição para inteligência operacional: dados, automação e produtos internos")
    bullet(pdf, "10 demos navegáveis com contexto de negócio, métrica e limitação declarada")
    bullet(pdf, "Comunicação executiva: decisão, trade-off e próxima ação sem esconder premissas")

    section_title(pdf, "Domínios e frentes de fit")
    for item in [
        "Precificação e custo de frete (NTC, ANTT, ANP)",
        "Torre de controle e visibilidade operacional (TMS/WMS)",
        "Roteirização urbana e última milha (CVRP, VRPTW, OR-Tools, PyVRP)",
        "Rede logística, promessa por CEP e ship-from-store",
        "Classificação de ocorrências e auditoria de endereço (NLP, DNE/CNEFE)",
    ]:
        bullet(pdf, item)

    section_title(pdf, "Stack")
    bullet(pdf, "Python, SQL, BI, Streamlit, Next.js, Plotly, OR-Tools, PyVRP, NetworkX")
    bullet(pdf, "IA aplicada com limites declarados; foco em ferramentas úteis para operação")

    section_title(pdf, "Provas técnicas (portfólio)")
    bullet(pdf, "Precificação de Frete BR — custo por rota e composição tarifária")
    bullet(pdf, "Mini Torre de Controle — visibilidade de exceções e SLA")
    bullet(pdf, "Roteirização Urbana CVRP — otimização com restrições reais")
    pdf.set_font(FONT, "", 9)
    pdf.set_text_color(*MUTED)
    width = pdf.w - pdf.l_margin - pdf.r_margin
    pdf.multi_cell(
        width,
        5,
        "Demais cases e demos interativas: portfolio-lucas-batista-murex.vercel.app#cases",
    )

    section_title(pdf, "Disponibilidade")
    bullet(pdf, "Aberto a conversas com headhunters, recrutadores e lideranças de operações orientadas por dados")
    bullet(pdf, "Preferência por ambientes onde dados, processo e execução operacional precisam conversar")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(OUT))
    print(f"[generate-cv-pdf] OK — {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
