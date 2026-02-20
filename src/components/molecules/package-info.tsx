import Button from '@/components/atoms/button'
import Rating from '@/components/atoms/rating'
import Location from '@/components/atoms/location'

type PackageInfoProps = {
  title: string
  price: string
  rating: number
  location: string
}

export default function PackageInfo({ title, price, rating, location }: PackageInfoProps) {
  return (
    <div className="mb-6 lg:mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] items-start gap-4 sm:gap-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0B2C4D]">{title}</h1>

          <div className="mt-2 space-y-1">
            <Rating value={rating} />
            <Location location={location} />
          </div>
        </div>

        <div className="sm:text-right space-y-3">
          <p className="text-xl font-bold text-[#0B2C4D]">
            {price}
            <span className="text-sm font-normal"> / Orang</span>
          </p>

          <Button variant="primary">PESAN SEKARANG →</Button>
        </div>
      </div>
    </div>
  )
}
