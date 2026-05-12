import { Title } from "@/components/UI/Title";
import { TeamList } from "@/data/team";
import type { Team } from "@/types/team";
import Image from "next/image";

const leftCol = TeamList.filter((_, i) => i % 2 === 0)
const rightCol = TeamList.filter((_, i) => i % 2 !== 0)

function TeamCard({ name, position, image }: Team) {
	return (
		<li className="min-w-65 lg:min-w-0 relative flex flex-col items-start justify-end px-4 py-3 aspect-260/294 md:aspect-260/290 tracking-[-0.01em] rounded-xl overflow-hidden">
			<Image src={image} quality={95} fill alt={name} className="object-cover" />
			<div className="bg-linear-to-b from-transparent to-black absolute bottom-0 left-0 w-full aspect-260/81" />
			<div className="relative font-medium text-[17px] text-white mb-0.5">
				{name}
			</div>
			<div className="relative font-helvetica text-[#acacac] backdrop-blur-sm bg-[rgba(63,63,63)]/50 rounded-[50px] py-1 px-3 text-[14px]">
				{position}
			</div>
		</li>
	)
}


export default function Team() {
	return (

		<section className="bg-foreground overflow-hidden relative">
			<div className="absolute top-0 -left-7.5 w-61.5 h-full hidden lg:block">
				<Image
					src="/images/team/decor.png"
					quality={95}
					fill
					alt="декор"
				/>
			</div>
			<div className="py-22.5 lg:py-0 max-w-308 mx-auto px-4 flex lg:items-center flex-col lg:flex-row gap-20 lg:gap-10 justify-between">
				<div className="lg:py-20 flex-none lg:w-110 xl:w-135 relative">
					<Title className="mb-4 bg-linear-to-br from-white to-[#999] bg-clip-text text-transparent">Креативная команда MiMiSmart</Title>
					<div className="font-helvetica text-[17px] leading-snug tracking-[-0.01em] max-w-89 text-brand-gray">Выкатили пятое поколение нашего приложения, которое считаем самым успешным и удобным.</div>
				</div>
				<div className="relative xl:-mr-20 flex lg:flex-row flex-col gap-1 md:gap-5 lg:max-h-195 px-4 -mx-4 lg:px-0 lg:mx-0">
					<div className="z-10 bg-linear-to-r lg:bg-linear-to-b from-[#0B0D10] from-18% to-transparent absolute top-0 left-0 w-11.5 lg:w-full lg:h-26.25 h-full"></div>
					<div className="z-10 bg-linear-to-l lg:bg-linear-to-t from-[#0B0D10] from-18% to-transparent absolute bottom-0 right-0 lg:left-0 w-11.5 lg:w-full lg:h-26.25 h-full"></div>
					<ul className="lg:space-y-2.5 lg:min-w-60 xl:min-w-65 flex gap-2.5 lg:block team-col team-col--left">
						{[...leftCol, ...leftCol].map((person, i) => (
							<TeamCard key={`l-${person.id}-${i}`} {...person} />
						))}
					</ul>

					<ul className="lg:space-y-2.5 lg:min-w-60 xl:min-w-65 flex gap-2.5 lg:block team-col team-col--right">
						{[...rightCol, ...rightCol].map((person, i) => (
							<TeamCard key={`l-${person.id}-${i}`} {...person} />
						))}
					</ul>


				</div>
			</div>
		</section>
	);
};
