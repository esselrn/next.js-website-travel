import Button from '@/components/atoms/button'
import Text from '@/components/atoms/text'

export default function HeroContent() {
  return (
    <div className="max-w-[520px]">
      <Text variant="hero" color="light" className="mb-6">
        TEMUKAN PENGALAMAN WISATA
        <br />
        TERBAIK NUSANTARA
      </Text>

      <Text color="light" className="opacity-90 mb-8">
        Nikmati pengalaman liburan yang nyaman dan terpercaya dengan paket wisata pilihan ke berbagai destinasi terbaik di
        Indonesia.
      </Text>

      <Button href="/paket-wisata">JELAJAHI PAKET →</Button>
    </div>
  )
}
