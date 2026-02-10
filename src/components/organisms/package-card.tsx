import Image from 'next/image'
import Rating from '@/components/atoms/rating'
import Button from '@/components/atoms/button'

type Props = {
  image: string
  title: string
  rating: number
  desc: string
  price: string
  duration: string
  variant?: 'home' | 'page'
}

export default function PackageCard({ image, title, rating, desc, price, duration, variant = 'page' }: Props) {
  // =====================
  // 🏠 HOME (HORIZONTAL)
  // =====================
  if (variant === 'home') {
    return (
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* IMAGE */}
        <div className="relative w-full h-[320px] rounded-xl overflow-hidden">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>

        {/* CONTENT */}
        <div>
          <h3 className="text-2xl font-semibold text-[#0A2540] mb-2">{title}</h3>

          <Rating value={rating} />

          <p className="text-gray-600 my-4">{desc}</p>

          <p className="mb-6">
            <span className="font-semibold">{price}</span>
            <span className="text-gray-500"> / {duration}</span>
          </p>

          {/* BUTTON → PAKET WISATA (DEFAULT md) */}
          <Button href="/paket-wisata">PESAN SEKARANG →</Button>
        </div>
      </div>
    )
  }

  // =====================
  // 📦 PAGE (CARD GRID)
  // =====================
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
      <div className="relative w-full h-[240px]">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-lg text-[#0A2540] mb-1">{title}</h3>

        <Rating value={rating} />

        <p className="text-gray-600 text-sm my-3">{desc}</p>

        <p className="text-sm mb-4">
          <span className="font-semibold">{price}</span>
          <span className="text-gray-500"> / {duration}</span>
        </p>

        {/* BUTTON → PAKET WISATA (DEFAULT md) */}
        <Button href="/paket-wisata">PESAN SEKARANG →</Button>
      </div>
    </div>
  )
}
