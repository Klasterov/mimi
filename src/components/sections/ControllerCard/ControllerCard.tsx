"use client"

import Image from "next/image"
import type { CatalogItem } from "@/types/catalog"

type ControllerCardProps = CatalogItem

function isRemoteImage(src: string) {
	return src.startsWith("http://") || src.startsWith("https://")
}

export default function ControllerCard({ cap, descr, fullDescription, image, specifications, steps }: ControllerCardProps) {
	return (
		<section className="bg-white">
			<div className="text-center pt-15 pb-22.5 text-black font-bold overflow-hidden">
				<div className="mb-4 max-w-308 px-4 mx-auto text-[20px] md:text-[22px] lg:text-[24px] -tracking-[0.01em]">
					Оборудование
				</div>
				<div className="overflow-hidden">
					<div className="animate-marquee text-[40px] md:text-[52px] lg:text-[64px] flex whitespace-nowrap">
						<span className="mr-10">
							{cap} — {cap} — {cap} —
						</span>
						<span>
							{cap} — {cap} — {cap} —
						</span>
					</div>
				</div>
			</div>
			<div className="max-w-308 px-4 mx-auto">
				<div className="py-15 lg:py-22.5 border-y border-[#d9d9d9] flex max-lg:flex-col items-center gap-15 lg:gap-10 lg:justify-between">
					{image && (
						isRemoteImage(image.src) ? (
							<img
								src={image.src}
								width={image.width || 349}
								height={image.height || 449}
								alt={cap}
								loading="lazy"
								referrerPolicy="no-referrer"
								className="max-w-63.5 md:max-w-100"
							/>
						) : (
							<Image
								src={image.src}
								width={image.width || 349}
								height={image.height || 449}
								alt={cap}
								className="max-w-63.5 md:max-w-100"
							/>
						)
					)}
					<div className="font-helvetica basis-[54.25%] md:grow-0 md:shrink-0 text-[17px] -tracking-[0.01em] space-y-[1em]">
						<p>{fullDescription || descr}</p>
					</div>
				</div>

				{specifications && specifications.length > 0 && (
					<div className="py-15 lg:py-22.5 border-b border-[#d9d9d9]">
						<table className="w-full border border-[#d9d9d9] text-left text-[13px] sm:text-[15px] lg:text-[17px] font-helvetica -tracking-[0.01em] leading-snug">
							<thead className="text-brand-gray">
								<tr className="border-b border-[#d9d9d9]">
									<th className="px-4 py-2.5 font-normal border-r border-[#d9d9d9]">
										Наименование параметра
									</th>
									<th className="px-4 py-2.5 font-normal border-r border-[#d9d9d9]">
										Единицы измерения
									</th>
									<th className="px-4 py-2.5 font-normal">Значение</th>
								</tr>
							</thead>
							<tbody>
								{specifications.map((spec, idx) => (
									<tr
										key={idx}
										className={idx === specifications.length - 1 ? "" : "border-b border-[#d9d9d9]"}
									>
										<td className="px-4 py-2.5 border-r border-[#d9d9d9]">{spec.name}</td>
										<td className="px-4 py-2.5 border-r border-[#d9d9d9]">{spec.unit}</td>
										<td className="px-4 py-2.5">{spec.value}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}

				{steps && steps.length > 0 && (
					<div className="py-15 lg:py-22.5 border-b border-[#d9d9d9]">
						<div className="space-y-8">
							{steps.map((step, idx) => (
								<div key={idx} className="font-helvetica -tracking-[0.01em]">
									<h3 className="font-bold text-[18px] mb-2">{step.title}</h3>
									<p className="text-[15px]">{step.content}</p>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</section>
	)
}
