import Image from 'next/image'
import Rating from '@/components/atoms/rating'
import Button from '@/components/atoms/button'
import type { Package } from '@/types/packages'

type PackageCardProps = Package & {
  variant?: 'home' | 'page'
}

//call package supabase value
export default function PackageCard({
  id,
  slug,
  thumbnail_url,
  name,
  rating,
  short_description,
  price_per_person,
  duration_day,
  variant = 'page'
}: PackageCardProps) {
  const href = `/paket-wisata/${slug ?? id}`

  if (variant === 'home') {
    return (
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="relative w-full h-[320px] rounded-xl overflow-hidden">
          <Image src={thumbnail_url} alt={name} fill className="object-cover" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-[#0B2C4D] mb-2">{name}</h3>
          <Rating value={rating} />
          <p className="text-gray-600 my-4 line-clamp-3">{short_description}</p>
          <p className="mb-6">
            <span className="font-semibold">Rp {Number(price_per_person).toLocaleString('id-ID')}</span>
            {duration_day && <span className="text-gray-500"> / {duration_day} hari</span>}
          </p>
          <Button href={href}>PESAN SEKARANG →</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition h-full flex flex-col">
      <div className="relative w-full h-[260px]">
        <Image src={thumbnail_url} alt={name} fill className="object-cover" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-montserrat text-xl font-bold text-[#0B2C4D] mb-2">{name}</h3>
        <Rating value={rating} />
        <p className="font-inter text-sm text-gray-600 my-4 line-clamp-3">{short_description}</p>
        <div className="flex items-center justify-between mt-auto gap-3">
          <div>
            <p className="text-[#0B2C4D] font-bold text-lg">
              Rp {Number(price_per_person).toLocaleString('id-ID')}{' '}
              <span className="text-gray-500 text-xs font-normal">/ Orang</span>
            </p>
          </div>
          <Button href={href}>PESAN SEKARANG →</Button>
        </div>
      </div>
    </div>
  )
}