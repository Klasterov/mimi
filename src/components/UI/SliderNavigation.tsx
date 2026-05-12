import { RightArrowIcon } from "@/icons/RightArrowIcon";

interface Props {
	setPrev: (node: HTMLButtonElement | null) => void;
	setNext: (node: HTMLButtonElement | null) => void;
	className?: string;
}

export const SliderNavigation = ({ setPrev, setNext, className }: Props) => {
	return (
		<div className={`${className} flex gap-4`}>
			<button
				ref={setPrev}
				className="w-9 h-9 rounded-full bg-white flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity duration-300 disabled:opacity-40 disabled:cursor-default"
			>
				<RightArrowIcon className="rotate-180 w-5 h-5"></RightArrowIcon>
			</button>
			<button
				ref={setNext}
				className="w-9 h-9 rounded-full bg-white flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity duration-300 disabled:opacity-40 disabled:cursor-default"
			>
				<RightArrowIcon className="w-5 h-5"></RightArrowIcon>
			</button>
		</div>
	);
};