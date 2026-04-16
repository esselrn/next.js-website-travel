// src/components/organisms/detail-header-paket.tsx
import Image from 'next/image'

type Props = {
  title: string
  location: string
  backgroundImage: string
}

export default function PageHeaderSection({ title, location, backgroundImage }: Props) {
  return (
    <section className="relative w-full h-[250px]">
      <Image
        src={backgroundImage || '/assets/default-header.jpg'}
        alt={`Detail Paket Wisata ${title}`}
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <span className="font-montserrat text-sm tracking-widest text-white/80 mb-2">DETAIL PAKET WISATA</span>
        <h1 className="font-montserrat font-bold text-white text-2xl md:text-4xl">{title}</h1>
        <p className="mt-2 text-white/80 text-sm md:text-base">{location}</p>
      </div>
    </section>
  )
}