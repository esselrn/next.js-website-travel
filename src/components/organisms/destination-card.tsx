import Image from 'next/image'
import Rating from '@/components/atoms/rating'
import Button from '@/components/atoms/button'
import type { Destination } from '@/types/destinations'

type DestinationCardProps = Destination & {
  small?: boolean
}

export default function DestinationCard({
  id,
  slug,
  thumbnail_url,
  name,
  rating,
  short_description,
  price_per_person,
  small = false
}: DestinationCardProps) {
  const href = `/destinasi/${slug ?? id}`

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition h-full flex flex-col">
      <div className={`relative w-full ${small ? 'h-[180px]' : 'h-[260px]'}`}>
        <Image src={thumbnail_url ?? '/assets/placeholder.jpg'} alt={name} fill className="object-cover" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-montserrat text-xl font-bold text-[#0B2C4D] mb-2">{name}</h3>
        <Rating value={rating ?? 0} />
        <p className="font-inter text-sm text-gray-600 my-4 line-clamp-3">{short_description}</p>
        <div className="flex items-center justify-between mt-auto gap-3">
          <p className="text-[#0B2C4D] font-bold text-lg">
            Rp {Number(price_per_person).toLocaleString('id-ID')}{' '}
            <span className="text-gray-500 text-xs font-normal">/ Orang</span>
          </p>
          <Button href={href}>PESAN SEKARANG →</Button>
        </div>
      </div>
    </div>
  )
}