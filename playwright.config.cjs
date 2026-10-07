const { defineConfig } = require("@playwright/test");
module.exports = defineConfig({
  testDir: "./e2e",
  workers: 1,
  fullyParallel: false,
  timeout: 30000,
  use: {
    baseURL: process.env.E2E_BASE_URL || "http://localhost:3001",
    headless: true,
    trace: "retain-on-failure",
  },
  reporter: [["list"], ["json", { outputFile: "storage/e2e-results.json" }]],
});
