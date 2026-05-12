import { Title } from "@/components/UI/Title";
import { RightArrowIcon } from "@/icons/RightArrowIcon";
import Image from "next/image";

type Props = {
	title: string
	text: string
	link?: string
	image: string
	imageWidth: number
	imageHeight: number
}

export default function SystemCase({ title,
	text,
	link,
	image,
	imageWidth,
	imageHeight }: Props) {
	return (
		<section className="py-22.5">
			<div className="max-w-235.5 px-4 mx-auto">
				<div className="space-y-4 mb-10">
					<Title>{title}</Title>
					<div className="text-[17px] font-helvetica leading-[1.3] -tracking-[0.01em]">{text}</div>
					{link && (
						<a href={link} className="inline-flex hover:text-foreground transition-colors duration-300 items-center gap-1 text-[15px] font-medium text-brand-blue group">
							Узнать больше
							<RightArrowIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
						</a>
					)}
				</div>
				<Image
					width={imageWidth}
					height={imageHeight}
					alt=""
					src={image}
					className="rounded-[20px]"
				/>
			</div>
		</section>
	)
}