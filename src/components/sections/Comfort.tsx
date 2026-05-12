'use client'

import Image from "next/image";
import { Title } from "../UI/Title";
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '@/context/ThemeContext'
import { Tabs } from "@/data/comfort";
import { TabKey } from "@/types/comfort";

gsap.registerPlugin(ScrollTrigger)


function TabsCard() {
	const [activeTab, setActiveTab] = useState<TabKey>('morning')
	const blobsRef = useRef<HTMLDivElement | null>(null)
	const listRef = useRef<HTMLUListElement | null>(null)
	const iconRef = useRef<HTMLImageElement | null>(null)

	useEffect(() => {
		if (!listRef.current || !iconRef.current) return

		gsap.killTweensOf([listRef.current, iconRef.current])

		const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

		tl.to(iconRef.current, {
			scale: 0.7,
			opacity: 0,
			duration: 0.15,
		})

		tl.to(
			listRef.current,
			{
				y: 15,
				opacity: 0,
				duration: 0.15,
			},
			'<'
		)

		tl.set([iconRef.current, listRef.current], {
			clearProps: 'all',
		})

		tl.fromTo(
			iconRef.current,
			{ scale: 0.7, opacity: 0 },
			{ scale: 1, opacity: 1, duration: 0.25 }
		)

		tl.fromTo(
			listRef.current,
			{ y: 15, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.3 },
			'<'
		)
	}, [activeTab])

	useEffect(() => {
		if (!blobsRef.current) return

		const blobs = gsap.utils.toArray<HTMLElement>(
			blobsRef.current.querySelectorAll('.blob')
		)

		const tl = gsap.timeline({
			repeat: -1,
			yoyo: true,
			defaults: {
				ease: 'sine.inOut',
			},
		})

		blobs.forEach((blob, i) => {
			tl.to(
				blob,
				{
					x: gsap.utils.random(-120, 120),
					y: gsap.utils.random(-80, 80),
					scale: gsap.utils.random(0.85, 1.15),
					rotation: gsap.utils.random(-20, 20),
					duration: gsap.utils.random(6, 10),
				},
				i * 0.2 // 🔥 фаза — каждый блоб живёт своей жизнью
			)
		})

		const trigger = ScrollTrigger.create({
			trigger: blobsRef.current,
			start: 'top 90%',
			end: 'bottom 10%',
			onEnter: () => tl.play(),
			onLeave: () => tl.pause(),
			onEnterBack: () => tl.play(),
			onLeaveBack: () => tl.pause(),
		})

		return () => {
			tl.kill()
			trigger.kill()
		}
	}, [])


	return (
		<div className="relative overflow-hidden lg:min-h-105 rounded-[20px] bg-[#121212] px-5 lg:px-8 pt-6 lg:pt-7 min-h-106 flex flex-col">
			<div ref={blobsRef} className="absolute inset-0 overflow-hidden">
				<div className="blob blob-1" />
				<div className="blob blob-2" />
				<div className="blob blob-3" />
				<div className="blob blob-4" />
			</div>
			<Image
				src="/images/comfort/bg-2.svg"
				alt="bg"
				fill
				className="object-cover"
			/>
			<div className="relative flex justify-between items-start mb-10 md:mb-4.5 gap-3">
				<div className="flex flex-col items-start space-y-3">
					{Object.entries(Tabs).map(([key, tab]) => (
						<button
							key={key}
							onClick={() => setActiveTab(key as TabKey)}
							className={`font-semibold text-[16px] leading-tight tracking-[-0.01em] transition cursor-pointer
			${activeTab === key
									? 'text-[#d1d1d1]'
									: 'text-[#d1d1d1] opacity-30 hover:opacity-60'}
		`}
						>
							{tab.title}
						</button>
					))}

				</div>



				<div className="flex items-center -mt-5 -mr-5 lg:-mt-6.25 lg:-mr-6.25 justify-center relative w-30 lg:w-37.5 aspect-square">
					<Image
						ref={iconRef}
						src={Tabs[activeTab].icon}
						alt={Tabs[activeTab].title}
						width={150}
						height={150}
						quality={95}
					/>

				</div>
			</div>
			<div
				key={activeTab}
				className="flex-auto flex flex-col"
			>
				<ul
					ref={listRef}
					className="relative bg-linear-to-b max-w-88 from-[#27272b] flex-auto to-[#101011] shadow-[inset_-4px_4px_3px_0_rgba(0,0,0,0.25)] rounded-t-xl py-5 px-4 font-helvetica leading-tight text-[14px] tracking-[-0.01em] text-[#f6f9ff] space-y-5 md:space-y-4"
				>

					{Tabs[activeTab].items.map((text, i) => (
						<li key={i} className="flex items-center gap-3">
							<Image
								src="/images/icons/comfort-check.svg"
								alt="check"
								width={24}
								height={24}
								className="basis-6"
							/>
							<span>{text}</span>
						</li>
					))}
				</ul>
			</div>
			<div className="absolute -bottom-[4%] left-0 w-full h-[34%] bg-[linear-gradient(180deg,rgba(37,37,41,0)_0%,#252529_82.91%)] pointer-events-none"></div>
		</div >
	)
}

export default function Comfort() {

	const { enabled } = useTheme()
	const titleRef = useRef<HTMLHeadingElement | null>(null)

	useEffect(() => {
		if (!titleRef.current) return

		gsap.to(titleRef.current, {
			color: '#8f8f90',
			scrollTrigger: {
				trigger: titleRef.current,
				start: 'top 75%',
				end: 'bottom 25%',
				scrub: true, // привязка к скроллу
			},
		})
	}, [])



	return (
		<section className={`py-22.5 lg:pb-22.5 lg:pt-30 transition-colors duration-400 ${enabled && 'bg-foreground'}`}>
			<div className="max-w-308 mx-auto px-4">
				<Title className={`mb-2 transition-colors duration-400 ${enabled && 'text-white'}`}>Комфорт в каждом движении</Title>
				<p className={`lg:max-w-120 font-helvetica text-[17px] tracking-[-0.01em] transition-colors duration-400 ${enabled ? 'text-[#d9dadc]' : 'text-[#303236]'} leading-tight mb-10`}>Интеллектуальная система заботится о вашем доме: <br />
					от освещения до климата — всегда под вашим контролем.</p>
				<div className="grid md:grid-cols-2 gap-20 md:gap-5">

					<div className="overflow-hidden relative rounded-[20px] bg-[#d8d8d8] p-5 md:p-7 lg:p-8 min-h-111.5 lg:min-h-auto">
						<Image
							src="/images/comfort/bg-1.png"
							alt="bg"
							fill
							className="object-cover"
						/>


						<h2
							ref={titleRef}
							className="text-[#a8a8a9] relative mb-3 lg:mb-6 text-[32px] md:text-[36px] lg:text-[44px] font-bold tracking-[-0.05em] hidden"
						>
							Управляйте климатом, освещением, шторами и&nbsp;другим:
						</h2>
						<div className="mb-6">
							<Image
								src="/images/comfort/title.png"
								quality={95}
								alt="Колонки Алиса"
								// fill
								width={504}
								height={132}
								className="max-w-full"
							/>
						</div>
						<p className="relative font-helvetica text-[15px] leading-snug text-[#a8a8a9] tracking-[-0.01em] max-w-58">
							с помощью голоса, смартфона, привычных выключателей или полностью автоматической системы.
						</p>
						<div className="absolute bottom-0 right-0 w-[72%] aspect-square pointer-events-none">
							<Image
								src="/images/comfort/1.png"
								alt="Колонки Алиса"
								fill
							/>
						</div>
					</div>

					<div className="lg:pt-17">
						<div className="tracking-[-0.01em] mb-6 lg:px-8">
							<h3 className={`text-[24px] lg:max-w-[85%] md:text-[28px] font-bold mb-2.5 leading-tight transition-colors duration-400 ${enabled && 'text-white'}`}>
								Создавайте сценарии крайне просто, справится даже ребенок.
							</h3>
							<p className={`font-helvetica text-[15px] transition-colors duration-400 ${enabled ? 'text-[#d9dadc]' : 'text-[#303236]'} leading-snug`}>
								Прямо с телефона, буквально за 20 секунд.
							</p>
						</div>

						<TabsCard />
					</div>

				</div>
			</div>
		</section>
	);
};