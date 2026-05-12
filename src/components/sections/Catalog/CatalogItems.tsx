"use client"

import { useState } from "react"

import { RightArrowIcon } from "@/icons/RightArrowIcon";
import Image from "next/image";
import Link from "next/link";
import { Title } from "@/components/UI/CatalogTitle";
import type { CatalogItem as ProductItem } from "@/types/catalog";

function isRemoteImage(src: string) {
	return src.startsWith("http://") || src.startsWith("https://")
}

function getControllerHref(item: ProductItem, fallbackIndex: number) {
	if (typeof item.id === "string" && item.id.trim()) {
		return `/controller/${encodeURIComponent(item.id.trim())}`
	}

	if (typeof item.id === "number") {
		return `/controller/${item.id}`
	}

	if (typeof item.link === "string" && item.link.trim() && !item.link.includes("undefined")) {
		return item.link
	}

	return `/controller/${fallbackIndex}`
}

const IMAGE_FRAME_WIDTH = 197
const IMAGE_FRAME_HEIGHT = 266

type Props = {
	title?: string
	mobTitle?: string
	items: ProductItem[]
	INITIAL_COUNT?: number
	LOAD_MORE?: number
}

export default function CatalogItems({
	title,
	items,
	mobTitle,
	INITIAL_COUNT = 6,
	LOAD_MORE = 3
}: Props) {
	const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)

	const handleLoadMore = () => {
		setVisibleCount(prev => prev + LOAD_MORE)
	}

	const visibleItems = items.slice(0, visibleCount)

	return (
		<section className="py-22.5 bg-white">
			<div className="max-w-308 mx-auto px-4">
				{title && (
					<Title className="mb-10 text-center">{title}</Title>
				)}
				<ul className="grid grid-cols-2 lg:grid-cols-3 sm:gap-4 gap-2 mb-6 lg:mb-10">
					{visibleItems.map((item, i) => (
						<li
							key={String(item.id ?? item.link ?? i)}
							className="rounded-[20px] bg-background px-5 py-6 md:px-10 md:py-10 lg:min-h-122.5 flex flex-col"
						>
							<div className="self-center mb-5 flex h-[266px] w-[197px] items-center justify-center overflow-hidden">
								{isRemoteImage(item.image.src) ? (
									<img
										src={item.image.src}
										alt={item.cap}
										width={IMAGE_FRAME_WIDTH}
										height={IMAGE_FRAME_HEIGHT}
										loading="lazy"
										referrerPolicy="no-referrer"
										className="h-full w-full object-contain"
									/>
								) : (
									<Image
										src={item.image.src}
										alt={item.cap}
										width={IMAGE_FRAME_WIDTH}
										height={IMAGE_FRAME_HEIGHT}
										quality={95}
										className="h-full w-full object-contain"
									/>
								)}
							</div>
							<div className="space-y-4 md:space-y-3 -tracking-[0.01em] max-sm:text-center mt-auto">
								<h3 className="font-semibold max-sm:text-[15px] leading-[1.4]">{item.cap}</h3>
								<div className="text-[15px] max-sm:hidden line-clamp-2">{item.descr}</div>

								<Link
									href={getControllerHref(item, i)}
									className="inline-flex hover:text-foreground transition-colors duration-300 items-center gap-1 text-[15px] font-medium text-brand-blue group cursor-pointer"
								>
									Подробнее
									<RightArrowIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
								</Link>
							</div>
						</li>
					))}
				</ul>
				{visibleCount < items.length && (
					<div className="text-center">
						<button
							onClick={handleLoadMore}
							className="cursor-pointer shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] font-medium text-[13px] text-[#121212] p-3 rounded-[50px] min-w-50 bg-white"
						>
							Показать еще
						</button>
					</div>
				)}
			</div>
		</section>
	)
}
