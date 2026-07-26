import { expect, test } from "@playwright/test";

test.describe("Cases e comparativo de provas", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#cases", { waitUntil: "domcontentloaded" });
    await expect(page.getByTestId("case-card").first()).toBeVisible();
  });

  test("exibe 3 cards âncora com thumbnails", async ({ page }) => {
    const cards = page.getByTestId("case-card");
    await expect(cards).toHaveCount(3);

    for (const titulo of [
      "Simulador de Custo de Frete",
      "Mini Torre de Controle de Entregas",
      "Roteirização Urbana (CVRP)",
    ]) {
      await expect(page.getByRole("heading", { name: titulo, level: 3 }).first()).toBeVisible();
    }

    for (const card of await cards.all()) {
      await expect(card.locator("svg, img").first()).toBeVisible();
    }
  });

  test("compara as 10 provas com âncoras primeiro e tiers derivados", async ({ page }) => {
    const comparison = page.getByRole("region", { name: "Dez provas. Repertório comparável." });
    const items = comparison.getByTestId("proof-comparison-item");
    await items.first().scrollIntoViewIfNeeded();

    await expect(items).toHaveCount(10);
    await expect(
      comparison.locator('[data-testid="proof-comparison-item"][data-proof-tier="anchor"]'),
    ).toHaveCount(3);
    await expect(
      comparison.locator('[data-testid="proof-comparison-item"][data-proof-tier="complementary"]'),
    ).toHaveCount(7);

    const orderedSlugs = await items.evaluateAll((rows) =>
      rows.map((row) => row.getAttribute("data-proof-slug")),
    );
    expect(orderedSlugs).toEqual([
      "precificacao_frete",
      "mini_torre_controle",
      "cvrp_urbano",
      "promessa_cep",
      "ship_from_store",
      "auditoria_endereco",
      "classificador_ocorrencias",
      "vrptw_ultima_milha",
      "rede_interhubs",
      "tsp_baseline_sp",
    ]);

    await expect(comparison.getByText("públicas", { exact: true }).locator("..")).toContainText(
      "10",
    );
    await expect(comparison.getByText("âncoras", { exact: true }).locator("..")).toContainText("3");
    await expect(
      comparison.getByText("complementares", { exact: true }).locator(".."),
    ).toContainText("7");
  });

  test("filtros por domínio usam contagens reais", async ({ page }) => {
    const comparison = page.getByRole("region", { name: "Dez provas. Repertório comparável." });
    const items = comparison.getByTestId("proof-comparison-item");
    await items.first().scrollIntoViewIfNeeded();

    const filtroTodos = comparison.getByRole("button", { name: /^Todos 10$/ });
    await expect(filtroTodos).toHaveAttribute("aria-pressed", "true");
    await expect(comparison.getByRole("button", { name: /^Roteirização e SLA 4$/ })).toBeVisible();
    await expect(comparison.getByRole("button", { name: /Operação de CD/ })).toHaveCount(0);

    await comparison.getByRole("button", { name: /^Roteirização e SLA 4$/ }).click();
    await expect(items).toHaveCount(4);
    await expect(comparison).toContainText("4 provas públicas neste recorte.");
    await expect(filtroTodos).toHaveAttribute("aria-pressed", "false");
  });

  test("cada linha expõe decisão, método e CTA acessível", async ({ page }) => {
    const comparison = page.getByRole("region", { name: "Dez provas. Repertório comparável." });
    const items = comparison.getByTestId("proof-comparison-item");
    await items.first().scrollIntoViewIfNeeded();

    const freight = items.filter({ hasText: "Simulador de Custo de Frete" });
    await expect(freight).toContainText(
      "Priorizar negociações e investigar os corredores que concentram custo.",
    );
    await expect(freight).toContainText(
      "Componentes de frete + piso ANTT demonstrativo + sensibilidade ao diesel.",
    );
    await expect(
      freight.getByRole("button", { name: "Abrir prova: Simulador de Custo de Frete" }),
    ).toBeVisible();

    const emptyCells = await items.evaluateAll(
      (rows) =>
        rows.filter((row) => {
          const text = row.textContent?.trim() ?? "";
          return !text || !text.includes("Abrir prova");
        }).length,
    );
    expect(emptyCells).toBe(0);
  });

  test("filtros e CTAs preservam teclado, aria e touch target", async ({ page }) => {
    const comparison = page.getByRole("region", { name: "Dez provas. Repertório comparável." });
    const allFilter = comparison.getByRole("button", { name: /^Todos 10$/ });
    await allFilter.scrollIntoViewIfNeeded();
    await allFilter.focus();
    await expect(allFilter).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(comparison.getByRole("button", { name: /^Frete e Custo 1$/ })).toBeFocused();

    const undersized = await comparison.locator("button").evaluateAll((controls) =>
      controls
        .filter((control) => {
          const rect = control.getBoundingClientRect();
          return rect.width < 44 || rect.height < 44;
        })
        .map((control) => control.getAttribute("aria-label") ?? control.textContent?.trim()),
    );
    expect(undersized).toEqual([]);
  });

  test("cards e comparativo não geram overflow em 375 px", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 900 });
    await page.goto("/#cases", { waitUntil: "domcontentloaded" });
    await expect(page.getByTestId("proof-comparison-item").first()).toBeVisible();

    const overflow = await page.evaluate(() => {
      const tolerance = 1;
      const issues: string[] = [];
      const pageRoot = document.documentElement;

      if (pageRoot.scrollWidth > pageRoot.clientWidth + tolerance) {
        issues.push(`page:${pageRoot.scrollWidth}>${pageRoot.clientWidth}`);
      }

      for (const row of document.querySelectorAll(
        '[data-testid="case-card"], [data-testid="proof-comparison-item"]',
      )) {
        const rowRect = row.getBoundingClientRect();
        for (const control of row.querySelectorAll("button, a")) {
          const rect = control.getBoundingClientRect();
          if (rect.left < rowRect.left - tolerance || rect.right > rowRect.right + tolerance) {
            issues.push(control.getAttribute("aria-label") ?? "controle sem rótulo");
          }
        }
      }

      return issues;
    });

    expect(overflow).toEqual([]);
  });

  test("cards âncora usam numeração do ID e CTAs específicos", async ({ page }) => {
    const cards = page.getByTestId("case-card");
    await expect(cards.nth(2)).toContainText("08 / P0");
    await expect(cards.nth(2)).not.toContainText("03 / P0");

    await expect(
      page.getByRole("button", {
        name: "Explorar Frete: Simulador de Custo de Frete",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", {
        name: "Explorar Torre: Mini Torre de Controle de Entregas",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", {
        name: "Explorar CVRP: Roteirização Urbana (CVRP)",
      }),
    ).toBeVisible();
  });
});
