import Image from "next/image";
import { Title } from "../UI/Title";

export default function PricingHero() {
	return (
		<section className="lg:min-h-87 py-12.5 bg-foreground relative">
			<div className="max-w-308 px-4 mx-auto">
				<div>
					<Title className="text-white mb-2">Узнайте стоимость <br />Умного Дома</Title>
					<div className="md:max-w-75 font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em] text-brand-gray">Наш менеджер свяжется с вами и предоставит подробную смету.</div>
				</div>
				<div className="max-lg:hidden absolute aspect-667/351 lg:w-[46.3%] xl:w-166.75 bottom-0 right-0">
					<Image
						src="/images/pricing-page/hero-decor.png"
						fill
						alt=""
					/>
				</div>
			</div>
		</section>
	)
}