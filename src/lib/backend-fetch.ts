import { buildBackendUrl, getBackendBaseUrl, uniquePaths } from "@/lib/backend-url"

type ExtractCollection = (payload: unknown) => unknown[]

type NormalizeCollectionItem<T> = (item: unknown, index: number) => T | null

type FetchBackendCollectionOptions<T> = {
  label: string
  paths: string[]
  extract: ExtractCollection
  normalize: NormalizeCollectionItem<T>
}

type ParseResponseBody = (response: Response) => Promise<unknown>

async function parseJsonResponse(response: Response): Promise<unknown> {
  try {
    return await response.json()
  } catch {
    return null
  }
}

export async function fetchBackendCollection<T>({
  label,
  paths,
  extract,
  normalize,
}: FetchBackendCollectionOptions<T>): Promise<T[] | null> {
  if (!getBackendBaseUrl()) return null
  const normalizedPaths = uniquePaths(paths)
  let lastError: unknown = null

  for (const path of normalizedPaths) {
    try {
      const response = await fetch(buildBackendUrl(path), {
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(3000),
      })

      if (!response.ok) {
        lastError = new Error(`Backend responded with ${response.status} for ${path}`)
        continue
      }

      const payload = await parseJsonResponse(response)
      const items = extract(payload)
        .map(normalize)
        .filter((item): item is T => item !== null)

      return items
    } catch (error) {
      lastError = error
    }
  }

  if (lastError) {
    console.warn(`Failed to load ${label} from backend:`, lastError)
  }

  return null
}

export async function fetchBackendJson<T>(paths: string[], init: RequestInit): Promise<T | null> {
  const normalizedPaths = uniquePaths(paths)
  let lastError: unknown = null

  for (const [index, path] of normalizedPaths.entries()) {
    try {
      const response = await fetch(buildBackendUrl(path), {
        ...init,
        cache: "no-store",
        signal: init.signal ?? AbortSignal.timeout(5000),
      })

      if (response.status === 404 || response.status === 405) {
        if (index < normalizedPaths.length - 1) {
          continue
        }

        return null
      }

      const body = await parseJsonResponse(response)

      if (!response.ok) {
        const error = new Error(
          typeof body === "object" && body && "error" in body
            ? String((body as { error?: unknown }).error ?? `Backend responded with ${response.status}`)
            : `Backend responded with ${response.status}`
        )
        ;(error as Error & { response?: { status: number; data: unknown } }).response = {
          status: response.status,
          data: body,
        }
        return null
      }

      return body as T
    } catch (error) {
      lastError = error
    }
  }

  if (lastError) {
    console.warn("Failed to fetch data from backend:", lastError)
  }

  return null
}
