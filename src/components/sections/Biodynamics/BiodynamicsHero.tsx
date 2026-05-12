import { Title } from "@/components/UI/Title";
import Image from "next/image";

export default function BiodynamicsHero() {
	return (
		<section className="relative py-24 min-h-195 flex items-end lg:items-center text-white">
			<Image
				src="/images/biodynamics-page/hero-bg.jpg"
				fill
				className="object-cover"
				alt=""
				quality={95}
			/>
			<div className="max-w-235.5 relative px-4 mx-auto flex flex-col items-center text-center w-full">
				<Title className="mb-6">Биодинамика</Title>
				<div className="max-w-135.5 font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em]">
					Эффект полного погружения, который возникает благодаря продуманной схеме расположения экрана и акустических колонок, а также возможностей самой аппаратуры.
				</div>
			</div>
		</section>
	)
}