import "server-only"

import type { ProjectDetails, ProjectSection, ProjectStep, ProjectSummary } from "@/types/project"

import { getPublicProjectBySlug, getPublicProjects } from "@/lib/admin-store"
import { fetchBackendCollection } from "@/lib/backend-fetch"
import { buildBackendUrl, getBackendBaseUrl } from "@/lib/backend-url"

const configuredProjectsPath =
  process.env.API_PROJECTS_PATH?.trim().replace(/^\/+|\/+$/g, "") ||
  process.env.NEXT_PUBLIC_API_PROJECTS_PATH?.trim().replace(/^\/+|\/+$/g, "") ||
  ""

const PROJECTS_PATH = configuredProjectsPath || "api/projects"
const PROJECTS_PATH_CANDIDATES = [
  PROJECTS_PATH,
  PROJECTS_PATH.startsWith("api/admin/") ? PROJECTS_PATH.replace(/^api\/admin\//, "api/") : `api/admin/projects`,
]

type UnknownRecord = Record<string, unknown>

const SUMMARY_IMAGE_FALLBACKS = [
  "/images/cases/1.jpg",
  "/images/cases/2.jpg",
  "/images/cases/3.jpg",
]

const MAIN_IMAGE_FALLBACK = "/images/cases/1-big.jpg"

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function firstString(source: UnknownRecord, keys: string[]): string | null {
  for (const key of keys) {
    const value = source[key]

    if (typeof value === "string" && value.trim()) {
      return value.trim()
    }
  }

  return null
}

function resolveAssetUrl(value: string | null, fallback: string) {
  if (!value) {
    return fallback
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

function extractCollection(payload: unknown, depth = 0): unknown[] {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!isRecord(payload) || depth > 2) {
    return []
  }

  const keys = ["items", "data", "projects", "results", "rows"]

  for (const key of keys) {
    const nested = payload[key]
    const collection = extractCollection(nested, depth + 1)

    if (collection.length > 0) {
      return collection
    }
  }

  return []
}

function readTags(source: UnknownRecord): string[] {
  if (!Array.isArray(source.tags)) {
    return []
  }

  return source.tags
    .map(item => {
      if (typeof item === "string") {
        return item.trim()
      }

      if (isRecord(item)) {
        return firstString(item, ["label", "title", "tag", "name"]) ?? ""
      }

      return ""
    })
    .filter(Boolean)
}

function normalizeProjectSummary(item: unknown, index: number): ProjectSummary | null {
  if (!isRecord(item)) {
    return null
  }

  const title = firstString(item, ["title", "name"])
  const description = firstString(item, ["description", "descr", "summary", "content"]) ?? ""
  const slug = firstString(item, ["slug"]) ?? `project-${index + 1}`

  if (!title) {
    return null
  }

  const rawId = item.id
  const id =
    typeof rawId === "number"
      ? rawId
      : typeof rawId === "string" && rawId.trim()
        ? rawId.trim()
        : slug

  return {
    id,
    slug,
    title,
    description,
    image: resolveAssetUrl(
      firstString(item, ["image", "image_url", "cardImage", "previewImage"]),
      SUMMARY_IMAGE_FALLBACKS[index % SUMMARY_IMAGE_FALLBACKS.length]
    ),
    imageMain: resolveAssetUrl(
      firstString(item, ["imageMain", "image_main", "heroImage", "hero_image", "coverImage"]),
      MAIN_IMAGE_FALLBACK
    ),
    tags: readTags(item),
    objectType: firstString(item, ["objectType", "object_type", "type"]) ?? "Проект",
    area: firstString(item, ["area", "square", "size"]) ?? "",
    city: firstString(item, ["city", "location"]) ?? undefined,
  }
}

function normalizeSteps(value: unknown): ProjectStep[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map(item => {
      if (!isRecord(item)) {
        return null
      }

      const title = firstString(item, ["title", "name"])
      const content = firstString(item, ["content", "description", "text"])

      if (!title || !content) {
        return null
      }

      return { title, content }
    })
    .filter((item): item is ProjectStep => item !== null)
}

function normalizeSections(value: unknown): ProjectSection[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((item, index) => {
      if (!isRecord(item)) {
        return null
      }

      const title = firstString(item, ["title", "name"]) ?? firstString(item, ["tag"]) ?? `Секция ${index + 1}`
      const tag = firstString(item, ["tag", "category", "type"]) ?? title
      const textValue = Array.isArray(item.text)
        ? item.text.filter((entry): entry is string => typeof entry === "string" && entry.trim().length > 0)
        : []

      return {
        id: firstString(item, ["id", "slug"]) ?? `section-${index + 1}`,
        title,
        tag,
        image: resolveAssetUrl(firstString(item, ["image", "image_url", "photo"]), MAIN_IMAGE_FALLBACK),
        text: textValue,
      }
    })
    .filter((item): item is ProjectSection => item !== null)
}

function normalizeProjectDetails(item: unknown): ProjectDetails | null {
  const summary = normalizeProjectSummary(item, 0)

  if (!summary || !isRecord(item)) {
    return null
  }

  return {
    ...summary,
    heroImage: resolveAssetUrl(
      firstString(item, ["heroImage", "hero_image", "imageMain", "image_main"]),
      summary.imageMain || MAIN_IMAGE_FALLBACK
    ),
    steps: normalizeSteps(item.steps),
    sections: normalizeSections(item.sections),
    relatedProjectSlugs: Array.isArray(item.relatedProjectSlugs)
      ? item.relatedProjectSlugs.filter(
        (entry): entry is string => typeof entry === "string" && entry.trim().length > 0
      )
      : Array.isArray(item.related_project_slugs)
        ? item.related_project_slugs.filter(
          (entry): entry is string => typeof entry === "string" && entry.trim().length > 0
        )
        : [],
  }
}

async function getBackendProjects(): Promise<ProjectSummary[] | null> {
  return fetchBackendCollection<ProjectSummary>({
    label: "projects",
    paths: PROJECTS_PATH_CANDIDATES,
    extract: extractCollection,
    normalize: normalizeProjectSummary,
  })
}

async function getBackendProjectBySlug(slug: string): Promise<ProjectDetails | null> {
  const baseUrl = getBackendBaseUrl()

  if (!baseUrl) {
    return null
  }

  const slugPathCandidates = PROJECTS_PATH_CANDIDATES.flatMap(path => [
    `${path}/${encodeURIComponent(slug)}`,
  ])

  for (const path of slugPathCandidates) {
    try {
      const response = await fetch(buildBackendUrl(path), {
        cache: "no-store",
      })

      if (!response.ok) {
        continue
      }

      const payload = (await response.json()) as unknown
      const normalized = normalizeProjectDetails(payload)

      if (normalized) {
        return normalized
      }
    } catch (error) {
      console.warn(`Failed to load project "${slug}" from backend (${path}):`, error)
    }
  }

  return null
}

export async function getProjects(): Promise<ProjectSummary[]> {
  const backendItems = await getBackendProjects()

  if (backendItems) {
    return backendItems
  }

  return []
}

export async function getProjectBySlug(slug: string): Promise<ProjectDetails | null> {
  const backendItem = await getBackendProjectBySlug(slug)

  if (backendItem) {
    return backendItem
  }

  const item = await getPublicProjectBySlug(slug)

  if (!item) {
    return null
  }

  const { status: _status, createdAt: _createdAt, updatedAt: _updatedAt, ...project } = item
  return project
}
