import Image from "next/image";

export default function ShowroomHero() {
	return (
		<section className="max-lg:-mt-13.75 min-h-198 md:min-h-135 py-15 text-white relative flex items-center max-md:text-center md:items-end">
			<Image
				fill
				alt=""
				src="/images/showroom-page/hero-bg.jpg"
				className="object-cover"
			/>
			<div className="max-w-308 px-4 mx-auto relative w-full max-md:flex flex-col items-center">
				<div className="mb-4 flex items-center gap-4 max-md:text-[15px] lg:text-[18px] font-bold -tracking-[0.01em]">
					<div className="max-md:max-w-6">
						<Image
							src="/images/showroom-page/hero-icon.svg"
							width={32}
							height={32}
							alt=""
						/>
					</div>
					<span>г. Москва, Новоданиловская наб., 6к1</span>
				</div>
				<div className="md:p-6 md:rounded-2xl md:bg-black/10 md:backdrop-blur-xs">
					<h1 className="mb-6 text-[32px] md:text-[44px] lg:text-[64px] font-bold leading-[1.2]">Добро пожаловать в MiMiSmart.</h1>
					<div className="max-md:text-[15px] lg:text-[17px] -tracking-[0.01em]">Здесь вы увидите, как умный дом работает вживую.</div>
				</div>
			</div>
		</section>
	)
}