import { NextRequest, NextResponse } from "next/server"

import { proxyAdminRequest, shouldProxyAdminBackend } from "@/lib/admin-backend"
import { requireAdmin } from "@/lib/admin-api"
import { exportLeads } from "@/lib/admin-store"

type Context = {
  params: Promise<{ format: string }>
}

export async function GET(request: NextRequest, context: Context) {
  if (shouldProxyAdminBackend()) {
    return proxyAdminRequest(request)
  }

  const auth = requireAdmin(request)

  if (auth.response) {
    return auth.response
  }

  const { format } = await context.params

  if (format !== "csv" && format !== "json") {
    return NextResponse.json({ error: "Неподдерживаемый формат." }, { status: 404 })
  }

  const from = request.nextUrl.searchParams.get("from") ?? undefined
  const to = request.nextUrl.searchParams.get("to") ?? undefined
  const payload = await exportLeads(format, from, to)

  return new NextResponse(payload, {
    headers: {
      "Content-Type": format === "csv" ? "text/csv; charset=utf-8" : "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-export.${format}"`,
    },
  })
}
