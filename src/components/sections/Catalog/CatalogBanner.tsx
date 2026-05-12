import { Title } from "@/components/UI/Title"
import Image from "next/image"

type Props = {
	title: string
	description: string
	image: string
	imageWidth: number
	imageHeight: number
}

export default function CatalogBanner({
	title,
	description,
	image,
	imageWidth,
	imageHeight,
}: Props) {
	return (
		<section className="pt-10 bg-white md:pt-15 lg:pt-22.5 pb-15 md:pb-22.5 lg:pb-30">
			<div className="max-w-308 mx-auto px-4">
				<div className="bg-background flex max-lg:flex-col items-center max-lg:pt-10 lg:pl-20 gap-10 justify-between">
					<div className="max-lg:px-4 lg:py-15">
						<Title className="mb-6">{title}</Title>
						<div className="font-helvetica lg:max-w-130 text-[17px] -tracking-[0.01em]">{description}</div>
					</div>
					<div className="max-w-100 lg:max-w-[43.8%]">
						<Image
							src={image}
							width={imageWidth}
							height={imageHeight}
							alt=""
						/>
					</div>
				</div>
			</div>
		</section>
	)
}