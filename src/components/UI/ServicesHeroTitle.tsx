"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"

interface TitleProps {
	children: React.ReactNode
	className?: string
}

export const Title = ({ children }: TitleProps) => {
	const bulbRef = useRef<HTMLImageElement>(null)
	const titleRef = useRef<HTMLHeadingElement>(null)

	useEffect(() => {
		if (!bulbRef.current || !titleRef.current) return

		// выключенное состояние
		gsap.set(bulbRef.current, {
			opacity: 0.4,
			filter: "brightness(0.7)",
			boxShadow: "none",
		})

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					// ВКЛ
					gsap.to(bulbRef.current, {
						opacity: 1,
						delay: 0.4,
						filter: "brightness(1)",
						boxShadow:
							"0 1px 12px 0 #ffc599, 2px 2px 3px 0 rgba(0,0,0,0.26)",
						duration: 0.6,
						ease: "power2.out",
					})
				} else {
					// ВЫКЛ
					gsap.to(bulbRef.current, {
						opacity: 0.4,
						filter: "brightness(0.7)",
						boxShadow: "none",
						duration: 0.6,
						ease: "power2.inOut",
					})
				}
			},
			{ threshold: 0.5 }
		)

		observer.observe(titleRef.current)
		return () => observer.disconnect()
	}, [])

	return (
		<h1
			ref={titleRef}
			className={`-mx-1 bg-linear-to-r mb-2.5 lg:mb-0 from-brand-blue to-foreground bg-clip-text text-transparent text-[50px] sm:text-[65px] md:text-[90px] lg:text-[120px] font-medium leading-[1.2]`}
		>
			{children}

			<span className="whitespace-nowrap">
				{" "}
				<Image
					ref={bulbRef}
					src="/images/icons/title-decor.svg"
					alt="Title decor"
					width={11}
					height={11}
					className="inline-block align-baseline rounded-full"
				/>
			</span>
		</h1>
	)
}
