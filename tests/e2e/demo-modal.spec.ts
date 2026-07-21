import { expect, test, type Page } from "@playwright/test";

async function openCases(page: Page) {
  await page.goto("/#cases", { waitUntil: "domcontentloaded" });
  await expect(page.getByTestId("case-card").first()).toBeVisible();
}

test.describe("Modal de demo", () => {
  test("abre prova âncora inline e mantém rota pública", async ({ page }) => {
    await openCases(page);
    const card = page
      .getByTestId("case-card")
      .filter({ hasText: "Simulador de Custo de Frete" })
      .first();
    await card.scrollIntoViewIfNeeded();

    const openButton = card.getByRole("button", {
      name: /Explorar Frete: Simulador de Custo de Frete/i,
    });
    await expect(openButton).toBeEnabled();
    await openButton.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await expect(
      dialog.getByRole("heading", { name: "Simulador de Custo de Frete" }),
    ).toBeVisible();

    await expect(dialog.locator("iframe")).toHaveCount(0);
    await expect(dialog.getByText("Frete estimado")).toBeVisible();
    await expect(dialog.getByText(/Dados sintéticos e coordenadas aproximadas/i)).toBeVisible();

    const externalLink = dialog.getByRole("link", {
      name: /Abrir em nova aba/i,
    });
    await expect(externalLink).toBeVisible();
    await expect(externalLink).toHaveAttribute("href", "/provas/precificacao_frete");
    await expect(externalLink).toHaveAttribute("target", "_blank");

    await dialog.getByRole("button", { name: /Fechar/i }).click();
    await expect(dialog).not.toBeVisible();
  });

  test("mantém demos secundárias em iframe Streamlit", async ({ page }) => {
    await openCases(page);
    const item = page
      .getByTestId("case-library-item")
      .filter({ hasText: "Promessa de Entrega por CEP" });
    await item.scrollIntoViewIfNeeded();
    await item.getByRole("button", { name: /Explorar case: Promessa de Entrega por CEP/i }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("iframe")).toHaveAttribute("src", /embed=true/);
    await expect(dialog.getByRole("link", { name: /Abrir em nova aba/i })).toHaveAttribute(
      "href",
      /streamlit\.app/,
    );
  });

  test("fecha com ESC e devolve o foco ao acionador", async ({ page }) => {
    await openCases(page);
    const card = page
      .getByTestId("case-card")
      .filter({ hasText: "Simulador de Custo de Frete" })
      .first();
    const openButton = card.getByRole("button", {
      name: /Explorar Frete: Simulador de Custo de Frete/i,
    });

    await expect(openButton).toBeEnabled();
    await openButton.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect
      .poll(() => page.evaluate(() => Boolean(document.activeElement?.closest('[role="dialog"]'))))
      .toBe(true);

    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(openButton).toBeFocused();
  });

  test("só monta o iframe complementar após consentimento no mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await openCases(page);

    const item = page
      .getByTestId("case-library-item")
      .filter({ hasText: "Promessa de Entrega por CEP" });
    await item.scrollIntoViewIfNeeded();
    await item.getByRole("button", { name: /Explorar case: Promessa de Entrega por CEP/i }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("iframe")).toHaveCount(0);

    await dialog.getByRole("button", { name: "Carregar demo aqui" }).click();
    await expect(dialog.locator("iframe")).toHaveAttribute("src", /embed=true/);
  });

  test("roadmap não oferece botão de demo", async ({ page }) => {
    await openCases(page);
    const roadmap = page.getByTestId("case-roadmap");
    await roadmap.scrollIntoViewIfNeeded();
    await expect(roadmap).toBeVisible();
    await expect(
      roadmap.getByRole("button", { name: /Abrir demonstração|Explorar/i }),
    ).not.toBeVisible();
  });
});
