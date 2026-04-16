import Image from "next/image"

export default function AboutServiceSection() {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-[#0B2C4D] leading-tight">
              Layanan Terbaik <br />
              untuk Perjalanan <br />
              Wisata Impian Anda
            </h2>

            <p className="mt-6 font-inter text-gray-600 leading-relaxed">
              NusaTrip adalah agen perjalanan dan wisata yang berfokus pada penyediaan pengalaman liburan terbaik di berbagai
              destinasi unggulan Indonesia. Kami hadir untuk membantu Anda menjelajahi keindahan alam, budaya, dan kekayaan
              nusantara dengan layanan yang aman, nyaman, dan terpercaya.
            </p>

            <p className="mt-4 font-inter text-gray-600 leading-relaxed">
              Dengan tim yang berpengalaman dan jaringan mitra profesional, NusaTrip berkomitmen untuk memberikan pelayanan
              maksimal, mulai dari perencanaan perjalanan hingga Anda kembali dengan membawa kenangan tak terlupakan.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative w-full h-[360px] md:h-[420px]">
            <Image src="/assets/about/ilustrasi.jpeg" alt="Layanan Wisata NusaTrip" fill priority className="object-contain" />
          </div>
        </div>
      </div>
    </section>
  )
}