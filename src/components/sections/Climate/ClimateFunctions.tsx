import { Title } from "@/components/UI/Title";
import { RightArrowIcon } from "@/icons/RightArrowIcon";
import Image from "next/image";

export default function ClimateFunctions() {
	return (
		<section className="py-22.5 hidden lg:block">
			<div className="max-w-235.5 mx-auto px-4">
				<Title className="text-center mb-10">Основные функции</Title>
				<ul className="grid grid-cols-2 gap-5">
					<li className="px-15 py-9 min-h-150 -leading-[0.01em] bg-white overflow-hidden rounded-[20px] relative">
						<Image
							src="/images/climate-page/functions/1.jpg"
							fill
							className="object-cover"
							alt=""
						/>
						<div className="relative">
							<h3 className="mb-2.5 font-semibold text-[32px] leading-snug">Управление отоплением.</h3>
							<p className="mb-2.5 text-[17px] leading-tight font-helvetica">Управление климатом в Умном Доме также позволяет прогревать комнаты перед вашим возвращением с работы или из путешествия.</p>
							<a href="#" className="inline-flex items-center gap-1 text-[15px] font-medium text-brand-blue group">
								Узнать больше про отопление
								<RightArrowIcon className="w-5 h-5"></RightArrowIcon>
							</a>
						</div>
					</li>
					<li className="flex px-15 py-9 min-h-150 -leading-[0.01em] bg-white overflow-hidden rounded-[20px] relative">
						<Image
							src="/images/climate-page/functions/2.jpg"
							fill
							className="object-cover"
							alt=""
						/>
						<div className="relative mt-auto">
							<h3 className="mb-2.5 font-semibold text-[32px] leading-snug">Контроль влажности.</h3>
							<p className="mb-2.5 text-[17px] leading-tight font-helvetica">Системы подогрева воздуха часто применяются в помещениях с панорамным остеклением.</p>
							<a href="#" className="inline-flex items-center gap-1 text-[15px] font-medium text-brand-blue group">
								Узнать больше про увлажнение
								<RightArrowIcon className="w-5 h-5"></RightArrowIcon>
							</a>
						</div>
					</li>

					<li className="px-15 flex py-9 min-h-150 -leading-[0.01em] bg-white overflow-hidden rounded-[20px] relative">
						<Image
							src="/images/climate-page/functions/3.jpg"
							fill
							className="object-cover"
							alt=""
						/>
						<div className="mt-auto relative">
							<h3 className="mb-2.5 font-semibold text-[32px] leading-snug">Кондиционер.</h3>
							<p className="mb-2.5 text-[17px] leading-tight font-helvetica">Системы подогрева воздуха часто применяются в помещениях с панорамным остеклением.</p>
							<a href="#" className="inline-flex items-center gap-1 text-[15px] font-medium text-brand-blue group">
								Узнать больше про кондиционирование
								<RightArrowIcon className="w-5 h-5"></RightArrowIcon>
							</a>
						</div>
					</li>
					<li className="px-15 py-9 min-h-150 -leading-[0.01em] bg-white overflow-hidden rounded-[20px] relative">
						<Image
							src="/images/climate-page/functions/4.jpg"
							fill
							className="object-cover"
							alt=""
						/>
						<div className="relative">
							<h3 className="mb-2.5 font-semibold text-[32px] leading-snug">Теплый пол.</h3>
							<p className="mb-2.5 text-[17px] leading-tight font-helvetica">Представьте, что вы встаете утром, идете в ванную или на кухню, и вместо холодного кафеля вас встречает теплый пол.</p>
							<a href="#" className="inline-flex items-center gap-1 text-[15px] font-medium text-brand-blue group">
								Узнать больше про теплый пол
								<RightArrowIcon className="w-5 h-5"></RightArrowIcon>
							</a>
						</div>
					</li>
					<li className="col-span-2 gap-5 min-h-125 flex items-center -leading-[0.01em] bg-white overflow-hidden rounded-[20px] relative">
						<div className="pl-15 py-10">
							<h3 className="mb-6 font-semibold text-[32px] leading-snug lg:max-w-87">Управление вентиляцией.</h3>
							<p className="mb-6 text-[17px] leading-tight font-helvetica">Предполагает непрерывный контроль за уровнем углекислого газа в помещениях. При необходимости система вентиляции включается автоматически.</p>
							<a href="#" className="inline-flex items-center gap-1 text-[15px] font-medium text-brand-blue group">
								Узнать больше про вентиляцию
								<RightArrowIcon className="w-5 h-5"></RightArrowIcon>
							</a>
						</div>
						<div className="relative flex-none w-[47%] h-full">
							<Image
								src="/images/climate-page/functions/5.png"
								fill
								className="object-cover"
								alt=""
							/>
						</div>
					</li>
				</ul>
			</div>
		</section>
	);
}