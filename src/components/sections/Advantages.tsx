"use client"

import Image from "next/image";
import { Title } from "../UI/Title";
import { RightArrowIcon } from "@/icons/RightArrowIcon";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// Данные для попапов
const ADVANTAGES_DATA = [
	{
		id: 1,
		title: "Пожизненная гарантия",
		description: "Самая высокая гарантия на рынке в мире и круглосуточная поддержка. Мы настолько уверены в надежности нашего оборудования, что предоставляем уникальную для рынка пожизненную гарантию. Наша служба поддержки работает 24/7, чтобы вы чувствовали себя в безопасности."
	},
	{
		id: 2,
		title: "Произведение искусства",
		description: "Самые миниатюрные и технологичные датчики для автоматизации в мире. Наши датчики — это сочетание минимализма и высоких технологий. Они легко вписываются в любой интерьер, оставаясь практически незаметными, но выполняя сложнейшие задачи."
	},
	{
		id: 3,
		title: "5000+ объектов",
		description: "53 представительства по всему Миру. Огромный опыт реализации проектов по всему миру — от небольших квартир до огромных резиденций. 53 представительства гарантируют сервис в любой точке мира."
	},
	{
		id: 4,
		title: "Децентрализация",
		description: "Высокая надежность при любых авариях. В отличие от систем с центральным сервером, в MiMiSmart каждый узел автономен. Если выйдет из строя один элемент, вся остальная система продолжит работать стабильно."
	},
	{
		id: 5,
		title: "Гибкость",
		description: "Подключаем выключатели и оборудование любых брендов. Вы не привязаны к одному бренду. Мы интегрируем оборудование любых производителей, позволяя вам выбирать лучшее из мира дизайна и технологий."
	},
];

export default function Advantages({ textLink }: { textLink?: string }) {
	const blurRef = useRef<HTMLDivElement | null>(null);
	const [activeId, setActiveId] = useState<number | null>(null);

	// Intersection Observer для анимации блюра
	useEffect(() => {
		if (!blurRef.current) return;
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						blurRef.current?.classList.add('active');
					} else {
						blurRef.current?.classList.remove('active');
					}
				});
			},
			{ threshold: 0.1 }
		);
		observer.observe(blurRef.current);
		return () => observer.disconnect();
	}, []);

	// Блокировка скролла при открытом попапе
	useEffect(() => {
		if (activeId !== null) {
			const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
			document.body.style.overflow = 'hidden';
			if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
		} else {
			document.body.style.overflow = '';
			document.body.style.paddingRight = '0';
		}
	}, [activeId]);

	const activeAdvantage = ADVANTAGES_DATA.find(item => item.id === activeId);

	return (
		<section className="pt-30 pb-22.5 relative">
			<div className="max-w-308 mx-auto px-4">
				<Title className="mb-10">Преимущества умного <br /> дома MiMiSmart</Title>

				<Link href="/about" className="mb-10 inline-flex hover:text-foreground transition-colors duration-300 items-center gap-1 text-[15px] font-medium text-brand-blue group">
					{textLink ? textLink : 'Узнать больше'}
					<RightArrowIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
				</Link>

				<ul className="grid sm:grid-cols-2 lg:flex gap-4 sm:gap-5 flex-wrap relative">
					{/* Карточка 1 */}
					<li className="shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_rgba(0,0,0,0.06)] lg:z-10 tracking-[-0.01em] lg:w-[32%] p-6 min-h-65 rounded-[20px] bg-[#d8d8d8] overflow-hidden relative">
						<Image src="/images/advantages/1.jpg" quality={95} alt="background" fill className="object-cover" />
						<span className="absolute bottom-3 left-4 leading-tight font-bold text-[64px] text-black">Навсегда</span>
						<div className="blur-anim" ref={blurRef}>
							{[...Array(10)].map((_, i) => <div key={i}></div>)}
						</div>
						<h3 className="relative mb-1 font-medium text-[16px]">Пожизненная гарантия.</h3>
						<p className="relative font-helvetica text-[15px] text-brand-gray">Самая высокая гарантия на рынке в мире и круглосуточная поддержка.</p>
						<PlusButton onClick={() => setActiveId(1)} />
					</li>

					{/* Карточка 2 */}
					<li className="lg:w-[42.75%] tracking-[-0.01em] p-6 min-h-65 rounded-[20px] bg-[#0f1015] overflow-hidden relative">
						<Image src="/images/advantages/2.jpg" quality={95} alt="background" fill className="object-cover" />
						<h3 className="relative mb-1 font-medium text-white text-[16px]">Произведение искусства.</h3>
						<p className="relative font-helvetica text-[15px] text-brand-gray">Самые миниатюрные и технологичные датчики для автоматизации в мире.</p>
						<PlusButton onClick={() => setActiveId(2)} />
					</li>

					{/* Декор */}
					<li className="hidden xl:block lg:w-[21.75%] min-h-65 relative">
						<Image src="/images/advantages/decor-1.svg" alt="background" fill className="object-cover" />
					</li>

					{/* Карточка 3 */}
					<li className="lg:ml-auto lg:w-[22%] lg:z-10 tracking-[-0.01em] p-6 min-h-65 rounded-[20px] bg-[#0f1015] overflow-hidden relative">
						<Image src="/images/advantages/3.png" quality={95} alt="background" fill className="object-cover" />
						<h3 className="relative mb-1 font-medium text-white text-[16px]">5000+ объектов.</h3>
						<p className="relative font-helvetica text-[15px] text-brand-gray">53 представительства по всему Миру.</p>
						<PlusButton onClick={() => setActiveId(3)} />
					</li>

					{/* Карточка 4 */}
					<li className="lg:w-[22%] tracking-[-0.01em] p-6 min-h-65 rounded-[20px] bg-[#d8d8d8] overflow-hidden relative">
						<Image src="/images/advantages/4.jpg" quality={95} alt="background" fill className="object-cover" />
						<h3 className="relative mb-1 font-medium text-[16px]">Децентрализация.</h3>
						<p className="relative font-helvetica text-[15px] text-brand-gray">Высокая надежность при любых авариях.</p>
						<PlusButton onClick={() => setActiveId(4)} />
					</li>

					{/* Карточка 5 */}
					<li className="relative lg:w-[32%] tracking-[-0.01em] p-6 min-h-65 rounded-[20px] bg-[#d8d8d8] overflow-hidden">
						<Image src="/images/advantages/5.jpg" quality={95} alt="background" fill className="object-cover" />
						<h3 className="relative mb-1 font-medium text-[16px]">Гибкость.</h3>
						<p className="relative font-helvetica text-[15px] text-brand-gray">Подключаем выключатели и оборудование любых брендов.</p>
						<PlusButton onClick={() => setActiveId(5)} />
					</li>

					{/* Декор */}
					<li className="aspect-285/327 absolute w-[23.8%] hidden lg:block -left-7.5 top-65">
						<Image src="/images/advantages/decor-2.png" quality={95} alt="background" fill className="object-cover" />
					</li>
					<li className="aspect-390/314 lg:hidden relative -mx-4 -mt-4">
						<Image src="/images/advantages/decor-3.png" quality={95} alt="background" fill className="object-cover" />
					</li>
				</ul>
			</div>

			{/* MODAL WINDOW */}
			{activeAdvantage && (
				<div
					className="fixed inset-0 z-100 px-4 py-8 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in"
					onClick={() => setActiveId(null)}
				>
					<div
						className="bg-white max-w-150 p-8 md:p-12 w-full rounded-4xl animate-scale-in relative shadow-2xl"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							onClick={() => setActiveId(null)}
							className="absolute top-5 right-5 w-10 h-10 rounded-full bg-background flex items-center justify-center hover:bg-foreground hover:text-white transition-all duration-300"
						>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
								<line x1="18" y1="6" x2="6" y2="18"></line>
								<line x1="6" y1="6" x2="18" y2="18"></line>
							</svg>
						</button>

						<div className="flex flex-col gap-5">
							<div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<circle cx="12" cy="12" r="10"></circle>
									<line x1="12" y1="16" x2="12" y2="12"></line>
									<line x1="12" y1="8" x2="12.01" y2="8"></line>
								</svg>
							</div>
							<h3 className="text-2xl md:text-3xl font-bold text-black">{activeAdvantage.title}</h3>
							<p className="font-helvetica text-[16px] md:text-[17px] leading-relaxed text-brand-gray">
								{activeAdvantage.description}
							</p>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}

// Вспомогательный компонент кнопки
function PlusButton({ onClick }: { onClick: () => void }) {
	return (
		<button
			onClick={onClick}
			className="items-center justify-center flex rounded-full w-8.5 h-8.5 bg-white overflow-hidden absolute right-2.5 bottom-2.5 cursor-pointer transition-colors duration-300 hover:text-white hover:bg-foreground z-10"
		>
			<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M4.58337 11H17.4167" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M11 4.5835V17.4168" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		</button>
	);
}