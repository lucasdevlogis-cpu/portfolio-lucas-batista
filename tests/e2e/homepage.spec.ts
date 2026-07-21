import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("carrega com metadados e seções essenciais", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Lucas Batista \| Operações, Dados e Inteligência Logística/);

    await expect(
      page.getByRole("heading", { name: "Lucas Farias Batista", level: 1 }),
    ).toBeVisible();

    await expect(page.getByRole("link", { name: /Ver provas técnicas/i })).toBeVisible();

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
    await expect(page.getByRole("link", { name: /LinkedIn.*Abrir perfil/i })).toBeVisible();
  });

  test("reduz movimento quando solicitado pelo sistema", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const motion = await page
      .getByRole("link", { name: /Ver provas técnicas/i })
      .evaluate((node) => {
        const rootStyle = getComputedStyle(document.documentElement);
        const controlStyle = getComputedStyle(node);
        const durations = controlStyle.transitionDuration.split(",").map((value) => {
          const duration = Number.parseFloat(value);
          return value.trim().endsWith("ms") ? duration / 1000 : duration;
        });
        return {
          scrollBehavior: rootStyle.scrollBehavior,
          maxTransitionSeconds: Math.max(...durations),
        };
      });

    expect(motion.scrollBehavior).toBe("auto");
    expect(motion.maxTransitionSeconds).toBeLessThanOrEqual(0.001);
  });
});
