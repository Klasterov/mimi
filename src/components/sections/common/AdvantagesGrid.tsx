"use client"

import Image from "next/image"
import { Title } from "@/components/UI/Title"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type AdvantageItem = {
	type?: string
	image?: string
	cap: string
	descr: string
	theme: string
	imageClasses?: string
	notificationImage?: string
	notificationImageWidth?: number
	notificationImageHeight?: number
}

type Props = {
	title: string
	items: AdvantageItem[]
}

export default function AdvantagesGrid({ title, items }: Props) {
	const getItemWidth = (index: number) => {
		let lgWidth = 'lg:w-[32%]'

		if (items.length === 4) {
			if (index === 1) lgWidth = 'lg:w-[42.75%]'
			if (index === 2) lgWidth = 'lg:ml-auto lg:w-[44.8%] z-10'
			if (index === 3) lgWidth = 'lg:w-[32.1%]'
		} else if (items.length === 5) {
			if (index === 0) lgWidth = 'lg:w-[32%]'
			if (index === 1) lgWidth = 'lg:w-[42.75%]'
			if (index === 2) lgWidth = 'lg:ml-auto lg:w-[22%] lg:z-10'
			if (index === 3) lgWidth = 'lg:w-[22%]'
			if (index === 4) lgWidth = 'lg:w-[32%]'
		}

		return lgWidth
	}

	const renderDefaultItem = (item: AdvantageItem, index: number) => {
		const lgWidth = getItemWidth(index)

		return (
			<li
				key={index}
				className={`tracking-[-0.01em] p-6 min-h-65 rounded-[20px] overflow-hidden relative bg-[#d8d8d8] ${lgWidth}`}
			>
				{item.image && (
					<Image
						src={item.image}
						quality={95}
						alt=""
						fill
						className={`object-cover ${item.imageClasses || ""}`}
					/>
				)}
				<h3 className={`relative mb-1 font-medium text-[16px] ${item.theme === 'light' ? 'text-white' : ''}`}>
					{item.cap}
				</h3>
				<p className={`relative font-helvetica text-[15px] ${item.theme === 'light' ? 'text-[#95979e]' : 'text-brand-gray'}`}>
					{item.descr}
				</p>
			</li>
		)
	}

	const renderNotificationAnimItem = (item: AdvantageItem, index: number) => {
		const lgWidth = getItemWidth(index)

		return (
			<NotificationAnimCard
				key={index}
				item={item}
				lgWidth={lgWidth}
			/>
		)
	}

	const renderItem = (item: AdvantageItem, index: number) => {
		if (item.type === 'notification-anim') {
			return renderNotificationAnimItem(item, index)
		}

		return renderDefaultItem(item, index)
	}

	return (
		<section className="pt-30 pb-22.5">
			<div className="max-w-308 mx-auto px-4">
				<Title className="mb-4 md:mb-10 lg:max-w-200">{title}</Title>

				<ul className="grid sm:grid-cols-2 lg:flex gap-4 sm:gap-5 flex-wrap relative">
					{items.slice(0, 2).map((item, index) => renderItem(item, index))}

					<li className="hidden xl:block lg:w-[21.75%] min-h-65 relative">
						<Image src="/images/advantages/decor-1.svg" alt="" fill className="object-cover" />
					</li>

					{items.slice(2).map((item, index) => renderItem(item, index + 2))}

					<li className="aspect-285/327 absolute w-[23.8%] hidden lg:block -left-7.5 top-65">
						<Image
							src="/images/advantages/decor-2.png"
							quality={95}
							alt="background"
							fill
							className="object-cover"
						/>
					</li>
					<li className="aspect-390/314 lg:hidden relative -mx-4 -mt-4">
						<Image
							src="/images/advantages/decor-3.png"
							quality={95}
							alt="background"
							fill
							className="object-cover"
						/>
					</li>
				</ul>
			</div>
		</section>
	)
}

type NotificationAnimCardProps = {
	item: AdvantageItem
	lgWidth: string
}

function NotificationAnimCard({ item, lgWidth }: NotificationAnimCardProps) {
	const cardRef = useRef<HTMLLIElement | null>(null)
	const notificationRef = useRef<HTMLDivElement | null>(null)
	useEffect(() => {
		if (!cardRef.current || !notificationRef.current) return

		const ctx = gsap.context(() => {
			gsap.fromTo(
				notificationRef.current,
				{
					y: 60,
					opacity: 0,
					rotate: -8,
					transformOrigin: "left bottom",
				},
				{
					y: 0,
					opacity: 1,
					rotate: 0,
					duration: 0.8,
					ease: "back.out(1.7)", // вот тут пружинка
					scrollTrigger: {
						trigger: cardRef.current,
						start: "top 80%",
						toggleActions: "play none none none",
					},
				}
			)
		}, cardRef)

		return () => ctx.revert()
	}, [])

	return (
		<li
			ref={cardRef}
			className={`tracking-[-0.01em] p-6 min-h-65 rounded-[20px] overflow-hidden relative bg-linear-to-b from-[#0f1015] to-[#343434] ${lgWidth}`}
		>
			{item.image && (
				<Image
					src={item.image}
					quality={95}
					alt=""
					fill
					className={`object-cover ${item.imageClasses || ""}`}
				/>
			)}
			<div
				ref={notificationRef}
				className={`absolute min-w-83 flex justify-center bottom-[18.5%] left-1/2 -translate-x-1/2`}
			>
				<Image
					src={item.notificationImage || '/images/fire-page/advantages/notification-decor.png'}
					width={item.notificationImageWidth ?? 332}
					height={item.notificationImageHeight ?? 67}
					alt="decor"
					quality={95}
				/>
			</div>

			<h3 className={`relative mb-1 font-medium text-[16px] ${item.theme === 'light' ? 'text-white' : ''}`}>
				{item.cap}
			</h3>
			<p className={`relative font-helvetica text-[15px] ${item.theme === 'light' ? 'text-[#95979e]' : 'text-brand-gray'}`}>
				{item.descr}
			</p>
		</li>
	)
}