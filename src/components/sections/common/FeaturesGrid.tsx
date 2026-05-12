import { Title } from "@/components/UI/Title"
import Image from "next/image"


type FeatureItem = {
	image: string
	cap: string
	descr: string
	imageClasses?: string
}

type Props = {
	title: string
	items: FeatureItem[]
	sectionClasses?: string
	titleClasses?: string
}

export default function FeaturesGrid({ title, items, sectionClasses, titleClasses }: Props) {
	return (
		<section className={`pt-22.5 lg:pt-30 pb-22.5 ${sectionClasses}`}>
			<div className="max-w-308 mx-auto px-4">
				<Title className={`mb-6 md:mb-8 lg:mb-10 ${titleClasses}`}>{title}</Title>
				<ul className="gap-4 lg:gap-5 flex flex-wrap">
					{items.map((col, i) => {
						const widthClass = (i === 1 || i === 2) ? 'lg:w-[65%]' : 'lg:w-[33%]'

						const orderClass =
							i === 2
								? "order-4 lg:order-none"
								: i === 3
									? "order-3 lg:order-none"
									: ""

						return (
							<li
								key={i}
								className={`p-5 flex-auto lg:p-6 relative min-h-89.5 rounded-2xl lg:rounded-[20px] overflow-hidden lg:min-h-100 flex flex-col justify-end ${widthClass} ${orderClass}`}
							>
								<Image
									src={col.image}
									className={`object-cover ${col.imageClasses}`}
									quality={95}
									fill
									alt=""
								/>
								<h3 className="relative mb-1 font-medium text-white leading-tight">{col.cap}</h3>
								<div className={`${i === 0 ? 'max-w-[80%]' : ''} ${i === 2 ? 'max-w-[85%]' : ''} relative text-[15px] text-[#95979e] font-helvetica -tracking-[0.2px]`}>
									{col.descr}
								</div>
							</li>
						)
					})}
				</ul>

			</div>
		</section>
	)
}
