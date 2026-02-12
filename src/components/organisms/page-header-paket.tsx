import Image from "next/image"

export default function PageHeaderSection() {
  return (
    <section className="relative w-full h-[250px]">
      {/* Background Image */}
      <Image
        src="/assets/desgallery2.jpg"
        alt="Paket Wisata NusaTrip"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 translate-y-[6px]">
        <span className="font-montserrat text-sm tracking-widest text-white/80 mb-2">
          PAKET
        </span>

        <h1 className="font-montserrat font-bold text-white text-2xl md:text-4xl">
          PAKET WISATA KAMI
        </h1>
      </div>
    </section>
  )
}