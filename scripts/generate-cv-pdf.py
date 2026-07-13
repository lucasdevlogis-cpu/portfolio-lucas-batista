"""Generate executive CV PDF from content.ts export (Executive Proof System)."""

from __future__ import annotations

import json
import sys
from pathlib import Path

from fpdf import FPDF

ROOT = Path(__file__).resolve().parents[1]
EXPORT = ROOT / "public" / "cv-export.json"
OUT = ROOT / "public" / "lucas-batista-cv.pdf"

PRIMARY = (23, 50, 77)
INK = (17, 24, 39)
MUTED = (75, 85, 99)
ACCENT = (15, 118, 110)


def find_font() -> Path:
    candidates = [
        ROOT / "scripts" / "assets" / "DejaVuSans.ttf",
        Path(r"C:\Windows\Fonts\arial.ttf"),
        Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
        Path("/Library/Fonts/Arial.ttf"),
    ]
    for path in candidates:
        if path.is_file():
            return path
    raise FileNotFoundError(
        "Nenhuma fonte TTF encontrada. Coloque DejaVuSans.ttf em scripts/assets/ "
        "ou instale Arial/DejaVu no sistema."
    )


class CvPdf(FPDF):
    def header(self) -> None:
        pass

    def footer(self) -> None:
        self.set_y(-12)
        self.set_font(FONT, "", 8)
        self.set_text_color(*MUTED)
        site = self._site_label
        self.cell(0, 8, f"Lucas Batista — CV executivo | {site}", align="C")


FONT = "CvFont"


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
    if not EXPORT.is_file():
        print(
            "[generate-cv-pdf] cv-export.json ausente. Rode: npm run cv:export",
            file=sys.stderr,
        )
        sys.exit(1)

    data = json.loads(EXPORT.read_text(encoding="utf-8"))
    font_path = find_font()

    pdf = CvPdf()
    pdf._site_label = data["siteUrl"].replace("https://", "").replace("http://", "")
    pdf.add_font(FONT, "", str(font_path))
    pdf.set_auto_page_break(auto=True, margin=16)
    pdf.add_page()
    pdf.set_margins(18, 18, 18)

    width = pdf.w - pdf.l_margin - pdf.r_margin

    pdf.set_font(FONT, "", 22)
    pdf.set_text_color(*INK)
    pdf.cell(0, 10, data["nome"], new_x="LMARGIN", new_y="NEXT")

    pdf.set_font(FONT, "", 12)
    pdf.set_text_color(*PRIMARY)
    pdf.cell(0, 7, data["titulo"], new_x="LMARGIN", new_y="NEXT")

    pdf.set_font(FONT, "", 10)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(width, 5.5, f"{data['headline']}. {data['subheadline']}")

    pdf.ln(2)
    pdf.set_font(FONT, "", 9)
    pdf.set_text_color(*ACCENT)
    pdf.cell(
        0,
        5,
        f"{data['email']}  |  {data['linkedin']}  |  {data['github']}",
        new_x="LMARGIN",
        new_y="NEXT",
    )

    section_title(pdf, "Sinais de senioridade")
    bullet(pdf, data["senioridade"])
    bullet(pdf, data["modeloAtuacao"])

    section_title(pdf, "Trajetória")
    for exp in data["experiencias"]:
        pdf.set_font(FONT, "", 10)
        pdf.set_text_color(*INK)
        pdf.cell(0, 5.5, f"{exp['cargo']} — {exp['empresa']}", new_x="LMARGIN", new_y="NEXT")
        pdf.set_font(FONT, "", 9)
        pdf.set_text_color(*MUTED)
        pdf.cell(0, 5, exp["periodo"], new_x="LMARGIN", new_y="NEXT")
        for atrib in exp["atribuicoes"]:
            bullet(pdf, atrib)
        for destaque in exp.get("destaques", []):
            pdf.set_font(FONT, "", 9)
            pdf.set_text_color(*ACCENT)
            width = pdf.w - pdf.l_margin - pdf.r_margin
            pdf.multi_cell(width, 5.5, f"• {destaque}")
        pdf.ln(1)

    section_title(pdf, "Domínios e frentes de fit")
    for item in data["dominios"]:
        bullet(pdf, item)

    section_title(pdf, "Stack")
    bullet(pdf, ", ".join(data["stackTags"]))

    section_title(pdf, "Provas técnicas (portfólio)")
    for case in data["casesDestaque"]:
        bullet(pdf, f"{case['titulo']} — {case['metrica']}")
    pdf.set_font(FONT, "", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(
        width,
        5,
        f"Demais cases: {data['siteUrl']}#cases",
    )

    section_title(pdf, "Disponibilidade")
    bullet(pdf, data["disponibilidade"])

    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(OUT))
    print(f"[generate-cv-pdf] OK — {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
