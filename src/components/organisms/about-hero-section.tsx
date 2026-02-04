import Image from "next/image"
import AboutHeroContent from "@/components/molecules/section/about-hero-content"
import { ABOUT_HERO } from "@/constants/about"

export default function AboutHeroSection() {
  return (
    <section className={`relative w-full h-[${ABOUT_HERO.height}px]`}>
      {/* Background Image */}
      <Image
        src={ABOUT_HERO.image}
        alt="Tentang Kami NusaTrip"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className={`absolute inset-0 ${ABOUT_HERO.overlayColor}`} />

      {/* Content */}
      <AboutHeroContent
        subtitle={ABOUT_HERO.subtitle}
        title={ABOUT_HERO.title}
      />
    </section>
  )
}