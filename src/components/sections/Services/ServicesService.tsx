import { LeadModalTrigger } from "@/components/modals/LeadModalTrigger";
import { Title } from "@/components/UI/Title";
import { RightArrowIcon } from "@/icons/RightArrowIcon";
import Image from "next/image";
import Link from "next/link";

export default function ServicesService() {
	return (
		<section className="pt-22.5 lg:pt-30 pb-22.5 overflow-hidden">
			<div className="max-w-235.5 px-4 mx-auto">
				<div className="mb-10 space-y-6 flex flex-col items-center text-center">
					<Title>Сервис</Title>
					<div className="font-helvetica leading-[1.3] max-w-132 -tracking-[0.01em]">Музыка — одна из важнейших составляющих настроения, и порой так хочется, чтобы ей сопровождалось каждое действие.</div>
					<Link href="/services" className="-tracking-[0.01em] inline-flex hover:text-foreground transition-colors duration-300 items-center gap-1 text-[15px] font-medium text-brand-blue group">
						Узнать больше про сервис
						<RightArrowIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
					</Link>
				</div>
				<div className="flex md:flex-row gap-10 md:gap-0 flex-col md:items-start">
					<div className="md:pt-25.5 md:pb-10">
						<Image
							src="/images/services-page/service/icon.svg"
							width={54}
							height={54}
							alt=""
							className="mb-6"
						/>
						<div className="font-helvetica leading-[1.3] space-y-[1em] -tracking-[0.01em]">
							<p>Важно организовать правильный энергосберегающий климат-контроль. Отопление не должно конкурировать с кондиционированием. Это позволит оптимизировать расходы на электроэнергию.</p>
							<p>Важно организовать правильный энергосберегающий климат-контроль. Отопление не должно конкурировать с кондиционированием. Это позволит оптимизировать расходы на электроэнергию.</p>
						</div>
					</div>
					<div className="aspect-square self-center md:self-end md:-mr-[7.14%] md:flex-none w-100 md:w-[70.65%] relative">
						<Image
							src="/images/services-page/service/man.png"
							fill
							alt=""
						/>
					</div>
				</div>
				<div className="flex px-6 md:px-11 py-6 md:py-15 max-md:flex-col items-center gap-10 rounded-[20px] bg-white shadow-[0_0_170px_0_rgba(0,0,0,0.08)]">
					<Image
						src="/images/services-page/service/decor.png"
						width={242}
						height={213}
						alt=""
					/>
					<div>
						<div className="mb-6 font-semibold leading-[1.4] -tracking-[0.01em]">
							Система работает за счет электропривода, который вмонтирован в карниз.
							Помимо стандартного открытия и закрытия, в системе умный дом есть возможность настройки определенного положения ламелей для пропуска строго определенного количества света.
						</div>
						<LeadModalTrigger formType="services-service" buttonClassName="justify-center py-1.75!">
							Оставить заявку
						</LeadModalTrigger>
					</div>
				</div>
			</div>
		</section>
	);
}
