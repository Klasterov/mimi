'use client'

import { useEffect, useRef, useState } from 'react' // Добавили useRef
import Image from 'next/image';
import { Title } from '../../UI/Title';
import { Button } from '../../UI/Button';
import { gsap } from 'gsap'
import { showroomContent } from '@/data/showroom';
import { brand } from '@/config/brand';
import { PlayIcon } from '@/icons/PlayIcon';
import { MimiLogo } from '@/components/UI/MimiLogo';

export default function Showroom() {
	const gradientRef = useRef<HTMLDivElement>(null)

	const [isMuted, setIsMuted] = useState(true)
	const videoRef = useRef<HTMLVideoElement>(null)

	const handlePlayWithSound = () => {
		if (!videoRef.current) return
		videoRef.current.currentTime = 0   // Перезапуск с начала
		videoRef.current.muted = false     // Включаем звук
		videoRef.current.play()            // Старт видео
		setIsMuted(false)                  // Обновляем состояние
	}

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.muted = true
			videoRef.current.play().catch(() => {
				// Автоплей может блокироваться браузером, обработка ошибки
			})
		}
	}, [])
	useEffect(() => {
		if (gradientRef.current) {
			gsap.to(gradientRef.current, {
				scale: 1.15,
				opacity: 0.7,
				duration: 3,
				repeat: -1,
				yoyo: true,
				ease: 'sine.inOut'
			})
		}
	}, [])

	return (
		<section className="overflow-hidden relative pt-10 pb-26 md:pt-16 md:pb-34 lg:pt-22.5 lg:pb-45">
			<div ref={gradientRef}
				className='absolute bottom-25  left-[40%] sm:left-0 2xl:left-[10%] w-88 sm:w-179.5 aspect-square -z-1'>
				<Image
					src='/images/showroom/decor.svg'
					alt="background image"
					fill
					className="object-cover"
				/>
			</div>
			<span className='absolute bottom-22 left-0 w-full aspect-390/516 -z-1 sm:hidden'>
				<Image
					src='/images/showroom/bg-mob.png'
					alt="background image"
					fill
					className="object-cover"
				/>
			</span>
			<span className='absolute bottom-5 lg:bottom-15 left-1/2 -translate-x-1/2 w-360 aspect-1440/820 -z-1 hidden sm:block'>
				<Image
					src='/images/showroom/bg.png'
					alt="background image"
					fill
					className="object-cover"
				/>
			</span>
			<div className="max-w-236 mx-auto px-4">

				<Title className="mb-6 lg:max-w-200">
					{showroomContent.title}
				</Title>

				<div className="font-helvetica lg:max-w-152 text-brand-gray leading-snug tracking-[-0.01em] mb-10 md:mb-14 lg:mb-18">
					Вы вживую ощутите тот комфорт, который дает Умный Дом. <br />
					Сами поуправляете системой. <br />
					Мы расскажем о возможностях, которые вы даже не могли себе представить.
					Вы поймете, почему обычная электрика устарела еще 30 лет назад.
				</div>

				<MimiLogo className='mb-26 md:mb-18 flex justify-center lg:mx-auto'></MimiLogo>

				<div className="relative border-3 md:border-8 lg:border-16 border-[#f9fbfc] aspect-video mb-8.5 md:mb-6 rounded-[18px] md:rounded-[20px] overflow-hidden bg-[#f9fbfc]">
					<video
						ref={videoRef}
						className="w-full h-full object-cover rounded-2xl cursor-pointer"
						autoPlay
						loop
						muted={isMuted}
						onClick={handlePlayWithSound}
						controls={!isMuted} // Показываем контролы только после включения звука
					>
						<source src={`${showroomContent.videoSrc}`} type="video/mp4" />
					</video>

					{isMuted && (
						<button
							onClick={handlePlayWithSound}
							className="absolute rounded-full overflow-hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 transition-opacity duration-300 hover:opacity-70"
							aria-label="Включить звук и перезапустить видео"
						>
							<PlayIcon className="w-13.5 h-13.5" />
						</button>
					)}
				</div>

				<div className="flex justify-between flex-col md:flex-row items-start md:items-center gap-8">
					<div className="flex items-center gap-3">
						<div className="w-11 h-11 bg-white rounded-[10px] flex items-center justify-center">
							<Image
								src="/images/icons/address-decor.svg"
								width={44}
								height={44}
								alt="Address"
							/>
						</div>
						<a href="" className="hover:text-foreground transition-colors duration-300 font-helvetica max-w-45 text-[14px] tracking-[-0.01em] text-brand-blue">
							{brand.address}
						</a>
					</div>
					<Button className='justify-center'>Записаться в шоурум</Button>
				</div>

			</div>
		</section>
	);
};