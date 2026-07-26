import { expect, test, type Page } from "@playwright/test";

import {
  PROOF_ACTIONS,
  PROOF_SURFACES,
  sanitizeAnalyticsUrl,
  type ProofAction,
  type ProofSurface,
} from "../../lib/analytics";
import { REACT_DEMO_SLUGS } from "../../lib/demo-contract";

interface ProofEvent {
  name: "proof_open" | "proof_engaged" | "proof_cta_click";
  data: {
    proof_slug: string;
    surface?: ProofSurface;
    action?: ProofAction;
  };
}

async function resetAnalyticsQueue(page: Page) {
  await page.addInitScript(() => {
    delete window.va;
    window.vaq = [];
  });
}

async function proofEvents(page: Page): Promise<ProofEvent[]> {
  return page.evaluate(() =>
    (window.vaq ?? []).flatMap(([command, candidate]) => {
      if (command !== "event" || typeof candidate !== "object" || candidate === null) return [];
      const payload = candidate as { name?: unknown; data?: unknown };
      if (
        !["proof_open", "proof_engaged", "proof_cta_click"].includes(String(payload.name)) ||
        typeof payload.data !== "object" ||
        payload.data === null
      ) {
        return [];
      }
      return [payload as ProofEvent];
    }),
  );
}

async function expectProofEvent(page: Page, expected: ProofEvent) {
  await expect.poll(async () => proofEvents(page)).toContainEqual(expected);
}

async function preventNextNavigation(page: Page) {
  await page.evaluate(() => {
    document.addEventListener(
      "click",
      (event) => {
        if (event.target instanceof Element && event.target.closest("a")) event.preventDefault();
      },
      { capture: true, once: true },
    );
  });
}

test.describe("Analytics das provas", () => {
  test("enfileira abertura e CTA da âncora no modal em envelope v2 sem window.va", async ({
    page,
  }) => {
    await resetAnalyticsQueue(page);
    await page.goto("/#cases", { waitUntil: "domcontentloaded" });
    await expect(page.evaluate(() => typeof window.va)).resolves.toBe("undefined");
    await expect(
      page.getByText(/Quando a medição está habilitada, pageviews são agregadas e sem cookies/i),
    ).toBeVisible();

    const card = page
      .getByTestId("case-card")
      .filter({ hasText: "Simulador de Custo de Frete" })
      .first();
    await card.scrollIntoViewIfNeeded();
    await card
      .getByRole("button", { name: /Explorar Frete: Simulador de Custo de Frete/i })
      .click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expectProofEvent(page, {
      name: "proof_open",
      data: { proof_slug: "precificacao_frete", surface: "featured_modal" },
    });

    await preventNextNavigation(page);
    await dialog.getByRole("link", { name: /Abrir em nova aba/i }).click();
    await expectProofEvent(page, {
      name: "proof_cta_click",
      data: { proof_slug: "precificacao_frete", action: "open_full_proof" },
    });
  });

  test("distingue abertura no comparativo", async ({ page }) => {
    await resetAnalyticsQueue(page);
    await page.goto("/#cases", { waitUntil: "domcontentloaded" });

    const item = page
      .getByTestId("proof-comparison-item")
      .filter({ hasText: "Promessa de Entrega por CEP" });
    await item.scrollIntoViewIfNeeded();
    await item.getByRole("button", { name: /Abrir prova: Promessa de Entrega por CEP/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await expectProofEvent(page, {
      name: "proof_open",
      data: { proof_slug: "promessa_cep", surface: "library_modal" },
    });
  });

  test("reabre âncora no comparativo com surface library_modal", async ({ page }) => {
    await resetAnalyticsQueue(page);
    await page.goto("/#cases", { waitUntil: "domcontentloaded" });

    const item = page
      .getByTestId("proof-comparison-item")
      .filter({ hasText: "Simulador de Custo de Frete" });
    await item.scrollIntoViewIfNeeded();
    await item.getByRole("button", { name: "Abrir prova: Simulador de Custo de Frete" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await expectProofEvent(page, {
      name: "proof_open",
      data: { proof_slug: "precificacao_frete", surface: "library_modal" },
    });
  });

  test("mede rota e CTA de contato com propriedades exatas e valores permitidos", async ({
    page,
  }) => {
    await resetAnalyticsQueue(page);
    await page.goto("/provas/precificacao_frete", { waitUntil: "domcontentloaded" });

    await expectProofEvent(page, {
      name: "proof_open",
      data: { proof_slug: "precificacao_frete", surface: "route" },
    });

    await preventNextNavigation(page);
    await page.getByRole("link", { name: /Conversar sobre o perfil/i }).click();
    await expectProofEvent(page, {
      name: "proof_cta_click",
      data: { proof_slug: "precificacao_frete", action: "contact" },
    });

    const events = await proofEvents(page);
    for (const event of events) {
      expect(REACT_DEMO_SLUGS).toContain(event.data.proof_slug);
      expect(Object.keys(event.data).sort()).toEqual(
        (event.name === "proof_cta_click"
          ? ["action", "proof_slug"]
          : ["proof_slug", "surface"]
        ).sort(),
      );
      if (event.data.surface) expect(PROOF_SURFACES).toContain(event.data.surface);
      if (event.data.action) expect(PROOF_ACTIONS).toContain(event.data.action);
    }
  });

  test("engajamento acumula 30 s apenas em primeiro plano e emite uma vez", async ({ page }) => {
    await resetAnalyticsQueue(page);
    await page.clock.install();
    await page.goto("/provas/precificacao_frete", { waitUntil: "domcontentloaded" });
    await expectProofEvent(page, {
      name: "proof_open",
      data: { proof_slug: "precificacao_frete", surface: "route" },
    });

    await page.clock.fastForward(12_000);
    await page.evaluate(() => window.dispatchEvent(new Event("blur")));
    await page.clock.fastForward(30_000);
    expect(
      (await proofEvents(page)).filter((event) => event.name === "proof_engaged"),
    ).toHaveLength(0);

    await page.evaluate(() => window.dispatchEvent(new Event("focus")));
    await page.clock.fastForward(15_000);
    expect(
      (await proofEvents(page)).filter((event) => event.name === "proof_engaged"),
    ).toHaveLength(0);
    await page.clock.fastForward(3_000);

    await expectProofEvent(page, {
      name: "proof_engaged",
      data: { proof_slug: "precificacao_frete", surface: "route" },
    });
    await page.clock.fastForward(60_000);
    expect(
      (await proofEvents(page)).filter((event) => event.name === "proof_engaged"),
    ).toHaveLength(1);
  });

  test("cancela engajamento quando o modal desmonta", async ({ page }) => {
    await resetAnalyticsQueue(page);
    await page.clock.install();
    await page.goto("/#cases", { waitUntil: "domcontentloaded" });

    const card = page
      .getByTestId("case-card")
      .filter({ hasText: "Simulador de Custo de Frete" })
      .first();
    await card.scrollIntoViewIfNeeded();
    await card
      .getByRole("button", { name: /Explorar Frete: Simulador de Custo de Frete/i })
      .click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await page.clock.fastForward(10_000);
    await dialog.getByRole("button", { name: /Fechar/i }).click();
    await expect(dialog).not.toBeVisible();
    await page.clock.fastForward(30_000);

    expect(
      (await proofEvents(page)).filter((event) => event.name === "proof_engaged"),
    ).toHaveLength(0);
  });

  test("sanitiza query e hash antes do envio", () => {
    expect(
      sanitizeAnalyticsUrl({
        type: "pageview",
        url: "https://portfolio.example/provas/cvrp_urbano?email=privado#resultado",
      }),
    ).toEqual({ type: "pageview", url: "https://portfolio.example/provas/cvrp_urbano" });
    expect(sanitizeAnalyticsUrl({ type: "event", url: "/provas/cvrp_urbano?x=1#mapa" })).toEqual({
      type: "event",
      url: "/provas/cvrp_urbano",
    });
  });
});
