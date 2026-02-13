import Button from '@/components/atoms/button'
import Rating from '@/components/atoms/rating'
import Location from '@/components/atoms/location'
import { PACKAGE_INFO } from '@/constants/package-info'

export default function PackageInfo() {
  return (
    <div className="mb-6 lg:mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] items-start gap-4 sm:gap-8">
        {/* LEFT */}
        <div>
          <h1 className="text-2xl font-bold text-[#0B2C4D]">{PACKAGE_INFO.title}</h1>

          <div className="mt-2 space-y-1">
            <Rating value={PACKAGE_INFO.rating} />
            <Location location={PACKAGE_INFO.location} />
          </div>
        </div>

        {/* RIGHT */}
        <div className="sm:text-right space-y-3">
          <div>
            <p className="text-xl font-bold text-[#0B2C4D]">
              {PACKAGE_INFO.price}
              <span className="text-sm font-normal"> / Orang</span>
            </p>
          </div>

          <Button variant="primary">{PACKAGE_INFO.buttonText} →</Button>
        </div>
      </div>
    </div>
  )
}
