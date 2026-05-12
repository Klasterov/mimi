import { Title } from "@/components/UI/Title"
import Image from "next/image"

export default function SocketsHero() {
	return (
		<section className="pt-15 pb-15 md:pb-20 lg:pb-26.25 relative overflow-hidden">

			{/* бегущая строка */}
			<div className="absolute top-1/2 left-0 -translate-y-1/2 w-full overflow-hidden pointer-events-none">
				<div className="flex w-max animate-marquee">
					<div className="flex whitespace-nowrap">
						<span className="mx-8 text-[100px] md:text-[120px] lg:text-[140px] xl:text-[160px] font-bold text-foreground/5">
							MiMiSmart — MiMiSmart —
						</span>
						<span className="mx-8 text-[100px] md:text-[120px] lg:text-[140px] xl:text-[160px] font-bold text-foreground/5">
							MiMiSmart — MiMiSmart —
						</span>
					</div>
				</div>
			</div>

			<div className="max-w-308 px-4 mx-auto flex flex-col items-center text-center relative">
				<Title className="max-md:mb-5">Управление розетками</Title>

				<div className="mb-2 md:-mb-7.5">
					<Image
						src="/images/sockets-page/hero-decor.png"
						width={631}
						height={476}
						alt=""
					/>
				</div>

				<div className="font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em] max-w-144.25">
					Умные розетки позволяют контролировать питание электроприборов и автоматически отключать его при отсутствии дома или в нештатных ситуациях, снижая риски и повышая безопасность.
				</div>
			</div>
		</section>
	)
}