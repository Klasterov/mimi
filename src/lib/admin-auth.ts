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
const DEFAULT_ADMIN_USERNAME = process.env.ADMIN_DEFAULT_USERNAME ?? "admin"
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_DEFAULT_PASSWORD ?? "admin12345"
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET ?? "mimi-admin-session-secret"

function encode(value: string) {
  return Buffer.from(value, "utf8").toString("base64url")
}

function decode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8")
}

function sign(value: string) {
  return crypto.createHmac("sha256", SESSION_SECRET).update(value).digest("base64url")
}

function hashPassword(password: string, salt: string) {
  return crypto.scryptSync(password, salt, 64).toString("hex")
}

function verifyPassword(password: string, user: Pick<AdminUserRecord, "passwordHash" | "salt">) {
  return hashPassword(password, user.salt) === user.passwordHash
}

function createDefaultAdmin(): AdminUserRecord {
  const record = {
    id: "default-admin",
    username: DEFAULT_ADMIN_USERNAME,
    salt: "default-admin-salt",
    passwordHash: hashPassword(DEFAULT_ADMIN_PASSWORD, "default-admin-salt"),
    createdAt: new Date().toISOString(),
  }
  
  console.log(`[Auth] Создан дефолтный администратор:`)
  console.log(`  Логин: ${record.username}`)
  console.log(`  Ожидаемый пароль: ${DEFAULT_ADMIN_PASSWORD}`)
  console.log(`  Хеш пароля: ${record.passwordHash}`)
  
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

  const [payload, signature] = token.split(".")

  if (!payload || !signature || sign(payload) !== signature) {
    return null
  }

  try {
    const decoded = JSON.parse(decode(payload)) as AdminSession

    if (!decoded.id || !decoded.username || decoded.exp < Math.floor(Date.now() / 1000)) {
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

  const defaultAdmin = createDefaultAdmin()
  return defaultAdmin.username.toLowerCase() === normalized ? defaultAdmin : null
}

export async function authenticateAdmin(username: string, password: string) {
  const admin = await findAdminByUsername(username)

  if (!admin) {
    console.log(`[Auth] Администратор не найден: "${username}"`)
    return null
  }

  const isPasswordValid = verifyPassword(password, admin)
  
  if (!isPasswordValid) {
    console.log(`[Auth] Неверный пароль для администратора: "${username}"`)
    return null
  }

  console.log(`[Auth] Успешная аутентификация: "${username}"`)
  return {
    id: admin.id,
    username: admin.username,
  }
}

export async function registerAdmin(username: string, password: string) {
  const normalizedUsername = username.trim()

  if (!normalizedUsername || password.trim().length < 6) {
    return { error: "Введите логин и пароль длиной не меньше 6 символов." as const }
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
