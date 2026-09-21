'use client'

import { useMemo, useState } from 'react'
import ArrowLink from '../UI/ArrowLink'

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
// Icons are local files, referenced by path only (no icon library).
// Drop matching SVGs into /public/images/icons/<id>.svg — the id column
// below is exactly the file name expected for each row.

type ServiceItem = {
	id: string
	label: string
	pricePerSqm: number
	hasInfo?: boolean
}

type Category = {
	title: string
	items: ServiceItem[]
}

const ICONS_PATH = '/images/icons'

const CATEGORIES: Category[] = [
	{
		title: 'Освещение',
		items: [
			{ id: '1', label: 'Димируемое (изм. яркости)', pricePerSqm: 3500, hasInfo: true },
			{ id: '2', label: 'Биодинамика', pricePerSqm: 5200, hasInfo: true },
			{ id: '3', label: 'RGBW лента (регулировка цветов)', pricePerSqm: 2800 },
			{ id: '4', label: 'LED лента', pricePerSqm: 1400 },
			{ id: '5', label: 'Шторы', pricePerSqm: 6500, hasInfo: true },
			{ id: '6', label: 'Жалюзи', pricePerSqm: 4200, hasInfo: true },
		],
	},
	{
		title: 'Климат',
		items: [
			{ id: '7', label: 'Климат-контроль', pricePerSqm: 4800, hasInfo: true },
			{ id: '8', label: 'Радиаторы', pricePerSqm: 3200 },
			{ id: '9', label: 'Увлажнение', pricePerSqm: 2600, hasInfo: true },
			{ id: '10', label: 'Теплый пол', pricePerSqm: 3900, hasInfo: true },
			{ id: '11', label: 'Теплая стена', pricePerSqm: 3300 },
			{ id: '12', label: 'Кондиционеры', pricePerSqm: 5400, hasInfo: true },
		],
	},
	{
		title: 'Безопасность',
		items: [
			{ id: '13', label: 'Контроль доступа', pricePerSqm: 3700, hasInfo: true },
			{ id: '14', label: 'Камеры', pricePerSqm: 2900, hasInfo: true },
			{ id: '15', label: 'Электрозамок', pricePerSqm: 1800, hasInfo: true },
			{ id: '16', label: 'Управление розетками', pricePerSqm: 1500, hasInfo: true },
			{ id: '17', label: 'Датчики безопасности', pricePerSqm: 2200, hasInfo: true },
		],
	},
	{
		title: 'Музыка и кино',
		items: [
			{ id: '18', label: 'Мультирум', pricePerSqm: 4100, hasInfo: true },
			{ id: '19', label: 'Встраиваемая/Скрытая акустика', pricePerSqm: 3600 },
			{ id: '20', label: 'Следящая музыка', pricePerSqm: 1900 },
			{ id: '21', label: 'Домашний кинотеатр', pricePerSqm: 7800, hasInfo: true },
		],
	},
]

const AREA_BREAKPOINTS = [50, 100, 150, 200, 300, 400, 500, 700, 900, 1000]
const AREA_LABELS = ['50 м²', '100 м²', '150 м²', '200 м²', '300 м²', '400 м²', '500 м²', '700 м²', '900 м²', '> 1000 м²']
const DEFAULT_SELECTED = ['dimmable', 'climate_control', 'access_control', 'multiroom']
const DEFAULT_SLIDER_POS = 3.22 // sits between the 200 м² and 300 м² marks, i.e. ~222 м²

function sliderPosToArea(pos: number) {
	const clamped = Math.min(Math.max(pos, 0), AREA_BREAKPOINTS.length - 1)
	const index = Math.min(Math.floor(clamped), AREA_BREAKPOINTS.length - 2)
	const fraction = clamped - index
	const from = AREA_BREAKPOINTS[index]
	const to = AREA_BREAKPOINTS[index + 1]
	return Math.round(from + fraction * (to - from))
}

function formatPrice(value: number) {
	return new Intl.NumberFormat('ru-RU').format(Math.round(value))
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PricingApp() {
	const [sliderPos, setSliderPos] = useState(DEFAULT_SLIDER_POS)
	const [selected, setSelected] = useState<Set<string>>(new Set(DEFAULT_SELECTED))
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [submitted, setSubmitted] = useState(false)

	const isMaxArea = sliderPos >= AREA_BREAKPOINTS.length - 1
	const area = isMaxArea ? AREA_BREAKPOINTS[AREA_BREAKPOINTS.length - 1] : sliderPosToArea(sliderPos)
	const areaLabel = isMaxArea ? '> 1000 м²' : `${area} м²`

	const total = useMemo(() => {
		const pricePerSqm = CATEGORIES.flatMap((c) => c.items)
			.filter((item) => selected.has(item.id))
			.reduce((sum, item) => sum + item.pricePerSqm, 0)
		return pricePerSqm * area
	}, [selected, area])

	const serviceCount = selected.size

	function toggleItem(id: string) {
		setSelected((prev) => {
			const next = new Set(prev)
			if (next.has(id)) next.delete(id)
			else next.add(id)
			return next
		})
	}

	function handleSubmit() {
		if (!name.trim() || !phone.trim()) return
		// TODO: wire this up to your backend / CRM endpoint.
		setSubmitted(true)
	}

	const canSubmit = name.trim().length > 0 && phone.trim().length > 0

	return (
		<section className="min-h-screen bg-black px-4 py-8 text-white md:px-8 md:py-12">
			<div className="mx-auto max-w-6xl lg:grid lg:grid-cols-[1fr_360px] lg:items-start lg:gap-8">
				{/* Main column */}
				<main className="space-y-6">
					<AreaCard sliderPos={sliderPos} onChange={setSliderPos} areaLabel={areaLabel} />

					{CATEGORIES.map((category) => (
						<CategoryCard
							key={category.title}
							category={category}
							selected={selected}
							onToggle={toggleItem}
						/>
					))}

					<ContactCard
						name={name}
						phone={phone}
						email={email}
						onName={setName}
						onPhone={setPhone}
						onEmail={setEmail}
					/>

					{/* Summary + submit, flows here on mobile */}
					<SummaryCard
						total={total}
						area={areaLabel}
						serviceCount={serviceCount}
						onSubmit={handleSubmit}
						canSubmit={canSubmit}
						submitted={submitted}
						className="lg:hidden"
					/>
				</main>

				{/* Sticky sidebar on desktop */}
				<aside className="hidden lg:sticky lg:top-8 lg:block">
					<SummaryCard
						total={total}
						area={areaLabel}
						serviceCount={serviceCount}
						onSubmit={handleSubmit}
						canSubmit={canSubmit}
						submitted={submitted}
					/>
				</aside>
			</div>
		</section>
	)
}

// ---------------------------------------------------------------------------
// Subcomponents
// ---------------------------------------------------------------------------

function AreaCard({
	sliderPos,
	onChange,
	areaLabel,
}: {
	sliderPos: number
	onChange: (value: number) => void
	areaLabel: string
}) {
	return (
		<div className="rounded-xl bg-foreground px-8 py-10">
			<div className="mb-6 flex items-center justify-between">
				<h2 className="text-[22px] font-medium text-[#a8b0bd] -tracking-[0.01em]">Выберите площадь</h2>
				<span className="text-sm text-white/50 lg:hidden">{areaLabel}</span>
			</div>

			<input
				type="range"
				min={0}
				max={AREA_BREAKPOINTS.length - 1}
				step={0.01}
				value={sliderPos}
				onChange={(e) => onChange(Number(e.target.value))}
				aria-label="Площадь помещения"
				className="range-slider w-full"
				style={{
					// paint the filled portion of the track in cyan, the rest in grey
					background: `linear-gradient(to right, #22d3ee ${(sliderPos / (AREA_BREAKPOINTS.length - 1)) * 100
						}%, #2a2a2a ${(sliderPos / (AREA_BREAKPOINTS.length - 1)) * 100}%)`,
				}}
			/>

			<div className="mt-4.5 flex justify-between text-[15px] text-[#f6f9ff] ">
				{AREA_LABELS.map((label) => (
					<span key={label}>{label}</span>
				))}
			</div>

			<style jsx>{`
				.range-slider {
					-webkit-appearance: none;
					appearance: none;
					height: 4px;
					border-radius: 9999px;
					outline: none;
					cursor: pointer;
				}
				.range-slider::-webkit-slider-thumb {
					-webkit-appearance: none;
					appearance: none;
					width: 16px;
					height: 16px;
					border-radius: 9999px;
					background: #22d3ee;
					border: 3px solid #0a0a0a;
					box-shadow: 0 0 0 1px #22d3ee;
					cursor: pointer;
				}
				.range-slider::-moz-range-thumb {
					width: 16px;
					height: 16px;
					border-radius: 9999px;
					background: #22d3ee;
					border: 3px solid #0a0a0a;
					box-shadow: 0 0 0 1px #22d3ee;
					cursor: pointer;
				}
			`}</style>
		</div>
	)
}

function CategoryCard({
	category,
	selected,
	onToggle,
}: {
	category: Category
	selected: Set<string>
	onToggle: (id: string) => void
}) {
	return (
		<div className="rounded-xl bg-[#0b0d10] py-10 px-8">
			<h2 className="mb-6 text-[22px] tracking-[-0.01em] font-medium text-[#a8b0bd]">{category.title}:</h2>
			<div className="space-y-2">
				{category.items.map((item) => (
					<ServiceRow
						key={item.id}
						item={item}
						checked={selected.has(item.id)}
						onToggle={() => onToggle(item.id)}
					/>
				))}
			</div>
		</div>
	)
}

function ServiceRow({
	item,
	checked,
	onToggle,
}: {
	item: ServiceItem
	checked: boolean
	onToggle: () => void
}) {
	return (
		<div
			className={`flex items-center justify-between rounded-[16px] p-4 transition-colors ${checked ? 'bg-[rgba(24, 28, 34, 0.4)]' : 'bg-transparent hover:bg-[#181c22]'
				}`}
		>
			<button
				type="button"
				onClick={onToggle}
				className="flex min-w-0 flex-1 items-center gap-3 text-left"
			>
				{/* Selection mark: /public/images/icons/check.svg */}
				<span
					className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors ${checked ? '' : 'border border-white/25'
						}`}
				>
					{checked && <img src={`${ICONS_PATH}/check.svg`} alt="" className="h-5 w-5" />}
				</span>

				<img src={`images/pricing-page/${item.id}.svg`} alt="" className="h-4.5 w-4.5 shrink-0" />

				<span className=" text-[17px] text-[#f6f9ff]">{item.label}</span>
			</button>

			{item.hasInfo && (
				<ArrowLink href="">Узнать больше</ArrowLink>
			)}
		</div>
	)
}

function ContactCard({
	name,
	phone,
	email,
	onName,
	onPhone,
	onEmail,
}: {
	name: string
	phone: string
	email: string
	onName: (v: string) => void
	onPhone: (v: string) => void
	onEmail: (v: string) => void
}) {
	return (
		<div className="rounded-[12px] bg-foreground px-8 py-10">
			<h2 className="mb-6 text-[22px] font-medium text-[#white/90]">Контактные данные</h2>

			<div className="space-y-3.5 mb-6">
				<Field label="Имя" required value={name} onChange={onName} placeholder="Дмитрий" />
				<Field label="Телефон" required value={phone} onChange={onPhone} placeholder="+7 (___) ___-__-__" type="tel" />
				<Field label="Email" value={email} onChange={onEmail} placeholder="info@mail.ru" type="email" />
			</div>

			<p className="text-[13px] leading-[1.4] text-[#5f6368]">
				Нажимая кнопку &laquo;Отправить заявку&raquo;, Вы даете{' '}
				<a href="/privacy" className="#00d0ff">
					Согласие на обработку
				</a>{' '}
				Ваших персональных данных и их передачу.
			</p>
		</div>
	)
}

function Field({
	label,
	value,
	onChange,
	placeholder,
	required,
	type = 'text',
}: {
	label: string
	value: string
	onChange: (v: string) => void
	placeholder?: string
	required?: boolean
	type?: string
}) {
	return (
		<label className="block">
			<span className="mb-1.5 block text-xs text-white/40">
				{label}
				{required && <span className="text-cyan-400">*</span>}
			</span>
			<input
				type={type}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				className="w-full border-b border-white/15 bg-transparent pb-2 text-[15px] text-white placeholder:text-white/25 focus:border-cyan-400 focus:outline-none"
			/>
		</label>
	)
}

function SummaryCard({
	total,
	area,
	serviceCount,
	onSubmit,
	canSubmit,
	submitted,
	className = '',
}: {
	total: number
	area: string
	serviceCount: number
	onSubmit: () => void
	canSubmit: boolean
	submitted: boolean
	className?: string
}) {
	return (
		<>
			<div className="mb-4 flex text-white items-center justify-between">
				<span className="tracking-[0.04em]">Итого:</span>
				<span className="text-[32px] font-bold">
					{formatPrice(total)} <span className="text-[#00d0ff]">₽</span>
				</span>
			</div>

			<div className="space-y-2.5 text-[14px] pb-10 border-[#262626] border-b">
				<div className="flex justify-between">
					<span className="text-[#5f6368]">Площадь:</span>
					<span className="text-white">{area}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-[#5f6368]">Количество услуг:</span>
					<span className="text-white">{serviceCount}</span>
				</div>
			</div>

			<button
				type="button"
				onClick={onSubmit}
				disabled={!canSubmit}
				className="mt-6 w-full rounded-full bg-cyan-400 py-3.5 text-sm font-medium text-[#0a0a0a] transition-colors hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-cyan-400/30 disabled:text-white/40"
			>
				{submitted ? 'Заявка отправлена' : 'Отправить заявку'}
			</button>

			{!canSubmit && (
				<p className="mt-3 text-center text-xs text-white/30">Укажите имя и телефон, чтобы продолжить</p>
			)}
		</>
	)
}