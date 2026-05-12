import { Title } from "@/components/UI/Title"
import { RightArrowIcon } from "@/icons/RightArrowIcon"
import Image from "next/image"

export default function LightningBio() {
	return (
		<section className="pb-22.5 lg:pt-15 pt-11.25">
			<div className="max-w-308 mx-auto px-4">
				<div className="mb-10 lg:justify-between lg:flex lg:items-end lg:gap-10">
					<Title><span className="text-[32px] md:text-[40px] lg:text-[64px]">Биодинамическое освещение</span></Title>
					<a href="#" className="lg:inline-flex tracking-[-0.01e] hidden items-center gap-1 text-[15px] text-brand-blue whitespace-nowrap">
						Узнать большое про Биодинамику
						<RightArrowIcon className="w-5 h-5"></RightArrowIcon>
					</a>
				</div>
				<div className="lg:relative lg:rounded-[20px] lg:overflow-hidden lg:min-h-150 lg:px-10 lg:pb-10 lg:pt-20 lg:flex lg:flex-col lg:gap-10 lg:justify-between">
					<Image
						src="/images/lightning-page/bio/bg.jpg"
						fill
						quality={95}
						alt=""
						className="hidden lg:block object-cover"
					/>
					<div className="relative min-h-70 mb-2.5 lg:mb-0 overflow-hidden rounded-[20px] lg:rounded-none py-6 lg:py-0 px-5 lg:min-h-auto lg:px-0 text-[17px] text-white lg:max-w-115">
						<Image
							src="/images/lightning-page/bio/bg-mob.jpg"
							quality={95}
							fill
							alt=""
							className="object-cover lg:hidden"
						/>
						<div className="space-y-3 relative font-helvetica">

							<p>Биодинамическое освещение создано, чтобы имитировать естественное освещение.</p>
							<p>Стандартное освещение в квартире – нарушает генетически заложенные внутренние часы человека.</p>
						</div>
					</div>
					<ul className="relative sm:flex-row flex-col flex gap-2.5 -tracking-[0.01em]">
						<li className="rounded-[20px] px-5 md:px-6 py-6 bg-white">
							<div className="mb-2 font-medium text-[17px]">Есть природа</div>
							<ul className="text-[15px] text-brand-gray font-helvetica">
								<li><span className="mr-2 text-current">•</span> Утром солнце встает </li>
								<li><span className="mr-2 text-current">•</span> Днем солнце в зените</li>
								<li><span className="mr-2 text-current">•</span> Вечером солнце заходит </li>
								<li><span className="mr-2 text-current">•</span> Ночью солнца нет</li>
							</ul>
						</li>
						<li className="rounded-[20px] p-6 bg-white">
							<div className="mb-2 font-medium text-[17px]">Проецируем в квартиру:</div>
							<ul className="text-[15px] text-brand-gray font-helvetica">
								<li><span className="mr-2 text-current">•</span> Плавное пробуждение теплым светом.</li>
								<li><span className="mr-2 text-current">•</span> Днем яркий белый свет</li>
								<li><span className="mr-2 text-current">•</span> Вечером приглушенный теплый свет</li>
								<li><span className="mr-2 text-current">•</span> Ночью нет света, только тусклая подсветка.</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</section>
	)
}
