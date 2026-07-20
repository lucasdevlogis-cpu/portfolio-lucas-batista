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

  test("CTAs dos cases não estouram cards nem sobrepõem métricas", async ({
    page,
  }) => {
    for (const width of [390, 768, 1024, 1280, 1366, 1440]) {
      await page.setViewportSize({ width, height: 1100 });
      await page.goto("/#cases");
      await page.waitForLoadState("networkidle");

      const overflow = await page.evaluate(() => {
        const tolerance = 1;
        const issues: string[] = [];
        const pageRoot = document.documentElement;

        if (pageRoot.scrollWidth > pageRoot.clientWidth + tolerance) {
          issues.push(
            `page:${pageRoot.scrollWidth}>${pageRoot.clientWidth}`,
          );
        }

        for (const card of document.querySelectorAll(
          '[data-testid="case-card"], [data-testid="case-library-item"]',
        )) {
          const cardRect = card.getBoundingClientRect();
          const title =
            card.querySelector("h3")?.textContent?.trim() ?? "case sem título";

          for (const control of card.querySelectorAll("button, a")) {
            const rect = control.getBoundingClientRect();
            const label =
              control.getAttribute("aria-label") ??
              control.textContent?.trim() ??
              "controle sem rótulo";

            if (rect.left < cardRect.left - tolerance) {
              issues.push(`${title}:${label}:overflow-left`);
            }
            if (rect.right > cardRect.right + tolerance) {
              issues.push(`${title}:${label}:overflow-right`);
            }
            if (control.scrollWidth > control.clientWidth + tolerance) {
              issues.push(`${title}:${label}:text-clipped`);
            }
          }
        }

        for (const item of document.querySelectorAll(
          '[data-testid="case-library-item"]',
        )) {
          const children = Array.from(item.children);
          const metric = children[2];
          const actions = children[3];

          if (!metric || !actions) continue;

          const metricRect = metric.getBoundingClientRect();
          const actionsRect = actions.getBoundingClientRect();
          const title =
            item.querySelector("h3")?.textContent?.trim() ??
            "case de biblioteca";

          if (actionsRect.top < metricRect.bottom - tolerance) {
            for (const control of actions.querySelectorAll("button, a")) {
              const controlRect = control.getBoundingClientRect();
              if (controlRect.left < metricRect.right - tolerance) {
                issues.push(`${title}:cta-overlaps-metric`);
              }
            }
          }
        }

        return issues;
      });

      expect(overflow, `viewport ${width}px`).toEqual([]);
    }
  });
});
