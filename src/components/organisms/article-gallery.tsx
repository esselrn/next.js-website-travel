import Image from 'next/image'

export default function ArticleGallery() {
  return (
    <div className="w-full px-4 sm:px-6 max-w-none sm:max-w-[970px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-16">
      <div className="relative h-[220px] sm:h-[350px] rounded-xl overflow-hidden">
        <Image src="/assets/nusapenida01.jpg" alt="Broken Beach" fill className="object-cover" />
      </div>

      <div className="relative h-[220px] sm:h-[350px] rounded-xl overflow-hidden">
        <Image src="/assets/nusapenida02.jpg" alt="Angel’s Billabong" fill className="object-cover" />
      </div>
    </div>
  )
}