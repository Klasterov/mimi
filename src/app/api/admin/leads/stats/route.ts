import { NextRequest, NextResponse } from "next/server"

import { proxyAdminRequest, shouldProxyAdminBackend } from "@/lib/admin-backend"
import { requireAdmin } from "@/lib/admin-api"
import { leadStats } from "@/lib/admin-store"

export async function GET(request: NextRequest) {
  if (shouldProxyAdminBackend()) {
    return proxyAdminRequest(request)
  }

  const auth = requireAdmin(request)

  if (auth.response) {
    return auth.response
  }

  const from = request.nextUrl.searchParams.get("from") ?? undefined
  const to = request.nextUrl.searchParams.get("to") ?? undefined
  const stats = await leadStats(from, to)

  return NextResponse.json(stats)
}
