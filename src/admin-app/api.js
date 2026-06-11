const adminBaseUrl = "/api/admin"

function getStoredToken() {
  if (typeof window === "undefined") {
    return ""
  }

  return localStorage.getItem("adminToken") || localStorage.getItem("authToken") || ""
}

function clearStoredAuth() {
  if (typeof window === "undefined") {
    return
  }

  localStorage.removeItem("adminToken")
  localStorage.removeItem("adminId")
  localStorage.removeItem("adminUsername")
  localStorage.removeItem("authToken")
}

function toUrl(path, params) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  const url = new URL(
    `${adminBaseUrl}${normalizedPath}`,
    typeof window === "undefined" ? "http://localhost:3000" : window.location.origin
  )

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value))
      }
    })
  }

  return `${url.pathname}${url.search}`
}

async function parseResponse(response, responseType) {
  if (responseType === "blob") {
    return await response.blob()
  }

  const text = await response.text()

  if (!text) {
    return null
  }

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

async function request(method, path, options = {}) {
  const headers = new Headers(options.headers || {})
  const token = getStoredToken()

  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`)
  }

  if (options.data && !headers.has("Content-Type") && !(options.data instanceof FormData)) {
    headers.set("Content-Type", "application/json")
  }

  const url = toUrl(path, options.params)

  const fetchOptions = {
    method,
    headers,
    body:
      options.data instanceof FormData
        ? options.data
        : options.data !== undefined
          ? JSON.stringify(options.data)
          : undefined,
  }

  const response = await fetch(url, fetchOptions)

  const payload = await parseResponse(response, options.responseType)

  if (!response.ok) {
    const error = new Error(
      payload?.error || payload?.message || `Request failed with status ${response.status}`
    )
    error.response = {
      status: response.status,
      data: payload,
    }

    if (response.status === 401 && typeof window !== "undefined") {
      clearStoredAuth()
      window.location.href = "/admin"
    }

    throw error
  }

  return {
    data: payload,
    status: response.status,
  }
}

const api = {
  get(path, options = {}) {
    return request("GET", path, options)
  },
  post(path, data, options = {}) {
    return request("POST", path, { ...options, data })
  },
  put(path, data, options = {}) {
    return request("PUT", path, { ...options, data })
  },
  delete(path, options = {}) {
    return request("DELETE", path, options)
  },
}

export const authAPI = {
  register: (username, password) => api.post("/auth/register", { username, password }),
  login: (username, password) => api.post("/auth/login", { username, password }),
}

export const leadsAPI = {
  getLeads: (page = 1, limit = 20, search = "", status = "") =>
    api.get("/leads", { params: { page, limit, search, status } }),
  getLeadById: id => api.get(`/leads/${id}`),
  updateLead: (id, data) => api.put(`/leads/${id}`, data),
  deleteLead: id => api.delete(`/leads/${id}`),
}

export const statsAPI = {
  getStats: (from = "", to = "") => api.get("/leads/stats", { params: { from, to } }),
}

export const exportAPI = {
  exportCSV: (from = "", to = "") =>
    api.get("/leads/export/csv", { params: { from, to }, responseType: "blob" }),
  exportJSON: (from = "", to = "") =>
    api.get("/leads/export/json", { params: { from, to }, responseType: "blob" }),
}

export const uploadAPI = {
  uploadImage: formData =>
    api.post("/upload/image", formData, {
      headers: {},
    }),
}

export const adminApiConfig = {
  adminBaseUrl,
  useExternalBackend: false,
}

export default api
