"use client"

export type LeadPayload = {
	name: string
	phone: string
	comment?: string | null
	consent: boolean
	pageUrl: string
	formType?: string | null
}

export type LeadFormValues = {
	name: string
	phone: string
	comment: string
	consent: boolean
}

export type LeadFieldErrors = Partial<Record<"name" | "phone" | "consent", string>>

export type LeadResponse = {
	id: number
	stored: boolean
	email?: {
		status?: string
	}
	crm?: {
		status?: string
		code?: number
	}
	submittedAt?: string
}

export class LeadSubmitError extends Error {
	code: "validation" | "server" | "network" | "config"
	status?: number
	details?: string[]

	constructor(
		message: string,
		options: {
			code: "validation" | "server" | "network" | "config"
			status?: number
			details?: string[]
		}
	) {
		super(message)
		this.name = "LeadSubmitError"
		this.code = options.code
		this.status = options.status
		this.details = options.details
	}
}

const PHONE_ALLOWED_PATTERN = /^[\d\s+().-]+$/

function trimToNull(value?: string | null) {
	const normalized = value?.trim()
	return normalized ? normalized : null
}

function getLeadsEndpoint() {
	return "/api/leads"
}

export function validateLeadFormValues(values: LeadFormValues): LeadFieldErrors {
	const errors: LeadFieldErrors = {}
	const name = values.name.trim()
	const phone = values.phone.trim()
	const digitsOnly = phone.replace(/\D/g, "")

	if (!name) {
		errors.name = "Р’РІРµРґРёС‚Рµ РёРјСЏ"
	}

	if (!phone) {
		errors.phone = "Р’РІРµРґРёС‚Рµ С‚РµР»РµС„РѕРЅ"
	} else if (!PHONE_ALLOWED_PATTERN.test(phone) || digitsOnly.length < 7 || digitsOnly.length > 20) {
		errors.phone = "РџСЂРѕРІРµСЂСЊС‚Рµ РЅРѕРјРµСЂ С‚РµР»РµС„РѕРЅР°"
	}

	if (!values.consent) {
		errors.consent = "РќРµРѕР±С…РѕРґРёРјРѕ СЃРѕРіР»Р°СЃРёРµ РЅР° РѕР±СЂР°Р±РѕС‚РєСѓ РґР°РЅРЅС‹С…"
	}

	return errors
}

export function mapLeadFormToPayload(
	values: LeadFormValues,
	options: {
		pageUrl: string
		formType?: string | null
	}
): LeadPayload {
	return {
		name: values.name.trim(),
		phone: values.phone.trim(),
		comment: trimToNull(values.comment),
		consent: values.consent,
		pageUrl: options.pageUrl,
		formType: trimToNull(options.formType)
	}
}

export function mapBackendDetailsToFieldErrors(details?: string[]): LeadFieldErrors {
	if (!details?.length) {
		return {}
	}

	const errors: LeadFieldErrors = {}

	for (const detail of details) {
		const normalized = detail.toLowerCase()

		if (!errors.name && normalized.includes("name")) {
			errors.name = "Р’РІРµРґРёС‚Рµ РёРјСЏ"
		}

		if (!errors.phone && normalized.includes("phone")) {
			errors.phone = normalized.includes("required")
				? "Р’РІРµРґРёС‚Рµ С‚РµР»РµС„РѕРЅ"
				: "РџСЂРѕРІРµСЂСЊС‚Рµ РЅРѕРјРµСЂ С‚РµР»РµС„РѕРЅР°"
		}

		if (!errors.consent && normalized.includes("consent")) {
			errors.consent = "РќРµРѕР±С…РѕРґРёРјРѕ СЃРѕРіР»Р°СЃРёРµ РЅР° РѕР±СЂР°Р±РѕС‚РєСѓ РґР°РЅРЅС‹С…"
		}
	}

	return errors
}

async function parseJsonSafe(response: Response) {
	try {
		return await response.json()
	} catch {
		return null
	}
}

export async function submitLead(payload: LeadPayload): Promise<LeadResponse> {
	const response = await fetch(getLeadsEndpoint(), {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(payload)
	})

	const data = await parseJsonSafe(response)

	if (response.status === 201) {
		return (data ?? {}) as LeadResponse
	}

	if (response.status === 400) {
		throw new LeadSubmitError("РџСЂРѕРІРµСЂСЊС‚Рµ РєРѕСЂСЂРµРєС‚РЅРѕСЃС‚СЊ Р·Р°РїРѕР»РЅРµРЅРёСЏ С„РѕСЂРјС‹.", {
			code: "validation",
			status: response.status,
			details: Array.isArray(data?.details) ? data.details : undefined
		})
	}

	if (response.status === 500 || response.status === 503) {
		throw new LeadSubmitError("РќРµ СѓРґР°Р»РѕСЃСЊ РѕС‚РїСЂР°РІРёС‚СЊ Р·Р°СЏРІРєСѓ. РџРѕРїСЂРѕР±СѓР№С‚Рµ РµС‰С‘ СЂР°Р· РїРѕР·Р¶Рµ.", {
			code: "server",
			status: response.status
		})
	}

	throw new LeadSubmitError("РќРµ СѓРґР°Р»РѕСЃСЊ РѕС‚РїСЂР°РІРёС‚СЊ Р·Р°СЏРІРєСѓ. РџРѕРїСЂРѕР±СѓР№С‚Рµ РµС‰С‘ СЂР°Р· РїРѕР·Р¶Рµ.", {
		code: "server",
		status: response.status
	})
}
