import { RightArrowIcon } from "@/icons/RightArrowIcon"
import Image from "next/image"

export default function EquipmentCatalog() {
	return (
		<section className="pt-22.5 lg:pt-27.5 bg-white">
			<div className="max-w-236 mx-auto px-4 -tracking-[0.01em]">
				<div className="mb-10 md:mb-20 lg:mb-34">
					<div className="font-bold text-[18px] md:text-[24px] lg:text-[32px] leading-tight">Каталог</div>
					<h2 className="mb-6 tracking-0 font-bold text-[64px] md:text-[100px] lg:text-[140px] xl:text-[220px] bg-[linear-gradient(180deg,#0b0d10_0%,#c2c2c2_100%)] bg-clip-text text-transparent leading-tight flex flex-col">
						Каталог
						<span className="lg:-mt-10 text-[40px] md:text-[60px] lg:text-[80px] xl:text-[100px]">умного дома.</span>
					</h2>
					<div className="text-[17px] leading-tight max-w-143 font-helvetica">Система децентрализована, не имеет "центрального мозга", что позволяет поднять надежность системы на новый уровень.</div>
				</div>
				<div className="flex xl:pr-7 lg:items-center lg:flex-row flex-col-reverse gap-15 lg:gap-23">
					<div className="relative flex-none sm:w-88.25 aspect-353/478">
						<Image
							src="/images/equipment-page/catalog/main.png"
							fill
							alt=""
						/>
						<div className="absolute bottom-0 left-0 w-full h-[33%] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,#fff_100%)]"></div>
					</div>
					<div>
						<p className="mb-4 text-[17px] leading-tight font-helvetica">Оборудование MiMiSmart подключается к большому числу пользователей и поддерживает более 200 модулей расширения для передачи сигналов. Устройства обладают большим запасом памяти и высокой производительностью для решения ряда специфических задач.</p>
						<a href="#" className="font-helvetica inline-flex items-center gap-1 text-[15px] font-medium text-brand-blue group">
							Узнать больше про каталог
							<RightArrowIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"></RightArrowIcon>
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}
