"use client"

import { ChangeEvent, FormEvent, useMemo, useState } from "react"
import {
	LeadFieldErrors,
	LeadFormValues,
	LeadSubmitError,
	mapBackendDetailsToFieldErrors,
	mapLeadFormToPayload,
	submitLead,
	validateLeadFormValues
} from "@/services/leads"

declare global {
	interface Window {
		dataLayer?: Array<Record<string, unknown>>
	}
}

export type LeadFormStatus = "idle" | "loading" | "success" | "error"

const INITIAL_VALUES: LeadFormValues = {
	name: "",
	phone: "",
	comment: "",
	consent: false
}

function hasFieldErrors(errors: LeadFieldErrors) {
	return Object.values(errors).some(Boolean)
}

function trackLeadEvent(event: "lead_submit_success" | "lead_submit_error", formType: string | null, pageUrl: string) {
	if (typeof window === "undefined" || !Array.isArray(window.dataLayer)) {
		return
	}

	window.dataLayer.push({
		event,
		formType,
		pageUrl
	})
}

function resolveErrorMessage(error: unknown) {
	if (error instanceof LeadSubmitError) {
		if (error.code === "validation") {
			return "Проверьте корректность заполнения формы."
		}

		if (error.code === "config") {
			return "Форма временно недоступна. Попробуйте позже."
		}

		return "Не удалось отправить заявку. Попробуйте ещё раз позже."
	}

	return "Не удалось отправить заявку. Попробуйте ещё раз позже."
}

export function useLeadForm(formType?: string | null) {
	const [values, setValues] = useState<LeadFormValues>(INITIAL_VALUES)
	const [errors, setErrors] = useState<LeadFieldErrors>({})
	const [status, setStatus] = useState<LeadFormStatus>("idle")
	const [message, setMessage] = useState<string | null>(null)

	const isLoading = status === "loading"

	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const target = event.target
		const nextValue = target instanceof HTMLInputElement && target.type === "checkbox"
			? target.checked
			: target.value

		setValues(prev => ({
			...prev,
			[target.name]: nextValue
		}))

		if (target.name === "name" || target.name === "phone" || target.name === "consent") {
			setErrors(prev => ({
				...prev,
				[target.name]: undefined
			}))
		}

		if (status === "success" || status === "error") {
			setStatus("idle")
			setMessage(null)
		}
	}

	const resetForm = () => {
		setValues(INITIAL_VALUES)
		setErrors({})
	}

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (isLoading) {
			return
		}

		const clientErrors = validateLeadFormValues(values)

		if (hasFieldErrors(clientErrors)) {
			setErrors(clientErrors)
			setStatus("error")
			setMessage("Проверьте корректность заполнения формы.")
			return
		}

		const pageUrl = window.location.href

		setStatus("loading")
		setErrors({})
		setMessage(null)

		try {
			await submitLead(
				mapLeadFormToPayload(values, {
					pageUrl,
					formType
				})
			)

			resetForm()
			setStatus("success")
			setMessage("Спасибо! Мы свяжемся с вами.")
			trackLeadEvent("lead_submit_success", formType ?? null, pageUrl)
		} catch (error) {
			const backendErrors = error instanceof LeadSubmitError
				? mapBackendDetailsToFieldErrors(error.details)
				: {}

			if (hasFieldErrors(backendErrors)) {
				setErrors(backendErrors)
			}

			setStatus("error")
			setMessage(resolveErrorMessage(error))
			trackLeadEvent("lead_submit_error", formType ?? null, pageUrl)
		}
	}

	return useMemo(() => ({
		values,
		errors,
		status,
		message,
		isLoading,
		handleChange,
		handleSubmit,
		resetForm
	}), [errors, isLoading, message, status, values])
}
