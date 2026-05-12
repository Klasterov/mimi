"use client"

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { BtnArrowIcon } from '@/icons/BtnArrowIcon'

interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	children: React.ReactNode
	className?: string
	href: string
}

export const ButtonLink = ({
	children,
	className = '',
	href,
	onClick,
	...props
}: ButtonLinkProps) => {
	const spotlightRef = useRef<HTMLDivElement>(null)
	const staticGlowRef = useRef<HTMLDivElement>(null)
	const staticGlowLeftRef = useRef<HTMLDivElement>(null)
	const linkRef = useRef<HTMLAnchorElement>(null)

	useEffect(() => {
		gsap.set(spotlightRef.current, {
			left: "100%",
			xPercent: -100,
			x: -2,
			top: "50%",
			yPercent: -50,
			opacity: 0.5
		})

		gsap.set(staticGlowRef.current, {
			right: "-5px",
			top: "50%",
			yPercent: -50,
			opacity: 1
		})

		gsap.set(staticGlowLeftRef.current, {
			left: "-5px",
			top: "50%",
			yPercent: -50,
			opacity: 0.2
		})
	}, [])

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (
			!linkRef.current ||
			!spotlightRef.current ||
			!staticGlowRef.current ||
			!staticGlowLeftRef.current
		) return

		const rect = linkRef.current.getBoundingClientRect()
		const x = e.clientX - rect.left

		gsap.killTweensOf(spotlightRef.current)
		gsap.to(spotlightRef.current, {
			x,
			left: 0,
			xPercent: -50,
			duration: 0.4,
			ease: 'power2.out',
			opacity: 1
		})

		const progressRight = x / rect.width
		const progressLeft = 1 - progressRight

		gsap.to(staticGlowRef.current, {
			opacity: Math.max(0, progressRight),
			duration: 0.3
		})

		gsap.to(staticGlowLeftRef.current, {
			opacity: Math.max(0, progressLeft),
			duration: 0.3
		})
	}

	const handleMouseLeave = () => {
		gsap.to(spotlightRef.current, {
			left: "100%",
			xPercent: -100,
			x: -2,
			duration: 0.6,
			delay: 0.2,
			ease: 'power3.inOut',
			opacity: 0.5
		})

		gsap.to(staticGlowRef.current, {
			opacity: 1,
			duration: 0.6,
			delay: 0.55,
		})

		gsap.to(staticGlowLeftRef.current, {
			opacity: 0,
			duration: 0.6,
			delay: 0.4,
		})
	}

	return (
		<div
			className="relative inline-block"
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		>
			{/* LEFT GLOW */}
			<div
				ref={staticGlowLeftRef}
				className="pointer-events-none absolute"
				style={{
					width: '110px',
					height: '50px',
					background: '#C4F9FC',
					borderRadius: '50px 90% 90% 50px',
					filter: 'blur(6px)',
					opacity: 0,
					zIndex: 0,
				}}
			/>

			{/* RIGHT GLOW */}
			<div
				ref={staticGlowRef}
				className="pointer-events-none absolute"
				style={{
					width: '110px',
					height: '50px',
					background: '#C4F9FC',
					borderRadius: '90% 50px 50px 90%',
					filter: 'blur(6px)',
					zIndex: 0,
					opacity: 1,
				}}
			/>

			<Link
				ref={linkRef}
				href={href}
				onClick={onClick}
				className={`group relative cursor-pointer bg-[#f8f9fa]
					shadow-[inset_-3px_-3px_6px_1px_rgba(255,255,255,0.5),inset_3px_3px_6px_0_#eaeaea,0_4px_6px_-2px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgba(0,0,0,0.1)]
					rounded-[50px] flex px-8 py-3 border border-white
					items-center uppercase gap-1.5 font-semibold text-[13px]
					min-w-62.25 tracking-[-0.02em] text-[#00576b]
					transition-all duration-300 overflow-hidden z-10 ${className}`}
				{...props}
			>
				<div
					ref={spotlightRef}
					className="pointer-events-none absolute"
					style={{
						left: '100%',
						transform: 'translate(-100%, -50%)',
						top: '50%',
						opacity: 0.5,
						width: '80px',
						height: '60px',
						background: 'radial-gradient(circle, #fff 0%, #fff 25%, #78f3fa 100%)',
						borderRadius: '40%',
						filter: 'blur(10px)',
						zIndex: 1,
					}}
				/>

				<span className="relative z-10">{children}</span>
				<BtnArrowIcon className="w-6 h-6 relative z-10 transition-transform duration-300" />
			</Link>
		</div>
	)
}