import Image from 'next/image'
import HeroBenefits from '@/components/organisms/hero-benefits'
import HeroContent from '@/components/organisms/hero-content'

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* HERO IMAGE + CONTENT */}
      <div className="relative w-full min-h-[700px] lg:min-h-[780px]">
        <Image src="/assets/homepage/bali.jpg" alt="Hero Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[#0B2C4D]/60" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 pt-[140px] pb-20">
          <HeroContent />
        </div>
      </div>

      {/* BENEFITS — tepat di bawah hero, full width */}
      <HeroBenefits />
    </section>
  )
}