import { Title } from "@/components/UI/Title"
import { RightArrowIcon } from "@/icons/RightArrowIcon"
import Image from "next/image"

export default function VideoControl() {
	return (
		<section className="py-22.5">
			<div className="max-w-308 mx-auto px-4">
				<div className="mb-6 md:mb-8 lg:mb-10 flex flex-col items-center text-center">
					<Title className="mb-6 lg:block hidden">Видеонаблюдение</Title>
					<Title className="lg:hidden">Видео- наблюдение</Title>
					<div className="text-[17px] lg:block hidden leading-tight font-helvetica -tracking-[0.01em] mb-6 max-w-140">
						Система видеонаблюдения позволяет удобно следить за тем,
						что происходит у вас дома.
					</div>
					<a href="#" className="-tracking-[0.01em] lg:inline-flex hidden font-helvetica items-center gap-1 text-[15px] font-medium text-brand-blue group">
						Узнать больше
						<RightArrowIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"></RightArrowIcon>
					</a>
				</div>
				<Image
					src="/images/security-page/video-control/main.png"
					width={1200}
					height={715}
					quality={95}
					alt=""
					className="mb-6 md:mb-8 lg:mb-0 hidden sm:block"
				/>
				<div className="mb-2 sm:hidden -mx-4 aspect-390/581 relative">
					<Image
						src="/images/security-page/video-control/main-mob.png"
						fill
						quality={95}
						alt=""
					/>
				</div>
				<ul className="grid gap-x-10 gap-y-4 lg:gap-x-5 lg:gap-y-5 lg:grid-cols-4 grid-cols-2">
					<li className="space-y-3 lg:space-y-4 -tracking-[0.01em] text-center flex flex-col items-center">
						<Image
							src="/images/security-page/video-control/1.svg"
							width={42}
							height={42}
							alt=""
						/>
						<div className="font-semibold">Удобный контроль.</div>
						<div className="font-helvetica text-[15px]">Отображение информации с камер в приложении в режиме реального времени.</div>
					</li>
					<li className="space-y-3 lg:space-y-4 -tracking-[0.01em] text-center flex flex-col items-center">
						<Image
							src="/images/security-page/video-control/2.svg"
							width={42}
							height={42}
							alt=""
						/>
						<div className="font-semibold">Комплексное решение.</div>
						<div className="font-helvetica text-[15px]">Интеграция камер с системами контроля доступа, освещением, сигнализацией.</div>
					</li>
					<li className="space-y-3 lg:space-y-4 -tracking-[0.01em] text-center flex flex-col items-center">
						<Image
							src="/images/security-page/video-control/3.svg"
							width={42}
							height={42}
							alt=""
						/>
						<div className="font-semibold">Архив записей.</div>
						<div className="font-helvetica text-[15px]">Все записи хранятся на вашем внутреннем защищенном сервере. Также возможно облачное хранение.</div>
					</li>
					<li className="space-y-3 lg:space-y-4 -tracking-[0.01em] text-center flex flex-col items-center">
						<Image
							src="/images/security-page/video-control/4.svg"
							width={42}
							height={42}
							alt=""
						/>
						<div className="font-semibold">Управление камерами.</div>
						<div className="font-helvetica text-[15px]">Из приложения возможно управлять камерами с поворотным механизмом.</div>
					</li>
				</ul>
			</div>
		</section>
	)
}
