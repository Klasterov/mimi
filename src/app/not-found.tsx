
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { Title } from "@/components/UI/NotFoundTitle";
import { Button } from "@/components/UI/Button";
import Image from "next/image";

export default function NotFoundPage() {
	return (
		<>
			<Header />
			<main>
				<div className="min-h-177.5 pb-30 relative overflow-hidden">
					<div className="absolute top-0 right-0 w-120.25 aspect-481/471">
						<Image
							alt=""
							fill
							src="/images/not-found-page/decor-1.png"
						/>
					</div>
					<div className="max-md:hidden absolute bottom-0 left-0 w-110.25 aspect-441/398">
						<Image
							alt=""
							fill
							src="/images/not-found-page/decor-2.png"
						/>
					</div>
					<div className="max-w-235.5 mx-auto px-4 flex flex-col items-center text-center relative">
						<div className="-mb-15 relative">
							<div className="absolute w-[57.7%] bottom-[34.78%] -left-[14.5%] aspect-290/400">
								<Image
									alt=""
									fill
									src="/images/not-found-page/decor-3.png"
								/>
							</div>
							<div className="absolute w-[54.38%] bottom-[27.05%] left-[51.2%] aspect-273/400">
								<Image
									alt=""
									fill
									src="/images/not-found-page/decor-4.png"
								/>
							</div>
							<Image
								width={502}
								height={414}
								src="/images/not-found-page/main4.png"
								alt=""
								className="relative"
							/>

						</div>
						<Title>4 0 4</Title>
						<div className="mb-10 font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em]">Ой, такой страницы больше нет</div>
						<Button className="justify-center sm:py-1.75">Вернуться на главную</Button>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
} 