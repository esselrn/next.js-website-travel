import DestinationCard from "@/components/organisms/destination-card"
import { destinations } from "@/constants/destinations"

export default function DestinationSection() {
  const featured = destinations.slice(0, 2)
  const regular = destinations.slice(2)

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-6">

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-montserrat text-3xl md:text-4xl text-[#0B2C4D] mb-4">
            Destinasi Unggulan Indonesia
          </h2>
          <p className="font-inter text-gray-600 text-sm md:text-base">
            Jelajahi destinasi wisata paling populer di Indonesia dengan
            paket perjalanan terbaik dan terpercaya dari NusaTrip.
          </p>
        </div>

        {/* FEATURED (2 BESAR) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {featured.map((item, index) => (
            <DestinationCard key={index} {...item} />
          ))}
        </div>

        {/* REGULAR (3 KECIL) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {regular.map((item, index) => (
            <DestinationCard key={index} {...item} small />
          ))}
        </div>

      </div>
    </section>
  )
}