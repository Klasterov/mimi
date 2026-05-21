import "server-only"

import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

import type { Article } from "@/types/article"
import type { CatalogItem } from "@/types/catalog"
import type { Detector } from "@/types/detector"
import type { ProjectDetails, ProjectSection, ProjectStep, ProjectSummary } from "@/types/project"

export type AdminEntity = "admins" | "articles" | "controllers" | "detectors" | "equipment" | "leads" | "projects"

export type ArticleRecord = Article & {
  slug: string
  author: string
  category: string
  status: "draft" | "published" | "archived"
  createdAt: string
  updatedAt: string
}

export type ControllerRecord = CatalogItem & {
  id: number | string
  status: boolean
  createdAt: string
  updatedAt: string
}

export type DetectorRecord = Detector & {
  id: number | string
  status: boolean
  createdAt: string
  updatedAt: string
}

export type EquipmentRecord = {
  id: number | string
  cap: string
  type: string
  model: string
  descr: string
  full_description: string
  image: string
  specifications: Array<{
    name: string
    unit: string
    value: string
  }>
  steps: Array<{
    title: string
    content: string
  }>
  status: boolean
  createdAt: string
  updatedAt: string
}

export type ProjectRecord = ProjectDetails & {
  status: "active" | "draft" | "archived"
  createdAt: string
  updatedAt: string
}

export type LeadRecord = {
  id: number
  name: string
  phone: string
  comment: string | null
  consent: boolean
  pageUrl: string
  formType: string | null
  submittedAt: string
  updatedAt: string
}

export type AdminUserRecord = {
  id: string
  username: string
  passwordHash: string
  salt: string
  createdAt: string
}

type EntityMap = {
  admins: AdminUserRecord
  articles: ArticleRecord
  controllers: ControllerRecord
  detectors: DetectorRecord
  equipment: EquipmentRecord
  leads: LeadRecord
  projects: ProjectRecord
}

type SearchOptions = {
  page?: number
  limit?: number
  search?: string
}

type PaginatedResponse<T> = {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

const STORAGE_DIR = path.join(process.cwd(), "storage", "admin")
const IS_VERCEL = process.env.VERCEL === "1"
const IS_PRODUCTION = process.env.NODE_ENV === "production"

function nowIso() {
  return new Date().toISOString()
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/['"`]+/g, "")
    .replace(/[^a-z0-9а-яё]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-") || `item-${Date.now()}`
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function text(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback
}

function bool(value: unknown, fallback = false) {
  return typeof value === "boolean" ? value : fallback
}

function numberValue(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback
}

function stringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map(item => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean)
}

function equipmentSpecifications(value: unknown): EquipmentRecord["specifications"] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map(item => {
      if (!isObject(item)) {
        return null
      }

      const name = text(item.name)
      const unit = text(item.unit)
      const normalizedValue =
        typeof item.value === "string" || typeof item.value === "number" ? String(item.value) : ""

      if (!name && !unit && !normalizedValue) {
        return null
      }

      return { name, unit, value: normalizedValue }
    })
    .filter((item): item is EquipmentRecord["specifications"][number] => item !== null)
}

function equipmentSteps(value: unknown): EquipmentRecord["steps"] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map(item => {
      if (!isObject(item)) {
        return null
      }

      const title = text(item.title)
      const content = text(item.content)

      if (!title && !content) {
        return null
      }

      return { title, content }
    })
    .filter((item): item is EquipmentRecord["steps"][number] => item !== null)
}

function projectSteps(value: unknown): ProjectStep[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map(item => {
      if (!isObject(item)) {
        return null
      }

      const title = text(item.title)
      const content = text(item.content)

      if (!title || !content) {
        return null
      }

      return { title, content }
    })
    .filter((item): item is ProjectStep => item !== null)
}

function projectSections(value: unknown): ProjectSection[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((item, index) => {
      if (!isObject(item)) {
        return null
      }

      const title = text(item.title)
      const tag = text(item.tag, title || "Секция")
      const image = text(item.image, "/images/cases/1-big.jpg")
      const paragraphs = Array.isArray(item.text)
        ? item.text
            .map(entry => (typeof entry === "string" ? entry.trim() : ""))
            .filter(Boolean)
        : []

      if (!title) {
        return null
      }

      return {
        id: text(item.id, `section-${index + 1}`),
        title,
        tag,
        image,
        text: paragraphs,
      }
    })
    .filter((item): item is ProjectSection => item !== null)
}

function ensureProjectDetails(record: Partial<ProjectRecord>, index = 0): ProjectRecord {
  const createdAt = text(record.createdAt, nowIso())
  const updatedAt = text(record.updatedAt, createdAt)
  const slug = text(record.slug, `project-${index + 1}`)

  return {
    id: record.id ?? slug,
    slug,
    title: text(record.title, `Проект ${index + 1}`),
    description: text(record.description),
    image: text(record.image, "/images/cases/1.jpg"),
    imageMain: text(record.imageMain, "/images/cases/1-big.jpg"),
    heroImage: text(record.heroImage, text(record.imageMain, "/images/cases/1-big.jpg")),
    tags: Array.isArray(record.tags) ? record.tags.filter(Boolean) : [],
    objectType: text(record.objectType, "Проект"),
    area: text(record.area),
    city: text(record.city),
    steps: projectSteps(record.steps),
    sections: projectSections(record.sections),
    relatedProjectSlugs: Array.isArray(record.relatedProjectSlugs)
      ? record.relatedProjectSlugs.filter(Boolean)
      : [],
    status:
      record.status === "draft" || record.status === "archived" || record.status === "active"
        ? record.status
        : "active",
    createdAt,
    updatedAt,
  }
}

async function ensureStorageDir() {
  await mkdir(STORAGE_DIR, { recursive: true })
}

function entityPath(entity: AdminEntity) {
  return path.join(STORAGE_DIR, `${entity}.json`)
}

async function readCollection<T extends AdminEntity>(entity: T): Promise<EntityMap[T][]> {
  const filePath = entityPath(entity)

  try {
    // Убедимся, что директория существует перед попыткой чтения
    await ensureStorageDir()
    
    const fileContents = await readFile(filePath, "utf8")
    const parsed = JSON.parse(fileContents) as unknown

    if (!Array.isArray(parsed)) {
      console.log(`[DB] ${entity}: Not array, using empty collection`)
      return []
    }

    console.log(`[DB] ${entity}: Loaded ${parsed.length} items from ${filePath}`)
    return parsed as EntityMap[T][]
  } catch (error) {
    if ((error as NodeJS.ErrnoException)?.code === "ENOENT") {
      if (!IS_PRODUCTION) {
        console.log(`[DB] ${entity}: File not found at ${filePath}, using empty collection`)
      }
      return []
    }

    console.log(`[DB] ${entity}: Error reading file, using empty collection`, error)
    return []
  }
}

async function writeCollection<T extends AdminEntity>(entity: T, items: EntityMap[T][]) {
  await ensureStorageDir()
  await writeFile(entityPath(entity), JSON.stringify(items, null, 2), "utf8")
}

function nextNumericId(items: Array<{ id: number | string }>) {
  const numbers = items
    .map(item => (typeof item.id === "number" ? item.id : Number.parseInt(String(item.id), 10)))
    .filter(value => Number.isFinite(value))

  return (numbers.length ? Math.max(...numbers) : 0) + 1
}

function matchesSearch(value: unknown, search: string): boolean {
  if (!search) {
    return true
  }

  const normalizedSearch = search.toLowerCase()

  if (typeof value === "string") {
    return value.toLowerCase().includes(normalizedSearch)
  }

  if (typeof value === "number") {
    return String(value).includes(normalizedSearch)
  }

  if (typeof value === "boolean") {
    return (value ? "true" : "false").includes(normalizedSearch)
  }

  if (Array.isArray(value)) {
    return value.some(entry => matchesSearch(entry, normalizedSearch))
  }

  if (isObject(value)) {
    return Object.values(value).some(entry => matchesSearch(entry, normalizedSearch))
  }

  return false
}

function filterEntityItems<T extends AdminEntity>(entity: T, items: EntityMap[T][], search: string) {
  if (!search) {
    return items
  }

  const fields: Record<AdminEntity, string[]> = {
    admins: ["username"],
    articles: ["title", "description", "tag", "slug", "author"],
    controllers: ["cap", "descr", "link"],
    detectors: ["slug", "title", "subtitle"],
    equipment: ["cap", "type", "model", "descr", "full_description"],
    leads: ["name", "phone", "comment", "pageUrl", "formType"],
    projects: ["slug", "title", "description", "city", "objectType", "area"],
  }

  return items.filter(item => fields[entity].some(field => matchesSearch((item as Record<string, unknown>)[field], search)))
}

function paginateItems<T>(items: T[], options: SearchOptions): PaginatedResponse<T> {
  const page = Math.max(1, options.page ?? 1)
  const limit = Math.max(1, Math.min(100, options.limit ?? 20))
  const total = items.length
  const pages = Math.max(1, Math.ceil(total / limit))
  const safePage = Math.min(page, pages)
  const start = (safePage - 1) * limit

  return {
    data: items.slice(start, start + limit),
    pagination: {
      page: safePage,
      limit,
      total,
      pages,
    },
  }
}

function normalizeArticleRecord(input: Partial<ArticleRecord>, existing?: ArticleRecord): ArticleRecord {
  const createdAt = existing?.createdAt ?? text(input.createdAt, nowIso())
  const updatedAt = nowIso()
  const title = text(input.title, existing?.title || "")

  return {
    id: input.id ?? existing?.id ?? Date.now(),
    tag: text(input.tag, existing?.tag || "Тег"),
    title,
    description: text(input.description, existing?.description || ""),
    image: text(input.image, existing?.image || "/images/articles/1.jpg"),
    date: text(input.date, existing?.date || new Date().toISOString().slice(0, 10)),
    isWide: bool(input.isWide, existing?.isWide ?? false),
    slug: text(input.slug, existing?.slug || slugify(title || `article-${Date.now()}`)),
    author: text(input.author, existing?.author || "Admin"),
    category: text(input.category, existing?.category || "news"),
    status:
      input.status === "draft" || input.status === "archived" || input.status === "published"
        ? input.status
        : existing?.status ?? "published",
    createdAt,
    updatedAt,
  }
}

function normalizeControllerRecord(
  input: Partial<ControllerRecord>,
  existing?: ControllerRecord,
  index = 0
): ControllerRecord {
  const createdAt = existing?.createdAt ?? text(input.createdAt, nowIso())
  const updatedAt = nowIso()
  const imageInput: Record<string, unknown> = isObject(input.image) ? input.image : {}
  const imageExisting = existing?.image

  return {
    id: input.id ?? existing?.id ?? index + 1,
    cap: text(input.cap, existing?.cap || ""),
    descr: text(input.descr, existing?.descr || ""),
    link: text(input.link, existing?.link || "#"),
    image: {
      src: text(imageInput.src, imageExisting?.src || "/images/products/1.png"),
      width: numberValue(imageInput.width, imageExisting?.width || 197),
      height: numberValue(imageInput.height, imageExisting?.height || 266),
    },
    status: bool(input.status, existing?.status ?? true),
    createdAt,
    updatedAt,
  }
}

function normalizeDetectorRecord(
  input: Partial<DetectorRecord>,
  existing?: DetectorRecord,
  index = 0
): DetectorRecord {
  const createdAt = existing?.createdAt ?? text(input.createdAt, nowIso())
  const updatedAt = nowIso()
  const slug = text(input.slug, existing?.slug || `detector-${index + 1}`)

  return {
    id: input.id ?? existing?.id ?? slug,
    slug,
    title: text(input.title, existing?.title || ""),
    subtitle: text(input.subtitle, existing?.subtitle || ""),
    icon: text(input.icon, existing?.icon || "/images/detector-page/icons/1.svg"),
    image: text(input.image, existing?.image || "/images/detector-page/cols/1.png"),
    bg: text(input.bg, existing?.bg || "bg-white"),
    linkHover: text(input.linkHover, existing?.linkHover || "hover:text-foreground"),
    isWide: bool(input.isWide, existing?.isWide ?? false),
    detectorExample: isObject(input.detectorExample)
      ? (input.detectorExample as Detector["detectorExample"])
      : existing?.detectorExample,
    hero: isObject(input.hero) ? (input.hero as Detector["hero"]) : existing?.hero,
    info: isObject(input.info) ? (input.info as Detector["info"]) : existing?.info,
    status: bool(input.status, existing?.status ?? true),
    createdAt,
    updatedAt,
  }
}

function normalizeEquipmentRecord(
  input: Partial<EquipmentRecord>,
  existing?: EquipmentRecord,
  index = 0
): EquipmentRecord {
  const createdAt = existing?.createdAt ?? text(input.createdAt, nowIso())
  const updatedAt = nowIso()

  return {
    id: input.id ?? existing?.id ?? index + 1,
    cap: text(input.cap, existing?.cap || ""),
    type: text(input.type, existing?.type || ""),
    model: text(input.model, existing?.model || ""),
    descr: text(input.descr, existing?.descr || ""),
    full_description: text(input.full_description, existing?.full_description || ""),
    image: text(input.image, existing?.image || ""),
    specifications: equipmentSpecifications(input.specifications ?? existing?.specifications),
    steps: equipmentSteps(input.steps ?? existing?.steps),
    status: bool(input.status, existing?.status ?? true),
    createdAt,
    updatedAt,
  }
}

function normalizeProjectRecord(input: Partial<ProjectRecord>, existing?: ProjectRecord, index = 0): ProjectRecord {
  const normalized = ensureProjectDetails(
    {
      ...existing,
      ...input,
      id: input.id ?? existing?.id ?? Date.now(),
      slug: text(input.slug, existing?.slug || `project-${index + 1}`),
      title: text(input.title, existing?.title || ""),
      description: text(input.description, existing?.description || ""),
      image: text(input.image, existing?.image || "/images/cases/1.jpg"),
      imageMain: text(input.imageMain, existing?.imageMain || "/images/cases/1-big.jpg"),
      heroImage: text(input.heroImage, existing?.heroImage || input.imageMain || "/images/cases/1-big.jpg"),
      objectType: text(input.objectType, existing?.objectType || "Проект"),
      area: text(input.area, existing?.area || ""),
      city: text(input.city, existing?.city || ""),
      tags: Array.isArray(input.tags) ? input.tags.filter(Boolean) : existing?.tags || [],
      steps: Array.isArray(input.steps) ? input.steps : existing?.steps || [],
      sections: Array.isArray(input.sections) ? input.sections : existing?.sections || [],
      relatedProjectSlugs: Array.isArray(input.relatedProjectSlugs)
        ? input.relatedProjectSlugs.filter(Boolean)
        : existing?.relatedProjectSlugs || [],
      status:
        input.status === "active" || input.status === "draft" || input.status === "archived"
          ? input.status
          : existing?.status ?? "active",
      createdAt: existing?.createdAt ?? nowIso(),
      updatedAt: nowIso(),
    },
    index
  )

  return normalized
}

function normalizeLeadRecord(input: Partial<LeadRecord>, existing?: LeadRecord, id?: number): LeadRecord {
  const createdAt = existing?.submittedAt ?? nowIso()

  return {
    id: id ?? existing?.id ?? Date.now(),
    name: text(input.name, existing?.name || ""),
    phone: text(input.phone, existing?.phone || ""),
    comment:
      input.comment === null ? null : text(input.comment, existing?.comment || "") || null,
    consent: bool(input.consent, existing?.consent ?? true),
    pageUrl: text(input.pageUrl, existing?.pageUrl || ""),
    formType:
      input.formType === null ? null : text(input.formType, existing?.formType || "") || null,
    submittedAt: createdAt,
    updatedAt: nowIso(),
  }
}

export async function listEntity<T extends Exclude<AdminEntity, "admins">>(
  entity: T,
  options: SearchOptions = {}
): Promise<PaginatedResponse<EntityMap[T]>> {
  const items = await readCollection(entity)
  const filtered = filterEntityItems(entity, items, text(options.search).toLowerCase())

  const sorted = [...filtered].sort((a, b) => {
    const left = "updatedAt" in a ? String(a.updatedAt) : ""
    const right = "updatedAt" in b ? String(b.updatedAt) : ""
    return right.localeCompare(left)
  })

  return paginateItems(sorted, options)
}

export async function getEntityById<T extends Exclude<AdminEntity, "admins">>(
  entity: T,
  id: string
): Promise<EntityMap[T] | null> {
  const items = await readCollection(entity)
  return items.find(item => String(item.id) === id) ?? null
}

export async function createEntityItem<T extends Exclude<AdminEntity, "admins">>(
  entity: T,
  input: Partial<EntityMap[T]>
): Promise<EntityMap[T]> {
  const items = await readCollection(entity)

  let created: EntityMap[T]

  switch (entity) {
    case "articles":
      created = normalizeArticleRecord(
        { ...(input as Partial<ArticleRecord>), id: nextNumericId(items as Array<{ id: number | string }>) }
      ) as EntityMap[T]
      break
    case "controllers":
      created = normalizeControllerRecord(
        { ...(input as Partial<ControllerRecord>), id: nextNumericId(items as Array<{ id: number | string }>) },
        undefined,
        items.length
      ) as EntityMap[T]
      break
    case "detectors":
      created = normalizeDetectorRecord(input as Partial<DetectorRecord>, undefined, items.length) as EntityMap[T]
      break
    case "equipment":
      created = normalizeEquipmentRecord(input as Partial<EquipmentRecord>, undefined, items.length) as EntityMap[T]
      break
    case "leads":
      created = normalizeLeadRecord(
        input as Partial<LeadRecord>,
        undefined,
        nextNumericId(items as Array<{ id: number | string }>)
      ) as EntityMap[T]
      break
    case "projects":
      created = normalizeProjectRecord(input as Partial<ProjectRecord>, undefined, items.length) as EntityMap[T]
      break
    default:
      throw new Error(`Unsupported entity: ${entity satisfies never}`)
  }

  await writeCollection(entity, [created, ...items])
  return created
}

export async function updateEntityItem<T extends Exclude<AdminEntity, "admins">>(
  entity: T,
  id: string,
  input: Partial<EntityMap[T]>
): Promise<EntityMap[T] | null> {
  const items = await readCollection(entity)
  const index = items.findIndex(item => String(item.id) === id)

  if (index === -1) {
    return null
  }

  const existing = items[index]
  let updated: EntityMap[T]

  switch (entity) {
    case "articles":
      updated = normalizeArticleRecord(input as Partial<ArticleRecord>, existing as ArticleRecord) as EntityMap[T]
      break
    case "controllers":
      updated = normalizeControllerRecord(
        input as Partial<ControllerRecord>,
        existing as ControllerRecord,
        index
      ) as EntityMap[T]
      break
    case "detectors":
      updated = normalizeDetectorRecord(input as Partial<DetectorRecord>, existing as DetectorRecord, index) as EntityMap[T]
      break
    case "equipment":
      updated = normalizeEquipmentRecord(input as Partial<EquipmentRecord>, existing as EquipmentRecord, index) as EntityMap[T]
      break
    case "leads":
      updated = normalizeLeadRecord(input as Partial<LeadRecord>, existing as LeadRecord) as EntityMap[T]
      break
    case "projects":
      updated = normalizeProjectRecord(input as Partial<ProjectRecord>, existing as ProjectRecord, index) as EntityMap[T]
      break
    default:
      throw new Error(`Unsupported entity: ${entity satisfies never}`)
  }

  const nextItems = [...items]
  nextItems[index] = updated
  await writeCollection(entity, nextItems)

  return updated
}

export async function deleteEntityItem<T extends Exclude<AdminEntity, "admins">>(entity: T, id: string) {
  const items = await readCollection(entity)
  const nextItems = items.filter(item => String(item.id) !== id)

  if (nextItems.length === items.length) {
    return false
  }

  await writeCollection(entity, nextItems)
  return true
}

export async function listAdmins() {
  return readCollection("admins")
}

export async function writeAdmins(items: AdminUserRecord[]) {
  await writeCollection("admins", items)
}

export async function getPublicArticles(): Promise<ArticleRecord[]> {
  console.log('[getPublicArticles] Starting...')
  const items = await readCollection("articles")
  console.log('[getPublicArticles] Read items:', items.length)
  const filtered = items
    .filter(item => item.status === "published")
    .sort((a, b) => new Date(`${b.date}T00:00:00`).getTime() - new Date(`${a.date}T00:00:00`).getTime())
  console.log('[getPublicArticles] After filter:', filtered.length)
  return filtered
}

export async function getPublicControllers(): Promise<ControllerRecord[]> {
  const items = await readCollection("controllers")
  return items.filter(item => item.status)
}

export async function getPublicDetectors(): Promise<DetectorRecord[]> {
  const items = await readCollection("detectors")
  return items.filter(item => item.status)
}

export async function getPublicProjects(): Promise<ProjectRecord[]> {
  if (IS_PRODUCTION && IS_VERCEL) {
    return []
  }

  const items = await readCollection("projects")
  return items.filter(item => item.status === "active")
}

export async function getPublicProjectBySlug(slug: string): Promise<ProjectRecord | null> {
  const items = await getPublicProjects()
  return items.find(item => item.slug === slug) ?? null
}

export async function createLead(input: {
  name: string
  phone: string
  comment?: string | null
  consent: boolean
  pageUrl: string
  formType?: string | null
}) {
  return createEntityItem("leads", {
    name: input.name,
    phone: input.phone,
    comment: input.comment ?? null,
    consent: input.consent,
    pageUrl: input.pageUrl,
    formType: input.formType ?? null,
  })
}

export async function leadStats(from?: string, to?: string) {
  const items = await readCollection("leads")
  const start = from ? new Date(`${from}T00:00:00`) : null
  const end = to ? new Date(`${to}T23:59:59`) : null

  const filtered = items.filter(item => {
    const submitted = new Date(item.submittedAt)

    if (start && submitted < start) {
      return false
    }

    if (end && submitted > end) {
      return false
    }

    return true
  })

  const byDay = filtered.reduce<Record<string, number>>((acc, item) => {
    const day = item.submittedAt.slice(0, 10)
    acc[day] = (acc[day] ?? 0) + 1
    return acc
  }, {})

  return {
    total: filtered.length,
    consentYes: filtered.filter(item => item.consent).length,
    consentNo: filtered.filter(item => !item.consent).length,
    withComment: filtered.filter(item => Boolean(item.comment)).length,
    byDay: Object.entries(byDay)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ date, count })),
  }
}

export async function exportLeads(format: "csv" | "json", from?: string, to?: string) {
  const items = (await listEntity("leads", { page: 1, limit: 10000 })).data
  const start = from ? new Date(`${from}T00:00:00`) : null
  const end = to ? new Date(`${to}T23:59:59`) : null
  const filtered = items.filter(item => {
    const submitted = new Date(item.submittedAt)

    if (start && submitted < start) {
      return false
    }

    if (end && submitted > end) {
      return false
    }

    return true
  })

  if (format === "json") {
    return JSON.stringify(filtered, null, 2)
  }

  const header = [
    "id",
    "name",
    "phone",
    "comment",
    "consent",
    "pageUrl",
    "formType",
    "submittedAt",
  ]
  const rows = filtered.map(item =>
    [
      item.id,
      item.name,
      item.phone,
      item.comment ?? "",
      item.consent ? "true" : "false",
      item.pageUrl,
      item.formType ?? "",
      item.submittedAt,
    ]
      .map(value => `"${String(value).replaceAll('"', '""')}"`)
      .join(",")
  )

  return [header.join(","), ...rows].join("\n")
}
