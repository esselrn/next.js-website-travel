import Image from 'next/image'

export default function PageHeaderDestinasi() {
  return (
    <section className="relative w-full h-[250px]">
      <Image src="/assets/destinasi/header.jpg" alt="Destinasi NusaTrip" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <span className="font-montserrat text-xs tracking-[0.3em] text-orange-400 uppercase mb-3">Jelajahi Nusantara</span>
        <h1 className="font-montserrat font-bold text-white text-3xl md:text-5xl uppercase mb-3">Destinasi Unggulan</h1>
        <p className="text-white/70 text-sm max-w-md">Ribuan destinasi menakjubkan menanti perjalanan Anda</p>
      </div>
    </section>
  )
}