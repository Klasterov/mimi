'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Title } from '../UI/Title';
import { RightArrowIcon } from '@/icons/RightArrowIcon';
import gsap from 'gsap';
import Link from 'next/link';

interface CardProps {
	title: string;
	description: string;
	image: string;
	imgWidth: number;
	glowColor: string;
	link: string;
	mousePos: { x: number; y: number }; // Получаем координаты извне
}

const SolutionCard = ({ title, description, image, imgWidth, glowColor, mousePos, link }: CardProps) => {
	const cardRef = useRef<HTMLLIElement>(null);
	const glowRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Предотвращаем прыжок анимации при инициализации, если мышь еще не двигалась
		if (mousePos.x === 0 && mousePos.y === 0) return;
		if (!cardRef.current || !glowRef.current) return;

		const rect = cardRef.current.getBoundingClientRect();

		// 1. Вычисляем положение мыши относительно центра конкретной карточки
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		// 2. Нормализуем координаты. Коэффициент 1.5 позволяет градиенту 
		// реагировать на мышь, даже когда она еще не дошла до самой карточки.
		let relX = (mousePos.x - centerX) / (rect.width / 2);
		let relY = (mousePos.y - centerY) / (rect.height / 2);

		relX = Math.max(-1.5, Math.min(1.5, relX));
		relY = Math.max(-1.5, Math.min(1.5, relY));

		const glowW = rect.width * 0.7;
		const glowH = rect.height * 0.7;

		// 3. Рассчитываем допустимый диапазон перемещения (чтобы не вылезало за края)
		const moveRangeX = rect.width - glowW;
		const moveRangeY = rect.height - glowH;

		// Позиция X и Y с ограничением внутри контейнера
		const targetX = gsap.utils.clamp(0, moveRangeX, (moveRangeX / 2) + (relX * (moveRangeX / 2)));
		const targetY = gsap.utils.clamp(0, moveRangeY, (moveRangeY / 2) + (relY * (moveRangeY / 2)));

		// 4. Логика Skew (искажения)
		const baseSkew = 8;
		let calculatedSkew = relX * relY * baseSkew;

		// ЖЕСТКИЙ ЛИМИТ: теперь skew никогда не превысит 6 градусов, 
		// даже если мышь в самом углу экрана.
		calculatedSkew = gsap.utils.clamp(-8, 8, calculatedSkew);

		gsap.to(glowRef.current, {
			x: targetX,
			y: targetY,
			width: glowW,
			height: glowH,
			skewX: calculatedSkew,
			skewY: calculatedSkew,
			background: glowColor,
			duration: 1.5,
			ease: "power2.out",
			opacity: 0.8,
			overwrite: "auto"
		});
	}, [mousePos, glowColor]);

	return (
		<li ref={cardRef} className="relative group list-none rounded-xl">
			{/* Добавлен overflow-hidden на li, чтобы края блюра не "мазали" соседние блоки */}
			<div
				ref={glowRef}
				className="absolute pointer-events-none blur-[8px] z-0 rounded-3xl"
				style={{ willChange: 'transform' }}
			>
				{/* Ребенок с большим блюром (мягкий ореол) */}
				<div
					className="absolute -inset-3 rounded-3xl blur-[20px] opacity-70"
					style={{ background: 'inherit' }}
				/>
			</div>

			<div className="relative z-10 bg-foreground border border-[#5A5D64] min-h-76 md:min-h-89 rounded-xl p-8 flex flex-col justify-center items-center text-center backdrop-blur-3xl">
				<div className="mb-4">
					<Image src={image} alt={title} width={imgWidth} height={100} />
				</div>
				<h3 className="tracking-[-0.01em] text-[17px] text-white font-medium mb-4">{title}</h3>
				<p className="mb-4 font-helvetica text-brand-gray text-[15px] tracking-[-0.01em]">
					{description}
				</p>
				<Link href={link} className="inline-flex items-center gap-1 text-[15px] font-medium text-brand-blue group/link">
					Узнать больше
					<RightArrowIcon className="w-5 h-5 group-hover/link:translate-x-1 transition-transform duration-300" />
				</Link>
			</div>
		</li>
	);
};

export default function Solutions() {
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

	const handleGlobalMouseMove = (e: React.MouseEvent) => {
		setMousePos({ x: e.clientX, y: e.clientY });
	};

	return (
		<section
			onMouseMove={handleGlobalMouseMove}
			className="bg-foreground py-30 overflow-hidden relative"
		>
			<div className="dots-pattern" />
			<div className="max-w-308 mx-auto px-4">
				<Title className="text-white mb-20">Комплексные решения</Title>

				<ul className="grid md:grid-cols-2 gap-6 md:gap-5">
					<SolutionCard
						title="Для квартиры"
						image="/images/solutions/1.png"
						imgWidth={100}
						glowColor="#99E1FF"
						description="От проектирования до настройки - создаём умную квартиру..."
						mousePos={mousePos}
						link="/solutions-flat"
					/>
					<SolutionCard
						title="Для дома"
						image="/images/solutions/2.png"
						imgWidth={165}
						glowColor="#FFF599"
						description="От проектирования до настройки - создаём умный дом..."
						mousePos={mousePos}
						link="/solutions-home"
					/>
				</ul>
			</div>
		</section>
	);
}
