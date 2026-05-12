import type { CatalogItem } from "@/types/catalog"

import { buildBackendUrl, getBackendBaseUrl } from "@/lib/backend-url"

const LEGACY_API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.trim() || process.env.NEXT_PUBLIC_BACKEND_URL?.trim() || ""

const API_BASE = getBackendBaseUrl() || LEGACY_API_BASE.replace(/\/+$/, "") || "http://localhost:4000"
const CONTROLLER_PATHS = ["api/equipment", "api/controllers"]

function extractId(record: Record<string, unknown>) {
  const directId = record.id ?? record._id

  if (typeof directId === "string" && directId.trim()) {
    return directId.trim()
  }

  if (typeof directId === "number") {
    return directId
  }

  const linkValue = typeof record.link === "string" ? record.link : typeof record.url === "string" ? record.url : ""
  const match = linkValue.match(/\/controller\/([^/?#]+)/)

  return match?.[1] ?? undefined
}

function buildControllerUrl(path: string) {
  const normalizedPath = path.replace(/^\/+/, "")

  if (API_BASE === getBackendBaseUrl()) {
    return buildBackendUrl(normalizedPath)
  }

  return `${API_BASE}/${normalizedPath}`
}

function resolveImageSource(value: string | null) {
  if (!value) {
    return "/images/products/1.png"
  }

  if (value.startsWith("http://") || value.startsWith("https://") || value.startsWith("/images/")) {
    return value
  }

  if (value.startsWith("/")) {
    const backendBaseUrl = getBackendBaseUrl()
    return backendBaseUrl ? `${backendBaseUrl}${value}` : value
  }

  return buildBackendUrl(value)
}

async function fetchFirstAvailable(pathnames: string[], init?: RequestInit) {
  let lastResponse: Response | null = null
  let lastError: unknown = null

  for (const pathname of pathnames) {
    try {
      const response = await fetch(buildControllerUrl(pathname), {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          ...(init?.headers || {}),
        },
        ...init,
      })

      if (response.ok) {
        return response
      }

      lastResponse = response
    } catch (error) {
      lastError = error
    }
  }

  if (lastError) {
    throw lastError
  }

  return lastResponse
}

export async function getControllerById(id: string | number): Promise<CatalogItem | null> {
  try {
    const res = await fetchFirstAvailable(CONTROLLER_PATHS.map((path) => `${path}/${id}`))

    if (!res?.ok) {
      console.error(`Failed to fetch controller ${id}:`, res?.status)
      return null
    }

    const data = await res.json()
    return normalizeController(data)
  } catch (error) {
    console.error(`Error fetching controller ${id}:`, error)
    return null
  }
}

export async function getAllControllers(limit = 100, offset = 0): Promise<{
  data: CatalogItem[]
  total: number
}> {
  try {
    const res = await fetchFirstAvailable(
      CONTROLLER_PATHS.map((path) => `${path}?limit=${limit}&offset=${offset}`)
    )

    if (!res?.ok) {
      console.error("Failed to fetch controllers:", res?.status)
      return { data: [], total: 0 }
    }

    const response = await res.json()
    const rawData = Array.isArray(response?.data) ? response.data : Array.isArray(response) ? response : []

    return {
      data: rawData.map(normalizeController).filter((item: CatalogItem | null): item is CatalogItem => item !== null),
      total: response?.total || response?.pagination?.total || rawData.length,
    }
  } catch (error) {
    console.error("Error fetching controllers:", error)
    return { data: [], total: 0 }
  }
}

export async function createController(data: Partial<CatalogItem>, token: string): Promise<CatalogItem | null> {
  try {
    const res = await fetchFirstAvailable(CONTROLLER_PATHS, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    if (!res?.ok) {
      throw new Error(`Failed to create controller: ${res?.statusText || "unknown error"}`)
    }

    const response = await res.json()
    return normalizeController(response)
  } catch (error) {
    console.error("Error creating controller:", error)
    throw error
  }
}

export async function updateController(
  id: string | number,
  data: Partial<CatalogItem>,
  token: string
): Promise<CatalogItem | null> {
  try {
    const res = await fetchFirstAvailable(CONTROLLER_PATHS.map((path) => `${path}/${id}`), {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    if (!res?.ok) {
      throw new Error(`Failed to update controller: ${res?.statusText || "unknown error"}`)
    }

    const response = await res.json()
    return normalizeController(response)
  } catch (error) {
    console.error(`Error updating controller ${id}:`, error)
    throw error
  }
}

export async function deleteController(id: string | number, token: string): Promise<boolean> {
  try {
    const res = await fetchFirstAvailable(CONTROLLER_PATHS.map((path) => `${path}/${id}`), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res?.ok) {
      throw new Error(`Failed to delete controller: ${res?.statusText || "unknown error"}`)
    }

    return true
  } catch (error) {
    console.error(`Error deleting controller ${id}:`, error)
    throw error
  }
}

function normalizeController(item: unknown): CatalogItem | null {
  if (!item || typeof item !== "object") {
    return null
  }

  const record =
    typeof (item as { data?: unknown }).data === "object" && (item as { data?: unknown }).data !== null
      ? ((item as { data: Record<string, unknown> }).data as Record<string, unknown>)
      : (item as Record<string, unknown>)

  const cap = getString(record, ["cap", "title", "name", "model"])
  const normalizedId = extractId(record)
  const descr = getString(record, ["descr", "description", "summary", "content"]) ?? ""
  const imageUrl = resolveImageSource(getString(record, ["image", "image_url", "imageUrl", "src"]))
  const link = getString(record, ["link", "href", "url"]) ?? (normalizedId !== undefined ? `/controller/${normalizedId}` : "#")
  const fullDescription = getString(record, ["full_description", "fullDescription"]) ?? descr
  const specifications = Array.isArray(record.specifications) ? record.specifications : []
  const steps = Array.isArray(record.steps) ? record.steps : []
  const model = getString(record, ["model"]) ?? undefined
  const type = getString(record, ["type"]) ?? undefined

  if (!cap) {
    return null
  }

  return {
    id: normalizedId,
    cap,
    type,
    model,
    descr,
    link,
    image: {
      src: imageUrl,
      width: 197,
      height: 266,
    },
    fullDescription,
    specifications: specifications as Array<{
      name: string
      unit: string
      value: string
    }>,
    steps: steps as Array<{
      title: string
      content: string
    }>,
  }
}

function getString(obj: Record<string, unknown>, keys: string[]): string | null {
  for (const key of keys) {
    const value = obj[key]
    if (typeof value === "string" && value.trim()) {
      return value.trim()
    }
  }
  return null
}
