import { NextRequest, NextResponse } from "next/server"

import { proxyAdminRequest, shouldProxyAdminBackend } from "@/lib/admin-backend"
import { readAdminSessionFromRequest } from "@/lib/admin-auth"

export async function GET(request: NextRequest) {
  if (shouldProxyAdminBackend()) {
    return proxyAdminRequest(request)
  }

  const session = readAdminSessionFromRequest(request)

  if (!session) {
    return NextResponse.json({ authenticated: false })
  }

  return NextResponse.json({
    authenticated: true,
    admin: {
      id: session.id,
      username: session.username,
    },
  })
}
