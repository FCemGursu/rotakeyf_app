import Image from "next/image"

export function GallerySection() {
  const images = [
    { src: "/Resim1.jpeg", alt: "Kafe 1" },
    { src: "/resim2.jpeg", alt: "Kafe 2" },
    { src: "/motorresim.jpeg", alt: "Kafe 3" },
    { src: "/resim4.jpeg", alt: "Kafe 4" },
    { src: "/resim5.jpeg", alt: "Kafe 5" },
    { src: "/arkaplan2.png", alt: "Kafe 6" },
  ]

  return (
    <section id="galeri" className="py-24 px-4 bg-card/50 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Fotoğraflar
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mekanımızdan kareler
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl group bg-secondary aspect-[4/3]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
