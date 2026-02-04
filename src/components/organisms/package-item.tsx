import Image from 'next/image'
import Button from '@/components/atoms/button'
import Rating from '@/components/atoms/rating'

type Props = {
  image: string
  title: string
  rating: number
  desc: string
  price: string
  duration: string
}

export default function PackageItem({ image, title, rating, desc, price, duration }: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="relative w-full h-[320px] rounded-2xl overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      <div>
        <h3 className="text-2xl font-bold text-[#0A2540] mb-2">{title}</h3>

        <Rating value={rating} />

        <p className="text-gray-600 mb-6 mt-4">{desc}</p>

        <p className="mb-6">
          <span className="font-semibold text-gray-700">Mulai dari </span>
          <span className="font-bold text-[#0A2540]">{price}</span>
          <span className="text-gray-600"> / {duration}</span>
        </p>

        <Button>
          PESAN SEKARANG <span>→</span>
        </Button>
      </div>
    </div>
  )
}
