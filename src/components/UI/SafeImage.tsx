import Image from "next/image"

type SafeImageProps = {
	src: string
	alt: string
	className?: string
	width?: number
	height?: number
	fill?: boolean
	priority?: boolean
	quality?: number
	sizes?: string
}

function isRemoteImage(src: string) {
	return src.startsWith("http://") || src.startsWith("https://")
}

export default function SafeImage({
	src,
	alt,
	className,
	width,
	height,
	fill = false,
	priority = false,
	quality,
	sizes,
}: SafeImageProps) {
	if (isRemoteImage(src)) {
		if (fill) {
			return (
				<img
					src={src}
					alt={alt}
					loading={priority ? "eager" : "lazy"}
					referrerPolicy="no-referrer"
					className={`absolute inset-0 h-full w-full ${className ?? ""}`.trim()}
				/>
			)
		}

		return (
			<img
				src={src}
				alt={alt}
				width={width}
				height={height}
				loading={priority ? "eager" : "lazy"}
				referrerPolicy="no-referrer"
				className={className}
			/>
		)
	}

	return (
		<Image
			src={src}
			alt={alt}
			width={fill ? undefined : width}
			height={fill ? undefined : height}
			fill={fill}
			priority={priority}
			quality={quality}
			sizes={sizes}
			className={className}
		/>
	)
}
