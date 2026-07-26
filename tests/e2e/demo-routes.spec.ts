import { expect, test } from "@playwright/test";

test.describe("Rotas públicas das provas React", () => {
  for (const slug of [
    "precificacao_frete",
    "mini_torre_controle",
    "cvrp_urbano",
    "promessa_cep",
    "ship_from_store",
    "rede_interhubs",
    "vrptw_ultima_milha",
    "auditoria_endereco",
    "tsp_baseline_sp",
  ]) {
    test(`renderiza ${slug} sem depender do Streamlit`, async ({ page }) => {
      await page.goto(`/provas/${slug}`);
      await expect(page.getByText("Prova técnica · camada interativa")).toBeVisible();
      await expect(
        page.getByRole("main").filter({ hasText: "Prova técnica · camada interativa" }),
      ).toBeVisible();
      await expect(page.locator("canvas, svg").first()).toBeVisible();
      await expect(page.getByRole("link", { name: /Voltar às provas/i })).toHaveAttribute(
        "href",
        "/#cases",
      );
    });
  }
});
