const { test, expect } = require("@playwright/test");
test("landing pages contain server rendered content and navigation works", async ({
  page,
  request,
}) => {
  for (const route of [
    "/",
    "/about",
    "/services",
    "/contacts",
    "/equipment",
    "/pricing",
  ]) {
    const response = await request.get(route);
    expect(response.ok()).toBeTruthy();
    const html = await response.text();
    expect(/<h1[ >]/.test(html), "Server rendered h1 on " + route).toBeTruthy();
  }
  await page.goto("/");
  await expect(page.locator("h1").first()).toBeVisible();
  await page.getByRole("button", { name: "Открыть меню", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Закрыть меню", exact: true }),
  ).toBeVisible();
});
test("anonymous admin access, registration and cross origin mutations are denied", async ({
  request,
}) => {
  for (const route of [
    "/api/admin/leads",
    "/api/admin/articles",
    "/api/admin/leads/export/csv",
  ])
    expect((await request.get(route)).status()).toBe(401);
  expect(
    (
      await request.post("/api/admin/auth/register", {
        data: { username: "attacker", password: "attacker-password" },
      })
    ).status(),
  ).toBe(401);
  expect(
    (
      await request.post("/api/admin/auth/login", {
        headers: { origin: "https://attacker.example" },
        data: {},
      })
    ).status(),
  ).toBe(403);
  expect(
    (
      await request.post("/api/leads", {
        data: { name: 123, phone: [], consent: true, pageUrl: "/" },
      })
    ).status(),
  ).toBe(400);
});
test("admin login, protected data and logout use an HttpOnly session", async ({
  page,
}) => {
  await page.goto("/admin");
  await page.locator("#username").fill("audit-admin");
  await page.locator("#password").fill("Audit-password-2026");
  await page.locator('form button[type="submit"]').click();
  await expect
    .poll(async () => (await page.request.get("/api/admin/leads")).status())
    .toBe(200);
  const ticket = await page.request.get("/api/admin/upload/image");
  expect(ticket.status()).toBe(200);
  const upload = await ticket.json();
  expect(typeof upload.uploadToken).toBe("string");
  const privateAttempt = await page.request.get(
    upload.uploadUrl.replace("/upload/image", "/leads"),
    { headers: { Authorization: "Bearer " + upload.uploadToken } },
  );
  expect(privateAttempt.status()).toBe(403);
  const response = await page.request.get("/api/admin/session");
  expect((await response.json()).authenticated).toBe(true);
  await page.request.post("/api/admin/auth/logout");
  expect((await page.request.get("/api/admin/leads")).status()).toBe(401);
});
test("valid lead is stored and personal data is protected", async ({
  request,
}) => {
  const response = await request.post("/api/leads", {
    data: {
      name: "Audit visitor",
      phone: "+37360123456",
      consent: true,
      pageUrl: "http://localhost:3001/",
      formType: "audit",
    },
  });
  expect(response.status()).toBe(201);
  expect((await response.json()).stored).toBe(true);
  expect((await request.get("/api/admin/leads")).status()).toBe(401);
});
