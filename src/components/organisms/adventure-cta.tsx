import Image from 'next/image'
import Button from '@/components/atoms/button'
import PlayButton from '@/components/atoms/play-button'

export default function AdventureCTA() {
  return (
    <section className="relative w-full h-[592px] flex items-center">
      {/* Background Image */}
      <Image src="/assets/rajaampat.jpg" alt="Adventure NusaTrip" fill className="object-cover" priority />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0B2C4D]/70" />

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* TEXT CONTENT */}
          <div className="max-w-[520px] text-white">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Jelajahi Petualangan Terbaik Bersama NusaTrip</h2>

            <p className="opacity-90 mb-8">
              Nikmati pengalaman wisata terbaik ke berbagai destinasi favorit Indonesia. Dari Bali hingga Labuan Bajo,
              NusaTrip menghadirkan perjalanan yang nyaman, aman, dan berkesan.
            </p>

            {/* BUTTON → PAKET WISATA (UKURAN NORMAL / md) */}
            <Button href="/paket-wisata">JELAJAHI PAKET</Button>
          </div>

          {/* PLAY BUTTON */}
          <PlayButton />
        </div>
      </div>
    </section>
  )
}
