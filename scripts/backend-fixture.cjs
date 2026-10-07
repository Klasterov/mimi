// Local test fixture: never loads .env or connects to a real database.
const Module = require("node:module");
const path = require("node:path");
const root = path.resolve(
  process.env.MIMI_BACKEND_DIR || path.join(__dirname, "..", "..", "mimi-back"),
);
process.env.JWT_SECRET = "local-test-secret-".repeat(4);
process.env.NODE_ENV = "test";
process.env.CORS_ORIGINS =
  "http://localhost:" +
  process.env.AUDIT_FRONTEND_PORT +
  ",http://127.0.0.1:" +
  process.env.AUDIT_FRONTEND_PORT;
process.env.UPLOAD_STORAGE = "disk";
delete process.env.RESEND_API_KEY;
const bcrypt = require(path.join(root, "node_modules", "bcryptjs"));
const admin = {
  id: 1,
  username: "audit-admin",
  password_hash: bcrypt.hashSync("Audit-password-2026", 4),
};
const leads = [];
const article = {
  id: 1,
  title: "Audit article",
  description: "Server rendered fixture",
  image: "/images/articles/1.jpg",
  tag: "Test",
  status: "published",
  date: "2026-01-01",
  created_at: "2026-01-01T00:00:00Z",
  sections: [],
};
const db = {
  isDbConfigured: true,
  pool: {
    query: async (sql, params = []) => {
      if (/FROM admins WHERE username/.test(sql))
        return { rows: params[0] === admin.username ? [admin] : [] };
      if (/FROM admins WHERE id/.test(sql))
        return { rows: params[0] === 1 ? [admin] : [] };
      if (/INSERT INTO leads/.test(sql)) {
        const lead = {
          id: leads.length + 1,
          name: params[0],
          phone: params[1],
          comment: params[2],
          consent: true,
          page_url: params[4],
          submitted_at: new Date().toISOString(),
        };
        leads.push(lead);
        return { rows: [lead] };
      }
      if (/SELECT COUNT/.test(sql))
        return {
          rows: [
            {
              count: /FROM leads/.test(sql)
                ? String(leads.length)
                : /FROM articles/.test(sql)
                  ? "1"
                  : "0",
            },
          ],
        };
      if (/FROM leads/.test(sql)) return { rows: leads };
      if (/FROM articles/.test(sql)) return { rows: [article] };
      return { rows: [], rowCount: 0 };
    },
  },
};
const original = Module._load;
Module._load = function (name, parent, isMain) {
  if (name.endsWith("/db") || name === "./db" || name === "../db") return db;
  if (name.endsWith("/services/leadEmail") || name === "../services/leadEmail")
    return { sendLeadEmail: async () => {} };
  return original.call(this, name, parent, isMain);
};
const app = require(path.join(root, "app.js"));
app.listen(Number(process.env.AUDIT_BACKEND_PORT), "127.0.0.1", () =>
  console.log("Audit backend ready"),
);
