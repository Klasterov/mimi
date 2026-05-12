import { Title } from "@/components/UI/Title"
import Image from "next/image"

type Props = {
	title: string
	description: string
	image: string
	imageWidth: number
	imageHeight: number
	imageClassName?: string
}

export default function CatalogHero({
	title,
	description,
	image,
	imageWidth,
	imageHeight,
	imageClassName = "",
}: Props) {
	return (
		<section>
			<div className="max-w-308 overflow-hidden mx-auto max-md:pt-10 px-4 flex items-center max-md:flex-col justify-between gap-10">
				<div className="md:py-10 max-md:self-stretch max-w-127.5">
					<Title className="mb-4">{title}</Title>

					<div className="font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em]">
						{description}
					</div>
				</div>

				<Image
					width={imageWidth}
					height={imageHeight}
					alt=""
					src={image}
					className={imageClassName}
				/>
			</div>
		</section>
	)
}