import Image from "next/image"
import Button from "@/components/atoms/button"

export default function InformationBanner() {
  return (
    <section className="w-full py-20">
      <div className="relative max-w-[1440px] mx-auto h-[450px] rounded-xl overflow-hidden">

        {/* Background Image */}
        <Image
          src="/assets/labuanbajo01.jpg"
          alt="Informasi Destinasi Wisata"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-6">
          <div className="text-center max-w-3xl">
            <h2 className="text-white text-2xl md:text-4xl font-semibold leading-tight">
              Kami Menyediakan Destinasi Terbaik yang Dipersonalisasi untuk
              Kenyamanan Anda
            </h2>

            <div className="mt-8 flex justify-center">
              <Button>
                JELAJAHI PAKET →
              </Button>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}