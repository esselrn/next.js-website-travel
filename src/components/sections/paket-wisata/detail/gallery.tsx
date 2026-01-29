import Image from "next/image"

const galleryImages = {
  main: "/assets/rajaampat01.jpg",
  side: [
    "/assets/rajaampat02.jpg",
    "/assets/rajaampat03.jpg",
  ],
}

export default function GallerySection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      
      {/* MAIN IMAGE */}
      <div className="md:col-span-2 h-[360px] relative rounded-xl overflow-hidden">
        <Image
          src={galleryImages.main}
          alt="Raja Ampat"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* SIDE IMAGES */}
      <div className="flex md:flex-col gap-4">
        {galleryImages.side.map((src, i) => (
          <div
            key={i}
            className="relative h-[172px] rounded-xl overflow-hidden"
          >
            <Image
              src={src}
              alt={`Raja Ampat Gallery ${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

    </div>
  )
}