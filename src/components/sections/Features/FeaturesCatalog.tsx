import { Button } from "@/components/UI/Button";
import { Title } from "@/components/UI/Title";
import { RightArrowIcon } from "@/icons/RightArrowIcon";
import Image from "next/image";

const catalog = [
	{
		icon: '/images/features-page/catalog/1.png',
		iconWidth: 75,
		iconHeight: 64,
		description: 'Освещение',
	},
	{
		icon: '/images/features-page/catalog/2.png',
		iconWidth: 63,
		iconHeight: 64,
		description: 'Климат контроль',
	},
	{
		icon: '/images/features-page/catalog/3.png',
		iconWidth: 78,
		iconHeight: 64,
		description: 'Мультимедиа',
	},
	{
		icon: '/images/features-page/catalog/4.png',
		iconWidth: 75,
		iconHeight: 64,
		description: 'Безопасность',
	},
	{
		icon: '/images/features-page/catalog/5.png',
		iconWidth: 91,
		iconHeight: 64,
		description: 'Электрокарнизы',
	},
	{
		icon: '/images/features-page/catalog/6.png',
		iconWidth: 64,
		iconHeight: 64,
		description: 'Управление розетками',
	},
]

export default function FeaturesCatalog() {
	return (
		<section className="pt-30 pb-22.5 lg:pb-11.25 lg:pt-16 relative overflow-hidden">
			<div className="absolute -top-22.5 left-0 w-full h-24.5 bg-[linear-gradient(90deg,#478BEB_0%,#64A3C4_28.13%,#FFC96E_49.82%,#EB477B_73.92%,#478BEB_100%)] blur-[30px]"></div>
			<div className="max-w-308 mx-auto px-4">
				<div className="mb-10 flex lg:flex-row flex-col gap-10 lg:items-end lg:justify-between">
					<Title>Функционал</Title>
					<ul className="space-y-6 lg:space-y-4">
						<li className="flex items-center gap-3">
							<Image
								src="/images/features-page/catalog/icon-1.png"
								width={34}
								height={34}
								alt=""
							/>
							<div className="leading-tight">
								<div className="mb-0.5 font-semibold text-[15px] -tracking-[0.01em]">Нужна консультация по умному дому?</div>
								<a href="#" className="inline-flex hover:text-foreground transition-colors duration-300 items-center gap-1 text-[14px] text-brand-blue group -tracking-[0.01em]">
									Записаться
									<RightArrowIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"></RightArrowIcon>
								</a>
							</div>
						</li>
						<li className="flex items-center gap-3">
							<Image
								src="/images/features-page/catalog/icon-2.svg"
								width={34}
								height={34}
								alt=""
							/>
							<div className="leading-tight">
								<div className="mb-0.5 font-semibold text-[15px] -tracking-[0.01em]">Посетите наш Шоурум</div>
								<a href="#" className="inline-flex hover:text-foreground transition-colors duration-300 items-center gap-1 text-[14px] text-brand-blue group -tracking-[0.01em]">
									Записаться
									<RightArrowIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"></RightArrowIcon>
								</a>
							</div>
						</li>
					</ul>
				</div>
				<ul className="grid mb-30 gap-3 grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
					{catalog.map((item, i) => (
						<li key={i} className="flex aspect-square lg:aspect-auto lg:min-h-47.5 rounded-xl bg-white p-2 lg:p-3 flex-col items-center justify-center gap-2.5 font-medium text-[15px] -tracking-[0.01em] text-center">
							<div className="min-h-18 flex items-center justify-center">


								<Image
									src={item.icon}
									width={item.iconWidth}
									height={item.iconHeight}
									alt={item.description}
								/>
							</div>
							<a href="">{item.description}</a>
						</li>
					))}
				</ul>
				<ul>
					<li className="py-15 lg:py-11.25">
						<div className="mb-6 flex lg:gap-2 leading-[1.2] font-bold text-[24px] md:text-[26px] flex-col lg:flex-row lg:text-[28px] -tracking-[0.01em] ">
							<h3>Освещение.</h3>
							<div className="text-[#acacac]">То, что стоит рассматривать в первую очередь.</div>
						</div>
						<div className="relative rounded-[20px] bg-white px-5.5 py-10 lg:px-10 shadow-[0_0_24px_0_rgba(0,0,0,0.04)] min-h-150 flex">
							<div className="flex flex-col items-start gap-10 lg:gap-5 lg:flex-none lg:w-110 relative z-10">
								<div className="w-[calc(100%+44px)] -mx-5.5 max-w-100 aspect-314/300 lg:hidden -mt-10 relative">

									<Image
										src='/images/features-page/catalog/1/main-1-mob.png'
										fill
										alt=""
										quality={95}
										className="object-cover"
									/>
								</div>
								<Image
									src='/images/features-page/catalog/1/decor.jpg'
									width={140}
									height={140}
									preload
									className="lg:block hidden shadow-[rgba(0,0,0,0.09)_-8px_-8px_8px_0,rgba(0,0,0,0.09)_-4px_-4px_4px_0]"
									alt=""
								/>
								<div className="text-[17px] -tracking-[0.01em] mt-auto lg:mt-0 lg:flex-auto leading-tight font-helvetica">Плавная регулировка яркости от ночника до рабочего уровня без рывков и мерцания. Мягкое включение и затухание, равномерные переходы, управление с кнопки, панели или голосом.</div>
								<Button className="justify-center py-1.75!">Узнать больше</Button>
							</div>
							<div className="hidden lg:block absolute right-0 top-0 aspect-672/600 h-full">
								<Image
									src='/images/features-page/catalog/1/main-1.png'
									fill
									alt=""
								/>
							</div>
						</div>
					</li>
					<li className="py-15 lg:py-11.25">
						<div className="mb-6 flex lg:gap-2 leading-[1.2] font-bold text-[24px] md:text-[26px] flex-col lg:flex-row lg:text-[28px] -tracking-[0.01em]">
							<h3>Климат контроль.</h3>
							<div className="text-[#acacac]">То, что стоит рассматривать в первую очередь.</div>
						</div>
						<div className="rounded-[20px] bg-white lg:bg-[#f8f8f8]] px-5.5 py-10 lg:px-10 shadow-[0_0_24px_0_rgba(0,0,0,0.04)] min-h-150 flex justify-between gap-10 relative">
							<div className="lg:absolute lg:bottom-0 lg:right-0 w-136 hidden lg:block aspect-544/491">
								<Image
									src='/images/features-page/catalog/2/dots.png'
									fill
									alt=""
								/>
							</div>
							<div className="flex flex-col items-start gap-10 lg:gap-5 lg:flex-none lg:w-110">
								<div>
									<Image
										src='/images/features-page/catalog/2/decor.png'
										width={440}
										height={140}
										preload
										alt=""
									/>
								</div>
								<div className="text-[17px] mt-auto lg:mt-0 -tracking-[0.01em] lg:flex-auto leading-tight font-helvetica">Плавная регулировка яркости от ночника до рабочего уровня без рывков и мерцания. Мягкое включение и затухание, равномерные переходы, управление с кнопки, панели или голосом.</div>
								<Button className="justify-center py-1.75!">Узнать больше</Button>
							</div>
							<ul className="relative flex-none w-100 flex-col gap-2 hidden lg:flex">
								<li className="flex-auto">
									<div className="-tracking-[0.01em] rounded-2xl p-4 overflow-hidden relative flex items-end text-[14px] text-white h-full">
										<Image
											src='/images/features-page/catalog/2/item-1.png'
											fill
											alt=""
										/>
										<span className="relative font-helvetica lg:max-w-50">Описание в две строки про Теплый пол</span>
									</div>
								</li>
								<li className="flex-auto">
									<div className="-tracking-[0.01em] rounded-2xl p-4 overflow-hidden relative flex items-end text-[14px] h-full">
										<Image
											src='/images/features-page/catalog/2/item-2.png'
											fill
											alt=""
										/>
										<span className="relative font-helvetica lg:max-w-50">Описание в две строки про Увлажнение</span>
									</div>
								</li>
								<li className="flex-auto flex gap-2 -tracking-[0.01em]">
									<div className="rounded-2xl bg-white p-4 overflow-hidden relative flex items-end text-[14px] h-full flex-auto">
										<Image
											src='/images/features-page/catalog/2/item-3.png'
											fill
											alt=""
										/>
										<span className="relative font-helvetica lg:max-w-50">Описание в две строки про вентиляцию</span>
									</div>
									<div className="rounded-2xl text-[#acacac] font-bold text-[24px] py-4 px-6 bg-[#ededed] flex items-center justify-center text-center">+4</div>
								</li>
							</ul>
						</div>
					</li>
					<li className="py-15 lg:py-11.25">
						<div className="mb-6 flex lg:gap-2 leading-[1.2] font-bold text-[24px] md:text-[26px] flex-col lg:flex-row lg:text-[28px] -tracking-[0.01em] ">
							<h3>Мультимедиа.</h3>
							<div className="text-[#acacac]">То, что стоит рассматривать в первую очередь.</div>
						</div>
						<div className="relative rounded-[20px] bg-white px-5.5 py-10 lg:px-10 shadow-[0_0_24px_0_rgba(0,0,0,0.04)] min-h-150 flex">
							<div className="flex flex-col relative z-10	items-start gap-5 lg:flex-none lg:w-110">
								<div className="-ml-10 hidden lg:block">
									<Image
										src='/images/features-page/catalog/3/decor.png'
										width={359}
										height={133}
										preload
										alt=""
									/>
								</div>
								<div className="text-[17px] -tracking-[0.01em] mt-0 lg:mt-auto lg:flex-auto leading-tight font-helvetica">Плавная регулировка яркости от ночника до рабочего уровня без рывков и мерцания. Мягкое включение и затухание, равномерные переходы, управление с кнопки, панели или голосом.</div>
								<Button className="justify-center py-1.75!">Узнать больше</Button>
								<div className="relative w-full sm:w-84 aspect-336/300 lg:hidden">

									<Image
										src='/images/features-page/catalog/4/decor-mob.png'
										fill
										alt=""
									/>
								</div>
							</div>
							<Image
								src='/images/features-page/catalog/3/bg.png'
								fill
								className="object-cover hidden lg:block"
								alt=""
							/>
						</div>
					</li>
					<li className="py-15 lg:py-11.25">
						<div className="mb-6 flex lg:gap-2 leading-[1.2] font-bold text-[24px] md:text-[26px] flex-col lg:flex-row lg:text-[28px] -tracking-[0.01em] ">
							<h3>Безопасность и защита.</h3>
							<div className="text-[#acacac]">То, что стоит рассматривать в первую очередь.</div>
						</div>
						<div className="relative rounded-[20px] bg-white px-5.5 py-10 lg:px-10 shadow-[0_0_24px_0_rgba(0,0,0,0.04)] min-h-150 flex">
							<div className="flex relative z-10 flex-col items-start gap-5 lg:gap-12 lg:flex-none lg:w-110">
								<div className="-ml-10 lg:mt-6 hidden lg:block">
									<Image
										src='/images/features-page/catalog/4/decor.png'
										width={479}
										height={91}
										preload
										alt=""
									/>
								</div>
								<div className="relative w-full sm:w-84 aspect-314/300">

									<Image
										src='/images/features-page/catalog/5/decor-mob.png'
										fill
										className="lg:hidden"
										alt=""
									/>
								</div>
								<div className="text-[17px] -tracking-[0.01em] lg:flex-auto leading-tight font-helvetica">Плавная регулировка яркости от ночника до рабочего уровня без рывков и мерцания. Мягкое включение и затухание, равномерные переходы, управление с кнопки, панели или голосом.</div>
								<Button className="justify-center py-1.75!">Узнать больше</Button>

							</div>

							<Image
								src='/images/features-page/catalog/4/bg.png'
								fill
								className="object-cover hidden lg:block"
								alt=""
							/>
						</div>
					</li>
					<li className="py-15 lg:py-11.25">
						<div className="mb-6 flex lg:gap-2 leading-[1.2] font-bold text-[24px] md:text-[26px] flex-col lg:flex-row lg:text-[28px] -tracking-[0.01em] ">
							<h3>Электрокарнизы.</h3>
							<div className="text-[#acacac]">То, что стоит рассматривать в первую очередь.</div>
						</div>
						<div className="relative rounded-[20px] bg-white px-5.5 py-10 lg:px-10 shadow-[0_0_24px_0_rgba(0,0,0,0.04)] min-h-150 flex overflow-hidden">
							<div className="flex flex-col items-start gap-5 lg:flex-none lg:w-110 relative z-10">
								<div className="text-[17px] -tracking-[0.01em] flex-auto leading-tight font-helvetica">Плавная регулировка яркости от ночника до рабочего уровня без рывков и мерцания. Мягкое включение и затухание, равномерные переходы, управление с кнопки, панели или голосом.</div>
								<Button className="justify-center py-1.75!">Узнать больше</Button>
							</div>

							<Image
								src='/images/features-page/catalog/5/bg.jpg'
								fill
								className="object-cover"
								alt=""
							/>
						</div>
					</li>
					<li className="py-15 lg:py-11.25">
						<div className="mb-6 flex lg:gap-2 leading-[1.2] font-bold text-[24px] md:text-[26px] flex-col lg:flex-row lg:text-[28px] -tracking-[0.01em] ">
							<h3>Управление розетками.</h3>
							<div className="text-[#acacac]">То, что стоит рассматривать в первую очередь.</div>
						</div>
						<div className="relative overflow-hidden rounded-[20px] bg-white px-5.5 py-10 lg:px-10 shadow-[0_0_24px_0_rgba(0,0,0,0.04)] h-150 lg:flex-row flex-col flex gap-10 justify-between">
							<div className="flex flex-col items-start gap-5 lg:flex-none lg:w-110 relative z-10">
								<div className="-ml-13.5 hidden lg:block">
									<Image
										src='/images/features-page/catalog/6/decor.png'
										width={279}
										height={150}
										preload
										alt=""
									/>
								</div>
								<div className="text-[17px] -tracking-[0.01em] lg:flex-auto leading-tight font-helvetica">Плавная регулировка яркости от ночника до рабочего уровня без рывков и мерцания. Мягкое включение и затухание, равномерные переходы, управление с кнопки, панели или голосом.</div>
								<Button className="justify-center py-1.75!">Узнать больше</Button>
							</div>
							<div className="grid lg:mx-0 -mx-5.5 lg:-my-10 lg:grid-cols-2 gap-2.5 flex-none h-62.75 lg:h-auto lg:w-115.5">
								<div className="grid gap-2 grid-cols-3 lg:block lg:space-y-2.5 lg:-mt-14.75">
									<div className="relative aspect-square">
										<Image
											src="/images/features-page/catalog/6/sockets/1.png"
											fill
											alt=""
										/>
									</div>
									<div className="relative aspect-square">
										<Image
											src="/images/features-page/catalog/6/sockets/2.png"
											fill
											alt=""
										/>
									</div>
									<div className="relative aspect-square">
										<Image
											src="/images/features-page/catalog/6/sockets/3.png"
											fill
											alt=""
										/>
									</div>
								</div>
								<div className="grid gap-2 grid-cols-3 lg:block space-y-2.5 lg:-mt-9">
									<div className="relative aspect-square">
										<Image
											src="/images/features-page/catalog/6/sockets/4.png"
											fill
											alt=""
										/>
									</div>
									<div className="relative aspect-square">
										<Image
											src="/images/features-page/catalog/6/sockets/5.png"
											fill
											alt=""
										/>
									</div>
									<div className="relative aspect-square">
										<Image
											src="/images/features-page/catalog/6/sockets/6.png"
											fill
											alt=""
										/>
									</div>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</section>
	);
}