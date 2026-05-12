import type { ProjectDetails } from "@/types/project"
import SafeImage from "@/components/UI/SafeImage"

type ProjectHeroProps = Pick<ProjectDetails, "title" | "objectType" | "area" | "heroImage">

export default function ProjectHero({ title, objectType, area, heroImage }: ProjectHeroProps) {
	return (
		<section className="pt-15 overflow-hidden text-black bg-white">
			<div className="max-w-368 px-4 mx-auto flex font-bold flex-col items-center text-center -tracking-[0.01em]">
				<div className="mb-7 flex items-center justify-center gap-4 lg:gap-6 text-[15px]">
					{objectType && <span>{objectType}</span>}
					{objectType && area && <span>&bull;</span>}
					{area && <span>{area}</span>}
				</div>

				<div className="w-full mb-13.5 md:mb-16 lg:mb-22.5">
					<div className="animate-marquee flex whitespace-nowrap">
						<h1 className="text-[24px] md:text-[32px] lg:text-[48px] xl:text-[64px] pr-10">
							{title} -
						</h1>
						<h1 className="text-[24px] md:text-[32px] lg:text-[48px] xl:text-[64px] pr-10">
							{title} -
						</h1>
					</div>
				</div>

				<div className="relative max-xl:hidden w-full aspect-1440/900">
					<SafeImage
						src={heroImage}
						fill
						alt={title}
						quality={95}
						className="object-cover"
					/>
				</div>
				<div className="xl:hidden -mx-4">
					<SafeImage
						src={heroImage}
						width={1440}
						height={900}
						alt={title}
						quality={95}
						className="object-cover"
					/>
				</div>
			</div>
		</section>
	)
}
