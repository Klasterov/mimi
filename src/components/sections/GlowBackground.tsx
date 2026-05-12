'use client'

import { useEffect, useRef } from 'react'

export default function GlowBackground() {
	const blockRef = useRef<HTMLDivElement>(null)
	// Важно: инициализируем массив нужной длины
	const rectsRef = useRef<(HTMLDivElement | null)[]>([])

	useEffect(() => {
		const block = blockRef.current
		if (!block) return

		let currentAngle = 0
		let targetAngle = 0
		let frameId: number

		const VISIBLE_OFFSET = 20
		const SMOOTHING = 0.05

		const onMouseMove = (e: MouseEvent) => {
			const rect = block.getBoundingClientRect()
			// Считаем от центра блока
			const x = e.clientX - (rect.left + rect.width / 2)
			const y = e.clientY - (rect.top + rect.height / 2)
			targetAngle = Math.atan2(y, x)
		}

		const animate = () => {
			let diff = targetAngle - currentAngle
			while (diff > Math.PI) diff -= Math.PI * 2
			while (diff < -Math.PI) diff += Math.PI * 2

			currentAngle += diff * SMOOTHING

			const blockW = block.offsetWidth
			const blockH = block.offsetHeight

			// Ищем первый живой элемент для расчетов
			const firstRect = rectsRef.current[0]
			if (!firstRect) {
				frameId = requestAnimationFrame(animate)
				return
			}

			const rectW = firstRect.offsetWidth
			const rectH = firstRect.offsetHeight

			const limitX = blockW / 2 - rectW / 2 + VISIBLE_OFFSET
			const limitY = blockH / 2 - rectH / 2 + VISIBLE_OFFSET

			const cos = Math.cos(currentAngle)
			const sin = Math.sin(currentAngle)

			const distX = Math.abs(cos) > 0.001 ? limitX / Math.abs(cos) : Infinity
			const distY = Math.abs(sin) > 0.001 ? limitY / Math.abs(sin) : Infinity
			const dist = Math.min(distX, distY)

			const x = dist * cos
			const y = dist * sin

			rectsRef.current.forEach((el, i) => {
				if (!el) return
				const invert = i % 2 === 1
				el.style.transform = `
          translate(-50%, -50%)
          translate(${invert ? -x : x}px, ${invert ? -y : y}px)
        `
			})

			frameId = requestAnimationFrame(animate)
		}

		// Вешаем на window, чтобы мышь подхватывалась мгновенно
		window.addEventListener('mousemove', onMouseMove)
		frameId = requestAnimationFrame(animate)

		return () => {
			window.removeEventListener('mousemove', onMouseMove)
			cancelAnimationFrame(frameId) // Обязательно останавливаем цикл!
		}
	}, [])

	return (
		<div ref={blockRef} className="glow-block absolute inset-0 pointer-events-none">
			{[1, 2, 3, 4, 5, 6].map((i, index) => (
				<div
					key={i}
					ref={(el) => {
						// Привязываем строго по индексу, чтобы не было дублей
						rectsRef.current[index] = el
					}}
					className={`rect rect-${i} absolute`}
					style={{ left: '50%', top: '50%' }}
				>
					<div className="shine shine-core" />
					<div className="shine shine-glow" />
				</div>
			))}
		</div>
	)
}