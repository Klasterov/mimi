import SafeImage from "@/components/UI/SafeImage"

export default function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  if (!images.length) return null

  return (
    <section className="bg-white py-10 lg:py-20" aria-label="Фотографии проекта">
      <div className="max-w-308 mx-auto px-4 grid gap-6 md:grid-cols-2">
        {images.map((image, index) => (
          <SafeImage key={`${index}-${image}`} src={image} width={1200} height={800}
            alt={`${title} — фото ${index + 1}`} className="w-full h-auto rounded-xl" />
        ))}
      </div>
    </section>
  )
}
