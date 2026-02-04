import Image from "next/image"
import AdventureContent from "@/components/organisms/adventure-content"
import PlayButton from "@/components/atoms/play-button"
import { ADVENTURE_CTA } from "@/constants/adventure-cta"

export default function AdventureCTA() {
  return (
    <section className="relative w-full h-[592px] flex items-center">
      {/* Background Image */}
      <Image
        src={ADVENTURE_CTA.backgroundImage}
        alt="Adventure NusaTrip"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0B2C4D]/70" />

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <AdventureContent />
          <PlayButton />
        </div>
      </div>
    </section>
  )
}