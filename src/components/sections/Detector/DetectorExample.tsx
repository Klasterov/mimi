'use client'

import { Title } from "@/components/UI/Title"
import { DetectorExampleData } from "@/types/detector"
import Image from "next/image"
import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type Props = {
	example?: DetectorExampleData
}

export default function DetectorExample({ example }: Props) {
	const rootRef = useRef<HTMLDivElement | null>(null)
	const svgRef = useRef<SVGSVGElement | null>(null)
	const lineRef = useRef<SVGLineElement | null>(null)
	const textRef = useRef<SVGTextElement | null>(null)
	const markerStartRef = useRef<SVGGElement | null>(null)
	const markerEndRef = useRef<SVGGElement | null>(null)

	useLayoutEffect(() => {
		if (!example?.ruler) return
		if (!rootRef.current || !svgRef.current || !lineRef.current || !textRef.current || !markerStartRef.current || !markerEndRef.current) return

		const ctx = gsap.context(() => {
			const line = lineRef.current!
			const text = textRef.current!
			const markerStart = markerStartRef.current!
			const markerEnd = markerEndRef.current!
			const svg = svgRef.current!

			const lineLength = line.getTotalLength()

			gsap.set(svg, {
				opacity: 1,
			})

			gsap.set(line, {
				strokeDasharray: lineLength,
				strokeDashoffset: lineLength,
			})

			gsap.set([markerStart, markerEnd], {
				opacity: 0,
				scale: 0.6,
				transformOrigin: '50% 50%',
			})

			gsap.set(text, {
				opacity: 0,
				y: 8,
			})

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: rootRef.current,
					start: 'top 75%',
					once: true,
				},
			})

			tl.to(line, {
				strokeDashoffset: 0,
				duration: 0.9,
				ease: 'power2.out',
			})
				.to(
					[markerStart, markerEnd],
					{
						opacity: 1,
						scale: 1,
						duration: 0.3,
						ease: 'back.out(1.7)',
						stagger: 0.04,
					},
					'-=0.12'
				)
				.to(
					text,
					{
						opacity: 1,
						y: 0,
						duration: 0.35,
						ease: 'power2.out',
					},
					'-=0.1'
				)
		}, rootRef)

		return () => ctx.revert()
	}, [example])

	if (!example) return null

	const imageWidth = example.imageWidth || 390
	const imageHeight = example.imageHeight || 390
	const ruler = example.ruler

	let centerX = 0
	let centerY = 0
	let angle = 0
	let textX = 0
	let textY = 0
	let color = '#0B0D10'
	let strokeWidth = 1.5
	let fontSize = 15
	let x1 = 0
	let y1 = 0
	let x2 = 0
	let y2 = 0

	if (ruler) {
		x1 = ruler.x1
		y1 = ruler.y1
		x2 = ruler.x2
		y2 = ruler.y2

		centerX = (x1 + x2) / 2
		centerY = (y1 + y2) / 2
		angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI)

		const textOffset = ruler.textOffset ?? 20
		const normalX = -(y2 - y1)
		const normalY = x2 - x1
		const length = Math.sqrt(normalX ** 2 + normalY ** 2) || 1

		const offsetX = (normalX / length) * textOffset
		const offsetY = (normalY / length) * textOffset

		textX = centerX + offsetX
		textY = centerY + offsetY
		color = '#0B0D10'
		strokeWidth = 1.5
		fontSize = 15
	}

	return (
		<div className={`${example.theme === 'dark' ? 'bg-foreground text-white' : 'bg-white'} pt-10 md:pt-15 lg:pt-22.5 pb-15 md:pb-22.5 lg:pb-30`}>
			<div className="max-w-308 px-4 mx-auto">
				<div className={`${example.theme === 'dark' ? 'bg-black' : 'bg-background'} max-lg:flex-col px-4 md:px-10 lg:px-20 pt-10 lg:py-15 flex justify-between gap-10 items-center`}>
					<div className="lg:max-w-130">
						<Title className="mb-6">{example.title}</Title>
						<div className="font-helvetica text-[17px] -tracking-[0.01em]">
							{example.text}
						</div>
					</div>

					<div className="max-w-100 w-full">
						<div ref={rootRef} className="relative inline-block">
							<Image
								width={imageWidth}
								height={imageHeight}
								alt={example.title}
								src={example.image}
								quality={95}
							/>

							{ruler && (
								<div className="absolute inset-0 pointer-events-none">
									<svg
										ref={svgRef}
										viewBox={`0 0 ${imageWidth} ${imageHeight}`}
										className="w-full h-full overflow-visible opacity-0"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true"
									>
										<line
											ref={lineRef}
											x1={x1}
											y1={y1}
											x2={x2}
											y2={y2}
											stroke={color}
											strokeWidth={strokeWidth}
											strokeLinecap="round"
											strokeOpacity={0.4}
										/>

										<g
											ref={markerStartRef}
											transform={`translate(${x1} ${y1}) rotate(${angle - 180})`}
										>
											<path d="M0 0 L10 5 L0 10 Z" strokeOpacity={0.4} fill={color} transform="translate(-5 -5)" />
										</g>

										<g
											ref={markerEndRef}
											transform={`translate(${x2} ${y2}) rotate(${angle})`}
										>
											<path strokeOpacity={0.4} d="M0 0 L10 5 L0 10 Z" fill={color} transform="translate(-5 -5)" />
										</g>

										<text
											ref={textRef}
											x={textX}
											y={textY}
											textAnchor="middle"
											dominantBaseline="middle"
											fontSize={fontSize}
											fontWeight="500"
											fill={color}
											transform={`rotate(${angle} ${textX} ${textY})`}
										>
											{ruler.label}
										</text>
									</svg>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}