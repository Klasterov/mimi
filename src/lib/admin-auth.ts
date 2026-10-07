import "server-only"

import crypto from "node:crypto"

import type { NextRequest } from "next/server"

import { listAdmins, type AdminUserRecord, writeAdmins } from "@/lib/admin-store"

export type AdminSession = {
  id: string
  username: string
  exp: number
}

const SESSION_COOKIE = "mimi_admin_session"
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7
const DEFAULT_ADMIN_USERNAME = process.env.ADMIN_DEFAULT_USERNAME ?? ""
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_DEFAULT_PASSWORD ?? ""
function sessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret || Buffer.byteLength(secret) < 32) throw new Error("ADMIN_SESSION_SECRET must contain at least 32 bytes")
  return secret
}

function encode(value: string) {
  return Buffer.from(value, "utf8").toString("base64url")
}

function decode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8")
}

function sign(value: string) {
  return crypto.createHmac("sha256", sessionSecret()).update(value).digest("base64url")
}

function hashPassword(password: string, salt: string) {
  return crypto.scryptSync(password, salt, 64).toString("hex")
}

function verifyPassword(password: string, user: Pick<AdminUserRecord, "passwordHash" | "salt">) {
  const actual = Buffer.from(hashPassword(password, user.salt), "hex")
  const expected = Buffer.from(user.passwordHash, "hex")
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected)
}

function createDefaultAdmin(): AdminUserRecord {
  const record = {
    id: "default-admin",
    username: DEFAULT_ADMIN_USERNAME,
    salt: crypto.randomBytes(16).toString("hex"),
    passwordHash: "",
    createdAt: new Date().toISOString(),
  }


  record.passwordHash = hashPassword(DEFAULT_ADMIN_PASSWORD, record.salt)
  return record
}

export function sessionCookieName() {
  return SESSION_COOKIE
}

export function createSessionCookieValue(session: { id: string; username: string }) {
  const payload: AdminSession = {
    id: session.id,
    username: session.username,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  }
  const encodedPayload = encode(JSON.stringify(payload))
  return `${encodedPayload}.${sign(encodedPayload)}`
}

export function readAdminSessionFromRequest(request: NextRequest): AdminSession | null {
  const token = request.cookies.get(SESSION_COOKIE)?.value

  if (!token) {
    return null
  }

  try {
    const parts = token.split(".")
    const [payload, signature] = parts
    if (parts.length !== 2 || !payload || !signature) return null
    const expected = Buffer.from(sign(payload))
    const actual = Buffer.from(signature)
    if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) return null
    const decoded = JSON.parse(decode(payload)) as AdminSession

    if (typeof decoded.id !== "string" || !decoded.id || typeof decoded.username !== "string" || !decoded.username || typeof decoded.exp !== "number" || !Number.isFinite(decoded.exp) || decoded.exp <= Math.floor(Date.now() / 1000)) {
      return null
    }

    return decoded
  } catch {
    return null
  }
}

export async function findAdminByUsername(username: string) {
  const normalized = username.trim().toLowerCase()
  const admins = await listAdmins()
  const fileAdmin = admins.find(admin => admin.username.toLowerCase() === normalized)

  if (fileAdmin) {
    return fileAdmin
  }

  if (!DEFAULT_ADMIN_USERNAME || DEFAULT_ADMIN_PASSWORD.length < 12) return null
  const defaultAdmin = createDefaultAdmin()
  return defaultAdmin.username.toLowerCase() === normalized ? defaultAdmin : null
}

export async function authenticateAdmin(username: string, password: string) {
  const admin = await findAdminByUsername(username)

  if (!admin) {
    return null
  }

  const isPasswordValid = verifyPassword(password, admin)

  if (!isPasswordValid) {
    return null
  }

  return {
    id: admin.id,
    username: admin.username,
  }
}

export async function registerAdmin(username: string, password: string) {
  const normalizedUsername = username.trim()

  if (!normalizedUsername || password.length < 12 || Buffer.byteLength(password) > 72) {
    return { error: "Введите логин и пароль длиной не меньше 12 символов." as const }
  }

  const existing = await findAdminByUsername(normalizedUsername)

  if (existing) {
    return { error: "Администратор с таким логином уже существует." as const }
  }

  const admins = await listAdmins()
  const salt = crypto.randomBytes(16).toString("hex")
  const created: AdminUserRecord = {
    id: crypto.randomUUID(),
    username: normalizedUsername,
    salt,
    passwordHash: hashPassword(password, salt),
    createdAt: new Date().toISOString(),
  }

  await writeAdmins([created, ...admins])

  return {
    admin: {
      id: created.id,
      username: created.username,
    },
  }
}
