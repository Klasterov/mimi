import Image from "next/image";

export default function CinemaHomeRemote() {
	return (
		<section className="bg-black pt-30 pb-22.5 overflow-hidden">
			<div className="max-w-235.5 px-4 mx-auto flex max-md:flex-col-reverse items-center justify-between gap-10">
				<ul className="max-md:self-stretch space-y-8 lg:space-y-15">
					<li className="font-bold text-[24px] md:text-[32px] lg:text-[40px] -tracking-[0.01em] space-y-2">
						<span className="text-brand-gray md:text-[28px] lg:text-[32px]">1.</span>
						<p className="text-white">Ищите контент</p>
					</li>
					<li className="font-bold text-[24px] md:text-[32px] lg:text-[40px] -tracking-[0.01em] space-y-2">
						<span className="text-brand-gray md:text-[28px] lg:text-[32px]">2.</span>
						<p className="text-white">Меняйте громкость</p>
					</li>
					<li className="font-bold text-[24px] md:text-[32px] lg:text-[40px] -tracking-[0.01em] space-y-2">
						<span className="text-brand-gray md:text-[28px] lg:text-[32px]">3.</span>
						<p className="text-white">Ищите контент</p>
					</li>
					<li className="font-bold text-[24px] md:text-[32px] lg:text-[40px] -tracking-[0.01em] space-y-2">
						<span className="text-brand-gray md:text-[28px] lg:text-[32px]">4.</span>
						<p className="text-white">Ищите контент</p>
					</li>
				</ul>
				<div className="relative">
					<div className="absolute top-[-2%] left-[-6%] w-[160%] aspect-544/811">
						<Image
							fill
							src="/images/cinema-home-page/remote-decor-shadow.png"
							alt=""
						/>
					</div>
					<Image
						width={340}
						height={696}
						alt=""
						src="/images/cinema-home-page/remote-decor.png"
						className="relative"
					/>
				</div>
			</div>
		</section>
	)
}