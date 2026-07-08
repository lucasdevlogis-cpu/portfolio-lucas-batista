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
      page.getByRole("heading", { name: "Evolução da carreira até 2026", level: 2 }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Contato profissional direto", level: 2 }),
    ).toBeVisible();
  });

  test("exibe FAQ de triagem na seção Perfil", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByText("Perguntas que este perfil responde"),
    ).toBeVisible();
  });
});
