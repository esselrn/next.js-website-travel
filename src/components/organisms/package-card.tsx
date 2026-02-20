import Image from 'next/image'
import Rating from '@/components/atoms/rating'
import Button from '@/components/atoms/button'

type Props = {
  slug: string
  image: string
  title: string
  rating: number
  summary: string
  price: string
  duration: string
  variant?: 'home' | 'page'
}

export default function PackageCard({ slug, image, title, rating, summary, price, duration, variant = 'page' }: Props) {
  const href = `/paket-wisata/${slug}`

  if (variant === 'home') {
    return (
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="relative h-[320px] rounded-xl overflow-hidden">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>

        <div>
          <h3 className="text-2xl font-semibold">{title}</h3>
          <Rating value={rating} />
          <p className="my-4 text-gray-600">{summary}</p>
          <p className="mb-6">
            <b>{price}</b> / {duration}
          </p>

          <Button href={href}>PESAN SEKARANG →</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="relative h-[240px]">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-lg">{title}</h3>
        <Rating value={rating} />
        <p className="text-sm text-gray-600 my-3">{summary}</p>
        <p className="text-sm mb-4">
          <b>{price}</b> / {duration}
        </p>

        <Button href={href}>PESAN SEKARANG →</Button>
      </div>
    </div>
  )
}