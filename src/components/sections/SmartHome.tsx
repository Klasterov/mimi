"use client";

import Image from 'next/image';
import { Title } from '../UI/Title';
import { Button } from '../UI/Button';
import { useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

function LivingRoom() {
	const { enabled } = useTheme();
	useEffect(() => {
		// Следим за всей секцией, чтобы сенсор реагировал заранее
		const zone = document.querySelector<HTMLDivElement>('section');
		const sensor = document.getElementById('motion-sensor');

		if (!zone || !sensor) return;

		let lastX = 0;
		let lastY = 0;
		let lastTime = performance.now();

		const onMove = (e: MouseEvent) => {
			const rect = sensor.getBoundingClientRect();
			const cx = rect.left + rect.width / 2;
			const cy = rect.top + rect.height / 2;

			const now = performance.now();
			const dt = now - lastTime;
			const dx = e.clientX - lastX;
			const dy = e.clientY - lastY;
			const speed = Math.hypot(dx, dy) / (dt || 1);

			const distance = Math.hypot(e.clientX - cx, e.clientY - cy);
			const intensity = Math.max(0.25, 1 - distance / 800);
			const energy = Math.min(1, speed * 0.8);

			sensor.style.setProperty('--pulse-intensity', intensity.toString());
			sensor.style.setProperty('--pulse-energy', energy.toString());
			sensor.classList.add('active');

			lastX = e.clientX;
			lastY = e.clientY;
			lastTime = now;
		};

		const onLeave = () => sensor.classList.remove('active');

		zone.addEventListener('mousemove', onMove);
		zone.addEventListener('mouseleave', onLeave);

		return () => {
			zone.removeEventListener('mousemove', onMove);
			zone.removeEventListener('mouseleave', onLeave);
		};
	}, []);

	return (
		<div className={`living-zone relative lg:z-20 ${enabled && 'dark-theme'}`}>
			<span className={`living-cctv transition-all duration-400 ${enabled && 'brightness-50'}`}>
				<Image src="/images/smarthome/cctv.png" width={85} height={78} alt="" />
			</span>

			<div className="sensor" id="motion-sensor">
				<div className={`sensor-icon transition-all duration-400 ${enabled && 'brightness-30'}`}>
					<Image
						src="/images/smarthome/fire-detector.png"
						width={24}
						height={24}
						alt="Датчик движения"
					/>
				</div>
				<span className="pulse pulse1"></span>
				<span className="pulse pulse2"></span>
				<span className="pulse pulse3"></span>
			</div>

		</div>
	)
}

export default function SmartHome() {
	const { enabled, toggle } = useTheme()
	useEffect(() => {
		const zone = document.querySelector<HTMLDivElement>('section');
		const stepsContainer = document.getElementById('steps-container');

		if (!zone || !stepsContainer) return;

		let lastX = 0;
		let lastY = 0;
		let lastStepTime = 0;
		let lastStepX = 0;
		let lastStepY = 0;
		let stepCount = 0;
		let currentAngle = 0;

		const createStep = (x: number, y: number, angle: number) => {
			const rect = stepsContainer.getBoundingClientRect();
			const absX = x - rect.left;
			const absY = y - rect.top;

			const dist = Math.hypot(absX - lastStepX, absY - lastStepY);
			if (dist < 25) return;

			const step = document.createElement('div');
			step.className = 'dynamic-step';

			const isLeft = stepCount % 2 === 0;
			stepCount++;

			const angleRad = angle * (Math.PI / 180);
			const sideAngle = angleRad + Math.PI / 2;
			const offsetDist = 10;
			const offsetX = Math.cos(sideAngle) * offsetDist * (isLeft ? -1 : 1);
			const offsetY = Math.sin(sideAngle) * offsetDist * (isLeft ? -1 : 1);

			step.style.left = `${absX + offsetX}px`;
			step.style.top = `${absY + offsetY}px`;
			step.style.backgroundImage = `url('/images/smarthome/step-${isLeft ? 'left' : 'right'}.png')`;
			step.style.transform = `translate(-50%, -50%) rotate(${angle + 0}deg)`;

			stepsContainer.appendChild(step);

			lastStepX = absX;
			lastStepY = absY;

			setTimeout(() => { step.remove(); }, 3000);
		};

		const onMove = (e: MouseEvent) => {
			const now = performance.now();
			const dx = e.clientX - lastX;
			const dy = e.clientY - lastY;

			if (Math.hypot(dx, dy) > 1) {
				currentAngle = Math.atan2(dy, dx) * (180 / Math.PI);
			}

			if (now - lastStepTime > 130 && Math.hypot(dx, dy) > 1) {
				createStep(e.clientX, e.clientY, currentAngle);
				lastStepTime = now;
			}

			lastX = e.clientX;
			lastY = e.clientY;
		};

		zone.addEventListener('mousemove', onMove);
		return () => zone.removeEventListener('mousemove', onMove);
	}, []);
	return (

		<section className={`overflow-hidden min-h-205 relative transition-colors duration-400 ${enabled && 'bg-foreground'}`}>
			<div className='absolute lg:block hidden w-117.5 aspect-470/683 top-0 right-[13%]'>
				<Image
					src='/images/smarthome/decor.png'
					alt="background image"
					fill
					className='object-cover'
				/>

			</div>
			<div className={`absolute lg:block hidden transition-opacity duration-400 w-160 aspect-square -top-[8%] left-[68%] ${enabled && 'opacity-20'}`}>
				<Image
					src='/images/smarthome/decor-2.png'
					alt="background image"
					fill
					className='object-cover'
				/>

			</div>
			<div className="absolute -top-13.75 left-3 sm:left-1/2 sm:-translate-x-1/2 w-360 aspect-1440/820 ">

				<div id="steps-container" className="absolute inset-0 pointer-events-none z-10" />
				<Image
					src='/images/smarthome/bg.png'
					priority
					alt="background image"
					fill
					className={`object-cover z-10 transition-opacity duration-400 ${enabled && 'opacity-0'}`}
				/>
				<Image
					src='/images/smarthome/bg-dark.png'
					alt="background image"
					fill
					className={`left-1.75! z-10 top-0.5! object-cover transition-opacity duration-400 ${!enabled && 'opacity-0'}`}
				/>
				<LivingRoom />

				<div className={`bedroom-zone relative lg:z-20 ${enabled && 'dark-theme'}`}>

					<span className='curtain curtain-open'>
						<Image src="/images/smarthome/curtain-open.png" width={193} height={186} alt="" />
					</span>
					<span className={`curtain curtain-close ${enabled && 'brightness-20'}`}>
						<Image src="/images/smarthome/curtain-close.png" width={193} height={186} alt="" />
					</span>
					<span className='lamp lamp-off'>
						<Image src="/images/smarthome/lamp-off.png" width={89} height={80} alt="" />
					</span>
					<span className='lamp lamp-on '>
						<Image src="/images/smarthome/lamp-on.png" width={89} height={80} alt="" />
					</span>
				</div>
				<div className={`kitchen-zone relative lg:z-20 ${enabled && 'dark-theme'}`}>

					<div className='kitchen-zone-2'>
						<span className={`conditioner conditioner-off ${enabled && 'brightness-30'}`}>
							<Image src="/images/smarthome/conditioner-off.png" width={100.8} height={121.8} alt="" />
						</span>
						<span className='conditioner conditioner-on'>
							<Image src="/images/smarthome/conditioner-on.png" width={100.8} height={121.8} alt="" />
						</span>
					</div>
					<span className='lamp lamp-off'>
						<Image src="/images/smarthome/lamp-off.png" width={89} height={80} alt="" />
					</span>
					<span className='lamp lamp-on'>
						<Image src="/images/smarthome/lamp-on.png" width={89} height={80} alt="" />
					</span>
				</div>

				<div className="garage-zone relative z-20">
					<span className={`garage-cctv transition-all duration-400 ${enabled ? 'brightness-50' : ''}`}>
						<Image src="/images/smarthome/cctv.png" width={85} height={78} alt="" />
					</span>

					<span className={`car transition-all duration-400 ${!enabled && 'opacity-0'}`}>
						<Image src="/images/smarthome/car-dark.png" fill alt="" />
					</span>
					<span className={`car transition-all duration-400 ${enabled && 'opacity-0'}`}>
						<Image src="/images/smarthome/car.png" fill alt="" />
					</span>
				</div>
				<div className="sitting-zone relative z-20">
					<span className={`curtain curtain-open ${enabled && 'opacity-0'}`}>
						<Image src="/images/smarthome/curtain-open.png" width={193} height={186} alt="" />
					</span>
					<span className={`curtain curtain-close brightness-20 ${!enabled && 'opacity-0'}`}>
						<Image src="/images/smarthome/curtain-close.png" width={193} height={186} alt="" />
					</span>
				</div>
			</div>

			<div className="max-w-308 mx-auto relative z-10 lg:static px-4">
				<div className='pt-13.5 lg:pl-36 lg:pt-30'>
					<button
						type="button"
						onClick={toggle}
						aria-pressed={enabled}
						className="font-helvetica relative inline-flex items-center gap-4 cursor-pointer group select-none mb-5"
					>

						<span
							className={`relative w-15 h-7.5 rounded-full transition-colors duration-300 bg-linear-to-b ${enabled ? 'from-[#333333] to-[#4D4D4D]' : 'from-[#C6C6C6] to-[#FFFFFF]'} shadow-[0_3px_8px_rgba(0,0,0,0.24)] flex items-center justify-start`}
						>
							<span className={`absolute top-px left-px right-px transition-colors duration-300  bottom-px ${enabled ? 'bg-[#444]' : 'bg-[#d8d8d8]'} rounded-full`}>

							</span>
							<span
								className={`transform relative transition-transform duration-300 rounded-full ${enabled ? 'translate-x-0' : 'translate-x-7.5'}`}
							>
								<Image
									src='/images/icons/theme-btn-circle.svg'
									alt="Dark/Light theme btn icon"
									width={29}
									height={29}
									className="object-cover "
								/>
								<span className={`absolute top-[50%] left-[50%] transition-colors duration-300 -translate-1/2 rounded-full shadow-[inset_1px_1px_1px_0_rgba(0,0,0,0.35)] w-1 h-1 ${enabled ? 'bg-[#ff383c]' : 'bg-[#1eb02f]'}`}></span>
							</span>
						</span>

						<span className="tracking-[-0.01em] text-[14px] bg-linear-to-r from-[#dbdbdb] to-brand-light-gray bg-clip-text text-transparent transition-opacity group-hover:opacity-70">
							Увидеть в действии
						</span>
					</button>
					<Title className={`mb-2 transition-colors duration-400 max-w-[80%] relative ${enabled && 'text-white'}`}>Умный дом под&nbsp;ключ</Title>
					<p className={`font-helvetica relative text-[17px] mb-10 md:mb-20 tracking-[-0.01em] transition-colors duration-400 leading-tight ${enabled && 'text-[#d9dadc]/60'}`}>
						Производство и монтаж современной электрики. <br />
						Автоматическое управление всеми системами дома.
					</p>
					<Button className='justify-center'>Узнать больше</Button>
				</div>
			</div>
		</section>
	);
};