import Image from 'next/image'
import AboutHeroContent from '@/components/molecules/section/about-hero-content'

export default function AboutHeroSection() {
  return (
    <section className="relative w-full h-[250px]">
      <Image src="/assets/about/nusa-penida.jpg" alt="Tentang Kami NusaTrip" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-black/60" />
      <AboutHeroContent subtitle="TENTANG KAMI" title="CERITA KAMI DI NUSATRIP" />
    </section>
  )
}