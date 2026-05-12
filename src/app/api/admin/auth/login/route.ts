import { NextRequest, NextResponse } from "next/server"

import { proxyAdminRequest, shouldProxyAdminBackend } from "@/lib/admin-backend"
import { authenticateAdmin, createSessionCookieValue, sessionCookieName } from "@/lib/admin-auth"

export async function POST(request: NextRequest) {
  if (shouldProxyAdminBackend()) {
    return proxyAdminRequest(request)
  }

  const body = (await request.json().catch(() => null)) as
    | { username?: string; password?: string }
    | null

  const username = body?.username?.trim() ?? ""
  const password = body?.password?.trim() ?? ""

  if (!username || !password) {
    return NextResponse.json({ error: "Введите логин и пароль." }, { status: 400 })
  }

  const admin = await authenticateAdmin(username, password)

  if (!admin) {
    return NextResponse.json({ error: "Неверный логин или пароль." }, { status: 401 })
  }

  const response = NextResponse.json({
    ok: true,
    admin,
  })

  response.cookies.set({
    name: sessionCookieName(),
    value: createSessionCookieValue(admin),
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })

  return response
}
