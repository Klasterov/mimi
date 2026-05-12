"use client"

import { useEffect, useRef } from "react"

interface AdvantageModalProps {
	title: string
	description: string
	onClose: () => void
}

export function AdvantageModal({ title, description, onClose }: AdvantageModalProps) {
	const modalRef = useRef<HTMLDivElement | null>(null)

	// Закрытие по ESC
	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose()
		}
		document.addEventListener("keydown", onKeyDown)
		return () => document.removeEventListener("keydown", onKeyDown)
	}, [onClose])

	// Блокировка скролла (как в вашем примере с сертификатами)
	useEffect(() => {
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
		document.body.style.overflow = 'hidden'
		if (scrollbarWidth > 0) {
			document.body.style.paddingRight = `${scrollbarWidth}px`
		}
		return () => {
			document.body.style.overflow = ''
			document.body.style.paddingRight = '0'
		}
	}, [])

	const onOverlayClick = (e: React.MouseEvent) => {
		if (!modalRef.current?.contains(e.target as Node)) {
			onClose()
		}
	}

	return (
		<div
			onClick={onOverlayClick}
			className="fixed inset-0 z-100 px-4 py-8 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in"
		>
			<div
				ref={modalRef}
				className="bg-white max-w-140 p-8 md:p-12 w-full rounded-4xl animate-scale-in relative shadow-2xl"
			>
				<button
					onClick={onClose}
					className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#f5f5f7] flex items-center justify-center hover:bg-foreground hover:text-white transition-all duration-300 group"
				>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
				</button>

				<div className="flex flex-col gap-4">
					<div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue mb-2">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
							<path d="M12 16v-4"></path>
							<path d="M12 8h.01"></path>
						</svg>
					</div>

					<h3 className="text-2xl md:text-3xl font-bold text-black leading-tight">
						{title}
					</h3>

					<p className="font-helvetica text-[16px] md:text-[18px] leading-relaxed text-brand-gray">
						{description}
					</p>
				</div>
			</div>
		</div>
	)
}