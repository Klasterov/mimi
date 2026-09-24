'use client'

import { useEffect, useId, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import type { Article } from "@/types/article"

interface ArticleSearchProps {
	articles: Article[]
	/** Ссылка на страницу статьи. Поправь под свой роутинг. */
	getHref?: (article: Article) => string
	className?: string
}

const escapeRegExp = (value: string) =>
	value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

function Highlight({ text, tokens }: { text: string; tokens: string[] }) {
	if (tokens.length === 0) return <>{text}</>

	const regex = new RegExp(
		`(${[...tokens].sort((a, b) => b.length - a.length).map(escapeRegExp).join("|")})`,
		"gi"
	)

	// split с capture-группой: совпадения всегда на нечётных индексах
	return (
		<>
			{text.split(regex).map((part, i) =>
				i % 2 === 1 ? (
					<mark
						key={i}
						className="bg-[#dce9ff] text-[#3b7df0] rounded-xs px-px"
					>
						{part}
					</mark>
				) : (
					<span key={i}>{part}</span>
				)
			)}
		</>
	)
}

export function ArticleSearch({
	articles,
	getHref = article => `/news/${article.id}`,
	className = "",
}: ArticleSearchProps) {
	const router = useRouter()
	const listId = useId()
	const rootRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)

	const [query, setQuery] = useState("")
	const [isOpen, setIsOpen] = useState(false)
	const [activeIndex, setActiveIndex] = useState(-1)

	const tokens = useMemo(
		() => query.trim().toLowerCase().split(/\s+/).filter(Boolean),
		[query]
	)

	const results = useMemo(() => {
		if (tokens.length === 0) return []
		return articles.filter(article => {
			const title = article.title.toLowerCase()
			return tokens.every(token => title.includes(token))
		})
	}, [articles, tokens])

	const showDropdown = isOpen && tokens.length > 0

	// закрытие по клику вне поля
	useEffect(() => {
		const onPointerDown = (e: MouseEvent | TouchEvent) => {
			if (!rootRef.current?.contains(e.target as Node)) setIsOpen(false)
		}
		document.addEventListener("mousedown", onPointerDown)
		document.addEventListener("touchstart", onPointerDown)
		return () => {
			document.removeEventListener("mousedown", onPointerDown)
			document.removeEventListener("touchstart", onPointerDown)
		}
	}, [])

	const handleChange = (value: string) => {
		setQuery(value)
		setActiveIndex(-1)
		setIsOpen(true)
	}

	const handleClear = () => {
		setQuery("")
		setActiveIndex(-1)
		setIsOpen(false)
		inputRef.current?.focus()
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Escape") {
			setIsOpen(false)
			return
		}
		if (!showDropdown || results.length === 0) return

		if (e.key === "ArrowDown") {
			e.preventDefault()
			setActiveIndex(i => (i + 1) % results.length)
		} else if (e.key === "ArrowUp") {
			e.preventDefault()
			setActiveIndex(i => (i <= 0 ? results.length - 1 : i - 1))
		} else if (e.key === "Enter" && activeIndex >= 0) {
			e.preventDefault()
			router.push(getHref(results[activeIndex]))
		}
	}

	return (
		<div ref={rootRef} className={`relative w-full ${className}`}>
			<div className="relative">
				<svg
					className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#9a9a9a]"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					aria-hidden="true"
				>
					<circle cx="11" cy="11" r="7" />
					<path d="m20 20-3.5-3.5" />
				</svg>

				<input
					ref={inputRef}
					type="text"
					role="combobox"
					aria-expanded={showDropdown}
					aria-controls={listId}
					aria-autocomplete="list"
					aria-activedescendant={
						activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined
					}
					value={query}
					onChange={e => handleChange(e.target.value)}
					onFocus={() => setIsOpen(true)}
					onKeyDown={handleKeyDown}
					placeholder="Поиск"
					autoComplete="off"
					className="w-full h-12 md:h-13 rounded-[50px] bg-white pl-12 pr-11 text-base md:text-[15px] font-medium text-[#121212] placeholder:text-[#b5b5b5] placeholder:font-normal outline-none transition-shadow duration-300 focus:shadow-[0_0_0_2px_rgba(59,125,240,0.25)]"
				/>

				{query && (
					<button
						type="button"
						onClick={handleClear}
						aria-label="Очистить поиск"
						className="absolute right-3 top-1/2 -translate-y-1/2 grid size-8 place-items-center rounded-full text-[#8a8a8a] hover:text-[#121212] cursor-pointer transition-colors duration-300"
					>
						<svg
							className="size-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							aria-hidden="true"
						>
							<path d="M6 6l12 12M18 6 6 18" />
						</svg>
					</button>
				)}
			</div>

			{showDropdown && (
				<div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-[65vh] overflow-y-auto rounded-3xl bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
					{results.length > 0 ? (
						<>
							<div className="mb-3 text-[13px] text-[#9a9a9a]">
								Найдено: {results.length}
							</div>

							<ul id={listId} role="listbox" className="space-y-1">
								{results.map((article, index) => (
									<li
										key={article.id}
										id={`${listId}-${index}`}
										role="option"
										aria-selected={index === activeIndex}
									>
										<Link
											href={getHref(article)}
											onMouseEnter={() => setActiveIndex(index)}
											onClick={() => setIsOpen(false)}
											className={`flex items-center gap-3 sm:gap-4 rounded-2xl p-1.5 -m-1.5 transition-colors duration-200 ${index === activeIndex ? "bg-[#f4f6fa]" : ""
												}`}
										>
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img
												src={article.image}
												alt=""
												className="h-14 w-16 sm:h-15 sm:w-21 shrink-0 rounded-xl object-cover"
											/>

											<div className="min-w-0">
												<div className="text-[14px] sm:text-[15px] font-semibold leading-tight text-[#121212]">
													<Highlight text={article.title} tokens={tokens} />
												</div>
												<div className="mt-1 text-[12px] font-medium text-[#3b7df0]">
													{article.tag}
												</div>
											</div>
										</Link>
									</li>
								))}
							</ul>
						</>
					) : (
						<div className="py-2 text-center text-[14px] text-[#9a9a9a]">
							Ничего не найдено
						</div>
					)}
				</div>
			)}
		</div>
	)
}