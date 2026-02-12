import Image from 'next/image'

export default function ArticleHeroImage() {
  return (
    <section className="w-full px-4 sm:px-6 mb-10">
      <div className="relative w-full max-w-[1316px] mx-auto h-[240px] sm:h-[420px] lg:h-[520px]">
        <Image src="/assets/nusapenida02.jpg" alt="Nusa Penida" fill priority className="object-cover rounded-xl" />
      </div>
    </section>
  )
}