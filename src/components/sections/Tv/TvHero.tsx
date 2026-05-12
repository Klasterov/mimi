import { Button } from "@/components/UI/Button";
import { Title } from "@/components/UI/Title";
import Image from "next/image";

export default function TvHero() {
	return (
		<section className="pt-22.5 lg:pt-17 pb-15 lg:pb-22.5 overflow-hidden">
			<div className="max-w-308 px-4 mx-auto text-center flex flex-col items-center">
				<Title className="mb-6">Короткий слоган</Title>
				<Button className="justify-center py-1.75! mb-5 lg:mb-15">Подобрать диагональ</Button>
				<div className="relative w-200 sm:w-300 aspect-1200/580">

					<Image
						fill
						src="/images/tv-page/hero/decor.png"
						alt=""
						quality={95}
					/>
				</div>
				<div className="relative -mt-20 sm:-mt-28.5 font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em] max-w-135.5">
					Музыка — одна из важнейших составляющих настроения, и порой так хочется, чтобы ей сопровождалось каждое действие.
				</div>
			</div>
		</section>
	);
}