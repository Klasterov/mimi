import { NextRequest, NextResponse } from "next/server"

import { proxyAdminRequest, shouldProxyAdminBackend } from "@/lib/admin-backend"
import { parseEntity, requireAdmin } from "@/lib/admin-api"
import { createEntityItem, listEntity } from "@/lib/admin-store"

type Context = {
  params: Promise<{ entity: string }>
}

export async function GET(request: NextRequest, context: Context) {
  if (shouldProxyAdminBackend()) {
    return proxyAdminRequest(request)
  }

  const auth = requireAdmin(request)

  if (auth.response) {
    return auth.response
  }

  const { entity: rawEntity } = await context.params
  const entity = parseEntity(rawEntity)

  if (!entity) {
    return NextResponse.json({ error: "Неизвестный раздел." }, { status: 404 })
  }

  const { searchParams } = request.nextUrl
  const page = Number.parseInt(searchParams.get("page") ?? "1", 10)
  const limit = Number.parseInt(searchParams.get("limit") ?? "20", 10)
  const search = searchParams.get("search") ?? ""

  const payload = await listEntity(entity, {
    page: Number.isFinite(page) ? page : 1,
    limit: Number.isFinite(limit) ? limit : 20,
    search,
  })

  return NextResponse.json(payload)
}

export async function POST(request: NextRequest, context: Context) {
  if (shouldProxyAdminBackend()) {
    return proxyAdminRequest(request)
  }

  const auth = requireAdmin(request)

  if (auth.response) {
    return auth.response
  }

  const { entity: rawEntity } = await context.params
  const entity = parseEntity(rawEntity)

  if (!entity) {
    return NextResponse.json({ error: "Неизвестный раздел." }, { status: 404 })
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null

  if (!body) {
    return NextResponse.json({ error: "Некорректные данные." }, { status: 400 })
  }

  const created = await createEntityItem(entity, body as never)
  return NextResponse.json({ data: created }, { status: 201 })
}
