import Image from "next/image";
import { LeadModalTrigger } from "@/components/modals/LeadModalTrigger";

export default function LightningAdvantages() {
	return (
		<div className="pt-10 md:py-15 lg:py-30">
			<div className="max-w-235.5 mx-auto px-4">
				<ul className="grid md:grid-cols-3 gap-3 lg:gap-5 mb-5">
					<li className="bg-white rounded-[20px] p-6 text-[15px] -tracking-[0.01em]">
						<Image
							src="/images/lightning-page/advantages/1.svg"
							alt=""
							width={42}
							height={42}
							className="mb-4"
						/>
						<div className="mb-4 font-semibold">Способы управления:</div>
						<ul className="font-helvetica">
							<li className="flex items-start"><span className="mr-2">•</span> Голосовое управление</li>
							<li className="flex items-start"><span className="mr-2">•</span> Приложение</li>
							<li className="flex items-start"><span className="mr-2">•</span> Датчики движения</li>
							<li className="flex items-start"><span className="mr-2">•</span> Настенные выключатели</li>
						</ul>
					</li>
					<li className="bg-white rounded-[20px] p-6 text-[15px] -tracking-[0.01em]">
						<Image
							src="/images/lightning-page/advantages/2.svg"
							alt=""
							width={42}
							height={42}
							className="mb-4"
						/>
						<div className="mb-4 font-semibold">Чем сможете управлять:</div>
						<ul className="font-helvetica">
							<li className="flex items-start"><span className="mr-2">•</span>Шторы</li>
							<li className="flex items-start"><span className="mr-2">•</span>Светильники</li>
							<li className="flex items-start"><span className="mr-2">•</span>Наружное освещение</li>
							<li className="flex items-start"><span className="mr-2">•</span>Аварийное освещение</li>
						</ul>
					</li>
					<li className="bg-white rounded-[20px] p-6 text-[15px] -tracking-[0.01em]">
						<Image
							src="/images/lightning-page/advantages/3.svg"
							alt=""
							width={42}
							height={42}
							className="mb-4"
						/>
						<div className="mb-4 font-semibold">Контроль света по:</div>
						<ul className="font-helvetica">
							<li className="flex items-start"><span className="mr-2">•</span>Яркость</li>
							<li className="flex items-start"><span className="mr-2">•</span>Цвет</li>
							<li className="flex items-start"><span className="mr-2">•</span>Плавность включения</li>
						</ul>
					</li>
				</ul>
				<div className="rounded-[20px] p-6 bg-white flex flex-col md:flex-row gap-4 lg:gap-2.5 md:items-center items-start">
					<div className="flex-auto font-helvetica text-[15px] leading-normal -tracking-[0.01em]">
						Отправляйте нам дизайн проект с расстановкой мебели и света – мы предложим варианты, как преобразовать обычное освещение в современную электрику.
					</div>
					<LeadModalTrigger formType="lightning-advantages" buttonClassName="justify-center sm:py-1.75">
						Оставить заявку
					</LeadModalTrigger>
				</div>
			</div>
		</div>
	);
}
