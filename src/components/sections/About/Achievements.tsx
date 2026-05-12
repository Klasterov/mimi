import { Button } from "@/components/UI/Button";
import { MimiLogo } from "@/components/UI/MimiLogo";
import Image from "next/image";

export default function Achievements() {
	return (
		<section className="py-22.5 lg:py-30 relative bg-white">
			<div className="hidden lg:block absolute top-0 right-0 w-129.5 aspect-518/392">
				<Image
					src="/images/achievements/decor.png"
					fill
					alt=""
				/>
			</div>
			<div className="max-w-308 mx-auto px-4">
				<MimiLogo className="mb-7 relative"></MimiLogo>
				<div className="relative max-w-165 font-helvetica leading-[1.4] text-[17px] md:text-[18px] lg:text-[20px] tracking-[-0.01em] mb-10 lg:mb-20">
					Мы в MiMiSmart создаем технологии для того, чтобы каждый человек мог наслаждаться комфортом умного дома, избавляясь от бытовых хлопот и повышая качество жизни.
				</div>
				<div className="lg:hidden">
					<ul className="mb-10">
						<li className="py-3.75 relative">
							<div className="absolute top-0 left-0 w-full border-b border-dashed border-[#d9d9d9] mr-1.5">
								<div className="absolute top-1/2 -right-1.5 -translate-y-1/2 border-t-[5px] border-b-[5px] border-l-[5px] border-t-transparent border-b-transparent border-l-[#d9d9d9]"></div>
							</div>
							<div className="font-bold text-[44px] md:text-[54px] leading-tight">5000+</div>
							<p className="max-w-[70%] font-helvetica tracking-[0.01em] text-[15px]">реализованных проектов по всему миру на начало 2025 года</p>
						</li>
						<li className="py-3.75 pl-32 relative">
							<div className="absolute top-0 left-0 w-full border-b border-dashed border-[#d9d9d9] mr-1.5">
								<div className="absolute top-1/2 -right-1.5 -translate-y-1/2 border-t-[5px] border-b-[5px] border-l-[5px] border-t-transparent border-b-transparent border-l-[#d9d9d9]"></div>
							</div>
							<div className="font-bold text-[44px] md:text-[54px] leading-tight">50+</div>
							<p className="font-helvetica tracking-[0.01em] text-[15px]">филиалов по всему миру</p>
						</li>
						<li className="py-3.75 relative">
							<div className="absolute top-0 left-0 w-full border-b border-dashed border-[#d9d9d9] mr-1.5">
								<div className="absolute top-1/2 -right-1.5 -translate-y-1/2 border-t-[5px] border-b-[5px] border-l-[5px] border-t-transparent border-b-transparent border-l-[#d9d9d9]"></div>
							</div>
							<div className="font-bold text-[44px] md:text-[54px] leading-tight">250+</div>
							<p className="max-w-[80%] font-helvetica tracking-[0.01em] text-[15px]">cпециалистов работают над развитием продукта MimiSmart</p>
						</li>
						<li className="py-3.75 pl-32 relative">
							<div className="absolute top-0 left-0 w-full border-b border-dashed border-[#d9d9d9] mr-1.5">
								<div className="absolute top-1/2 -right-1.5 -translate-y-1/2 border-t-[5px] border-b-[5px] border-l-[5px] border-t-transparent border-b-transparent border-l-[#d9d9d9]"></div>
							</div>
							<div className="font-bold text-[44px] md:text-[54px] leading-tight">400+</div>
							<p className="font-helvetica tracking-[0.01em] text-[15px]">дизайнеров и дилеров рекомендуют систему MimiSmart</p>
						</li>
					</ul>
					<Button className="mb-4 justify-center">Хотите улучшить свой дом?</Button>
					<div className='font-helvetica flex items-center gap-2 text-[15px] text-[#acacac] -tracking-[0.01em] leading-normal mb-10'>
						<span>Мы на связи сейчас</span>
						<span className='w-2 h-2 rounded-full bg-[#27ca40] box-shadow: 0 4px 4px 0 rgba(39, 202, 64, 0.25);'></span>
					</div>
				</div>
				<div className="hidden lg:flex relative">
					<div className="absolute top-0 left-0 w-full border-b border-dashed border-[#d9d9d9] mr-1.5">
						<div className="absolute top-1/2 -right-1.5 -translate-y-1/2 border-t-[5px] border-b-[5px] border-l-[5px] border-t-transparent border-b-transparent border-l-[#d9d9d9]"></div>
					</div>
					<div className="w-96 flex-none pt-5">
						<div className="max-w-[65%] mb-28">
							<div className="font-bold text-[64px] leading-tight">5000+</div>
							<p className="font-helvetica -tracking-[0.01em] leading-snug">реализованных проектов по всему миру на начало 2025 года</p>
						</div>
						<Button className="mb-3.5 justify-between min-w-80 sm:py-1.75 sm:px-6">Хотите улучшить свой дом?</Button>
						<div className='font-helvetica flex pl-6 items-center gap-2 text-[14px] text-[#acacac] -tracking-[0.01em] leading-normal'>
							<span>Мы на связи сейчас</span>
							<span className='w-2 h-2 rounded-full bg-[#27ca40] box-shadow: 0 4px 4px 0 rgba(39, 202, 64, 0.25);'></span>
						</div>
					</div>
					<div className="w-90 flex-none pl-8 pt-5 flex flex-col relative">
						<div className="mt-auto mb-7">
							<div className="font-bold text-[64px] leading-tight">400+</div>
							<p className="font-helvetica -tracking-[0.01em] leading-snug">дизайнеров и дилеров <br /> рекомендуют систему MimiSmart</p>
						</div>

						<div className="absolute top-0 left-0 h-full border-r border-dashed border-[#d9d9d9] mt-1.5">
							<div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[5px] border-l-transparent border-r-transparent border-b-[#d9d9d9] border-t-0"></div>
						</div>
					</div>
					<div className="flex-auto pl-8 pt-5 relative">
						<div className="absolute top-0 left-0 h-full border-r border-dashed border-[#d9d9d9] mt-1.5">
							<div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[5px] border-l-transparent border-r-transparent border-b-[#d9d9d9] border-t-0"></div>
						</div>
						<div className="space-y-14">
							<div>
								<div className="font-bold text-[64px] leading-tight">50+</div>
								<p className="font-helvetica -tracking-[0.01em] leading-snug">филиалов по всему миру</p>
							</div>
							<div>
								<div className="font-bold text-[64px] leading-tight">250+</div>
								<p className="font-helvetica -tracking-[0.01em]">cпециалистов работают над развитием <br /> продукта MimiSmart</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
