"use client"

import Image from "next/image"
import { ReactNode, useEffect, useRef } from "react"
import gsap from "gsap"
import { Title } from "../UI/Title"
import { LeadModalTrigger } from "../modals/LeadModalTrigger"

type Props = {
	title: ReactNode
	image: string
	className?: string
	withRadialReveal?: boolean
}

export default function SolutionsHero({
	title,
	image,
	className,
	withRadialReveal
}: Props) {
	const overlayRef = useRef<HTMLDivElement | null>(null)
	const imageRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!withRadialReveal || !overlayRef.current) return

		const overlay = overlayRef.current

		const state = {
			innerSize: 6,
			outerSize: 18
		}

		const applyMask = () => {
			const gradient = `radial-gradient(circle at center, rgba(244,244,244,0) ${state.innerSize}%, rgba(244,244,244,1) ${state.outerSize}%)`

			overlay.style.maskImage = gradient
			overlay.style.webkitMaskImage = gradient
		}

		applyMask()

		const tl = gsap.timeline()

		tl.to(state, {
			innerSize: 140,
			outerSize: 160,
			duration: 2.4,
			ease: "power2.out",
			onUpdate: applyMask
		})

		if (imageRef.current) {
			tl.fromTo(
				imageRef.current,
				{
					scale: 1.08,
					opacity: 0.9
				},
				{
					scale: 1,
					opacity: 1,
					duration: 2.4,
					ease: "power2.out"
				},
				0
			)
		}

		tl.to(
			overlay,
			{
				opacity: 0,
				duration: 0.4,
				ease: "power1.out"
			},
			"-=0.2"
		)

		return () => {
			tl.kill()
		}
	}, [withRadialReveal])

	return (
		<>
			<section className={`lg:min-h-195 min-h-198 -mt-13.5 py-18 md:pt-22 lg:py-25 relative flex items-end overflow-hidden ${className || ""}`}>
				<div ref={imageRef} className="absolute inset-0">
					<Image
						fill
						className="object-cover"
						alt=""
						src={image}
						priority
					/>
				</div>

				{withRadialReveal && (
					<div
						ref={overlayRef}
						className="absolute inset-0 pointer-events-none"
						style={{
							background: "#F4F4F4",
							maskImage: "radial-gradient(circle at center, rgba(244,244,244,0) 18%, rgba(244,244,244,1) 42%)",
							WebkitMaskImage: "radial-gradient(circle at center, rgba(244,244,244,0) 18%, rgba(244,244,244,1) 42%)"
						}}
					/>
				)}

				<div className="absolute left-0 w-full bottom-0 h-[40%] bg-linear-to-b from-[#F4F4F4]/0 to-[#F4F4F4]" />

				<div className="max-w-308 px-4 mx-auto max-md:flex-col relative flex items-start md:items-end justify-between gap-6 lg:gap-10 w-full">
					<Title>{title}</Title>

					<LeadModalTrigger formType="hero" buttonClassName="justify-center py-1.75!">
						Оставить заявку
					</LeadModalTrigger>
				</div>
			</section>
		</>
	)
}
