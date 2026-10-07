const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const { createRequire } = require("node:module");
const ts = require("typescript");
function load(relative, mocks = {}, env = {}) {
  const filename = path.resolve(__dirname, "..", relative);
  const real = createRequire(filename);
  const mod = { exports: {} };
  let code = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  }).outputText;
  code = code.replace(
    "createRequire)(import.meta.url)",
    "createRequire)(__filename)",
  );
  const requireModule = (name) =>
    name === "server-only" ? {} : (mocks[name] ?? real(name));
  new Function("require", "module", "exports", "process", "__filename", code)(
    requireModule,
    mod,
    mod.exports,
    { env },
    filename,
  );
  return mod.exports;
}
const { NextRequest } = require("next/server");
test("CSRF rejects foreign origins and permits configured same origin", () => {
  const guard = load("src/lib/request-security.ts");
  assert.equal(
    guard.rejectCrossOriginMutation(
      new NextRequest("https://site.example/api/admin/articles", {
        method: "POST",
        headers: { origin: "https://evil.example" },
      }),
    ).status,
    403,
  );
  assert.equal(
    guard.rejectCrossOriginMutation(
      new NextRequest("https://site.example/api/admin/articles", {
        method: "POST",
        headers: { origin: "https://site.example" },
      }),
    ),
    null,
  );
});
test("local admin has no default credentials and session forgery is rejected", async () => {
  const store = {
    listAdmins: async () => [],
    writeAdmins: async () => assert.fail("Unexpected storage write"),
  };
  const auth = load(
    "src/lib/admin-auth.ts",
    { "@/lib/admin-store": store },
    { ADMIN_SESSION_SECRET: "s".repeat(48) },
  );
  assert.equal(await auth.authenticateAdmin("admin", "admin12345"), null);
  const cookie = auth.createSessionCookieValue({
    id: "test",
    username: "test",
  });
  const request = (value) =>
    new NextRequest("https://site.example/api/admin/leads", {
      headers: { cookie: "mimi_admin_session=" + value },
    });
  assert.equal(auth.readAdminSessionFromRequest(request(cookie)).id, "test");
  assert.equal(
    auth.readAdminSessionFromRequest(request(cookie + "tampered")),
    null,
  );
  const unsafe = load("src/lib/admin-auth.ts", { "@/lib/admin-store": store });
  assert.throws(() =>
    unsafe.createSessionCookieValue({ id: "test", username: "test" }),
  );
});
test("local registration and uploads cannot bypass auth with arbitrary Bearer text", async () => {
  const admin = {
    requireAdmin: () => ({
      response: new (require("next/server").NextResponse)(null, {
        status: 401,
      }),
    }),
  };
  const mocks = {
    "@/lib/admin-backend": { shouldProxyAdminBackend: () => false },
    "@/lib/admin-api": admin,
    "@/lib/backend-url": {},
    "@/lib/admin-auth": {},
  };
  const register = load("src/app/api/admin/auth/register/route.ts", mocks);
  const upload = load("src/app/api/admin/upload/image/route.ts", mocks);
  const request = new NextRequest(
    "https://site.example/api/admin/upload/image",
    { method: "POST", headers: { authorization: "Bearer fake-token" } },
  );
  assert.equal((await register.POST(request)).status, 401);
  assert.equal((await upload.POST(request)).status, 401);
});
