import Image from "next/image"
import { DESTINATION_GALLERY } from "@/constants/destination-gallery"

export default function DestinationGallerySection() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-5 w-full h-[900px]">
        {DESTINATION_GALLERY.map((item, i) => (
          <div key={item.title} className="relative h-full">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              priority={i === 0}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />

            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-white text-center px-4">
              <p className="text-xs uppercase tracking-widest opacity-80">
                {item.country}
              </p>
              <h3 className="font-montserrat font-semibold text-lg leading-snug">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}