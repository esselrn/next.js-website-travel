import Image from 'next/image'

const galleryImages = {
  main: '/assets/prambanan02.jpg',
  side: ['/assets/prambanan.jpg', '/assets/prambanan03.jpg']
}

export default function GallerySection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* MAIN IMAGE */}
      <div className="md:col-span-2 h-[360px] relative rounded-xl overflow-hidden">
        <Image src={galleryImages.main} alt="Prambanan" fill priority className="object-cover" />
      </div>

      {/* SIDE IMAGES */}
      <div className="grid grid-rows-2 gap-4 h-[360px]">
        {galleryImages.side.map((src, i) => (
          <div key={i} className="relative rounded-xl overflow-hidden">
            <Image src={src} alt={`Prambanan Gallery ${i + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}