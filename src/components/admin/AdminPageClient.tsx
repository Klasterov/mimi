"use client"

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react"

import styles from "./admin.module.css"

type AdminInfo = {
  id: string
  username: string
}

type SessionResponse = {
  authenticated: boolean
  admin?: AdminInfo
}

type Pagination = {
  page: number
  limit: number
  total: number
  pages: number
}

type EntityTab = "articles" | "controllers" | "detectors" | "leads" | "projects" | "stats"
type FieldType = "boolean" | "date" | "json" | "number" | "select" | "text" | "textarea" | "stringList"

type FieldConfig = {
  name: string
  label: string
  type: FieldType
  placeholder?: string
  rows?: number
  uploadFolder?: string
  required?: boolean
  options?: Array<{ label: string; value: string }>
}

type EntityConfig = {
  entity: Exclude<EntityTab, "stats">
  title: string
  subtitle: string
  summaryFields: string[]
  allowCreate?: boolean
  fields: FieldConfig[]
}

type FormState = Record<string, string | boolean>

const ENTITY_CONFIGS: Record<Exclude<EntityTab, "stats">, EntityConfig> = {
  articles: {
    entity: "articles",
    title: "Статьи",
    subtitle: "Управление публикациями на сайте.",
    summaryFields: ["title", "tag", "date", "status"],
    fields: [
      { name: "tag", label: "Тег", type: "text" },
      { name: "title", label: "Заголовок", type: "text", required: true },
      { name: "description", label: "Описание", type: "textarea", rows: 5 },
      { name: "image", label: "Изображение", type: "text", uploadFolder: "articles" },
      { name: "date", label: "Дата", type: "date" },
      { name: "slug", label: "Slug", type: "text" },
      { name: "author", label: "Автор", type: "text" },
      {
        name: "category",
        label: "Категория",
        type: "select",
        options: [
          { value: "news", label: "Новости" },
          { value: "articles", label: "Статьи" },
        ],
      },
      {
        name: "status",
        label: "Статус",
        type: "select",
        options: [
          { value: "published", label: "Опубликовано" },
          { value: "draft", label: "Черновик" },
          { value: "archived", label: "Архив" },
        ],
      },
      { name: "isWide", label: "Широкая карточка", type: "boolean" },
    ],
  },
  controllers: {
    entity: "controllers",
    title: "Контроллеры",
    subtitle: "Карточки для каталога и страницы контроллеров.",
    summaryFields: ["cap", "descr", "status"],
    fields: [
      { name: "cap", label: "Название", type: "text", required: true },
      { name: "descr", label: "Описание", type: "textarea", rows: 4 },
      { name: "link", label: "Ссылка", type: "text" },
      { name: "image.src", label: "Картинка", type: "text", uploadFolder: "controllers" },
      { name: "image.width", label: "Ширина", type: "number" },
      { name: "image.height", label: "Высота", type: "number" },
      { name: "status", label: "Показывать на сайте", type: "boolean" },
    ],
  },
  detectors: {
    entity: "detectors",
    title: "Детекторы",
    subtitle: "Карточки и вложенные блоки страниц детекторов.",
    summaryFields: ["title", "slug", "status"],
    fields: [
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "title", label: "Название", type: "text", required: true },
      { name: "subtitle", label: "Подзаголовок", type: "text" },
      { name: "icon", label: "Иконка", type: "text", uploadFolder: "detectors" },
      { name: "image", label: "Изображение", type: "text", uploadFolder: "detectors" },
      { name: "bg", label: "CSS фон", type: "text" },
      { name: "linkHover", label: "CSS hover", type: "text" },
      { name: "isWide", label: "Широкая карточка", type: "boolean" },
      { name: "status", label: "Показывать на сайте", type: "boolean" },
      { name: "hero", label: "Hero JSON", type: "json", rows: 10 },
      { name: "info", label: "Info JSON", type: "json", rows: 10 },
      { name: "detectorExample", label: "Example JSON", type: "json", rows: 10 },
    ],
  },
  leads: {
    entity: "leads",
    title: "Лиды",
    subtitle: "Заявки с форм сайта.",
    summaryFields: ["name", "phone", "pageUrl", "submittedAt"],
    allowCreate: false,
    fields: [
      { name: "name", label: "Имя", type: "text", required: true },
      { name: "phone", label: "Телефон", type: "text", required: true },
      { name: "comment", label: "Комментарий", type: "textarea", rows: 4 },
      { name: "consent", label: "Согласие", type: "boolean" },
      { name: "pageUrl", label: "URL страницы", type: "text" },
      { name: "formType", label: "Тип формы", type: "text" },
    ],
  },
  projects: {
    entity: "projects",
    title: "Проекты",
    subtitle: "Портфолио, секции и связанные кейсы.",
    summaryFields: ["title", "slug", "city", "status"],
    fields: [
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "title", label: "Название", type: "text", required: true },
      { name: "description", label: "Описание", type: "textarea", rows: 5 },
      { name: "image", label: "Карточка", type: "text", uploadFolder: "projects" },
      { name: "imageMain", label: "Главное изображение", type: "text", uploadFolder: "projects" },
      { name: "heroImage", label: "Hero изображение", type: "text", uploadFolder: "projects" },
      { name: "tags", label: "Теги", type: "stringList", rows: 4 },
      { name: "objectType", label: "Тип объекта", type: "text" },
      { name: "area", label: "Площадь", type: "text" },
      { name: "city", label: "Город", type: "text" },
      {
        name: "status",
        label: "Статус",
        type: "select",
        options: [
          { value: "active", label: "Активный" },
          { value: "draft", label: "Черновик" },
          { value: "archived", label: "Архив" },
        ],
      },
      { name: "steps", label: "Этапы JSON", type: "json", rows: 10 },
      { name: "sections", label: "Секции JSON", type: "json", rows: 12 },
      { name: "relatedProjectSlugs", label: "Связанные проекты", type: "stringList", rows: 4 },
    ],
  },
}

const TABS: Array<{ id: EntityTab; label: string }> = [
  { id: "leads", label: "Лиды" },
  { id: "articles", label: "Статьи" },
  { id: "controllers", label: "Контроллеры" },
  { id: "detectors", label: "Детекторы" },
  { id: "projects", label: "Проекты" },
  { id: "stats", label: "Статистика" },
]

function getNestedValue(source: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, part) => {
    if (!acc || typeof acc !== "object") {
      return undefined
    }

    return (acc as Record<string, unknown>)[part]
  }, source)
}

function setNestedValue(source: Record<string, unknown>, path: string, value: unknown) {
  const parts = path.split(".")
  const next = structuredClone(source)
  let cursor: Record<string, unknown> = next

  for (let index = 0; index < parts.length - 1; index += 1) {
    const part = parts[index]
    const current = cursor[part]

    if (!current || typeof current !== "object" || Array.isArray(current)) {
      cursor[part] = {}
    }

    cursor = cursor[part] as Record<string, unknown>
  }

  cursor[parts[parts.length - 1]] = value
  return next
}

function stringifyPretty(value: unknown) {
  if (value === undefined || value === null) {
    return ""
  }

  return JSON.stringify(value, null, 2)
}

function parseStringList(value: string) {
  return value
    .split(/\r?\n|,/)
    .map(item => item.trim())
    .filter(Boolean)
}

function serializeFieldValue(field: FieldConfig, rawValue: unknown): string | boolean {
  switch (field.type) {
    case "boolean":
      return Boolean(rawValue)
    case "json":
      return stringifyPretty(rawValue)
    case "stringList":
      return Array.isArray(rawValue) ? rawValue.join("\n") : ""
    case "number":
      return rawValue === undefined || rawValue === null ? "" : String(rawValue)
    default:
      return rawValue === undefined || rawValue === null ? "" : String(rawValue)
  }
}

function deserializeFieldValue(field: FieldConfig, rawValue: string | boolean): unknown {
  switch (field.type) {
    case "boolean":
      return Boolean(rawValue)
    case "json": {
      const value = String(rawValue).trim()
      if (!value) {
        return undefined
      }
      return JSON.parse(value)
    }
    case "number": {
      const value = String(rawValue).trim()
      return value ? Number(value) : undefined
    }
    case "stringList":
      return parseStringList(String(rawValue))
    default: {
      const value = String(rawValue)
      return value.trim() ? value.trim() : field.type === "textarea" ? "" : undefined
    }
  }
}

function buildFormState(config: EntityConfig, source?: Record<string, unknown>): FormState {
  return config.fields.reduce<FormState>((acc, field) => {
    acc[field.name] = serializeFieldValue(field, source ? getNestedValue(source, field.name) : undefined)
    return acc
  }, {})
}

function buildPayload(config: EntityConfig, formState: FormState) {
  return config.fields.reduce<Record<string, unknown>>((acc, field) => {
    const rawValue = formState[field.name]
    const parsed = deserializeFieldValue(field, rawValue)

    if (parsed !== undefined) {
      return setNestedValue(acc, field.name, parsed)
    }

    return acc
  }, {})
}

function displayValue(item: Record<string, unknown>, fieldName: string) {
  const value = getNestedValue(item, fieldName)

  if (value === null || value === undefined || value === "") {
    return "—"
  }

  if (typeof value === "boolean") {
    return value ? "Да" : "Нет"
  }

  if (Array.isArray(value)) {
    return value.join(", ")
  }

  if (typeof value === "object") {
    return "JSON"
  }

  return String(value)
}

async function request<T>(input: string, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init)
  const data = (await response.json().catch(() => null)) as { error?: string } & T | null

  if (!response.ok) {
    throw new Error(data?.error || "Запрос завершился с ошибкой.")
  }

  return (data ?? {}) as T
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = fileName
  anchor.click()
  URL.revokeObjectURL(url)
}

function LoginView({ onAuthenticated }: { onAuthenticated: (admin: AdminInfo) => void }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await request<{ admin: AdminInfo }>("/api/admin/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      onAuthenticated(response.admin)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Не удалось выполнить запрос.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.authShell}>
      <div className={styles.authCard}>
        <p className={styles.eyebrow}>Mimi Admin</p>
        <h1 className={styles.authTitle}>Админка проекта</h1>
        <p className={styles.authText}>
          Управляйте статьями, проектами, детекторами, каталогом и заявками из одного интерфейса.
        </p>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <label className={styles.formField}>
            <span>Логин</span>
            <input value={username} onChange={event => setUsername(event.target.value)} required />
          </label>

          <label className={styles.formField}>
            <span>Пароль</span>
            <input
              type="password"
              value={password}
              minLength={6}
              onChange={event => setPassword(event.target.value)}
              required
            />
          </label>

          {error && <div className={styles.error}>{error}</div>}

          <button className={styles.primaryButton} disabled={loading}>
            {loading ? "Подождите..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  )
}

function StatsPanel() {
  const [stats, setStats] = useState<{
    total: number
    consentYes: number
    consentNo: number
    withComment: number
    byDay: Array<{ date: string; count: number }>
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  async function loadStats() {
    setLoading(true)
    setError("")

    try {
      const response = await request<{
        total: number
        consentYes: number
        consentNo: number
        withComment: number
        byDay: Array<{ date: string; count: number }>
      }>("/api/admin/leads/stats")
      setStats(response)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Не удалось загрузить статистику.")
    } finally {
      setLoading(false)
    }
  }

  async function handleExport(format: "csv" | "json") {
    const response = await fetch(`/api/admin/leads/export/${format}`)

    if (!response.ok) {
      setError("Не удалось выгрузить данные.")
      return
    }

    const blob = await response.blob()
    downloadBlob(blob, `leads-export.${format}`)
  }

  useEffect(() => {
    void loadStats()
  }, [])

  if (loading) {
    return <div className={styles.emptyState}>Загружаем статистику...</div>
  }

  if (error) {
    return <div className={styles.error}>{error}</div>
  }

  if (!stats) {
    return <div className={styles.emptyState}>Статистика пока недоступна.</div>
  }

  return (
    <div className={styles.statsGrid}>
      <div className={styles.statCard}>
        <span>Всего лидов</span>
        <strong>{stats.total}</strong>
      </div>
      <div className={styles.statCard}>
        <span>С согласием</span>
        <strong>{stats.consentYes}</strong>
      </div>
      <div className={styles.statCard}>
        <span>Без согласия</span>
        <strong>{stats.consentNo}</strong>
      </div>
      <div className={styles.statCard}>
        <span>С комментарием</span>
        <strong>{stats.withComment}</strong>
      </div>

      <div className={styles.wideCard}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>Динамика по дням</h2>
            <p>Количество заявок по датам отправки.</p>
          </div>
          <div className={styles.inlineActions}>
            <button className={styles.secondaryButton} onClick={() => handleExport("csv")}>
              Скачать CSV
            </button>
            <button className={styles.secondaryButton} onClick={() => handleExport("json")}>
              Скачать JSON
            </button>
          </div>
        </div>

        <div className={styles.chartList}>
          {stats.byDay.length === 0 ? (
            <div className={styles.emptyState}>Заявок пока нет.</div>
          ) : (
            stats.byDay.map(item => (
              <div key={item.date} className={styles.chartRow}>
                <span>{item.date}</span>
                <div className={styles.chartBarTrack}>
                  <div
                    className={styles.chartBar}
                    style={{ width: `${Math.max(8, (item.count / Math.max(...stats.byDay.map(day => day.count))) * 100)}%` }}
                  />
                </div>
                <strong>{item.count}</strong>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

function EntityManager({ config }: { config: EntityConfig }) {
  const [items, setItems] = useState<Array<Record<string, unknown>>>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [error, setError] = useState("")
  const [editorOpen, setEditorOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formState, setFormState] = useState<FormState>(() => buildFormState(config))

  const editorTitle = editingId ? "Редактирование записи" : "Новая запись"

  async function loadData(nextPage = page, nextSearch = search) {
    setLoading(true)
    setError("")

    try {
      const response = await request<{ data: Array<Record<string, unknown>>; pagination: Pagination }>(
        `/api/admin/${config.entity}?page=${nextPage}&limit=10&search=${encodeURIComponent(nextSearch)}`
      )
      setItems(response.data)
      setPagination(response.pagination)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Не удалось загрузить раздел.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadData(page, search)
  }, [page, search])

  function openCreate() {
    setEditingId(null)
    setFormState(buildFormState(config))
    setEditorOpen(true)
    setError("")
  }

  function openEdit(item: Record<string, unknown>) {
    setEditingId(String(item.id))
    setFormState(buildFormState(config, item))
    setEditorOpen(true)
    setError("")
  }

  function handleFieldChange(fieldName: string, value: string | boolean) {
    setFormState(prev => ({
      ...prev,
      [fieldName]: value,
    }))
  }

  async function handleUpload(field: FieldConfig, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file || !field.uploadFolder) {
      return
    }

    try {
      setSaving(true)
      const body = new FormData()
      body.append("image", file)
      body.append("folder", field.uploadFolder)

      const response = await fetch("/api/admin/upload/image", {
        method: "POST",
        body,
      })
      const data = (await response.json()) as { error?: string; file?: { url: string } }

      if (!response.ok || !data.file?.url) {
        throw new Error(data.error || "Не удалось загрузить изображение.")
      }

      handleFieldChange(field.name, data.file.url)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Не удалось загрузить изображение.")
    } finally {
      setSaving(false)
      event.target.value = ""
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError("")

    try {
      const payload = buildPayload(config, formState)
      const url = editingId ? `/api/admin/${config.entity}/${editingId}` : `/api/admin/${config.entity}`

      await request(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      setEditorOpen(false)
      setEditingId(null)
      setFormState(buildFormState(config))
      await loadData(1, search)
      setPage(1)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Не удалось сохранить запись.")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Удалить запись?")) {
      return
    }

    try {
      await request(`/api/admin/${config.entity}/${id}`, {
        method: "DELETE",
      })
      await loadData(page, search)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Не удалось удалить запись.")
    }
  }

  const hasItems = items.length > 0

  return (
    <div className={styles.manager}>
      <div className={styles.sectionHeader}>
        <div>
          <h2>{config.title}</h2>
          <p>{config.subtitle}</p>
        </div>
        <div className={styles.inlineActions}>
          <input
            className={styles.searchInput}
            placeholder="Поиск..."
            value={search}
            onChange={event => {
              setSearch(event.target.value)
              setPage(1)
            }}
          />
          {config.allowCreate !== false && (
            <button className={styles.primaryButton} onClick={openCreate}>
              Добавить
            </button>
          )}
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {editorOpen && (
        <form className={styles.editorCard} onSubmit={handleSubmit}>
          <div className={styles.sectionHeader}>
            <div>
              <h3>{editorTitle}</h3>
              <p>Все изменения сохраняются в локальное хранилище проекта.</p>
            </div>
            <button type="button" className={styles.ghostButton} onClick={() => setEditorOpen(false)}>
              Закрыть
            </button>
          </div>

          <div className={styles.formGrid}>
            {config.fields.map(field => (
              <label
                key={field.name}
                className={`${styles.formField} ${field.type === "textarea" || field.type === "json" || field.type === "stringList" ? styles.formFieldWide : ""}`}
              >
                <span>{field.label}</span>

                {field.type === "textarea" || field.type === "json" || field.type === "stringList" ? (
                  <textarea
                    rows={field.rows ?? 6}
                    placeholder={field.placeholder}
                    value={String(formState[field.name] ?? "")}
                    onChange={event => handleFieldChange(field.name, event.target.value)}
                    required={field.required}
                  />
                ) : field.type === "boolean" ? (
                  <select
                    value={String(Boolean(formState[field.name]))}
                    onChange={event => handleFieldChange(field.name, event.target.value === "true")}
                  >
                    <option value="true">Да</option>
                    <option value="false">Нет</option>
                  </select>
                ) : field.type === "select" ? (
                  <select
                    value={String(formState[field.name] ?? field.options?.[0]?.value ?? "")}
                    onChange={event => handleFieldChange(field.name, event.target.value)}
                  >
                    {field.options?.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type === "date" ? "date" : field.type === "number" ? "number" : "text"}
                    placeholder={field.placeholder}
                    value={String(formState[field.name] ?? "")}
                    onChange={event => handleFieldChange(field.name, event.target.value)}
                    required={field.required}
                  />
                )}

                {field.uploadFolder && (
                  <input type="file" accept="image/*" onChange={event => void handleUpload(field, event)} />
                )}
              </label>
            ))}
          </div>

          <div className={styles.inlineActions}>
            <button className={styles.primaryButton} disabled={saving}>
              {saving ? "Сохраняем..." : editingId ? "Сохранить" : "Создать"}
            </button>
            <button type="button" className={styles.secondaryButton} onClick={() => setFormState(buildFormState(config))}>
              Очистить
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className={styles.emptyState}>Загрузка...</div>
      ) : !hasItems ? (
        <div className={styles.emptyState}>Записей пока нет.</div>
      ) : (
        <div className={styles.cardGrid}>
          {items.map(item => (
            <article key={String(item.id)} className={styles.recordCard}>
              <div className={styles.recordHeader}>
                <div>
                  <strong>{displayValue(item, config.summaryFields[0])}</strong>
                  <p>ID: {String(item.id)}</p>
                </div>
                <div className={styles.inlineActions}>
                  <button className={styles.secondaryButton} onClick={() => openEdit(item)}>
                    Изменить
                  </button>
                  <button className={styles.dangerButton} onClick={() => void handleDelete(String(item.id))}>
                    Удалить
                  </button>
                </div>
              </div>

              <dl className={styles.summaryList}>
                {config.summaryFields.map(fieldName => (
                  <div key={fieldName}>
                    <dt>{config.fields.find(field => field.name === fieldName)?.label ?? fieldName}</dt>
                    <dd>{displayValue(item, fieldName)}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      )}

      {pagination && pagination.pages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.secondaryButton}
            onClick={() => setPage(current => Math.max(1, current - 1))}
            disabled={pagination.page === 1}
          >
            Назад
          </button>
          <span>
            Страница {pagination.page} из {pagination.pages}
          </span>
          <button
            className={styles.secondaryButton}
            onClick={() => setPage(current => Math.min(pagination.pages, current + 1))}
            disabled={pagination.page === pagination.pages}
          >
            Дальше
          </button>
        </div>
      )}
    </div>
  )
}

export default function AdminPageClient() {
  const [sessionChecked, setSessionChecked] = useState(false)
  const [admin, setAdmin] = useState<AdminInfo | null>(null)
  const [activeTab, setActiveTab] = useState<EntityTab>("leads")
  const currentConfig = activeTab === "stats" ? null : ENTITY_CONFIGS[activeTab]

  useEffect(() => {
    async function loadSession() {
      try {
        const response = await request<SessionResponse>("/api/admin/session")
        setAdmin(response.authenticated ? response.admin ?? null : null)
      } finally {
        setSessionChecked(true)
      }
    }

    void loadSession()
  }, [])

  const currentTabLabel = useMemo(
    () => TABS.find(tab => tab.id === activeTab)?.label ?? "Админка",
    [activeTab]
  )

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", {
      method: "POST",
    })
    setAdmin(null)
  }

  if (!sessionChecked) {
    return <div className={styles.loadingScreen}>Проверяем сессию администратора...</div>
  }

  if (!admin) {
    return <LoginView onAuthenticated={setAdmin} />
  }

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div>
          <p className={styles.eyebrow}>Mimi Control Center</p>
          <h1 className={styles.sidebarTitle}>Админ-панель</h1>
          <p className={styles.sidebarText}>
            Сайт и админка теперь работают на одном локальном хранилище.
          </p>
        </div>

        <nav className={styles.nav}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`${styles.navButton} ${tab.id === activeTab ? styles.navButtonActive : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div>
            <span className={styles.smallLabel}>Администратор</span>
            <strong>{admin.username}</strong>
          </div>
          <button className={styles.secondaryButton} onClick={() => void handleLogout()}>
            Выйти
          </button>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.mainHeader}>
          <div>
            <p className={styles.eyebrow}>Текущий раздел</p>
            <h2>{currentTabLabel}</h2>
          </div>
        </header>

        {activeTab === "stats" ? <StatsPanel /> : currentConfig ? <EntityManager config={currentConfig} /> : null}
      </main>
    </div>
  )
}
