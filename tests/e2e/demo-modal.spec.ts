import { expect, test, type Page } from "@playwright/test";

async function openCases(page: Page) {
  await page.goto("/#cases", { waitUntil: "domcontentloaded" });
  await expect(page.getByTestId("case-card").first()).toBeVisible();
}

test.describe("Modal de demo", () => {
  test("abre prova âncora inline e mantém rota pública", async ({ page }) => {
    await openCases(page);
    const card = page
      .getByTestId("case-card")
      .filter({ hasText: "Simulador de Custo de Frete" })
      .first();
    await card.scrollIntoViewIfNeeded();

    const openButton = card.getByRole("button", {
      name: /Explorar Frete: Simulador de Custo de Frete/i,
    });
    await expect(openButton).toBeEnabled();
    await openButton.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await expect(
      dialog.getByRole("heading", { name: "Simulador de Custo de Frete" }),
    ).toBeVisible();

    await expect(dialog.locator("iframe")).toHaveCount(0);
    await expect(dialog.getByText("Frete estimado")).toBeVisible();
    await expect(dialog.getByText(/Dados demonstrativos\. O mapa apoia a leitura/i)).toBeVisible();

    const externalLink = dialog.getByRole("link", {
      name: /Abrir em nova aba/i,
    });
    await expect(externalLink).toBeVisible();
    await expect(externalLink).toHaveAttribute("href", "/provas/precificacao_frete");
    await expect(externalLink).toHaveAttribute("target", "_blank");

    await dialog.getByRole("button", { name: /Fechar/i }).click();
    await expect(dialog).not.toBeVisible();
  });

  test("abre prova migrada (Promessa de CEP) inline sem iframe", async ({ page }) => {
    await openCases(page);
    const item = page
      .getByTestId("proof-comparison-item")
      .filter({ hasText: "Promessa de Entrega por CEP" });
    await item.scrollIntoViewIfNeeded();
    await item.getByRole("button", { name: /Abrir prova: Promessa de Entrega por CEP/i }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("iframe")).toHaveCount(0);
    await expect(dialog.getByText("Região de maior risco")).toBeVisible();
    await expect(dialog.getByRole("link", { name: /Abrir em nova aba/i })).toHaveAttribute(
      "href",
      "/provas/promessa_cep",
    );
  });

  test("abre prova migrada (Ship from Store) inline sem iframe", async ({ page }) => {
    await openCases(page);
    const item = page
      .getByTestId("proof-comparison-item")
      .filter({ hasText: "Ship from Store / Origem Ótima" });
    await item.scrollIntoViewIfNeeded();
    await item.getByRole("button", { name: /Abrir prova: Ship from Store/i }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("iframe")).toHaveCount(0);
    await expect(dialog.getByText("Economia vs baseline")).toBeVisible();
    await expect(dialog.getByRole("link", { name: /Abrir em nova aba/i })).toHaveAttribute(
      "href",
      "/provas/ship_from_store",
    );
  });

  test("abre prova migrada (Rede Inter-hubs) inline sem iframe", async ({ page }) => {
    await openCases(page);
    const item = page
      .getByTestId("proof-comparison-item")
      .filter({ hasText: "Rede Inter-hubs / Corredores" });
    await item.scrollIntoViewIfNeeded();
    await item.getByRole("button", { name: /Abrir prova: Rede Inter-hubs/i }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("iframe")).toHaveCount(0);
    await expect(dialog.getByText("Prova migrada · leitura rápida")).toBeVisible();
    await expect(dialog.getByText("Melhor corredor")).toBeVisible();
    await expect(dialog.getByRole("link", { name: /Abrir em nova aba/i })).toHaveAttribute(
      "href",
      "/provas/rede_interhubs",
    );
  });

  test("abre prova migrada (VRPTW) inline com evidências temporais", async ({ page }) => {
    await openCases(page);
    const item = page
      .getByTestId("proof-comparison-item")
      .filter({ hasText: "Última Milha com Janelas (VRPTW)" });
    await item.scrollIntoViewIfNeeded();
    await item
      .getByRole("button", { name: /Abrir prova: Última Milha com Janelas \(VRPTW\)/i })
      .click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("iframe")).toHaveCount(0);
    await expect(dialog.getByText("Violações SLA")).toBeVisible();
    await expect(dialog.getByText("Espera total")).toBeVisible();
    await expect(dialog.getByText("Janela prometida × chegada planejada")).toBeVisible();
    await expect(dialog.getByRole("link", { name: /Abrir em nova aba/i })).toHaveAttribute(
      "href",
      "/provas/vrptw_ultima_milha",
    );
  });

  test("abre prova migrada (Auditoria de Endereço) inline com triagem territorial", async ({
    page,
  }) => {
    await openCases(page);
    const item = page
      .getByTestId("proof-comparison-item")
      .filter({ hasText: "Auditoria de Endereço e Geocoding" });
    await item.scrollIntoViewIfNeeded();
    await item.getByRole("button", { name: /Abrir prova: Auditoria de Endereço/i }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("iframe")).toHaveCount(0);
    await expect(dialog.getByText("Bloquear").first()).toBeVisible();
    await expect(dialog.getByText("Regras acionadas \(ocorrências\)")).toBeVisible();
    await expect(dialog.getByText(/45 exibidos; 15 bloqueados fora do mapa/i)).toBeVisible();
    await expect(dialog.getByRole("link", { name: /Abrir em nova aba/i })).toHaveAttribute(
      "href",
      "/provas/auditoria_endereco",
    );
  });

  test("abre prova migrada (TSP) inline com sequência heurística", async ({ page }) => {
    await openCases(page);
    const item = page
      .getByTestId("proof-comparison-item")
      .filter({ hasText: "Sequência de Visitas (TSP)" });
    await item.scrollIntoViewIfNeeded();
    await item.getByRole("button", { name: /Abrir prova: Sequência de Visitas/i }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("iframe")).toHaveCount(0);
    await expect(dialog.getByText("Rota heurística")).toBeVisible();
    await expect(dialog.getByRole("heading", { name: "Distância da rota fechada" })).toBeVisible();
    await expect(dialog.getByText(/Sequência 1–7:/i)).toBeVisible();
    await expect(dialog.getByRole("link", { name: /Abrir em nova aba/i })).toHaveAttribute(
      "href",
      "/provas/tsp_baseline_sp",
    );
  });

  test("abre Classificador inline com governança humana", async ({ page }) => {
    await openCases(page);
    const item = page
      .getByTestId("proof-comparison-item")
      .filter({ hasText: "Classificador de Ocorrências Operacionais" });
    await item.scrollIntoViewIfNeeded();
    await item.getByRole("button", { name: /Abrir prova: Classificador de Ocorrências/i }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("iframe")).toHaveCount(0);
    await expect(dialog.getByText("Amostra útil")).toBeVisible();
    await expect(
      dialog
        .getByRole("region", { name: "Indicadores principais" })
        .locator("article")
        .filter({ hasText: "Concordância interna" }),
    ).toContainText("10/10");
    await expect(dialog.getByText("Governança humana")).toBeVisible();
    await expect(dialog.getByText("Ações vedadas")).toBeVisible();
    await expect(dialog.getByText("aplicar penalidade")).toBeVisible();
    await expect(dialog.getByRole("link", { name: /Abrir em nova aba/i })).toHaveAttribute(
      "href",
      "/provas/classificador_ocorrencias",
    );
  });

  test("fecha com ESC e devolve o foco ao acionador", async ({ page }) => {
    await openCases(page);
    const card = page
      .getByTestId("case-card")
      .filter({ hasText: "Simulador de Custo de Frete" })
      .first();
    const openButton = card.getByRole("button", {
      name: /Explorar Frete: Simulador de Custo de Frete/i,
    });

    await expect(openButton).toBeEnabled();
    await openButton.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect
      .poll(() => page.evaluate(() => Boolean(document.activeElement?.closest('[role="dialog"]'))))
      .toBe(true);

    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(openButton).toBeFocused();
  });

  test("renderiza Classificador inline no mobile sem consentimento", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await openCases(page);

    const item = page
      .getByTestId("proof-comparison-item")
      .filter({ hasText: "Classificador de Ocorrências Operacionais" });
    await item.scrollIntoViewIfNeeded();
    await item.getByRole("button", { name: /Abrir prova: Classificador de Ocorrências/i }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("iframe")).toHaveCount(0);
    await expect(dialog.getByText("Amostra útil")).toBeVisible();
    await expect(dialog.getByRole("button", { name: /Carregar demo/i })).toHaveCount(0);
    await dialog.getByText("Governança humana").scrollIntoViewIfNeeded();
    await expect(dialog.getByText("encerrar ocorrência")).toBeVisible();
  });

  test("roadmap não oferece botão de demo", async ({ page }) => {
    await openCases(page);
    const roadmap = page.getByTestId("case-roadmap");
    await roadmap.scrollIntoViewIfNeeded();
    await expect(roadmap).toBeVisible();
    await expect(
      roadmap.getByRole("button", { name: /Abrir demonstração|Explorar/i }),
    ).not.toBeVisible();
  });
});
