import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { readAdminSessionFromRequest } from "@/lib/admin-auth"
import { type AdminEntity } from "@/lib/admin-store"

const VALID_ENTITIES: AdminEntity[] = ["admins", "articles", "controllers", "detectors", "equipment", "leads", "projects"]

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Требуется вход администратора." }, { status: 401 })
}

export function requireAdmin(request: NextRequest) {
  const session = readAdminSessionFromRequest(request)

  if (!session) {
    return { response: unauthorizedResponse(), session: null }
  }

  return { response: null, session }
}

export function parseEntity(value: string): Exclude<AdminEntity, "admins"> | null {
  if (!VALID_ENTITIES.includes(value as AdminEntity) || value === "admins") {
    return null
  }

  return value as Exclude<AdminEntity, "admins">
}
