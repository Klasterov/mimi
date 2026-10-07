const { spawn } = require("node:child_process");
const path = require("node:path");
const fs = require("node:fs");
const net = require("node:net");
const root = path.resolve(__dirname, "..");
const env = {
  ...process.env,
  API_BASE_URL: "http://127.0.0.1:4001",
  NEXT_DIST_DIR: ".next-audit",
  NEXT_TELEMETRY_DISABLED: "1",
  APP_ORIGINS: "http://localhost:3001,http://127.0.0.1:3001",
  npm_config_cache: path.join(root, "storage", "npm-cache"),
  PLAYWRIGHT_BROWSERS_PATH: path.join(root, "storage", "playwright"),
};
const children = [];
function start(file, args) {
  const child = spawn(process.execPath, [file, ...args], {
    cwd: root,
    env,
    stdio: "inherit",
  });
  children.push(child);
  return child;
}
function run(file, args) {
  return new Promise((resolve, reject) => {
    const child = start(file, args);
    child.once("error", reject);
    child.once("exit", (code) =>
      code === 0
        ? resolve()
        : reject(new Error("Command failed with exit code " + code)),
    );
  });
}
async function ready(url) {
  for (let i = 0; i < 120; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      /* Wait for the process to bind its socket. */
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error("Server not ready: " + url);
}
async function freePort() {
  const server = net.createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const port = server.address().port;
  await new Promise((resolve) => server.close(resolve));
  return port;
}
async function main() {
  const backendPort = await freePort();
  const frontendPort = await freePort();
  env.API_BASE_URL = "http://127.0.0.1:" + backendPort;
  env.AUDIT_BACKEND_PORT = String(backendPort);
  env.AUDIT_FRONTEND_PORT = String(frontendPort);
  env.E2E_BASE_URL = "http://localhost:" + frontendPort;
  env.APP_ORIGINS = env.E2E_BASE_URL + ",http://127.0.0.1:" + frontendPort;
  fs.mkdirSync(path.join(root, "storage"), { recursive: true });
  start(path.join(__dirname, "backend-fixture.cjs"), []);
  await ready(env.API_BASE_URL + "/health");
  const next = require.resolve("next/dist/bin/next");
  if (!process.argv.includes("--skip-build"))
    await run(next, ["build", "--webpack"]);
  start(next, [
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    String(frontendPort),
  ]);
  await ready("http://127.0.0.1:" + frontendPort + "/");
  if (process.argv.includes("--performance"))
    await run(path.join(__dirname, "measure-performance.cjs"), []);
  else await run(require.resolve("@playwright/test/cli"), ["test"]);
}
main()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(() => {
    for (const child of children) if (child.exitCode === null) child.kill();
  });
