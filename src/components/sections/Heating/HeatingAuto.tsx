import { Title } from "@/components/UI/Title";
import Image from "next/image";

export default function HeatingAuto() {
	return (
		<section className="pt-22.5 lg:pt-30 pb-22.5">
			<div className="max-w-235.5 px-4 mx-auto flex flex-col items-center text-center">
				<Title className="mb-10">Автоматизация отопления</Title>
				<Image
					src="/images/heating-page/auto.png"
					width={368}
					height={364}
					quality={95}
					alt=""
					className="mb-15"
				/>
				<div className="font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em] max-w-124">
					Сокращаем количество выключателей в среднем в 2 раза. Итого у вас теперь 3-5 выключателей вместо 10.
				</div>
			</div>
		</section>
	);
}