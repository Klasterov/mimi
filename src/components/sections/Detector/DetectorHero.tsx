import { Title } from "@/components/UI/Title"
import Image from "next/image"
import { DetectorHero as DetectorHeroType } from "@/types/detector"

type Props = {
	hero: DetectorHeroType
}

export default function DetectorHero({ hero }: Props) {
	return (
		<section className={`${hero.sectionClasses} overflow-hidden`}>
			<div className="max-w-308 px-4 mx-auto flex max-md:flex-col max-md:gap-10 items-center justify-between">
				<div className={hero.contentWrapperClasses}>
					<Title className="mb-4">{hero.title}</Title>
					<div className="font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em]">
						{hero.text}
					</div>
				</div>

				<div className={hero.imageWrapperClasses}>
					<Image
						src={hero.image}
						width={hero.imageWidth}
						height={hero.imageHeight}
						alt={hero.title}
						quality={95}
					/>
				</div>
			</div>
		</section>
	)
}