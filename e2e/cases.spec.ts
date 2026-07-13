import { expect, test } from "@playwright/test";

test.describe("Cases e biblioteca", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#cases");
    await page.waitForLoadState("networkidle");
  });

  test("exibe 3 cards âncora com thumbnails", async ({ page }) => {
    const cards = page.getByTestId("case-card");
    await expect(cards).toHaveCount(3);

    for (const titulo of [
      "Simulador de Custo de Frete",
      "Mini Torre de Controle de Entregas",
      "Roteirização Urbana (CVRP)",
    ]) {
      await expect(
        page.getByRole("heading", { name: titulo, level: 3 }).first(),
      ).toBeVisible();
    }

    // Cada card âncora deve ter uma thumbnail (img ou svg)
    for (const card of await cards.all()) {
      await expect(card.locator("svg, img").first()).toBeVisible();
    }
  });

  test("filtros da biblioteca atualizam a lista de cases", async ({ page }) => {
    const biblioteca = page.getByTestId("case-library-item").first();
    await biblioteca.scrollIntoViewIfNeeded();

    // Desktop e mobile renderizam botões simultaneamente; usamos o primeiro visível.
    // O rótulo inclui a contagem (ex.: "Todos 7"), então usamos regex.
    const filtroTodos = page.getByRole("button", { name: /^Todos/ }).first();
    await expect(filtroTodos).toHaveAttribute("aria-pressed", "true");

    // Não deve haver filtros com contagem zero acessíveis.
    await expect(
      page.getByRole("button", { name: /Frete e Custo/ }),
    ).toHaveCount(0);
    await expect(
      page.getByRole("button", { name: /Operação de CD/ }),
    ).toHaveCount(0);

    const itensBiblioteca = page.getByTestId("case-library-item");
    const totalTodos = await itensBiblioteca.count();
    expect(totalTodos).toBe(7);

    await page
      .getByRole("button", { name: /^Roteirização e SLA/ })
      .first()
      .click();

    await expect(
      page.getByRole("button", { name: /^Roteirização e SLA/ }).first(),
    ).toHaveAttribute("aria-pressed", "true");

    await expect(
      page.getByRole("button", { name: /^Todos/ }).first(),
    ).toHaveAttribute("aria-pressed", "false");

    await expect(itensBiblioteca).toHaveCount(2);
  });

  test("cards âncora usam numeração do ID e CTAs específicos", async ({
    page,
  }) => {
    const cards = page.getByTestId("case-card");
    await expect(cards.nth(2)).toContainText("Case 08");
    await expect(cards.nth(2)).not.toContainText("Case 03");

    await expect(
      page.getByRole("button", {
        name: "Abrir demonstração: Simulador de Custo de Frete",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", {
        name: "Abrir demonstração: Mini Torre de Controle de Entregas",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", {
        name: "Abrir demonstração: Roteirização Urbana (CVRP)",
      }),
    ).toBeVisible();
  });
});
