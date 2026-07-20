import { expect, test } from "@playwright/test";

test.describe("Rotas públicas das provas âncora", () => {
  for (const slug of ["precificacao_frete", "mini_torre_controle", "cvrp_urbano"]) {
    test(`renderiza ${slug} sem depender do Streamlit`, async ({ page }) => {
      await page.goto(`/provas/${slug}`);
      await expect(page.locator("main.min-h-screen")).toBeVisible();
      await expect(page.getByText("Prova técnica · camada interativa")).toBeVisible();
      await expect(page.locator("canvas, svg").first()).toBeVisible();
      await expect(page.getByRole("link", { name: /Voltar às provas/i })).toHaveAttribute("href", "/#cases");
    });
  }
});
