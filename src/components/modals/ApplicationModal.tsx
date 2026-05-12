"use client"

import { MouseEvent, useEffect, useRef } from "react"
import Image from "next/image"
import { contacts } from "@/config/contacts"
import { brand } from "@/config/brand"
import { useLeadForm } from "@/hooks/useLeadForm"
import { Title } from "../UI/ApplicationTitle"

interface ApplicationModalProps {
	onClose: () => void
	formType?: string | null
}

export function ApplicationModal({ onClose, formType }: ApplicationModalProps) {
	const modalRef = useRef<HTMLDivElement | null>(null)
	const {
		values,
		errors,
		status,
		message,
		isLoading,
		handleChange,
		handleSubmit
	} = useLeadForm(formType)

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose()
			}
		}

		document.addEventListener("keydown", onKeyDown)

		return () => document.removeEventListener("keydown", onKeyDown)
	}, [onClose])

	useEffect(() => {
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

		document.body.style.overflow = "hidden"

		if (scrollbarWidth > 0) {
			document.body.style.paddingRight = `${scrollbarWidth}px`
		}

		return () => {
			document.body.style.overflow = ""
			document.body.style.paddingRight = ""
		}
	}, [])

	const onOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
		if (!modalRef.current?.contains(event.target as Node)) {
			onClose()
		}
	}

	const phoneClean = contacts.phone.replace(/[^\d]/g, "")
	const isSuccess = status === "success"
	const isError = status === "error"

	return (
		<div
			onClick={onOverlayClick}
			className="fixed inset-0 z-100 px-4 py-8 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in"
		>
			<div
				ref={modalRef}
				className="bg-background md:px-10 lg:px-13 px-4 pb-6 md:pb-10 pt-18 lg:pt-16.5 max-w-125 w-full rounded-3xl animate-scale-in relative shadow-2xl"
			>
				<button
					onClick={onClose}
					className="cursor-pointer absolute top-5 right-5 w-10 h-10 rounded-full bg-[#f5f5f7] flex items-center justify-center hover:bg-foreground hover:text-white transition-all duration-300 group"
					aria-label="Закрыть форму"
				>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</button>

				<Title className="mb-10 text-center">Оставить заявку</Title>

				<div className="mb-10 space-y-4 leading-snug text-[14px] tracking-[-0.01em] font-helvetica">
					<div className="flex pb-4 border-b border-black/10 items-center gap-3">
						<div className="w-12.5 h-12.5 bg-white rounded-[10px]">
							<Image
								src="/images/icons/address-decor.svg"
								width={50}
								height={50}
								alt={brand.address}
							/>
						</div>
						<div className="text-[15px] max-w-49">
							<span className="text-brand-blue">{brand.address}</span>
						</div>
					</div>

					<div className="text-brand-blue flex items-center gap-3">
						<div className="basis-12.5 w-12.5">
							<Image
								className="w-full h-auto"
								src="/images/icons/phone-header.svg"
								alt="MiMiSmart"
								width={50}
								height={50}
							/>
						</div>
						<div>
							<a className="transition-colors duration-300 hover:text-foreground" href={`tel:${phoneClean}`}>
								{contacts.phone}
							</a>
							<p className="text-[#acacac]">Время работы: {contacts.workingHours}</p>
						</div>
					</div>
				</div>

				{message && (
					<div
						className={`mb-5 rounded-2xl px-4 py-3 text-[14px] leading-[1.35] ${
							isSuccess
								? "bg-[#e9fff3] text-[#0f7a43]"
								: isError
									? "bg-[#fff1f1] text-[#c03030]"
									: "bg-white text-foreground"
						}`}
					>
						{message}
					</div>
				)}

				<form className="w-full flex flex-col" onSubmit={handleSubmit}>
					<div className="space-y-3 mb-5">
						<label className="block">
							<input
								type="text"
								name="name"
								placeholder="Ваше имя*"
								value={values.name}
								onChange={handleChange}
								className="min-h-10.75 w-full rounded-lg bg-white px-3 py-3 text-[15px] text-black placeholder:text-black/40 outline-none transition"
							/>
							{errors.name && (
								<span className="mt-2 block text-[13px] leading-none text-[#c03030]">
									{errors.name}
								</span>
							)}
						</label>

						<label className="block">
							<input
								type="tel"
								name="phone"
								placeholder="Телефон*"
								value={values.phone}
								onChange={handleChange}
								className="min-h-10.75 w-full rounded-lg bg-white px-3 py-3 text-[15px] text-black placeholder:text-black/40 outline-none transition"
							/>
							{errors.phone && (
								<span className="mt-2 block text-[13px] leading-none text-[#c03030]">
									{errors.phone}
								</span>
							)}
						</label>

						<label className="block">
							<textarea
								name="comment"
								placeholder="Комментарий"
								value={values.comment}
								onChange={handleChange}
								rows={4}
								className="w-full rounded-lg bg-white px-3 py-3 text-[15px] text-black placeholder:text-black/40 outline-none transition resize-none"
							/>
						</label>
					</div>

					<label className="flex cursor-pointer items-start gap-3 md:gap-2 mb-5 md:mb-6">
						<input
							type="checkbox"
							name="consent"
							checked={values.consent}
							onChange={handleChange}
							className="mt-0.5 h-5 w-5 shrink-0 appearance-none rounded-sm bg-[#d9d9d9] checked:bg-[#008dff] focus:outline-none focus:ring-2 focus:ring-[#00aeef]"
						/>

						<span className="text-[13px] leading-[1.2] text-[#999]">
							Нажимая на кнопку «Отправить заявку», вы соглашаетесь с{" "}
							<a
								href="/privacy"
								className="text-brand-blue"
							>
								условиями обработки персональных данных
							</a>
						</span>
					</label>

					{errors.consent && (
						<span className="-mt-2 mb-5 block text-[13px] leading-none text-[#c03030]">
							{errors.consent}
						</span>
					)}

					<button
						type="submit"
						disabled={isLoading}
						className="self-center bg-[#00d0ff] disabled:opacity-60 disabled:cursor-not-allowed duration-300 transition-colors cursor-pointer hover:bg-brand-blue leading-none rounded-[50px] pt-3.5 pb-3 px-10 font-medium text-[14px] text-white"
					>
						{isLoading ? "Отправка..." : "Отправить заявку"}
					</button>
				</form>
			</div>
		</div>
	)
}
