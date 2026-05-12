"use client"

import { useState } from "react"
import { Button } from "@/components/UI/Button"
import { Title } from "@/components/UI/Title"
import Image from "next/image"

const tabs = [
	{
		title: '84см',
		content: 'Сокращаем количество выключателей в среднем в 2 раза. Итого у вас теперь 3-5 выключателей вместо 10.',
	},
	{
		title: '90см',
		content: 'Сокращаем количество выключателей в среднем в 2 раза. Итого у вас теперь 3-5 выключателей вместо 10.',
	},
	{
		title: '96см',
		content: 'Сокращаем количество выключателей в среднем в 2 раза. Итого у вас теперь 3-5 выключателей вместо 10.',
	},
	{
		title: '104см',
		content: 'Сокращаем количество выключателей в среднем в 2 раза. Итого у вас теперь 3-5 выключателей вместо 10.',
	},
	{
		title: '120см',
		content: 'Сокращаем количество выключателей в среднем в 2 раза. Итого у вас теперь 3-5 выключателей вместо 10.',
	},
	{
		title: '168см',
		content: 'Сокращаем количество выключателей в среднем в 2 раза. Итого у вас теперь 3-5 выключателей вместо 10.',
	},
]

export default function TvDiagonal() {
	const [activeTab, setActiveTab] = useState(0)

	return (
		<section className="py-22.5 overflow-hidden">
			<div className="max-w-235.5 px-4 mx-auto text-center flex flex-col items-center">
				<Title className="mb-10">
					Диагональ <span className="bg-[linear-gradient(90deg,#0b0d10_34.62%,#478beb_89.42%)] bg-clip-text text-transparent">vs</span> <br />
					дистанция просмотра
				</Title>

				<div className="mb-10 w-100 md:w-119 aspect-476/540 relative">
					<Image
						fill
						alt=""
						src="/images/tv-page/diagonal/decor.png"
						quality={95}
					/>

					<div className="absolute top-[41%] right-[53.8%] font-medium text-[15px] leading-normal -tracking-[0.01em]">
						{tabs[activeTab].title}
					</div>
				</div>

				<div className="md:rounded-[50px] md:p-1 md:bg-white gap-2 flex items-center flex-wrap justify-center mb-10">
					{tabs.map((tab, i) => (
						<button
							type="button"
							key={i}
							onClick={() => setActiveTab(i)}
							className={`cursor-pointer rounded-[50px] py-2.5 px-5 transition-colors duration-300 font-medium text-[15px] leading-normal text-center -tracking-[0.01em]
								${activeTab === i
									? "bg-foreground text-white"
									: "hover:bg-foreground max-md:bg-white hover:text-white"
								}`}
						>
							{tab.title}
						</button>
					))}
				</div>

				<div className="font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em] text-center max-w-125">
					{tabs[activeTab].content}
				</div>
			</div>
		</section>
	)
}