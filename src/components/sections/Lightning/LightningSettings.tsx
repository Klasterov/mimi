import { Title } from "@/components/UI/Title";
import { RightArrowIcon } from "@/icons/RightArrowIcon";
import Image from "next/image";

export default function LightningSettings() {

	return (
		<section className="py-22.5">
			<div className="max-w-235.5 mx-auto px-4">
				<Title className="bg-[linear-gradient(180deg,#422e0c_0%,#ffc96e_100%)] lg:max-w-215 bg-clip-text text-transparent lg:mb-0 mb-28.75">Вы всегда можете изменить настройки в пару кликов</Title>
				<div className="flex items-center gap-29 lg:flex-row flex-col lg:-mt-13">
					<div className="w-full max-w-67.5 aspect-square mx-auto relative md:max-w-none flex-none lg:w-156 lg:-mr-37 lg:-ml-34">
						<Image
							src="/images/lightning-page/settings/1.png"
							fill
							alt=""
						/>
					</div>
					<div className="text-[17px]  leading-tight -tracking-[0.01em] space-y-3">
						<p className="mb-4 font-helvetica">Плавная регулировка яркости от ночника до рабочего уровня без рывков и мерцания. Мягкое включение и затухание, равномерные переходы, управление с кнопки, панели или голосом.</p>
						<a href="#" className="inline-flex hover:text-foreground transition-colors duration-300 items-center gap-1 text-[15px] font-medium text-brand-blue group">
							Узнать больше про Диммирование
							<RightArrowIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}