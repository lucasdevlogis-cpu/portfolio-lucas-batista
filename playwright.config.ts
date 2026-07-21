import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 4,
  expect: {
    timeout: 10_000,
  },
  reporter: [["html", { outputFolder: ".artifacts/playwright/report", open: "never" }]],
  outputDir: ".artifacts/playwright/results",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: {
    command: "npx next build && npx next start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 180 * 1000,
  },
});
