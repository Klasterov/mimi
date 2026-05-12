import Image from "next/image";

export default function VideoControlAbout() {
	return (
		<section className="relative lg:min-h-161.25 py-10 lg:py-15">
			<Image
				fill
				className="max-lg:hidden object-cover"
				alt=""
				src="/images/video-control-page/about/bg.png"
			/>
			<div className="max-w-248 mx-auto px-4 relative -tracking-[0.01em]">
				<h2 className="mb-4 font-bold text-[24px] md:text-[28px] lg:text-[32px]">Система видеонаблюдения в Умном Доме предоставляет широкие возможности контроля над обстановкой не только внутри здания, но и за его пределами. </h2>
				<div className="md:max-w-113.75 text-[17px] leading-[1.3] mb-10 lg:mb-30">Благодаря технологиям, которые предлагает MiMiSmart, вы сможете осуществлять управление камерами, видеодомофоном и другими системами, даже находясь вдали от дома.</div>
				<ul className="flex max-md:flex-col justify-between gap-10 max-md:text-[15px] lg:text-[17px]">
					<li className="max-w-91.5">
						<Image
							width={60}
							height={40}
							src="/images/video-control-page/about/icon-1.svg"
							className="mb-4"
							alt=""
						/>
						<p>
							Просмотр, звонок и открытие двери в одном приложении.
						</p>
					</li>
					<li className="max-w-91.5">
						<Image
							width={40}
							height={40}
							src="/images/video-control-page/about/icon-2.svg"
							className="mb-4"
							alt=""
						/>
						<p>
							Онлайн-видео, снимки и пуш-уведомления о событиях, быстрые действия из уведомления.
						</p>
					</li>
				</ul>
			</div>
		</section>
	);
};
