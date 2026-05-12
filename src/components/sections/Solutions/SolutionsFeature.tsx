import ArrowLink from "@/components/UI/ArrowLink"
import { Title } from "@/components/UI/Title"
import Image from "next/image"

type Props = {
	title: string
	text: string
	link?: string

	image: string
	imageWidth: number
	imageHeight: number

	imageClassName?: string
	containerClassName?: string
}

export default function SolutionsFeature({
	title,
	text,
	link,
	image,
	imageWidth,
	imageHeight,
	imageClassName,
	containerClassName
}: Props) {
	return (
		<section className="py-22.5 overflow-hidden">
			<div className={`max-w-235.5 px-4 mx-auto flex flex-col items-center ${containerClassName ?? ""}`}>

				<div className="mb-10 flex flex-col text-center items-center  space-y-6">
					<Title>{title}</Title>

					<div className="font-helvetica text-[17px] leading-[1.3] max-w-142.5 -tracking-[0.01em]">
						{text}
					</div>

					{link && <ArrowLink href={link}>Узнать больше</ArrowLink>}
				</div>

				<div className={`self-start ${imageClassName ?? ""}`}>
					<Image
						src={image}
						width={imageWidth}
						height={imageHeight}
						alt=""
					/>
				</div>

			</div>
		</section>
	)
}