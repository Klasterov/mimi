import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

import { NextRequest, NextResponse } from "next/server"

import { proxyAdminRequest, shouldProxyAdminBackend } from "@/lib/admin-backend"
import { requireAdmin } from "@/lib/admin-api"

function sanitizeSegment(value: string, fallback: string) {
  const normalized = value.toLowerCase().replace(/[^a-z0-9-_]+/g, "-").replace(/^-+|-+$/g, "")
  return normalized || fallback
}

function extensionFromFileName(name: string) {
  const ext = path.extname(name).toLowerCase()
  return ext || ".png"
}

export async function POST(request: NextRequest) {
  if (shouldProxyAdminBackend()) {
    return proxyAdminRequest(request)
  }

  const auth = requireAdmin(request)

  if (auth.response) {
    return auth.response
  }

  const formData = await request.formData()
  const image = formData.get("image")
  const folderValue = formData.get("folder")
  const folder = sanitizeSegment(typeof folderValue === "string" ? folderValue : "general", "general")

  if (!(image instanceof File)) {
    return NextResponse.json({ error: "Изображение не найдено." }, { status: 400 })
  }

  const ext = extensionFromFileName(image.name)
  const fileName = `${Date.now()}-${sanitizeSegment(image.name.replace(path.extname(image.name), ""), "image")}${ext}`
  const relativeDir = path.join("uploads", "admin", folder)
  const absoluteDir = path.join(process.cwd(), "public", relativeDir)
  const absolutePath = path.join(absoluteDir, fileName)

  await mkdir(absoluteDir, { recursive: true })
  await writeFile(absolutePath, Buffer.from(await image.arrayBuffer()))

  return NextResponse.json({
    file: {
      url: `/${relativeDir.replaceAll("\\", "/")}/${fileName}`,
    },
  })
}
