import { test, expect } from "@playwright/test";

test.describe("Navegação", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("links do header navegam para âncoras corretas", async ({ page }) => {
    const links = [
      { label: "Perfil", hash: "#perfil" },
      { label: "Provas", hash: "#cases" },
      { label: "Trajetória", hash: "#trajetoria" },
      { label: "Contato", hash: "#contato" },
    ];

    for (const { label, hash } of links) {
      await page.getByRole("link", { name: label, exact: true }).first().click();
      await expect(page).toHaveURL(new RegExp(`\\${hash}$`));
      await expect(page.locator(hash)).toBeInViewport();
    }
  });

  test("CTA primário do hero navega para #cases", async ({ page }) => {
    await page.getByRole("link", { name: /Ver provas técnicas/i }).click();
    await expect(page).toHaveURL(/#cases$/);
    await expect(page.locator("#cases")).toBeInViewport();
  });
});
