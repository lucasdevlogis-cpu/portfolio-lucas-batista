import { test, expect } from "@playwright/test";

test.describe("Modal de demo", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#cases");
    await page.waitForLoadState("networkidle");
  });

  test("abre modal com iframe e link externo", async ({ page }) => {
    const card = page
      .getByTestId("case-card")
      .filter({ hasText: "Simulador de Custo de Frete" })
      .first();
    await card.scrollIntoViewIfNeeded();

    const openButton = card.getByRole("button", { name: /Abrir demo/i });
    await expect(openButton).toBeVisible();
    await openButton.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await expect(
      dialog.getByRole("heading", { name: "Simulador de Custo de Frete" }),
    ).toBeVisible();

    const iframe = dialog.locator("iframe");
    await expect(iframe).toBeVisible();
    await expect(iframe).toHaveAttribute("src", /embed=true/);

    const externalLink = dialog.getByRole("link", { name: /Abrir demo em nova aba/i });
    await expect(externalLink).toBeVisible();
    await expect(externalLink).toHaveAttribute("href", /streamlit\.app/);
    await expect(externalLink).toHaveAttribute("target", "_blank");

    await dialog.getByRole("button", { name: /Fechar/i }).click();
    await expect(dialog).not.toBeVisible();
  });

  test("roadmap não oferece botão de demo", async ({ page }) => {
    const roadmap = page.getByTestId("case-roadmap");
    await roadmap.scrollIntoViewIfNeeded();
    await expect(roadmap).toBeVisible();
    await expect(
      roadmap.getByRole("button", { name: /Abrir demo/i }),
    ).not.toBeVisible();
  });
});
