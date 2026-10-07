import "server-only"

import { NextRequest, NextResponse } from "next/server"

import { buildBackendUrl, getBackendBaseUrl } from "@/lib/backend-url"

const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
])

function sanitizeSetCookie(value: string) {
  return value.replace(/;\s*Domain=[^;]+/i, "")
}

function appendForwardedHeaders(source: Headers, target: NextResponse) {
  const headersWithCookies = source as Headers & { getSetCookie?: () => string[] }
  const setCookies =
    typeof headersWithCookies.getSetCookie === "function"
      ? headersWithCookies.getSetCookie()
      : source.get("set-cookie")
        ? [source.get("set-cookie") as string]
        : []

  for (const cookie of setCookies) {
    target.headers.append("set-cookie", sanitizeSetCookie(cookie))
  }

  source.forEach((value, key) => {
    const lowerKey = key.toLowerCase()

    if (
      lowerKey === "set-cookie" ||
      lowerKey === "content-encoding" ||
      lowerKey === "content-length" ||
      HOP_BY_HOP_HEADERS.has(lowerKey)
    ) {
      return
    }

    target.headers.append(key, value)
  })
}

function getBackendAdminPath(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (request.method !== "GET" && /^\/api\/admin\/equipment(?=\/|$)/.test(pathname)) {
    return pathname.replace(/^\/api\/admin\/equipment/, "/api/equipment")
  }

  if (pathname === "/api/admin/session") return "/api/admin/auth/session"
  return pathname.replace(/^\/api\/admin\/equipment(?=\/|$)/, "/api/admin/controllers")
}

export function getAdminBackendBaseUrl() {
  return getBackendBaseUrl()
}

export function shouldProxyAdminBackend() {
  return Boolean(getBackendBaseUrl())
}

function buildTargetUrl(request: NextRequest) {
  const targetUrl = new URL(buildBackendUrl(getBackendAdminPath(request)))
  targetUrl.search = request.nextUrl.search
  return targetUrl
}

export async function proxyAdminRequest(request: NextRequest) {
  if (!shouldProxyAdminBackend()) {
    throw new Error("Admin backend proxy is not configured.")
  }

  const targetUrl = buildTargetUrl(request)
  const headers = new Headers(request.headers)

  const token = request.cookies.get("mimi_backend_token")?.value
  headers.delete("cookie")
  if (token) headers.set("authorization", `Bearer ${token}`)
  headers.delete("host")
  headers.delete("content-length")
  headers.delete("origin")
  headers.delete("referer")
  headers.delete("sec-fetch-site")
  headers.delete("sec-fetch-mode")
  headers.delete("sec-fetch-dest")
  headers.delete("sec-fetch-user")

  const init: RequestInit & { duplex?: "half" } = {
    method: request.method,
    headers,
    cache: "no-store",
    redirect: "manual",
    signal: AbortSignal.timeout(15000),
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = request.body
    init.duplex = "half"
  }

  try {
    const response = await fetch(targetUrl, init)
    if (request.nextUrl.pathname === "/api/admin/auth/login" && response.ok) {
      const data = await response.json()
      if (typeof data.token !== "string") return NextResponse.json({ error: "Invalid backend response" }, { status: 502 })
      const loginResponse = NextResponse.json({ ok: true, adminId: data.adminId, admin: data.admin })
      loginResponse.cookies.set({ name: "mimi_backend_token", value: data.token, httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 86400 })
      loginResponse.headers.set("Cache-Control", "no-store")
      return loginResponse
    }
    const nextResponse = new NextResponse(response.body, { status: response.status })

    appendForwardedHeaders(response.headers, nextResponse)
    nextResponse.headers.set("Cache-Control", "no-store")
    return nextResponse
  } catch (error) {
    console.error(
      `[admin-backend] Failed to proxy ${request.method} ${request.nextUrl.pathname}:`,
      { name: error instanceof Error ? error.name : "Error" }
    )

    return NextResponse.json(
      { error: "Не удалось подключиться к backend." },
      { status: 503 }
    )
  }
}
