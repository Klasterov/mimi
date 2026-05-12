import { Title } from "@/components/UI/Title";
import Image from "next/image";

export default function CinemaHomeHero() {
	return (
		<section className="max-lg:pb-30 max-lg:pt-13.5 lg:py-20 max-md:overflow-hidden">
			<div className="max-w-308 px-4 mx-auto flex flex-col text-center items-center">
				<div className="relative mb-10 max-md:-mx-10">
					<Image
						width={686}
						height={399}
						alt=""
						src="/images/cinema-home-page/hero-tv.png"
						quality={95}
					/>
					<div className="absolute w-[84.7%] aspect-581/327 top-[0.75%] left-[7.58%]">
						<Image
							fill
							alt=""
							src="/images/cinema-home-page/hero-placeholder.jpg"
							quality={95}
							className="object-cover"
						/>
					</div>

				</div>
				<Image
					width={144}
					height={29}
					alt=""
					src="/images/cinema-home-page/hero-decor.svg"
					className="mb-4 lg:mb-2"
				/>
				<Title className="mb-6">Домашний кинотеатр</Title>
				<div className="text-[17px] leading-[1.3] -tracking-[0.01em] max-w-135.5 font-helvetica">
					Эффект полного погружения, который возникает благодаря продуманной схеме расположения экрана и акустических колонок, а также возможностей самой аппаратуры.
				</div>
			</div>
		</section>
	)
}