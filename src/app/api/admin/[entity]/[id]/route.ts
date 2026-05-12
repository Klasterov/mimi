import { NextRequest, NextResponse } from "next/server"

import { proxyAdminRequest, shouldProxyAdminBackend } from "@/lib/admin-backend"
import { parseEntity, requireAdmin } from "@/lib/admin-api"
import { deleteEntityItem, getEntityById, updateEntityItem } from "@/lib/admin-store"

type Context = {
  params: Promise<{ entity: string; id: string }>
}

export async function GET(request: NextRequest, context: Context) {
  if (shouldProxyAdminBackend()) {
    return proxyAdminRequest(request)
  }

  const auth = requireAdmin(request)

  if (auth.response) {
    return auth.response
  }

  const { entity: rawEntity, id } = await context.params
  const entity = parseEntity(rawEntity)

  if (!entity) {
    return NextResponse.json({ error: "Неизвестный раздел." }, { status: 404 })
  }

  const item = await getEntityById(entity, id)

  if (!item) {
    return NextResponse.json({ error: "Запись не найдена." }, { status: 404 })
  }

  return NextResponse.json({ data: item })
}

export async function PUT(request: NextRequest, context: Context) {
  if (shouldProxyAdminBackend()) {
    return proxyAdminRequest(request)
  }

  const auth = requireAdmin(request)

  if (auth.response) {
    return auth.response
  }

  const { entity: rawEntity, id } = await context.params
  const entity = parseEntity(rawEntity)

  if (!entity) {
    return NextResponse.json({ error: "Неизвестный раздел." }, { status: 404 })
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null

  if (!body) {
    return NextResponse.json({ error: "Некорректные данные." }, { status: 400 })
  }

  const updated = await updateEntityItem(entity, id, body as never)

  if (!updated) {
    return NextResponse.json({ error: "Запись не найдена." }, { status: 404 })
  }

  return NextResponse.json({ data: updated })
}

export async function DELETE(request: NextRequest, context: Context) {
  if (shouldProxyAdminBackend()) {
    return proxyAdminRequest(request)
  }

  const auth = requireAdmin(request)

  if (auth.response) {
    return auth.response
  }

  const { entity: rawEntity, id } = await context.params
  const entity = parseEntity(rawEntity)

  if (!entity) {
    return NextResponse.json({ error: "Неизвестный раздел." }, { status: 404 })
  }

  const deleted = await deleteEntityItem(entity, id)

  if (!deleted) {
    return NextResponse.json({ error: "Запись не найдена." }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}
