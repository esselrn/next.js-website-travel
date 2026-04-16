// src/components/organisms/gallery-paket.tsx
'use client'

import Image from 'next/image'
import type { PackageImage } from '@/types/packages'

type Props = {
  images: PackageImage[]
}

export default function GallerySection({ images }: Props) {
  if (!images || images.length === 0) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="md:col-span-2 h-[360px] relative rounded-xl overflow-hidden">
        <Image src={images[0].image_url} alt="Paket Wisata" fill priority className="object-cover" />
      </div>
      <div className="grid grid-rows-2 gap-4 h-[360px]">
        {images.slice(1, 3).map((img, i) => (
          <div key={img.id} className="relative rounded-xl overflow-hidden">
            <Image src={img.image_url} alt={`Gallery ${i + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}