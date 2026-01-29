import Image from "next/image"
import HeroBenefits from "@/components/organisms/hero-benefits"
import HeroContent from "@/components/organisms/hero-content"

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">

      <div className="relative w-full min-h-[820px] lg:min-h-[880px]">
        <Image
          src="/assets/bali.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-[#0B2C4D]/60" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 pt-[140px]">
          <HeroContent />
        </div>

        <HeroBenefits />
      </div>
    </section>
  )
}