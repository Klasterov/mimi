const fs = require("node:fs/promises");
const { chromium } = require("@playwright/test");
const profiles = [
  {
    name: "typical-4g",
    downloadMbps: 9,
    uploadMbps: 1.5,
    latencyMs: 80,
    cpu: 4,
    viewport: { width: 390, height: 844 },
    mobile: true,
  },
  {
    name: "home-internet",
    downloadMbps: 50,
    uploadMbps: 10,
    latencyMs: 20,
    cpu: 1,
    viewport: { width: 1440, height: 900 },
    mobile: false,
  },
];
const routes = [
  "/",
  "/about",
  "/services",
  "/contacts",
  "/equipment",
  "/pricing",
];
async function main() {
  const browser = await chromium.launch({ headless: true });
  const results = [];
  try {
    for (const profile of profiles)
      for (const route of routes) {
        const runs = [];
        for (let i = 0; i < 3; i++) {
          const context = await browser.newContext({
            viewport: profile.viewport,
            isMobile: profile.mobile,
            deviceScaleFactor: profile.mobile ? 2 : 1,
          });
          const page = await context.newPage();
          const errors = [];
          page.on("pageerror", (error) => errors.push(error.message));
          const cdp = await context.newCDPSession(page);
          await cdp.send("Network.enable");
          await cdp.send("Network.setBlockedURLs", {
            urls: [
              "*googletagmanager.com*",
              "*google-analytics.com*",
              "*roistat.com*",
              "*mc.yandex.ru*",
            ],
          });
          await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
          await cdp.send("Network.emulateNetworkConditions", {
            offline: false,
            latency: profile.latencyMs,
            downloadThroughput: (profile.downloadMbps * 1000000) / 8,
            uploadThroughput: (profile.uploadMbps * 1000000) / 8,
            connectionType: profile.mobile ? "cellular4g" : "wifi",
          });
          await cdp.send("Emulation.setCPUThrottlingRate", {
            rate: profile.cpu,
          });
          const response = await page.goto(
            (process.env.E2E_BASE_URL || "http://localhost:3001") + route,
            { waitUntil: "commit" },
          );
          if (!response.ok()) throw new Error("Page failed: " + route);
          await page.waitForFunction(
            () =>
              performance.getEntriesByName("first-contentful-paint").length > 0,
            { timeout: 20000 },
          );
          const metrics = await page.evaluate(() => ({
            fcpMs: performance.getEntriesByName("first-contentful-paint")[0]
              .startTime,
            ttfbMs: performance.getEntriesByType("navigation")[0].responseStart,
            responseEndMs:
              performance.getEntriesByType("navigation")[0].responseEnd,
            htmlBytes:
              performance.getEntriesByType("navigation")[0].encodedBodySize,
          }));
          const calibrationMs = await page.evaluate(async () => {
            const start = performance.now();
            const response = await fetch(
              "/api/admin/auth/session?network-calibration=" + Math.random(),
              { cache: "no-store" },
            );
            await response.text();
            return performance.now() - start;
          });
          if (calibrationMs < profile.latencyMs * 0.7)
            throw new Error(
              "Network throttle calibration failed: " +
                calibrationMs +
                "ms for configured " +
                profile.latencyMs +
                "ms latency",
            );
          runs.push({ ...metrics, calibrationMs, pageErrors: errors });
          if (i === 0)
            await page.screenshot({
              path:
                "storage/fcp-" +
                profile.name +
                "-" +
                (route.slice(1) || "home") +
                ".png",
            });
          await context.close();
        }
        const values = runs.map((run) => run.fcpMs).sort((a, b) => a - b);
        const result = {
          profile: profile.name,
          route,
          fcpMedianMs: values[1],
          fcpMaxMs: values[2],
          targetMs: 2000,
          passed: values[1] <= 2000,
          runs,
        };
        results.push(result);
        console.log(JSON.stringify(result));
      }
    await fs.writeFile(
      "storage/performance-results.json",
      JSON.stringify(
        {
          measuredAt: new Date().toISOString(),
          environment:
            "Local production build with fixture backend; analytics requests blocked by CDP URL rules (no request interception); browser cache disabled; 3 fresh contexts per route/profile; cold image optimization on first run, ISR/server caches may be warm",
          profiles,
          results,
        },
        null,
        2,
      ),
    );
    if (results.some((result) => !result.passed)) process.exitCode = 1;
  } finally {
    await browser.close();
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
