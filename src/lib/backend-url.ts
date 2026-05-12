const PRODUCTION_BACKEND_FALLBACK_URL = "https://mimi-back-73qq.onrender.com"

function trimTrailingSlash(value: string) {
  return value.trim().replace(/\/+$/, "")
}

export function getBackendBaseUrl() {
  const configuredBaseUrl =
    process.env.API_BASE_URL?.trim() ?? process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ?? ""

  if (configuredBaseUrl) {
    return trimTrailingSlash(configuredBaseUrl)
  }

  if (process.env.NODE_ENV === "production") {
    return PRODUCTION_BACKEND_FALLBACK_URL
  }

  return ""
}

export function buildBackendUrl(path: string) {
  const baseUrl = getBackendBaseUrl()
  const normalizedPath = path.replace(/^\/+/, "")

  if (!baseUrl) {
    return `/${normalizedPath}`
  }

  return `${baseUrl}/${normalizedPath}`
}

export function uniquePaths(paths: string[]) {
  return [...new Set(paths.map(path => path.trim().replace(/^\/+|\/+$/g, "")).filter(Boolean))]
}
