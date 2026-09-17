import { mkdir, writeFile } from "node:fs/promises"
import { createRequire } from "node:module"
import path from "node:path"

import { NextRequest, NextResponse } from "next/server"

import { proxyAdminRequest, shouldProxyAdminBackend } from "@/lib/admin-backend"
import { requireAdmin } from "@/lib/admin-api"

function sanitizeSegment(value: string, fallback: string) {
  const normalized = value
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "")

  return normalized || fallback
}

function extensionFromFileName(name: string) {
  const ext = path.extname(name).toLowerCase()
  return ext || ".png"
}

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024
const MAX_IMAGE_DIMENSION = 1920
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
])
const require = createRequire(import.meta.url)

async function resizeRasterImage(buffer: Buffer) {
  const sharp = require("sharp")

  return sharp(buffer)
    .rotate()
    .resize({
      width: MAX_IMAGE_DIMENSION,
      height: MAX_IMAGE_DIMENSION,
      fit: "inside",
      withoutEnlargement: true,
    })
    .toBuffer()
}

export async function POST(request: NextRequest) {
  if (shouldProxyAdminBackend()) {
    return proxyAdminRequest(request)
  }

  const auth = requireAdmin(request)
  const bearerToken = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim()

  if (auth.response && !bearerToken) {
    return auth.response
  }

  try {
    const formData = await request.formData()
    const image = formData.get("image")
    const folderValue = formData.get("folder")
    const folder = sanitizeSegment(typeof folderValue === "string" ? folderValue : "general", "general")

    if (!(image instanceof File)) {
      return NextResponse.json({ error: "Изображение не найдено." }, { status: 400 })
    }

    if (!ALLOWED_IMAGE_TYPES.has(image.type)) {
      return NextResponse.json({ error: "Разрешены только изображения JPG, PNG, WEBP, GIF или SVG." }, { status: 400 })
    }

    if (image.size > MAX_IMAGE_SIZE_BYTES) {
      return NextResponse.json({ error: "Размер изображения не должен превышать 5 МБ." }, { status: 400 })
    }

    const ext = extensionFromFileName(image.name)
    const fileName = `${Date.now()}-${sanitizeSegment(
      image.name.replace(path.extname(image.name), ""),
      "image"
    )}${ext}`
    const relativeDir = path.join("uploads", "admin", folder)
    const absoluteDir = path.join(process.cwd(), "public", relativeDir)
    const absolutePath = path.join(absoluteDir, fileName)
    const buffer = Buffer.from(await image.arrayBuffer())

    await mkdir(absoluteDir, { recursive: true })

    if (image.type === "image/svg+xml" || image.type === "image/gif") {
      await writeFile(absolutePath, buffer)
    } else {
      await writeFile(absolutePath, await resizeRasterImage(buffer))
    }

    return NextResponse.json({
      file: {
        url: `/${relativeDir.replaceAll("\\", "/")}/${fileName}`,
      },
    })
  } catch (error) {
    console.error("[admin-upload] Failed to save image:", error)

    return NextResponse.json(
      { error: "Не удалось сохранить изображение на сервере." },
      { status: 500 }
    )
  }
}
