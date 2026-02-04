import PackageCard from "@/components/organisms/package-card"
import { EXCLUSIVE_PACKAGES } from "@/constants/paket-wisata"

export default function ExclusivePackagesSection() {
  return (
    <section className="w-full py-20">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-14">
          <div>
            <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-[#0B2C4D]">
              Paket Wisata Eksklusif
            </h2>
            <p className="text-gray-500 mt-2 max-w-md">
              Nikmati pengalaman liburan terbaik dengan pilihan paket wisata
              eksklusif dari kami.
            </p>
          </div>

          <button className="self-start md:self-auto bg-orange-500 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-orange-600 transition">
            JELAJAHI PAKET →
          </button>
        </div>

        {/* FEATURED */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {EXCLUSIVE_PACKAGES.featured.map((item) => (
            <PackageCard key={item.title} {...item} />
          ))}
        </div>

        {/* REGULAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EXCLUSIVE_PACKAGES.regular.map((item) => (
            <PackageCard key={item.title} {...item} small />
          ))}
        </div>
      </div>
    </section>
  )
}