"use client"

import { useState } from "react"
import { Title } from "@/components/UI/Title"
import { RightArrowIcon } from "@/icons/RightArrowIcon"
import Image from "next/image"
import type { ProjectStep } from "@/types/project"

const UI_TEXT = {
	stepsTitle: "\u042D\u0442\u0430\u043F\u044B \u0440\u0430\u0431\u043E\u0442",
}

type ProjectStepsProps = {
	steps: ProjectStep[]
}

export default function ProjectSteps({ steps }: ProjectStepsProps) {
	const [openIndex, setOpenIndex] = useState<number | null>(0)

	const toggleSpoiler = (index: number) => {
		setOpenIndex(prev => (prev === index ? null : index))
	}

	if (steps.length === 0) {
		return null
	}

	return (
		<section className="max-lg:pb-20 max-lg:pt-10 lg:py-22.5 bg-white">
			<div className="max-w-308 px-4 mx-auto">
				<Title className="mb-15 text-center">{UI_TEXT.stepsTitle}</Title>

				<div className="flex max-lg:flex-col justify-between gap-20">
					<ul className="lg:max-w-106.75">
						{steps.map((spoiler, i) => {
							const isOpen = openIndex === i

							return (
								<li
									key={`${spoiler.title}-${i}`}
									className="border-b border-[#d9d9d9] py-4 md:py-5 -tracking-[0.01em]"
								>
									<button
										type="button"
										onClick={() => toggleSpoiler(i)}
										className="hover:text-brand-blue duration-300 transition-colors w-full cursor-pointer flex items-center justify-between gap-2 font-semibold text-[17px] leading-[1.3] text-left"
										aria-expanded={isOpen}
										aria-controls={`spoiler-content-${i}`}
									>
										<span>{spoiler.title}</span>
										<RightArrowIcon
											className={`w-6 h-6 lg:w-8 lg:h-8 flex-none transition-transform duration-300 ${isOpen ? "rotate-270" : "rotate-90"
												}`}
										/>
									</button>

									<div
										id={`spoiler-content-${i}`}
										className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] pt-4" : "grid-rows-[0fr]"
											}`}
									>
										<div className="overflow-hidden">
											<div className="font-helvetica leading-[1.4]">
												{spoiler.content}
											</div>
										</div>
									</div>
								</li>
							)
						})}
					</ul>

					<div className="max-lg:max-w-400">
						<Image
							src="/images/project-page/steps-decor.png"
							width={606}
							height={456}
							alt=""
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
