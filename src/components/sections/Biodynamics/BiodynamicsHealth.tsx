import { Title } from "@/components/UI/Title";
import Image from "next/image";

export default function BiodynamicsHealth() {
	return (
		<section className="py-15 md:py-22.5">
			<div className="max-w-308 px-4 mx-auto flex flex-col items-center text-center">
				<Title className="max-sm:text-[32px] max-w-255 mb-10">Управляя светом мы можем регулировать выработку гормона Мелатонина</Title>
				<div className="mb-10 max-w-120.5 font-helvetica text-[15px] -tracking-[0.01em] leading-[1.4]">
					Гормон торможения. Его повышение в организме служит сигналом наступления “Пассивной фазы суток” и необходимости отдыха.
				</div>
				<div className="mb-15 max-md:max-w-62.5">
					<Image
						src="/images/biodynamics-page/health/sun-decor.png"
						width={384}
						height={384}
						alt=""
					/>
				</div>
				<ul className="grid md:grid-cols-3 gap-15 md:gap-20 mb-10">
					<li className="space-y-3 md:space-y-4 flex flex-col items-center ">
						<Image
							src="/images/biodynamics-page/health/icon-1.svg"
							width={42}
							height={42}
							alt=""
						/>
						<h3 className="font-semibold leading-[1.2]">Выше освещенность.</h3>
						<div className="font-helvetica text-[15px] -tracking-[0.01em] leading-[1.4]">Снижается выработка мелатонина.</div>
					</li>
					<li className="space-y-3 md:space-y-4 flex flex-col items-center ">
						<Image
							src="/images/biodynamics-page/health/icon-2.svg"
							width={42}
							height={42}
							alt=""
						/>
						<h3 className="font-semibold leading-[1.2]">Холодный свет</h3>
						<div className="font-helvetica text-[15px] -tracking-[0.01em] leading-[1.4]">Больше синего спектра – снижается выработка мелатонина.</div>
					</li>
					<li className="space-y-3 md:space-y-4 flex flex-col items-center ">
						<Image
							src="/images/biodynamics-page/health/icon-3.svg"
							width={42}
							height={42}
							alt=""
						/>
						<h3 className="font-semibold leading-[1.2]">Теплый свет</h3>
						<div className="font-helvetica text-[15px] -tracking-[0.01em] leading-[1.4]">Вырабатывается мелатонин</div>
					</li>
				</ul>
				<ul className="rounded-[20px] bg-white py-10 px-4 md:px-10 lg:px-30 grid md:grid-cols-2 gap-15 md:gap-30">
					<li className="-tracking-[0.01em] flex flex-col items-center text-center gap-4">
						<Image
							src="/images/biodynamics-page/health/icon-4.svg"
							width={64}
							height={64}
							alt=""
						/>
						<h3 className="font-semibold text-[17px] leading-[1.4]">Кортизол</h3>
						<div className="font-helvetica text-[15px] leading-[1.2]">Гормон пробуждения, его выработка зависит от эмоций</div>
					</li>
					<li className="-tracking-[0.01em] flex flex-col items-center text-center gap-4">
						<Image
							src="/images/biodynamics-page/health/icon-5.svg"
							width={64}
							height={64}
							alt=""
						/>
						<h3 className="font-semibold text-[17px] leading-[1.4]">Мелатонин</h3>
						<div className="font-helvetica text-[15px] leading-[1.2]">Гормон торможения. Его повышение в организме служит сигналом наступления “Пассивной фазы суток” и необходимости отдыха.</div>
					</li>
				</ul>
			</div>
		</section>
	)
}