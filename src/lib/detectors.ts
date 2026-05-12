import "server-only"

import type { Detector, DetectorExampleData, DetectorHero, DetectorInfo, InfoSection } from "@/types/detector"

import { getPublicDetectors } from "@/lib/admin-store"
import { fetchBackendCollection } from "@/lib/backend-fetch"
import { buildBackendUrl, getBackendBaseUrl } from "@/lib/backend-url"

const configuredDetectorsPath =
  process.env.API_DETECTORS_PATH?.trim().replace(/^\/+|\/+$/g, "") ||
  process.env.NEXT_PUBLIC_API_DETECTORS_PATH?.trim().replace(/^\/+|\/+$/g, "") ||
  ""

const DETECTORS_PATH = configuredDetectorsPath || "api/detectors"
const DETECTORS_PATH_CANDIDATES = [
  DETECTORS_PATH,
  DETECTORS_PATH.startsWith("api/admin/") ? DETECTORS_PATH.replace(/^api\/admin\//, "api/") : "api/admin/detectors",
]

const DETECTOR_ICON_FALLBACKS = [
  "/images/detector-page/icons/1.svg",
  "/images/detector-page/icons/2.svg",
  "/images/detector-page/icons/3.svg",
  "/images/detector-page/icons/4.svg",
  "/images/detector-page/icons/5.svg",
  "/images/detector-page/icons/6.svg",
  "/images/detector-page/icons/7.svg",
]

const DETECTOR_IMAGE_FALLBACKS = [
  "/images/detector-page/cols/1.png",
  "/images/detector-page/cols/2.png",
  "/images/detector-page/cols/3.png",
  "/images/detector-page/cols/4.png",
  "/images/detector-page/cols/5.png",
  "/images/detector-page/cols/6.png",
  "/images/detector-page/cols/7.png",
]

const DETECTOR_EXAMPLE_FALLBACKS = [
  "/images/detector-page/example/1.png",
  "/images/detector-page/example/2.png",
  "/images/detector-page/example/5.png",
  "/images/detector-page/example/6.png",
  "/images/detector-page/example/4.png",
  "/images/detector-page/example/3.png",
  "/images/detector-page/example/07.png",
]

const DETECTOR_HERO_FALLBACKS = [
  "/images/detector-page/hero/01.png",
  "/images/detector-page/hero/02.png",
  "/images/detector-page/hero/05.png",
  "/images/detector-page/hero/06.png",
  "/images/detector-page/hero/04.png",
  "/images/detector-page/hero/03.png",
  "/images/detector-page/hero/07.png",
]

type UnknownRecord = Record<string, unknown>

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

function firstNumber(source: UnknownRecord, keys: string[], fallback: number): number {
  for (const key of keys) {
    const value = source[key]

    if (typeof value === "number" && Number.isFinite(value)) {
      return value
    }

    if (typeof value === "string") {
      const parsed = Number(value)

      if (Number.isFinite(parsed)) {
        return parsed
      }
    }
  }

  return fallback
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

  const keys = ["items", "data", "detectors", "results", "rows"]

  for (const key of keys) {
    const nested = payload[key]
    const collection = extractCollection(nested, depth + 1)

    if (collection.length > 0) {
      return collection
    }
  }

  return []
}

function normalizeStringArray(value: unknown): string[] {
  if (typeof value === "string" && value.trim()) {
    return [value.trim()]
  }

  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map(item => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean)
}

function normalizeDetectorRuler(value: unknown): DetectorExampleData["ruler"] | undefined {
  if (!isRecord(value)) {
    return undefined
  }

  const label = firstString(value, ["label", "text"]) ?? ""
  const x1 = firstNumber(value, ["x1", "x_1"], 0)
  const y1 = firstNumber(value, ["y1", "y_1"], 0)
  const x2 = firstNumber(value, ["x2", "x_2"], 0)
  const y2 = firstNumber(value, ["y2", "y_2"], 0)

  if (!label) {
    return undefined
  }

  return {
    label,
    x1,
    y1,
    x2,
    y2,
    textOffset: firstNumber(value, ["textOffset", "text_offset"], 20),
    fontSize: firstNumber(value, ["fontSize", "font_size"], 15),
    strokeWidth: firstNumber(value, ["strokeWidth", "stroke_width"], 1.5),
    color: firstString(value, ["color"]) ?? undefined,
  }
}

function normalizeDetectorExample(value: unknown, index: number): DetectorExampleData | null {
  if (!isRecord(value)) {
    return null
  }

  const title = firstString(value, ["title", "name"]) ?? `Пример ${index + 1}`
  const text = firstString(value, ["text", "description", "summary", "content"]) ?? ""
  const theme = firstString(value, ["theme"])
  const image = resolveAssetUrl(
    firstString(value, ["image", "image_url", "imageUrl", "photo"]),
    DETECTOR_EXAMPLE_FALLBACKS[index % DETECTOR_EXAMPLE_FALLBACKS.length]
  )

  return {
    title,
    text,
    image,
    imageWidth: firstNumber(value, ["imageWidth", "image_width", "width"], 390),
    imageHeight: firstNumber(value, ["imageHeight", "image_height", "height"], 390),
    theme: theme === "dark" ? "dark" : theme === "light" ? "light" : undefined,
    ruler: normalizeDetectorRuler(value.ruler ?? value.rulerData ?? value.ruler_data),
  }
}

function normalizeDetectorHero(value: unknown, index: number): DetectorHero | null {
  if (!isRecord(value)) {
    return null
  }

  const title = firstString(value, ["title", "name"]) ?? `Датчик ${index + 1}`
  const text = firstString(value, ["text", "description", "summary", "content"]) ?? ""
  const image = resolveAssetUrl(
    firstString(value, ["image", "image_url", "imageUrl", "photo"]),
    DETECTOR_HERO_FALLBACKS[index % DETECTOR_HERO_FALLBACKS.length]
  )

  return {
    title,
    text,
    image,
    imageWidth: firstNumber(value, ["imageWidth", "image_width", "width"], 640),
    imageHeight: firstNumber(value, ["imageHeight", "image_height", "height"], 420),
    sectionClasses: firstString(value, ["sectionClasses", "section_classes"]) ?? undefined,
    imageWrapperClasses: firstString(value, ["imageWrapperClasses", "image_wrapper_classes"]) ?? undefined,
    contentWrapperClasses:
      firstString(value, ["contentWrapperClasses", "content_wrapper_classes"]) ?? undefined,
  }
}

function normalizeInfoSection(value: unknown, index: number): InfoSection | null {
  if (!isRecord(value)) {
    return null
  }

  const title = firstString(value, ["title", "name"]) ?? `Раздел ${index + 1}`
  const text = normalizeStringArray(value.text ?? value.paragraphs)
  const list = normalizeStringArray(value.list ?? value.items)

  if (!title || (text.length === 0 && list.length === 0)) {
    return null
  }

  return {
    title,
    ...(text.length > 0 ? { text } : {}),
    ...(list.length > 0 ? { list } : {}),
  }
}

function normalizeDetectorInfo(value: unknown): DetectorInfo | null {
  if (!isRecord(value)) {
    return null
  }

  const sectionsSource = Array.isArray(value.sections)
    ? value.sections
    : Array.isArray(value.items)
      ? value.items
      : []

  const sections = sectionsSource
    .map((section, index) => normalizeInfoSection(section, index))
    .filter((section): section is InfoSection => section !== null)

  if (sections.length === 0) {
    return null
  }

  const theme = firstString(value, ["theme"])

  return {
    sections,
    ...(theme === "dark" || theme === "light" ? { theme } : {}),
  }
}

function normalizeDetectorItem(item: unknown, index: number): Detector | null {
  if (!isRecord(item)) {
    return null
  }

  if (typeof item.status === "boolean" && !item.status) {
    return null
  }

  const slug = firstString(item, ["slug"]) ?? `detector-${index + 1}`
  const title = firstString(item, ["title", "name"])

  if (!title) {
    return null
  }

  const subtitle = firstString(item, ["subtitle", "description", "summary", "tagline"]) ?? ""

  const isWide =
    typeof item.isWide === "boolean"
      ? item.isWide
      : typeof item.is_wide === "boolean"
        ? item.is_wide
        : undefined

  return {
    slug,
    title,
    subtitle,
    icon: resolveAssetUrl(
      firstString(item, ["icon", "icon_url", "iconUrl", "iconPath"]),
      DETECTOR_ICON_FALLBACKS[index % DETECTOR_ICON_FALLBACKS.length]
    ),
    image: resolveAssetUrl(
      firstString(item, ["image", "image_url", "imageUrl", "cardImage", "previewImage"]),
      DETECTOR_IMAGE_FALLBACKS[index % DETECTOR_IMAGE_FALLBACKS.length]
    ),
    bg: firstString(item, ["bg", "background", "backgroundClass"]) ?? "bg-white",
    linkHover: firstString(item, ["linkHover", "link_hover", "hoverClass"]) ?? "hover:text-foreground",
    ...(typeof isWide === "boolean" ? { isWide } : {}),
    detectorExample: normalizeDetectorExample(
      item.detectorExample ?? item.detector_example ?? item.example,
      index
    ) ?? undefined,
    info: normalizeDetectorInfo(item.info ?? item.information) ?? undefined,
    hero: normalizeDetectorHero(item.hero ?? item.heroSection ?? item.hero_section, index) ?? undefined,
  }
}

async function getBackendDetectors(): Promise<Detector[] | null> {
  return fetchBackendCollection<Detector>({
    label: "detectors",
    paths: DETECTORS_PATH_CANDIDATES,
    extract: extractCollection,
    normalize: normalizeDetectorItem,
  })
}

export async function getDetectors(): Promise<Detector[]> {
  const backendItems = await getBackendDetectors()

  if (backendItems !== null) {
    return backendItems
  }

  const items = await getPublicDetectors()

  return items.map(
    ({ id: _id, status: _status, createdAt: _createdAt, updatedAt: _updatedAt, ...detector }) =>
      detector
  )
}
