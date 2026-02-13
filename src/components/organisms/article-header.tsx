import Image from 'next/image'
import MetaInfo from '@/components/atoms/meta-info'
import { User, CalendarDays, Folder } from 'lucide-react'

export default function PageHeaderSection() {
  return (
    <section className="relative w-full h-[260px] md:h-[300px]">
      {/* Background Image */}
      <Image
        src="/assets/nusapenida01.jpg"
        alt="Menjelajahi Surga Tersembunyi di Nusa Penida"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-[1440px] w-full px-6 text-center flex flex-col items-center">
          {/* Title */}
          <h1 className="font-montserrat font-bold text-white text-2xl md:text-4xl uppercase mb-4 leading-tight">
            Menjelajahi Surga Tersembunyi <br className="hidden md:block" />
            di Nusa Penida
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <MetaInfo icon={<User size={16} />} text="Ripan Nugraha" />
            <MetaInfo icon={<CalendarDays size={16} />} text="5 April 2024" />
            <MetaInfo icon={<Folder size={16} />} text="Destinasi, Wisata" />
          </div>
        </div>
      </div>
    </section>
  )
}
