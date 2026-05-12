import { NextRequest, NextResponse } from "next/server"

import { createLead } from "@/lib/admin-store"
import { buildBackendUrl, getBackendBaseUrl } from "@/lib/backend-url"

type LeadPayload = {
  name?: string
  phone?: string
  comment?: string | null
  consent?: boolean
  pageUrl?: string
  formType?: string | null
}

const LEADS_PATH =
  process.env.API_LEADS_PATH?.trim().replace(/^\/+|\/+$/g, "") ??
  process.env.NEXT_PUBLIC_API_LEADS_PATH?.trim().replace(/^\/+|\/+$/g, "") ??
  "api/leads"

const LEADS_PATH_CANDIDATES = [
  LEADS_PATH,
  LEADS_PATH.startsWith("api/admin/") ? LEADS_PATH.replace(/^api\/admin\//, "api/") : "leads",
  "api/admin/leads",
]

function validateLead(payload: LeadPayload) {
  const details: string[] = []

  if (!payload.name?.trim()) {
    details.push("name is required")
  }

  const phone = payload.phone?.trim() ?? ""
  const digitsOnly = phone.replace(/\D/g, "")

  if (!phone) {
    details.push("phone is required")
  } else if (!/^[\d\s+().-]+$/.test(phone) || digitsOnly.length < 7 || digitsOnly.length > 20) {
    details.push("phone is invalid")
  }

  if (payload.consent !== true) {
    details.push("consent is required")
  }

  if (!payload.pageUrl?.trim()) {
    details.push("pageUrl is required")
  }

  return details
}

async function parseResponseBody(response: Response) {
  try {
    return await response.json()
  } catch {
    return null
  }
}

async function forwardLeadToBackend(externalPayload: Record<string, unknown>) {
  if (!getBackendBaseUrl()) {
    return null
  }

  const requestBody = JSON.stringify(externalPayload)

  for (const path of LEADS_PATH_CANDIDATES) {
    try {
      const response = await fetch(buildBackendUrl(path), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
        cache: "no-store",
      })

      const data = await parseResponseBody(response)

      if (response.status === 404 || response.status === 405) {
        continue
      }

      return { response, data }
    } catch (error) {
      console.warn(`Failed to forward lead to backend via ${path}:`, error)
    }
  }

  return null
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as LeadPayload | null

  if (!body) {
    return NextResponse.json({ error: "Некорректные данные формы." }, { status: 400 })
  }

  const details = validateLead(body)

  if (details.length > 0) {
    return NextResponse.json({ error: "Validation failed", details }, { status: 400 })
  }

  const externalPayload = {
    name: body.name!.trim(),
    phone: body.phone!.trim(),
    comment: body.comment?.trim() || null,
    consent: true,
    pageUrl: body.pageUrl!.trim(),
    formType: body.formType?.trim() || null,
    page_url: body.pageUrl!.trim(),
    form_type: body.formType?.trim() || null,
  }

  const forwarded = await forwardLeadToBackend(externalPayload)

  if (forwarded) {
    const { response, data } = forwarded

    if (!response.ok) {
      return NextResponse.json(
        data ?? { error: "Failed to store lead in backend." },
        { status: response.status }
      )
    }

    return NextResponse.json(data ?? { stored: true }, { status: response.status })
  }

  const lead = await createLead({
    name: body.name!.trim(),
    phone: body.phone!.trim(),
    comment: body.comment?.trim() || null,
    consent: true,
    pageUrl: body.pageUrl!.trim(),
    formType: body.formType?.trim() || null,
  })

  return NextResponse.json(
    {
      id: lead.id,
      stored: true,
      submittedAt: lead.submittedAt,
    },
    { status: 201 }
  )
}
