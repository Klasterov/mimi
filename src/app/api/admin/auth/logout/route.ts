import { NextRequest, NextResponse } from "next/server"

import { proxyAdminRequest, shouldProxyAdminBackend } from "@/lib/admin-backend"
import { sessionCookieName } from "@/lib/admin-auth"

export async function POST(request: NextRequest) {
  if (shouldProxyAdminBackend()) {
    return proxyAdminRequest(request)
  }

  const response = NextResponse.json({ ok: true })

  response.cookies.set({
    name: sessionCookieName(),
    value: "",
    path: "/",
    maxAge: 0,
  })

  return response
}
