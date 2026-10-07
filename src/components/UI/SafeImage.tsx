import Image from "next/image"
import { browserImageUrl } from "@/lib/browser-image-url"

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

function isUnconfiguredRemoteImage(src: string) {
  if (!/^https?:\/\//.test(src)) return false
  const origin = new URL(src).origin
  return ![process.env.NEXT_PUBLIC_IMAGE_ORIGIN, "http://localhost:4000", "http://127.0.0.1:4000"].includes(origin)
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
  src = browserImageUrl(src)
	if (isUnconfiguredRemoteImage(src)) {
		if (fill) {
			return (
				<img
					src={src}
					alt={alt}
					loading={priority ? "eager" : "lazy"}
          decoding="async"
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
			sizes={sizes ?? (fill ? "(max-width: 768px) 100vw, 50vw" : undefined)}
			className={className}
		/>
	)
}
