import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("carrega com metadados e seções essenciais", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(
      /Lucas Batista \| Operações, Dados e Inteligência Logística/,
    );

    await expect(
      page.getByRole("heading", { name: "Lucas Farias Batista", level: 1 }),
    ).toBeVisible();

    await expect(
      page.getByRole("link", { name: /Ver provas técnicas/i }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "O que um headhunter precisa entender rápido", level: 2 }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Cases âncora para avaliação profissional", level: 2 }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Experiência profissional", level: 2 }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Contato profissional", level: 2 }),
    ).toBeVisible();
  });

  test("exibe CTAs de contato na seção Contato", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("link", { name: /linkedin\.com\/in\/lucasfariaslog/i }),
    ).toBeVisible();
  });
});
