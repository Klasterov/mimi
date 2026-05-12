import { Title } from "@/components/UI/Title";
import Image from "next/image";

export default function HeatingHero() {
	return (
		<section className="pt-15 lg:pb-22.5 pb-32.5 relative bg-white">
			<div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-[#d3b291] to-background"></div>
			<div className="max-w-235.5 px-4 mx-auto flex flex-col items-center text-center relative">
				<Image
					src="/images/heating-page/hero.png"
					width={458}
					height={482}
					quality={95}
					alt=""
					className="mb-10"
				/>
				<Title className="mb-10">Короткий слоган</Title>
				<div className="font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em] max-w-140">
					Нехитрая система подъема, позволяющая им подниматься вверх или опускаться вниз с помощью системы шнуров и электропривода..
					Часто популярны на кухне, лоджиях и других местах, где из за особенностей помещения нецелесообразно устанавливать раздвижные шторы.
				</div>
			</div>
		</section>
	);
}