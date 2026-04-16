import Image from 'next/image'

export default function InformationBanner() {
  return (
    <section className="w-full">
      <div className="relative w-full h-[450px] overflow-hidden">
        <Image src="/assets/labuanbajo01.jpg" alt="Informasi Destinasi Wisata" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex items-center justify-center h-full px-6">
          <h2 className="text-white text-3xl md:text-5xl font-semibold leading-tight text-center max-w-3xl">
            Kami Menyediakan Destinasi Terbaik yang Dipersonalisasi untuk Kenyamanan Anda
          </h2>
        </div>
      </div>
    </section>
  )
}