import Button from '@/components/atoms/Button'

export default function AdventureContent() {
  return (
    <div className="max-w-xl text-white">
      <h2 className="font-montserrat text-4xl lg:text-5xl font-bold leading-tight">
        Jelajahi Petualangan <br />
        Terbaik Bersama NusaTrip
      </h2>

      <p className="mt-4 font-inter text-base text-white/90">
        Nikmati pengalaman wisata terbaik ke berbagai destinasi favorit Indonesia. Dari Bali hingga Labuan Bajo, NusaTrip
        menghadirkan perjalanan yang nyaman, aman, dan berkesan.
      </p>

      {/* BUTTON → PAKET WISATA (IKUT ATOMS/BUTTON) */}
      <div className="mt-8">
        <Button href="/paket-wisata">JELAJAHI PAKET →</Button>
      </div>
    </div>
  )
}
